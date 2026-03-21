import * as masterMdl from '../models/taskModels.js';
import fs from 'fs';
import { newTaskSendMessages, taskVerificationSendMessages,reassginSendMessages } from '../../../../utils/watiSmsUtil.js';
import moment from 'moment';


export async function getCategoriesDataCtrl(req, res) {
    let data = req.body;
    masterMdl.getCategoriesDataMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function getProjectsCtrl(req, res) {
    masterMdl.getProjectsMdl(function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}


export async function getOfficersData_Ctrl(req, res) {
    let user = req.user;
    // data.created_by = user.id;
    masterMdl.getOfficersData_Mdl(user,function (err, results) {
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
                return res.status(200).send({ status: 200, data: results });
            });
        });
    });
}

export async function viewtasksCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.role_type = user.role_type;
    data.created_by=user.id;
    masterMdl.viewtasksMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function viewtasksPopupCtrl(req, res) {
    var data = req.body;
    masterMdl.viewtasksPopupMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function closeTaskSuperadminCtrl(req, res) {
    var data = req.body;
    masterMdl.closeTaskSuperadminMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function tasksVerificationCtrl(req, res) {
    var data = req.body;
    masterMdl.tasksVerificationMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function closetasksVerificationCtrl(req, res) {
    var data = req.body;
    masterMdl.closetasksVerificationMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function edittasksReportCtrl(req, res) {
    var data = req.body;
    masterMdl.edittasksReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function viewtasksSingleIdCtrl(req, res) {
    var data = req.body;
    masterMdl.viewtasksSingleIdMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function edittasksCtrl(req, res) {
    var data = req.body;
    var task_image = '';
    masterMdl.deleteAssignedOfficerMdl(data, function (err, mainresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        masterMdl.updatetaskmaintableMdl(data, task_image, function (err, updateresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            masterMdl.postnewtaskChildDataMdl(data, data.task_id, function (err, results) {
                if (err) {
                    return res.status(500).send({ status: 500, msg: "Server Error" });
                }

                return res.status(200).send({ status: 200, data: results });
            });
        });
    });
}

export async function pendingPriorityCountsCtrl(req, res) {
    var data = req.body;
    masterMdl.pendingPriorityCountsMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function pendingPrioritybkCtrl(req, res) {
    var data = req.body;
    masterMdl.pendingPrioritybkMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function actionTakenReportCtrl(req, res) {
    var data = req.body;
    masterMdl.actionTakenReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function completedTaskReportCtrl(req, res) {
    var data = req.body;
    masterMdl.completedTaskReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function officertasksCountsCtrl(req, res) {
    var data = req.body;
    let user =req.user;
    data.role_type=user.role_type;
    data.officer_id=user.id;
    masterMdl.officertasksCountsMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}


export async function officertasksReportCtrl(req, res) {
    var data = req.body;
    let user =req.user;
    data.role_type=user.role_type;
    data.officer_id=user.id;
    console.log(data)
    masterMdl.officertasksReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function updateOfficerTaskCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.created_by = user.id;
    data.created_nm = user.user_name;
    data.designation = user.designation;
    var officer_image = '';
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
        fs.writeFile("../public_html/task_images/officers_task_images/" + unicnumber + '.' + filetype, base64Data, 'base64', function (err) {
        });
        officer_image = "https://aptms.in/task_images/officers_task_images/" + unicnumber + '.' + filetype;
    } else {
        officer_image = '';
    }


    masterMdl.updateOfficerTaskMdl(data, officer_image, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        masterMdl.gettappalcreatedbyMdl(data, async function (err, mainresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            console.log("yuuuu")
            const newtaskResponse = await taskVerificationSendMessages(data, mainresults);
            return res.status(200).send({ status: 200, data: results });
        });
    });
}


export async function admintasksCountsCtrl(req, res) {
    var data = req.body;
    masterMdl.admintasksCountsMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}


export async function testapiCtrl(req, res) {
    res.status(200).send({ status: 200, data: 'results' });
    //     var data = req.body;
    //     var officer_image = '';
    //     masterMdl.testapiMdl(data,officer_image,function (err, results) {
    //         if (err) {
    //             return res.status(500).send({ status: 500, msg: "Server Error" });
    //         }
    //         return res.status(200).send({ status: 200, data: results });
    //     });    
}

export async function admintasksCountsReportCtrl(req, res) {
    var data = req.body;
    masterMdl.admintasksCountsReportMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

//personwise analysis start
export async function gettaskDepartmentCtrl(req, res) {
    var data = req.body;
    masterMdl.gettaskDepartmentMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}
export async function getEmployeesDeptwiseCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.created_by = user.id;
    data.role_type = user.role_type;
    masterMdl.getEmployeesDeptwiseMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}
export async function getOfficerwiseCountCtrl(req, res) {
    var data = req.body;
    masterMdl.getOfficerwiseCountMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function getavgresponsegrphCtrl(req, res) {
    var data = req.body;
    masterMdl.getavgresponsegrphMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function trgtdateexcededindaysCtrl(req, res) {
    var data = req.body;
    masterMdl.trgtdateexcededindaysMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function officertaskdtlsCtrl(req, res) {
    var data = req.body;
    masterMdl.officertaskdtlsMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

//personwise analysis end

//task performance & mis-reports start
export async function pendingprioritystatusCtrl(req, res) {
    let user = req.user;

    masterMdl.pendingprioritystatusMdl(user, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function getallpendingtasksCtrl(req, res) {
    var data = req.body;

    masterMdl.getallpendingtasksMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function getactiontakenrprtCtrl(req, res) {
    var data = req.user;
    masterMdl.getactiontakenrprtMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function getcompltedtasksrprtCtrl(req, res) {
    let data=req.body;
    let  user = req.user;
    masterMdl.getcompltedtasksrprtMdl(user,data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

//task performance & mis-reports end

// edit task

export async function viewtasksDataByIdCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.role_type = user.role_type;
    masterMdl.viewtasksDataByIdMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}




export async function updateTaskDataCtrl(req, res) {
    var data = req.body;
    var task_image = '';
    let user = req.user;
    data.created_by = user.id;
    data.created_nm = user.user_name;
    data.designation = user.designation;
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
        task_image = data.previoustask_image;
    }


    masterMdl.updateTaskDataMdl(data, task_image, function (err, mainresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }

        masterMdl.deletetaskChildofficersDataMdl(data, function (err, cRes) {
            if (err) {
                res.send({ status: 500, "msg": "Server Error" });
                return;
            }
            masterMdl.postnewtaskChildDataMdl(data, data.rowId, async function (err, results) {
                if (err) {
                    return res.status(500).send({ status: 500, msg: "Server Error" });
                }
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

                    const newtaskResponse = await newTaskSendMessages(data, data.assign_officer[q], formattedDate, data.task_ref_num, template_name, paramsObj);
                }
                return res.status(200).send({ status: 200, data: results });
            });
        });
    });
}

export async function deleteTaskDataCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteTaskDataMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function reassignUserTaskCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.userId = user.id;
    data.designation = user.designation;
    masterMdl.reassignUserTaskMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        masterMdl.getOfficerDataMdl(data,function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            let obj = {
                name: data.officer_nm,
                task_ref_num: data.task_ref_num,
                mobile_no:results[0].phone_number,
               editBy:user.user_name,
               designation:data.designation
            }
            const responce = reassginSendMessages(obj)
            return res.status(200).send({ status: 200, data: results });
        });

    });
}


export async function pendingpriorityCtrl(req, res) {
    let user = req.user;
console.log(user)
    masterMdl.pendingpriorityMdl(user, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}