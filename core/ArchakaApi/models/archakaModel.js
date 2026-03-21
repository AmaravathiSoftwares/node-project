import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


export function getAllDataMdl(data, callback) {
    var cntxtDtls = "in getAllDataMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `SELECT (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND payment_status='S') AS main_total,
	 (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0') AS tot_applications,
    (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND exam_type='1' AND payment_status='S') AS a,
    (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND exam_type='2' AND payment_status='S') AS b,
    (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND exam_type='3' AND payment_status='S') AS c,
    (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND save_id = 1 AND payment_status='F') AS saved,
    (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND save_id = 2 AND payment_status='F') AS failure,
    (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in='0' AND payment_status='S'AND DATE(date) = CURDATE()) AS today;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function getTableFilterDataMdl(data, callback) {
    console.log(data.id);
    
    var cntxtDtls = "in getTableFilterDataMdl";

    if(data.id==5){

        var QRY_TO_EXEC = `SELECT * FROM arachaka_appliers WHERE d_in=0`

    }else if(data.id==6){
         var QRY_TO_EXEC = `SELECT * FROM arachaka_appliers WHERE d_in='0' AND payment_status='S' `
    }else if(data.id==7){
         var QRY_TO_EXEC = `SELECT * FROM arachaka_appliers WHERE d_in=0 AND save_id = 2 AND payment_status='F' `
    }else if(data.id==8){
         var QRY_TO_EXEC = `select * from arachaka_appliers where d_in='0' and save_id = 1 AND payment_status='F' `
    }else if(data.id==1){
         var QRY_TO_EXEC = `SELECT * FROM arachaka_appliers WHERE d_in='0' AND payment_status='S' `
    }
    else if(data.id==2){
         var QRY_TO_EXEC = `select * from arachaka_appliers where d_in='0' and exam_type='1'  and payment_status='S' `
    }
    else if(data.id==3){
         var QRY_TO_EXEC = `select * from arachaka_appliers where d_in='0' and exam_type='2'  and payment_status='S'`
    }
    else if(data.id==4){
         var QRY_TO_EXEC = `select * from arachaka_appliers where d_in='0' and exam_type='3'  and payment_status='S' `
    }
    else if(data.id==9){
         var QRY_TO_EXEC = `SELECT * FROM arachaka_appliers WHERE d_in='0' AND payment_status='S'AND DATE(date) = CURDATE()`
    }

  
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getTableDataMdl(data, callback) {
    var cntxtDtls = "in getTableDataMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `Select * FROM arachaka_appliers WHERE d_in=0 `
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

// Analysis Models
export function getweekdatawiseMdl(data, callback) {
    var cntxtDtls = "in getweekdatawiseMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `SELECT COUNT(*) as tcnt,DATE_FORMAT(date,"%d-%m-%Y") as currentdate FROM arachaka_appliers where  d_in=0  AND payment_status='S' GROUP BY date(date) order by date desc limit 7; `
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function getusersanalysisDataMdl(data, callback) {
    var cntxtDtls = "in getusersanalysisDataMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `select(select count(id) from arachaka_appliers where d_in='0'AND payment_status='S' ) as tot_payments, 
	(select count(id) from arachaka_appliers where d_in='0' and exam_type='1' AND payment_status='S') as p,
	(select count(id) from arachaka_appliers where d_in='0' and exam_type='2' AND payment_status='S') as v,
    (select count(id) from arachaka_appliers where d_in='0' and exam_type='3' AND payment_status='S') as pv`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function getexamanalysisMdl(data, callback) {
    var cntxtDtls = "in getexamanalysisMdl";
 
    var QRY_TO_EXEC = `Select(select count(id) from arachaka_appliers where d_in='0' AND payment_status='S' ) as tot_examination, 
	(select count(id) from arachaka_appliers where d_in='0' and exam_regular='1' AND payment_status='S') as regular,
	(select count(id) from arachaka_appliers where d_in='0' and exam_regular='2' AND payment_status='S') as supply;
	SELECT (SELECT COUNT(id) FROM arachaka_appliers WHERE d_in = '0' AND payment_status='S') AS tot_examination,
	(SELECT COUNT(id) FROM arachaka_appliers WHERE d_in = '0' AND exam_regular = '1' AND age < 40 AND payment_status='S') AS regular_below_40,
	(SELECT COUNT(id) FROM arachaka_appliers WHERE d_in = '0' AND exam_regular = '1' AND age >= 40 AND payment_status='S') AS regular_above_40,
	(SELECT COUNT(id) FROM arachaka_appliers WHERE d_in = '0' AND exam_regular = '2' AND age < 40 AND payment_status='S') AS supply_below_40, 
	(SELECT COUNT(id) FROM arachaka_appliers WHERE d_in = '0' AND exam_regular = '2' AND age >= 40 AND payment_status='S') AS supply_above_40;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getagewiseanalysisMdl(data, callback) {
    var cntxtDtls = "in getagewiseanalysisMdl";
 
    var QRY_TO_EXEC = `SELECT COUNT(*) AS count,'0-18' AS age_group FROM arachaka_appliers WHERE age BETWEEN 0 AND 18  AND payment_status='S'UNION ALL
SELECT COUNT(*) AS count,'18-25' AS age_group FROM arachaka_appliers WHERE age BETWEEN 18 AND 25 AND payment_status='S' UNION ALL
SELECT COUNT(*) AS count,'25-35' AS age_group FROM arachaka_appliers WHERE age BETWEEN 25 AND 35 AND payment_status='S' UNION ALL
SELECT COUNT(*) AS count,'35-45' AS age_group FROM arachaka_appliers WHERE age BETWEEN 35 AND 45 AND payment_status='S' UNION ALL
SELECT COUNT(*) AS count,'45-55' AS age_group FROM arachaka_appliers WHERE age BETWEEN 45 AND 55`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getdisitwiseFuntionMdl(data, callback) {
    var cntxtDtls = "in getdisitwiseFuntionMdl";
 
    var QRY_TO_EXEC = `SELECT district_name, COUNT(*) AS application_count FROM arachaka_appliers where payment_status='S'  GROUP BY district_name ORDER BY application_count DESC;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getcentdisitwiseFuntionMdl(data, callback) {
    var cntxtDtls = "in getcentdisitwiseFuntionMdl";
 
    var QRY_TO_EXEC = `SELECT centre_district_name, COUNT(*) AS application_count FROM arachaka_appliers where payment_status='S' GROUP BY centre_district_id ORDER BY application_count DESC;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getlanguagessMdl(data, callback) {
    var cntxtDtls = "in getcentdisitwiseFuntionMdl";

	if (data.id == 0){
	   var ifd = '';
	}else{
	   var ifd = " and exam_type = " + `'`+ data.id + `'`  ;
	}
	
	var QRY_TO_EXEC = `SELECT count(*) as visits, agamamu as agamamu FROM arachaka_appliers  where d_in=0  ${ifd}  group by agamamu ORDER by visits DESC;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};



export function accountwiseanalysisMdl(data, callback) {
    var cntxtDtls = "in accountwiseanalysisMdl";
    const IST = "Asia/Kolkata";
    // var dated = moment().tz(IST).format("YYYY-MM-DD");
    var dated = "2025-06-01";
    // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and 
    var QRY_TO_EXEC = `SELECT
    (SELECT IFNULL(SUM(amount), 0) FROM arachaka_appliers WHERE d_in='0' AND payment_status='S'  ) AS total_amount,
    (SELECT IFNULL(SUM(amount), 0) FROM arachaka_appliers WHERE DATE(date) = CURRENT_DATE() AND d_in='0' AND payment_status='S' ) AS today_amount,
    (SELECT IFNULL(SUM(amount), 0) FROM arachaka_appliers WHERE d_in='0' AND payment_status='S'   AND DATE(date) >= (CURDATE() - INTERVAL 7 DAY)) AS seven_amount,
    (SELECT IFNULL(SUM(amount), 0) FROM arachaka_appliers WHERE d_in='0' AND payment_status='S'  AND DATE(date) >= (CURDATE() - INTERVAL 30 DAY)) AS thirty_amount;`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};