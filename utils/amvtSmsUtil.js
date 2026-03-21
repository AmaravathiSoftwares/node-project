import request from 'request';   //for otp service
import unirest from "unirest";
const otpStore = new Map();
export const sendSmsOtpAmvtServer = async (data) => {

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(otp);
    let phonenumber = data.phone_number;
    var message = "Vendor Connect " + otp + " is the OTP to complete your login. It is valid for 5 minutes. Please do not share with anyone. Team Amaravathi";

    otpStore.set(data.phone_number, otp);

    const smsApiUrl = `http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${phonenumber}&senderid=AMVTIT&msg=${message}&template_id=1207165884239050921`;
    return new Promise((resolve, reject) => {
        request(smsApiUrl, function (error, response, body) {
            if (error) {
                return { status: 500, msg: 'SMS sending failed', error };
            }

            //whatsapp
            var req = unirest("POST", "https://live-mt-server.wati.io/370700/api/v1/sendTemplateMessages");
            // var generatedate = moment().format("DDMMYY");
            req.headers({
                "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOGVmNTM4OC00OGJhLTQzOGQtYjFkMi1iZDA0YWNlMjc0Y2EiLCJ1bmlxdWVfbmFtZSI6Im1kbWVwbWEyQGFwbWVwbWEuZ292LmluIiwibmFtZWlkIjoibWRtZXBtYTJAYXBtZXBtYS5nb3YuaW4iLCJlbWFpbCI6Im1kbWVwbWEyQGFwbWVwbWEuZ292LmluIiwiYXV0aF90aW1lIjoiMDUvMDYvMjAyNSAxMTo1MDo0NyIsInRlbmFudF9pZCI6IjM3MDcwMCIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.xWfx7eqlu-VwGlhTYbSelcOUMv7mCqZjUDl833SrRaE"
            });

            req.type("json");
            req.send({
                "template_name": "otp_new_amvt",
                "broadcast_name": "string",
                "receivers": [
                    {
                        "whatsappNumber": "91" + phonenumber,
                        "customParams": [
                            {
                                "name": "1",
                                "value": otp
                            }
                        ]
                    }
                ]
            });
            req.end(function (res) {
            });
            resolve({ status: 200, message: 'OTP sent successfully', result: 'success' });
        });
    });


}



export const verifySmsOtpAmvtServer = async (data) => {
    console.log(data, 'verify otp');
    const storedOtp = otpStore.get(data.phone_number);
    console.log(storedOtp, data.otp);
    if (storedOtp == data.otp) {
        otpStore.delete(data.phone_number);
        return { status: 200, message: 'OTP verified successfully', result: 'success' };
    } else {
        return { status: 400, message: 'Invalid OTP', result: 'failed' }
    }
}

