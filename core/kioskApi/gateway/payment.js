import axios from "axios";

import * as masterMdl from '../models/kioskModel.js';


// const OAUTH_URL = "https://pluraluat.v2.pinepg.in/api/auth/v1/token";

// const BASE_URL = "https://pluraluat.v2.pinepg.in/api/checkout/v1";

// const BASE_URL2 = "https://pluraluat.v2.pinepg.in/api/pay/v1";

const OAUTH_URL = "https://api.pluralpay.in/api/auth/v1/token";

const BASE_URL = "https://api.pluralpay.in/api/checkout/v1";

const BASE_URL2 = "https://api.pluralpay.in/api/pay/v1";



const api = axios.create({
    timeout: 5000
});

const tokenCache = new Map();
const inProgressStatus = new Map();
const secretCache = new Map();


async function getSecretCached(temple_id) {
    if (secretCache.has(temple_id)) {
        return secretCache.get(temple_id);
    }

    const kit = await getSecretAsync(temple_id);
    secretCache.set(temple_id, kit);
    return kit;
}

async function axiosWithRetry(fn, retries = 3) {
    try {
        return await fn();
    } catch (err) {
        if (err.response?.status === 429 && retries > 0) {
            const delay = (4 - retries) * 1000;
            await new Promise(r => setTimeout(r, delay));
            return axiosWithRetry(fn, retries - 1);
        }
        throw err;
    }
}

const tokenPromises = new Map();


async function getAccessToken(kit, temple_id) {
    const cached = tokenCache.get(temple_id);

    if (cached && cached.expiry > Date.now()) {
        return cached.token;
    }

    if (tokenPromises.has(temple_id)) {
        return tokenPromises.get(temple_id);
    }

    const promise = (async () => {
        try {
            console.log(`[TOKEN] Fetching new token for ${temple_id}`);

            const res = await axios.post(
                OAUTH_URL,
                {
                    client_id: kit.client_id,
                    client_secret: kit.secret_client_id,
                    grant_type: "client_credentials"
                },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 5000
                }
            );

            const token = res.data.access_token;
            const expiresIn = res.data.expires_in || 300;

            tokenCache.set(temple_id, {
                token,
                expiry: Date.now() + (expiresIn - 30) * 1000
            });

            return token;
        } finally {
            tokenPromises.delete(temple_id);
        }
    })();

    tokenPromises.set(temple_id, promise);
    return promise;
}





function getSecretAsync(temple_id) {
    return new Promise((resolve, reject) => {
        masterMdl.getsecret(temple_id, (err, results) => {
            if (err) return reject(err);
            if (!results || !results.length) {
                return reject(new Error("No secret found"));
            }
            resolve(results[0]);
        });
    });
}


export async function createPaymentOrder(payload, temple_id) {
    try {
        const kit = await getSecretCached(temple_id);
        const token = await getAccessToken(kit, temple_id);

        const response = await axiosWithRetry(() =>
            api.post(`${BASE_URL}/orders`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        );

        const apiData = response.data;

        return {
            success: true,
            order_id: apiData.order_id,
            redirect_url: apiData.redirect_url,
            message: apiData.response_message,
            raw: apiData
        };

    } catch (error) {
        console.error("Payment Gateway Error:", error?.response?.data || error.message);
        throw error;
    }
}


export async function getPaymentStatus(orderId, temple_id) {
    const key = `${temple_id}_${orderId}`;

    if (inProgressStatus.has(key)) {
        return inProgressStatus.get(key); // reuse ongoing promise
    }

    const promise = (async () => {
        try {
            const kit = await getSecretAsync(temple_id);
            const token = await getAccessToken(kit, temple_id);

            const response = await axiosWithRetry(() =>
                api.get(`${BASE_URL2}/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                })
            );

            const apiData = response.data?.data || {};
            const payment = apiData.payments?.[0] || {};

            const gatewayStatus = String(apiData.status || "").toUpperCase();
            const pendingStatuses = new Set(["PENDING", "INITIATED", "AUTHORIZED", "CREATED", "IN_PROGRESS"]);
            let finalStatus = "FAILED";

            if (gatewayStatus === "PROCESSED") finalStatus = "SUCCESS";
            else if (gatewayStatus === "CANCELLED") finalStatus = "CANCELLED";
            else if (pendingStatuses.has(gatewayStatus)) finalStatus = "PENDING";

            return {
                success: true,
                status: finalStatus,
                gateway_status: gatewayStatus || null,
                payment_id: payment.id || null,
                payment_method: payment.payment_method || null,
                message:
                    finalStatus === "SUCCESS"
                        ? "Payment Successful"
                        : finalStatus === "CANCELLED"
                        ? "Payment Cancelled"
                        : finalStatus === "PENDING"
                        ? "Payment Pending"
                        : payment.error_detail?.message || "Payment Failed"
            };

        } catch (error) {
            console.error("Payment Status API Error:", error?.response?.data || error.message);
            throw error;
        } finally {
            inProgressStatus.delete(key);
        }
    })();

    inProgressStatus.set(key, promise);
    return promise;
}