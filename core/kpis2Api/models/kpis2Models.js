import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import { encrypt, decrypt } from "../../../utils/cryptoUtils.js"
import moment from "moment-timezone";

export function getDdnsMonthlyDataReportMdl(data, callback) {
    var cntxtDtls = "in getDdnsMonthlyDataReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `SELECT '05-07-2025' as as_on_date, COUNT(*)  AS target,5202 as achieved  FROM ddns_monthly_data WHERE ddns_status=1 and d_in=0;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getDdrfMonthlyDataReportMdl(data, callback) {
    var cntxtDtls = "in getDdrfMonthlyDataReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
    var QRY_TO_EXEC = `SELECT  '05-07-2025' as as_on_date,COUNT(*)  AS target,2253 as achieved FROM ddrf_monthly_data WHERE  ddns_status=1 and d_in=0;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getAuevcsMonthlyDataReportMdl(data, callback) {
    var cntxtDtls = "in getAuevcsMonthlyDataReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
    var QRY_TO_EXEC = `SELECT  '05-07-2025' as as_on_date,599 as target,COUNT(*)  AS achieved FROM vedic_students_monthly_data WHERE  ddns_status=1 and d_in=0;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getengineerworksDataReportMdl(data, callback) {
    var cntxtDtls = "in getengineerworksDataReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(released_date) = YEAR('${dated}') AND MONTH(released_date) = MONTH('${dated}') and
    var QRY_TO_EXEC = `SELECT '05-07-2025' as as_on_date,125090643 as cgf_released FROM engineer_works WHERE  d_in=0 limit 1;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getCgfDataReportMdl(data, callback) {
    var cntxtDtls = "in getCgfDataReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `SELECT '05-07-2025' as as_on_date, 50003384 as total_amount FROM cgf_collection_data WHERE  d_in=0 and month='June-2025';`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getOnlineServiceReportMdl(data, callback) {
    var cntxtDtls = "in getOnlineServiceReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `SELECT '05-07-2025' as as_on_date,168 as target,count(*) as achieved FROM online_temple_data WHERE  d_in=0;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};



export function getddnsArachakReportMdl(data, user, callback) {
    var cntxtDtls = "in getddnsArachakReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    let whereCondition = ``;
    if (user.role_type == 1) {
        whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',') ? user.district_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = `and o.district_id in (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',') ? user.temple_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` and o.temple_nm in (${inClause})`;
    } else {
        whereCondition = ``;
    }


    var QRY_TO_EXEC = `SELECT d.district_name,m.mandal_name,v.village_name,o.* FROM ddns_master_data_org as o
        LEFT JOIN districts_data as d on o.district_id=d.id
        LEFT JOIN mandal_list as m on o.mandal_id=m.mandal_id
        LEFT JOIN village_data as v on o.village_id=v.village_id
        WHERE  o.d_in=0 ${whereCondition} order by d.district_name,m.mandal_name;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {

            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getDistrictReportDataMdl(data, callback) {
    var cntxtDtls = "in getDistrictReportDataMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `SELECT * FROM districts_data WHERE  d_in=0;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function submitArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in submitArackaDetailsMdl";
    const IST = "Asia/Kolkata";
    console.log(data)
    const aadhaar_number = encrypt(data.aadhaar_number)
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `INSERT INTO ddns_master_data_org (district_id,mandal_id,village_id,temple_nm,temple_name, archaka_name, mobile_no, aadhaar_number,entry_by,entry_date,dated,bank_name,bank_ifsc,bank_acno) 
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_name, data.archaka_name, data.mobile_no, aadhaar_number, data.entry_by, dated, dated,data.bank_name,data.bank_ifsc,data.bank_acno];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getddrfsArachakReportMdl(data, user, callback) {
    var cntxtDtls = "in getddrfsArachakReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    let whereCondition = ``;
    if (user.role_type == 1) {
        whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',') ? user.district_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = `and o.district_id in (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',') ? user.temple_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` and o.temple_nm in (${inClause})`;
    } else {
        whereCondition = ``;
    }
    var QRY_TO_EXEC = `SELECT d.district_name,m.mandal_name,v.village_name,o.* FROM ddrf_master_data_org as o
        LEFT JOIN districts_data as d on o.district_id=d.id
        LEFT JOIN mandal_list as m on o.mandal_id=m.mandal_id
        LEFT JOIN village_data as v on o.village_id=v.village_id
        WHERE  o.d_in=0 ${whereCondition} order by d.district_name,m.mandal_name;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getAuevsArachakReportMdl(data, user, callback) {
    var cntxtDtls = "in getAuevsArachakReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    let whereCondition = ``;
    if (user.role_type == 1) {
        whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',') ? user.district_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = `and o.district_id in (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',') ? user.temple_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` and o.temple_nm in (${inClause})`;
    } else {
        whereCondition = ``;
    }
    var QRY_TO_EXEC = `SELECT d.district_name,m.mandal_name,v.village_name,o.* FROM vedic_students_master_data_org as o
        LEFT JOIN districts_data as d on o.district_id=d.id
        LEFT JOIN mandal_list as m on o.mandal_id=m.mandal_id
        LEFT JOIN village_data as v on o.village_id=v.village_id
        WHERE  o.d_in=0 ${whereCondition} order by d.district_name,m.mandal_name;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getEngneeringWorksReportMdl(data, callback) {
    var cntxtDtls = "in getEngneeringWorksReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-07-01";
    var QRY_TO_EXEC = `SELECT * FROM engineer_works_org WHERE  d_in=0 and YEAR(released_date) = YEAR('${dated}') AND MONTH(released_date) = MONTH('${dated}');`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getOnlineServiceTemplesReportMdl(data, callback) {
    var cntxtDtls = "in getOnlineServiceTemplesReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    // var dated = "2025-06-01";
    var QRY_TO_EXEC = `SELECT d.district_name,m.mandal_name,v.village_name,o.* FROM online_temple_data_org as o
        LEFT JOIN districts_data as d on o.district_id=d.id
        LEFT JOIN mandal_list as m on o.mandal_id=m.mandal_id
        LEFT JOIN village_data as v on o.village_id=v.village_id
        WHERE  o.d_in=0 order by d.district_name,m.mandal_name;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getCCGFReportMdl(data, callback) {
    var cntxtDtls = "in getCCGFReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    var QRY_TO_EXEC = `SELECT * FROM cgf_collection_data WHERE  d_in=0;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};



export function updateArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in updateArackaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data)
    const aadhaar_number = encrypt(data.aadhaar_number)
    var QRY_TO_EXEC = `update ddns_master_data_org set temple_name = ?,district_id= ?,mandal_id= ?,village_id= ?,temple_nm= ?,archaka_name =?,mobile_no=?,aadhaar_number=?,updated_by=? ,updated_date=?,bank_name=?,bank_ifsc=?,bank_acno=? where id=? `;
    let paramsData = [data.temple_name, data.district_id, data.mandal_id, data.village_id, data.temple_nm,data.archaka_name, data.mobile_no, aadhaar_number, data.updated_by, dated,data.bank_name,data.bank_ifsc,data.bank_acno, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function deleteddnsArachakaDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteddnsArachakaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update ddns_master_data_org set d_in = '1',remarks=?,d_date=?,d_by=? where id=? `;
    let paramsData = [data.remarks,dated,data.d_by,data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//DDRF Details
export function updateDdrfArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in updateDdrfArackaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    const aadhaar_number = encrypt(data.aadhaar_number)
    console.log(data)
    var QRY_TO_EXEC = `update ddrf_master_data_org set temple_nm = ?,district_id= ?,mandal_id= ?,village_id= ?,temple_name= ? ,archaka_name =?,mobile_no=?,aadhaar_number=?,temple_amount=?,fund_amount=?,updated_by=?,updated_date=?,bank_name=?,bank_ifsc=?,bank_acno=?  where id=? `;
    let paramsData = [data.temple_nm, data.district_id, data.mandal_id, data.village_id, data.temple_name, data.archaka_name, data.mobile_no, aadhaar_number,data.temple_amount,data.fund_amount, data.updated_by, dated,data.bank_name,data.bank_ifsc,data.bank_acno,data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function submitDDrfArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in submitDDrfArackaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    const aadhaar_number = encrypt(data.aadhaar_number)
    var QRY_TO_EXEC = `INSERT INTO ddrf_master_data_org (district_id,mandal_id,village_id,temple_nm,temple_name, archaka_name, mobile_no, aadhaar_number,fund_amount,temple_amount,entry_by,entry_date,dated,bank_name,bank_ifsc,bank_acno) 
    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_name, data.archaka_name, data.mobile_no, aadhaar_number,data.fund_amount,data.temple_amount, data.entry_by, dated, dated,data.bank_name,data.bank_ifsc,data.bank_acno];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function deleteddrfArachakaDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteddrfArachakaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update ddrf_master_data_org set d_in = '1',remarks=?,d_date=?,d_by=? where id=? `;
    let paramsData = [data.remarks,dated,data.d_by,data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
//Aueves Details
export function updateAuevsArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in updateAuevsArackaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data)
    if(data.archakas){
        var {archaka_name,mobile_no,aadhaar_number,qualification,bank_name,bank_ifsc,bank_acno} = data.archakas[0]
    }else{
        var archaka_name=null;let mobile_no=null; let aadhaar_number=null; let qualification=null;
    }
    
    const enaadhaar_number = encrypt(aadhaar_number)
    
    var QRY_TO_EXEC = `update vedic_students_master_data_org set temple_nm = ?,district_id= ?,mandal_id= ?,village_id= ?,temple_name= ? ,archaka_name =?,mobile_no=?,aadhaar_number=?,updated_by=?,updated_date=?,qualification=?,bank_name=?,bank_ifsc=?,bank_acno=?  where id=? `;
    let paramsData = [data.temple_nm, data.district_id, data.mandal_id, data.village_id, data.temple_name, archaka_name, mobile_no, enaadhaar_number, data.updated_by, dated, qualification,bank_name,bank_ifsc,bank_acno, data.rowId];
    console.log(paramsData);

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function submitAuevsArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in submitAuevsArackaDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    // const aadhaar_number = encrypt(data.aadhaar_number)
    var QRY_TO_EXEC = `INSERT INTO vedic_students_master_data_org (district_id,mandal_id,village_id,temple_nm,temple_name, archaka_name, mobile_no, aadhaar_number,entry_by,dated,qualification,entry_date,bank_name,bank_ifsc,bank_acno) 
    VALUES ?;`;
    //  const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_name, data.archaka_name, data.mobile_no, aadhaar_number, data.entry_by, dated, data.qualification, dated];
     const insertValues =data.map(obj => [obj.district_id, obj.mandal_id, obj.village_id, obj.temple_nm, obj.temple_name,obj.archaka_name,obj.mobile_no,obj.aadhaar_number,obj.entry_by,dated,obj.qualification,dated,obj.bank_name,obj.bank_ifsc,obj.bank_acno]);
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [insertValues], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function deleteAuevsArachakaDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteAuevsArachakaDetailsMdl"
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update vedic_students_master_data_org set d_in = '1',remarks=?,d_date=?,d_by=? where id=? `;
    let paramsData = [data.remarks,dated,data.d_by,data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//CCGF Details

export function updateCCGFDetailsMdl(data, callback) {
    var cntxtDtls = "in updateCCGFDetailsMdl";
    var QRY_TO_EXEC = `update cgf_collection_data set month = ? , amount = ?,updated_by=? where id=? `;
    let paramsData = [data.month, data.amount, data.updated_by, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function submitCCGFDetailsMdl(data, callback) {
    var cntxtDtls = "in submitCCGFDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `INSERT INTO cgf_collection_data (month,amount,entry_by,dated) 
    values(?,?,?,?)`;
    const insertValues = [data.month, data.amount, data.entry_by, dated];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function deleteCCGFDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteCCGFDetailsMdl";
    var QRY_TO_EXEC = `update cgf_collection_data set d_in = '1' where id=? `;
    let paramsData = [data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//EngneeringWorksDetails 

export function updateEngneeringWorksDetailsMdl(data, callback) {
    var cntxtDtls = "in updateEngneeringWorksDetailsMdl";
    var QRY_TO_EXEC = `UPDATE engineer_works 
    SET district_id = ?,district_name = ?,temple_nm = ?,amount_released = ?, 
        ps_charges = ?,released_date = ?,updated_by = ? WHERE id = ?`;

    const paramsData = [data.district_id, data.district_name, data.temple_nm, data.amount_released, data.ps_charges,
    data.released_date, data.updated_by, data.rowId
    ];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function submitEngneeringWorksDetailsMdl(data, callback) {
    var cntxtDtls = "in submitEngneeringWorksDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data, cntxtDtls)
    var QRY_TO_EXEC = `INSERT INTO engineer_works_org (district_id,mandal_id,village_id,temple_nm,temple_name,trans_ref_id,amount_released,ps_charges,released_date,entry_by,entry_date,dated) 
    values(?,?,?,?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_name, data.trans_ref_id, data.temple_nm, data.amount_released, data.ps_charges, data.released_date, data.entry_by, dated, dated];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function deleteEngneeringWorksDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteEngneeringWorksDetailsMdl";
    var QRY_TO_EXEC = `update engineer_works_org set d_in = '1' where id=? `;
    let paramsData = [data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

// online temple data
export function createonlineTempleDataMdl(data, callback) {
    const cntxtDtls = "in createonlineTempleDataMdl";
    const IST = "Asia/Kolkata";
    let dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data)
    const { temple_nm, district_id, mandal_id, village_id, temple_name, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO online_temple_data_org (district_id,mandal_id,village_id,temple_name,temple_nm,entry_by,entry_date) VALUES (?,?,?,?,?,?,?)`;

    let paramsData = [district_id, mandal_id, village_id, temple_name, temple_nm, entry_by, dated];
    console.log(paramsData)
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updateonlineTempleDataMdl(data, callback) {
    const cntxtDtls = "in updateonlineTempleDataMdl";
    const IST = "Asia/Kolkata";
    let dated = moment().tz(IST).format("YYYY-MM-DD");
    const { temple_nm, district_id, mandal_id, village_id, temple_name, updated_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE online_temple_data_org SET temple_nm = ?,district_id= ?,mandal_id= ?,village_id= ?,temple_name= ?,updated_by=?,updated_date=?, WHERE id = ?`;

    let paramsData = [temple_nm, district_id, mandal_id, village_id, temple_name, updated_by, dated, rowId];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deleteonlineTempleDataMdl(data, callback) {
    const cntxtDtls = "in deleteonlineTempleDataMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE online_temple_data_org  SET d_in = 1,d_by=? WHERE id = ?`;

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


export function getDistrictsMdl(data, user, callback) {
    const cntxtDtls = "in getDistrictsMdl";
    // const { rowId, d_by } = data;
    let whereCondition = ``;
    if (user.role_type == 1) {
        whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',') ? user.district_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = `and id in (${inClause})`;
    } else {
        whereCondition = ``;
    }
    const QRY_TO_EXEC = `SELECT * FROM districts_data WHERE d_in=0 ${whereCondition};`;

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

export function getUlbsMdl(data, callback) {
    const cntxtDtls = "in getUlbsMdl";
    const { district_id } = data;
    const QRY_TO_EXEC = `SELECT mandal_id,mandal_name FROM mandal_list WHERE district_id=? and d_in=0`;

    let paramsData = [district_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getvillagesMdl(data, callback) {
    const cntxtDtls = "in getvillagesMdl";
    const { mandal_id } = data;
    const QRY_TO_EXEC = `SELECT village_id,village_name from village_data WHERE mandal_id=? and d_in=0;`;

    let paramsData = [mandal_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getTemplesMdl(data, callback) {
    const cntxtDtls = "in getTemplesMdl";
    const { village_id } = data;
    const QRY_TO_EXEC = `SELECT * from temple_registration WHERE temple_village_id=? and d_in=0;;`;

    let paramsData = [village_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function checkDuplicatesMdl(data, callback) {
    const cntxtDtls = "in getTemplesMdl";
    console.log(data)
    const {mobile_no,aadhaar_number,type} = data;
    const aadhaar_number_enc=encrypt(aadhaar_number)
    let QRY_TO_EXEC ;
    if(type==1){
        QRY_TO_EXEC= `SELECT * FROM ddns_master_data_org WHERE d_in=0 AND (mobile_no=? or aadhaar_number=?);`;
    }else if(type==2){
        QRY_TO_EXEC= `SELECT * FROM ddrf_master_data_org WHERE d_in=0 AND (mobile_no=? or aadhaar_number=?);`;
    }else if(type==3){
        QRY_TO_EXEC= `SELECT * FROM vedic_students_master_data_org WHERE d_in=0 AND (mobile_no=? or aadhaar_number=?);`;
    }

    let paramsData = [mobile_no,aadhaar_number_enc];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function TrustBoardsMdl(data, callback) {
    const cntxtDtls = "in getTemplesMdl";
    console.log(data)
    let QRY_TO_EXEC =`SELECT * FROM trust_boards WHERE d_in=0`
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


export function submitCgfCDetailsMdl(data, callback) {
    var cntxtDtls = "in submitCgfCDetailsMdl";
    const IST = "Asia/Kolkata";
    console.log(data)
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `INSERT INTO cgf_c (district_name,mandal_name,village_name,temple_name,tcode,date, collection_amount, entry_by) 
    values(?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_code, data.date, data.collection_amount, data.entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getcgfCdataMdl(limit, offset, data, user, callback) {
    console.log(data, user, 745);
    const cntxtDtls = "in getcgfCdataMdl";

    let whereCondition = ``;
    if (user.role_type == 1) {
      
        whereCondition = ``;
    } else if (user.role_type == 5) {
      
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',')
                ? user.district_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = ` AND c.district_name IN (${inClause})`;
    } else if (user.role_type == 6) {
      
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',')
                ? user.temple_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` AND c.temple_name IN (${inClause})`;
    } else {
        whereCondition = ``;
    }

    let dataQuery = `
    SELECT 
        c.*, 
        d.id AS district_id, 
        d.district_name, 
        m.mandal_id, 
        m.mandal_name, 
        v.village_id, 
        v.village_name,
        t.temple_id AS temple_nm, 
        t.temple_name
    FROM cgf_c AS c
    LEFT JOIN districts_data AS d ON c.district_name = d.id
    LEFT JOIN mandal_list AS m ON c.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON c.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON c.temple_name = t.temple_id
    WHERE c.d_in = 0 ${whereCondition} ORDER BY c.id DESC
`;

    let countQuery = `
    SELECT COUNT(c.id) AS totalCount
    FROM cgf_c AS c
    LEFT JOIN districts_data AS d ON c.district_name = d.id
    LEFT JOIN mandal_list AS m ON c.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON c.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON c.temple_name = t.temple_id
    WHERE c.d_in = 0 ${whereCondition}
`;

    dataQuery += ` LIMIT ? OFFSET ?;`;
    let queryParams = [parseInt(limit), parseInt(offset)];
    let countParams = [];

    sqlinjection(MySQLConPool, countQuery, countParams, cntxtDtls, function (errCount, countResults) {
        if (errCount) {
            console.error('Count Query Error:', errCount);
            callback(errCount, null);
            return;
        }

        const totalCount = countResults[0].totalCount;

        sqlinjection(MySQLConPool, dataQuery, queryParams, cntxtDtls, function (err, results) {
            if (err) {
                console.error('Data Query Error:', err);
                callback(err, null);
                return;
            }

            callback(null, {
                data: results,
                totalCount: totalCount
            });
        });
    });
}


export function submitCgfrDetailsMdl(data, callback) {
    var cntxtDtls = "in submitCgfrDetailsMdl";
    const IST = "Asia/Kolkata";
    console.log(data)
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `INSERT INTO engineer_works (district_name,mandal_name,village_name,temple_nm,tcode,released_date, trans_ref_id,amount_released,ps_charges, entry_by) 
    values(?,?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_code, data.date, data.file_number, data.released_amount, data.ps_charges, data.entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getcgfRdataMdl(limit, offset, data, user, callback) {
    const cntxtDtls = "in getcgfRdataMdl";

    let whereCondition = ``;

   
    if (user.role_type == 1) {
         whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',')
                ? user.district_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = ` AND e.district_name IN (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',')
                ? user.temple_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` AND e.temple_nm IN (${inClause})`;
    } else {
        whereCondition = ``;
    }

    // ✅ Full joined data query
  let dataQuery = `
    SELECT 
        e.*, 
        d.id AS district_id, 
        d.district_name, 
        m.mandal_id, 
        m.mandal_name, 
        v.village_id, 
        v.village_name,
        e.temple_nm,              
        t.temple_name             
    FROM engineer_works AS e
    LEFT JOIN districts_data AS d ON e.district_name = d.id
    LEFT JOIN mandal_list AS m ON e.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON e.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON e.temple_nm = t.temple_id 
    WHERE e.d_in = 0 ${whereCondition} ORDER BY e.id DESC
`;


    // ✅ Matching count query
    let countQuery = `
        SELECT COUNT(e.id) AS totalCount
        FROM engineer_works AS e
        LEFT JOIN districts_data AS d ON e.district_name = d.id
        LEFT JOIN mandal_list AS m ON e.mandal_name = m.mandal_id
        LEFT JOIN village_data AS v ON e.village_name = v.village_id
        LEFT JOIN temple_registration AS t ON e.temple_nm = t.temple_id
        WHERE e.d_in = 0 ${whereCondition}
    `;

    dataQuery += ` LIMIT ? OFFSET ?;`;
    let queryParams = [parseInt(limit), parseInt(offset)];
    let countParams = [];

    sqlinjection(MySQLConPool, countQuery, countParams, cntxtDtls, function (errCount, countResults) {
        if (errCount) {
            console.error('Count Query Error:', errCount);
            callback(errCount, null);
            return;
        }

        const totalCount = countResults[0].totalCount;

        sqlinjection(MySQLConPool, dataQuery, queryParams, cntxtDtls, function (err, results) {
            if (err) {
                console.error('Data Query Error:', err);
                callback(err, null);
                return;
            }

            callback(null, {
                data: results,
                totalCount: totalCount
            });
        });
    });
}


export function submitAnnaprasadamDetailsMdl(data, callback) {
    var cntxtDtls = "in submitAnnaprasadamDetailsMdl";
    const IST = "Asia/Kolkata";
    console.log(data)
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `INSERT INTO annadanam_info (district_name,mandal_name,village_name,temple_name,tcode,date, day_category,amount,footfall_number, entry_by) 
    values(?,?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_code, data.date, data.day_category, data.devotees_number, data.footfall_number, data.entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getAnnapradasamdataMdl(limit, offset, data, user, callback) {
    console.log(data, user, 905);
    const cntxtDtls = "in getAnnapradasamdataMdl";

    let whereCondition = ``;
  
    if (user.role_type == 1) {
        whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',')
                ? user.district_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = ` AND a.district_name IN (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',')
                ? user.temple_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` AND a.temple_name IN (${inClause})`;
    } else {
      
        whereCondition = ``;
    }
    let dataQuery = `
    SELECT 
        a.*, 
        d.id AS district_id, 
        d.district_name, 
        m.mandal_id, 
        m.mandal_name, 
        v.village_id, 
        v.village_name,
        t.temple_id AS temple_nm, 
        t.temple_name
    FROM annadanam_info AS a
    LEFT JOIN districts_data AS d ON a.district_name = d.id
    LEFT JOIN mandal_list AS m ON a.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON a.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON a.temple_name = t.temple_id
    WHERE a.d_in = 0 ${whereCondition} ORDER BY a.id DESC
`;

    let countQuery = `
    SELECT COUNT(a.id) AS totalCount
    FROM annadanam_info AS a
    LEFT JOIN districts_data AS d ON a.district_name = d.id
    LEFT JOIN mandal_list AS m ON a.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON a.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON a.temple_name = t.temple_id
    WHERE a.d_in = 0 ${whereCondition}
`;
    dataQuery += ` LIMIT ? OFFSET ?;`;
    let queryParams = [parseInt(limit), parseInt(offset)];
    let countParams = [];

    sqlinjection(MySQLConPool, countQuery, countParams, cntxtDtls, function (errCount, countResults) {
        if (errCount) {
            console.error('Count Query Error:', errCount);
            callback(errCount, null);
            return;
        }
        const totalCount = countResults[0].totalCount;

        sqlinjection(MySQLConPool, dataQuery, queryParams, cntxtDtls, function (err, results) {
            if (err) {
                console.error('Data Query Error:', err);
                callback(err, null);
                return;
            }
            callback(null, {
                data: results,
                totalCount: totalCount
            });
        });
    });
}


export function updateCgfCDetailsMdl(data, callback) {
    var cntxtDtls = "in updateCgfCDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data)
    var QRY_TO_EXEC = `update cgf_c set district_name = ?,mandal_name= ?,village_name= ?,temple_name= ?,tcode= ?,date =?,collection_amount=?,updated_by=?,updated_date=?  where id=? `;
    let paramsData = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_code, data.date, data.collection_amount, data.updated_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function deleteCgfcdataMdl(data, callback) {
    var cntxtDtls = "in deleteCgfcdataMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update cgf_c set d_in = '1',d_by=?,d_date=? where id=? `;
    let paramsData = [data.d_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function updateCgfrDetailsMdl(data, callback) {
    var cntxtDtls = "in updateCgfrDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data)
    var QRY_TO_EXEC = `update engineer_works set district_name = ?,mandal_name= ?,village_name= ?,temple_nm= ?,tcode= ?,released_date =?,trans_ref_id=?,amount_released = ?,ps_charges = ?,updated_by=?,updated_date=?  where id=? `;
    let paramsData = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.temple_code, data.date, data.file_number, data.released_amount, data.ps_charges, data.updated_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function deletecgfrDetailsMdl(data, callback) {
    var cntxtDtls = "in deletecgfrDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update engineer_works set d_in = '1',d_by=?,d_date=? where id=? `;
    let paramsData = [data.d_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function updateAnnaprasadamDetailsMdl(data, callback) {
    console.log(data, 1029);
    var cntxtDtls = "in updateAnnaprasadamDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    console.log(data)
    var QRY_TO_EXEC = `update annadanam_info set district_name = ?,mandal_name= ?,village_name= ?,temple_name= ?,date= ?,day_category =?,footfall_number=?,tcode = ?,amount = ?,updated_by=?,updated_date=?  where id=? `;
    let paramsData = [data.district_id, data.mandal_id, data.village_id, data.temple_nm, data.date, data.day_category, data.footfall_number, data.temple_code, data.devotees_number, data.updated_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function deleteannapradsadamDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteannapradsadamDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update annadanam_info set d_in = '1',d_by=?,d_date=? where id=? `;
    let paramsData = [data.d_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

