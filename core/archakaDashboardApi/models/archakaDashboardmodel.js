import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection, execQuery } from "../../../utils/utils.js";
import moment from "moment-timezone";
// import generatePDF from '../../../utils/pdf_gen/script.js'

// export function getUserprofileDataMdl(reqdata, callback) {
//     const { reqId } = reqdata;
//     let otp = reqdata.otpsending;
//     var cntxtDtls = "getUserprofileDataMdl";
//     var QRY_TO_EXEC = ` SELECT * FROM register_users_data WHERE reqId = ? AND d_in = 0;`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [reqId], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

export function getthecandidatesreportdataMdl(data, callback) {
  var cntxtDtls = "getthecandidatesreportdataMdl";

  var QRY_TO_EXEC = `SELECT 
    rg.id as regid,
    rg.phone_number,
    rg.aadhar_number,
    rg.full_name,
    rg.father_name,
    DATE_FORMAT(rg.date, '%d/%m/%Y') AS date_formatted,
    DATE_FORMAT(rg.dob, '%d/%m/%Y') AS dob_formatted,
    rg.age,
    rg.address,
    rg.education_details,
    rg.other_ducation_details,
    rg.previous_job_experience
FROM register_arachaka_data AS rg
WHERE rg.d_in = 0
ORDER BY rg.id DESC;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function gettheapplicationsreportdataMdl(data, callback) {
  var cntxtDtls = "gettheapplicationsreportdataMdl";

  let post = "";
  let position = "";
  let pay = "";

  if (data.post_id == 0) {
    post = ``;
  } else {
    post = `and apl.post_id=${data.post_id}`;
  }
  if (data.position_id == 0) {
    position = ``;
  } else {
    position = `and apl.position_id='${data.position_id}'`;
  }
  if (data.payment == 0) {
    pay = ``;
  } else {
    pay = `and apl.payment_status='${data.payment}'`;
  }

  //     var QRY_TO_EXEC = `SELECT
  //     jl.mela_id,
  //     jl.user_id,
  //     jl.update_pstatus,
  //     mp.payment_status,
  //     mp.payment_date ,
  //     mp.payment_id AS mppayment_id,
  //     mp.payment_ref_id AS mppayment_ref_id,
  //     app_counts.no_of_applications,
  //     d.district_name,
  //     mli.mela_date,
  //     mli.mela_name,
  //     rg.id,rg.are_you_shg,rg.user_name,rg.phone_number,rg.email,rg.slf_id,rg.slf_name,rg.shg_id,rg.shg_group_name,
  //     rg.shg_member_id,rg.shg_member_name,rg.shg_ph_no,rg.registration_status,rg.relation_with_shg,rg.father_or_husband_name,
  //     rg.date_of_birth,rg.gender,rg.aadhaar_number,rg.address,rg.highest_qualification,rg.year_of_passing,rg.university_or_board,
  //     rg.currently_employed,rg.work_experience
  // FROM (
  //     SELECT mela_id, user_id, COUNT(*) AS no_of_applications
  //     FROM arachaka_appliers
  //     WHERE d_in = 0
  //     GROUP BY mela_id, user_id
  // ) app_counts
  // JOIN arachaka_appliers jl ON jl.mela_id = app_counts.mela_id AND jl.user_id = app_counts.user_id
  // JOIN district_list d ON jl.district_id = d.district_id
  // JOIN mela_information mli ON mli.id = jl.mela_id
  // JOIN register_arachaka_data rg ON rg.id = jl.user_id

  // LEFT JOIN (
  //     SELECT
  //         user_id, mela_id, payment_status, payment_date, payment_id, payment_ref_id
  //     FROM (
  //         SELECT *,
  //                ROW_NUMBER() OVER (PARTITION BY user_id, mela_id ORDER BY payment_date DESC) AS rn
  //         FROM mela_user_payments
  //     ) sub
  //     WHERE rn = 1
  // ) mp ON jl.user_id = mp.user_id AND jl.mela_id = mp.mela_id

  // WHERE jl.d_in = 0 ${mela} ${pay}
  // GROUP BY
  //     jl.mela_id,
  //     jl.user_id
  // Order by jl.id DESC
  // ;`;

  var QRY_TO_EXEC = ` SELECT 
        apl.application_id,
        apl.amount,
        apl.payment_status,
        apl.post_id,
        apl.post_name,
        apl.position_id,
        apl.position_name,
        apl.order_id,
        DATE_FORMAT(apl.date, '%d/%m/%Y') AS applied_date_formatted,
         rg.id as regid,
        rg.image,
        rg.birth_certificate,
        rg.markmemos_certificate,
        rg.phone_number,
    rg.aadhar_number,
    rg.full_name,
    rg.father_name,
    DATE_FORMAT(rg.dob, '%d/%m/%Y') AS dob_formatted,
    rg.age,
    rg.address,
    rg.education_details,
    rg.other_ducation_details,
    rg.previous_job_experience
    FROM arachaka_appliers apl
    JOIN register_arachaka_data rg ON rg.id = apl.user_id
    WHERE apl.d_in = 0 and rg.d_in=0  ${post} ${position} ${pay} order by apl.id desc
    ;`;
  console.log(QRY_TO_EXEC);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function gettheuserapplicationsMdl(data, callback) {
  console.log(data);
  var cntxtDtls = "gettheuserapplicationsMdl";
  //     var QRY_TO_EXEC = ` SELECT
  //     jl.*
  // FROM job_applications jl
  // JOIN district_list d ON jl.district_id = d.district_id
  // JOIN mela_information mli ON mli.id = jl.mela_id
  // JOIN register_users_data rg ON rg.id = jl.user_id
  // WHERE jl.d_in = 0 and jl.mela_id=? and jl.user_id=?;
  // ;`;
  var QRY_TO_EXEC = `SELECT jl.*,jl.id as company_id FROM job_listings as jl WHERE mela_id=? AND d_in=0;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.mela], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getdashboardcandidatescountMdl(data, callback) {
  var cntxtDtls = "getdashboardcandidatescountMdl";

  const IST = "Asia/Kolkata";

  // Get IST-based date/time
  const currentDate = moment().tz(IST).format("YYYY-MM-DD");
  const yesterdayDate = moment().tz(IST).subtract(1, "day").format("YYYY-MM-DD");
  const currentWeek = moment().tz(IST).format("YYYY-WW");

  var QRY_TO_EXEC = `  SELECT  COUNT(*) AS total_count,
                         SUM(CASE WHEN DATE(date) = ? THEN 1 ELSE 0 END) AS today_count,
                         SUM(CASE WHEN DATE(date) = ? THEN 1 ELSE 0 END) AS yesterday_count,
                         SUM(CASE WHEN YEARWEEK(date, 1) = ? THEN 1 ELSE 0 END) AS this_week_count
                         FROM register_arachaka_data AS rg
                            WHERE d_in = 0
                        ;`;
  const params = [currentDate, yesterdayDate, currentWeek];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getdashboardapplicationscountMdl(data, callback) {
  console.log(data);
  var cntxtDtls = "getdashboardapplicationscountMdl";

  var QRY_TO_EXEC = `SELECT COALESCE(SUM(amount), 0) AS total_amount, 
    COALESCE(SUM(CASE WHEN DATE(date) = CURDATE() THEN amount END), 0) AS today_amount, 
    COALESCE(SUM(CASE WHEN DATE(date) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND DATE(date) < CURDATE() + INTERVAL 1 DAY THEN amount END), 0) AS last_7_days_amount, 
    COALESCE(SUM(CASE WHEN YEAR(date) = YEAR(CURDATE()) AND MONTH(date) = MONTH(CURDATE()) THEN amount END), 0) AS current_month_amount,
    COALESCE(COUNT(id), 0) AS total_count,
    COALESCE(SUM(CASE 
        WHEN DATE(date) = CURDATE()
        THEN 1 END), 0) AS today_records,

    COALESCE(SUM(CASE 
        WHEN DATE(date) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
         AND DATE(date) <  CURDATE() + INTERVAL 1 DAY
        THEN 1 END), 0) AS last_7_days_records,

    COALESCE(SUM(CASE 
        WHEN YEAR(date) = YEAR(CURDATE())
         AND MONTH(date) = MONTH(CURDATE())
        THEN 1 END), 0) AS current_month_records
    
    FROM arachaka_appliers WHERE d_in='0' and payment_status='Success';`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getReportImagesMdl(data, callback) {
  const cntxtDtls = "in getReportImagesMdl";
  // const QRY_TO_EXEC = `SELECT name,number,aadhar,image FROM register_arachaka_data where d_in=0 and id=?` ;
  const QRY_TO_EXEC = `SELECT full_name,phone_number,aadhar_number,image FROM register_arachaka_data where d_in=0 and id=?`;
  let paramsData = [data.id];
  console.log(QRY_TO_EXEC, 1158);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getPostsMastersMdl(data, callback) {
  const cntxtDtls = "in getPostsMastersMdl";
  const QRY_TO_EXEC = `SELECT * FROM posts where d_in=0 ;`;

  let paramsData = [data.id];
  console.log(QRY_TO_EXEC, 1158);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getPositionMastersMdl(data, callback) {
  const cntxtDtls = "in getPositionMastersMdl";
  const QRY_TO_EXEC = `SELECT * FROM positions_t where d_in=0 and post_id=? ;`;

  let paramsData = [data.post_id];
  console.log(QRY_TO_EXEC, 1158);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getcategorywiseApplicationsMdl(data, callback) {
  const cntxtDtls = "in getcategorywiseApplicationsMdl";
  const QRY_TO_EXEC = `SELECT post_name,count(id) as pcount FROM arachaka_appliers WHERE d_in='0' and payment_status='Success' GROUP by post_id ORDER by post_name asc;`;

  let paramsData = [];
  console.log(QRY_TO_EXEC, 1158);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function postwiseapplicationsCountsMdl(data, callback) {
  const cntxtDtls = "in postwiseapplicationsCountsMdl";
  const QRY_TO_EXEC = `SELECT position_id,post_name,position_name,count(id) as total_applicants FROM arachaka_appliers WHERE d_in='0' and payment_status='Success' GROUP by position_id ORDER by post_name asc;`;

  let paramsData = [];
  console.log(QRY_TO_EXEC, 1158);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function postwiseapplicationsidMdl(data, callback) {
  const cntxtDtls = "in postwiseapplicationsidMdl";
  const QRY_TO_EXEC = `SELECT 
        apl.application_id,
        apl.amount,
        apl.payment_status,
        apl.post_id,
        apl.post_name,
        apl.position_id,
        apl.position_name,
        apl.order_id,
        DATE_FORMAT(apl.date, '%d/%m/%Y') AS applied_date_formatted,
        rg.id as regid,
        rg.image,
        rg.birth_certificate,
        rg.markmemos_certificate,
        rg.phone_number,
    rg.aadhar_number,
    rg.full_name,
    rg.father_name,
    DATE_FORMAT(rg.dob, '%d/%m/%Y') AS dob_formatted,
    rg.age,
    rg.address,
    rg.education_details,
    rg.other_ducation_details,
    rg.previous_job_experience
    FROM arachaka_appliers apl
    JOIN register_arachaka_data rg ON rg.id = apl.user_id
    WHERE apl.d_in = 0 and apl.payment_status='Success' and position_id=?`;

  let paramsData = [data.position_id];
  console.log(QRY_TO_EXEC, 1158);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

//22-11-2025 Analysis Page

export function getthedashboardcandidatesreportMdl(data, callback) {
  var cntxtDtls = "getthedashboardcandidatesreportMdl";
  const currentISTDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const yesterdayISTDate = moment().tz("Asia/Kolkata").subtract(1, "days").format("YYYY-MM-DD");
  let ind = ``;

  //  Date filter logic based on ind
  if (data.ind == 1) {
    // Today’s records
    ind = `AND DATE(STR_TO_DATE(rg.date, '%Y-%m-%d')) = '${currentISTDate}'`;
  } else if (data.ind == 2) {
    // Yesterday’s records
    ind = `AND DATE(STR_TO_DATE(rg.date, '%Y-%m-%d')) = '${yesterdayISTDate}'`;
  } else if (data.ind == 0) {
    // Total (no date filter)
    ind = ``;
  }

  var QRY_TO_EXEC = ` SELECT 
    rg.id,
    rg.phone_number,
    rg.aadhar_number,
    rg.full_name,
    rg.father_name,
    DATE_FORMAT(rg.date, '%d/%m/%Y') AS date_formatted,
    DATE_FORMAT(rg.dob, '%d/%m/%Y') AS dob_formatted,
    rg.age,
    rg.address,
    rg.education_details,
    rg.other_ducation_details,
    rg.previous_job_experience
FROM register_arachaka_data AS rg
WHERE rg.d_in = 0
    ${ind}
   ORDER BY rg.id DESC; `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getthedashboardapplicationreportMdl(data, callback) {
  var cntxtDtls = "getthedashboardapplicationsreportMdl";
  const currentISTDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const yesterdayISTDate = moment().tz("Asia/Kolkata").subtract(1, "days").format("YYYY-MM-DD");

  let post = "";
  let position = "";
  let pay = "";
  let ind = "";

  if (data.post_id == 0) {
    post = ``;
  } else {
    post = `and apl.post_id=${data.post_id}`;
  }
  if (data.position_id == 0) {
    position = ``;
  } else {
    position = `and apl.position_id='${data.position_id}'`;
  }
  if (data.payment == 0) {
    pay = ``;
  } else {
    pay = `and apl.payment_status='${data.payment}'`;
  }

  if (data.ind == 1) {
    ind = `AND DATE(STR_TO_DATE(apl.date, '%Y-%m-%d')) = '${currentISTDate}'`;
  } else if (data.ind == 2) {
    ind = `AND DATE(STR_TO_DATE(apl.date, '%Y-%m-%d')) >= DATE_SUB('${currentISTDate}', INTERVAL 7 DAY)`;
  } else if (data.ind == 3) {
    ind = `AND DATE(STR_TO_DATE(apl.date, '%Y-%m-%d')) >= DATE_SUB('${currentISTDate}', INTERVAL 1 MONTH)`;
  } else {
    ind = ``;
  }

  //     var QRY_TO_EXEC = `SELECT
  //     jl.mela_id,
  //     jl.user_id,
  //     jl.update_pstatus,
  //     mp.payment_status,
  //     mp.payment_date ,
  //     mp.payment_id AS mppayment_id,
  //     mp.payment_ref_id AS mppayment_ref_id,
  //     app_counts.no_of_applications,
  //     d.district_name,
  //     mli.mela_date,
  //     mli.mela_name,
  //     rg.id,rg.are_you_shg,rg.user_name,rg.phone_number,rg.email,rg.slf_id,rg.slf_name,rg.shg_id,rg.shg_group_name,
  //     rg.shg_member_id,rg.shg_member_name,rg.shg_ph_no,rg.registration_status,rg.relation_with_shg,rg.father_or_husband_name,
  //     rg.date_of_birth,rg.gender,rg.aadhaar_number,rg.address,rg.highest_qualification,rg.year_of_passing,rg.university_or_board,
  //     rg.currently_employed,rg.work_experience
  // FROM (
  //     SELECT mela_id, user_id, COUNT(*) AS no_of_applications
  //     FROM arachaka_appliers
  //     WHERE d_in = 0
  //     GROUP BY mela_id, user_id
  // ) app_counts
  // JOIN arachaka_appliers jl ON jl.mela_id = app_counts.mela_id AND jl.user_id = app_counts.user_id
  // JOIN district_list d ON jl.district_id = d.district_id
  // JOIN mela_information mli ON mli.id = jl.mela_id
  // JOIN register_arachaka_data rg ON rg.id = jl.user_id

  // LEFT JOIN (
  //     SELECT
  //         user_id, mela_id, payment_status, payment_date, payment_id, payment_ref_id
  //     FROM (
  //         SELECT *,
  //                ROW_NUMBER() OVER (PARTITION BY user_id, mela_id ORDER BY payment_date DESC) AS rn
  //         FROM mela_user_payments
  //     ) sub
  //     WHERE rn = 1
  // ) mp ON jl.user_id = mp.user_id AND jl.mela_id = mp.mela_id

  // WHERE jl.d_in = 0 ${mela} ${pay}
  // GROUP BY
  //     jl.mela_id,
  //     jl.user_id
  // Order by jl.id DESC
  // ;`;

  var QRY_TO_EXEC = ` SELECT 
        apl.application_id,
        apl.amount,
        apl.payment_status,
        apl.post_id,
        apl.post_name,
        apl.position_id,
        apl.position_name,
        apl.order_id,
        DATE_FORMAT(apl.date, '%d/%m/%Y') AS applied_date_formatted,
        rg.id as regid,
        rg.image,
        rg.birth_certificate,
        rg.markmemos_certificate,
        rg.phone_number,
    rg.aadhar_number,
    rg.full_name,
    rg.father_name,
    DATE_FORMAT(rg.dob, '%d/%m/%Y') AS dob_formatted,
    rg.age,
    rg.address,
    rg.education_details,
    rg.other_ducation_details,
    rg.previous_job_experience
    FROM arachaka_appliers apl
    JOIN register_arachaka_data rg ON rg.id = apl.user_id
    WHERE apl.d_in = 0 and rg.d_in=0  and apl.payment_status='Success' ${post} ${position} ${pay} ${ind} order by apl.id desc 
    ;`;
  console.log(data.ind, QRY_TO_EXEC);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
