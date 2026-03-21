import * as masterMdl from '../models/appointmentModels.js';
import { appointmnetSendMessages,newTaskSendMessages } from "../../../../utils/watiSmsUtil.js"
import fs from 'fs';
import moment from 'moment';
export async function postnewAppointmentCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.created_by = user.id;
    data.created_nm = user.user_name;
    data.designation = user.designation;
    masterMdl.postnewAppointmentMdl(data, async function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        const IST = "Asia/Kolkata";
        const formattedDate = moment(data.visit_date).tz(IST).format('DD/MM/YYYY');
        const smsTResponce = await appointmnetSendMessages(data,formattedDate);
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function appointmentReportCtrl(req, res) {
    var data = req.body;
    masterMdl.appointmentReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function appointmentEditReportCtrl(req, res) {
    var data = req.body;
    masterMdl.appointmentEditReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function editAppointmentCtrl(req, res) {
    var data = req.body;
     let user = req.user;
      data.designation = user.designation;
    masterMdl.editAppointmentMdl(data,async function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
         const IST = "Asia/Kolkata";
        const formattedDate = moment(data.visit_date).tz(IST).format('DD/MM/YYYY');
        const smsTResponce = await appointmnetSendMessages(data,formattedDate);
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function allotmentReportCtrl(req, res) {
    var data = req.body;
    masterMdl.allotmentReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function visitorReportCtrl(req, res) {
    var data = req.body;
    masterMdl.visitorReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function appointmentMisReportCountsCtrl(req, res) {
    var data = req.body;
    masterMdl.appointmentMisReportCountsMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function appointmentMisReportCtrl(req, res) {
    var data = req.body;
    let user =req.user;
    data.role_type=user.role_type;
    data.officer_id=user.id;
    masterMdl.appointmentMisReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function appointmentsLastsevenDaysCtrl(req, res) {
    var data = req.body;
    masterMdl.appointmentsLastsevenDaysMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}


export async function postnewtaskDataCtrl(req, res) {
    var data = req.body;
    var task_image = '';
 let user = req.user;
    data.created_by = user.id;
    data.created_nm = user.user_name;
    data.designation = user.designation;
    masterMdl.getTaskRefMdl(function (err, idresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        var task_idi = 0;
        if (idresults[0]) {
            task_idi = idresults[0].task_ref_idi;
        } else {
            task_idi = 0;
        }

        var recidi = 0;
        recidi = task_idi + 1;
        var recid = "AI-" + recidi;

        if (data.laoImadId == 1) {
            //image code start
            var image_url = data.document.reviewimg;
            var image_name = data.document.filename;
            var filetype = data.document.imgtype;
            var imgcnt = 0;
            var array = image_url.split(',');
            var datetimestamp = Date.now();
            var random_number = Math.floor(100000 + Math.random() * 900000);
            var unicnumber = random_number + '' + datetimestamp;
            var base64Data = array[1];
            fs.writeFile("../public_html/task_images/new_task_image/" + unicnumber + '.' + filetype, base64Data, 'base64', function (err) {
            });
            task_image = "https://aptms.in/task_images/new_task_image/" + unicnumber + '.' + filetype;
        } else {
            task_image = '';
        }

        masterMdl.postnewtaskDataMdl(data, task_image, recidi, recid, function (err, mainresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            masterMdl.postnewtaskChildDataMdl(data, mainresults.insertId, async function (err, results) {
                if (err) {
                    return res.status(500).send({ status: 500, msg: "Server Error" });
                }
                masterMdl.updateappointmentTaskMdl(data, mainresults.insertId, async function (err, results) {
                    if (err) {
                        return res.status(500).send({ status: 500, msg: "Server Error" });
                    }
                    
                    //wati message start
                    console.log(mainresults, "Ferr");
                    let sendfiletype = '';
                    let template_name = '';
                    let paramsObj = '0';
                    if (task_image) {
                        if (filetype == 'jfif' || filetype == 'jpg' || filetype == 'JPG') {
                            sendfiletype = 'jpeg';
                        } else {
                            sendfiletype = filetype;
                        }
                        if (sendfiletype == 'pdf') {
                            template_name = "assigned_pdf_task";
                            paramsObj = {
                                "name": "attachment",
                                "value": task_image
                            }
    
                        } else if (sendfiletype == 'jpeg' || sendfiletype == 'png') {
                            template_name = "newtask_attachment_image_main_2";
                            paramsObj = {
                                "name": "attachment",
                                "value": task_image
                            }
    
                        } else {
                            template_name = "newtask_assigned_main_4";
                        }
    
                    } else {
                        template_name = "newtask_assigned_main_4";
                    }
                    const IST = "Asia/Kolkata";
                    const formattedDate = moment(mainresults.target_dt).tz(IST).format('DD/MM/YYYY'); 
                    for (var q = 0; q < data.assign_officer.length; q++) {
    
                        const newtaskResponse = await newTaskSendMessages(data, data.assign_officer[q], formattedDate, recid, template_name, paramsObj);
                    }
                    //wari message end
                    return res.status(200).send({ status: 200, data: results });
                });
            });
        });
    });
}

export async function getVisitorsRepCtrl(req, res) {
    let data =req.body;
    let user =req.user;
    data.role_type=user.role_type;
    data.officer_id=user.id;
    masterMdl.getVisitorsRepMdl(data,function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function getviewAppointmentDataByIdCtrl(req, res) {
    var data = req.body;
    masterMdl.getviewAppointmentDataByIdMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}
export async function deleteAppointmentDataCtrl(req, res) {
    var data = req.body;
    masterMdl.deleteAppointmentDataMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

