import { MySQLConPool } from '../../../../config/dbconnect.js';
import { sqlinjection} from '../../../../utils/utils.js';
import moment from "moment-timezone";

export function postnewAppointmentMdl(data,callback) {
    var cntxtDtls = "in postnewAppointmentMdl";
    
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");    

    var taskdata = [data.category,data.name,data.mobile_no,data.aadhar_no,data.purpose_visit,data.location,data.visit_date,data.visit_time,data.created_by,data.created_nm,dated,i_ts];  

    var QRY_TO_EXEC = `insert into appointments_dlts(category,name,mobile_no,aadhar_no,purpose_visit,location,visit_date,visit_time,created_by,created_nm,created_date,i_ts) values(?,?,?,?,?,?,?,?,?,?,?,?)`;

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

export function appointmentReportMdl(data,callback) {
    var cntxtDtls = "in appointmentReportMdl";

    var dataArray = [];
   
    var fromDate = '';
    var toDate = '';
    var category = '';
    var createdBy = '';

    if(data.from_date == '' || data.from_date == undefined){
        fromDate = '';
    }else{
        dataArray.push(data.from_date);
        fromDate = ` and visit_date>=?`
    }

    if(data.to_date == '' || data.to_date == undefined){
        toDate = '';
    }else{
        dataArray.push(data.to_date)
        toDate = ` and visit_date<=?`
    }

    if(data.category == '' || data.category == 'All'){
        category = '';
    }else{
        dataArray.push(data.category)
        category = ` and category=?`
    }
    

    if(data.role_type == '1'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by)
        createdBy = ` and created_by=?`
    }  
    

    var QRY_TO_EXEC = `SELECT * FROM  appointments_dlts WHERE d_in=0 ${fromDate} ${toDate} ${category} ${createdBy} order by visit_date,visit_time desc;`;

            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function appointmentEditReportMdl(data,callback) {
    var cntxtDtls = "in appointmentEditReportMdl";

    var dataArray = [];
   
    var fromDate = '';
    var toDate = '';   
    var createdBy = '';

    if(data.from_date == '' || data.from_date == undefined){
        fromDate = '';
    }else{
        dataArray.push(data.from_date);
        fromDate = ` and visit_date>=?`
    }

    if(data.to_date == '' || data.to_date == undefined){
        toDate = '';
    }else{
        dataArray.push(data.to_date)
        toDate = ` and visit_date<=?`
    }

    if(data.role_type == '0'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by)
        createdBy = ` and created_by=?`
    }  
    

    var QRY_TO_EXEC = `SELECT * FROM  appointments_dlts WHERE d_in=0 and a_status='0' ${fromDate} ${toDate} ${createdBy} order by visit_date,visit_time asc;`;

            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function editAppointmentMdl(data,callback) {
    var cntxtDtls = "in editAppointmentMdl";
    
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");    

    var taskdata = [data.category,data.name,data.mobile_no,data.aadhar_no,data.purpose_visit,data.location,data.visit_date,data.visit_time,data.created_by,i_ts,data.rowId];  

    var QRY_TO_EXEC = `update appointments_dlts set category=?,name=?,mobile_no=?,aadhar_no=?,purpose_visit=?,location=?,visit_date=?,visit_time=?,edit_by=?,edit_ts=? where id=?`;

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


export function allotmentReportMdl(data,callback) {
    var cntxtDtls = "in allotmentReportMdl";

    var dataArray = [];
   
    var fromDate = '';
    var toDate = '';
    var officerdptid = '';
    var resolveStatus = '';
    var createdBy = '';

    if(data.from_date == '' || data.from_date == undefined){
        fromDate = '';
    }else{
        dataArray.push(data.from_date);
        fromDate = ` and dtl.created_date>=?`
    }

    if(data.to_date == '' || data.to_date == undefined){
        toDate = '';
    }else{
        dataArray.push(data.to_date)
        toDate = ` and dtl.created_date<=?`
    }

    if(data.department_id == '' || data.department_id == '0'){
        officerdptid = '';
    }else{
        dataArray.push(data.department_id)
        officerdptid = ` and hdr.officer_dpt_id=?`
    }

    if(data.resolve_status == '' || data.resolve_status == 'undefined'){
        resolveStatus = '';
    }else{
        dataArray.push(data.resolve_status)
        resolveStatus = ` and dtl.resolve_status=?`
    }

    if(data.role_type == '0'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by)
        createdBy = ` and dtl.created_by=?`
    }

    console.log(dataArray);
    

    var QRY_TO_EXEC = `SELECT dtl.*,GROUP_CONCAT(hdr.officer_nm) as officer_nm FROM task_main_table AS dtl
            JOIN task_child_table AS hdr ON dtl.task_id = hdr.task_main_id where dtl.d_in='0' and hdr.d_in='0' and dtl.task_type='1' ${fromDate} ${toDate} ${officerdptid} ${resolveStatus} ${createdBy} group by dtl.task_id order by dtl.task_id desc;`;

            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function visitorReportMdl(data,callback) {
    var cntxtDtls = "in visitorReportMdl";

    var dataArray = [];
   
  
    var aadhar_no = ''; 
    var createdBy = '';

    

    if(data.aadhar_no == '' || data.aadhar_no == '0'){
        aadhar_no = '';
    }else{
        dataArray.push(data.aadhar_no)
        aadhar_no = ` and aadhar_no=?`
    }    

    if(data.role_type == '0'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by)
        createdBy = ` and created_by=?`
    }

    console.log(dataArray);
    

    var QRY_TO_EXEC = `SELECT id,name,mobile_no,aadhar_no,COUNT(aadhar_no)as visits FROM appointments_dlts WHERE d_in=0 ${aadhar_no} ${createdBy} GROUP by aadhar_no order by id DESC;`;

            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function appointmentMisReportCountsMdl(data,callback) {
    var cntxtDtls = "in appointmentMisReportCountsMdl";

    var dataArray = [];   
      
    var createdBy = '';
    
    if(data.role_type == '1'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by,data.created_by,data.created_by,data.created_by,data.created_by,data.created_by)
        createdBy = ` and created_by=?`
    }  
    

    var QRY_TO_EXEC = `SELECT(SELECT COUNT(*) FROM appointments_dlts WHERE d_in='0' ${createdBy}) as total_appointments, (SELECT COUNT(*) FROM appointments_dlts WHERE d_in='0' and a_status = 0 ${createdBy}) as not_allotted, (SELECT COUNT(*) FROM appointments_dlts WHERE d_in='0' and a_status = 1 ${createdBy}) as allotted, (SELECT COUNT(*) FROM appointments_dlts WHERE d_in='0' and visit_date= CURDATE() ${createdBy}) as today_appointments,(SELECT COUNT(*) FROM appointments_dlts WHERE d_in='0' and visit_date= CURDATE() + INTERVAL 1 DAY ${createdBy}) as tomorrow_appointments,(SELECT COUNT(*) FROM appointments_dlts WHERE d_in='0' and visit_date= CURDATE() + INTERVAL 2 DAY ${createdBy}) as in_two_days_appointments;`;

            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function appointmentMisReportMdl(data,callback) {
    var cntxtDtls = "in appointmentMisReportMdl";

    var dataArray = [];   
      
    var createdBy = '';
    
    if(data.role_type == '1'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by)
        createdBy = ` and created_by=?`
    }  
    

    if(data.count_ind==1){ 
        var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in='0'  ${createdBy} order by visit_time ,visit_date;` 
    }  // Total Appointments
    else if(data.count_ind==2){ 
        var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in='0' ${createdBy}  and visit_date= CURDATE() order by visit_time ,visit_date;` 
    } //Today Appointments
   else if(data.count_ind==3){ 
        var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in='0' ${createdBy}  and visit_date= CURDATE() + INTERVAL 1 DAY;` 
    } // Tomorrow Appointments
    else if(data.count_ind==4){ 
        var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in='0' ${createdBy}  and visit_date= CURDATE() + INTERVAL 2 DAY order by visit_time ,visit_date;` 
    } // The Day After Appointments    
    else if(data.count_ind==5){ 
        var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in='0' ${createdBy} and a_status = 0 order by visit_time ,visit_date;` 
    }   // Not Allotted  Appointments
    else if(data.count_ind==6)
    { 
        // var QRY_TO_EXEC = `SELECT a.*,GROUP_CONCAT(t.officer_nm) as officer_nm FROM appointments_dlts as a JOIN task_child_table as t ON a.task_id=t.task_main_id WHERE a.d_in=0 AND a.a_status=1 ${createdBy} GROUP BY a.task_id order by a.id desc;` 
        
         var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in=0 AND a_status=1 ${createdBy} order by visit_time ,visit_date;` 
    } // Allotted  Appointments
    else
    { 
        var QRY_TO_EXEC = `SELECT * FROM appointments_dlts WHERE d_in='0' ${createdBy} order by visit_time ,visit_date;` 
    } // Allotted  Appointments
            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function appointmentsLastsevenDaysMdl(data,callback) {
    var cntxtDtls = "in appointmentsLastsevenDaysMdl";

    var dataArray = [];   
      
    var createdBy = '';
    
    if(data.role_type == '0'){
        createdBy = '';
    }else{
        dataArray.push(data.created_by)
        createdBy = ` and created_by=?`
    }  
    

    var QRY_TO_EXEC = `SELECT DATE_FORMAT(visit_date,"%d/%m/%Y") as visit_date,COUNT(*) AS tcnt FROM appointments_dlts WHERE d_in = 0 ${createdBy} AND visit_date > CURRENT_DATE - INTERVAL 7 DAY GROUP BY  visit_date ORDER BY visit_date DESC LIMIT 7;`;
            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
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
            sqlinjection( MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function postnewtaskDataMdl(data,task_image,task_idi,task_recid, callback) {
    var cntxtDtls = "in postnewtaskDataMdl";
    
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
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
        console.log(h);
        target_dt = `${h}`
    }

    var taskdata = [data.category_id,data.title,data.description,task_image,data.priority,target_dt,data.created_by,dated,i_ts,data.task_type,data.created_nm,task_idi,task_recid,data.aptid,data.prjct_id,data.reqId];  

  

    var QRY_TO_EXEC = `insert into task_main_table(from_whom,title,description,task_image,priority,task_deadline,created_by,created_date,i_ts,task_type,created_nm,task_ref_idi,task_ref_num,appointment_id,prjct_id,reqId) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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

export function postnewtaskChildDataMdl(data,lastId, callback) {
    var cntxtDtls = "in postnewtaskChildDataMdl";   
  
    var childData = data.assign_officer;

    const IST = "Asia/Kolkata";    
    var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    var highdateStr = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD"); 
    var mediumdateStr = moment().tz(IST).add(3, 'days').format("YYYY-MM-DD"); 
    var lowdateStr = moment().tz(IST).add(7, 'days').format("YYYY-MM-DD");

    
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


export function updateappointmentTaskMdl(data,insertId,callback) {
    var cntxtDtls = "in updateappointmentTaskMdl";

    var taskdata = ['1',insertId,data.aptid]; 

    var QRY_TO_EXEC = `update appointments_dlts set a_status=?,task_id=? where id=?`;

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

export function getVisitorsRepMdl(data,callback) {
    var cntxtDtls = "in getVisitorsRepMdl";
    let dataArray=[];
    let createdBy= ``;
     if(data.role_type == '1'){
        createdBy = '';
    }else{
        dataArray.push(data.officer_id)
        createdBy = ` and created_by=?`
    } 
    console.log(dataArray)
    var QRY_TO_EXEC = `SELECT category,name,mobile_no,COUNT(id) as no_of_time_visit FROM appointments_dlts WHERE d_in='0' ${createdBy} GROUP by mobile_no,category ORDER by category asc;`;
        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC,dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function getviewAppointmentDataByIdMdl(data,callback) {
    var cntxtDtls = "in getviewAppointmentDataByIdMdl";
    var dataArray = [data.appointmentId];

    var QRY_TO_EXEC = `SELECT * FROM  appointments_dlts WHERE d_in=0 and id=?;`;

            

        if (callback && typeof callback == "function") {
            sqlinjection( MySQLConPool, QRY_TO_EXEC, dataArray, cntxtDtls, function (err, results) {
                    callback(err, results);
                    return;
                }
            );
        } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function deleteAppointmentDataMdl(data,callback) {
    var cntxtDtls = "in deleteAppointmentDataMdl";

    var taskdata = [data.rowId]; 

    var QRY_TO_EXEC = `update appointments_dlts set d_in=1 where id=?`;

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

