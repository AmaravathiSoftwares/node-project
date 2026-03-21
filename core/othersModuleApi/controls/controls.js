
import * as mdl from '../models/models.js';
import { writeFile } from "fs";
import jwt from 'jsonwebtoken';
// import pdf from "html-pdf";
import { hash, compare } from "bcrypt";
import request from 'request'; //for ot
import crypto from "crypto";
// import { PDFDocument, rgb } from "pdf-lib";
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
// import htmlPdf from 'html-pdf-node';
import Handlebars from 'handlebars';
import pdf from 'pdf-creator-node';
import { PDFDocument } from 'pdf-lib';
// const crypto = require('crypto');
// import {createRequire} from 'module';
// const require = createRequire(import.meta.url);
// const pdf = require('pdf-creator-node');
// const { PDFDocument } = require('pdf-lib');
// Encrypt data before sending
import unirest from "unirest";
import { log } from 'console';
import { createAccessToken, createRefreshToken } from '../../../utils/jwtUtils.js'




export function getbannerimagesCtrl(req, res) {
    var data = req.body
    // console.log(data);
    mdl.getbannerimagesMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


//function to convert base64 into url 
function img_conv(info) {
    var imgurl = '';
    var reviewImg = info.photoBase64;
    // console.log(info)
    var unq_num = Math.floor(1000 + Math.random() * 9999)
    var filetype = info.bannerImageType
    writeFile('C:/xampp/htdocs/images/' + info.bannerImageName + unq_num + "." + filetype, reviewImg, 'base64', (err) => {
        err ? console.log("error to store in image folder", err) : null;
    });
    imgurl = "http://localhost/images/" + info.bannerImageName + unq_num + "." + filetype;
    // console.log(imgurl);
    return (imgurl)
}

function img_conversion(info) {
    var imgurl = '';
    var reviewImg = info.photo;
    // console.log(info)
    var unq_num = Math.floor(1000 + Math.random() * 9999)
    var filetype = info.type
    writeFile('C:/xampp/htdocs/images/' + unq_num + "." + filetype, reviewImg, 'base64', (err) => {
        err ? console.log("error to store in image folder", err) : null;
    });
    imgurl = "http://localhost/images/" + unq_num + "." + filetype;
    // console.log(imgurl);
    return (imgurl)
}

export function postbannerimagesCtrl(req, res) {
    var data = req.body;
    // console.log(data);
    imagepostingdata = {
        imagename: data.bannerImageName,
        imgurl: img_conv(data)
    };
    mdl.postbannerimagesMdl(imagepostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

export function addTemplesdataCtrl(req, res) {
    var data = req.body;

    const templePostingdata = ({ ...data, temple_image: img_conversion(data['temple_image']), temple_icon: img_conversion(data['temple_icon']) })

    mdl.addTemplesdataMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


export function getTemplesDataCtrl(req, res) {
    const templePostingdata = [];
    mdl.addTemplesdataMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

// retriving main modules data


export function getMainModulesdataCtrl(req, res) {
    const templePostingdata = [];
    mdl.getMainModulesdataMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


export function getmainsubmodulesdataCtrl(req, res) {
    const templePostingdata = [];
    let children = [];
    mdl.getmainsubmodulesdataMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        // console.log(results);
        const result1 = Object.values(
            results.reduce((acc, item) => {
                const {
                    moduleId,
                    displayName,
                    iconName,
                    route,
                    SubModuleID,
                    displayName1,
                    iconName1,
                    route1,
                } = item;

                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        moduleId,
                        displayName,
                        // iconName,
                        // route,
                        children: [],
                    };
                }

                if (SubModuleID) {
                    acc[moduleId].children.push({
                        SubModuleID,
                        displayName: displayName1,
                        // iconName: iconName1,
                        // route: route1,
                    });
                }

                return acc;
            }, {})
        ).sort((a, b) => a.moduleId - b.moduleId); // Sort by moduleId in ascending order

        //   console.log(result1);

        results = result1;
        //   console.log(result);
        res.send({ status: 200, data: results });
    });
}

export async function sendOtpCtrl(req, res) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // console.log(otp);

    const expiresAt = Date.now() + 90 * 1000; // 90 seconds from now
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const hashedOtp = await hash(otp, 10);

        mdl.sendOtpMdl({ otp: hashedOtp, expiresAt, ...req.body }, function (err, results) {
            if (err) {
                return res.status(500).json({ status: 500, msg: 'Database error', error: err });
            }

            if (results[0]?.affectedRows) {
                const message = `Amaravathi ${otp} is the OTP to complete your login. It is valid for 90 seconds. Please do not share with anyone. Team Amaravathi.`;

                const smsApiUrl = `http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${phonenumber}&senderid=AMVTIT&msg=${message}&template_id=1207165884239050921`;

                request(smsApiUrl, function (error, response, body) {
                    if (error) {
                        return res.status(500).json({ status: 500, msg: 'SMS sending failed', error });
                    }
                    res.status(200).json({ status: 200, message: 'OTP sent successfully' });

                    //whatsapp
                    // console.log("its working here")
                    var req = unirest("POST", "https://live-mt-server.wati.io/6023/api/v1/sendTemplateMessages");
                    // var generatedate = moment().format("DDMMYY");
                    req.headers({
                        "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMzY5NzlkMi02NWM2LTQzN2UtYmQwOC04YzljZDBlNDIwMTYiLCJ1bmlxdWVfbmFtZSI6InNlb0BhbWFyYXZhdGhpc29mdHdhcmUuY29tIiwibmFtZWlkIjoic2VvQGFtYXJhdmF0aGlzb2Z0d2FyZS5jb20iLCJlbWFpbCI6InNlb0BhbWFyYXZhdGhpc29mdHdhcmUuY29tIiwiYXV0aF90aW1lIjoiMTEvMjYvMjAyNCAwNTowNjoxNyIsInRlbmFudF9pZCI6IjYwMjMiLCJkYl9uYW1lIjoibXQtcHJvZC1UZW5hbnRzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkJST0FEQ0FTVF9NQU5BR0VSIiwiVEVNUExBVEVfTUFOQUdFUiIsIkNPTlRBQ1RfTUFOQUdFUiIsIk9QRVJBVE9SIiwiREVWRUxPUEVSIiwiQVVUT01BVElPTl9NQU5BR0VSIl0sImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.3zgQI5MNYgXIUeflelJVeV637ZOSvmtegI63bz2UmSo"
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
                                    // {
                                    //     "name": "client_nm",
                                    //     "value": "Ravi"
                                    // },
                                    // {
                                    //     "name": "amount_amvt",
                                    //     "value": pdf_front_data.grand_total
                                    // },
                                ]
                            }
                        ]
                    });
                    req.end(function (res) {
                        // console.log(res.body, 18127);
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

//verfiying the otp

export function veriftOtpCtrl(req, res) {
    console.log('Mahi');
    
    mdl.veriftOtpMdl(req.body, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        let userOtp = req.body.otpsending.toString();
        // console.log(results[0], 226);
        compare(userOtp, results[0].otp, function (err, isMatch) {
            if (err) {
                return err;
            }
            if (isMatch) {
                // const token = jwt.sign({ id: results[0].id }, "Amvt@1234", { expiresIn: '24h' })
                const payload = { id: results[0].id };
                const accessToken = createAccessToken(payload);
                const refreshToken = createRefreshToken(payload)
                mdl.deleteOtpMdl(req.body, function (err, results1) {
                    if (err) {
                        res.send({ status: 500, msg: err });
                        return;
                    }
                });
                console.log({ accessToken });
                console.log({ refreshToken });


                // res.cookie("UID", token);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,         // HTTPS only
                    sameSite: 'Strict',   // Adjust as needed
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });

                // res.cookie("refershtoken", token, {
                //     httpOnly: true,     // Makes the cookie inaccessible via JavaScript
                //     secure: true,       // Ensures the cookie is sent over HTTPS
                //     maxAge: 12 * 60 * 60 * 1000 // 12 hours in milliseconds
                // });
                res.send({ status: 200, data: { id: token, role: results[0].role_type, accessToken: accessToken } });
            }
            else {
                res.send({ status: 500, msg: err });

            }

        });
    });
}



export function loginCtrl(req, res) {
    // console.log(req);
    const cookies = req.cookies;
    // console.log(cookies,266);
    res.send("Reading Cooking")
    // appmdl.veriftOtpMdl(req.body, function (err, results) {
    //     if (err) {
    //         res.send({ status: 500, msg: err });
    //         return;
    //     }
    // });
}


export function logoutCtrl(req, res) {
    try {
        // console.log(req.body.cookies);

        // Clear the cookie on the client side
        res.clearCookie("UID", {
            httpOnly: true,  // Ensures the cookie is only accessible via HTTP(S)
            secure: process.env.NODE_ENV === 'production',  // Use secure flag in production (HTTPS)
            sameSite: 'strict' // Prevent CSRF attacks by restricting cross-site usage
        });

        // Check if the cookie is cleared by attempting to retrieve it again
        if (!req.body.cookies || req.body.cookies.UID) {
            return res.status(500).json({ message: 'Error: Cookie was not deleted properly' });
        }

        // Optionally, if using session management, destroy the session
        // For example, req.session.destroy();
        // Send a response indicating successful logout
        return res.status(200).json({ message: 'Logged out successfully!' });

    } catch (error) {
        // Log the error and return a server error response
        // console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export function getuserpermissionmodulesCtrl(req, res) {
    // console.log(req.cookies);
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }

    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.getuserpermissionmodulesMdl(jwttoken.id, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            const transformedData = [];
            results.forEach(row => {
                // console.log(row);
                let module = transformedData.find(m => m.moduleId === row.main_module_id);
                if (!module) {
                    module = {
                        moduleId: row.main_module_id,
                        displayName: row.main_module_name,
                        iconName: row.main_module_icon,
                        route: row.main_module_route,
                        children: []
                    };
                    transformedData.push(module);
                }

                if (row.sub_module_id) {
                    // module.children=[];
                    // console.log(module.children.length,row.main_module_id,453);
                    if (row.sub_module_name != "dummy") {
                        module.children.push({
                            SubModuleID: row.sub_module_id,
                            displayName: row.sub_module_name,
                            iconName: row.sub_module_icon,
                            route: row.sub_module_route
                        });
                    }
                    else {
                        delete module.children;
                    }

                }
            });

            return res.status(200).send({ status: 200, data: transformedData });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function getUserReportCtrl(req, res) {
    // console.log(req.params.id,446);
    let templePostingdata = []
    mdl.getUserReportMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        // console.log(results,367);
        const transformedData = results
            .filter(user => user.Modules && user.Modules.length > 0)
            .map(user => ({

                id: user.id,
                Name: user.Name,
                Position: user.Position,
                // Uncomment and populate this if email is available
                // Email: 'r@gmail.com',
                Department: user.Department,
                Mobile: parseInt(user.Mobile, 10),
                // Uncomment and add logic if DateOfJoining is required
                // DateOfJoining: new Date('01-2-2020'),
                // Default or fetched from another source
                imagePath: user.imagePath || 'assets/images/profile/user-1.jpg', // Default if null
                Modules: user.Modules.split(','), // Convert comma-separated string to an array
                SubModules: user.SubModules.split(','), // Convert comma-separated string to an array
                Role: user.Role === 2 ? 'User' : user.Role === 1 ? "Admin" : "Guest" // Map numeric role to string


            }));
        // console.log(transformedData);
        res.send({ status: 200, data: transformedData });
    });
}


export function getUserReportByIdCtrl(req, res) {
    const userId = req.params.id;
    // console.log(req.params.id, 446);
    let templePostingdata = []
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    mdl.getUserReportByIdMdl(userId, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        // console.log(results, 457);
        if (results[0].Role == 1) {
            res.send({ status: 200, data: results });
        }
        if (results[0].Modules === null && results[0].SubModules === null) {
            res.send({ status: 200, data: results });
        }
        else {
            const transformedData = results
                .filter(user => user.Modules && user.Modules.length > 0)
                .map(user => ({
                    id: user.id,
                    Name: user.Name,
                    Position: user.Position,
                    // Uncomment and populate this if email is available
                    // Email: 'r@gmail.com',
                    Department: user.Department,
                    Mobile: parseInt(user.Mobile, 10),
                    // Uncomment and add logic if DateOfJoining is required
                    // DateOfJoining: new Date('01-2-2020'),
                    // Default or fetched from another source
                    imagePath: user.imagePath || 'assets/images/profile/user-1.jpg', // Default if null
                    Modules: user.Modules.split(','), // Convert comma-separated string to an array
                    SubModules: user.SubModules.split(','), // Convert comma-separated string to an array
                    // Role: user.Role === 2 ? 'User' : user.Role === 1 ? "Admin" : "Guest" // Map numeric role to string
                    Role: user.Role
                }));
            // console.log(transformedData, 478);
            res.send({ status: 200, data: transformedData });
        }

    });
}


export function getcurrentpermissionmodulesCtrl(req, res) {
    // console.log(req.cookies);
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.getuserpermissionmodulesMdl(jwttoken.id, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            // const transformedData = [];
            // results.forEach(row => {
            //     // console.log(row);
            //     let module = transformedData.find(m => m.moduleId === row.main_module_id);
            //     if (!module) {
            //         module = {
            //             moduleId: row.main_module_id,
            //             displayName: row.main_module_name,
            //             iconName: row.main_module_icon,
            //             route: row.main_module_route,
            //             children: []
            //         };
            //         transformedData.push(module);
            //     }

            //     if (row.sub_module_id) {
            //         // module.children=[];
            //         // console.log(module.children.length,row.main_module_id,453);
            //         if (row.sub_module_name != "dummy") {
            //             module.children.push({
            //                 SubModuleID: row.sub_module_id,
            //                 displayName: row.sub_module_name,
            //                 iconName: row.sub_module_icon,
            //                 route: row.sub_module_route
            //             });
            //         }
            //         else {
            //             delete module.children;
            //         }

            //     }
            // });
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function AddUserCtrl(req, res) {
    // console.log(req.body, 797);
    let userdata = req.body;
    if (req.body.allow.length == 0) {
        res.send({ status: 500, msg: "Please select atleast one module" });
        return;
    }
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }

    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // console.log(jwttoken.id,757);
    userdata.allow.forEach((item) => {
        // console.log(item, 744);
    });
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const date = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const time = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    let insertedUserDataDetails = [userdata.name, userdata.number, userdata.department, userdata.position, userdata.image, jwttoken.id, time];

    // console.log(insertedUserDataDetails, 758);
    mdl.AddUserMdl(insertedUserDataDetails, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        let userId = results.insertId;
        // console.log(userId, 748);
        let permissionModuledata = req.body.allow;
        // res.send({ status: 200, data: results });
        console.log(req.body.role);
        if (req.body.role == "1") {
            res.send({ status: 200, data: results });
        }
        else {
            mdl.AdduserPermissionByIdMdl(userId, permissionModuledata, function (err, results) {
                if (err) {
                    res.send({ status: 500, msg: err });
                    return;
                }
                res.send({ status: 200, data: results });
            });
        }
    });
}


export function addmasteruserpersmissionsCtrl(req, res) {
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }

    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // console.log(req.body, 808);
    const { role_type } = req.body;
    // console.log(role_type, 810);
    let modulesAndSubModules = []
    req.body.allow.forEach((item) => {
        modulesAndSubModules.push({ moduleId: item.main_module_id, subModuleId: item.sub_module_id });
    });
    // mdl.addmasteruserpersmissionsMdl(role_type, function (err, results) {
    //     if (err) {
    //         return res.status(500).send({ status: 500, msg: err });
    //     }
    //     const list_of_users = [];
    //     results.forEach((item) => {
    //         list_of_users.push(item.id);
    //     });
    //     console.log(list_of_users, 818);
    //     mdl.addmasteruserpersmissionsMdl2(role_type, list_of_users, modulesAndSubModules, function (err, results1) {
    //         if (err) {
    //             return res.status(500).send({ status: 500, msg: err });
    //         }
    //         console.log(results1, 824);
    //         return res.status(200).send({ status: 200, data: results1 });
    //     });
    //     // return res.status(200).send({ status: 200, data: results });
    // });

}

export function getRoleCtrl(req, res) {
    console.log(req.body);
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }

    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // console.log(jwttoken.id,757);
    mdl.getRoleMdl(jwttoken.id, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


export function addrolebasedmodulesCtrl(req, res) {
    console.log(req.body, 915);
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }

    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // console.log(req.body, 860);
    const { role } = req.body;
    // console.log(role, 872);
    let usersdata = [];
    Object.values(req.body).forEach(value => {
        if (value == undefined || value == "" || value == '') {
            usersdata.push("NULL");
        }
        else {
            usersdata.push(value);
        }
    });
    usersdata.push(jwttoken.id);
    console.log(req.body.role, 937);
    if (req.body.role == '1') {
        mdl.addrolebasedmodulesAdminMdl(role, usersdata, function (err, results) {
            if (err) {
                res.send({ status: 500, msg: err });
                return;
            }
            res.send({ status: 200, data: results });
        });
    }
    else {
        console.log(949);
        mdl.addrolebasedmodulesMdl(role, usersdata, function (err, results) {
            if (err) {
                res.send({ status: 500, msg: err });
                return;
            }
            console.log(results, 954);
            if (results) {
                console.log(results, 956);
                //  res.send({ status: 200, data: results });
                res.status(200).send({ status: 200, data: results })
            }
            else {
                console.log(results, 960)
                return res.status(500).send({ status: 500, msg: "Internal Server Error", error: err });
            }

        });
    }

}


export function updaterolebasedmodulesCtrl(req, res) {
    const { headers } = req;
    console.log(headers, 1205);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    // const userId = req.params.id;
    console.log(req.body, 1210);
    let user_id = req.body.data.user_id;
    console.log(req.body.data.user_id, 1212);
    console.log(req.body.data.changes, 1213);
    let changesdata = req.body.data.changes;
    let usersdata = [req.body.data.name, req.body.data.image, req.body.data.number, req.body.data.position,
    req.body.data.department, req.body.data.role, req.body.data.user_id]
    const modulesdata = changesdata;
    // let modulesdata = [];
    // const modulesdata = changesdata.flatMap(module =>
    //     module.children.map(child => ({
    //       moduleId: module.moduleId,
    //       subModules: child.sub_module_id
    //     }))
    //   ); 
    console.log(modulesdata, 1230);
    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.updaterolebasedmodulesMdl(user_id, usersdata, modulesdata, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });
    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function deleterolebasedmodulesCtrl(req, res) {
    const { headers } = req;
    const userId = req.params.id;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    // const jwttoken = jwt.verify(auth, 'Amvt@1234');
    console.log(userId, 962);
    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.deleterolebasedmodulesMdl(userId, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}


export function editrolebasedmodulesCtrl(req, res) {
    const { headers } = req;
    const userId = req.params.id;
    console.log(req.body, 898);
    // console.log(headers);
    console.log(req.body.changes, 1268);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    // const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // console.log(userId,905);
    try {

        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.getuserpermissionmodulesMdl(userId, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            const transformedData = [];
            results.forEach(row => {
                // console.log(row);
                let module = transformedData.find(m => m.moduleId === row.main_module_id);
                if (!module) {
                    module = {
                        moduleId: row.main_module_id,
                        displayName: row.main_module_name,
                        iconName: row.main_module_icon,
                        route: row.main_module_route,
                        children: []
                    };
                    transformedData.push(module);
                }

                if (row.sub_module_id) {
                    // module.children=[];
                    // console.log(module.children.length,row.main_module_id,453);
                    if (row.sub_module_name != "dummy") {
                        module.children.push({
                            SubModuleID: row.sub_module_id,
                            displayName: row.sub_module_name,
                            iconName: row.sub_module_icon,
                            route: row.sub_module_route
                        });
                    }
                    else {
                        delete module.children;
                    }

                }
            });
            return res.status(200).send({ status: 200, data: transformedData });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function getrolebasedmodulesCtrl(req, res) {
    const { headers } = req;
    const role_type = req.params.id;
    console.log(role_type, 1025);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.getrolebasedmodulesMdl(role_type, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function getroleaccessCtrl(req, res) {
    const { headers } = req;
    const role_type = req.params.id;
    console.log(role_type, 1025);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        mdl.getroleaccessMdl(role_type, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}
