import request from 'request';   //for otp service
import unirest from "unirest";
import envs from '../config.js'; //for date formatting
const { WATI_AUTH_TOKEN } = envs;
const otpStore = new Map();
import moment from "moment-timezone";
import axios from "axios";
export const sendOtp = async (data) => {
    // const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // console.log(otp);
    let phonenumber = data.phone_number;
    otpStore.set(data.phone_number, data.otp);
      const message = `TMS ${data.otp} is the OTP to complete your login. It is valid for 5 minutes. Please do not share with anyone. Team Amaravathi.`;
    
    // New SMS API request
    const smsRequest = {
        sendSMS: "1",
        username: "amaravathi",
        sender_id: "AMVTIT",
        msg: message,
        mobile: data.phone_number,
        template_id: "1207165884239050921",
        entity_id: "1201160344011859053",
        apikey: "8C29uO1KmY9NTDqcSLyi5DOFJKhaFM9Q"
    };

    try {
        const smsResponse = await axios.post('https://ivr.el91.com/app/sms_api.php', smsRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (smsResponse.data.result === "success") {
            console.log("SMS sent successfully");
        } else {
            console.error("SMS sending failed:", smsResponse.data.error);
            // throw new Error(`SMS sending failed: ${smsResponse.data.error}`);
        }
    } catch (error) {
        console.error("Error sending SMS:", error.message);
        // throw new Error(`Failed to send SMS: ${error.message}`);
    }

    // const smsApiUrl = `http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${phonenumber}&senderid=AMVTIT&msg=${message}&template_id=1207165884239050921`;
    return new Promise((resolve, reject) => {
        // request(smsApiUrl, function (error, response, body) {
        //     if (error) {
        //         return { status: 500, msg: 'SMS sending failed', error };
        //     }

            //whatsapp
            var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
            req.headers({
                "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "authorization": `Bearer ${WATI_AUTH_TOKEN}`
            });

            req.type("json");
            req.send({
                "template_name": "otp_new_org",
                "broadcast_name": "string",
                "receivers": [
                    {
                        "whatsappNumber": "91" + phonenumber,
                        "customParams": [
                            {
                                "name": "1",
                                "value": data.otp
                            }
                        ]
                    }
                ]
            });
            req.end(function (res) {
            });
            resolve({ status: 200, message: 'OTP sent successfully', result: 'success' });
        // });
    });
}



export const newTaskSendMessages = async (data, officer_data, target_dt, recid, template_name, paramsObj) => {
    return new Promise((resolve, reject) => {
        // console.log(paramsObj,"ggggs")
        let customD;
        if(paramsObj == '0'){
            customD = [
                        {
                            "name": "name",
                            "value": officer_data.officer_name
                        },
                        {
                            "name": "priority",
                            "value": data.priority
                        },
                        {
                            "name": "completion_date",
                            "value": target_dt
                        },
                        {
                            "name": "tappalid",
                            "value": recid
                        },
                        {
                            "name": "subject",
                            "value": data.title
                        }, {
                            "name": "remarks",
                            "value": data.description
                        },
                        {
                            "name": "designation",
                            "value": data.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    
                    ]
        }else{
            customD = [
                        {
                            "name": "name",
                            "value": officer_data.officer_name
                        },
                        {
                            "name": "priority",
                            "value": data.priority
                        },
                        {
                            "name": "completion_date",
                            "value": target_dt
                        },
                        {
                            "name": "tappalid",
                            "value": recid
                        },
                        {
                            "name": "subject",
                            "value": data.title
                        }, {
                            "name": "remarks",
                            "value": data.description
                        },
                        {
                            "name": "designation",
                            "value": data.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        },
                        paramsObj
                    ]
        }
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": template_name,
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + officer_data.mobile,
                    "customParams": customD
                }
            ]
        });
        req.end(function (res) {
        //   console.log(res) 
        });
        resolve({ status: 200, message: 'Task sent successfully', result: 'success' });
    });
}


export const taskVerificationSendMessages = async (data, mresults) => {
    // console.log("innn")
    return new Promise((resolve, reject) => {
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "taskverifiction_main",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + mresults[0].phone_number,
                    "customParams": [
                        {
                            "name": "name",
                            "value": mresults[0].user_name
                        },
                        {
                            "name": "empnm",
                            "value": data.officer_nm
                        },
                        {
                            "name": "departmnt",
                            "value": data.officer_dept_name
                        },
                        {
                            "name": "tid",
                            "value": data.task_ref_num
                        }, {
                            "name": "designation",
                            "value": data.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    ]
                }
            ]
        });
        req.end(function (res) {
            // console.log(res)
        });
        resolve({ status: 200, message: 'Verification sent successfully', result: 'success' });
    });
};


export const meetingSendMessages = async (element, mainData,formattedDate,venued,templetName) => {
    return new Promise((resolve, reject) => {
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": templetName,
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": '91' + element.mobile,
                    "customParams": [
                        {
                            "name": "name",
                            "value": element.officer_name
                        },
                         {
                            "name": "title",
                            "value": mainData.meeting_title
                        },
                        
                        {
                            "name": "date",
                            "value": formattedDate
                        },
                        {
                            "name": "time",
                            "value": mainData.meeting_start_tm
                        },
                        {
                            "name": "venue",
                            "value": venued
                        },
                        {
                            "name": "purpose",
                            "value": mainData.meeting_description
                        }
                        , {
                            "name": "designation",
                            "value": mainData.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    ]
                }
            ]
        });
        req.end(function (res) {
            // console.log(res)
        });
        resolve({ status: 200, message: 'Meeting sent successfully', result: 'success' });
    });
};
export const appointmnetSendMessages = async (data,formattedDate) => {
    console.log(data,formattedDate)
    return new Promise((resolve, reject) => {
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "apt_msg_main",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + data.mobile_no,
                    "customParams": [
                        {
                            "name": "name",
                            "value": data.name
                        },
                        {
                            "name": "date",
                            "value": formattedDate
                        },
                        {
                            "name": "time",
                            "value": data.visit_time
                        },
                        {
                            "name": "purpose",
                            "value": data.purpose_visit
                        }
                        , {
                            "name": "designation",
                            "value": data.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    ]
                }
            ]
        });

        req.end(function (res) {
            // console.log(res)
        });
        resolve({ status: 200, message: 'Appointment sent successfully', result: 'success' });
    });
};


export const reassginSendMessages = async (data) => {
    return new Promise((resolve, reject) => {
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "reassigned_modified",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + data.mobile_no,
                    "customParams": [
                        {
                            "name": "name",
                            "value": data.name
                        },
                        {
                            "name": "taskId",
                            "value": data.task_ref_num
                        },
                        {
                            "name": "head",
                            "value": data.editBy
                        },{
                            "name": "designation",
                            "value": data.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    ]
                }
            ]
        });

        req.end(function (res) {
            console.log(res)
        });
        resolve({ status: 200, message: 'SendMessages sent successfully', result: 'success' });
    });
};


export const momSendMessages = async (data,user) => {
    return new Promise((resolve, reject) => {
        // console.log(paramsObj,"ggggs")
        // let customD;
        console.log(data,'data')
         const IST = "Asia/Kolkata";
         
        var highdateStr = moment().tz(IST).add(1, 'days').format("DD/MM/YYYY");
    var mediumdateStr = moment().tz(IST).add(3, 'days').format("DD/MM/YYYY");
    var lowdateStr = moment().tz(IST).add(10, 'days').format("DD/MM/YYYY");


    var target_dt = highdateStr;
    if (data.priority == 'High') {
        target_dt = `${highdateStr}`;
    } else if (data.priority == 'Medium') {
        target_dt = `${mediumdateStr}`;
    } else if (data.priority == 'Low') {
        target_dt = `${lowdateStr}`;
    } else if (data.priority == 'Fixed Date') {
        var h = moment(data.fixdate).tz(IST).format("DD/MM/YYYY");
        target_dt = `${h}`
    }
           let  customD = [
                        {
                            "name": "name",
                            "value": data?.user_name
                        },
                        {
                            "name": "priority",
                            "value": data.priority
                        },
                        {
                            "name": "completion_date",
                            "value": target_dt
                        },
                        {
                            "name": "tappalid",
                            "value": data.recid
                        },
                        {
                            "name": "subject",
                            "value": data.meeting_title
                        }, {
                            "name": "remarks",
                            "value": data.description
                        },
                        {
                            "name": "designation",
                            "value": user.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    
                    ]
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "newtask_assigned_main_4",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + data?.phone_number,
                    "customParams": customD
                }
            ]
        });
        req.end(function (res) {
        //   console.log(res) 
        });
        resolve({ status: 200, message: 'Task sent successfully', result: 'success' });
    });
};



export const resnedMomPdfMessages = async (data,pdfUrl) => {
    return new Promise((resolve, reject) => {
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "mom_msg",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + data.mobile_no,
                    "customParams": [
                        {
                            "name": "name",
                            "value": data.name
                        },
                        {
                            "name": "date",
                            "value": data.meeting_date
                        },
                        {
                            "name": "particular_meeting",
                            "value": data.meeting_title
                        },
                        {
                            "name": "mom_pdf",
                            "value": pdfUrl
                        }
                        , {
                            "name": "designation",
                            "value": data.designation
                        },
                        {
                            "name": "district",
                            "value": "Amaravathi"
                        }
                    ]
                }
            ]
        });
        req.end(function (res) {
            // console.log(res)
        });
        resolve({ status: 200, message: 'Appointment sent successfully', result: 'success' });
    });
};

export const sendMobileOtp = async (data) => {
    let phonenumber = data.phone_number;
    let resendStatus = data.resendStatus;

    //     otpStore.set(data.phone_number, data.otp);
    //  let phonenumber = data.phone_number;
    otpStore.set(data.phone_number, data.otp);
    const message = `TMS ${data.otp} is the OTP to complete your login. It is valid for 5 minutes. Please do not share with anyone. Team Amaravathi.`;

    // New SMS API request
    const smsRequest = {
        sendSMS: "1",
        username: "amaravathi",
        sender_id: "AMVTIT",
        msg: message,
        mobile: data.phone_number,
        template_id: "1207165884239050921",
        entity_id: "1201160344011859053",
        apikey: "8C29uO1KmY9NTDqcSLyi5DOFJKhaFM9Q"
    };

    try {
        const smsResponse = await axios.post('https://ivr.el91.com/app/sms_api.php', smsRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (smsResponse.data.result === "success") {
            console.log("SMS sent successfully");
        } else {
            console.error("SMS sending failed:", smsResponse.data.error);
        }
    } catch (error) {
        console.error("Error sending SMS:", error.message);
    }
    ;
    return new Promise((resolve, reject) => {
        //whatsapp
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "otp_new_org",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + phonenumber,
                    "customParams": [
                        {
                            "name": "1",
                            "value": data.otp
                        }
                    ]
                }
            ]
        });
        req.end(function (res) {
        });
        resolve({ status: 200, message: 'OTP sent successfully', result: 'success' });
        // });
    });
};

export const rollalert = async (data) => {
    return new Promise((resolve, reject) => {
        var req = unirest("POST", "https://live-server-6023.wati.io/api/v1/sendTemplateMessages");
        req.headers({
            "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "authorization": `Bearer ${WATI_AUTH_TOKEN}`
        });

        req.type("json");
        req.send({
            "template_name": "roll_alert",
            "broadcast_name": "string",
            "receivers": [
                {
                    "whatsappNumber": "91" + data.mobile_no
                }
            ]
        });
        req.end(function (res) {
            if (res?.error) {
                return reject(res.error);
            }
            resolve({ status: 200, message: 'Roll alert sent successfully', result: 'success' });
        });
    });
};