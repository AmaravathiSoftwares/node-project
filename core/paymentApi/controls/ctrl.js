import * as masterMdl from "../models/model.js";
import request from "request"; //for otp service
import unirest from "unirest";
import axios from "axios";






const BASE_URL = "https://pluraluat.v2.pinepg.in/api/checkout/v1";
const OAUTH_URL = "https://pluraluat.v2.pinepg.in/api/auth/v1/token";



async function getAccessToken() {
  // 1) Prefer static token if present
  // 2) Otherwise try OAuth (only works if Pine enabled it)
  const res = await axios.post(
    OAUTH_URL,
    {
      client_id: '59194fe5-4c27-4e6e-8deb-4e59f8f4fd7b',
      client_secret: '024dd66a367549b380bd322ff6c3b279',
      grant_type: "client_credentials"
    },
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(res.data,"ertt")
  return res.data.access_token;
}


export async function getorders(req, res) {
  console.log(req.body,"ertt")
  try {
    const token = await getAccessToken();

    const payload = req.body;

    const response = await axios.post(`${BASE_URL}/orders`, payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        'Request-ID': 'c17ce30f-f88e-4f81-ada1-c3b4909ed235',
        'Request-Timestamp': '2024-07-09T07:57:08.022Z',
        'accept': 'application/json'
      }
    }
    );
    res.send({ status: 200, data: response.data });
  } catch (err) {
    // console.error(err.response?.data || err.message);
    res.status(500).json(
      err.response?.data || { error: err.message }
    );
  }
}




export async function captureOrder(req, res) {
  const { order_id } = req.params; // from URL

  const payload = {
    merchant_capture_reference: `CAP-${Date.now()}`,
    capture_amount: {
      value: 4000,     // paise (≤ authorized amount)
      currency: "INR"
    }
  };

  try {
    const response = await axios.post(`${BASE_URL}/orders/${order_id}/capture`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json(response.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json(
      err.response?.data || { error: err.message }
    );
  }
}




