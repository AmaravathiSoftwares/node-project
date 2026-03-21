import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";

export function getastsevendayscrmdataMdl(data, callback) {
    var cntxtDtls = "in getastsevendayscrmdataMdl";
    var QRY_TO_EXEC = `SELECT DATE_FORMAT( dated,"%D-%M") as country,COUNT(*) as visits from registration_dtl_t GROUP BY date(dated) order by date(dated) desc limit 7`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getcrmweekdaysgraphMdl(callback) {
    var cntxtDtls = "in getcrmweekdaysgraphMdl";
    var QRY_TO_EXEC = `SELECT count(*) as MAU,DAYNAME(dated)  as network, DAYOFWEEK(dated) FROM registration_dtl_t WHERE DAYNAME(dated) is not null group by DAYNAME(dated) ORDER by DAYOFWEEK(i_ts)`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function empDashboardCountsMdl(callback) {
    var cntxtDtls = "in empDashboardCountsMdl";
    var date = moment().utcOffset("+05:30").format('YYYY-MM-DD');
    var QRY_TO_EXEC = `SELECT(select count(id) from users where d_in='0' and role_type!='0'and role_type!='3') as tot_emp,
	(select count(id) from attendance_report where d_in='0' and date='${date}') as prasent_emp,
	(select count(id) from attendance_report where d_in = '0' and date='${date}' and late_min!='0') as late_emp;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function empDashboardTopFourMdl(callback) {
    var cntxtDtls = "in empDashboardTopFourMdl";
    var date = moment().utcOffset("+05:30").format('YYYY-MM-DD');
    var QRY_TO_EXEC = `Select user_name,SEC_TO_TIME(SUM(TIME_TO_SEC(late_min))) as late_min_tot from attendance_report where d_in=0  and date='${date}' and late_min!='0' GROUP by user_id order by late_min_tot DESC limit 8;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getcarwisepaymentformMdl(callback) {
    var cvrclrViewDtls = "in getcarwisepaymentformMdl";
    var QRY_TO_EXEC = `SELECT count(*) as visits,user_name as Type_of_payment FROM attendance_report  where date = CURRENT_DATE() group by Type_of_payment ORDER by visits DESC;`;
    if (callback && typeof callback == "function")
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cvrclrViewDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cvrclrViewDtls);
};

export function getalldatawiseformMdl(callback) {
    var cntxtDtls = "in getalldatawiseformMdl";
    var QRY_TO_EXEC = `seLECT count(*) as MAU,DAYNAME(dated)  as network, DAYOFWEEK(dated) FROM amvt_t_issuse_lst
	WHERE DAYNAME(dated) is not null group by DAYNAME(dated) ORDER by DAYOFWEEK(dated);`;
    if (callback && typeof callback == "function")
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
export function gettotalcountsdataMdl(mind, callback) {
    var cntxtDtls = "in gettotalcountsdataMdl";
    var date = moment().utcOffset("+05:30").format('YYYY-MM-DD');
    if (mind == 1) {
        var QRY_TO_EXEC = `SELECT * from users where d_in=0 and role_type!='0' and role_type!='3' order by id desc`;
    } else if (mind == 2) {
        var QRY_TO_EXEC = `SELECT *,late_min as mint FROM attendance_report WHERE date = '${date}' and d_in=0 order by mint desc`;
    } else if (mind == 3) {
        var QRY_TO_EXEC = `SELECT *,late_min as mint FROM attendance_report WHERE date = '${date}' AND late_min NOT LIKE '0' and d_in=0 order by mint desc`;
    } else if (mind == 4) {
        var QRY_TO_EXEC = `SELECT * from users where d_in=0 and role_type!='0'and role_type!='3' and id not in (select user_id from attendance_report where d_in=0 and date = '${date}'and d_in=0) order by id desc;`;
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
export function getweblogsdataMdl(callback) {
    var cntxtDtls = "in getweblogsdataMdl";
    var QRY_TO_EXEC = `SELECT DATE_FORMAT( i_ts,"%D-%M") as categories,COUNT(*) as visits,subtitle as name from user_logs GROUP BY date(i_ts),subtitle order by date(i_ts) desc limit 7`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getlastsevendaysbookingllistMdl(callback) {
    var cvrclrViewDtls = "in getlastsevendaysbookingllistMdl";
    var QRY_TO_EXEC = `SELECT DATE_FORMAT(project_date,"%d-%m-%Y") as date,COUNT(*) bookingcount FROM amvt_t_project_lst WHERE d_in=0 AND DATE(project_date) >= (NOW() - INTERVAL 7 DAY) GROUP BY date ORDER BY date DESC;`;
    if (callback && typeof callback == "function")
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cvrclrViewDtls, function (err, results) {
            callback(err, results);
            return;
        });
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cvrclrViewDtls);
};


export function changeComersMdl(ind, callback) {
    var cntxtDtls = "in changeComersMdl";
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD");
    if (ind == '1') {
        var QRY_TO_EXEC = `Select user_name,SEC_TO_TIME(SUM(TIME_TO_SEC(late_min))) as late_min_tot from attendance_report where d_in=0  and date>='2024-09-01' and date<='2024-09-30' and late_min!='0' GROUP by user_id order by late_min_tot DESC limit 8;`;
    } else {
        var QRY_TO_EXEC = `Select user_name,SEC_TO_TIME(SUM(TIME_TO_SEC(late_min))) as late_min_tot from attendance_report where d_in=0  and date='${date}' and late_min!='0' GROUP by user_id order by late_min_tot DESC limit 8;`;
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


export function getToptenissusesMdl(callback) {
    var cntxtDtls = "in getToptenissusesMdl";
    var QRY_TO_EXEC = `SELECT p.project_nm,count(i.id) as cnt from amvt_t_issuse_lst as i join amvt_t_project_lst as p on p.id=i.project_id WHERE i.type='0' and i.d_in='0' and i.status='0' GROUP by project_id ORDER by cnt desc LIMIT 10;SELECT usr_nm,count(i.id) as cnt from amvt_t_issuse_lst as i join amvt_t_users_lst as p on p.id=i.developer_id WHERE i.type='1' and i.d_in='0' and i.status='0' GROUP by developer_id ORDER by cnt desc LIMIT 10;SELECT '3' as no_of_module,p.project_nm,q.p_id,count(q.id) as total,(CASE WHEN (q.status='0') THEN count(q.id) else 0 End) as NA,(CASE WHEN (q.status='1') THEN count(q.id) else 0 End) as YES,
	(CASE WHEN (q.status='2') THEN count(q.id) else 0 End) as NO
	FROM qualitycheckdata as q  JOIN amvt_t_project_lst as p on p.id = q.p_id WHERE q.d_in='0'  GROUP by q.p_id;`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function toatlcntsordersMdl(callback) {
    var cntxtDtls = "in toatlcntsordersMdl";
    var QRY_TO_EXEC = `SELECT(select count(*) from amvt_t_project_lst WHERE d_in = 0 and changedvalue != 3) as total_leads,
	(select COUNT( IF(changedvalue = 2, 1, null)) from amvt_t_project_lst WHERE d_in = 0 and changedvalue != 3) as interest_leads,
	  (select count(*) from amvt_t_project_lst where project_date=CURRENT_DATE() and d_in = 0 and changedvalue != 3) as today_leads,
	  (SELECT COUNT(*) FROM amvt_t_project_lst WHERE d_in = 0 and changedvalue != 3 AND DATE(project_date) >= (NOW() - INTERVAL 7 DAY)  ORDER BY project_date DESC) as seven_leads,
		(SELECT COUNT(*) FROM amvt_t_project_lst WHERE d_in=0 and changedvalue != 3 AND DATE(project_date) >= (NOW() - INTERVAL 30 DAY) ORDER BY project_date DESC) as thirty_leads;`;


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
