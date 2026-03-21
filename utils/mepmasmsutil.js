import axios from "axios";
import { hash } from "bcrypt";
let cachedToken = null;
let tokenExpiry = null;
export const getToken = async () => {
    const now = Date.now();
    // Check for valid cached token
    if (cachedToken && tokenExpiry && now < tokenExpiry) {
        console.log("Using cached token");
        return cachedToken;
    }

    const headers = {
        username: "pragna",
        password: "Pragna@2025"
    };
    console.log('tokengotted')
    const body = { Authentication: "true" };

    try {
        const response = await axios.post('https://mepma.el91.com/api/mepma_data/', body, { headers });

        if (response.data.result === "Success") {
            cachedToken = response.data.token;
            tokenExpiry = now + 14 * 60 * 1000; // 14 minutes from now

            console.log("New token acquired");
            return cachedToken;
        } else {
            console.error("Token fetch failed:", response.data.error);
            throw new Error(response.data.error || "Unknown error while fetching token");
        }

    } catch (error) {
        console.error("Error getting MEPMA token:", error.message);
        throw error;
    }
};

export const smsotp = async (data) => {
    const token = await getToken();
    console.log(token);

    if (!data.phone_number || data.phone_number.length !== 10) throw new Error("Invalid Phone Number");
    // 1. Convert OTP to string
    // let userOtp = data.otp.toString();
    // 2. Prepare request body
    const body = {
        sendOtp: "true",
        username: data.phone_number,
        type: 2
    };
    console.log(body);
    // 3. Prepare headers
    const headers = {
        username: "pragna",
        'Auth-key': token
    };
    // 4. Make POST request to MEPMA login endpoint
    const response = await axios.post('https://mepma.el91.com/api/mepma_data/', body, { headers });
    return response.data;
    console.log(response.data, 55);

}

export const verifysmsotp = async (data) => {
    const token = await getToken();
    if (!data.phone_number || data.phone_number.length !== 10) throw new Error("Invalid Phone Number");
    // 1. Convert OTP to string
    let userOtp = data.otp.toString();
    // 2. Prepare request body
    const body = {
        login: "true",
        username: data.phone_number,
        // type: 2
        otp: userOtp
    };
    console.log(body);
    // 3. Prepare headers
    const headers = {
        username: "pragna",
        'Auth-key': token
    };
    // 4. Make POST request to MEPMA login endpoint
    const response = await axios.post('https://mepma.el91.com/api/mepma_data/', body, { headers });
    return response.data;
    console.log(response.data, 55);

}