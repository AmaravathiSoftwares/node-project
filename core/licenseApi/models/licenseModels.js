import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


export function submitLicenseDetailsMdl(data, callback) {
    const IST = "Asia/Kolkata";
    console.log(114, data);
    var LDS = moment(data.lastDateOfListing).tz(IST).format("YYYY-MM-DD");
    var cntxtDtls = "in submitLicenseDetailsMdl";
    var QRY_TO_EXEC = `insert into license set ?`;
    var values = {

        district_name: data.district_id,
        mandal_name: data.mandal_id,
        village_name: data.village_id,
        temple_name: data.temple_nm,
        tcode: data.tcode,
        license_name: data.license_name,
        holder_name: data.holder_name,
        amountper_year: data.amountper_year,
        licenseorder_num: data.licenseorder_num,
        licensefrom_date: data.licensefrom_date,
        licenseto_date: data.licenseto_date,
        license_approved_by: data.license_approved_by,
        entry_by: data.entry_by,
    };
    console.log(values);
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            values,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function getLicensedataMdl(limit, offset, data, user, callback) {
    console.log(data, user, 745);
    const cntxtDtls = "in getLicensedataMdl";

    let whereCondition = ``;

    // 🧠 Now even role_type = 1 sees only their entries
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
        whereCondition = ` AND l.district_name IN (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',')
                ? user.temple_id.split(',').map(w => `'${w.trim()}'`)
                : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` AND l.temple_name IN (${inClause})`;
    } else {
       whereCondition = ``;
    }

    // let dataQuery = `SELECT * FROM license WHERE d_in = 0 ${whereCondition}`;
    // let countQuery = `SELECT COUNT(*) AS totalCount FROM license WHERE d_in = 0 ${whereCondition}`;

    let dataQuery = `
    SELECT 
        l.*, 
        d.id AS district_id, 
        d.district_name, 
        m.mandal_id, 
        m.mandal_name, 
        v.village_id, 
        v.village_name,
        l.temple_name,              
        t.temple_id AS temple_nm, 
        t.temple_name             
    FROM license AS l
    LEFT JOIN districts_data AS d ON l.district_name = d.id
    LEFT JOIN mandal_list AS m ON l.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON l.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON l.temple_name = t.temple_id 
    WHERE l.d_in = 0 ${whereCondition} ORDER BY l.id DESC
`;

let countQuery = `
    SELECT COUNT(l.id) AS totalCount
    FROM license AS l
    LEFT JOIN districts_data AS d ON l.district_name = d.id
    LEFT JOIN mandal_list AS m ON l.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON l.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON l.temple_name = t.temple_id
    WHERE l.d_in = 0 ${whereCondition}
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


export function updateLicenseDetailsMdl(data, callback) {
    console.log(data, 1029);
    var cntxtDtls = "in updateLicenseDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");

    var QRY_TO_EXEC = `UPDATE license 
        SET district_name = ?, mandal_name = ?, village_name = ?, temple_name = ?, 
            tcode = ?, license_name = ?, holder_name = ?, amountper_year = ?, 
            licenseorder_num = ?, licensefrom_date = ?, licenseto_date = ?, 
            license_approved_by = ?, updated_by = ?, updated_date = ?  
        WHERE id = ?`;

    let paramsData = [
        data.district_id, data.mandal_id, data.village_id, data.temple_nm,
        data.tcode, data.license_name, data.holder_name, data.amountper_year,
        data.licenseorder_num, data.licensefrom_date, data.licenseto_date,
        data.license_approved_by, data.updated_by, dated, data.rowId
    ];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
    }
}

export function deleteshopsandbuildingsDetailsMdl(data, callback) {
    var cntxtDtls = "in deleteshopsandbuildingsDetailsMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `update  license set d_in = '1',d_by=?,d_date=? where id=? `;
    let paramsData = [data.d_by,dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

