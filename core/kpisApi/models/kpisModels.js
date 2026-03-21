import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";

//cm apis start
// export function getDdnsMonthlyDataReportMdl(data, callback) {
//     var cntxtDtls = "in getDdnsMonthlyDataReportMdl";

//     var QRY_TO_EXEC = `SELECT as_on_date, ddns_target as target,ddns_achieved as achieved  FROM cm_api_data WHERE d_in=0;`;

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };

// export function getDdrfMonthlyDataReportMdl(data, callback) {
//     var cntxtDtls = "in getDdrfMonthlyDataReportMdl";

//     var QRY_TO_EXEC = `SELECT  as_on_date,ddrf_target as target,ddrf_achieved as achieved FROM cm_api_data WHERE d_in=0;`;

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };

// export function getAuevcsMonthlyDataReportMdl(data, callback) {
//     var cntxtDtls = "in getAuevcsMonthlyDataReportMdl";
//     const IST = "Asia/Kolkata";

//     var QRY_TO_EXEC = `SELECT  as_on_date,auevcs_target as target,auevcs_achieved as achieved FROM cm_api_data WHERE d_in=0;`;

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };

// export function getengineerworksDataReportMdl(data, callback) {
//     var cntxtDtls = "in getengineerworksDataReportMdl";

//     var QRY_TO_EXEC = `SELECT as_on_date,engineer_works_amount as cgf_released FROM cm_api_data WHERE d_in=0;`;

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };

// export function getCgfDataReportMdl(data, callback) {
//     var cntxtDtls = "in getCgfDataReportMdl";

//     var QRY_TO_EXEC = `SELECT as_on_date, cgf_amount as total_amount FROM cm_api_data WHERE d_in=0;`;

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };

// export function getOnlineServiceReportMdl(data, callback) {
//     var cntxtDtls = "in getOnlineServiceReportMdl";

//     var QRY_TO_EXEC = `SELECT as_on_date,online_target as target,online_achieved as achieved FROM cm_api_data WHERE d_in=0;`;

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };
//cm apis end

export function getddnsArachakReportMdl(data, callback) {
    var cntxtDtls = "in getddnsArachakReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `SELECT * FROM ddns_master_data WHERE  d_in=0 ORDER by id asc;`
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
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `INSERT INTO ddns_master_data (district_id,district_name,temple_nm, archaka_name, mobile_no, aadhaar_number,entry_by,dated) 
    values(?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.district_name, data.temple_nm, data.archaka_name, data.mobile_no, data.aadhaar_number, data.entry_by, dated];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getddrfsArachakReportMdl(data, callback) {
    var cntxtDtls = "in getddrfsArachakReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `SELECT * FROM ddrf_master_data WHERE  d_in=0 ORDER by id asc;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getAuevsArachakReportMdl(data, callback) {
    var cntxtDtls = "in getAuevsArachakReportMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `SELECT * FROM vedic_students_master_data WHERE  d_in=0 ORDER by id asc;`
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
    var dated = "2025-06-01";
    var QRY_TO_EXEC = `SELECT * FROM engineer_works WHERE  d_in=0 and YEAR(released_date) = YEAR('${dated}') AND MONTH(released_date) = MONTH('${dated}');`
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
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    var QRY_TO_EXEC = `SELECT * FROM online_temple_data WHERE  d_in=0 order by temple_nm;`
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
    var QRY_TO_EXEC = `update ddns_master_data set district_id = ? , district_name = ?,temple_nm = ? ,archaka_name =?,mobile_no=?,aadhaar_number=?,updated_by=?  where id=? `;
    let paramsData = [data.district_id, data.district_name, data.temple_nm, data.archaka_name, data.mobile_no, data.aadhaar_number, data.updated_by, data.rowId]
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
    var QRY_TO_EXEC = `update ddns_master_data set d_in = '1' where id=? `;
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

//DDRF Details
export function updateDdrfArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in updateDdrfArackaDetailsMdl";
    var QRY_TO_EXEC = `update ddrf_master_data set district_id = ? , district_name = ?,temple_nm = ? ,archaka_name =?,mobile_no=?,aadhaar_number=?,updated_by=?  where id=? `;
    let paramsData = [data.district_id, data.district_name, data.temple_nm, data.archaka_name, data.mobile_no, data.aadhaar_number, data.updated_by, data.rowId]
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
    var QRY_TO_EXEC = `INSERT INTO ddrf_master_data (district_id,district_name,temple_nm, archaka_name, mobile_no, aadhaar_number,entry_by,dated) 
    values(?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.district_name, data.temple_nm, data.archaka_name, data.mobile_no, data.aadhaar_number, data.entry_by, dated];
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
    var QRY_TO_EXEC = `update ddrf_master_data set d_in = '1' where id=? `;
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
//Aueves Details
export function updateAuevsArackaDetailsMdl(data, callback) {
    var cntxtDtls = "in updateAuevsArackaDetailsMdl";
    var QRY_TO_EXEC = `update vedic_students_master_data set district_id = ? , district_name = ?,temple_nm = ? ,archaka_name =?,mobile_no=?,aadhaar_number=?,updated_by=?,qualification=?  where id=? `;
    let paramsData = [data.district_id, data.district_name, data.temple_nm, data.archaka_name, data.mobile_no, data.aadhaar_number, data.updated_by, data.qualification, data.rowId]
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
    var QRY_TO_EXEC = `INSERT INTO vedic_students_master_data (district_id,district_name,temple_nm, archaka_name, mobile_no, aadhaar_number,entry_by,dated,qualification) 
    values(?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.district_name, data.temple_nm, data.archaka_name, data.mobile_no, data.aadhaar_number, data.entry_by, dated, data.qualification];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, insertValues, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function deleteAuevsArachakaDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteAuevsArachakaDetailsMdl";
    var QRY_TO_EXEC = `update vedic_students_master_data set d_in = '1' where id=? `;
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
    var QRY_TO_EXEC = `INSERT INTO engineer_works (district_id,district_name,trans_ref_id,temple_nm,amount_released,ps_charges,released_date,entry_by,dated) 
    values(?,?,?,?,?,?,?,?,?)`;
    const insertValues = [data.district_id, data.district_name, data.trans_ref_id, data.temple_nm, data.amount_released, data.ps_charges, data.released_date, data.entry_by, dated];
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
    var QRY_TO_EXEC = `update engineer_works set d_in = '1' where id=? `;
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
    const { temple_nm, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO online_temple_data (temple_nm) VALUES (?)`;

    let paramsData = [temple_nm, entry_by];

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
    const { temple_nm, updated_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE online_temple_data SET temple_nm = ?,updated_by=? WHERE id = ?`;

    let paramsData = [temple_nm, updated_by, rowId];

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
    const QRY_TO_EXEC = `UPDATE online_temple_data  SET d_in = 1,d_by=? WHERE id = ?`;

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