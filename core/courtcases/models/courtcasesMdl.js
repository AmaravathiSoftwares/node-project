import { log } from "console";
import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection } from "../../../utils/utils.js";
import moment from "moment-timezone";

export function getCasesDataMdl(data, callback) {
  var cntxtDtls = "in getCasesDataMdl";

  // var QRY_TO_EXEC = `select a.*,b.case_type,d.district_name,m.mandal_name,v.village_name,sc.category_type,cf.counter_to_be_filed,t.temple_name,GROUP_CONCAT(distinct s.section_id) as sections, GROUP_CONCAT(distinct o.officer_id) as officers from court_cases as a join case_type as b on a.casetype=b.id join districts_data as d on a.district_id=d.id join mandal_list as m on a.mandal_id=m.mandal_id join village_data as v on a.village_id=v.village_id join subject_category as sc on a.categories=sc.id join counter_to_be_filed as cf on a.counter_to_be_filed=cf.id join temple_registration as t on a.temple_id=t.temple_id join case_related_sections as s on s.case_id=a.id join case_countered_officers as o on o.case_id=a.id where a.d_in=0 GROUP BY a.id`;

  if (data.id == 1) {
    // NEW
    var QRY_TO_EXEC = `SELECT 
  a.*, 
  a.id AS case_id,
  CONVERT_TZ(a.last_date_of_listing, '+00:00', '+05:30') as last_date_of_listing,
  (SELECT b.case_type FROM case_type AS b WHERE a.casetype = b.id LIMIT 1) AS case_type,
  (SELECT d.district_name FROM districts_data AS d WHERE a.district_id = d.id LIMIT 1) AS district_name,
  (SELECT m.mandal_name FROM mandal_list AS m WHERE a.mandal_id = m.mandal_id LIMIT 1) AS mandal_name,
  (SELECT v.village_name FROM village_data AS v WHERE a.village_id = v.village_id LIMIT 1) AS village_name,
  (SELECT sc.category_type FROM subject_category AS sc WHERE a.categories = sc.id LIMIT 1) AS category_type,
  (SELECT cf.id FROM counter_to_be_filed AS cf WHERE a.counter_to_be_filed = cf.id LIMIT 1) AS counter_to_be_filed_id,
  (SELECT u.user_name FROM users_data AS u WHERE a.entry_by = u.id LIMIT 1) AS user_name,
  (SELECT GROUP_CONCAT(DISTINCT s.section_id) FROM case_related_sections AS s WHERE s.case_id = a.id) AS sections,
  (SELECT GROUP_CONCAT(DISTINCT s.officer_id) FROM case_countered_respondents AS s WHERE s.case_id = a.id) AS respondents,
  (
    SELECT CONCAT(
      '[', 
      GROUP_CONCAT(
        DISTINCT CONCAT( '{"officer_id":', o.officer_id, ',"status":"', o.counter_status, '"', ',"officer_name":"', ot.officer_nm, '"', ',"date":"', o.counter_date, '"}' )
      ), 
      ']'
    )
    FROM case_countered_officers AS o
    JOIN officers_tbl AS ot ON ot.id = o.officer_id
    WHERE o.case_id = a.id
  ) AS officers
FROM court_cases AS a
WHERE a.d_in = 0 ORDER BY a.id DESC;
`;
  } else if (data.id == 2) {
    var QRY_TO_EXEC = `
     
     SELECT 
  a.*,
  a.id AS case_id,
  CONVERT_TZ(a.last_date_of_listing, '+00:00', '+05:30') AS last_date_of_listing,
  (SELECT b.case_type FROM case_type AS b WHERE a.casetype = b.id LIMIT 1) AS case_type,
  (SELECT d.district_name FROM districts_data AS d WHERE a.district_id = d.id LIMIT 1) AS district_name,
  (SELECT m.mandal_name FROM mandal_list AS m WHERE a.mandal_id = m.mandal_id LIMIT 1) AS mandal_name,
  (SELECT v.village_name FROM village_data AS v WHERE a.village_id = v.village_id LIMIT 1) AS village_name,
  (SELECT sc.category_type FROM subject_category AS sc WHERE a.categories = sc.id LIMIT 1) AS category_type,
  (SELECT cf.id FROM counter_to_be_filed AS cf WHERE a.counter_to_be_filed = cf.id LIMIT 1) AS counter_to_be_filed_id,
  (SELECT t.temple_name FROM temple_registration AS t WHERE a.temple_id = t.temple_id LIMIT 1) AS temple_name,
   (SELECT u.user_name FROM users_data AS u WHERE a.entry_by = u.id LIMIT 1) AS user_name,
  (SELECT GROUP_CONCAT(DISTINCT s.section_id) FROM case_related_sections AS s WHERE s.case_id = a.id) AS sections,
  (SELECT GROUP_CONCAT(DISTINCT s.officer_id) FROM case_countered_respondents AS s WHERE s.case_id = a.id) AS respondents,
  (
    SELECT CONCAT(
      '[',
      GROUP_CONCAT(
        DISTINCT CONCAT('{"officer_id":', o.officer_id,
                        ',"status":"', o.counter_status, '"',
                        ',"officer_name":"', ot.officer_nm, '"',
                        ',"date":"', o.counter_date, '"}')
      ),
      ']'
    )
    FROM case_countered_officers AS o
    JOIN officers_tbl AS ot ON ot.id = o.officer_id
    WHERE o.case_id = a.id
  ) AS officers,
  CASE WHEN a.court_case_status = 1 THEN 'Disposed' ELSE 'Pending' END AS case_status_name
FROM court_cases AS a
WHERE a.d_in = 0
  AND IFNULL(a.court_case_status, 0) = 0 ORDER BY a.id DESC;
     `;
  } else if (data.id == 3) {
    var QRY_TO_EXEC = `
SELECT 
  a.*,
  a.id AS case_id,
  CONVERT_TZ(a.last_date_of_listing, '+00:00', '+05:30') AS last_date_of_listing,
  (SELECT b.case_type FROM case_type AS b WHERE a.casetype = b.id LIMIT 1) AS case_type,
  (SELECT d.district_name FROM districts_data AS d WHERE a.district_id = d.id LIMIT 1) AS district_name,
  (SELECT m.mandal_name FROM mandal_list AS m WHERE a.mandal_id = m.mandal_id LIMIT 1) AS mandal_name,
  (SELECT v.village_name FROM village_data AS v WHERE a.village_id = v.village_id LIMIT 1) AS village_name,
  (SELECT sc.category_type FROM subject_category AS sc WHERE a.categories = sc.id LIMIT 1) AS category_type,
  (SELECT cf.id FROM counter_to_be_filed AS cf WHERE a.counter_to_be_filed = cf.id LIMIT 1) AS counter_to_be_filed_id,
  (SELECT t.temple_name FROM temple_registration AS t WHERE a.temple_id = t.temple_id LIMIT 1) AS temple_name,
  (SELECT u.user_name FROM users_data AS u WHERE a.entry_by = u.id LIMIT 1) AS user_name,
  (SELECT GROUP_CONCAT(DISTINCT s.section_id) FROM case_related_sections AS s WHERE s.case_id = a.id) AS sections,
  (SELECT GROUP_CONCAT(DISTINCT s.officer_id) FROM case_countered_respondents AS s WHERE s.case_id = a.id) AS respondents,
  (
    SELECT CONCAT(
      '[',
      GROUP_CONCAT(
        DISTINCT CONCAT('{"officer_id":', o.officer_id,
                        ',"status":"', o.counter_status, '"',
                        ',"officer_name":"', ot.officer_nm, '"',
                        ',"date":"', o.counter_date, '"}')
      ),
      ']'
    )
    FROM case_countered_officers AS o
    JOIN officers_tbl AS ot ON ot.id = o.officer_id
    WHERE o.case_id = a.id
  ) AS officers,
  CASE WHEN a.court_case_status = 1 THEN 'Disposed' ELSE 'Pending' END AS case_status_name
FROM court_cases AS a
WHERE a.d_in = 0
  AND a.court_case_status = 1 ORDER BY a.id DESC;



`;
  }

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function submitCourtCaseMdl(data, callback) {
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var LDS = moment(data.lastDateOfListing).tz(IST).format("YYYY-MM-DD");
  var cntxtDtls = "in submitCourtCaseMdl";
  var QRY_TO_EXEC = `insert into court_cases set ?`;
  var values = {
    district_id: data.district_id,
    mandal_id: data.mandal_id,
    village_id: data.village_id === "" ? null : data.village_id,
    temple_name: data.temple_nm,
    casetype: data.case_type,
    case_no: data.case_no,
    year: data.year,

    last_date_of_listing: data.lastDateOfListing ? LDS : null,
    categories: data.categories,
    sub_services: data.subService,
    counter_to_be_filed: data.counterToBeFiled,
    counter_filed_or_not: data.counterFiledOrNot,

    vakhalath_filed_or_not: data.vakalathFiled,
    vakhalath_remarks: data.vakalathRemarks,
    prayer: data.prayerInBrief,
    name_of_the_petitioner: data.petitionerName,
    gist_of_relief: data.reliefGrant,
    subject: data.subject,
    disposed_date: data.disposedDate,
    cc_prayer: data.ccPrayer,
    remarks: data.remarks,
    court_case_status: data.courtCaseStatus,
    answering_respondences: data.answeringRespondent,
    entry_by: data.entry_by,
    entry_date: dated,
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

export function SubmitSectionstoCase(data, callback) {
  var cntxtDtls = "in SubmitSectionstoCase";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `INSERT into case_related_sections(case_id,section_id,entry_by,entry_date) VALUES ?`;
  console.log(data, "Sections data");
  const values = data.sections.map((each) => [
    data.case_id,
    each,
    data.entry_by,
    dated,
  ]);
  console.log(values, "sections Data");
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [values],
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

export function SubmitOfficerstoCase(data, callback) {
  if (data.officers.length > 0) {
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var cntxtDtls = "in SubmitOfficerstoCase";
    var QRY_TO_EXEC = `INSERT into case_countered_officers(case_id,officer_id,counter_date,counter_status,entry_by,entry_date) VALUES ?`;

    const values = data.officers.map((officer) => [
      data.case_id,
      officer.officer_id,
      officer.date,
      officer.status,
      data.entry_by,
      dated,
    ]);
    console.log(values);
    if (callback && typeof callback == "function") {
      sqlinjection(
        MySQLConPool,
        QRY_TO_EXEC,
        [values],
        cntxtDtls,
        function (err, results) {
          callback(err, results);
          return;
        }
      );
    } else {
      return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
  } else {
    callback(false, []);
  }
}

export function getcaseTypeMdl(data, callback) {
  var cntxtDtls = "in getcaseTypeMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `select * from case_type where d_in=0`;
  console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function updateCaseDetailsMdl(data, callback) {
  var cntxtDtls = "in updateCaseDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `update court_cases set district_id=?, mandal_id =?, temple_name=?, village_id=?, caseType=?, case_no=?, year=?, last_date_of_listing=?, categories=?, sub_services=?,
  counter_to_be_filed=?, counter_filed_or_not=?, vakhalath_filed_or_not=?, vakhalath_remarks=?, prayer=?, name_of_the_petitioner=?,  gist_of_relief=?, subject=?, disposed_date=?, cc_prayer=?, remarks=?, court_case_status=?, answering_respondences=?, entry_by=?, entry_date=? where id=?`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [
        data.caseDetails.district_id,
        data.caseDetails.mandal_id,
        data.caseDetails.temple_nm,
        data.caseDetails.village_id,
        data.caseDetails.case_type,
        data.caseDetails.case_no,
        data.caseDetails.year,
        data.caseDetails.lastDateOfListing,
        data.caseDetails.categories,
        data.caseDetails.subServices,
        data.caseDetails.counterToBeFiled,
        data.caseDetails.counterFiledOrNot,
        data.caseDetails.vakalathFiled,
        data.caseDetails.vakalathRemarks,
        data.caseDetails.prayerInBrief,
        data.caseDetails.petitionerName,
        data.caseDetails.reliefGrant,
        data.caseDetails.subject,
        data.caseDetails.disposedDate,
        data.caseDetails.ccPrayer,
        data.caseDetails.remarks,
        data.caseDetails.courtCaseStatus,
        data.caseDetails.answeringRespondent,
        data.entry_by,
        dated,
        data.case_id,
      ],
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

export function updateSectionsMdl(data, callback) {
  var cntxtDtls = "in updateSectionsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");

  const case_id = data.case_id;
  const sections = data.sections;
  const entry_by = data.entry_by;

  if (!sections || sections.length === 0) {
    return callback(null, { message: "No sections to update" });
  }

  const DELETE_QUERY = `DELETE FROM case_related_sections WHERE case_id = ?`;
  const INSERT_QUERY = `INSERT INTO case_related_sections (case_id, section_id, entry_by, entry_date) VALUES ?`;

  sqlinjection(
    MySQLConPool,
    DELETE_QUERY,
    [case_id],
    cntxtDtls,
    function (err) {
      if (err) {
        return callback(err);
      }

      const values = sections.map((section_id) => [
        case_id,
        section_id,
        entry_by,
        dated,
      ]);

      sqlinjection(
        MySQLConPool,
        INSERT_QUERY,
        [values],
        cntxtDtls,
        function (err2, res2) {
          if (err2) {
            return callback(err2);
          }
          callback(null, { message: "Sections updated successfully" });
        }
      );
    }
  );
}

export function updateOfficerMdl(data, callback) {
  var cntxtDtls = "in updateOfficerMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  console.log(data);

  const case_id = data.case_id;
  const officers = data.officers;
  const entry_by = data.entry_by;

  console.log(officers, 98);

  if (!officers || officers.length === 0) {
    return callback(null, { message: "No officers to update" });
  }

  const DELETE_QUERY = `DELETE FROM case_countered_officers WHERE case_id = ?`;
  const INSERT_QUERY = `INSERT INTO case_countered_officers 
    (case_id, officer_id, counter_date, counter_status, entry_by, entry_date) VALUES ?`;

  sqlinjection(
    MySQLConPool,
    DELETE_QUERY,
    [case_id],
    cntxtDtls,
    function (err) {
      if (err) {
        return callback(err);
      }

      const values = officers.map(({ officer_id, date, status }) => [
        case_id,
        officer_id,
        date,
        status,
        entry_by,
        dated,
      ]);

      sqlinjection(
        MySQLConPool,
        INSERT_QUERY,
        [values],
        cntxtDtls,
        function (err2, res2) {
          if (err2) {
            return callback(err2);
          }
          callback(null, { message: "Officers updated successfully" });
        }
      );
    }
  );
}

// export function deleteCaseMdl(data, callback) {
//   var cntxtDtls = "in getcaseTypeMdl";
//   const IST = "Asia/Kolkata";
//   var dated = moment().tz(IST).format("YYYY-MM-DD");
//   var QRY_TO_EXEC = `UPDATE  court_cases SET d_in=? where id=?`;
//   console.log(data, "Sections data");
//   //  const values = data.sections.map((each)=>[
//   //     data.case_id,each,data.entry_by,dated
//   //  ])
//   //  console.log(values,"sections Data")
//   if (callback && typeof callback == "function") {
//     sqlinjection(
//       MySQLConPool,
//       QRY_TO_EXEC,
//       [1,data.rowId],
//       cntxtDtls,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
//   }
// }

export function deleteCaseMdl(data, callback) {
  var cntxtDtls = "in deleteCaseMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");

  var COURT_CASES_QRY = `UPDATE court_cases SET d_in = ? where id = ?`;

  var RESPONDENTS_QRY = `UPDATE case_countered_respondents SET d_in = ? WHERE case_id = ?`;

  console.log(data, "Case deletion data");

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      COURT_CASES_QRY,
      [1, data.rowId],
      cntxtDtls,
      function (err, courtResults) {
        if (err) {
          callback(err, null);
          return;
        }

        sqlinjection(
          MySQLConPool,
          RESPONDENTS_QRY,
          [1, data.rowId],
          cntxtDtls,
          function (err, respondentResults) {
            callback(err, {
              court_cases: courtResults,
              case_countered_respondents: respondentResults,
            });
            return;
          }
        );
      }
    );
  } else {
    console.warn(
      "Non-callback approach not fully implemented for multiple queries"
    );
    return sqlinjection(
      MySQLConPool,
      COURT_CASES_QRY,
      [1, data.rowId],
      cntxtDtls
    );
  }
}

export function postHearingDataMdl(data, callback) {
  var cntxtDtls = "in postHearingDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `UPDATE  court_cases SET next_hearing_date=?,add_instruction_by_court=?, add_remarks=?, document=? where id=?`;
  console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  const remarks = String(data.form.remarks);
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [
        data.form.nextdate,
        data.form.instructions,
        remarks,
        data.document,
        data.case_id,
      ],
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

export function getanalysisDataMdl(data, callback) {
  var cntxtDtls = "in getanalysisDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT dd.district_name,count(cc.district_id) as cnt  FROM districts_data dd left join court_cases cc on dd.id=cc.district_id WHERE dd.d_in=0  and cc.d_in=0 GROUP by dd.id;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function sectionDataMdl(data, callback) {
  var cntxtDtls = "in getanalysisDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `select case_related_sections.section_id,section_tbl.section_name,count(court_cases.id) AS cnt from court_cases join case_related_sections on court_cases.id=case_related_sections.case_id join section_tbl on case_related_sections.section_id=section_tbl.id
where court_cases.d_in = 0
  group by section_tbl.section_name`;

  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function categoryDataMdl(data, callback) {
  var cntxtDtls = "in categoryDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT  sc.id, sc.category_type, COUNT(cc.id) AS cnt 
FROM subject_category sc 
LEFT JOIN court_cases cc ON cc.categories = sc.id AND cc.d_in = 0
WHERE sc.d_in='0'
GROUP BY sc.category_type 
ORDER BY sc.category_type;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function ofcDataMdl(data, callback) {
  var cntxtDtls = "in categoryDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `select case_countered_officers.officer_id,officers_tbl.officer_nm, count(court_cases.id) AS cnt from court_cases join case_countered_officers ON court_cases.id=case_countered_officers.case_id JOIN officers_tbl ON case_countered_officers.officer_id=officers_tbl.id WHERE court_cases.d_in=0 GROUP BY officers_tbl.officer_nm;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function madalsDataCtrl(data, callback) {
  var cntxtDtls = "in categoryDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT mandal_id,mandal_name FROM mandal_list WHERE district_id=? and d_in=0;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.district_id],
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

export function villagesDataMdl(data, callback) {
  var cntxtDtls = "in categoryDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT * from village_data where d_in=0 and mandal_id=?;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.district_id],
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

export function templesDataMdl(data, callback) {
  var cntxtDtls = "in categoryDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT * from temple_registration where d_in=0 and temple_village_id=?;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.district_id],
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
export function updateRespondentMdl(data, callback) {
  var cntxtDtls = "in updateRespondentMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");

  const case_id = data.case_id;
  const officers = data.officers; // This is [4] but code expects objects
  const entry_by = data.entry_by;

  if (!officers || officers.length === 0) {
    return callback(null, { message: "No Respondents to update" });
  }

  const DELETE_QUERY = `DELETE FROM case_countered_respondents WHERE case_id = ?`;
  const INSERT_QUERY = `INSERT INTO case_countered_respondents 
    (case_id, officer_id, counter_date, counter_status, entry_by, entry_date) VALUES ?`;

  // First, normalize the officers data
  let normalizedOfficers;
  try {
    // Handle both array of IDs and array of objects
    if (typeof officers[0] === "number" || typeof officers[0] === "string") {
      // If officers is [4] (array of IDs), convert to objects
      normalizedOfficers = officers.map((officer_id) => ({
        officer_id: officer_id,
        date: dated, // Use current date as default
        status: 1, // Default status (adjust as needed)
      }));
    } else {
      // If officers is already array of objects
      normalizedOfficers = officers.map((officer) => ({
        officer_id: officer.officer_id || officer.id,
        date: officer.date || dated,
        status: officer.status || officer.counter_status || 1,
      }));
    }
  } catch (error) {
    return callback(new Error("Invalid officers data format"));
  }

  sqlinjection(
    MySQLConPool,
    DELETE_QUERY,
    [case_id],
    cntxtDtls,
    function (err) {
      if (err) {
        return callback(err);
      }

      const values = normalizedOfficers.map(({ officer_id, date, status }) => [
        case_id,
        officer_id,
        date,
        status,
        entry_by,
        dated,
      ]);

      sqlinjection(
        MySQLConPool,
        INSERT_QUERY,
        [values],
        cntxtDtls,
        function (err2, res2) {
          if (err2) {
            return callback(err2);
          }
          callback(null, {
            message: "Respondents updated successfully",
            affectedRows: res2.affectedRows,
          });
        }
      );
    }
  );
}
// UPLOAD DOCUMENT
export function uploadDocumentsMdl(data, callback) {
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var cntxtDtls = "in uploadDocumentsMdl";
  var QRY_TO_EXEC = `insert into document_upload set ?`;
  var values = {
    file_name: data.subject_name,
    link: data.document,
    entry_by: data.entry_by,
    entry_date: dated,
    case_id: data.case_id,
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

export function getUploadedDocumentsMdl(data, callback) {
  var cntxtDtls = "in getUploadedDocumentsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  console.log(data, 685);

  var QRY_TO_EXEC = `SELECT * FROM  document_upload where case_id='${data.case_id}';`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function SubmitRespodents(data, callback) {
  if (data.officers.length > 0) {
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD");
    var cntxtDtls = "in SubmitRespodents";
    var QRY_TO_EXEC = `INSERT into  case_countered_respondents(case_id,officer_id,counter_date,counter_status,entry_by,entry_date) VALUES ?`;

    const values = data.officers.map((officer) => [
      data.case_id,
      officer.id,
      officer.date,
      officer.status,
      data.entry_by,
      dated,
    ]);
    console.log(values);
    if (callback && typeof callback == "function") {
      sqlinjection(
        MySQLConPool,
        QRY_TO_EXEC,
        [values],
        cntxtDtls,
        function (err, results) {
          callback(err, results);
          return;
        }
      );
    } else {
      return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
  } else {
    callback(false, []);
  }
}
export function uniqueCaseNumberCheckMdl(data, callback) {
  var cntxtDtls = "in uniqueCaseNumberCheckMdl";
  console.log(data.caseNo, 541);

  var QRY_TO_EXEC = `SELECT * from court_cases where d_in=0 and case_no='${data.caseNo}' and year='${data.year}';`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      data.section_ids,
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, data.section_ids, cntxtDtls);
  }
}

// Respondent Wise Report

export function getRespondentDataMdl(data, callback) {
  var cntxtDtls = "in getRespondentDataMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT o.id, o.officer_nm, COUNT(cc.id) AS cnt FROM respondents_tbl AS o LEFT JOIN case_countered_respondents AS co ON co.officer_id = o.id LEFT JOIN court_cases AS cc ON cc.id = co.case_id

  where co.d_in=0 AND o.d_in=0 AND cc.d_in=0 GROUP BY o.id, o.officer_nm order by o.id, o.officer_nm;`;

  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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

export function getRespondentCourtCasesDataMdl(data, callback) {
  var cntxtDtls = "in getRespondentCourtCasesDataMdl";

  console.log(1036, data);

  // var QRY_TO_EXEC = `SELECT
  //   a.*,
  //   a.id AS case_id,
  //   CONVERT_TZ(a.last_date_of_listing, '+00:00', '+05:30') as last_date_of_listing,
  //   (SELECT b.case_type FROM case_type AS b WHERE a.casetype = b.id LIMIT 1) AS case_type,
  //   (SELECT d.district_name FROM districts_data AS d WHERE a.district_id = d.id LIMIT 1) AS district_name,
  //   (SELECT m.mandal_name FROM mandal_list AS m WHERE a.mandal_id = m.mandal_id LIMIT 1) AS mandal_name,
  //   (SELECT v.village_name FROM village_data AS v WHERE a.village_id = v.village_id LIMIT 1) AS village_name,
  //   (SELECT sc.category_type FROM subject_category AS sc WHERE a.categories = sc.id LIMIT 1) AS category_type,
  //   (SELECT cf.id FROM counter_to_be_filed AS cf WHERE a.counter_to_be_filed = cf.id LIMIT 1) AS counter_to_be_filed_id,

  //   (SELECT GROUP_CONCAT(DISTINCT s.section_id) FROM case_related_sections AS s WHERE s.case_id = a.id) AS sections,
  //   (SELECT GROUP_CONCAT(DISTINCT s.officer_id) FROM case_countered_respondents AS s WHERE s.case_id = a.id) AS respondents,
  //   (
  //     SELECT CONCAT(
  //       '[',
  //       GROUP_CONCAT(
  //         DISTINCT CONCAT( '{"officer_id":', o.officer_id, ',"status":"', o.counter_status, '"', ',"officer_name":"', ot.officer_nm, '"', ',"date":"', o.counter_date, '"}' )
  //       ),
  //       ']'
  //     )
  //     FROM case_countered_officers AS o
  //     JOIN officers_tbl AS ot ON ot.id = o.officer_id
  //     WHERE o.case_id = a.id
  //   ) AS officers
  // FROM court_cases AS a
  // WHERE a.d_in = 0 ORDER BY a.id DESC;
  // `

  var QRY_TO_EXEC = `SELECT 
  a.*, 
  a.id AS case_id,
  CONVERT_TZ(a.last_date_of_listing, '+00:00', '+05:30') AS last_date_of_listing,
  (SELECT b.case_type FROM case_type AS b WHERE a.casetype = b.id LIMIT 1) AS case_type,
  (SELECT d.district_name FROM districts_data AS d WHERE a.district_id = d.id LIMIT 1) AS district_name,
  (SELECT m.mandal_name FROM mandal_list AS m WHERE a.mandal_id = m.mandal_id LIMIT 1) AS mandal_name,
  (SELECT v.village_name FROM village_data AS v WHERE a.village_id = v.village_id LIMIT 1) AS village_name,
  (SELECT sc.category_type FROM subject_category AS sc WHERE a.categories = sc.id LIMIT 1) AS category_type,
  (SELECT cf.id FROM counter_to_be_filed AS cf WHERE a.counter_to_be_filed = cf.id LIMIT 1) AS counter_to_be_filed_id,
    (SELECT ud.user_name FROM users_data AS ud WHERE a.entry_by = ud.id LIMIT 1) AS user_name,

  (SELECT GROUP_CONCAT(DISTINCT s.section_id) 
     FROM case_related_sections AS s 
    WHERE s.case_id = a.id) AS sections,

  (SELECT GROUP_CONCAT(DISTINCT s.officer_id) 
     FROM case_countered_respondents AS s 
    WHERE s.case_id = a.id) AS respondents,

  (
    SELECT CONCAT(
      '[', 
      GROUP_CONCAT(
        DISTINCT CONCAT(
          '{"officer_id":', o.officer_id,
          ',"status":"', o.counter_status, '"',
          ',"officer_name":"', ot.officer_nm, '"',
          ',"date":"', o.counter_date, '"}'
        )
      ), 
      ']'
    )
    FROM case_countered_officers AS o
    JOIN officers_tbl AS ot ON ot.id = o.officer_id
    WHERE o.case_id = a.id
  ) AS officers

FROM court_cases AS a
WHERE a.d_in = 0
  AND EXISTS (
    SELECT 1
    FROM case_countered_respondents cr
    WHERE cr.case_id = a.id
      AND cr.officer_id = ?
      AND cr.d_in = 0
  )
ORDER BY a.id DESC;
`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.id],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.id], cntxtDtls);
  }
}

export function getCaseTypesMdl(data, callback) {
  var cntxtDtls = "in getCaseTypesMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `SELECT * FROM case_type WHERE d_in=0;`;
  // console.log(data, "Sections data");
  //  const values = data.sections.map((each)=>[
  //     data.case_id,each,data.entry_by,dated
  //  ])
  //  console.log(values,"sections Data")
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
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
//
export function getDistrictCourtCasesDataMdl(data, callback) {
  var cntxtDtls = "in getDistrictCourtCasesDataMdl";

  console.log(1219, data);
  var QRY_TO_EXEC = `SELECT cc.*, ud.user_name 
FROM court_cases AS cc 
INNER JOIN districts_data ON cc.district_id = districts_data.id 
INNER JOIN users_data AS ud ON cc.entry_by = ud.id 
WHERE districts_data.district_name = ? AND cc.d_in = 0;`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.district_name],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.id], cntxtDtls);
  }
}

// CATEGORY WISE REPORT
export function getCategoryCourtCasesDataMdl(data, callback) {
  var cntxtDtls = "in getCategoryCourtCasesDataMdl";

  console.log(1219, data);

  // Updated query with district_name filter
  var QRY_TO_EXEC = `select court_cases.*,users_data.user_name as user_name from court_cases join users_data on court_cases.entry_by=users_data.id WHERE 	court_cases.categories=?  AND court_cases.d_in=0
;`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.id], // Now both parameters are used
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.category_type, data.district_name],
      cntxtDtls
    );
  }
}

export function getSectionCourtCasesDataMdl(data, callback) {
  var cntxtDtls = "in getSectionCourtCasesDataMdl";

  console.log(1219, data);

  var QRY_TO_EXEC = `SELECT cc.*, ud.user_name 
FROM court_cases AS cc 
JOIN case_related_sections AS crs ON cc.id = crs.case_id 
JOIN section_tbl AS st ON crs.section_id = st.id 
JOIN users_data AS ud ON cc.entry_by = ud.id 
WHERE st.section_name = ?  AND cc.d_in = 0`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.section_name],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.section_name],
      cntxtDtls
    );
  }
}

export function getOfficerCourtCasesDataMdl(data, callback) {
  var cntxtDtls = "in getOfficerCourtCasesDataMdl";

  console.log(1219, data);

  var QRY_TO_EXEC = `SELECT cc.*, ud.user_name 
FROM court_cases AS cc 
JOIN case_countered_officers ON cc.id = case_countered_officers.case_id 
JOIN officers_tbl ON case_countered_officers.officer_id = officers_tbl.id 
JOIN users_data AS ud ON cc.entry_by = ud.id 
WHERE officers_tbl.officer_nm = ?  AND cc.d_in = 0`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.officer_nm],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.officer_nm],
      cntxtDtls
    );
  }
}

export function addRespondentMdl(data, callback) {
  const cntxtDtls = "in addRespondentMdl";
  console.log(data, 1364);

  const QRY_TO_EXEC = `INSERT INTO respondents_tbl(officer_nm) VALUES (?)`;
  let paramsData = [data.officer_nm];
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      paramsData,
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function duplicateCheckMdl(data, callback) {
  const cntxtDtls = "in duplicateCheckMdl";
  console.log(data, 1364);

  const QRY_TO_EXEC = `select count(*) AS count from respondents_tbl WHERE officer_nm=?`;
  let paramsData = [data.officer_nm];
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      paramsData,
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getsectionabsrtractMdl(data, callback) {
  var cntxtDtls = "in getsectionabsrtractMdl";

  console.log(1219, data);
  var QRY_TO_EXEC = `SELECT   
    st.section_name,
    COUNT(cc.id) AS total_entered,
    SUM(CASE WHEN cc.court_case_status = 1 THEN 1 ELSE 0 END) AS disposed_count,
    SUM(CASE WHEN cc.court_case_status = 0 THEN 1 ELSE 0 END) AS pending_count,
    SUM(CASE WHEN cc.counter_filed_or_not = 'filed' THEN 1 ELSE 0 END) AS filed_count,
    SUM(CASE WHEN cc.counter_filed_or_not = 'not filed' THEN 1 ELSE 0 END) AS not_filed_count    
FROM court_cases cc
JOIN case_related_sections crs 
    ON cc.id = crs.case_id
JOIN section_tbl st 
    ON crs.section_id = st.id
WHERE cc.d_in = 0
GROUP BY st.section_name ORDER BY section_name asc;`;

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.id], cntxtDtls);
  }
}
