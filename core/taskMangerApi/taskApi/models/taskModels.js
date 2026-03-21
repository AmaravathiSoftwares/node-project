import { MySQLConPool } from '../../../../config/dbconnect.js';
import { sqlinjection } from '../../../../utils/utils.js';
import moment from "moment-timezone";




export function getCategoriesDataMdl(data, callback) {
    var cntxtDtls = "in getCategoriesDataMdl";
    // var dataArray = [0, 3];
    var QRY_TO_EXEC = `SELECT * from category_master where d_in=0 and category_type=?  order by category_nm;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.category_type], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getProjectsMdl(callback) {
    var cntxtDtls = "in getProjectsMdl";
    var dataArray = [0, 3];
    var QRY_TO_EXEC = `SELECT id,project_nm from amvt_t_project_lst where d_in=? and changedvalue=? order by project_nm asc;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getOfficersData_Mdl(data,callback) {
    var cntxtDtls = "in getOfficersData_Mdl";
    // var dataArray = [0, 1];
    // and u.role_type != ?
    // let createdBy=``;
    let dataArray=[];
    // if(data.role_type == 1){
    //     createdBy=``;
    //     dataArray=[];
    // }else{
    //     createdBy =`and d.entry_by=?`;
    //     dataArray = [data.id];
    //     ${createdBy}
    // };
    
    var QRY_TO_EXEC = `SELECT u.*,d.department_nm as department from users_data as u join department_master as d on d.id=u.department_id where u.d_in=0 order by u.department_order_by asc;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
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

export function postnewtaskDataMdl(data, task_image, task_idi, task_recid, callback) {
    var cntxtDtls = "in postnewtaskDataMdl";

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var mediumdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var lowdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");

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

    var taskdata = [data.category_id, data.title, data.description, task_image, data.priority, target_dt, data.created_by, dated, i_ts, data.task_type, data.created_nm, task_idi, task_recid, data.prjct_id,data.priorityDays,data.reqId];



    var QRY_TO_EXEC = `insert into task_main_table(from_whom,title,description,task_image,priority,task_deadline,created_by,created_date,i_ts,task_type,created_nm,task_ref_idi,task_ref_num,prjct_id,priorityDays,reqId) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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

export function postnewtaskChildDataMdl(data, lastId, callback) {
    var cntxtDtls = "in postnewtaskChildDataMdl";

    var childData = data.assign_officer;

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var mediumdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var lowdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");


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
                childData[i].officer_id,
                childData[i].officer_name,
                childData[i].department_id,
                childData[i].department_name,
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


export function viewtasksMdl(data, callback) {
    var cntxtDtls = "in viewtasksMdl";

    var dataArray = [];
    const IST = "Asia/Kolkata";
    var fromDate = '';
    var toDate = '';
    var officerdptid = '';
    var resolveStatus = '';
    var createdBy = '';

    if (data.from_date == '' || data.from_date == undefined) {
        fromDate = '';
    } else {
        var f = moment(data.from_date).tz(IST).format("YYYY-MM-DD");
        dataArray.push(f);
        fromDate = ` and dtl.created_date>=?`
    }

    if (data.to_date == '' || data.to_date == undefined) {
        toDate = '';
    } else {
        var t = moment(data.to_date).tz(IST).format("YYYY-MM-DD");
        dataArray.push(t)
        toDate = ` and dtl.created_date<=?`
    }

    if (data.selectedEmployee == '' || data.selectedEmployee == '') {
        officerdptid = '';
    } else {
        dataArray.push(data.selectedEmployee)
        officerdptid = ` and hdr.officer_id=?`
    }

    if (data.resolve_status == '' || data.resolve_status == 'undefined') {
        resolveStatus = '';
    } else {
        dataArray.push(data.resolve_status)
        resolveStatus = ` and dtl.resolve_status=?`
    }

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }


    var QRY_TO_EXEC = `SELECT dtl.*,CASE task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,GROUP_CONCAT(hdr.officer_nm) as officer_nm,COUNT(CASE WHEN hdr.officer_resolve_status = 1 THEN 1 END) AS resolve_status_1_count FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' ${fromDate} ${toDate} ${officerdptid} ${resolveStatus} ${createdBy} group by dtl.task_id order by dtl.task_id desc;`;



    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function viewtasksPopupMdl(data, callback) {
    var cntxtDtls = "in viewtasksPopupMdl";
    var dataArray = [data.task_id];
    var QRY_TO_EXEC = `SELECT  *,CASE WHEN officer_resolve_status=0 THEN 'Pending' ELSE 'Resolved' END as officer_resolve_status_text from task_child_table where d_in=0 and task_main_id=? `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function closeTaskSuperadminMdl(data, callback) {
    var cntxtDtls = "in closeTaskSuperadminMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var dataArray = [i_ts, data.task_id, i_ts, data.task_id];
    var QRY_TO_EXEC = `update task_main_table set resolve_status='1',u_ts=? where task_id=?;

    update task_child_table set officer_resolve_status='1',officer_update_title='Resolved Task',officer_update_remarks='Super Admin Closed',officer_update_ts=? where task_main_id=? and officer_resolve_status='0';`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function tasksVerificationMdl(data, callback) {
    var cntxtDtls = "in tasksVerificationMdl";

    var dataArray = [];
    const IST = "Asia/Kolkata";
    var fromDate = '';
    var toDate = '';
    var officerdptid = '';
    var createdBy = '';

    if (data.from_date == '' || data.from_date == undefined) {
        fromDate = '';
    } else {
        var f = moment(data.from_date).tz(IST).format("YYYY-MM-DD");
        dataArray.push(f);
        fromDate = ` and dtl.created_date>=?`
    }

    if (data.to_date == '' || data.to_date == undefined) {
        toDate = '';
    } else {
        var t = moment(data.to_date).tz(IST).format("YYYY-MM-DD");
        dataArray.push(t)
        toDate = ` and dtl.created_date<=?`
    }

    if (data.selectedEmployee == '' || data.selectedEmployee == '') {
        officerdptid = '';
    } else {
        dataArray.push(data.selectedEmployee)
        officerdptid = ` and hdr.officer_id=?`
    }

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }


    var QRY_TO_EXEC = `SELECT dtl.*,CASE dtl.task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,hdr.*,GROUP_CONCAT(hdr.officer_nm) as officer_nm_array,COUNT(CASE WHEN hdr.officer_resolve_status = 1 THEN 1 END) AS resolve_status_1_count FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' and dtl.resolve_status='0' ${fromDate} ${toDate} ${officerdptid} ${createdBy} group by dtl.task_id HAVING 
    resolve_status_1_count != 0 order by dtl.task_id desc;`;



    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function closetasksVerificationMdl(data, callback) {
    var cntxtDtls = "in closetasksVerificationMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var dataArray = [i_ts, data.task_id,i_ts,data.task_id,i_ts, data.task_id];
    var QRY_TO_EXEC = `update task_main_table set resolve_status='1',u_ts=? where task_id=?;
    update task_child_table set officer_update_remarks='Admin Closed',officer_update_ts=? where task_main_id=? and officer_resolve_status='0';
   update task_child_table set officer_resolve_status='1',u_ts=? where task_main_id=?;
   `;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function edittasksReportMdl(data, callback) {
    var cntxtDtls = "in edittasksReportMdl";

    var dataArray = [];

    var createdBy = '';

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }


    var QRY_TO_EXEC = `SELECT dtl.*,GROUP_CONCAT(hdr.officer_nm) as officer_nm,GROUP_CONCAT(hdr.officer_id) as officer_id FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' and dtl.resolve_status='0' ${createdBy} group by dtl.task_id order by dtl.task_id desc;`;



    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function viewtasksSingleIdMdl(data, callback) {
    var cntxtDtls = "in viewtasksSingleIdMdl";

    var dataArray = [data.task_id];

    var QRY_TO_EXEC = `SELECT dtl.*,hdr.* FROM task_child_table AS hdr
            JOIN task_main_table AS dtl ON dtl.task_id = hdr.task_main_id where dtl.task_id=?`;



    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function deleteAssignedOfficerMdl(data, callback) {
    var cntxtDtls = "in deleteAssignedOfficerMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var dataArray = [i_ts, data.task_id];
    var QRY_TO_EXEC = `update task_child_table set d_in=1,d_ts=? WHERE task_main_id=? and officer_resolve_status=0;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function updatetaskmaintableMdl(data, task_image, callback) {
    var cntxtDtls = "in updatetaskmaintableMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var mediumdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var lowdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");


    var target_dt = highdateStr;
    if (data.priority == 'High') {
        target_dt = `${highdateStr}`;
    } else if (data.priority == 'Medium') {
        target_dt = `${mediumdateStr}`;
    } else if (data.priority == 'Low') {
        target_dt = `${lowdateStr}`;
    } else if (data.priority == 'Fixed Date') {
        target_dt = `${data.fixdate}`
    }

    var taskdata = [data.title, data.description, task_image, data.priority, target_dt, i_ts, data.task_id];



    var QRY_TO_EXEC = `update task_main_table set title=?,description=?, task_image=?,priority=?,task_deadline=?,u_ts=? where task_id=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            taskdata,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function pendingPriorityCountsMdl(data, callback) {
    var cntxtDtls = "in pendingPriorityCountsMdl";
    var dataArray = [];
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");

    dataArray.push(dated, dated, dated, dated, dated, dated, dated, dated, dated, dated, dated, dated)

    var createdBy = '';
    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and c.created_by=?`
    }




    var QRY_TO_EXEC = `SELECT c.officer_id,c.officer_nm as officer_priority, count(*) as cnt,td.designation,
SUM(CASE WHEN date(c.officer_deadline)=? + interval 2 day  THEN 1 else 0 End) as green,
SUM(CASE WHEN date(c.officer_deadline)=? + interval 1 day  THEN 1 else 0 End) as orange,  
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 5 day and ?  THEN 1 else 0 End) as red,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 15 day and ? - INTERVAL 6 day  THEN 1 else 0 End) as red6to15,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 45 day and ? - INTERVAL 16 day  THEN 1 else 0 End) as red16to45,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 90 day and ? - INTERVAL 46 day THEN 1 else 0 End) as red46to90,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 91 day and ? - INTERVAL 1000 day THEN 1 else 0 End) as red90above 
FROM task_child_table as c join users_data td on td.id=c.officer_id
 where c.d_in=0 ${createdBy} and c.officer_resolve_status ='0'  group by c.officer_id;`;


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function pendingPrioritybkMdl(data, callback) {
    var cntxtDtls = "in pendingPrioritybkMdl";
    var dataArray = [];
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    dataArray.push(data.officer_id)
    var createdBy = '';
    var condition = '';
    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and c.created_by=?`
    }

    if (data.priority_id == '0') {
        condition = ``;
    } else if (data.priority_id == '1') {
        condition = ` and date(t.task_deadline)>='${dated}' + interval 2 day `;
    } else if (data.priority_id == '2') {
        condition = ` and date(t.task_deadline)='${dated}' + interval 1 day `;
    } else if (data.priority_id == '3') {
        condition = ` and date(t.task_deadline) between '${dated}' - INTERVAL 5 day and '${dated}' `;
    } else if (data.priority_id == '4') {
        condition = ` and date(t.task_deadline) between '${dated}' - INTERVAL 15 day and '${dated}' - INTERVAL 6 day `;
    } else if (data.priority_id == '5') {
        condition = ` and date(t.task_deadline) between '${dated}' - INTERVAL 45 day and '${dated}' - INTERVAL 16 day `;
    } else if (data.priority_id == '6') {
        condition = ` and date(t.task_deadline) between '${dated}' - INTERVAL 90 day and '${dated}' - INTERVAL 46 day `;
    } else if (data.priority_id == '7') {
        condition = ` and date(t.task_deadline) between '${dated}' - INTERVAL 91 day and '${dated}' - INTERVAL 1000 day `;
    }

    var QRY_TO_EXEC = `SELECT t.task_ref_num,c.task_main_id,c.officer_dept_name,c.officer_nm,title,description,DATE_FORMAT(created_date,"%D-%M-%Y") as created_date,DATE_FORMAT(t.task_deadline,"%D-%M-%Y") as task_deadline,DATE_FORMAT(t.task_deadline,"%Y-%m-%d") as comparisiondt,DATE_FORMAT(c.i_ts,"%D-%M-%Y") as assigned_dt,priority,created_nm,task_image,td.designation FROM task_child_table c
        join task_main_table t on t.task_id=c.task_main_id join users_data td on td.id=c.officer_id where officer_resolve_status = '0'  and c.d_in=0 ${createdBy} and t.d_in=0   and c.officer_id=? ${condition};`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function actionTakenReportMdl(data, callback) {
    var cntxtDtls = "in actionTakenReportMdl";

    var dataArray = [];
    var createdBy = '';

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and c.created_by=?`
    }
    var QRY_TO_EXEC = `SELECT t.officer_id,t.officer_nm,t.officer_dept_name,d.designation, SUM(CASE WHEN t.d_in=0 and officer_resolve_status=0 THEN 1 else 0 End) as pending, 
SUM(CASE WHEN t.d_in=0 and t.officer_resolve_status=1 THEN 1 else 0 End) as approved FROM task_child_table t
JOIN users_data as d ON d.id=t.officer_id where t.d_in=0 ${createdBy} group by t.officer_dpt_id,t.officer_id;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function completedTaskReportMdl(data, callback) {
    var cntxtDtls = "in completedTaskReportMdl";

    var dataArray = [];
    var fromDate = '';
    var toDate = '';
    var createdBy = '';
    if (data.from_date == '' || data.from_date == undefined) {
        fromDate = '';
    } else {
        dataArray.push(data.from_date);
        fromDate = ` and t.created_date>=?`
    }

    if (data.to_date == '' || data.to_date == undefined) {
        toDate = '';
    } else {
        dataArray.push(data.to_date)
        toDate = ` and t.created_date<=?`
    }

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and t.created_by=?`
    }

    var QRY_TO_EXEC = `SELECT t.created_date,t.created_nm,GROUP_CONCAT(c.officer_dept_name) AS assigned_depts,GROUP_CONCAT(c.officer_nm) AS assigned_depts_officers,title,description,task_id,task_ref_num,task_image,CASE  WHEN t.resolve_status=0 THEN 'Pending'  ELSE 'Resolved' END as po_status,t.resolve_status,t.priority,c.* FROM task_main_table t join task_child_table c on c.task_main_id=t.task_id left join users_data r on r.id=t.created_by  where t.d_in=0  and t.resolve_status=1 and c.d_in=0 ${fromDate} ${toDate} ${createdBy} group by task_id order by t.created_date desc;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function officertasksCountsMdl(data, callback) {
    var cntxtDtls = "in officertasksCountsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dataArray = [data.officer_id, data.officer_id, data.officer_id, data.officer_id, data.officer_id, data.officer_id, data.officer_id, data.officer_id];
    var QRY_TO_EXEC = `SELECT (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?)) as total_tasks,
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?) AND officer_resolve_status=1) as total_completed_tasks,
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?) AND officer_resolve_status=0) as total_not_completed_tasks,
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?) and Date(i_ts)='${dated}') as today_tasks,
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?)  AND officer_priority="High") as high_count,
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?)  AND officer_priority="Medium") as medium_count,
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?)  AND officer_priority="Low") as low_count,    
    (SELECT count(distinct task_main_id)  FROM task_child_table WHERE d_in=0  and officer_id in (?)  AND officer_priority="Fixed Date") as Fixed_date_counts;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function officertasksReportMdl(data, callback) {
    var cntxtDtls = "in getOfficersData_Mdl";

    var dataArray = [];

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");

    dataArray.push(data.officer_id);

    var datafilter = '';

    if (data.ind == '0') {
        datafilter = '';
    }
    else if (data.ind == '1') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_resolve_status=?`
    }
    else if (data.ind == '2') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_resolve_status=?`
    }
    else if (data.ind == '3') {
        dataArray.push(dated)
        datafilter = ` and Date(ct.i_ts)=?`
    }
    else if (data.ind == '4') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }
    else if (data.ind == '5') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }
    else if (data.ind == '6') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }
    else if (data.ind == '7') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }


    var QRY_TO_EXEC = `SELECT CASE t.task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,t.task_deadline,t.from_whom,t.created_nm,ct.*,t.created_date,created_date,t.title,t.description,task_id,task_image,CASE WHEN ct.officer_resolve_status=0 THEN 'Pending' ELSE 'Completed' END as po_status,t.resolve_status,t.priority,ct.officer_deadline,t.task_ref_num,t.task_type FROM task_child_table as ct JOIN task_main_table as t ON t.task_id = ct.task_main_id left join users_data r on r.id=t.created_by WHERE ct.d_in=0 and  t.d_in=0  and ct.officer_id in (?) ${datafilter} GROUP BY ct.task_main_id ORDER BY ct.task_main_id desc;`;


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updateOfficerTaskMdl(data, officer_image, callback) {
    var cntxtDtls = "in updateOfficerTaskMdl";

    const IST = "Asia/Kolkata";
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var dataArray = [data.officer_update_remarks, i_ts, officer_image, data.task_child_id];
    var QRY_TO_EXEC = `update task_child_table set officer_update_remarks=?, officer_update_ts=?, officer_upload_file=?,officer_resolve_status='1' where task_child_id=?;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function gettappalcreatedbyMdl(data, callback) {
    var cntxtDtls = "in gettappalcreatedbyMdl";
    var dataArray = [data.task_id];
    var QRY_TO_EXEC = `SELECT user_name,phone_number,designation FROM users_data WHERE d_in=0 and id in (SELECT created_by FROM task_main_table WHERE d_in=0  and task_id=?);`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function admintasksCountsMdl(data, callback) {
    var cntxtDtls = "in admintasksCountsMdl";
    var dataArray = [];
    var created_by = '';

    if (data.role_type == "1") {
        var created_by = '';
    } else {
        dataArray.push(data.created_by,data.created_by,data.created_by,data.created_by,data.created_by,data.created_by,data.created_by,data.created_by);
        created_by = ` and created_by=?`
    }

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");

    var QRY_TO_EXEC = `SELECT (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0 ${created_by}) as total_tasks,
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0   AND resolve_status=1 ${created_by}) as total_completed_tasks,
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0  AND resolve_status=0 ${created_by}) as total_not_completed_tasks,
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0  AND created_date='${dated}' ${created_by}) as today_tasks,
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0   AND priority="High" ${created_by}) as high_count,
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0  AND priority="Medium" ${created_by}) as medium_count,
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0   AND priority="Low" ${created_by}) as low_count,    
    (SELECT count(distinct task_id)  FROM task_main_table WHERE d_in=0   AND priority="Fixed Date" ${created_by}) as Fixed_date_counts;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function admintasksCountsReportMdl(data, callback) {
    var cntxtDtls = "in admintasksCountsReportMdl";

    var dataArray = [];

    var createdBy = '';
    var datafilter = '';

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }

    if (data.ind == '0') {
        datafilter = '';
    }
    else if (data.ind == '1') {
        dataArray.push(data.value)
        datafilter = ` and dtl.resolve_status=?`
    }
    else if (data.ind == '2') {
        dataArray.push(data.value)
        datafilter = ` and dtl.resolve_status=?`
    }
    else if (data.ind == '3') {
        dataArray.push(dated)
        datafilter = ` and dtl.created_date=?`
    }
    else if (data.ind == '4') {
        dataArray.push(data.value)
        datafilter = ` and dtl.priority=?`
    }
    else if (data.ind == '5') {
        dataArray.push(data.value)
        datafilter = ` and dtl.priority=?`
    }
    else if (data.ind == '6') {
        dataArray.push(data.value)
        datafilter = ` and dtl.priority=?`
    }
    else if (data.ind == '7') {
        dataArray.push(data.value)
        datafilter = ` and dtl.priority=?`
    }

    var QRY_TO_EXEC = `SELECT dtl.*,CASE dtl.task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,GROUP_CONCAT(hdr.officer_nm) as officer_nm FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' ${createdBy} ${datafilter} group by dtl.task_id order by dtl.task_id desc;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


//personwise analysis start
export function gettaskDepartmentMdl(data, callback) {
    var cntxtDtls = "in gettaskDepartmentMdl";
    var dataArray = [data.created_by]
    if (data.role_type == 1) {
        var QRY_TO_EXEC = `SELECT id,department_nm FROM department_master WHERE d_in=0 order by department_nm asc;`;
    } else {
        var QRY_TO_EXEC = `SELECT d.id,d.department_nm FROM department_master as d JOIN users_data as u on u.department_id = d.id WHERE d.d_in=0 and u.d_in=0 and u.entry_by=? GROUP by u.department_id order by d.department_nm asc;`;
    }

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
export function getEmployeesDeptwiseMdl(data, callback) {
    var cntxtDtls = "in getEmployeesDeptwiseMdl";
    console.log(data);

    if (data.role_type == 1) {
        var dataArray = [data.department_id];
        var QRY_TO_EXEC = `SELECT id,user_name,phone_number FROM users_data WHERE d_in=0 and department_id=? order by user_name asc;`;
    } else {
        var dataArray = [data.department_id, data.created_by];
        var QRY_TO_EXEC = `SELECT id,user_name,phone_number FROM users_data WHERE d_in=0 and department_id=? and entry_by=? order by user_name asc;`;
    }
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
export function getOfficerwiseCountMdl(data, callback) {
    var cntxtDtls = "in getOfficerwiseCountMdl";
    var dataArray = [data.officer_id,data.officer_id,data.officer_id,data.officer_id,data.officer_id,data.officer_id,data.officer_id];
    var QRY_TO_EXEC = `select (SELECT count(*)  FROM task_child_table where d_in=0 and officer_id in (?)) as officertotal,
(SELECT count(*)  FROM task_child_table where d_in=0 and officer_resolve_status=0 and officer_id in (?)) as officerpending,
(SELECT count(*)  FROM task_child_table where d_in=0 and officer_resolve_status=1 and officer_id in (?)) as officercomplete,
(SELECT count(*)  FROM task_child_table where d_in=0 and officer_priority='High' and officer_id in (?)) as high_pr,
(SELECT count(*)  FROM task_child_table where d_in=0 and officer_priority='Medium' and officer_id in (?)) as medium_pr,
(SELECT count(*)  FROM task_child_table where d_in=0 and officer_priority='Low' and officer_id in (?)) as low_pr,
(SELECT count(*)  FROM task_child_table where d_in=0 and officer_priority='Fixed Date' and officer_id in (?)) as fixed_pr;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getavgresponsegrphMdl(data, callback) {
    var cntxtDtls = "in getavgresponsegrphMdl";
    var dataArray = [data.officer_id];
    var QRY_TO_EXEC = `SELECT officer_dept_name, count(*) as cnt,
    SUM(CASE WHEN TIMESTAMPDIFF(DAY, i_ts, officer_update_ts) BETWEEN 0 AND 5 THEN 1 ELSE 0 END) as red,
    SUM(CASE WHEN TIMESTAMPDIFF(DAY, i_ts, officer_update_ts) BETWEEN 6 AND 15 THEN 1 ELSE 0 END) as red6to15,
    SUM(CASE WHEN TIMESTAMPDIFF(DAY, i_ts, officer_update_ts) BETWEEN 16 AND 45 THEN 1 ELSE 0 END) as red16to45,
    SUM(CASE WHEN TIMESTAMPDIFF(DAY, i_ts, officer_update_ts) > 45 THEN 1 ELSE 0 END) as red46to90 FROM task_child_table
  WHERE officer_resolve_status = 1 AND d_in = 0 AND officer_id in (?);`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function trgtdateexcededindaysMdl(data, callback) {
    var cntxtDtls = "in trgtdateexcededindaysMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD");
    var dataArray = [date, date, date, date, date, date, date, date, date, date, date, date, date, data.officer_id];
    // var dataArray = [data.officer_id];
    var QRY_TO_EXEC = `SELECT officer_dept_name, count(*) as cnt,
        SUM(CASE WHEN date(officer_deadline)>=? + interval 2 day  THEN 1 else 0 End) as green,
    SUM(CASE WHEN date(officer_deadline)=? + interval 1 day  THEN 1 else 0 End) as orange,  
    SUM(CASE WHEN date(officer_deadline) between ? - INTERVAL 5 day and ?  THEN 1 else 0 End) as red,
    SUM(CASE WHEN date(officer_deadline) between ? - INTERVAL 15 day and ? - INTERVAL 6 day  THEN 1 else 0 End) as red6to15,
    SUM(CASE WHEN date(officer_deadline) between ? - INTERVAL 45 day and ? - INTERVAL 16 day  THEN 1 else 0 End) as red16to45,
    SUM(CASE WHEN date(officer_deadline) between ? - INTERVAL 1000 day and ? - INTERVAL 46 day THEN 1 else 0 End) as red46to90, 
    SUM(CASE WHEN date(officer_deadline) > ? THEN 1 ELSE 0 END) as not_exceeded,
    SUM(CASE WHEN date(officer_deadline) between ? - INTERVAL 91 day and ? - INTERVAL 1000 day THEN 1 else 0 End) as red90above FROM task_child_table
     WHERE officer_resolve_status = 0 AND d_in = 0 AND officer_id in (?);`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function officertaskdtlsMdl(data, callback) {
    var cntxtDtls = "in officertaskdtlsMdl";
    var dataArray = [];

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");

    dataArray.push(data.officer_id);

    var datafilter = '';

    if (data.ind == '0') {
        datafilter = '';
    }
    else if (data.ind == '1') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_resolve_status=?`
    }
    else if (data.ind == '2') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_resolve_status=?`
    }
    else if (data.ind == '3') {
        dataArray.push(dated)
        datafilter = ` and Date(ct.i_ts)=?`
    }
    else if (data.ind == '4') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }
    else if (data.ind == '5') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }
    else if (data.ind == '6') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }
    else if (data.ind == '7') {
        dataArray.push(data.value)
        datafilter = ` and ct.officer_priority=?`
    }

    var QRY_TO_EXEC = `SELECT CASE t.task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,t.task_deadline,t.from_whom,t.created_nm,ct.*,t.created_date,created_date,t.title,t.description,task_id,task_image,CASE WHEN ct.officer_resolve_status=0 THEN 'Pending' ELSE 'Completed' END as po_status,t.resolve_status,t.priority,ct.officer_deadline,t.task_ref_num,t.task_type FROM task_child_table as ct JOIN task_main_table as t ON t.task_id = ct.task_main_id left join users_data r on r.id=t.created_by WHERE ct.d_in=0 and  t.d_in=0  and ct.officer_id in (?) ${datafilter} GROUP BY ct.task_main_id ORDER BY ct.task_main_id desc;`;
    console.log(QRY_TO_EXEC);

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
//personwise analysis end

//task performance & mis-reports start

export function pendingprioritystatusMdl(data, callback) {
    var cntxtDtls = "in pendingprioritystatusMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD");
    if (data.role_type == 1) {
        var dataArray = [date, date, date, date, date, date, date, date, date, date, date, date, date];
        var QRY_TO_EXEC = `SELECT c.officer_nm,c.officer_id, count(*) as cnt,td.designation,
SUM(CASE WHEN date(c.officer_deadline)=? + interval 2 day  THEN 1 else 0 End) as green,
SUM(CASE WHEN date(c.officer_deadline)=? + interval 1 day  THEN 1 else 0 End) as orange,  
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 5 day and ?  THEN 1 else 0 End) as red,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 15 day and ? - INTERVAL 6 day  THEN 1 else 0 End) as red6to15,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 45 day and ? - INTERVAL 16 day  THEN 1 else 0 End) as red16to45,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 90 day and ? - INTERVAL 46 day THEN 1 else 0 End) as red46to90,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 91 day and ? - INTERVAL 1000 day THEN 1 else 0 End) as red90above,
SUM(CASE WHEN date(c.officer_deadline) > ? THEN 1 ELSE 0 END) as not_exceeded 
FROM task_child_table as c join users_data td on td.id=c.officer_id
 where c.d_in=0 and c.officer_resolve_status ='0'  group by c.officer_nm;`;

    } else {
        var dataArray = [date, date, date, date, date, date, date, date, date, date, date, date, date, data.id];
        var QRY_TO_EXEC = `SELECT c.officer_nm,c.officer_id, count(*) as cnt,td.designation,
SUM(CASE WHEN date(c.officer_deadline)=? + interval 2 day  THEN 1 else 0 End) as green,
SUM(CASE WHEN date(c.officer_deadline)=? + interval 1 day  THEN 1 else 0 End) as orange,  
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 5 day and ?  THEN 1 else 0 End) as red,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 15 day and ? - INTERVAL 6 day  THEN 1 else 0 End) as red6to15,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 45 day and ? - INTERVAL 16 day  THEN 1 else 0 End) as red16to45,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 90 day and ? - INTERVAL 46 day THEN 1 else 0 End) as red46to90,
SUM(CASE WHEN date(c.officer_deadline) between ? - INTERVAL 91 day and ? - INTERVAL 1000 day THEN 1 else 0 End) as red90above,
SUM(CASE WHEN date(c.officer_deadline) > ? THEN 1 ELSE 0 END) as not_exceeded 
FROM task_child_table as c join users_data td on td.id=c.officer_id
 where c.d_in=0 and c.officer_resolve_status ='0' and c.created_by=?  group by c.officer_nm;`;
    }
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getallpendingtasksMdl(data, callback) {
    var cntxtDtls = "in getallpendingtasksMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD");
    var condition = '';
    if (data.id == '0') {
        condition = ``;
    } else if (data.id == '1') {
        condition = ` and date(officer_deadline) >'${date}'`;
    } else if (data.id == '2') {
        condition = ` and date(officer_deadline) between '${date}' - INTERVAL 5 day and '${date}' `;
    } else if (data.id == '3') {
        condition = ` and date(officer_deadline) between '${date}' - INTERVAL 15 day and '${date}' - INTERVAL 6 day `;
    } else if (data.id == '4') {
        condition = ` and date(officer_deadline) between '${date}' - INTERVAL 45 day and '${date}' - INTERVAL 16 day `;
    } else if (data.id == '5') {
        condition = ` and date(officer_deadline) between '${date}' - INTERVAL 90 day and '${date}' - INTERVAL 46 day `;
    } else if (data.id == '6') {
        condition = ` and date(officer_deadline) between '${date}' - INTERVAL 91 day and '${date}' - INTERVAL 1000 day `;
    }
    var dataArray = [data.officer_id];
    var QRY_TO_EXEC = `SELECT t.task_ref_num,task_main_id,CASE task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,c.officer_dept_name,t.created_date,t.from_whom,t.task_deadline,CASE WHEN c.officer_resolve_status=0 THEN 'Pending' ELSE 'Completed' END as po_status,c.officer_nm,title,description,DATE_FORMAT(officer_deadline,"%D-%M-%Y") as officer_deadline,DATE_FORMAT(officer_deadline,"%Y-%m-%d") as comparisiondt,DATE_FORMAT(c.i_ts,"%D-%M-%Y") as assigned_dt,priority,task_type,created_nm,task_image,td.designation FROM task_child_table c join task_main_table t on t.task_id=c.task_main_id join users_data td on td.id=c.officer_id where officer_resolve_status = '0' and c.d_in=0 and t.d_in=0  and c.officer_id=? ${condition};`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function getactiontakenrprtMdl(data, callback) {
    var cntxtDtls = "in getactiontakenrprtMdl";
    var dataArray = [data.id]
    if (data.role_type == 1) {
        var QRY_TO_EXEC = `SELECT d.designation,t.*, SUM(CASE WHEN t.d_in=0 and officer_resolve_status=0 THEN 1 else 0 End) as pending, 
SUM(CASE WHEN t.d_in=0 and t.officer_resolve_status=1 THEN 1 else 0 End) as approved FROM task_child_table t
JOIN users_data as d ON d.id=t.officer_id where t.d_in=0 group by t.officer_dpt_id,t.officer_id;`;
    } else {
        var QRY_TO_EXEC = `SELECT d.designation,t.*, SUM(CASE WHEN t.d_in=0 and officer_resolve_status=0 THEN 1 else 0 End) as pending, 
SUM(CASE WHEN t.d_in=0 and t.officer_resolve_status=1 THEN 1 else 0 End) as approved FROM task_child_table t
JOIN users_data as d ON d.id=t.officer_id where t.d_in=0 and t.created_by=? group by t.officer_dpt_id,t.officer_id;`;
    }
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

// export function getcompltedtasksrprtMdl(user,data, callback) {
//     var cntxtDtls = "in getcompltedtasksrprtMdl";
//     var dataArray = [user.id,user.id];
//     let date_condition=``;
//     if ((data.fromDate == 0 || data.fromDate == '1970-01-01') && (data.toDate == 0 || data.toDate == '1970-01-01')) {
//         date_condition = ``;
//     } else {
//         date_condition = `and DATE(i_ts) between '${data.fromDate}' and '${data.toDate}'`;
//     }
//     if (data.role_type == 1) {
//         var QRY_TO_EXEC = `SELECT t.created_date,DATE_FORMAT(c.i_ts,"%d-%m-%Y %T") as inserttime,GROUP_CONCAT(r.user_name) AS assgined_by,GROUP_CONCAT(c.officer_dept_name) AS assigned_depts,GROUP_CONCAT(c.officer_nm) AS assigned_depts_officers,title,description,task_id,task_ref_num,task_image,created_nm,CASE  WHEN resolve_status=0 THEN 'Pending'  ELSE 'Completed' END as po_status,t.resolve_status,t.priority,t.from_whom,t.task_type,c.* FROM (select * from task_main_table where d_in=0  and resolve_status=1) t  join (select * from task_child_table where d_in=0 ${date_condition}) c on c.task_main_id=t.task_id left join users_data r on r.id=c.officer_id  group by task_main_id order by c.i_ts desc;`;
//     } else {
//         var QRY_TO_EXEC = `SELECT t.created_date,DATE_FORMAT(c.i_ts,"%d-%m-%Y %T") as inserttime,GROUP_CONCAT(r.user_name) AS assgined_by,GROUP_CONCAT(c.officer_dept_name) AS assigned_depts,GROUP_CONCAT(c.officer_nm) AS assigned_depts_officers,title,description,task_id,task_ref_num,task_image,created_nm,CASE  WHEN resolve_status=0 THEN 'Pending'  ELSE 'Completed' END as po_status,t.resolve_status,t.priority,t.from_whom,t.task_type,c.* FROM (select * from task_main_table where d_in=0  and resolve_status=1 and created_by=?) t  join (select * from task_child_table where d_in=0 and created_by=? ${date_condition}) c on c.task_main_id=t.task_id left join users_data r on r.id=c.officer_id  group by task_main_id order by c.i_ts desc;`;
//     }
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

export function getcompltedtasksrprtMdl(user,data, callback) {
    var cntxtDtls = "in getcompltedtasksrprtMdl";

    var dataArray = [];
    const IST = "Asia/Kolkata";
    var fromDate = '';
    var toDate = '';
    var officerdptid = '';
    var resolveStatus = '';
    var createdBy = '';

    if (data.fromDate == '' || data.fromDate == undefined) {
        fromDate = '';
    } else {
        var f = moment(data.fromDate).tz(IST).format("YYYY-MM-DD");
        dataArray.push(f);
        fromDate = ` and dtl.created_date>=?`
    }

    if (data.toDate == '' || data.toDate == undefined) {
        toDate = '';
    } else {
        var t = moment(data.toDate).tz(IST).format("YYYY-MM-DD");
        dataArray.push(t)
        toDate = ` and dtl.created_date<=?`
    }

    if (user.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(user.id)
        createdBy = ` and dtl.created_by=?`
    }


    var QRY_TO_EXEC = `SELECT dtl.*,CASE task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,GROUP_CONCAT(hdr.officer_nm) as officer_nm,COUNT(CASE WHEN hdr.officer_resolve_status = 1 THEN 1 END) AS resolve_status_1_count FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' and dtl.resolve_status='1' ${fromDate} ${toDate}  ${createdBy} group by dtl.task_id order by dtl.task_id desc;`;



    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


//task performance & mis-reports end

//edit task by id 
export function viewtasksDataByIdMdl(data, callback) {
    var cntxtDtls = "in viewtasksDataByIdMdl";

    var dataArray = [];
    const IST = "Asia/Kolkata";
    var fromDate = '';
    var toDate = '';
    var officerdptid = '';
    var resolveStatus = '';
    var createdBy = '';

    if (data.from_date == '' || data.from_date == undefined) {
        fromDate = '';
    } else {
        var f = moment(data.from_date).tz(IST).format("YYYY-MM-DD");
        dataArray.push(f);
        fromDate = ` and dtl.created_date>=?`
    }

    if (data.to_date == '' || data.to_date == undefined) {
        toDate = '';
    } else {
        var t = moment(data.to_date).tz(IST).format("YYYY-MM-DD");
        dataArray.push(t)
        toDate = ` and dtl.created_date<=?`
    }

    if (data.selectedEmployee == '' || data.selectedEmployee == '') {
        officerdptid = '';
    } else {
        dataArray.push(data.selectedEmployee)
        officerdptid = ` and hdr.officer_id=?`
    }

    if (data.resolve_status == '' || data.resolve_status == 'undefined') {
        resolveStatus = '';
    } else {
        dataArray.push(data.resolve_status)
        resolveStatus = ` and dtl.resolve_status=?`
    }

    if (data.role_type == '1') {
        createdBy = '';
    } else {
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }


    var QRY_TO_EXEC = `SELECT dtl.*,CASE task_type
    WHEN 1 THEN 'Appointment'
    WHEN 2 THEN 'Meeting'
    ELSE 'General Task'
    END AS task_type_main,GROUP_CONCAT(hdr.officer_nm) as officer_nm,GROUP_CONCAT(hdr.officer_id) as officer_id FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' and dtl.reqId=?  group by dtl.task_id;`;

let paramsData=[data.taskId]

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function updateTaskDataMdl(data, task_image, callback) {
    var cntxtDtls = "in updateTaskDataMdl";

    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var mediumdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");
    var lowdateStr = moment().tz(IST).add(data.priorityDays, 'days').format("YYYY-MM-DD");

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

    const updateTaskData = [data.category_id,data.title,data.description,task_image,data.priority, target_dt,data.created_by,dated,i_ts,
    data.prjct_id,  data.priorityDays, data.rowId]



    var QRY_TO_EXEC = `UPDATE task_main_table SET from_whom = ?, title = ?, description = ?,  task_image = ?, priority = ?, task_deadline = ?, updated_by = ?,update_date = ?, i_ts = ?, prjct_id = ?, priorityDays = ? WHERE task_id = ?`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool,QRY_TO_EXEC,updateTaskData,cntxtDtls,function (err, results) {
                results.target_dt = target_dt
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function deletetaskChildofficersDataMdl(data, callback) {
    var cntxtDtls = "in deletetaskChildofficersDataMdl";
    var QRY_TO_EXEC = `UPDATE task_child_table SET d_in =1 where task_main_id =? and officer_id in (?);`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.rowId,data.previousOfficersData], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function deleteTaskDataMdl(data, callback) {
    var cntxtDtls = "in deleteTaskDataMdl";
    var QRY_TO_EXEC = `UPDATE task_main_table SET d_in =1,d_by=? where task_id  =?;
    UPDATE task_child_table SET d_in =1,d_by=? where task_main_id  =?`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.d_by,data.taskId,data.d_by,data.taskId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function reassignUserTaskMdl(data, callback) {
    var cntxtDtls = "in reassignUserTaskMdl";
    var QRY_TO_EXEC = `UPDATE task_child_table SET officer_resolve_status =0 where task_child_id   =?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.task_child_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getOfficerDataMdl(data, callback) {
    var cntxtDtls = "in getOfficerDataMdl";
    var QRY_TO_EXEC = `SELECT * FROM users_data where d_in=0 and id=?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.officer_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}