import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection } from "../../../utils/utils.js";
import moment from "moment-timezone";

export function submitShopsDetailsMdl(data, callback) {
  const IST = "Asia/Kolkata";
  console.log(114, data);
  var LDS = moment(data.lastDateOfListing).tz(IST).format("YYYY-MM-DD");
  var cntxtDtls = "in submitShopsDetailsMdl";
  var QRY_TO_EXEC = `insert into shopsandbuildings set ?`;
  var values = {
    district_name: data.district_id,
    mandal_name: data.mandal_id,
    village_name: data.village_id,
    temple_name: data.temple_nm,
    tcode: data.temple_code,
    select_category: data.category_type,
    shop_name: data.shop_name,
    shop_oner_name: data.shop_oner_name,
    shop_oner_number: data.shop_oner_number,
    lease_from_date: data.lease_from_date,
    lease_last_date: data.lease_last_date,
    lease_approved_by: data.lease_approved_by,
    lease_amount_per_year: data.lease_amount_per_year,
    lease_order_issued_by: data.leaseorder_issued_by,
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

export function getshopsandbuildingsdataMdl(
  limit,
  offset,
  data,
  user,
  callback
) {
  console.log(data, user, 745);
  const cntxtDtls = "in getshopsandbuildingsdataMdl";

  let whereCondition = ``;

  // 🧠 Now even role_type = 1 sees only their entries
  if (user.role_type == 1) {
    whereCondition = ``;
  } else if (user.role_type == 5) {
    let districts = [];
    if (user.district_id) {
      districts = user.district_id.includes(",")
        ? user.district_id.split(",").map((w) => `'${w.trim()}'`)
        : [`'${user.district_id.trim()}'`];
    }
    const inClause = districts.join(",");
    whereCondition = ` AND s.district_name IN (${inClause})`;
  } else if (user.role_type == 6) {
    let temples = [];
    if (user.temple_id) {
      temples = user.temple_id.includes(",")
        ? user.temple_id.split(",").map((w) => `'${w.trim()}'`)
        : [`'${user.temple_id.trim()}'`];
    }
    const inClause = temples.join(",");
    whereCondition = ` AND s.temple_name IN (${inClause})`;
  } else {
    whereCondition = ``;
  }

  // let dataQuery = `SELECT * FROM shopsandbuildings WHERE d_in = 0 ${whereCondition}`;
  // let countQuery = `SELECT COUNT(*) AS totalCount FROM shopsandbuildings WHERE d_in = 0 ${whereCondition}`;

  let dataQuery = `
    SELECT 
        s.*, 
        d.id AS district_id, 
        d.district_name, 
        m.mandal_id, 
        m.mandal_name, 
        v.village_id, 
        v.village_name,
        s.temple_name,              
        t.temple_id AS temple_nm, 
        t.temple_name             
    FROM shopsandbuildings AS s
    LEFT JOIN districts_data AS d ON s.district_name = d.id
    LEFT JOIN mandal_list AS m ON s.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON s.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON s.temple_name = t.temple_id 
    WHERE s.d_in = 0 ${whereCondition} ORDER BY s.id DESC
`;

  let countQuery = `
    SELECT COUNT(s.id) AS totalCount
    FROM shopsandbuildings AS s
    LEFT JOIN districts_data AS d ON s.district_name = d.id
    LEFT JOIN mandal_list AS m ON s.mandal_name = m.mandal_id
    LEFT JOIN village_data AS v ON s.village_name = v.village_id
    LEFT JOIN temple_registration AS t ON s.temple_name = t.temple_id
    WHERE s.d_in = 0 ${whereCondition}
`;

  dataQuery += ` LIMIT ? OFFSET ?;`;
  let queryParams = [parseInt(limit), parseInt(offset)];
  let countParams = [];

  sqlinjection(
    MySQLConPool,
    countQuery,
    countParams,
    cntxtDtls,
    function (errCount, countResults) {
      if (errCount) {
        console.error("Count Query Error:", errCount);
        callback(errCount, null);
        return;
      }

      const totalCount = countResults[0].totalCount;

      sqlinjection(
        MySQLConPool,
        dataQuery,
        queryParams,
        cntxtDtls,
        function (err, results) {
          if (err) {
            console.error("Data Query Error:", err);
            callback(err, null);
            return;
          }

          callback(null, {
            data: results,
            totalCount: totalCount,
          });
        }
      );
    }
  );
}

export function updateShopsDetailsMdl(data, callback) {
  console.log(data, 1029);
  var cntxtDtls = "in updateShopsDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");

  var QRY_TO_EXEC = `UPDATE shopsandbuildings 
        SET district_name = ?, mandal_name = ?, village_name = ?, temple_name = ?, 
            tcode = ?, select_category = ?, shop_name = ?, shop_oner_name = ?, 
            shop_oner_number = ?, lease_from_date = ?, lease_last_date = ?, 
            lease_approved_by = ?, lease_amount_per_year = ?, 
            lease_order_issued_by = ?, updated_by = ?, updated_date = ?  
        WHERE id = ?`;

  let paramsData = [
    data.district_id,
    data.mandal_id,
    data.village_id,
    data.temple_nm,
    data.temple_code,
    data.category_type,
    data.shop_name,
    data.shop_oner_name,
    data.shop_oner_number,
    data.lease_from_date,
    data.lease_last_date,
    data.lease_approved_by,
    data.lease_amount_per_year,
    data.leaseorder_issued_by,
    data.updated_by,
    dated,
    data.rowId,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      paramsData,
      cntxtDtls,
      function (err, results) {
        callback(err, results);
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
  }
}

export function deleteshopsandbuildingsDetailsMdl(data, callback) {
  var cntxtDtls = "in deleteshopsandbuildingsDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var QRY_TO_EXEC = `update  shopsandbuildings set d_in = '1',d_by=?,d_date=? where id=? `;
  let paramsData = [data.d_by, dated, data.rowId];
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
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

// <-----------------------------------------Districts--------------------------------------->

export function getdistricts(data, callback) {
  var cntxtDtls = "in getdistricts";
  var QRY_TO_EXEC = `Select district_name , id from districts_data where d_in =  0  order by district_name asc;`;
  let paramsData = [];
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
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getmandals(data, callback) {
  var cntxtDtls = "in getmandals";
  var QRY_TO_EXEC = `Select mandal_id , mandal_name , district_id from mandal_list where d_in =  0 and district_id = ?  order by mandal_name asc;`;
  let paramsData = [data.dist_id];
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
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getvillagesbymandalid(data, callback) {
  var cntxtDtls = "in getvillagesbymandalid";
  var QRY_TO_EXEC = `Select village_id , village_name from village_data where d_in =  0 and mandal_id = ?  order by village_name asc;`;
  let paramsData = [data.mandal_id];
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
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getconstituenciesbydistrictid(data, callback) {
  var cntxtDtls = "in getconstituenciesbydistrictid";
  var QRY_TO_EXEC = `Select constituency_id , constituency_name from constituency_data where d_in =  0 and district_id = ?  order by constituency_name asc;`;
  let paramsData = [data.dist_id];
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
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function Checkmobilenumber(number, callback) {
  var cntxtDtls = "in Checkmobilenumber";
  var QRY_TO_EXEC = `select id from ttd_mandiralu_requests where person_no = ? and d_in='0';`;
  let paramsData = [number]
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  }
  else
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function getuserdatadetailsamdnumber(data, callback) {
    var cntxtDtls = "in getuserdatadetailsamdnumber";
    var QRY_TO_EXEC = `SELECT b.district_name, c.mandal_name, a.constituency_id, a.*,  ( SELECT CONCAT( '[', GROUP_CONCAT( CONCAT( '{"temple_name":"', REPLACE(nt.temple_name, '"', '\\"'), '"', ',"distance":', nt.distance, '}' ) ), ']' ) FROM ttd_mandirrequestsnearbytemple nt WHERE nt.ttd_mandir_id = a.ID ) AS nearby_temples FROM ttd_mandiralu_requests a LEFT JOIN districts_data b ON a.district_id = b.id LEFT JOIN mandal_list c ON a.mandal_id = c.mandal_id LEFT JOIN village_data d ON a.village_id = d.village_id LEFT JOIN constituency_data e ON a.constituency_id = e.constituency_id where a.entry_by = ? and a.d_in=?  GROUP BY a.id  order by a.id desc limit 1;`
    let paramsData = [data.usr_id , 0 ]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getusermandirrequestsmdl(data, callback) {
    var cntxtDtls = "in getusermandirrequestsmdl";
    var QRY_TO_EXEC = `SELECT b.district_name, c.mandal_name, a.constituency_id, a.*,  ( SELECT CONCAT( '[', GROUP_CONCAT( CONCAT( '{"temple_name":"', REPLACE(nt.temple_name, '"', '\\"'), '"', ',"distance":', nt.distance, '}' ) ), ']' ) FROM ttd_mandirrequestsnearbytemple nt WHERE nt.ttd_mandir_id = a.ID ) AS nearby_temples FROM ttd_mandiralu_requests a LEFT JOIN districts_data b ON a.district_id = b.id LEFT JOIN mandal_list c ON a.mandal_id = c.mandal_id LEFT JOIN village_data d ON a.village_id = d.village_id LEFT JOIN constituency_data e ON a.constituency_id = e.constituency_id where a.entry_by = ? and a.d_in=?  GROUP BY a.id  order by a.id desc;`
    let paramsData = [data.usr_id , 0 ]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


// export function submitttdmandirrequest(data, callback) {
//   const cntxtDtls = "in submitttdmandirrequest";

//   const IST = "Asia/Kolkata";
//   const createdAt = moment().tz(IST).format("YYYY-MM-DD");
//   const createdtime = moment().tz(IST).format('HH:mm:ss');


//   // Single clean object to insert
//   const values = {
//     district_id: data.district,
//     mandal_id: data.mandal,
//     village_id: data.villageName,
//     constituency_id: data.assemblyConstituency,

//     latitude: data.latitude,
//     longitude: data.longitude,
//     population: data.population,
//     scStFishermen: data.scStFishermen,

//     requesterName: data.requesterName,
//     templeName: data.templeName,
//     deity: data.deity,

//     holder_name: data.holder_name,
//     account_no: data.account_no,
//     bank_name: data.bank_name,
//     ifsc: data.ifsc,
//     bank_branch: data.bank_branch,

//     landExtent: data.landExtent,
//     landvests: data.landvests,
//     survey_no: data.survey_no,

//     Boundaries_east: data.Boundaries_east,
//     Boundaries_south: data.Boundaries_south,
//     Boundaries_west: data.Boundaries_west,
//     Boundaries_north: data.Boundaries_north,

//     Panchayat_record: data.Panchayat_record,
//     donating_land: data.donating_land,
//     formed_committee: data.formed_committee,
//     Bhajan_activity: data.Bhajan_activity,

//     works_proposed: data.works_proposed,
//     amount_proposed: data.amount_proposed,
//     received_from_TTD: data.received_from_TTD,
//     Financial_assistance: data.Financial_assistance,

//     temples_available_nearby: data.temples_available_nearby,
//     villages_covered: data.villages_covered,
//     Amount_in_Rs_proposed: data.Amount_in_Rs_proposed,
//     endorsement_made: data.endorsement_made,

//     person_name: data.person_name,
//     person_no: data.person_no,
//     person_address: data.person_address,
//     Other_relevant_issues: data.Other_relevant_issues,

//     created_at: createdAt,
//     created_time: createdtime,
//     d_in: 0,
//     entry_by: data.entry_by
//   };

//   const QRY_TO_EXEC = `INSERT INTO ttd_mandiralu_requests SET ?`;

//   console.log("Insert Values:", values);

//   if (callback && typeof callback === "function") {
//     sqlinjection(
//       MySQLConPool,
//       QRY_TO_EXEC,
//       values,
//       cntxtDtls,
//       function (err, results) {
//         callback(err, results);
//       }
//     );
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
//   }
// }

export function submitttdmandirrequest(data, callback) {
    const cntxtDtls = "in submitttdmandirrequest";

    const IST = "Asia/Kolkata";
    const createdAt = moment().tz(IST).format("YYYY-MM-DD");
    const createdtime = moment().tz(IST).format('HH:mm:ss');
    // Single clean object to insert
    const values = {
        district_id: data.district,
        mandal_id: data.mandal,
        village_id: data.villageName,
        constituency_id: data.assemblyConstituency,

        latitude: data.latitude,
        longitude: data.longitude,
        population: data.population,
        scStFishermen: data.scStFishermen,

        requesterName: data.requesterName,
        templeName: data.templeName,
        deity: data.deity,

        holder_name: data.holder_name,
        account_no: data.account_no,
        bank_name: data.bank_name,
        ifsc: data.ifsc,
        bank_branch: data.bank_branch,

        landExtent: data.landExtent,
        landvests: data.landvests,
        survey_no: data.survey_no,

        Boundaries_east: data.Boundaries_east,
        Boundaries_south: data.Boundaries_south,
        Boundaries_west: data.Boundaries_west,
        Boundaries_north: data.Boundaries_north,

        Panchayat_record: data.Panchayat_record,
        donating_land: data.donating_land,
        formed_committee: data.formed_committee,
        Bhajan_activity: data.Bhajan_activity,

        works_proposed: data.works_proposed,
        amount_proposed: data.amount_proposed,
        received_from_TTD: data.received_from_TTD,
        Financial_assistance: data.Financial_assistance,

        temples_available_nearby: data.temples_available_nearby,
        villages_covered: data.villages_covered,
        Amount_in_Rs_proposed: data.Amount_in_Rs_proposed,
        endorsement_made: data.endorsement_made,

        person_name: data.person_name,
        person_no: data.person_no,
        person_address: data.person_address,
        Other_relevant_issues: data.Other_relevant_issues,

        temple_commitee_doc: data.temple_commitee_doc_url,
        bank_passbook_doc: data.bank_passbook_doc_url,
        land_title_doc: data.land_title_doc_url,
        adangla_ib_doc: data.adangla_ib_doc_url,
        donor_acceptance_doc: data.donor_acceptance_doc_url,
        ceritified_doc: data.ceritified_doc_url,
        aadhaar_doc: data.aadhaar_doc_url,


        entry_by: data.entry_by,
        created_at: createdAt,
        created_time: createdtime,
        d_in: 0
    };

    const QRY_TO_EXEC = `INSERT INTO ttd_mandiralu_requests SET ?`;

    console.log("Insert Values:", values);

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
            callback(err, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
    }
}


export function submitotherstemplesnearby(lastid, data, callback) {
  const cntxtDtls = "in submitotherstemplesnearby";

  let QRY_TO_EXEC = `
        INSERT INTO ttd_mandirrequestsnearbytemple
        (ttd_mandir_id, temple_name, distance)
        VALUES `;

  const params = [];

  const placeholders = data.map((item) => {
    params.push(lastid, item.name, item.distance);
    return "(?, ?, ?)";
  });

  QRY_TO_EXEC += placeholders.join(", ") + ";";

  if (callback && typeof callback === "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      params,
      cntxtDtls,
      (err, results) => {
        callback(err, results);
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
  }
}

export function sendOtpMdl(number, otp, callback) {

  const context = "In sendOtpMdl";

  const checkQuery = `SELECT id FROM ttbbajanamandir_users WHERE number = ? LIMIT 1`;
  const insertQuery = `INSERT INTO ttbbajanamandir_users (number, otp) VALUES (?, ?)`;
  const updateQuery = `UPDATE ttbbajanamandir_users SET otp = ? WHERE number = ?`;

  // Check if mobile number exists
  sqlinjection(MySQLConPool, checkQuery, [number], context, (err, results) => {

    if (err) {
      if (callback && typeof callback === "function") callback(err, null);
      return;
    }

    // If number exists ? update OTP
    if (results.length > 0) {
      sqlinjection(
        MySQLConPool,
        updateQuery,
        [otp, number],
        context,
        (err2, results2) => {
          if (callback && typeof callback === "function") callback(err2, results2);
          return;
        }
      );
    }

    // If number does NOT exist ? insert new OTP
    else {
      sqlinjection(
        MySQLConPool,
        insertQuery,
        [number, otp],
        context,
        (err3, results3) => {
          if (callback && typeof callback === "function") callback(err3, results3);
          return;
        }
      );
    }
  });
}
export function veriftOtpMdl(reqdata, callback) {
  var cntxtDtls = "verifying otp in the db";
  var QRY_TO_EXEC = `SELECT * FROM ttbbajanamandir_users WHERE number = ? and otp=?   AND d_in = 0  ;`;
  let paramsData = [reqdata.number, reqdata.otp];
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
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}
