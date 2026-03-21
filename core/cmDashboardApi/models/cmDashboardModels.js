import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";

//cm apis start
export function getDdnsMonthlyDataReportMdl(data, callback) {
    var cntxtDtls = "in getDdnsMonthlyDataReportMdl";

    // var QRY_TO_EXEC = `SELECT as_on_date, ddns_target as target,ddns_achieved as achieved  FROM cm_api_data WHERE d_in=0;`;

    var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,t.temple_id,t.temple_name as temple_nm,COUNT(s.temple_nm) as no_of_archakas FROM ddns_master_data_org as s 
       join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id
       join temple_registration as t on t.temple_id=s.temple_nm
       where s.d_in=0 GROUP BY s.temple_nm ORDER BY t.temple_name asc;`;

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

    // var QRY_TO_EXEC = `SELECT  as_on_date,ddrf_target as target,ddrf_achieved as achieved FROM cm_api_data WHERE d_in=0;`;

    var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,t.temple_id,t.temple_name as temple_nm,COUNT(s.temple_nm) as no_of_archakas  FROM ddrf_master_data_org as s
        join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id
       join temple_registration as t on t.temple_id=s.temple_nm
       where s.d_in=0 GROUP BY s.temple_nm ORDER BY t.temple_name asc;`;

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

    // var QRY_TO_EXEC = `SELECT  as_on_date,auevcs_target as target,auevcs_achieved as achieved FROM cm_api_data WHERE d_in=0;`;

    var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,t.temple_id,t.temple_name as temple_nm,COUNT(s.temple_nm) as no_of_archakas  FROM vedic_students_master_data_org as s
       join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id
       join temple_registration as t on t.temple_id=s.temple_nm
       where s.d_in=0 GROUP BY s.temple_nm ORDER BY t.temple_name asc;`;

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

    var QRY_TO_EXEC = `SELECT as_on_date,engineer_works_amount as cgf_released FROM cm_api_data WHERE d_in=0;`;

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

    var QRY_TO_EXEC = `SELECT as_on_date, cgf_amount as total_amount FROM cm_api_data WHERE d_in=0;`;

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

    // var QRY_TO_EXEC = `SELECT as_on_date,online_target as target,online_achieved as achieved FROM cm_api_data WHERE d_in=0;`;

    var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,COUNT(s.id) as no_of_temples  FROM online_temple_data_org as s
       join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id       
       where s.d_in=0 GROUP BY s.district_id,s.mandal_id,s.village_id ORDER BY s.temple_name asc;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
//cm apis end

export function getArchakaReportMdl(reportType, callback) {
    var cntxtDtls = "in getArchakaReportMdl";
    if (reportType == 'DDNS') {
       var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,t.temple_id,t.temple_name as temple_nm, s.archaka_name,s.mobile_no,s.aadhaar_number,"10000" as amount FROM ddns_master_data_org as s 
       join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id
       join temple_registration as t on t.temple_id=s.temple_nm
       where s.d_in=0;`;
        } else if (reportType == 'DDRF') {
       var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,t.temple_id,t.temple_name as temple_nm, s.archaka_name,s.mobile_no,s.aadhaar_number,fund_amount as amount FROM ddrf_master_data_org as s
        join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id
       join temple_registration as t on t.temple_id=s.temple_nm
       where s.d_in=0;`;
        } else if (reportType == 'AUVS') {
        var QRY_TO_EXEC = `SELECT d.id as district_id,m.mandal_id,v.village_id,d.district_name,m.mandal_name,v.village_name,t.temple_id,t.temple_name as temple_nm, s.archaka_name,s.mobile_no,s.aadhaar_number,"3000" as amount FROM vedic_students_master_data_org as s
       join districts_data as d on d.id=s.district_id 
       join mandal_list as m on m.mandal_id=s.mandal_id
       join village_data as v on v.village_id=s.village_id
       join temple_registration as t on t.temple_id=s.temple_nm
        where s.d_in=0;`;
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
//
export function getDdnsMonthlyDataReportDashboardMdl(data, callback) {
    var cntxtDtls = "in getDdnsMonthlyDataReportDashboardMdl";

     var QRY_TO_EXEC = `SELECT as_on_date, ddns_target as target,ddns_achieved as achieved  FROM cm_api_data WHERE d_in=0;`;
    
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getDdrfMonthlyDataReportDashboardMdl(data, callback) {
    var cntxtDtls = "in getDdrfMonthlyDataReportDashboardMdl";

     var QRY_TO_EXEC = `SELECT  as_on_date,ddrf_target as target,ddrf_achieved as achieved FROM cm_api_data WHERE d_in=0;`;    

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getAuevcsMonthlyDataReportDashboardMdl(data, callback) {
    var cntxtDtls = "in getAuevcsMonthlyDataReportDashboardMdl";
    const IST = "Asia/Kolkata";

     var QRY_TO_EXEC = `SELECT  as_on_date,auevcs_target as target,auevcs_achieved as achieved FROM cm_api_data WHERE d_in=0;`;
    
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getOnlineServiceReportDashboardMdl(data, callback) {
    var cntxtDtls = "in getOnlineServiceReportDashboardMdl";

     var QRY_TO_EXEC = `SELECT as_on_date,online_target as target,online_achieved as achieved FROM cm_api_data WHERE d_in=0;`;   

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};