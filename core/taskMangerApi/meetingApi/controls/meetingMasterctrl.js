import * as masterMdl from '../models/meetingModels.js';
import fs from 'fs';
import { meetingSendMessages,newTaskSendMessages,momSendMessages,resnedMomPdfMessages } from "../../../../utils/watiSmsUtil.js";
import moment from 'moment';
import fetch from 'node-fetch';
import pdf from 'pdf-creator-node';
import { PDFDocument } from 'pdf-lib';

export async function postMeetingCtrl(req, res) {
    var data = req.body;
 let user = req.user;
    data.created_by = user.id;
    data.created_nm = user.user_name;
    data.designation = user.designation;
    masterMdl.postMeetingMdl(data, function (err, mainresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        masterMdl.postChildMeetingMdl(data, mainresults.insertId, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            let venued;
            let templetName;
            if(data.type == 'offline'){
                venued = data.meeting_venue;
                templetName='maud_meeting';
            }else{
                venued = data.link;
                templetName='online_meet_msg_org';
                
            }
            const IST = "Asia/Kolkata";
            const formattedDate = moment(data.meeting_date).tz(IST).format('DD/MM/YYYY');
            data.assign_officer.forEach(async element => {
                const responce = await meetingSendMessages(element,data,formattedDate,venued,templetName);
            });
            return res.status(200).send({ status: 200, data: results });
        });
    });
}

export async function viewMeetingCtrl(req, res) {
    var data = req.body;
    masterMdl.viewMeetingMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}

export async function editMeetingCtrl(req, res) {
    var data = req.body;
    masterMdl.deleteMeetingAssignedOfficerMdl(data, function (err, mainresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        masterMdl.updateMeetingmaintableMdl(data, function (err, updateresults) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            masterMdl.postChildMeetingMdl(data, data.meeting_id, function (err, results) {
                if (err) {
                    return res.status(500).send({ status: 500, msg: "Server Error" });
                }

                return res.status(200).send({ status: 200, data: results });
            });
        });
    });
}

// export async function addMOMMeetingCtrl(req, res) {
//     var data = req.body;
//     let user=req.user;
//     var meetingArray = data.meetingArray.momDetails;
//     var task_image = '';
//     let responsiblePerson = [];
//     const promises = [];
//     console.log(meetingArray);
//     var task_idi = 0;
//     let momObj={};
//     if (Array.isArray(meetingArray)) {
//         meetingArray.forEach(element => {
//             const promise = new Promise((resolve, reject) => {
//                 masterMdl.getTaskRefMdl(function (err, idresults) {
//                     if (err) {
//                         return reject({ status: 500, msg: "Server Error" });
//                     }
//                     if (idresults[0]) {
//                         task_idi = idresults[0].task_ref_idi;
//                     } else {
//                         task_idi = 0;
//                     }

//                     let recidi = task_idi + 1;
//                     let recid = "AI-" + recidi;

//                     var datad = {
//                         "category_id": data.category_id,
//                         "title": data.meeting_title,
//                         "description": element.description,
//                         "priority": element.priority,
//                         "created_by": data.created_by,
//                         "task_type": data.task_type,
//                         "created_nm": data.created_nm,
//                         "assign_officer": element.responsiblePerson,
//                         "meeting_id": data.meeting_id,
//                         "reqId":data.reqId
//                     };
//                     element.responsiblePerson.forEach(sub => {
//                         responsiblePerson.push({
//                          user_name:sub.user_name,
//                           description: element.description,
//                           priority: element.priority,
//                           meeting_title:data.meeting_title,
//                           recid:recid,
//                           phone_number:sub.phone_number,
//                         });
//                     });
                    
                    
//                     masterMdl.postnewtaskDataMdl(datad, task_image, recidi, recid, function (err, mainresults) {
//                         if (err) {
//                             return reject({ status: 500, msg: "Server Error" });
//                         }

//                         masterMdl.postnewtaskChildDataMdl(datad, mainresults.insertId, async function (err, results) {
//                             if (err) {
//                                 return reject({ status: 500, msg: "Server Error" });
//                             }
//                             resolve(results);
//                         });
//                     });
//                 });
//             });
//             promises.push(promise);
//         });
//         Promise.all(promises)
//             .then((allResults) => {
//                 masterMdl.updateMeetingIdMdl(data,async function (err, results) {
//                     if (err) {
//                         return res.status(500).send({ status: 500, msg: "Server Error" });
//                     }
//                     console.log(responsiblePerson,'responsiblePerson')
//                      responsiblePerson.forEach(async element => {
//                      const responce = await momSendMessages(element,user);
//                     });
                    
                    
//                     return res.status(200).send({ status: 200, data: allResults });
//                 });
//             })
//             .catch((error) => {
//                 // Handle errors
//                 return res.status(error.status || 500).send(error);
//             });
//     } else {
//         return res.status(400).send({ status: 400, msg: "meetingArray is not an array" });
//     }

// }
export async function addMOMMeetingCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  const meetingArray = data.meetingArray.momDetails;
  const task_image = '';
  let responsiblePerson = [];
  const promises = [];

  if (!Array.isArray(meetingArray)) {
    return res.status(400).send({ status: 400, msg: "meetingArray is not an array" });
  }
  masterMdl.getTaskRefMdl(function (err, idresults) {
    if (err) return res.status(500).send({ status: 500, msg: "Server Error" });
    let lastTaskRefIdi = idresults[0]?.task_ref_idi || 0;
    meetingArray.forEach((element, index) => {
      const promise = new Promise((resolve, reject) => {
        const recidi = lastTaskRefIdi + index + 1;
        const recid = "AI-" + recidi;
        const datad = {
          category_id: data.category_id,
          title: data.meeting_title,
          description: element.description,
          priority: element.priority,
          created_by: data.created_by,
          task_type: data.task_type,
          created_nm: data.created_nm,
          assign_officer: element.responsiblePerson,
          meeting_id: data.meeting_id,
          reqId: data.reqId
        };
        element.responsiblePerson.forEach(sub => {
          responsiblePerson.push({
            user_name: sub.user_name,
            description: element.description,
            priority: element.priority,
            meeting_title: data.meeting_title,
            recid: recid,
            phone_number: sub.phone_number
          });
        });

        // Create task
        masterMdl.postnewtaskDataMdl(datad, task_image, recidi, recid, function (err, mainresults) {
          if (err) return reject({ status: 500, msg: "Error creating task" });

          masterMdl.postnewtaskChildDataMdl(datad, mainresults.insertId, function (err, results) {
            if (err) return reject({ status: 500, msg: "Error creating task child" });
            resolve(results);
          });
        });
      });

      promises.push(promise);
    });
    // After all tasks are created
    Promise.all(promises)
      .then(() => {
        masterMdl.updateMeetingIdMdl(data, async function (err) {
          if (err) return res.status(500).send({ status: 500, msg: "Error updating meeting ID" });
          for (const person of responsiblePerson) {
            await momSendMessages(person, user);
          }
          return res.status(200).send({ status: 200, msg: "Tasks created successfully" });
        });
      })
      .catch((error) => {
        return res.status(error.status || 500).send(error);
      });
  });
}


// notes 
export async function createuserNotesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    // data.entry_by = user.id;
    masterMdl.createuserNotesMdl(data, user.id, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

export async function getuserNotessCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.userId = user.id;
    masterMdl.getuserNotessMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function updateuserNotesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    masterMdl.updateuserNotesMdl(data,user.id, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

export async function deleteuserNotesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteuserNotesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}

export async function getviewMeetingDataByIdCtrl(req, res) {
    var data = req.body;
    masterMdl.getviewMeetingDataByIdMdl(data, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}
export async function updateMeetingDetailsCtrl(req, res) {
    var data = req.body;
 let user = req.user;
    data.created_by = user.id;
    data.created_nm = user.user_name;
    data.designation = user.designation;
    masterMdl.updateMeetingMdl(data, function (err, mainresults) {
        if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
        }

        masterMdl.deleteprevoiusOfficersMdl(data, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: "Server Error" });
            }
            masterMdl.postChildMeetingMdl(data, data.rowId, function (err, results) {
                if (err) {
                    return res.status(500).send({ status: 500, msg: "Server Error" });
                }
               let venued;
            let templetName;
            if(data.type == 'offline'){
                venued = data.meeting_venue;
                templetName='maud_meeting';
            }else{
                venued = data.link;
                templetName='online_meet_msg_org';
                
            }
                const IST = "Asia/Kolkata";
                const formattedDate = moment(data.meeting_date).tz(IST).format('DD/MM/YYYY');
                data.assign_officer.forEach(async element => {
                    const responce = await meetingSendMessages(element, data, formattedDate, venued,templetName);
                });
                return res.status(200).send({ status: 200, data: results });
            });
        });

    });
}

export async function deleteMeetingDataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteMeetingDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
};
export async function openresnedMomPdfMessagesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    data.designation = user.designation;
    // Fetch the HTML content
    const response = await fetch(`https://aptms.in:1693/nodeapp/meetingpdf/${data.meeting_id}`);
                    const html = await response.text();
    
    // Define the PDF document options
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "1mm",
      base: 'https://aptms.in:1693/',
      type: 'pdf',
      renderDelay: 1000,
    };
   var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + '' + datetimestamp;
    // Define the document
    const document = {
      html: html,
      data: {}, // You can pass additional data if required
      path: `../public_html/momPdfs/${unicnumber}.pdf`
        };
    
    // Create the PDF
    await pdf.create(document, options);
    
    const cpdf_path = `https://aptms.in/momPdfs/${unicnumber}.pdf`;
    
    
    if(data.selectedOption == 1){
    masterMdl.openresnedMomPdfMessagesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
         cRes.forEach(async element => {
             const formattedDate = moment(data.meeting_date).tz(IST).format('DD/MM/YYYY');
              let obj={
                name:element.user_name,
                meeting_title:data.meeting_title,
                mobile_no:element.phone_number,
                meeting_date:formattedDate,
                 designation:data.designation
            }
        const responce = await resnedMomPdfMessages(obj,cpdf_path);
        });
        res.send({ status: 200, "msg": "deleted successfully" });
    }); 
    }else{
         masterMdl.openresnedMomMeetingOfficerslistMdl(data, function (err, officersData) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        officersData.forEach(async element => {
            const formattedDate = moment(data.meeting_date).tz(IST).format('DD/MM/YYYY');
            let obj={
                name:element.officer_name,
                meeting_title:data.meeting_title,
                mobile_no:element.officer_mobile_no,
                meeting_date:formattedDate,
                 designation:data.designation
            }
            
        const responce = await resnedMomPdfMessages(obj,cpdf_path);
        });
        res.send({ status: 200, "msg": "deleted successfully" });
    }); 
    }
  
};

