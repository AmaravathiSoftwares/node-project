import axios from "axios";

import * as masterMdl from '../models/kioskModel.js';


const OAUTH_URL = "https://pluraluat.v2.pinepg.in/api/auth/v1/token";

const BASE_URL = "https://pluraluat.v2.pinepg.in/api/checkout/v1";

const BASE_URL2 = "https://pluraluat.v2.pinepg.in/api/pay/v1";

// const OAUTH_URL = "https://api.pluralpay.in/api/auth/v1/token";

// const BASE_URL = "https://api.pluralpay.in/api/checkout/v1";

// const BASE_URL2 = "https://api.pluralpay.in/api/pay/v1";

//------------------------PAst Keys -------------------------------------------
// {
//     client_id: '59194fe5-4c27-4e6e-8deb-4e59f8f4fd7b',
//         client_secret: '024dd66a367549b380bd322ff6c3b279',
//             grant_type: "client_credentials"
// },


//-----------------------parent Mid -------------------------------------------
// {
//     client_id: '844d40f0-81cf-4e87-9b89-9f1f35b8692e',
//         client_secret: 'f420d050236741499ca5a529055b72e8',
//             grant_type: "client_credentials"
// },


//------------------------Child Key-------------------------------------------
// {
//     client_id: 'f1b62319-69af-493a-a2a9-6e1e1a088645',
//         client_secret: '52f68ec30d474ba8854f07b128c2bcf1',
//             grant_type: "client_credentials"
// },



async function getAccessToken(kit) {
    const res = await axios.post(
        OAUTH_URL,
        {
            // client_id: kit.client_id,
            // client_secret: kit.secret_client_id,
            // grant_type: "client_credentials"
            client_id: 'f1b62319-69af-493a-a2a9-6e1e1a088645',
            client_secret: '52f68ec30d474ba8854f07b128c2bcf1',
            grant_type: "client_credentials"
        },

        {
            headers: { "Content-Type": "application/json" }
        }
    );

    return res.data.access_token;
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

        const kit = await getSecretAsync(temple_id);
        const token = await getAccessToken(kit);
        const response = await axios.post(`${BASE_URL}/orders`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const apiData = response.data;

        // ✅ Return only needed values
        return {
            success: true,
            order_id: apiData.order_id,
            redirect_url: apiData.redirect_url,
            message: apiData.response_message,
            raw: apiData
        };

    } catch (error) {
        console.error("Payment Gateway Error:");
        console.log(payload);
        throw error;
    }
}


export async function getPaymentStatus(orderId, temple_id) {
    try {


        const kit = await getSecretAsync(temple_id);

        const token = await getAccessToken(kit);

        const response = await axios.get(`${BASE_URL2}/orders/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );

        const apiData = response.data?.data || {};
        const payment = apiData.payments?.[0] || {};

        // ✅ Status mapping
        let finalStatus = "FAILED";

        if (apiData.status === "PROCESSED") {
            finalStatus = "SUCCESS";
        } else if (apiData.status === "CANCELLED") {
            finalStatus = "CANCELLED";
        }

        return {
            success: true,
            // order_id: apiData.order_id,
            status: finalStatus,                // SUCCESS | FAILED | CANCELLED
            gateway_status: apiData.status,     // Original status from PineLabs
            payment_id: payment.id || null,     // payments.id
            payment_method: payment.payment_method || null,
            message: finalStatus === "SUCCESS" ? "Payment Successful" : finalStatus === "CANCELLED" ? "Payment Cancelled" : payment.error_detail?.message || "Payment Failed"
        };

    } catch (error) {
        console.error("Payment Status API Error:", error?.response?.data || error.message);
        throw error;
    }
}
