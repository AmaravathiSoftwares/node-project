Now I have a complete picture of the entire Darshnam payment flow. Here is a detailed breakdown of all the issues found:

---

## Payment Gateway Issues — Darshnam Flow

### 1. `await` Inside a Callback — Error Swallowing (Critical)

**File:** `kioskControls.js` — `createeDarshnamOrdersCtrlOrg` (line 769) and `updateDarshnamOrderStatusCtrl` (line 395)

Both functions are `async` but call `createPaymentOrder` / `getPaymentStatus` with `await` **inside a plain callback** (`masterMdl.createeDarshnamOrdersMdl(data, async function(...)`). This means:

- If the gateway throws, the error **escapes the outer `try/catch`** entirely — it becomes an **unhandled promise rejection**.
- The response may never be sent, leaving the client hanging.

```756:865:core/kioskApi/controls/kioskControls.js
// ❌ createPaymentOrder throws inside a callback → outer try/catch at line 858 never fires
masterMdl.createeDarshnamOrdersMdl(data, async function (err, tckitresults) {
    ...
    const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);
```

---

### 2. `data.reqId` Not Validated Before Hash (Critical)

**File:** `kioskControls.js`, line 786

```786:787:core/kioskApi/controls/kioskControls.js
const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
const shortKey = hash.slice(0, 12);
```

If the client does **not** send `reqId` in the request body, `crypto.update(undefined)` throws `TypeError` immediately — crashing inside the callback with no safe error response.

---

### 3. `merchant_order_reference` Collision Risk (High)

**File:** `kioskControls.js`, line 791

The `shortKey` is only **12 hex characters** from a SHA-256 of `reqId`. If the client retries a failed booking with the **same `reqId`**, the gateway will reject it as a **duplicate order reference**.

```790:792:core/kioskApi/controls/kioskControls.js
"merchant_order_reference": shortKey,
```

There is no suffix (like `insertId` or timestamp) to make it unique across retries.

---

### 4. `payment_id` Inserted as `undefined` on Order Create (High)

**File:** `kioskModel.js`, line 276

```275:276:core/kioskApi/models/kioskModel.js
const QRY_TO_EXEC = `INSERT INTO e_darshnam_orders (..., payment_id, ...) VALUES (...)`;
let paramsData = [..., payment_id, ...]; // data.payment_id is never set before insert
```

`data.payment_id` is never assigned in the controller before the INSERT — it inserts `undefined` / `null`. This is technically harmless but incorrect; `payment_id` is only known after payment completes and should be left out of the initial INSERT or explicitly set to `NULL`.

---

### 5. DB Error Not Checked in `updateDarshnamOrderStatusCtrl` (High)

**File:** `kioskControls.js`, lines 395–396

```395:420:core/kioskApi/controls/kioskControls.js
masterMdl.getDarshanDetailswithTicketid(data, async function (err, result) {
    if (result) {  // ❌ err is never checked — a DB error is silently ignored
```

If a DB error occurs, `err` is set but `result` may still be truthy (e.g., an empty array `[]`). The code will then attempt `result[0].order_id` on an empty array → `TypeError: Cannot read properties of undefined`.

---

### 6. Incorrect Status Mapping for In-Progress Payments (Medium)

**File:** `gateway/payment.js`, lines 127–133

```127:133:core/kioskApi/gateway/payment.js
let finalStatus = "FAILED";
if (apiData.status === "PROCESSED") {
    finalStatus = "SUCCESS";
} else if (apiData.status === "CANCELLED") {
    finalStatus = "CANCELLED";
}
```

PineLabs can also return statuses like `"PENDING"`, `"INITIATED"`, `"AUTHORIZED"`, `"CREATED"`. All of these fall through to `"FAILED"` — so a **payment that is still in-progress** gets written to the DB as `FAILED`, which cannot be undone automatically.

---

### 7. SQL Injection Risk in `category_type == 6` (Medium)

**File:** `kioskModel.js`, line 315

```315:315:core/kioskApi/models/kioskModel.js
WHERE p.ticket_id = '${data.ticket_id}' GROUP BY p.id; `
```

The second query in the `category_type == 6` block uses **string interpolation** instead of a parameterized `?` placeholder. All other queries use `?`. This is a SQL injection exposure point since `ticket_id` comes from `req.body`.

---

### 8. `category_type` Not Validated — `undefined` Table Name (Medium)

**File:** `kioskModel.js`, lines 346–356

```346:357:core/kioskApi/models/kioskModel.js
const tableMap = { 1: 'e_darshnam_orders', 2: ..., 5: 'e_hundi_orders' };
const table = tableMap[data.category_type];
var QRY_TO_EXEC = `Update ${table} set payment_status = ?...`
```

If `category_type` is missing or not in range 1–5, `table` is `undefined` → the query becomes `UPDATE undefined SET ...` → DB crash with no guard or early return.

---

### Summary Table

| # | Severity | Location | Issue |
|---|----------|----------|-------|
| 1 | Critical | `kioskControls.js:769,395` | `await` inside callback bypasses `try/catch` |
| 2 | Critical | `kioskControls.js:786` | `data.reqId` not validated before `crypto.update()` |
| 3 | High | `kioskControls.js:791` | `merchant_order_reference` (shortKey) not unique across retries |
| 4 | High | `kioskModel.js:276` | `payment_id` is `undefined` on initial INSERT |
| 5 | High | `kioskControls.js:395` | DB `err` never checked before using `result` |
| 6 | Medium | `gateway/payment.js:127` | In-progress payment statuses falsely mapped to `"FAILED"` |
| 7 | Medium | `kioskModel.js:315` | SQL injection via string interpolation for `ticket_id` (category 6) |
| 8 | Medium | `kioskModel.js:354` | No guard when `category_type` is invalid → `undefined` table name |










Yes — there are clear reasons in your code why rate-limit errors happen “sometimes”.

### What I found

- Your limiter is configured very strictly in `config/apiratelimiter.js`:
  - `windowMs: 5 * 60 * 1000` (5 minutes)
  - `max: 5` requests per key  
  So after 5 hits in 5 mins, the 6th request gets 429.

- This limiter is applied on OTP endpoints (for example):
  - `core/othersModuleApi/routes/loginroutes.js` → `/sendotp`, `/verifyotp`
  - `core/TicketCounterApi/routes/ticketcounterroutes.js` → `/sendotp`, `/verifyotp`

- In `core/kioskApi/routes/kioskRoutes.js` you defined `apiLimiter` and `otpLimiter`, but they are **not attached** to Darshnam routes.  
  So Darshnam route itself is likely not the source of 429.

### Why it feels intermittent

- Keying is IP-based (`x-forwarded-for` or `remoteAddress`), so multiple users behind same NAT/proxy can share one bucket.
- If proxy headers are inconsistent, sometimes a user gets a different key and sometimes the same one.
- OTP retries (user taps multiple times) can quickly cross 5 requests in 5 min.

### Extra issue in limiter config

In `config/apiratelimiter.js`, `const app = express(); app.use(requestIp.mw())` is inside the config file and not your real server app instance, so that middleware is effectively useless there.

---

If you want, I can give you a safe limiter setup pattern (per-route + per-user/mobile key + proxy-safe IP handling) you can drop in without weakening security.