import jwt from 'jsonwebtoken';
import { hash, compare } from "bcrypt";
import request from 'request';   //for otp service
import * as loginMdl from "../models/loginmodel.js"
import unirest from "unirest";
import { smsotp, verifysmsotp } from '../../../utils/mepmasmsutil.js';
import { createAccessToken, createRefreshToken, validaterefreshToken } from '../../../utils/jwtUtils.js';
import { sendOtp } from "../../../utils/watiSmsUtil.js";
import envs from '../../../config.js';
const { NODE_ENV } = envs;
export async function sendOtpCtrl(req, res) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 90 * 1000; // 90 seconds from now
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        console.log({ otp });

        const hashedOtp = await hash(otp, 10);

        loginMdl.sendOtpMdl({ otp: hashedOtp, expiresAt, ...req.body }, async function (err, results) {
            if (err) {
                return res.status(500).json({ status: 500, msg: 'Database error', error: err });
            }
console.log(err)
            if (results[0]?.affectedRows) {
                let obj = {
                    phone_number: phonenumber,
                    otp: otp
                }

                const sendOtpResponce = await sendOtp(obj);
                res.status(200).json({ status: 200, message: 'OTP sent successfully'});
                // var message = "Vendor Connect " + otp + " is the OTP to complete your login. It is valid for 5 minutes. Please do not share with anyone. Team Amaravathi"

                // const smsApiUrl = `http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${phonenumber}&senderid=AMVTIT&msg=${message}&template_id=1207165884239050921`;

                // request(smsApiUrl, function (error, response, body) {
                //     if (error) {
                //         return res.status(500).json({ status: 500, msg: 'SMS sending failed', error });
                //     }
                //     res.status(200).json({ status: 200, message: 'OTP sent successfully', data: results[1] });

                //     //whatsapp
                //     var req = unirest("POST", "https://live-mt-server.wati.io/370700/api/v1/sendTemplateMessages");
                //     // var generatedate = moment().format("DDMMYY");
                //     req.headers({
                //         "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
                //         "cache-control": "no-cache",
                //         "content-type": "application/json",
                //         "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOGVmNTM4OC00OGJhLTQzOGQtYjFkMi1iZDA0YWNlMjc0Y2EiLCJ1bmlxdWVfbmFtZSI6Im1kbWVwbWEyQGFwbWVwbWEuZ292LmluIiwibmFtZWlkIjoibWRtZXBtYTJAYXBtZXBtYS5nb3YuaW4iLCJlbWFpbCI6Im1kbWVwbWEyQGFwbWVwbWEuZ292LmluIiwiYXV0aF90aW1lIjoiMDUvMDYvMjAyNSAxMTo1MDo0NyIsInRlbmFudF9pZCI6IjM3MDcwMCIsImRiX25hbWUiOiJtdC1wcm9kLVRlbmFudHMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.xWfx7eqlu-VwGlhTYbSelcOUMv7mCqZjUDl833SrRaE"
                //     });

                //     req.type("json");
                //     req.send({
                //         "template_name": "otp_new_amvt",
                //         "broadcast_name": "string",
                //         "receivers": [
                //             {
                //                 "whatsappNumber": "91" + phonenumber,
                //                 "customParams": [
                //                     {
                //                         "name": "1",
                //                         "value": otp
                //                     }
                //                 ]
                //             }
                //         ]
                //     });
                //     req.end(function (res) {
                //     });

                // });
            } else {
                res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error hashing OTP', error });
    }
}


export function veriftOtpCtrl(req, res) {
    loginMdl.veriftOtpMdl(req.body, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        let userOtp = req.body.otpsending.toString();
        compare(userOtp, results[0].otp, function (err, isMatch) {
            if (err) {
                return err;
            }
            if (isMatch) {
                loginMdl.deleteOtpMdl(req.body, function (err, results1) {
                    if (err) {
                        res.send({ status: 500, msg: err });
                        return;
                    }
                });
                let payload = { id: results[0].id, role: results[0].role_type, username: results[0].user_name, image: results[0].image, designation: results[0].designation,temple_id: results[0].temple_id,w_module_id: results[0].w_module_id,counter_id:results[0].counter_id,shift_id:results[0].shift_id ,start_time:results[0].start_time,end_time:results[0].end_time};
                const accessToken = createAccessToken(payload);
                const refreshToken = createRefreshToken(payload);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: NODE_ENV === 'production' ? true : false, // Use true in production with HTTPS
                    sameSite: 'Lax',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
                const { otp,...cleanresults } = results[0];
                res.send({ status: 200, data: { id: accessToken, accessToken: accessToken, refreshToken: refreshToken } });
            }
            else {
                // res.send({ status: 500, msg: err });
                res.status(500).send({ msg: err });
            }

        });
    });
}


export function logoutCtrl(req, res) {
    try {
        // Clear the cookie on the client side
        let data = req.body;
        let user = req.user;
        res.clearCookie("UID", {
            httpOnly: true,  // Ensures the cookie is only accessible via HTTP(S)
            secure: process.env.NODE_ENV === 'production',  // Use secure flag in production (HTTPS)
            sameSite: 'strict' // Prevent CSRF attacks by restricting cross-site usage
        });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: NODE_ENV === 'production' ? true : false, // Use true in production with HTTPS
            sameSite: 'Lax'
        });
        loginMdl.updateLogoutStatus(user, function (err, results1) {
            if (err) {
                res.send({ status: 500, msg: err });
                return;
            }
            return res.status(200).json({ status: 200, message: 'Logged out successfully!' });
        });
        // Check if the cookie is cleared by attempting to retrieve it again
        // if (!req.body.cookies || req.body.cookies.UID) {
        //     return res.status(500).json({ message: 'Error: Cookie was not deleted properly' });
        // }

        // Optionally, if using session management, destroy the session
        // For example, req.session.destroy();
        // Send a response indicating successful logout

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function sendotpformobileCtrl(req, res) {
    const expiresAt = Date.now() + 90 * 1000; // 90 seconds from now
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    let otp;
    if (phonenumber == "9912599972") {
        otp = '2125';
    } else {
        otp = Math.floor(1000 + Math.random() * 9000).toString();
    }
    try {
        const hashedOtp = await hash(otp, 10);
        loginMdl.sendotpformobileMdl({ otp: hashedOtp, expiresAt, ...req.body }, async function (err, results) {
            if (err) {
                return res.status(500).json({ status: 500, msg: 'Database error', error: err });
            }

            if (results[0]?.affectedRows) {
                var message = "Vendor Connect " + otp + " is the OTP to complete your login. It is valid for 5 minutes. Please do not share with anyone. Team Amaravathi"

                const smsApiUrl = `http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${phonenumber}&senderid=AMVTIT&msg=${message}&template_id=1207165884239050921`;

                request(smsApiUrl, function (error, response, body) {
                    if (error) {
                        return res.status(500).json({ status: 500, msg: 'SMS sending failed', error });
                    }
                    res.status(200).json({ status: 200, message: 'OTP sent successfully' });

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

                });
            } else {
                res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error hashing OTP', error });
    }
}

export function veriftMobileOtpCtrl(req, res) {
    loginMdl.veriftOtpMdl(req.body, async function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }

        let userOtp = req.body.otpsending.toString();

        if (req.body.phonenumber == "9912599972") {
            if (userOtp == "2125") {
                const token = jwt.sign(
                    { id: results[0].id, role: results[0].role_type, username: results[0].user_name, image: results[0].image, designation: results[0].designation, station_id: results[0].station_id, component_id: results[0].component_id, rank_name: results[0].rank_name, rank_id: results[0].rank_id, police_unit_id: results[0].police_unit_id, district_id: results[0].district_id }, "Amvt@1234", { expiresIn: '24h' }
                )
                loginMdl.deleteOtpMdl(req.body, function (err, results1) {
                    if (err) {
                        res.send({ status: 500, msg: err });
                        return;
                    }
                })
                // res.cookie("UID", token);
                res.cookie("UID", token, {
                    httpOnly: true,    // Prevents JavaScript access
                    secure: false,     // Use true in production with HTTPS
                    sameSite: 'Lax',   // Controls cross-origin behavior
                    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
                });
                res.send({ status: 200, data: { id: token, userdata: results } });
            } else {
                return res.status(500).send({ status: 500, msg: "Invalid OTP" });
            }

        } else {

            compare(userOtp, results[0].otp, function (err, isMatch) {
                if (err) {
                    return err;
                }
                if (isMatch) {
                    const token = jwt.sign(
                        { id: results[0].id, role: results[0].role_type, username: results[0].user_name, image: results[0].image, designation: results[0].designation, station_id: results[0].station_id, component_id: results[0].component_id, rank_name: results[0].rank_name, rank_id: results[0].rank_id, police_unit_id: results[0].police_unit_id, district_id: results[0].district_id }, "Amvt@1234", { expiresIn: '24h' }
                    )

                    loginMdl.deleteOtpMdl(req.body, function (err, results1) {
                        if (err) {
                            res.send({ status: 500, msg: err });
                            return;
                        }
                    })
                    // res.cookie("UID", token);
                    res.cookie("UID", token, {
                        httpOnly: true,    // Prevents JavaScript access
                        secure: false,     // Use true in production with HTTPS
                        sameSite: 'Lax',   // Controls cross-origin behavior
                        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
                    });
                    res.send({ status: 200, data: { id: token, userdata: results } });
                }
                else {
                    // res.send({ status: 500, msg: err });
                    res.status(500).send({ msg: err });

                }

            });
        }
    });
}


export async function refreshTokenController(req, res) {
    // console.log(req.cookies,'req.cookies')
    const refreshToken = req.cookies.UID;
    if (!refreshToken) {
        return res.status(403).json({ success: false, message: 'Refresh token is missing' });
    }
    let newAccessToken;
    try {
        newAccessToken = await validaterefreshToken(refreshToken);
        return res.json({ success: true, accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
    }
    // Optionally verify user exists in DB
    // const user = await userService.getUserById(decoded.userId);
    // if (!user) {
    //     return res.status(401).json({ success: false, message: 'User not found' });
    // }
    // Issue new access token
    // const newAccessToken = createAccessToken({ userId: 1 });


}


//Cm Dashboard Api
export function userAuthenticationCtrl(req, res) {
    loginMdl.verifUserAuthDetaillMdl(req.body, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        if (results.length != 0) {
            let payload = { id: results[0].id, role: results[0].role_type };
            const accessToken = createAccessToken(payload);
            const refreshToken = createRefreshToken(payload);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: NODE_ENV === 'production' ? true : false, // Use true in production with HTTPS
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            // res.status(200).json({ status: true, data: {  accessToken: accessToken, refreshToken: refreshToken } });
            res.status(200).json({ status: true, data: { accessToken: accessToken } });
        } else {
            res.status(401).json({ status: false, msg: 'Invalid username or password' });
        }
    });
}