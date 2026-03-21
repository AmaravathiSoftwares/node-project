import { MySQLConPool } from '../../../../config/dbconnect.js';
import { sqlinjection } from '../../../../utils/utils.js';
import moment from "moment-timezone";

export function postMeetingMdl(data, callback) {
    var cntxtDtls = "in postMeetingMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var mdate = moment(data.meeting_date).tz(IST).format("YYYY-MM-DD");


    var meetingdata = [mdate, data.meeting_start_tm, data.meeting_end_tm, data.meeting_title, data.meeting_description, data.meeting_venue, data.created_by, data.created_nm, i_ts, data.type, data.link,data.reqId];



    var QRY_TO_EXEC = `insert into meeting_main_table(meeting_date,meeting_start_tm,meeting_end_tm,meeting_title,meeting_description,meeting_venue,created_by,created_nm,i_ts,type,link,reqId) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            meetingdata,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function postChildMeetingMdl(data, lastId, callback) {
    var cntxtDtls = "in postChildMeetingMdl";

    var childData = data.assign_officer;

    const insertQueries = [];

    if (Array.isArray(childData) && childData.length > 0) {
        for (let i = 0; i < childData.length; i++) {
            const dataArray = [
                lastId,
                childData[i].officer_id,
                childData[i].officer_name,
                childData[i].mobile

            ];
            const QRY_TO_EXEC = `INSERT INTO meeting_child_table 
        (meeting_main_id, officer_id, officer_name, officer_mobile_no) 
        VALUES (?, ?, ?, ?);`;
            insertQueries.push({ query: QRY_TO_EXEC, data: dataArray });
        }
    }
    let results = [];
    let errors = [];
    insertQueries.forEach((item, index) => {
        sqlinjection(MySQLConPool, item.query, item.data, cntxtDtls, function (err, result) {
            if (err) {
                errors.push(err);
                if (index === insertQueries.length - 1) {
                    return callback(errors, null);
                }
            } else {
                results.push(result);
                if (index === insertQueries.length - 1) {
                    return callback(null, { results });
                }

            }
        });
    });
};

export function viewMeetingMdl(data, callback) {
    var cntxtDtls = "in viewMeetingMdl";

    var dataArray = [];

    var fromDate = '';
    var toDate = '';
    var createdBy = '';
    var officer_id = '';
    var mom_status = '';
    if (data.from_date == '' || data.from_date == undefined) {
        fromDate = '';
    } else {
        dataArray.push(data.from_date);
        fromDate = ` and dtl.meeting_date>=?`
    }

    if (data.to_date == '' || data.to_date == undefined) {
        toDate = '';
    } else {
        dataArray.push(data.to_date)
        toDate = ` and dtl.meeting_date<=?`
    }


    if (data.officer_id == '' || data.officer_id == undefined || data.officer_id == "All") {
        officer_id = '';
    } else {
        dataArray.push(data.officer_id)
        officer_id = ` and hdr.officer_id=?`
    }

    if (data.mom_status == '' || data.mom_status == undefined) {
        mom_status = '';
    } else {
        dataArray.push(data.mom_status)
        mom_status = ` and dtl.mom_status=?`
    }

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }


    var QRY_TO_EXEC = `SELECT dtl.*,GROUP_CONCAT(hdr.officer_name) as officer_name FROM meeting_main_table AS dtl
            JOIN meeting_child_table AS hdr ON dtl.meeting_id = hdr.meeting_main_id where dtl.d_in='0' and hdr.d_in='0' ${fromDate} ${toDate} ${officer_id} ${mom_status} ${createdBy} group by dtl.meeting_id order by dtl.meeting_date desc;`;



    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function deleteMeetingAssignedOfficerMdl(data, callback) {
    var cntxtDtls = "in deleteMeetingAssignedOfficerMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var dataArray = [i_ts, data.created_by, data.meeting_id];
    var QRY_TO_EXEC = `update meeting_child_table set d_in=1,d_ts=?,deleted_by=? WHERE meeting_main_id=?`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updateMeetingmaintableMdl(data, callback) {
    var cntxtDtls = "in updateMeetingmaintableMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var meetingdata = [data.meeting_date, data.meeting_start_tm, data.meeting_end_tm, data.meeting_title, data.meeting_description, data.meeting_venue, i_ts, data.meeting_id];

    var QRY_TO_EXEC = `update meeting_main_table set meeting_date=?,meeting_start_tm=?, meeting_end_tm=?,meeting_title=?,meeting_description=?,meeting_venue=?,u_ts=? where meeting_id=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            meetingdata,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function postnewtaskDataMdl(data, task_image, task_idi, task_recid, callback) {
    var cntxtDtls = "in postnewtaskDataMdl";

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");
    var mediumdateStr = moment().tz(IST).add(3, 'days').format("YYYY-MM-DD");
    var lowdateStr = moment().tz(IST).add(7, 'days').format("YYYY-MM-DD");

    var target_dt = highdateStr;
    let priorityDays=0;
    if (data.priority == 'High') {
        target_dt = `${highdateStr}`;
        priorityDays=1;
    } else if (data.priority == 'Medium') {
        target_dt = `${mediumdateStr}`;
         priorityDays=3;
    } else if (data.priority == 'Low') {
        target_dt = `${lowdateStr}`;
        priorityDays=7;
    } else if (data.priority == 'Fixed Date') {
        var h = moment(data.fixdate).tz(IST).format("YYYY-MM-DD");
        target_dt = `${h}`
         priorityDays=0;
    }
console.log(data,'Mahi')
    var taskdata = [data.category_id, data.title, data.description, task_image, data.priority, target_dt, data.created_by, dated, i_ts, data.task_type, data.created_nm, task_idi, task_recid, data.meeting_id,data.reqId,priorityDays];



    var QRY_TO_EXEC = `insert into task_main_table(from_whom,title,description,task_image,priority,task_deadline,created_by,created_date,i_ts,task_type,created_nm,task_ref_idi,task_ref_num,appointment_id,reqId,priorityDays) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            taskdata,
            cntxtDtls,
            function (err, results) {
                results.target_dt = target_dt
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
export function getTaskRefMdl(callback) {
    var cntxtDtls = "in getTaskRefMdl";
    var QRY_TO_EXEC = `SELECT task_ref_idi from task_main_table order by task_ref_idi desc limit 1;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
export function postnewtaskChildDataMdl(data, lastId, callback) {
    var cntxtDtls = "in postnewtaskChildDataMdl";

    var childData = data.assign_officer;

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");
    var mediumdateStr = moment().tz(IST).add(3, 'days').format("YYYY-MM-DD");
    var lowdateStr = moment().tz(IST).add(10, 'days').format("YYYY-MM-DD");


    var target_dt = highdateStr;
    if (data.priority == 'High') {
        target_dt = `${highdateStr}`;
    } else if (data.priority == 'Medium') {
        target_dt = `${mediumdateStr}`;
    } else if (data.priority == 'Low') {
        target_dt = `${lowdateStr}`;
    } else if (data.priority == 'Fixed Date') {
        var h = moment(data.fixdate).tz(IST).format("YYYY-MM-DD");
        target_dt = `${h}`
    }

    const insertQueries = [];

    if (Array.isArray(childData) && childData.length > 0) {
        for (let i = 0; i < childData.length; i++) {
            const dataArray = [
                lastId,
                childData[i].id,
                childData[i].user_name,
                childData[i].department_id,
                childData[i].department,
                data.priority,
                target_dt,
                data.created_by,
                i_ts,
            ];
            const QRY_TO_EXEC = `INSERT INTO task_child_table 
        (task_main_id, officer_id, officer_nm, officer_dpt_id, officer_dept_name,  officer_priority, officer_deadline,created_by,i_ts) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            insertQueries.push({ query: QRY_TO_EXEC, data: dataArray });
        }
    }
    let results = [];
    let errors = [];
    insertQueries.forEach((item, index) => {
        sqlinjection(MySQLConPool, item.query, item.data, cntxtDtls, function (err, result) {
            if (err) {
                errors.push(err);
                if (index === insertQueries.length - 1) {
                    return callback(errors, null);
                }
            } else {
                results.push(result);
                if (index === insertQueries.length - 1) {
                    return callback(null, { results });
                }

            }
        });
    });
};

export function updateMeetingIdMdl(data, callback) {
    var cntxtDtls = "in updateMeetingIdMdl";
    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var dataArray = [data.created_by, i_ts, data.meeting_id];
    var QRY_TO_EXEC = `update meeting_main_table set mom_status=1,mom_updated_by=?,mom_ts=? WHERE meeting_id=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getmomprintMdl(meetingid,callback) {
    var cntxtDtls = "in getmomprintMdl";    
    var QRY_TO_EXEC = `SELECT m.meeting_end_tm,m.meeting_start_tm,m.type,m.link,t.task_ref_num,t.task_id,t.description,t.priority,m.meeting_venue,m.meeting_id,m.meeting_date,m.meeting_title,m.meeting_description,GROUP_CONCAT(DISTINCT c.officer_nm) as officer_nm,GROUP_CONCAT(DISTINCT ch.officer_name) as attended_officer_nm FROM task_main_table as t join task_child_table as c on c.task_main_id=t.task_id left join meeting_main_table as m on m.meeting_id=t.appointment_id left join meeting_child_table as ch on m.meeting_id=ch.meeting_main_id WHERE t.task_type='2' and m.mom_status='1' and t.d_in='0' and m.meeting_id = ? GROUP by t.task_id;`;
        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, [meetingid], cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC,[meetingid], cntxtDtls);
}

// notes 

export function createuserNotesMdl(data, entry_by, callback) {
    const cntxtDtls = "in createuserNotesMdl";
    const IST = "Asia/Kolkata";
    data.forEach(res => {
        res.dated = moment(res.date).tz(IST).format("YYYY-MM-DD");
    });
    const QRY_TO_EXEC = `INSERT INTO notes_t (user_id,title, color, date, entry_by) VALUES ?`;
    const paramsData = data.map(obj => [entry_by, obj.title, obj.color, obj.dated, entry_by]);

    if (typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [paramsData], cntxtDtls, function (err, results) {
            callback(err, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [paramsData], cntxtDtls);
    }
}

export function getuserNotessMdl(data, callback) {
    const cntxtDtls = "in getuserNotessMdl";
    const { userId } = data;
    const QRY_TO_EXEC = `SELECT * FROM notes_t where d_in=0 and user_id =? order by id desc`;

    let paramsData = [userId];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updateuserNotesMdl(data, updated_by, callback) {
    const cntxtDtls = "in updateuserNotesMdl";
    // const { title, color, date, updated_by, rowId } = data;
    const IST = "Asia/Kolkata";
    data.forEach(res => {
        res.dated = moment(res.date).tz(IST).format("YYYY-MM-DD");
    });
    const QRY_TO_EXEC = `UPDATE notes_t SET title = ?, color = ?, date = ?,updated_by=? WHERE id = ?`;
    const paramsData = data.map(obj => [obj.title, obj.color, obj.dated, updated_by, obj.id]);
    let completed = 0;
    let errors = [];
    if (callback && typeof callback == "function") {
        data.forEach(obj => {
            const params = [obj.title, obj.color, obj.dated, updated_by, obj.id];
            sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
                if (err) errors.push({ id: obj.id, error: err });
                completed++;
                if (completed === data.length) {
                    callback(errors.length ? errors : null, results);
                }
            });
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deleteuserNotesMdl(data, callback) {
    const cntxtDtls = "in deleteuserNotesMdl";
    const { d_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE notes_t  SET d_in = 1,d_by=? WHERE id = ?`;

    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}



export function getviewMeetingDataByIdMdl(data, callback) {
    var cntxtDtls = "in getviewMeetingDataByIdMdl";

    var QRY_TO_EXEC = `SELECT dtl.*,GROUP_CONCAT(hdr.officer_name) as officer_name,GROUP_CONCAT(hdr.officer_id) as officer_ids FROM meeting_main_table AS dtl
            JOIN meeting_child_table AS hdr ON dtl.meeting_id = hdr.meeting_main_id where dtl.d_in='0' and hdr.d_in='0' and dtl.meeting_id=? group by dtl.meeting_id order by dtl.meeting_date desc;`;
let paramsData=[data.meetingId]

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function updateMeetingMdl(data, callback) {
    var cntxtDtls = "in updateMeetingMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
console.log(data)
    var mdate = moment(data.meeting_date).tz(IST).format("YYYY-MM-DD");


  const updateMeetingData = [mdate, data.meeting_start_tm, data.meeting_end_tm, data.meeting_title,data.meeting_description, data.meeting_venue, data.created_by, i_ts, data.type, data.link, data.rowId];;



    var QRY_TO_EXEC = ` UPDATE meeting_main_table SET  meeting_date = ?, meeting_start_tm = ?, meeting_end_tm = ?, meeting_title = ?,
    meeting_description = ?, meeting_venue = ?, updated_by = ?,  i_ts = ?, type = ?, link = ? WHERE meeting_id = ?`;
    console.log(QRY_TO_EXEC)
    console.log(updateMeetingData)
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool,QRY_TO_EXEC,updateMeetingData,cntxtDtls,function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function deleteprevoiusOfficersMdl(data, callback) {
    var cntxtDtls = "in deleteprevoiusOfficersMdl";
    var QRY_TO_EXEC = `UPDATE meeting_child_table SET d_in =1 where meeting_main_id =? and officer_id in (?);`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.rowId,data.previousOfficersData], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function deleteMeetingDataMdl(data, callback) {
    const cntxtDtls = "in deleteMeetingDataMdl";
    const { d_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE meeting_main_table  SET d_in = 1,d_by=? WHERE meeting_id  = ?`;

    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function openresnedMomPdfMessagesMdl(data, callback) {
    const cntxtDtls = "in openresnedMomPdfMessagesMdl";
    const { selectedOption } = data;
    const QRY_TO_EXEC = `SELECT * FROM users_data where d_in=0 and role_type =2 order by id desc`;

    let paramsData = [];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function openresnedMomMeetingOfficerslistMdl(data, callback) {
    const cntxtDtls = "in openresnedMomMeetingOfficerslistMdl";
    const { meeting_id } = data;
    const QRY_TO_EXEC = `SELECT * FROM meeting_child_table WHERE meeting_main_id = ? and d_in=0;`;

    let paramsData = [meeting_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

