import * as masterMdl from '../models/kioskModel.js';
import fs from "fs";
import path from "path";
import pdf from 'pdf-creator-node';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import { sendOtp, sendMobileOtp, rollalert } from "../../../utils/watiSmsUtil.js"
import { createAccessToken, createRefreshToken, validaterefreshToken } from '../../../utils/jwtUtils.js';
import envs from '../../../config.js';
import { createPaymentOrder, getPaymentStatus } from '../gateway/payment.js'

const { NODE_ENV } = envs;
import crypto from 'crypto';

// app logins   
export async function apprefreshTokenController(req, res) {
    // console.log(req.body,'req.cookies')
    const refreshToken = req.body.refreshToken;
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

export async function sendOtpForLogoutCtrl(req, res) {
    const expiresAt = Date.now() + 90 * 1000;
    const { phonenumber, resendStatus } = req.body;
    if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    let otp;
    if (phonenumber == "9912599972" || phonenumber == "9912599971") {
        otp = '2124';
    } else {
        otp = Math.floor(1000 + Math.random() * 9000).toString();
    }
    try {
        console.log(otp)
        const hashedOtp = await hash(otp, 10);
        masterMdl.sendOtpForLogoutMdl({ otp: hashedOtp, expiresAt, ...req.body }, async function (err, results) {
            if (err) {
                return res.status(500).json({ status: 500, msg: 'Database error', error: err });
            }
            if (results[0]?.affectedRows) {
                let obj = {
                    phone_number: phonenumber,
                    otp: otp,
                    resendStatus: resendStatus
                }
                const response = await sendMobileOtp(obj);
                res.status(200).json({ status: 200, message: 'OTP sent successfully' });

            } else {
                res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error hashing OTP', error });
    }
}

export function VerifyOtpForLogoutCtrl(req, res) {
    masterMdl.veriftOtpMdl(req.body, async function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        let userOtp = req.body.otpsending.toString();
        if (req.body.phonenumber == "9912599972" || req.body.phonenumber == "9912599971") {
            if (userOtp == "2124") {
                masterMdl.deleteOtpMdl(req.body, function (err, results1) {
                    if (err) {
                        res.send({ status: 500, msg: err });
                        return;
                    }
                })
                res.send({ status: 200, msg: 'Logout Successfully.' });
            } else {
                return res.status(500).send({ status: 500, msg: "Invalid OTP" });
            }

        } else {
            compare(userOtp, results[0].otp, function (err, isMatch) {
                if (err) {
                    return err;
                }
                if (isMatch) {
                    res.send({ status: 200, msg: 'Logout Successfully' });
                }
                else {
                    res.status(500).send({ msg: err });
                }
            });
        }
    });
}

export async function sendotpformobileCtrl(req, res) {
    const expiresAt = Date.now() + 90 * 1000;
    const { phonenumber, resendStatus } = req.body;
    if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    let otp;
    if (phonenumber == "9912599972" || phonenumber == "9912599971") {
        otp = '2125';
    } else {
        otp = Math.floor(1000 + Math.random() * 9000).toString();
    }
    try {
        console.log(otp)
        const hashedOtp = await hash(otp, 10);
        masterMdl.sendotpformobileMdl({ otp: hashedOtp, expiresAt, ...req.body }, async function (err, results) {
            if (err) {
                return res.status(500).json({ status: 500, msg: 'Database error', error: err });
            }
            if (results[0]?.affectedRows) {
                let obj = {
                    phone_number: phonenumber,
                    otp: otp,
                    resendStatus: resendStatus
                }
                const response = await sendMobileOtp(obj);
                res.status(200).json({ status: 200, message: 'OTP sent successfully' });

            } else {
                res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error hashing OTP', error });
    }
}

export function veriftMobileOtpCtrl(req, res) {
    masterMdl.veriftOtpMdl(req.body, async function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        let userOtp = req.body.otpsending.toString();
        if (req.body.phonenumber == "9912599972") {
            if (userOtp == "2125") {
                let payload = { id: results[0].id, role: results[0].role_type, username: results[0].user_name, image: results[0].image, designation: results[0].designation, temple_id: results[0].temple_id };
                const accessToken = createAccessToken(payload);
                const refreshToken = createRefreshToken(payload);
                masterMdl.deleteOtpMdl(req.body, function (err, results1) {
                    if (err) {
                        res.send({ status: 500, msg: err });
                        return;
                    }
                })

                res.cookie("UID", accessToken, {
                    httpOnly: true,
                    path: '/',
                    secure: NODE_ENV === 'production' ? true : false,
                    sameSite: 'Lax',
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.send({ status: 200, data: { id: accessToken, userdata: results, refreshToken: refreshToken } });
            } else {
                return res.status(500).send({ status: 500, msg: "Invalid OTP" });
            }

        } else {

            compare(userOtp, results[0].otp, function (err, isMatch) {
                if (err) {
                    return err;
                }
                if (isMatch) {
                    let payload = { id: results[0].id, role: results[0].role_type, username: results[0].user_name, image: results[0].image, designation: results[0].designation, temple_id: results[0].temple_id };
                    const accessToken = createAccessToken(payload);
                    const refreshToken = createRefreshToken(payload);
                    masterMdl.deleteOtpMdl(req.body, function (err, results1) {
                        if (err) {
                            res.send({ status: 500, msg: err });
                            return;
                        }
                    })

                    res.cookie("UID", accessToken, {
                        httpOnly: true,
                        path: '/',
                        secure: NODE_ENV === 'production' ? true : false,
                        sameSite: 'Lax',
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.send({ status: 200, data: { id: accessToken, userdata: results, refreshToken: refreshToken } });
                }
                else {
                    res.status(500).send({ msg: err });
                }

            });
        }
    });
}

export function getMobileappProfileCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.user_id = user.id;
    masterMdl.getMobileappProfileMdl(data, function (err, result) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        return res.status(200).send({ status: 200, data: result });
    });
};

export function checkMobileAppversionCtrl(req, res) {
    const data = req.body;
    masterMdl.checkMobileAppversionMdl(data, function (err, result) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        return res.status(200).send({ status: 200, data: result });
    });
};

export function gettempledetailsCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.temple_id = user.temple_id;
    masterMdl.gettempledetailsMdl(data, function (err, result) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        return res.status(200).send({ status: 200, data: result });
    });
};

//RGTs Apis
export async function getDistrictsCtrl(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        console.log(user);

        masterMdl.getDistrictsMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

// export async function getTemplesCtrl(req, res) {
//     try {
//         const data = req.body;
//         masterMdl.getTemplesMdl(data, function (err, result) {
//             if (err) {
//                 return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//             }
//             return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };

export async function getTemplesCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getTemplesMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }

            const IMAGE_DIR = path.join('/mnt/uploads/whatsappservice/templeprofiles');
            const formattedResult = result.map(item => {
                let base64Image = null;
                if (item.temple_logo) {
                    const fileName = item.temple_logo.split('/').pop();
                    const imagePath = path.join(IMAGE_DIR, fileName);
                    base64Image = imageToBase64(imagePath);
                }
                return {
                    ...item,
                    temple_logo_base64: base64Image
                };
            });

            return res.status(200).json({ status: true, code: 'SUCCESS', data: formattedResult });
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            code: 'UNEXPECTED_ERROR',
            message: 'Something went wrong'
        });
    }
}

export async function getServicesListCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getServicesListMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

// Darshnam start
export async function getDarshnamServiceCtrl(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        masterMdl.getDarshnamServiceMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};
export async function getDarshanSlotsCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getDarshanSlotsMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};



// export async function updateDarshnamOrderStatusCtrl(req, res) {
//     try {
//         const data = req.body;

//         masterMdl.getDarshanDetailswithTicketid(data, async function (err, result) {
//             if (result) {

//                 const paymentstatus = await getPaymentStatus(result[0].order_id, result[0].temple_id);

//                 masterMdl.updateDarshnamOrderStatusMdl(data, paymentstatus, function (err, resulta) {
//                     if (err) {
//                         return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                     }
//                     return res.status(200).json({ status: true, code: paymentstatus.status, message: paymentstatus.message, data: result });
//                 });

//             } else {
//                 return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'NO RECORD FOUND' });
//             }

//             // return res.status(200).json({ status: true, code: "SUCCESS", message: "test", data: result });

//         })

//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };

//mana mitra apis start

export async function updateDarshnamOrderStatusCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getDarshanDetailswithTicketid(data, async function (err, result) {
            if (result) {

                let order_id, temple_id;

                if (data.category_type == 6) {
                    order_id = result[0][0].order_id;
                    temple_id = result[0][0].temple_id;
                } else {
                    order_id = result[0].order_id;
                    temple_id = result[0].temple_id;
                }

                const paymentstatus = await getPaymentStatus(order_id, temple_id);

                masterMdl.updateDarshnamOrderStatusMdl(data, paymentstatus, function (err, resulta) {
                    if (err) {
                        return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                    }

                    return res.status(200).json({ status: true, code: paymentstatus.status, message: paymentstatus.message, data: result });
                });


            } else {
                return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'NO RECORD FOUND' });
            }

        })

    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function getTonsureMainCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getTonsureMainMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};



export async function getblockdatesCtrl(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        data.temple_id = user.temple_id;
        masterMdl.getblockdatesMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function getPrasadameMainCtrl(req, res) {
    try {
        const data = req.body;

        masterMdl.getPrasadameMainMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function getSevaTypesCtrl(req, res) {
    try {
        const data = req.body;

        masterMdl.getSevaTypesMdl(function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function getSevaMainCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getSevaMainMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function getAccommodationMainCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getAccommodationMainMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function getSevaSlotsMainCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getSevaSlotsMainMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};


export async function getsevascountforcalenderCtrl(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        data.entry_by = user.id;
        data.temple_id = user.temple_id;

        masterMdl.getsevascountforcalenderMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function postrollsdata(req, res) {
    // try {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    data.temple_id = user.temple_id;
    masterMdl.postrollsdata(data, function (err, result) {
        if (err) {
            return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
        }
        return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
    });
    // } catch (error) {
    //     return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    // }
};



export async function getSevaAccommodationMainCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getSevaAccommodationMainMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            return res.status(200).json({ status: true, code: 'SUCCESS', data: result });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};







export async function createAccommodationOrderCtrl(req, res) {
    try {
        const data = req.body;
        masterMdl.getAccommodationTicketRefMdl(function (err, tckitresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            console.log(tckitresults, 'tckitresults')
            let ticket_id = 0;
            if (tckitresults.length) {
                ticket_id = tckitresults[0].ticket_id;
            }
            const recidi = ((ticket_id * 1) + 1);
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}${mm}${dd}`;
            const recid = `${dateStr}${recidi}`;
            data.ticket_id = recid;
            let total_amount = 0;
            total_amount = (data.amount * 1 + data.handling_charge * 1);
            data.total_amount = total_amount;
            masterMdl.createAccommodationOrderMdl(data, function (err, result) {
                if (err) {
                    return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                }
                return res.status(200).json({ status: true, code: 'SUCCESS', "message": "order created successfully" });
            });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

// export async function createeDarshnamOrdersCtrl(req, res) {
//     try {
//         const data = req.body;
//         let user = req.user;
//         data.entry_by = user.id;
//         data.temple_id = user.temple_id;
//         data.handling_charge = 0;

//         //----------------------------Check Amount----------------------------------------------------
//         const verifyResult = await new Promise((resolve, reject) => {
//             masterMdl.verifydarshanam(data, (err, results) => {
//                 if (err) return reject(err);
//                 resolve(results);
//             });
//         });

//         if (!verifyResult.length) {
//             return res.status(400).json({
//                 status: false,
//                 code: 'INVALID DARSHAN',
//                 message: 'Invalid darshan type'
//             });
//         }

//         const actualPrice = Number(verifyResult[0].price);
//         const expectedTotal = actualPrice * Number(data.no_persons);

//         if (expectedTotal !== Number(data.amount)) {
//             return res.status(403).json({
//                 status: false,
//                 code: 'AMOUNT_TAMPERED',
//                 message: 'Amount mismatch detected'
//             });
//         }

//         //----------------------------Check Amount----------------------------------------------------

//         masterMdl.getTicketRefMdl(async function (err, tckitresults) {
//             if (err) {
//                 return res.status(500).send({ status: 500, msg: "Server Error" });
//             }
//             let ticket_id = 0;
//             if (tckitresults.length) {
//                 ticket_id = tckitresults[0].ticket_id;
//             }
//             const recidi = ((ticket_id * 1) + 1);
//             const today = new Date();
//             const yyyy = today.getFullYear();
//             const mm = String(today.getMonth() + 1).padStart(2, '0');
//             const dd = String(today.getDate()).padStart(2, '0');
//             const dateStr = `${yyyy}${mm}${dd}`;
//             const recid = `${dateStr}101${recidi}`;
//             data.ticket_id = recid;

//             let total_amount = (data.amount * 1 + data.handling_charge * 1);
//             data.total_amount = total_amount * 1;
//             const paymentPayload = {
//                 "merchant_order_reference": recid,
//                 "order_amount": {
//                     "value": (total_amount * 1) * (100 * 1),
//                     // "value": 100,
//                     "currency": "INR"
//                 },
//                 "integration_mode": "SDK",
//                 "pre_auth": false,
//                 "notes": "Darshan booking",
//                 "allowed_payment_methods": [
//                     "UPI"
//                 ],
//                 callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=1`,
//                 failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=1`,
//                 "purchase_details": {
//                     "customer": {
//                         "first_name": data.devotee_name || "",
//                         "customer_id": recidi,
//                         "mobile_number": data.contact_number,
//                         "country_code": "91",
//                         "billing_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         },
//                         "shipping_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         }
//                     },
//                     "merchant_metadata": {
//                         "key1": "DD",
//                         "key2": "XOF"
//                     }
//                 }
//             };

//             const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);
//             data.order_id = paymentResult.order_id;
//             data.payment_status = 'PENDING';
//             masterMdl.createeDarshnamOrdersMdl(data, function (err, result) {
//                 if (err) {
//                     return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                 }
//                 return res.status(200).json({
//                     status: true, code: 'SUCCESS', message: "Darshan order created successfully", ticket_id: recid, total_amount: total_amount,
//                     payment: {
//                         order_id: paymentResult.order_id,
//                         redirect_url: paymentResult.redirect_url
//                     }
//                 });
//             });
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             code: 'UNEXPECTED_ERROR',
//             message: 'Something went wrong'
//         });
//     }
// }


export async function createeDarshnamOrdersCtrlOrg(req, res) {

    try {
        const data = req.body;
        let user = req.user;
        data.entry_by = user.id;
        data.temple_id = user.temple_id;
        data.handling_charge = 0;
        data.order_id = '';
        data.payment_status = 'PENDING';
        let total_amount = (data.amount * 1 + data.handling_charge * 1);
        data.total_amount = total_amount * 1;

        masterMdl.createeDarshnamOrdersMdl(data, async function (err, tckitresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            console.log(tckitresults)
            let recidi = 0;
            if (tckitresults) {
                recidi = tckitresults.insertId;
            }
            // const recidi = ((ticket_id * 1) + 1);
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}${mm}${dd}`;
            const recid = `${dateStr}101${recidi}`;
            data.ticket_id = recid;
            const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
            const shortKey = hash.slice(0, 12);
            console.log(shortKey, 'shortKey');

            const paymentPayload = {
                "merchant_order_reference": shortKey,
                "order_amount": {
                    "value": (total_amount * 1) * (100 * 1),
                    // "value": 100,
                    "currency": "INR"
                },
                "integration_mode": "SDK",
                "pre_auth": false,
                "notes": "Darshan booking",
                "allowed_payment_methods": [
                    "UPI"
                ],
                callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=1`,
                failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=1`,
                "purchase_details": {
                    "customer": {
                        "first_name": data.devotee_name || "Devotee",
                        "customer_id": shortKey,
                        "mobile_number": data.contact_number,
                        "country_code": "91",
                        "billing_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        },
                        "shipping_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        }
                    },
                    "merchant_metadata": {
                        "key1": "DD",
                        "key2": "XOF"
                    }
                }
            };

            console.log(paymentPayload, 'paymentPayload')

            const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

            data.order_id = paymentResult.order_id
            data.ticket_id = recid
            data.id = tckitresults.insertId
            data.shortKey = shortKey;
            masterMdl.updatedarshanamorder_idMdl(data, function (err, result) {
                if (err) {
                    return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                }
                return res.status(200).json({
                    status: true, code: 'SUCCESS', message: "Darshan order created successfully", ticket_id: recid, total_amount: total_amount,
                    payment: {
                        order_id: paymentResult.order_id,
                        redirect_url: paymentResult.redirect_url
                    }
                });
            });
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            code: 'UNEXPECTED_ERROR',
            message: 'Something went wrong'
        });
    }
}

export async function createSevaOrderCtrlOrg(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        data.entry_by = user.id;
        data.temple_id = user.temple_id;
        data.handling_charge = 0;

        let total_amount = 0;
        total_amount = (data.amount * 1 + data.handling_charge * 1);
        data.total_amount = total_amount;

        data.order_id = '';
        data.payment_status = 'PENDING';

        masterMdl.createSevaOrderMdl(data, async function (err, tckitresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            console.log(tckitresults, 'tckitresults')
            let recidi = 0;
            if (tckitresults) {
                recidi = tckitresults.insertId;
            }
            // const recidi = ((ticket_id * 1) + 1);
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}${mm}${dd}102`;
            const recid = `${dateStr}${recidi}`;
            data.ticket_id = recid;
            const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
            const shortKey = hash.slice(0, 12);

            const paymentPayload = {
                "merchant_order_reference": shortKey,
                "order_amount": {
                    "value": (total_amount * 1) * (100 * 1),
                    "currency": "INR"
                },
                "integration_mode": "SDK",
                "pre_auth": false,
                "notes": "Seva booking",
                "allowed_payment_methods": ["UPI"],
                callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=2`,
                failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=2`,
                "purchase_details": {
                    "customer": {
                        "first_name": "Seva" || "",
                        "customer_id": shortKey,
                        "mobile_number": data.contact_number,
                        "country_code": "91",
                        "billing_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        },
                        "shipping_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        }
                    },
                    "merchant_metadata": {
                        "key1": "DD",
                        "key2": "XOF"
                    }
                }
            };
            const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

            data.order_id = paymentResult.order_id;
            data.ticket_id = recid
            data.id = tckitresults.insertId
            data.shortKey = shortKey;
            masterMdl.UpdateSevaOrder_id(data, function (err, result) {
                if (err) {
                    return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                }
                return res.status(200).json({
                    status: true, code: 'SUCCESS', message: "Order Seva created successfully", ticket_id: recid, total_amount: total_amount,
                    payment: {
                        order_id: paymentResult.order_id,
                        redirect_url: paymentResult.redirect_url
                    }
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};


// export async function createSevaOrderCtrl(req, res) {
//     try {
//         const data = req.body;
//         let user = req.user;
//         data.entry_by = user.id;
//         data.temple_id = user.temple_id;
//         data.handling_charge = 0;
//         // seva_id , amount 
//         //----------------------------Check Amount----------------------------------------------------
//         const verifyResult = await new Promise((resolve, reject) => {
//             masterMdl.verifySeva(data, (err, results) => {
//                 if (err) return reject(err);
//                 resolve(results);
//             });
//         });

//         if (!verifyResult.length) {
//             return res.status(400).json({
//                 status: false,
//                 code: 'INVALID Seva',
//                 message: 'Invalid Seva type'
//             });
//         }

//         const actualPrice = Number(verifyResult[0].price);
//         const expectedTotal = actualPrice

//         if (expectedTotal !== Number(data.amount)) {
//             return res.status(403).json({
//                 status: false,
//                 code: 'AMOUNT_TAMPERED',
//                 message: 'Seva Amount mismatch detected'
//             });
//         }

//         //----------------------------Check Amount----------------------------------------------------

//         masterMdl.getSevaTicketRefMdl(async function (err, tckitresults) {
//             if (err) {
//                 return res.status(500).send({ status: 500, msg: "Server Error" });
//             }
//             console.log(tckitresults, 'tckitresults')
//             let ticket_id = 0;
//             if (tckitresults.length) {
//                 ticket_id = tckitresults[0].ticket_id;
//             }
//             const recidi = ((ticket_id * 1) + 1);
//             const today = new Date();
//             const yyyy = today.getFullYear();
//             const mm = String(today.getMonth() + 1).padStart(2, '0');
//             const dd = String(today.getDate()).padStart(2, '0');
//             const dateStr = `${yyyy}${mm}${dd}102`;
//             const recid = `${dateStr}${recidi}`;
//             data.ticket_id = recid;
//             let total_amount = 0;
//             total_amount = (data.amount * 1 + data.handling_charge * 1);
//             data.total_amount = total_amount;
//             const paymentPayload = {
//                 "merchant_order_reference": recid,
//                 "order_amount": {
//                     "value": (total_amount * 1) * (100 * 1),
//                     // "value": 100,
//                     "currency": "INR"
//                 },
//                 "integration_mode": "SDK",
//                 "pre_auth": false,
//                 "notes": "Seva booking",
//                 "allowed_payment_methods": [
//                     "UPI"
//                 ],
//                 callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=2`,
//                 failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=2`,
//                 "purchase_details": {
//                     "customer": {
//                         "first_name": "Seva" || "",
//                         "customer_id": recidi,
//                         "mobile_number": data.contact_number,
//                         "country_code": "91",
//                         "billing_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         },
//                         "shipping_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         }
//                     },
//                     "merchant_metadata": {
//                         "key1": "DD",
//                         "key2": "XOF"
//                     }
//                 }
//             };
//             const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);
//             data.order_id = paymentResult.order_id;
//             data.payment_status = 'PENDING';
//             masterMdl.createSevaOrderMdl(data, function (err, result) {
//                 if (err) {
//                     return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                 }
//                 return res.status(200).json({
//                     status: true, code: 'SUCCESS', message: "Order Seva created successfully", ticket_id: recid, total_amount: total_amount,
//                     payment: {
//                         order_id: paymentResult.order_id,
//                         redirect_url: paymentResult.redirect_url
//                     }
//                 });
//             });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };

// export async function createPrasadamOrderCtrl(req, res) {
//     try {
//         const data = req.body;
//         let user = req.user;
//         data.entry_by = user.id;
//         data.temple_id = user.temple_id;

//         data.handling_charge = 0;

//         // ---------------- FETCH PRASADAM PRICES ----------------
//         const prasadamResult = await new Promise((resolve, reject) => {
//             masterMdl.verifyprasdam(data, (err, results) => {
//                 if (err) return reject(err);
//                 resolve(results);
//             });
//         });

//         // Ensure all IDs are valid
//         if (prasadamResult.length !== data.ordered_items.length) {
//             return res.status(400).json({
//                 status: false,
//                 code: 'INVALID_PRASADAM',
//                 message: 'One or more prasadam items are invalid'
//             });
//         }

//         // Map prices
//         const priceMap = {};
//         prasadamResult.forEach(row => {
//             priceMap[row.prasadam_id] = Number(row.price);
//         });

//         // ---------------- CALCULATE TOTAL ----------------
//         let calculatedTotal = 0;

//         for (const item of data.ordered_items) {
//             const dbPrice = priceMap[item.prasadam_id];

//             if (!dbPrice) {
//                 return res.status(400).json({
//                     status: false,
//                     code: 'INVALID_PRASADAM',
//                     message: `Invalid prasadam ID ${item.prasadam_id}`
//                 });
//             }

//             calculatedTotal += dbPrice * item.quantity;
//         }

//         // ---------------- FINAL CHECK ----------------
//         if (calculatedTotal !== Number(data.amount)) {
//             return res.status(403).json({
//                 status: false,
//                 code: 'AMOUNT_TAMPERED',
//                 message: 'Prasadam amount mismatch detected'
//             });
//         }

//         let ordered_items = data.ordered_items;
//         masterMdl.getPrasadamTicketRefMdl(async function (err, tckitresults) {
//             if (err) {
//                 return res.status(500).send({ status: 500, msg: "Server Error" });
//             }
//             console.log(tckitresults, 'tckitresults')
//             let ticket_id = 0;
//             if (tckitresults.length) {
//                 ticket_id = tckitresults[0].ticket_id;
//             }
//             const recidi = ((ticket_id * 1) + 1);
//             const today = new Date();
//             const yyyy = today.getFullYear();
//             const mm = String(today.getMonth() + 1).padStart(2, '0');
//             const dd = String(today.getDate()).padStart(2, '0');
//             const dateStr = `${yyyy}${mm}${dd}103`;
//             const recid = `${dateStr}${recidi}`;
//             data.ticket_id = recid;
//             let total_amount = 0;
//             let gtot = 0;
//             gtot = (data.amount * 1)
//             total_amount = (gtot * 1 + data.handling_charge * 1);
//             data.total_amount = total_amount;
//             data.gtot = gtot;

//             const paymentPayload = {
//                 "merchant_order_reference": recid,
//                 "order_amount": {
//                     "value": (total_amount * 1) * (100 * 1),
//                     // "value": 100,
//                     "currency": "INR"
//                 },
//                 "integration_mode": "SDK",
//                 "pre_auth": false,
//                 "notes": "Prasadam booking",
//                 "allowed_payment_methods": [
//                     "UPI"
//                 ],
//                 callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=3`,
//                 failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=3`,
//                 "purchase_details": {
//                     "customer": {
//                         "first_name": data.devotee_name || "",
//                         "customer_id": recidi,
//                         "mobile_number": data.contact_number,
//                         "country_code": "91",
//                         "billing_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         },
//                         "shipping_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         }
//                     },
//                     "merchant_metadata": {
//                         "key1": "DD",
//                         "key2": "XOF"
//                     }
//                 }

//             };
//             const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);
//             data.order_id = paymentResult.order_id;
//             data.payment_status = 'PENDING';

//             masterMdl.createPrasadamOrderMdl(data, function (err, result) {
//                 if (err) {
//                     return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                 }
//                 masterMdl.prasadamOrderItemsMdl(ordered_items, data.booking_date, result.insertId, function (err, result) {
//                     if (err) {
//                         return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                     }

//                     return res.status(200).json({
//                         status: true, code: 'SUCCESS', message: "Order Prasadam created successfully", ticket_id: recid, total_amount: total_amount,
//                         payment: {
//                             order_id: paymentResult.order_id,
//                             redirect_url: paymentResult.redirect_url
//                         }
//                     });
//                 });
//                 // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Order created successfully" });
//             });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };

export async function createPrasadamOrderCtrlOrg(req, res) {
    console.log('payment in')
    try {
        const data = req.body;
        let user = req.user;
        data.entry_by = user.id;
        data.temple_id = user.temple_id;
        data.handling_charge = 0;


        let ordered_items = data.ordered_items;
        let total_amount = 0;
        let gtot = 0;
        gtot = (data.amount * 1)
        total_amount = (gtot * 1 + data.handling_charge * 1);
        data.total_amount = total_amount;
        data.gtot = gtot;
        data.order_id = '';
        data.payment_status = 'PENDING';

        masterMdl.createPrasadamOrderMdl(data, async function (err, tckitresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            console.log(tckitresults, 'tckitresults')
            let recidi = 0;
            if (tckitresults) {
                recidi = tckitresults.insertId;
            }
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}${mm}${dd}103`;
            const recid = `${dateStr}${recidi}`;
            data.ticket_id = recid;
            const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
            const shortKey = hash.slice(0, 12);

            const paymentPayload = {
                "merchant_order_reference": shortKey,
                "order_amount": {
                    "value": (total_amount * 1) * (100 * 1),
                    // "value": 100,
                    "currency": "INR"
                },
                "integration_mode": "SDK",
                "pre_auth": false,
                "notes": "Prasadam booking",
                "allowed_payment_methods": [
                    "UPI"
                ],
                callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=3`,
                failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=3`,
                "purchase_details": {
                    "customer": {
                        "first_name": data.devotee_name || "Devotee",
                        "customer_id": shortKey,
                        "mobile_number": data.contact_number,
                        "country_code": "91",
                        "billing_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        },
                        "shipping_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        }
                    },
                    "merchant_metadata": {
                        "key1": "DD",
                        "key2": "XOF"
                    }
                }

            };
            const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

            data.order_id = paymentResult.order_id;
            data.ticket_id = recid
            data.id = tckitresults.insertId
            data.shortKey = shortKey;
            masterMdl.UpdatePrasadamOrder_id(data, function (err, resulta) {
                if (err) {
                    return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                }
                masterMdl.prasadamOrderItemsMdl(ordered_items, data.booking_date, tckitresults.insertId, function (err, resulta) {
                    if (err) {
                        return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                    }

                    return res.status(200).json({
                        status: true, code: 'SUCCESS', message: "Order Prasadam created successfully", ticket_id: recid, total_amount: total_amount,
                        payment: {
                            order_id: paymentResult.order_id,
                            redirect_url: paymentResult.redirect_url
                        }
                    });
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

export async function createTonsureOrderCtrlOrg(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        data.entry_by = user.id;
        data.temple_id = user.temple_id;

        data.handling_charge = 0;
        let total_amount = 0;
        total_amount = (data.amount * 1 + data.handling_charge * 1);
        data.total_amount = total_amount;

        data.order_id = '';
        data.payment_status = 'PENDING';

        masterMdl.createTonsureOrderMdl(data, async function (err, tckitresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            console.log(tckitresults, 'tckitresults')
            let recidi = 0;
            if (tckitresults) {
                recidi = tckitresults.insertId;
            }
            // const recidi = ((ticket_id * 1) + 1);
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}${mm}${dd}104`;
            const recid = `${dateStr}${recidi}`;
            data.ticket_id = recid;
            const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
            const shortKey = hash.slice(0, 12);


            const paymentPayload = {
                "merchant_order_reference": shortKey,
                "order_amount": {
                    "value": (total_amount * 1) * (100 * 1),
                    "currency": "INR"
                },
                "integration_mode": "SDK",
                "pre_auth": false,
                "notes": "Tonsure booking",
                "allowed_payment_methods": ["UPI"],
                callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=4`,
                failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=4`,
                "purchase_details": {
                    "customer": {
                        "first_name": data.devotee_name || "Devotee",
                        "customer_id": shortKey,
                        "mobile_number": data.contact_number,
                        "country_code": "91",
                        "billing_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        },
                        "shipping_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        }
                    },
                    "merchant_metadata": {
                        "key1": "DD",
                        "key2": "XOF"
                    }
                }
            };

            const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

            data.order_id = paymentResult.order_id;
            data.ticket_id = recid
            data.id = tckitresults.insertId
            data.shortKey = shortKey;
            masterMdl.updatetonsureOrder_id(data, function (err, result) {
                if (err) {
                    return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                }
                return res.status(200).json({
                    status: true, code: 'SUCCESS', message: " Tonsure Order  created successfully", ticket_id: recid, total_amount: total_amount,
                    payment: {
                        order_id: paymentResult.order_id,
                        redirect_url: paymentResult.redirect_url
                    }
                });
            });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};


// export async function createTonsureOrderCtrl(req, res) {
//     try {
//         const data = req.body;
//         let user = req.user;
//         data.entry_by = user.id;
//         data.temple_id = user.temple_id;

//         data.handling_charge = 0;        


//         masterMdl.getTonsureTicketRefMdl(async function (err, tckitresults) {
//             if (err) {
//                 return res.status(500).send({ status: 500, msg: "Server Error" });
//             }
//             console.log(tckitresults, 'tckitresults')
//             let ticket_id = 0;
//             if (tckitresults.length) {
//                 ticket_id = tckitresults[0].ticket_id;
//             }
//             const recidi = ((ticket_id * 1) + 1);
//             const today = new Date();
//             const yyyy = today.getFullYear();
//             const mm = String(today.getMonth() + 1).padStart(2, '0');
//             const dd = String(today.getDate()).padStart(2, '0');
//             const dateStr = `${yyyy}${mm}${dd}104`;
//             const recid = `${dateStr}${recidi}`;
//             data.ticket_id = recid;
//             let total_amount = 0;
//             total_amount = (data.amount * 1 + data.handling_charge * 1);
//             data.total_amount = total_amount;

//             const paymentPayload = {
//                 "merchant_order_reference": recid,
//                 "order_amount": {
//                     "value": (total_amount * 1) * (100 * 1),
//                     // "value": 100,
//                     "currency": "INR"
//                 },
//                 "integration_mode": "SDK",
//                 "pre_auth": false,
//                 "notes": "Tonsure booking",
//                 "allowed_payment_methods": ["UPI"],
//                 callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=4`,
//                 failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=4`,
//                 "purchase_details": {
//                     "customer": {
//                         "first_name": data.devotee_name || "",
//                         "customer_id": recidi,
//                         "mobile_number": data.contact_number,
//                         "country_code": "91",
//                         "billing_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         },
//                         "shipping_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         }
//                     },
//                     "merchant_metadata": {
//                         "key1": "DD",
//                         "key2": "XOF"
//                     }
//                 }
//             };

//             const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

//             data.order_id = paymentResult.order_id;
//             data.payment_status = 'PENDING';

//             masterMdl.createTonsureOrderMdl(data, function (err, result) {
//                 if (err) {
//                     return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                 }
//                 return res.status(200).json({
//                     status: true, code: 'SUCCESS', message: " Tonsure Order  created successfully", ticket_id: recid, total_amount: total_amount,
//                     payment: {
//                         order_id: paymentResult.order_id,
//                         redirect_url: paymentResult.redirect_url
//                     }
//                 });
//             });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };

// export async function createEhundiOrderCtrl(req, res) {
//     try {
//         const data = req.body;
//         let user = req.user;
//         data.entry_by = user.id;
//         data.temple_id = user.temple_id;

//         data.handling_charge = 0;

//         masterMdl.getEhundiTicketRefMdl(async function (err, tckitresults) {
//             if (err) {
//                 return res.status(500).send({ status: 500, msg: "Server Error" });
//             }
//             let ticket_id = 0;
//             if (tckitresults.length) {
//                 ticket_id = tckitresults[0].ticket_id;
//             }
//             const recidi = ((ticket_id * 1) + 1);
//             const today = new Date();
//             const yyyy = today.getFullYear();
//             const mm = String(today.getMonth() + 1).padStart(2, '0');
//             const dd = String(today.getDate()).padStart(2, '0');
//             const dateStr = `${yyyy}${mm}${dd}105`;
//             const recid = `${dateStr}${recidi}`;
//             data.ticket_id = recid;
//             let total_amount = 0;
//             total_amount = (data.amount * 1 + data.handling_charge * 1);
//             data.total_amount = total_amount;

//             const paymentPayload = {
//                 "merchant_order_reference": recid,
//                 "order_amount": {
//                     "value": (total_amount * 1) * (100 * 1),
//                     // "value": 100,
//                     "currency": "INR"
//                 },
//                 "integration_mode": "SDK",
//                 "pre_auth": false,
//                 "notes": "Ehundi booking",
//                 "allowed_payment_methods": ["UPI"],
//                 callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=5`,
//                 failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=5`,
//                 "purchase_details": {
//                     "customer": {
//                         "first_name": data.devotee_name || "",
//                         "customer_id": recidi,
//                         "mobile_number": data.contact_number,
//                         "country_code": "91",
//                         "billing_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         },
//                         "shipping_address": {
//                             "address1": "AP Endowments Department",
//                             "address2": "",
//                             "address3": "Gollapudi",
//                             "pincode": "521225",
//                             "city": "Vijayawada",
//                             "state": "Andhra Pradesh",
//                             "country": "INDIA"
//                         }
//                     },
//                     "merchant_metadata": {
//                         "key1": "DD",
//                         "key2": "XOF"
//                     }
//                 }
//             };

//             const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

//             data.order_id = paymentResult.order_id;
//             data.payment_status = 'PENDING';
//             masterMdl.createEhundiOrderMdl(data, function (err, result) {
//                 if (err) {
//                     return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
//                 }
//                 // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Order created successfully" });

//                 return res.status(200).json({
//                     status: true, code: 'SUCCESS', message: "Ehundi Order created successfully", ticket_id: recid, total_amount: total_amount,
//                     payment: {
//                         order_id: paymentResult.order_id,
//                         redirect_url: paymentResult.redirect_url
//                     }
//                 });

//             });
//         });
//     } catch (error) {
//         return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
//     }
// };


export async function createEhundiOrderCtrlOrg(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        data.entry_by = user.id;
        data.temple_id = user.temple_id;

        data.handling_charge = 0;
        let total_amount = 0;
        total_amount = (data.amount * 1 + data.handling_charge * 1);

        data.total_amount = total_amount;

        console.log(data.total_amount, "ffff")

        data.order_id = '';
        data.payment_status = 'PENDING';

        masterMdl.createEhundiOrderMdl(data, async function (err, tckitresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            let recidi = 0;
            if (tckitresults) {
                recidi = tckitresults.insertId;
            }
            // const recidi = ((ticket_id * 1) + 1);
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}${mm}${dd}105`;
            const recid = `${dateStr}${recidi}`;
            data.ticket_id = recid;
            const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
            const shortKey = hash.slice(0, 12);


            const paymentPayload = {
                "merchant_order_reference": shortKey,
                "order_amount": {
                    "value": (total_amount * 1) * (100 * 1),
                    "currency": "INR"
                },
                "integration_mode": "SDK",
                "pre_auth": false,
                "notes": "Ehundi booking",
                "allowed_payment_methods": ["UPI"],
                callback_url: `ai-tms://payment/success?ticket_id=${recid}&category_type=5`,
                failure_callback_url: `ai-tms://payment/failed?ticket_id=${recid}&category_type=5`,
                "purchase_details": {
                    "customer": {
                        "first_name": data.devotee_name || "eHundi",
                        "customer_id": shortKey,
                        "mobile_number": data.contact_number,
                        "country_code": "91",
                        "billing_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        },
                        "shipping_address": {
                            "address1": "AP Endowments Department",
                            "address2": "",
                            "address3": "Gollapudi",
                            "pincode": "521225",
                            "city": "Vijayawada",
                            "state": "Andhra Pradesh",
                            "country": "INDIA"
                        }
                    },
                    "merchant_metadata": {
                        "key1": "DD",
                        "key2": "XOF"
                    }
                }
            };

            const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);

            data.order_id = paymentResult.order_id;
            data.ticket_id = recid;
            data.id = tckitresults.insertId;
            data.shortKey = shortKey;
            masterMdl.updatehundiorder_id(data, function (err, result) {
                if (err) {
                    return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
                }
                // return res.status(200).json({ status: true, code: 'SUCCESS', "message": "Order created successfully" });

                return res.status(200).json({
                    status: true, code: 'SUCCESS', message: "Ehundi Order created successfully", ticket_id: recid, total_amount: total_amount,
                    payment: {
                        order_id: paymentResult.order_id,
                        redirect_url: paymentResult.redirect_url
                    }
                });

            });
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};



export async function createDarshanandPrasadamOrderCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    data.temple_id = user.temple_id;
    data.handling_charge = 0;
    masterMdl.getTicketRefMdl(async function (err, tckitresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        let ticket_id = tckitresults.length ? tckitresults[0].ticket_id : 0;
        const recidi = ticket_id + 1;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const recid = `${yyyy}${mm}${dd}106${recidi}`;
        data.ticket_id = recid;
        data.total_amount = (data.amount * 1) + (data.handling_charge * 1);
        const hash = crypto.createHash('sha256').update(data.reqId).digest('hex');
        const shortKey = hash.slice(0, 12);
        const paymentPayload = {
            merchant_order_reference: shortKey,
            order_amount: {
                value: (data.grand_amount * 1) * (100 * 1),
                // "value" : 100,
                "currency": "INR"
            },
            "integration_mode": "SDK",
            "pre_auth": false,
            "notes": "Darshan and Prasadam booking",
            "allowed_payment_methods": ["UPI"],
            "callback_url": `ai-tms://payment/success?ticket_id=${recid}&category_type=6`,
            "failure_callback_url": `ai-tms://payment/failed?ticket_id=${recid}&category_type=6`,
            "purchase_details": {
                "customer": {
                    "first_name": data.devotee_name || "Devotee",
                    "customer_id": shortKey,
                    "mobile_number": data.contact_number,
                    "country_code": "91",
                    "billing_address": {
                        "address1": "AP Endowments Department",
                        "address2": "",
                        "address3": "Gollapudi",
                        "pincode": "521225",
                        "city": "Vijayawada",
                        "state": "Andhra Pradesh",
                        "country": "INDIA"
                    },
                    "shipping_address": {
                        "address1": "AP Endowments Department",
                        "address2": "",
                        "address3": "Gollapudi",
                        "pincode": "521225",
                        "city": "Vijayawada",
                        "state": "Andhra Pradesh",
                        "country": "INDIA"
                    }
                },
                "merchant_metadata": {
                    "key1": "DD",
                    "key2": "XOF"
                }
            }
        }
        const paymentResult = await createPaymentOrder(paymentPayload, data.temple_id);
        data.order_id = paymentResult.order_id;
        data.payment_status = "PENDING";
        masterMdl.createDarshanandPrasadamOrdermdl(data, function (err, darshanResult) {
            if (err) {
                return res.status(500).json({ status: false, message: "Darshan insert failed" });
            }
            const darshan_table_id = darshanResult.insertId;
            if (data.prasadamcheck === true) {
                data.darshan_table_id = darshan_table_id;
                masterMdl.createPrasadamOrder(data, function (err, prasadamResult) {
                    if (err) {
                        return res.status(500).json({ status: false, message: "Prasadam insert failed" });
                    }
                    const prasadam_main_id = prasadamResult.insertId;
                    masterMdl.prasadamOrderItems(data.ordered_items, data.booking_date, prasadam_main_id, function (err) {
                        if (err) {
                            return res.status(500).json({ status: false, message: "Prasadam items insert failed" });
                        }
                        return sendSuccess(res, recid, data.total_amount, paymentResult);
                    });
                });
            } else {
                return sendSuccess(res, recid, data.total_amount, paymentResult);
            }
        });
    });

}

function sendSuccess(res, recid, total_amount, paymentResult) {
    return res.status(200).json({
        status: true,
        code: "SUCCESS",
        message: "Ehundi Order created successfully",
        ticket_id: recid,
        total_amount,
        payment: {
            order_id: paymentResult.order_id,
            redirect_url: paymentResult.redirect_url
        }
    });
}

export async function getTempleInfoCtrl(req, res) {
    try {
        const data = req.body;
        let user = req.user;
        data.temple_id = user.temple_id;
        masterMdl.getTempleInfoMdl(data, function (err, result) {
            if (err) {
                return res.status(500).json({ status: false, code: 'SERVER_ERROR', message: 'Internal server error' });
            }
            const IMAGE_DIR = path.join('/mnt/uploads/whatsappservice/templeprofiles');
            const formattedResult = result.map(item => {
                let base64Image = null;
                if (item.temple_logo) {
                    const fileName = item.temple_logo.split('/').pop();
                    const imagePath = path.join(IMAGE_DIR, fileName);
                    base64Image = imageToBase64(imagePath);
                }
                return {
                    ...item,
                    temple_logo_base64: base64Image
                };
            });

            return res.status(200).json({ status: true, code: 'SUCCESS', data: formattedResult });
        });
    } catch (error) {
        return res.status(500).json({ status: false, code: 'UNEXPECTED_ERROR', message: 'Something went wrong' });
    }
};

function imageToBase64(filePath) {
    try {
        if (!filePath || !fs.existsSync(filePath)) {
            return null;

        }
        const buffer = fs.readFileSync(filePath);
        const ext = path.extname(filePath).replace('.', '');
        return `data:image/${ext};base64,${buffer.toString('base64')}`;
    } catch (err) {
        console.error('Base64 conversion error:', err);
        return null;
    }
}

export async function rollEndingAlert(req, res) {

    let user = req.user;

    let data = {};
    data.temple_id = user.temple_id;
    // data.temple_id = 501;

    masterMdl.getTempledataMdl(data, async function (err, result) {

        try {

            const bmNumber = result[0].bm_contact;
            const userNumber = req.body.mobile_number;

            const numbers = [bmNumber, userNumber];

            const responses = [];

            for (const number of numbers) {

                let obj = {
                    mobile_no: number
                };

                const response = await rollalert(obj);
                responses.push(response);

            }

            return res.status(200).json({
                success: true,
                data: responses
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Roll alert failed"
            });

        }

    });

}


//mana mitra apis end



