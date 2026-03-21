import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


export function getLandsInfoDistrictWiseReportMdl(data, callback) {
    var cntxtDtls = "in getLandsInfoDistrictWiseReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `SELECT * FROM land_report;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getLandDetailsDistrictWiseReportMdl(data, callback) {
    var cntxtDtls = "in getLandDetailsDistrictWiseReportMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `SELECT * FROM lands_reconciliation_abs;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};