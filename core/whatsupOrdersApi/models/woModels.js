import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection } from "../../../utils/utils.js";
import moment from "moment-timezone";

export function getWODarshnamCardsCountMdl(data, callback) {
  var cntxtDtls = "in getWODarshnamCardsCountMdl";
  const currentISTDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

  var QRY_TO_EXEC = `SELECT 
               COUNT(*) AS total_orders,
               SUM(CASE WHEN verify_ind = 0 THEN 1 ELSE 0 END) AS received,
               SUM(CASE WHEN verify_ind = 1 THEN 1 ELSE 0 END) AS not_received
       FROM e_darshnam_orders WHERE d_in = '0';  `;

  console.log(QRY_TO_EXEC, 225);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getWODarshnamdataMdl(data, callback) {
  var cntxtDtls = "in getWODarshnamdataMdl";

  var QRY_TO_EXEC = `SELECT d.*,m.darshan_name_english FROM e_darshnam_orders as d join e_darshan_master as m on m.id=d.darshanam_id WHERE d.d_in=0 ORDER BY d.id DESC`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
//darshanam start
// export function getdharshanamMdl(data, callback) {
//   var cntxtDtls = "in getdharshanamMdl";
//   let templeId
//   let date;
//   let value;
//   if (data.role_type == '10') {
//     templeId = ` and temple_id=?`
//     value = [data.temple_id];
//   } else {
//     templeId = ``
//     value = [];
//   }

//   if (data.date1 && data.date2) {
//     date = ` AND DATE(seva_date ) >= ? AND DATE(seva_date ) <= ?`;
//     value.push(data.date1, data.date2);
//   } else if (data.date1) {
//     date = ` AND DATE(seva_date ) >= ?`;
//     value.push(data.date1);
//   } else if (data.date2) {
//     date = ` AND DATE(seva_date ) <= ?`;
//     value.push(data.date1);
//   } else {
//     date = ``
//   }

//   var QRY_TO_EXEC = `SELECT
//     seva_date,
//     COUNT(*) AS total_darshanam,
//     SUM(CASE WHEN verify_ind = 0 THEN 1 ELSE 0 END) AS darshanam,
//     SUM(CASE WHEN verify_ind = 1 THEN 1 ELSE 0 END) AS not_darshanam,
//     SUM(total_amount) AS total_amount
// FROM e_darshnam_orders
// WHERE d_in = '0'  and payment_status="SUCCESS"  ${templeId} ${date}
// GROUP BY seva_date
// ORDER BY seva_date ASC;`;
//   if (callback && typeof callback == "function") {
//     sqlinjection(
//       MySQLConPool,
//       QRY_TO_EXEC,
//       value,
//       cntxtDtls,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// }

// export function getDetailsDarshanamByDateMdl(data, callback) {
//   var cntxtDtls = "in getDetailsDarshanamByDateMdl";

//   const params = [data.formattedDate,];
//   let templeId;
//   if (data.role_type == '10') {
//     templeId = ` and d.temple_id=?`
//     params.push(data.temple_id);
//   } else {
//     templeId = ``
//   }

//   let QRY_TO_EXEC = `SELECT d.*,m.darshan_name_english FROM e_darshnam_orders as d join e_darshan_master as m on m.id=d.darshanam_id WHERE d.seva_date = ? and d.d_in=0  and d.payment_status="SUCCESS" ${templeId}`;

//   if (data.filterParams) {
//     if (data.filterParams.verify_ind !== undefined) {
//       QRY_TO_EXEC += ` AND verify_ind = ?`;
//       params.push(data.filterParams.verify_ind);
//     }
//   }
//   //main important
//   QRY_TO_EXEC += ` ORDER BY d.id DESC;`;

//   if (callback && typeof callback == "function") {
//     sqlinjection(
//       MySQLConPool,
//       QRY_TO_EXEC,
//       params,
//       cntxtDtls,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// }

//seva start

export function getSevamoduleMdl(data, callback) {
  console.log(data, 135);
  var cntxtDtls = "in getSevamoduleMdl";

  let templeId;
  let value;
  let date;

  if (data.role_type == 10) {
    templeId = ` and a.temple_id=?`;
    value = [data.temple_id];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = `and a.temple_id=?`;
    value = [data.temple_id];
  } else {
    templeId = ``;
    value = [];
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(a.seva_date) >= ? AND DATE(a.seva_date) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(a.seva_date) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(a.seva_date) <= ?`;
    value.push(data.date2);
  } else {
    date = ``;
  }

  let orderFrom = "";
  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND a.order_from = ?`;
    value.push(Number(data.order_from));
  } else {
    orderFrom = ``;
  }

  var QRY_TO_EXEC = `SELECT 
    a.seva_date,
    COUNT(*) AS total_darshanam,
    SUM(CASE WHEN a.verify_ind = 0 THEN 1 ELSE 0 END) AS darshanam,
    SUM(CASE WHEN a.verify_ind = 1 THEN 1 ELSE 0 END) AS not_darshanam,    
    SUM(a.total_amount) AS total_amount
    

FROM e_seva_orders AS a
LEFT JOIN e_seva_master AS b 
    ON a.seva_id = b.id 
WHERE a.d_in = '0' AND b.d_in = 0  and a.payment_status="SUCCESS" ${templeId} ${date} ${orderFrom}
GROUP BY a.seva_date
ORDER BY a.seva_date ASC;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getDetailsSevaByDateMdl(data, callback) {
  var cntxtDtls = "in getDetailsSevaByDateMdl";
  const params = [data.formattedDate];
  console.log(params);
  let templeId;
  let value;

  if (data.role_type == 10) {
    templeId = ` and d.temple_id=?`;
    params.push(data.temple_id);
  } else {
    templeId = ``;
  }

  let orderFrom = "";

  if (data.from.order_from !== undefined && data.from.order_from !== "" && Number(data.from.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    params.push(Number(data.from.order_from));
  }

  let QRY_TO_EXEC = `SELECT d.*,m.seva_name_english FROM e_seva_orders as d join e_seva_master as m on m.id=d.seva_id WHERE d.seva_date = ? and d.d_in=0  and d.payment_status="SUCCESS" ${templeId} ${orderFrom}`;

  console.log(QRY_TO_EXEC);

  if (data.filterParams) {
    if (data.filterParams.verify_ind !== undefined) {
      QRY_TO_EXEC += ` AND verify_ind = ?`;
      params.push(data.filterParams.verify_ind);
    }
  }
  //main important
  QRY_TO_EXEC += ` ORDER BY d.id DESC;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
//prasadam start
export function getPrasadammoduleMdl(data, callback) {
  console.log(229, data);
  var cntxtDtls = "in getPrasadammoduleMdl";
  let templeId;
  let value;
  let date;

  if (data.role_type == 10) {
    templeId = ` and a.temple_id=?`
    value = [data.temple_id];
  }
  else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and a.temple_id=?`
    value = [data.temple_id];
  }
  else {
    templeId = ``
    value = [];
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(a.booking_date) >= ? AND DATE(a.booking_date) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(a.booking_date) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(a.booking_date) <= ?`;
    value.push(data.date1);
  } else {
    date = ``
  }

  let orderFrom = '';
  if (data.order_from !== undefined && data.order_from !== '' && Number(data.order_from) !== 2) {
    orderFrom = ` AND a.order_from = ?`;
    value.push(Number(data.order_from));
  }
  else {
    orderFrom = ``;
  }

  //   var QRY_TO_EXEC = `SELECT 
  //     a.booking_date,
  //     COUNT(*) AS total_darshanam,
  //     SUM(CASE WHEN a.verify_ind = 0 THEN 1 ELSE 0 END) AS darshanam,
  //     SUM(CASE WHEN a.verify_ind = 1 THEN 1 ELSE 0 END) AS not_darshanam,    
  //     SUM(total_amount) AS total_amount


  // FROM e_prasadam_orders AS a
  // LEFT JOIN e_prasadam_master AS b 
  //     ON a.prasadam_id = b.prasadam_id 
  // WHERE a.d_in = '0' AND b.d_in = 0  and a.payment_status="SUCCESS" ${templeId} ${date} ${orderFrom}
  // GROUP BY a.booking_date
  // ORDER BY a.booking_date ASC;`;

      var QRY_TO_EXEC = `SELECT 
        DATE(a.booking_date) AS booking_date,

        COUNT(DISTINCT a.id) AS total_darshanam,

        COUNT(DISTINCT CASE WHEN a.verify_ind = 0 THEN a.id END) AS darshanam,

        COUNT(DISTINCT CASE WHEN a.verify_ind = 1 THEN a.id END) AS not_darshanam,

        SUM(b.amount) AS total_amount

    FROM e_prasadam_orders a
    JOIN e_prasadam_orders_items b ON a.id = b.main_id
    JOIN e_prasadam_master c ON b.prasadam_id = c.prasadam_id

    WHERE a.d_in = '0' 
      AND b.d_in = 0  
      AND a.payment_status = "SUCCESS" 
      ${templeId} ${date} ${orderFrom}

    GROUP BY DATE(a.booking_date)
    ORDER BY booking_date ASC;`;


  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      value,
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getDetailsPrasadamByDateMdl(data, callback) {
  var cntxtDtls = "in getDetailsPrasadamByDateMdl";

  const params = [data.formattedDate];
  let templeId;
  if (data.role_type == 10) {
    templeId = ` and d.temple_id=?`;
    params.push(data.temple_id);
  } else {
    templeId = ``;
  }

  let orderFrom = "";

  if (data.from.order_from !== undefined && data.from.order_from !== "" && Number(data.from.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    params.push(Number(data.from.order_from));
  } else {
    orderFrom = ``;
  }

  let QRY_TO_EXEC = `SELECT 
    d.*,
    GROUP_CONCAT(
        CONCAT(m.name_in_english, ' - ', i.qty)
        SEPARATOR '\n'
    ) AS name_in_english
FROM e_prasadam_orders AS d
JOIN e_prasadam_orders_items AS i 
    ON i.main_id = d.id
LEFT JOIN e_prasadam_master AS m 
    ON m.prasadam_id = i.prasadam_id
WHERE d.booking_date = ? and d.d_in=0  and d.payment_status="SUCCESS" ${templeId}  ${orderFrom}
 `;

  if (data.filterParams) {
    if (data.filterParams.verify_ind !== undefined) {
      QRY_TO_EXEC += ` AND verify_ind = ?`;
      params.push(data.filterParams.verify_ind);
    }
  }
  //main important
  QRY_TO_EXEC += ` GROUP BY d.id ORDER BY d.id DESC;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
//tonsure start
export function getTonsuremoduleMdl(data, callback) {
  console.log(332, data);
  var cntxtDtls = "in getTonsuremoduleMdl";
  let templeId;
  let value;
  let date;
  if (data.role_type == 10) {
    templeId = ` and temple_id=?`;
    value = [data.temple_id];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    value = [data.temple_id];
  } else {
    templeId = ``;
    value = [];
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(tonsure_date) >= ? AND DATE(tonsure_date) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(tonsure_date) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(tonsure_date) <= ?`;
    value.push(data.date1);
  } else {
    date = ``;
  }

  let orderFrom = "";
  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    value.push(Number(data.order_from));
  } else {
    orderFrom = ``;
  }

  var QRY_TO_EXEC = `SELECT 
    tonsure_date,
    COUNT(*) AS total_darshanam,
    SUM(CASE WHEN verify_ind = 0 THEN 1 ELSE 0 END) AS darshanam,
    SUM(CASE WHEN verify_ind = 1 THEN 1 ELSE 0 END) AS not_darshanam,    
    SUM(total_amount) AS total_amount
FROM e_tonsure_orders
WHERE d_in = '0'  and payment_status="SUCCESS"
 ${templeId} ${date} ${orderFrom}
GROUP BY tonsure_date
ORDER BY tonsure_date ASC;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getDetailsTonsureByDateMdl(data, callback) {
  var cntxtDtls = "in getDetailsTonsureByDateMdl";
  console.log(data, 1773);

  const params = [data.formattedDate];
  let templeId;
  if (data.role_type == 10) {
    templeId = ` and d.temple_id=?`;
    params.push(data.temple_id);
  } else {
    templeId = ``;
  }

  let orderFrom = "";
  if (data.from.order_from !== undefined && data.from.order_from !== "" && Number(data.from.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    params.push(Number(data.from.order_from));
  } else {
    orderFrom = ``;
  }

  let QRY_TO_EXEC = `

  SELECT d.* FROM e_tonsure_orders as d  WHERE d.tonsure_date = ?  and d.payment_status="SUCCESS" and d.d_in=0 ${templeId} ${orderFrom}`;

  if (data.filterParams) {
    if (data.filterParams.verify_ind !== undefined) {
      QRY_TO_EXEC += ` AND verify_ind = ?`;
      params.push(data.filterParams.verify_ind);
    }
  }
  //main important
  QRY_TO_EXEC += ` ORDER BY d.id DESC;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//doantion start

export function getDonationCardsCountMdl(data, callback) {
  var cntxtDtls = "in getDonationCardsCountMdl";
  let templeId;
  let value;
  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    value = [data.temple_id];
  } else {
    templeId = ``;
    value = [];
  }

  var QRY_TO_EXEC = `SELECT 
    COUNT(*) AS total_donars,
    CAST(
     SUM(
        CASE 
            WHEN DATE(donation_date) = CURDATE() 
            THEN total_amount 
            ELSE 0 
        END
     ) AS UNSIGNED
  
    ) AS today_donation_amount
     ,

    CAST(
       SUM(
        CASE 
            WHEN DATE(donation_date) = CURDATE() - INTERVAL 1 DAY 
            THEN total_amount 
            ELSE 0 
        END
     )  AS UNSIGNED
    ) AS yesterday_donation_amount,
    CAST( SUM(total_amount) AS UNSIGNED ) AS total_donation_amt
FROM e_hundi_orders
WHERE d_in = '0'  and payment_status="SUCCESS" 
 ${templeId}`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getDonationDetailsMdl(data, callback) {
  console.log(491, data);

  var cntxtDtls = "in getDonationDetailsMdl";
  let templeId;
  let date;
  let value;
  if (data.role_type == 10) {
    templeId = ` and d.temple_id=?`;
    value = [data.temple_id];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and d.temple_id=?`;
    value = [data.temple_id];
  } else {
    templeId = ``;
    value = [];
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(d.donation_date) >= ? AND DATE(d.donation_date) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(d.donation_date) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(d.donation_date) <= ?`;
    value.push(data.date1);
  } else {
    date = ``;
  }

  let orderFrom = "";
  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    value.push(Number(data.order_from));
  } else {
    orderFrom = ``;
  }

  var QRY_TO_EXEC = `SELECT d.*,etm.temple_name_english FROM e_hundi_orders as d  join e_temple_master as etm on etm.temple_id=d.temple_id
                            Where d.d_in=0 and d.payment_status="SUCCESS" ${templeId} ${date} ${orderFrom} ORDER BY donation_date DESC`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//analysis
// export function getanalysiscardsCountMdl(data, callback) {
//   const cntxtDtls = "in getanalysiscardsCountMdl";
//   let value = [];
//   let templeId = ``;

//   if (data.role_type === '10') {
//     templeId = " AND temple_id = ?";
//     value = [
//        data.temple_id,
//        data.temple_id,
//        data.temple_id,
//        data.temple_id
//     ];
//   } else {
//     value = [
//
//
//
//
//     ];
//   }

//   const QRY_TO_EXEC = `
//     SELECT
//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND order_from = ? ${templeId}) AS dharshanam,
//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND order_from = ? ${templeId}) AS prasadam,
//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND order_from = ? ${templeId}) AS seva,
//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND order_from = ? ${templeId}) AS tonsure;
//   `;

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }

// export function getanalysiscardsCountMdl(data, callback) {
//   console.log(data, 668);
//   const cntxtDtls = "in getanalysiscardsCountMdl";
//   const IST = "Asia/Kolkata";
//   const today = moment().tz(IST).format("YYYY-MM-DD");
//   let value = [];
//   let templeId = ``;

//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = " AND temple_id = ?";
//     value = [
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id
//     ];

//   }

//   else if (data.role_type == 1 && data.front_temple_id) {
//     templeId = ` and temple_id=?`;
//     value = [
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id
//     ];
//   }
//   else if (data.front_temple_id == 0) {
//     templeId = "";
//     value = [];
//   }
//   else {
//     value = [

//     ];
//   }

//   const QRY_TO_EXEC = `
//     SELECT
//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS dharshanamtotal,
//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS dharshanamkiosk,
//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS dharshanamwhatsapp,

//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS prasadamtotal,
//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS prasadankiosk,
//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS prasadamwhatsapp,

//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS sevatotal,
//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS sevakiosk,
//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS sevawhatsapp,

//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS tonsuretotal,
//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS tonsurekiosk,
//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS tonsurewhatsapp,

//       (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS ehunditotal,
//       (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS ehundikiosk,
//       (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS ehundiwhatsapp,

//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaydarshnamtotal,
//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaydarshnamkiosk,
//       (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaydarshnamwhatsapp,

//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND booking_date = '${today}' ${templeId}) AS todayprasadamtotal,
//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND booking_date = '${today}'  ${templeId}) AS todayprasadamkiosk,
//       (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND booking_date = '${today}' ${templeId}) AS todaypradsadamwhatsapp,

//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaysevatotal,
//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaysevakiosk,
//       (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaysevawhatsapp,

//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND tonsure_date = '${today}' ${templeId}) AS todaytonsuretotal,
//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND tonsure_date = '${today}'  ${templeId}) AS todaytonsurekiosk,
//       (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND tonsure_date = '${today}' ${templeId}) AS todaytonsurewhatsapp,

//       (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND donation_date = '${today}' ${templeId}) AS todayehunditotal,
//       (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND donation_date = '${today}'  ${templeId}) AS todayehundikiosk,
//       (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND donation_date = '${today}' ${templeId}) AS todayehundiwhatsapp
//   `;

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }
export function getanalysiscardsCountMdl(data, callback) {
  console.log(data, 668);
  const cntxtDtls = "in getanalysiscardsCountMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND temple_id = ?";
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  } else if (data.front_temple_id == 0) {
    templeId = "";
    value = [];
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `
    SELECT 
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and  order_from IN (0, 1) ${templeId}) AS dharshanamtotal,
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0  and order_from = 1  ${templeId}) AS dharshanamkiosk,
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS dharshanamwhatsapp,

      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS prasadamtotal,
      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS prasadankiosk,
      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS prasadamwhatsapp,

      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS sevatotal,
      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS sevakiosk,
      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS sevawhatsapp,

      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS tonsuretotal,
      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS tonsurekiosk,
      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS tonsurewhatsapp,

      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS ehunditotal,
      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS ehundikiosk,
      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS ehundiwhatsapp,

      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaydarshnamtotal,
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaydarshnamkiosk,
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaydarshnamwhatsapp,

      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND booking_date = '${today}' ${templeId}) AS todayprasadamtotal,
      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND booking_date = '${today}'  ${templeId}) AS todayprasadamkiosk,
      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0  and order_from = 0 AND booking_date = '${today}' ${templeId}) AS todaypradsadamwhatsapp,

      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaysevatotal,
      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaysevakiosk,
      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaysevawhatsapp,

      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND tonsure_date = '${today}' ${templeId}) AS todaytonsuretotal,
      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND tonsure_date = '${today}'  ${templeId}) AS todaytonsurekiosk,
      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND tonsure_date = '${today}' ${templeId}) AS todaytonsurewhatsapp,

      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND donation_date = '${today}' ${templeId}) AS todayehunditotal,
      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0  and order_from = 1 AND donation_date = '${today}'  ${templeId}) AS todayehundikiosk,
      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND donation_date = '${today}' ${templeId}) AS todayehundiwhatsapp
  `;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

// export function getRevenuecardsCountMdl(data, callback) {
//   const cntxtDtls = "in getRevenuecardsCountMdl";
//   const IST = "Asia/Kolkata";
//   const today = moment().tz(IST).format("YYYY-MM-DD");
//   let value = [];
//   let templeId = ``;

//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = " AND temple_id = ?";
//     value = [
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id, data.temple_id, data.temple_id
//     ];
//   }
//   else if (data.role_type == 1 && data.front_temple_id) {
//     templeId = ` and temple_id=?`;
//     value = [
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id,
//       data.temple_id, data.temple_id, data.temple_id, data.temple_id
//     ];
//   }
//   else if (data.front_temple_id == 0) {
//     templeId = "";
//     value = [];
//   }
//   else {
//     value = [];
//   }

//   const QRY_TO_EXEC = `
//     SELECT
//       (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS dharshanamtotalsum,
//       (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS dharshanamkiosksum,
//       (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS dharshanamwhatsappsum,

//       (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS prasadamtotalsum,
//       (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS prasadankiosksum,
//       (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS prasadamwhatsappsum,

//       (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS sevatotalsum,
//       (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS sevakiosksum,
//       (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS sevawhatsappsum,

//       (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS tonsuretotalsum,
//       (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS tonsurekiosksum,
//       (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS tonsurewhatsappsum,

//       (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${templeId}) AS ehunditotalsum,
//       (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${templeId}) AS ehundikiosksum,
//       (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${templeId}) AS ehundiwhatsappsum,

//       (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaydarshnamtotalsum,
//       (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaydarshnamkiosksum,
//       (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaydarshnamwhatsappsum,

//       (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND booking_date = '${today}' ${templeId}) AS todayprasadamtotalsum,
//       (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND booking_date = '${today}'  ${templeId}) AS todayprasadamkiosksum,
//       (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND booking_date = '${today}' ${templeId}) AS todaypradsadamwhatsappsum,

//       (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaysevatotalsum,
//       (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaysevakiosksum,
//       (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaysevawhatsappsum,

//       (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND tonsure_date = '${today}' ${templeId}) AS todaytonsuretotalsum,
//       (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND tonsure_date = '${today}'  ${templeId}) AS todaytonsurekiosksum,
//       (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND tonsure_date = '${today}' ${templeId}) AS todaytonsurewhatsappsum,

//       (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) AND donation_date = '${today}' ${templeId}) AS todayehunditotalsum,
//       (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1 AND donation_date = '${today}'  ${templeId}) AS todayehundikiosksum,
//       (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 AND donation_date = '${today}' ${templeId}) AS todayehundiwhatsappsum
//   `;

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }
export function getRevenuecardsCountMdl(data, callback) {
  const cntxtDtls = "in getRevenuecardsCountMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND temple_id = ?";
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  } else if (data.front_temple_id == 0) {
    templeId = "";
    value = [];
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `
    SELECT 
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS dharshanamtotalsum,
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS dharshanamkiosksum,
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS dharshanamwhatsappsum,

      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS prasadamtotalsum,
      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS prasadankiosksum,
      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS prasadamwhatsappsum,

      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS sevatotalsum,
      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS sevakiosksum,
      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS sevawhatsappsum,

      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS tonsuretotalsum,
      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS tonsurekiosksum,
      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS tonsurewhatsappsum,

      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) ${templeId}) AS ehunditotalsum,
      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1  ${templeId}) AS ehundikiosksum,
      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 ${templeId}) AS ehundiwhatsappsum,


      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaydarshnamtotalsum,
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaydarshnamkiosksum,
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaydarshnamwhatsappsum,

      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND booking_date = '${today}' ${templeId}) AS todayprasadamtotalsum,
      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND booking_date = '${today}'  ${templeId}) AS todayprasadamkiosksum,
      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND booking_date = '${today}' ${templeId}) AS todaypradsadamwhatsappsum,

      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and  order_from IN (0, 1) AND seva_date = '${today}' ${templeId}) AS todaysevatotalsum,
      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND seva_date = '${today}'  ${templeId}) AS todaysevakiosksum,
      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND seva_date = '${today}' ${templeId}) AS todaysevawhatsappsum,

      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND tonsure_date = '${today}' ${templeId}) AS todaytonsuretotalsum,
      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND tonsure_date = '${today}'  ${templeId}) AS todaytonsurekiosksum,
      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND tonsure_date = '${today}' ${templeId}) AS todaytonsurewhatsappsum,

      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from IN (0, 1) AND donation_date = '${today}' ${templeId}) AS todayehunditotalsum,
      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 1 AND donation_date = '${today}'  ${templeId}) AS todayehundikiosksum,
      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS'  and d_in = 0 and order_from = 0 AND donation_date = '${today}' ${templeId}) AS todayehundiwhatsappsum
  `;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getDateWiseAnalysisCountMdl(data, callback) {
  console.log(data, 1325);

  const cntxtDtls = "in getDateWiseAnalysisCountMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let value = [];
  let templeId = ``;

  const fromDate = data.date1;
  const toDate = data.date2;

  let sevaDateFilter = "";
  let bookingDateFilter = "";
  let tonsureDateFilter = "";
  let donationDateFilter = "";

  if (fromDate && toDate) {
    sevaDateFilter = ` AND seva_date BETWEEN '${fromDate}' AND '${toDate}'`;
    bookingDateFilter = ` AND booking_date BETWEEN '${fromDate}' AND '${toDate}'`;
    tonsureDateFilter = ` AND tonsure_date BETWEEN '${fromDate}' AND '${toDate}'`;
    donationDateFilter = ` AND donation_date BETWEEN '${fromDate}' AND '${toDate}'`;
  }

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND temple_id = ?";
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  } else if (data.front_temple_id == 0) {
    templeId = "";
    value = [];
  } else {
    value = [(templeId = ``), (value = [])];
  }

  const QRY_TO_EXEC = `
    SELECT 
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1)  ${sevaDateFilter} ${templeId}) AS datewisedharshanamtotal,
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1   ${sevaDateFilter} ${templeId}) AS datewisedharshanamkiosk,
      (SELECT COUNT(*) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${sevaDateFilter} ${templeId}) AS datewisedharshanamwhatsapp,

      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${bookingDateFilter} ${templeId}) AS datewiseprasadamtotal,
      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1 ${bookingDateFilter}  ${templeId}) AS datewiseprasadankiosk,
      (SELECT COUNT(*) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${bookingDateFilter} ${templeId}) AS datewiseprasadamwhatsapp,

      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${sevaDateFilter} ${templeId}) AS datewisesevatotal,
      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1  ${sevaDateFilter} ${templeId}) AS datewisesevakiosk,
      (SELECT COUNT(*) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${sevaDateFilter} ${templeId}) AS datewisesevawhatsapp,

      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from IN (0, 1) ${tonsureDateFilter} ${templeId}) AS datewisetonsuretotal,
      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 1  ${tonsureDateFilter} ${templeId}) AS datewisetonsurekiosk,
      (SELECT COUNT(*) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND  order_from = 0 ${tonsureDateFilter} ${templeId}) AS datewisetonsurewhatsapp,

      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${donationDateFilter}  ${templeId}) AS datewiseehunditotal,
      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1  ${donationDateFilter} ${templeId}) AS datewiseehundikiosk,
      (SELECT COUNT(*) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${donationDateFilter} ${templeId}) AS datewiseehundiwhatsapp,

      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${sevaDateFilter} ${templeId}) AS datewisedharshanamtotalsum,
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1  ${sevaDateFilter} ${templeId}) AS datewisedharshanamkiosksum,
      (SELECT SUM(total_amount) FROM e_darshnam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND  order_from = 0 ${sevaDateFilter} ${templeId}) AS datewisedharshanamwhatsappsum,

      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${bookingDateFilter} ${templeId}) AS datewiseprasadamtotalsum,
      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1 ${bookingDateFilter}  ${templeId}) AS datewiseprasadankiosksum,
      (SELECT SUM(total_amount) FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${bookingDateFilter} ${templeId}) AS datewiseprasadamwhatsappsum,

      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${sevaDateFilter} ${templeId}) AS datewisesevatotalsum,
      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1  ${sevaDateFilter} ${templeId}) AS datewisesevakiosksum,
      (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${sevaDateFilter} ${templeId}) AS datewisesevawhatsappsum,

      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${tonsureDateFilter} ${templeId}) AS datewisetonsuretotalsum,
      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1  ${tonsureDateFilter} ${templeId}) AS datewisetonsurekiosksum,
      (SELECT SUM(total_amount) FROM e_tonsure_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${tonsureDateFilter} ${templeId}) AS datewisetonsurewhatsappsum,

      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from IN (0, 1) ${donationDateFilter} ${templeId}) AS datewiseehunditotalsum,
      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 1  ${donationDateFilter} ${templeId}) AS datewiseehundikiosksum,
      (SELECT SUM(total_amount) FROM e_hundi_orders WHERE payment_status = 'SUCCESS' AND d_in = 0 AND order_from = 0 ${donationDateFilter} ${templeId}) AS datewiseehundiwhatsappsum
  `;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getdharshanamtypecountMdl(data, callback) {
  const cntxtDtls = "in getdharshanamtypecountMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND d.temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `SELECT m.darshan_name_english as name,count(d.darshanam_id) as cnt from e_darshan_master as m join e_darshnam_orders as d on d.darshanam_id=m.id where m.d_in=0 and d.payment_status="SUCCESS"  ${templeId} group by d.darshanam_id;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getnextdharshanamtypecountMdl(data, callback) {
  const cntxtDtls = "in getnextdharshanamtypecountMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND o.temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `SELECT 
    d_dates.seva_date,
    m.darshan_name_english as name,
    COALESCE(COUNT(o.darshanam_id), 0) AS cnt
FROM 
    (SELECT DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30')) + INTERVAL seq DAY AS seva_date
     FROM (
         SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
         SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
     ) AS seq_table
    ) AS d_dates
CROSS JOIN e_darshan_master AS m
LEFT JOIN e_darshnam_orders AS o
    ON o.darshanam_id = m.id
    AND o.payment_status = 'SUCCESS'
    AND o.seva_date = d_dates.seva_date
WHERE m.d_in = 0  ${templeId}
GROUP BY m.darshan_name_english, d_dates.seva_date
ORDER BY d_dates.seva_date, m.darshan_name_english;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getsevatypescountMdl(data, callback) {
  const cntxtDtls = "in getsevatypescountMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND b.temple_id = ?";
    value = [data.temple_id];
  } else {
    // value = [];
    ((templeId = ``), (value = []));
  }

  const QRY_TO_EXEC = `SELECT 
  a.seva_type_name AS name,
  COUNT(b.id) AS cnt
FROM e_seva_types AS a 
JOIN e_seva_orders AS b 
  ON a.id = b.seva_id 
  JOIN e_seva_master as c ON 
  c.seva_type = a.id
WHERE a.d_in = 0 
  AND b.payment_status = 'SUCCESS'  ${templeId} GROUP by b.seva_id;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getprasadamtypecountMdl(data, callback) {
  const cntxtDtls = "in getprasadamtypecountMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND m.temple_id = ?";
    value = [data.temple_id];
  }

  const QRY_TO_EXEC = `select name_in_english as name,count(p.id) as cnt from e_prasadam_master as m join e_prasadam_orders_items as o on m.prasadam_id=o.prasadam_id join e_prasadam_orders as p on p.id=o.main_id where p.payment_status="SUCCESS"  ${templeId} group by o.prasadam_id;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function gettonsuretypesdataMdl(data, callback) {
  const cntxtDtls = "in gettonsuretypesdataMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND o.temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `SELECT 
    JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, '].tonsure_id'))) AS tonsure_id,
    JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, '].name_in_english'))) AS name,
    COUNT(*) AS cnt
FROM e_tonsure_orders o
JOIN (
    SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
    SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL 
    SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
) n
WHERE o.payment_status = 'SUCCESS' ${templeId}
AND JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, ']')) IS NOT NULL
GROUP BY tonsure_id, name
ORDER BY cnt DESC;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getnextsevendaystypecountMdl(data, callback) {
  const cntxtDtls = "in getnextsevendaystypecountMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND o.temple_id = ?";
    value = [data.temple_id];
  } else {
    // value = [];
    ((templeId = ``), (value = []));
  }

  const QRY_TO_EXEC = `SELECT 
    d_dates.seva_date,
    m.seva_type_name as name,
    COALESCE(COUNT(o.seva_id), 0) AS cnt
FROM 
    (SELECT DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30')) + INTERVAL seq DAY AS seva_date
     FROM (
         SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
         SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
     ) AS seq_table
    ) AS d_dates
CROSS JOIN e_seva_types AS m
LEFT JOIN e_seva_orders AS o
    ON o.seva_id = m.id
    AND o.payment_status = 'SUCCESS'
    AND o.seva_date = d_dates.seva_date
WHERE m.d_in = 0  ${templeId}
GROUP BY m.seva_type_name, d_dates.seva_date
ORDER BY d_dates.seva_date, m.seva_type_name;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getnextsevendaystonsuretypesdataMdl(data, callback) {
  const cntxtDtls = "in getnextsevendaystonsuretypesdataMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND o.temple_id = ?";
    value = [data.temple_id, data.temple_id]; // because temple filter used twice
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `
SELECT 
    d.seva_date,
    c.name,
    COALESCE(COUNT(jt.tonsure_id), 0) AS cnt
FROM 
(
    SELECT DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30')) + INTERVAL seq DAY AS seva_date
    FROM (
        SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
    ) seq_table
) d

CROSS JOIN
(
    SELECT DISTINCT
        JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, '].name_in_english'))) AS name
    FROM e_tonsure_orders o
    JOIN (
        SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL 
        SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
    ) n
    WHERE o.payment_status = 'SUCCESS'
    ${templeId}
    AND JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, ']')) IS NOT NULL
) c

LEFT JOIN
(
    SELECT 
        o.tonsure_date,
        o.temple_id,
        JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, '].tonsure_id'))) AS tonsure_id,
        JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, '].name_in_english'))) AS name
    FROM e_tonsure_orders o
    JOIN (
        SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL 
        SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
    ) n
    WHERE o.payment_status = 'SUCCESS'
    AND JSON_EXTRACT(o.tonsure_dtl, CONCAT('$[', n.n, ']')) IS NOT NULL
    ${templeId}
) jt
ON jt.tonsure_date = d.seva_date
AND jt.name = c.name

GROUP BY d.seva_date, c.name
ORDER BY d.seva_date, c.name
`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getnextsevendaysprasadamMdl(data, callback) {
  const cntxtDtls = "in getnextsevendaysprasadamMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND p.temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `SELECT 
    d_dates.order_date as seva_date,
    m.name_in_english AS name,
    COALESCE(COUNT(p.id), 0) AS cnt
FROM
(
    SELECT CURRENT_DATE + INTERVAL seq DAY AS order_date
    FROM (
        SELECT 0 seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL
        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
    ) seq_tbl
) d_dates
CROSS JOIN e_prasadam_master m
LEFT JOIN e_prasadam_orders_items o
    ON o.prasadam_id = m.prasadam_id
LEFT JOIN e_prasadam_orders p
    ON p.id = o.main_id
    AND p.payment_status = 'SUCCESS'
    ${templeId}
    AND DATE(p.booking_date) = d_dates.order_date
GROUP BY d_dates.order_date, m.prasadam_id, m.name_in_english
ORDER BY d_dates.order_date, m.name_in_english`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

// export function getlasttendaysprasadamMdl(data, callback) {
//   const cntxtDtls = "in getlasttendaysprasadamMdl";
//   let value = [];
//   let templeId = ``;

//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = " AND m.temple_id = ?";
//     value = [
//       data.temple_id];
//   } else {
//     value = [];
//   }

//   const QRY_TO_EXEC = `SELECT
//     d_dates.order_date as date,
//     m.name_in_english AS name,
//     COALESCE(COUNT(p.id), 0) AS cnt
// FROM
// (
//     SELECT CURRENT_DATE - INTERVAL seq DAY AS order_date
//     FROM (
//         SELECT 0 seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL
//         SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL
//         SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
//     ) seq_tbl
// ) d_dates
// CROSS JOIN e_prasadam_master m
// LEFT JOIN e_prasadam_orders_items o
//     ON o.prasadam_id = m.prasadam_id
// LEFT JOIN e_prasadam_orders p
//     ON p.id = o.main_id
//     AND p.payment_status = 'SUCCESS'
//     ${templeId}
//     AND DATE(p.booking_date) = d_dates.order_date
// GROUP BY d_dates.order_date, m.prasadam_id, m.name_in_english
// ORDER BY d_dates.order_date ASC, m.name_in_english;
// `;

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }

export function getlasttendaysprasadamMdl(data, callback) {
  const cntxtDtls = "in getlasttendaysprasadamMdl";
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND m.temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }
  const QRY_TO_EXEC = `SELECT 
    DATE(p.booking_date) AS date,
    m.name_in_english AS name,
    COUNT(p.id) AS cnt
FROM e_prasadam_orders p
JOIN e_prasadam_orders_items o 
    ON o.main_id = p.id
JOIN e_prasadam_master m 
    ON m.prasadam_id = o.prasadam_id
WHERE p.payment_status = 'SUCCESS' and o.d_in = 0 and p.d_in = 0 and m.d_in = 0
${templeId}
AND DATE(p.booking_date) >= CURRENT_DATE - INTERVAL 9 DAY
GROUP BY DATE(p.booking_date), m.prasadam_id, m.name_in_english
ORDER BY DATE(p.booking_date) ASC, m.name_in_english;
`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getaccommodationdataMdl(data, callback) {
  console.log(data, 1027);
  var cntxtDtls = "in getaccommodationdataMdl";
  let templeId;
  let value;
  let date;
  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    value = [data.temple_id];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    value = [data.temple_id];
  } else {
    templeId = ``;
    value = [];
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(booking_date) >= ? AND DATE(booking_date) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(booking_date) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(booking_date) <= ?`;
    value.push(data.date1);
  } else {
    date = ``;
  }

  let orderFrom = "";
  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    value.push(Number(data.order_from));
  } else {
    orderFrom = ``;
  }

  var QRY_TO_EXEC = `SELECT 
    booking_date,
    COUNT(*) AS total_accommodation,
    SUM(total_amount) AS total_amount
FROM e_room_orders
WHERE d_in = '0'  and payment_status="SUCCESS"  ${templeId} ${date} ${orderFrom}
GROUP BY booking_date
ORDER BY booking_date ASC;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getDetailsAccommodationByDateMdl(data, callback) {
  var cntxtDtls = "in getDetailsAccommodationByDateMdl";

  const params = [data.formattedDate];
  let templeId;
  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and e.temple_id=?`;
    params.push(data.temple_id);
  } else {
    templeId = ``;
  }

  let orderFrom = "";

  if (data.from.order_from !== undefined && data.from.order_from !== "" && Number(data.from.order_from) !== 2) {
    orderFrom = ` AND e.order_from = ?`;
    params.push(Number(data.from.order_from));
  }

  let QRY_TO_EXEC = `SELECT e.*,es.room_type,es.no_of_rooms,es.persons_allowed FROM e_room_orders as e LEFT join e_room_sub as es on e.room_category_id=es.id WHERE e.booking_date = ? and e.d_in=0  and e.payment_status="SUCCESS" ${templeId}  ${orderFrom}`;

  if (data.filterParams) {
    if (data.filterParams.verify_ind !== undefined) {
      QRY_TO_EXEC += ` AND verify_ind = ?`;
      params.push(data.filterParams.verify_ind);
    }
  }

  QRY_TO_EXEC += ` ORDER BY e.id DESC;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getnextsevendaysdatesofeHundiMdl(data, callback) {
  const cntxtDtls = "in getnextsevendaysdatesofeHundiMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let params = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    params.push(data.temple_id);
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    params.push(data.front_temple_id);
  } else {
    templeId = ``;
  }

  const QRY_TO_EXEC = `SELECT 
    DATE_FORMAT(CONVERT_TZ(donation_date,'+00:00','+05:30'), '%Y-%m-%d') AS donation_date,
    COUNT(id) AS daily_count
FROM e_hundi_orders
WHERE donation_date >= CURDATE() - INTERVAL 6 DAY
  AND donation_date <= CURDATE() 
  AND payment_status="SUCCESS"   ${templeId}
GROUP BY donation_date;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
  }
}

export function totaldonationsofeHundiMdl(data, callback) {
  const cntxtDtls = "in totaldonationsofeHundiMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let params = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    params.push(data.temple_id);
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    params.push(data.front_temple_id);
  } else {
    templeId = ``;
  }

  const QRY_TO_EXEC = ` SELECT
      MONTH(CONVERT_TZ(donation_date,'+00:00','+05:30')) AS month_no,
      MONTHNAME(CONVERT_TZ(donation_date,'+00:00','+05:30')) AS month_name,
      SUM(total_amount) AS total
    FROM e_hundi_orders
    WHERE payment_status = 'SUCCESS'
      AND YEAR(CONVERT_TZ(donation_date,'+00:00','+05:30')) = YEAR(CURDATE())
      ${templeId}
    GROUP BY month_no
    ORDER BY month_no;
`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
  }
}

export function getdharshanamMdl(data, callback) {
  console.log(data, 46);
  var cntxtDtls = "in getdharshanamMdl";
  let templeId;
  let date;
  let value;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and a.temple_id=?`;
    value = [data.temple_id];
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and a.temple_id=?`;
    value = [data.temple_id];
  } else {
    templeId = ``;
    value = [];
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(a.seva_date ) >= ? AND DATE(a.seva_date ) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(a.seva_date ) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(a.seva_date ) <= ?`;
    value.push(data.date2);
  } else {
    date = ``;
  }

  let orderFrom = "";
  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND a.order_from = ?`;
    value.push(Number(data.order_from));
  } else {
    orderFrom = ``;
  }

  var QRY_TO_EXEC = `SELECT 
    a.seva_date,
    COUNT(*) AS total_darshanam,
    SUM(CASE WHEN a.verify_ind = 0 THEN 1 ELSE 0 END) AS darshanam,
    SUM(CASE WHEN a.verify_ind = 1 THEN 1 ELSE 0 END) AS not_darshanam,    
    SUM(a.total_amount) AS total_amount,
    SUM(a.no_persons) AS peopleCount

FROM e_darshnam_orders AS a
LEFT JOIN e_darshan_master AS b 
    ON a.darshanam_id = b.id 
WHERE a.d_in = '0'
  AND a.payment_status = "SUCCESS"  ${templeId} ${date} ${orderFrom}
GROUP BY a.seva_date
ORDER BY a.seva_date ASC;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

// export function getdharshanamBreakupPointsMdl(data, callback) {
//   console.log(data, 46);
//   var cntxtDtls = "in getdharshanamMdl";
//   let templeId
//   let date;
//   let value;

//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = ` and a.temple_id=?`
//     value = [data.temple_id];
//   }
//   else if (data.role_type == 1 && data.front_temple_id) {
//     templeId = ` and a.temple_id=?`
//     value = [data.temple_id];
//   }
//   else {
//     templeId = ``
//     value = [];
//   }

//   if (data.date1 && data.date2) {
//     date = ` AND DATE(a.seva_date ) >= ? AND DATE(a.seva_date ) <= ?`;
//     value.push(data.date1, data.date2);
//   } else if (data.date1) {
//     date = ` AND DATE(a.seva_date ) >= ?`;
//     value.push(data.date1);
//   } else if (data.date2) {
//     date = ` AND DATE(a.seva_date ) <= ?`;
//     value.push(data.date2);
//   } else {
//     date = ``
//   }

//   let orderFrom = '';
//   if (data.order_from !== undefined && data.order_from !== '' && Number(data.order_from) !== 2) {
//     orderFrom = ` AND a.order_from = ?`;
//     value.push(Number(data.order_from));
//   }
//   else {
//     orderFrom = ``;
//   }

//   var QRY_TO_EXEC = `SELECT COUNT(a.darshanam_id) AS count, b.darshan_name_english FROM e_darshnam_orders a JOIN e_darshan_master b  ON a.darshanam_id = b.id WHERE a.d_in = '0'
//   AND a.payment_status = "SUCCESS" ${templeId} ${date} ${orderFrom} GROUP BY a.darshanam_id, b.darshan_name_english ORDER BY count DESC LIMIT 4;`;

//   if (callback && typeof callback == "function") {
//     sqlinjection(
//       MySQLConPool,
//       QRY_TO_EXEC,
//       value,
//       cntxtDtls,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// }

export function getdharshanamBreakupPointsMdl(data, callback) {
  var cntxtDtls = "in getdharshanamMdl";
  let value = [];
  let templeId;
  let date;
  let orderFrom = "";

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and a.temple_id=?`;
    value.push(data.temple_id);
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and a.temple_id=?`;
    value.push(data.front_temple_id);
  } else {
    templeId = ``;
  }

  if (data.date1 && data.date2) {
    date = ` AND DATE(a.seva_date) >= ? AND DATE(a.seva_date) <= ?`;
    value.push(data.date1, data.date2);
  } else if (data.date1) {
    date = ` AND DATE(a.seva_date) >= ?`;
    value.push(data.date1);
  } else if (data.date2) {
    date = ` AND DATE(a.seva_date) <= ?`;
    value.push(data.date2);
  } else {
    // Default to today
    date = ` AND DATE(a.seva_date) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
  }

  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND a.order_from = ?`;
    value.push(Number(data.order_from));
  } else {
    orderFrom = ``;
  }

  var QRY_TO_EXEC = `SELECT 
    COUNT(a.darshanam_id) AS count,
    b.darshan_name_english,
    a.seva_date
  FROM e_darshnam_orders a
  JOIN e_darshan_master b 
    ON a.darshanam_id = b.id
  WHERE a.d_in = '0'
    AND a.payment_status = 'SUCCESS'
    ${templeId}
    ${date}
    ${orderFrom}
  GROUP BY a.darshanam_id, b.darshan_name_english, a.seva_date
  ORDER BY count DESC
  LIMIT 4;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
}

// export function getDetailsDarshanamByDateMdl(data, callback) {
//   console.log(data, 46);
//   var cntxtDtls = "in getDetailsDarshanamByDateMdl";
//   const params = [data.formattedDate,];
//   let templeId;
//   let value;
//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = ` and d.temple_id=?`
//     params.push(data.temple_id);
//   }
//   else if (data.role_type == 1 && data.from.front_temple_id) {
//     templeId = ` and d.temple_id=?`;
//     params.push(data.from.front_temple_id);
//   } else {
//     templeId = ``
//   }

//   let orderFrom = '';
//   if (data.from.order_from !== undefined && data.from.order_from !== '' && Number(data.from.order_from) !== 2) {
//     orderFrom = ` AND order_from = ?`;
//     params.push(Number(data.from.order_from));

//   }
//   else {
//     orderFrom = ``;
//   }

//   let QRY_TO_EXEC = `SELECT d.*,m.darshan_name_english FROM e_darshnam_orders as d join e_darshan_master as m on m.id=d.darshanam_id WHERE d.seva_date = ? and d.d_in=0  and d.payment_status="SUCCESS" ${templeId}  ${orderFrom}`;

//   if (data.filterParams) {
//     if (data.filterParams.verify_ind !== undefined) {
//       QRY_TO_EXEC += ` AND verify_ind = ?`;
//       params.push(data.filterParams.verify_ind);
//     }
//   }

//   QRY_TO_EXEC += ` ORDER BY d.id DESC;`;

//   if (callback && typeof callback == "function") {
//     sqlinjection(
//       MySQLConPool,
//       QRY_TO_EXEC,
//       params,
//       cntxtDtls,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// }
export function getDetailsDarshanamByDateMdl(data, callback) {
  console.log(data, 46);
  var cntxtDtls = "in getDetailsDarshanamByDateMdl";

  let params = [data.formattedDate];
  let QRY_TO_EXEC;
  let templeId;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and d.temple_id=?`;
    params.push(data.temple_id);
  } else if (data.role_type == 1 && data.from.front_temple_id) {
    templeId = ` and d.temple_id=?`;
    params.push(data.from.front_temple_id);
  } else {
    templeId = ``;
  }

  let orderFrom = "";
  if (data.from.order_from !== undefined && data.from.order_from !== "" && Number(data.from.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    params.push(Number(data.from.order_from));
  }

  if (data.from.date1 && data.from.date2) {
    QRY_TO_EXEC = `
      SELECT d.*, m.darshan_name_english 
      FROM e_darshnam_orders as d 
      JOIN e_darshan_master as m 
      ON m.id = d.darshanam_id 
      WHERE DATE(d.seva_date) >= ? 
        AND DATE(d.seva_date) <= ? 
        AND d.d_in = 0  
        AND d.payment_status="SUCCESS" 
        ${templeId}  
        ${orderFrom}
    `;

    let rangeParams = [data.from.date1, data.from.date2];
    if (data.role_type == 10 || data.role_type == 14 || (data.role_type == 1 && data.from.front_temple_id)) {
      rangeParams.push(...params.slice(1)); // push temple/orderFrom params only
    }

    params = rangeParams;
  } else {
    QRY_TO_EXEC = `
      SELECT d.*, m.darshan_name_english 
      FROM e_darshnam_orders as d 
      JOIN e_darshan_master as m 
      ON m.id = d.darshanam_id 
      WHERE d.seva_date = ? 
        AND d.d_in = 0  
        AND d.payment_status="SUCCESS" 
        ${templeId}  
        ${orderFrom}
    `;
  }

  if (data.filterParams) {
    if (data.filterParams.verify_ind !== undefined) {
      QRY_TO_EXEC += ` AND verify_ind = ?`;
      params.push(data.filterParams.verify_ind);
    }
  }

  QRY_TO_EXEC += ` ORDER BY d.id DESC;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
  }
}

export function getDropdownNewTemplesNamesMdl(data, callback) {
  var cntxtDtls = "in getDropdownNewTemplesNamesMdl";
  var QRY_TO_EXEC = `SELECT * FROM e_temple_master where d_in = 0 and temple_mid IS Not NULL and temple_mid <> '' order by temple_org asc ; `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function geDistrictWiseTemplesdataMdl(data, callback) {
  var cntxtDtls = "in geDistrictWiseTemplesdataMdl";
  const { district_id } = data;
  var QRY_TO_EXEC = `SELECT * FROM e_temple_master  where d_in=0 and district_id =?  order by temple_name_english`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [district_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function getalltemplesdataInformationMdl(data, callback) {
  console.log(data, 668);
  const cntxtDtls = "in getalltemplesdataInformationMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let value = [];
  let templeId = ``;

  const fromDate = data.date1;
  const toDate = data.date2;

  let sevaDateFilter = "";
  let bookingDateFilter = "";
  let tonsureDateFilter = "";
  let donationDateFilter = "";

  if (fromDate && toDate) {
    sevaDateFilter = ` AND seva_date BETWEEN '${fromDate}' AND '${toDate}'`;
    bookingDateFilter = ` AND booking_date BETWEEN '${fromDate}' AND '${toDate}'`;
    tonsureDateFilter = ` AND tonsure_date BETWEEN '${fromDate}' AND '${toDate}'`;
    donationDateFilter = ` AND donation_date BETWEEN '${fromDate}' AND '${toDate}'`;
  } else {
    templeId = "";
    value = [];
  }

  if (data.role_type != 1) {
    templeId = " AND b.temple_id = ? ";
    value = [
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
      data.temple_id,
    ];
  }

  let orderFrom = "";
  if (data.order_from !== undefined && data.order_from !== "" && Number(data.order_from) !== 2) {
    orderFrom = ` AND order_from = ?`;
    value = [
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
      data.order_from,
    ];
  } else {
    orderFrom = ``;
  }

  const QRY_TO_EXEC = `
  SELECT 
    b.temple_id,
    b.temple_org,

    (SELECT COUNT(*) 
      FROM e_darshnam_orders 
      WHERE payment_status='SUCCESS' and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS dharshanamtotal,

    (SELECT SUM(total_amount) 
      FROM e_darshnam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS dharshanamtotalsum,

    (SELECT COUNT(*) 
      FROM e_prasadam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${bookingDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS prasadamtotal,

    (SELECT SUM(total_amount) 
      FROM e_prasadam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${bookingDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS prasadamtotalsum,

    (SELECT COUNT(*) 
      FROM e_seva_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS sevatotal,

    (SELECT SUM(total_amount) 
      FROM e_seva_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS sevatotalsum,

    (SELECT COUNT(*) 
      FROM e_tonsure_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${tonsureDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS tonsuretotal,

    (SELECT SUM(total_amount) 
      FROM e_tonsure_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${tonsureDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS tonsuretotalsum,

    (SELECT COUNT(*) 
      FROM e_hundi_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${donationDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS ehunditotal,

    (SELECT SUM(total_amount) 
      FROM e_hundi_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${donationDateFilter} ${templeId} ${orderFrom}
      AND temple_id=b.temple_id
    ) AS ehunditotalsum

  FROM e_temple_master b 
  WHERE b.d_in = 0
    AND b.temple_mid IS NOT NULL
    AND b.temple_mid <> ''
  ORDER BY 
  dharshanamtotal + prasadamtotal + sevatotal + tonsuretotal + ehunditotal DESC,
  dharshanamtotalsum + prasadamtotalsum + sevatotalsum + tonsuretotalsum + ehunditotalsum DESC
  `;
  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getalltemplesdataInformationByFilterMdl(data, callback) {
  console.log(data, 668);
  const cntxtDtls = "in getalltemplesdataInformationByFilterMdl";
  const IST = "Asia/Kolkata";
  let value = [];

  let sevaDateFilter = "";
  let bookingDateFilter = "";
  let tonsureDateFilter = "";
  let donationDateFilter = "";

  if (data.indicator === 1) {
    sevaDateFilter = ` AND DATE(seva_date) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
    bookingDateFilter = ` AND DATE(booking_date) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
    tonsureDateFilter = ` AND DATE(tonsure_date) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
    donationDateFilter = ` AND DATE(donation_date) = DATE(CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
  } else {
    value = [];
  }

  const QRY_TO_EXEC = `
  SELECT 
    b.temple_id,
    b.temple_org,

    (SELECT COUNT(*) 
      FROM e_darshnam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter}
      AND temple_id=b.temple_id
    ) AS dharshanamtotal,

    (SELECT SUM(total_amount) 
      FROM e_darshnam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter}
      AND temple_id=b.temple_id
    ) AS dharshanamtotalsum,

    (SELECT COUNT(*) 
      FROM e_prasadam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${bookingDateFilter}
      AND temple_id=b.temple_id
    ) AS prasadamtotal,

    (SELECT SUM(total_amount) 
      FROM e_prasadam_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${bookingDateFilter}
      AND temple_id=b.temple_id
    ) AS prasadamtotalsum,

    (SELECT COUNT(*) 
      FROM e_seva_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter} 
      AND temple_id=b.temple_id
    ) AS sevatotal,

    (SELECT SUM(total_amount) 
      FROM e_seva_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${sevaDateFilter} 
      AND temple_id=b.temple_id
    ) AS sevatotalsum,

    (SELECT COUNT(*) 
      FROM e_tonsure_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${tonsureDateFilter}
      AND temple_id=b.temple_id
    ) AS tonsuretotal,

    (SELECT SUM(total_amount) 
      FROM e_tonsure_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${tonsureDateFilter} 
      AND temple_id=b.temple_id
    ) AS tonsuretotalsum,

    (SELECT COUNT(*) 
      FROM e_hundi_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${donationDateFilter}
      AND temple_id=b.temple_id
    ) AS ehunditotal,

    (SELECT SUM(total_amount) 
      FROM e_hundi_orders 
      WHERE payment_status='SUCCESS'  and d_in = 0
      AND order_from IN (0,1)
      ${donationDateFilter}
      AND temple_id=b.temple_id
    ) AS ehunditotalsum

  FROM e_temple_master b
  WHERE b.d_in = 0
    AND b.temple_mid IS NOT NULL
    AND b.temple_mid <> ''
  ORDER BY  dharshanamtotal + prasadamtotal + sevatotal + tonsuretotal + ehunditotal DESC,
  dharshanamtotalsum + prasadamtotalsum + sevatotalsum + tonsuretotalsum + ehunditotalsum DESC
  `;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

// ANALYSIS STARTS

// Darshanam Analysis
export function getDarshanamOrderSourceMdl(data, callback) {
  console.log(data, 2795);

  let templeCondition = "";
  let params = [];

  if (data.front_temple_id && data.front_temple_id != "All") {
    templeCondition = "AND temple_id = ?";
    params.push(data.front_temple_id);
  }

  const QRY = `
SELECT
CASE
WHEN order_from = 0 THEN 'WhatsApp'
WHEN order_from = 1 THEN 'Kiosk'
ELSE 'Other'
END AS source,
COUNT(*) total_orders
FROM e_darshnam_orders
WHERE payment_status="SUCCESS"
${templeCondition}
GROUP BY order_from
`;

  sqlinjection(MySQLConPool, QRY, params, "getDarshanamOrderSourceMdl", callback);
}
export function getCardsDataMdl(data, callback) {
  console.log("Darshanam Cards: ", data);

  const cntxtDtls = "in getCardsDataMdl";
  const IST = "Asia/Kolkata";

  let QRY_TO_EXEC = "";
  let value = [];

  // Check if temple_id is undefined or not provided
  if (!data.front_temple_id) {
    // Get all data with only successful payments
    QRY_TO_EXEC = `

    SELECT
      -- Total metrics (only successful payments)
      COUNT(*) AS total_orders,
      IFNULL(SUM(total_amount), 0) AS total_revenue,
      COUNT(*) AS success_payments,
      0 AS pending_payments, -- No pending payments since we filter only SUCCESS
      
      -- Today's metrics (only successful payments)
      SUM(
          CASE 
          WHEN DATE(created_at) = CURDATE() 
          THEN 1 
          ELSE 0 
          END
      ) AS today_orders,
      
      IFNULL(SUM(
          CASE 
          WHEN DATE(created_at) = CURDATE() 
          THEN total_amount 
          ELSE 0 
          END
      ), 0) AS today_revenue

    FROM e_darshnam_orders
    WHERE payment_status = 'SUCCESS'

    `;

    value = []; // Empty array as no parameters needed
  } else {
    // Get data for specific temple
    QRY_TO_EXEC = `

    SELECT
      -- Total metrics
      COUNT(*) AS total_orders,
      IFNULL(SUM(
          CASE 
          WHEN payment_status='SUCCESS' 
          THEN total_amount 
          ELSE 0 
          END
      ),0) AS total_revenue,
      SUM(
          CASE 
          WHEN payment_status='SUCCESS' 
          THEN 1 
          ELSE 0 
          END
      ) AS success_payments,
      SUM(
          CASE 
          WHEN payment_status='PENDING' 
          THEN 1 
          ELSE 0 
          END
      ) AS pending_payments,
      
      -- Today's metrics (only successful payments)
      SUM(
          CASE 
          WHEN DATE(created_at) = CURDATE() 
          AND payment_status='SUCCESS'
          THEN 1 
          ELSE 0 
          END
      ) AS today_orders,
      
      IFNULL(SUM(
          CASE 
          WHEN DATE(created_at) = CURDATE() 
          AND payment_status='SUCCESS' 
          THEN total_amount 
          ELSE 0 
          END
      ),0) AS today_revenue

    FROM e_darshnam_orders
    WHERE temple_id = ?

    `;

    value = [data.front_temple_id];
  }

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}
export function getRevenueTrendMdl(data, callback) {
  const QRY = `

  SELECT 
  DATE(created_at) AS date,
  SUM(total_amount) AS revenue,
  COUNT(*) AS orders

  FROM e_darshnam_orders
  WHERE payment_status='SUCCESS'
  AND temple_id = ?
  AND DATE(created_at) >= CURDATE() - INTERVAL 11 DAY

  GROUP BY DATE(created_at)
  ORDER BY DATE(created_at)

  `;

  const value = [data.front_temple_id || 0 || data.temple_id];

  sqlinjection(MySQLConPool, QRY, value, "getRevenueTrend", callback);
}
export function getPaymentStatusMdl(data, callback) {
  const QRY = `
SELECT 
temple_id,
SUM(total_amount) AS revenue
FROM e_darshnam_orders
WHERE payment_status='SUCCESS'
GROUP BY temple_id
ORDER BY revenue DESC
LIMIT 10;
`;

  const value = [];
  // const value=[data. front_temple_id || 0||  data.temple_id];

  sqlinjection(MySQLConPool, QRY, value, "paymentStatus", callback);
}
export function getDarshanRevenueMdl(data, callback) {
  const QRY = `

SELECT
dm.darshan_name_english,
SUM(o.total_amount) AS revenue

FROM e_darshnam_orders o
LEFT JOIN e_darshan_master dm
ON o.darshanam_id = dm.id

WHERE o.payment_status='SUCCESS'
AND o.temple_id=?

GROUP BY dm.darshan_name_english
ORDER BY revenue DESC

`;

  const value = [data.front_temple_id || 0 || data.temple_id];

  sqlinjection(MySQLConPool, QRY, value, "darshanRevenue", callback);
}
export function getDarshanPopularityMdl(data, callback) {
  const QRY = `

SELECT
dm.darshan_name_english,
COUNT(o.id) AS bookings

FROM e_darshnam_orders o
LEFT JOIN e_darshan_master dm
ON o.darshanam_id = dm.id

WHERE o.temple_id = ? and o.payment_status="SUCCESS"

GROUP BY dm.darshan_name_english
ORDER BY bookings DESC

`;

  const value = [data.front_temple_id || 0 || data.temple_id];

  sqlinjection(MySQLConPool, QRY, value, "darshanPopularity", callback);
}
export function getGroupSizeMdl(data, callback) {
  const QRY = `

SELECT
no_persons,
COUNT(*) as bookings

FROM e_darshnam_orders
WHERE temple_id=?  and payment_status="SUCCESS"

GROUP BY no_persons
ORDER BY no_persons

`;

  const value = [data.front_temple_id || 0 || data.temple_id];

  sqlinjection(MySQLConPool, QRY, value, "groupSize", callback);
}

// Seva Analysis
export function getSevaOrderSourceMdl(data, callback) {
  console.log(data, 2411);

  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND temple_id = ? and d_in=0";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
CASE
WHEN order_from = 0 THEN 'WhatsApp'
WHEN order_from = 1 THEN 'Kiosk'
ELSE 'Other'
END AS source,
COUNT(*) total_orders
FROM e_seva_orders
WHERE payment_status="SUCCESS"
${templeCondition}
GROUP BY order_from
`;

  sqlinjection(MySQLConPool, QRY, params, "getSevaOrderSourceMdl", callback);
}
export function getSevaCardsDataMdl(data, callback) {
  console.log(data);

  const cntxtDtls = "in getSevaCardsDataMdl";

  let QRY_TO_EXEC = `
    SELECT 
      COUNT(id) AS total_orders,
      IFNULL(SUM(total_amount),0) AS total_revenue,
      SUM(CASE WHEN payment_status='SUCCESS' THEN 1 ELSE 0 END) AS success_payments,
      SUM(CASE WHEN payment_status='PENDING' THEN 1 ELSE 0 END) AS pending_payments,
      
      -- Today's orders and revenue
      SUM(CASE WHEN DATE(created_at) = CURDATE() AND payment_status='SUCCESS' THEN 1 ELSE 0 END) AS today_orders,
      SUM(CASE WHEN DATE(created_at) = CURDATE() AND payment_status='SUCCESS' THEN total_amount ELSE 0 END) AS today_revenue
    FROM e_seva_orders
    WHERE payment_status = 'SUCCESS' and d_in=0
  `;

  let value = [];

  // Add temple_id condition only if provided
  if (data.front_temple_id) {
    QRY_TO_EXEC += ` AND temple_id = ?`;
    value.push(data.front_temple_id);
  }

  if (callback && typeof callback === "function") {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}
export function getSevaRevenueTrendMdl(data, callback) {
  console.log(data, 2467);

  const QRY = `
    SELECT 
        DATE(created_at) date,
        SUM(total_amount) revenue
    FROM e_seva_orders
    WHERE temple_id = ?
        AND payment_status = 'SUCCESS' and d_in=0
        AND DATE(created_at) >= CURDATE() - INTERVAL 7 DAY
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
    `;

  sqlinjection(MySQLConPool, QRY, [data.front_temple_id || 0 || data.temple_id], "revenue trend", callback);
}
export function getBookingTrendMdl(data, callback) {
  const QRY = `
    SELECT 
        DATE(created_at) date,
        COUNT(id) bookings
    FROM e_seva_orders
    WHERE temple_id = ?  AND payment_status = 'SUCCESS' and d_in=0
        AND DATE(created_at) >= CURDATE() - INTERVAL 7 DAY
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
    `;

  sqlinjection(MySQLConPool, QRY, [data.front_temple_id || 0 || data.temple_id], "booking trend", callback);
}
export function getTopSevasMdl(data, callback) {
  const QRY = `
SELECT 
m.seva_name_english,
COUNT(o.id) total_bookings
FROM e_seva_orders o
JOIN e_seva_master m ON m.id = o.seva_id
WHERE o.temple_id = ?  AND o.payment_status = 'SUCCESS' and o.d_in=0
GROUP BY o.seva_id
ORDER BY total_bookings DESC
LIMIT 10
`;

  sqlinjection(MySQLConPool, QRY, [data.front_temple_id || 0 || data.temple_id], "top sevas", callback);
}
export function getTempleRevenueMdl(data, callback) {
  const templeId = data.front_temple_id || data.temple_id;

  const QRY = `
    SELECT 
        CASE 
            WHEN temple_id = ? THEN 'Selected Temple'
            ELSE 'Other Temples'
        END AS temple_group,
        SUM(total_amount) AS revenue,
        ROUND(SUM(total_amount) * 100.0 / (SELECT SUM(total_amount) FROM e_seva_orders WHERE payment_status = 'SUCCESS'), 2) AS share_percentage
    FROM e_seva_orders
    WHERE payment_status = 'SUCCESS' and d_in=0
    GROUP BY temple_group
    ORDER BY temple_group DESC
    `;

  sqlinjection(MySQLConPool, QRY, [templeId], "temple revenue", callback);
}
export function getGenderDistributionMdl(data, callback) {
  const QRY = `
SELECT 
gender,
COUNT(id) total
FROM e_seva_orders
WHERE temple_id = ?  AND payment_status = 'SUCCESS' and d_in=0
GROUP BY gender
`;

  sqlinjection(MySQLConPool, QRY, [data.front_temple_id || 0 || data.temple_id], "gender distribution", callback);
}
export function getMonthlyGrowthMdl(data, callback) {
  const QRY = `
SELECT 
DATE_FORMAT(created_at,'%Y-%m') month,
SUM(total_amount) revenue
FROM e_seva_orders
WHERE temple_id = ?
AND payment_status='SUCCESS' and d_in=0
GROUP BY month
ORDER BY month
`;

  sqlinjection(MySQLConPool, QRY, [data.front_temple_id || 0 || data.temple_id], "monthly growth", callback);
}
// temple dropdown
export function getTempleDropdownDataMdl(data, callback) {
  const cntxtDtls = "in getTempleDropdownDataMdl";

  const QRY_TO_EXEC = `
 SELECT 	temple_id,temple_name_english from  e_temple_master Where d_in=0;
  `;

  const value = [data.front_temple_id || 0 || data.temple_id];

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}
// 13-03-2026
export function getRevenueDistributionMdl(data, callback) {
  const QRY = `
SELECT 
tm.temple_name_english,
revenue_range,
revenue
FROM (

SELECT 
o.temple_id,
SUM(o.total_amount) AS revenue,

CASE
WHEN SUM(o.total_amount) < 50000 THEN '0-50K'
WHEN SUM(o.total_amount) < 100000 THEN '50K-1L'
WHEN SUM(o.total_amount) < 500000 THEN '1L-5L'
ELSE '5L+'
END AS revenue_range

FROM e_darshnam_orders o
WHERE o.payment_status='SUCCESS' and o.d_in=0
GROUP BY o.temple_id

) t

LEFT JOIN e_temple_master tm
ON t.temple_id = tm.temple_id

ORDER BY revenue DESC
`;

  sqlinjection(MySQLConPool, QRY, [], "getRevenueDistributionMdl", callback);
}
export function getMonthlyRevenueTrendMdl(data, callback) {
  console.log("drashanam Growth: ", data);

  let queryParams = [];
  let QRY = `
        SELECT 
            DATE_FORMAT(created_at,'%Y-%m') AS month,
            SUM(total_amount) AS revenue
        FROM e_darshnam_orders
        WHERE payment_status='SUCCESS' and d_in=0
    `;

  // Add temple filter if temple_id is provided
  if (data.front_temple_id && data.front_temple_id !== "all") {
    QRY += ` AND temple_id = ?`;
    queryParams.push(data.front_temple_id);
  }
  // If temple_id is 'all' or not provided, show all temples data

  QRY += `
        GROUP BY month
        ORDER BY month
    `;

  sqlinjection(MySQLConPool, QRY, queryParams, "getMonthlyRevenueTrendMdl", callback);
}
export function getTempleRevenueShareMdl(data, callback) {
  const QRY = `
SELECT 
o.temple_id,
tm.temple_name_english,
SUM(o.total_amount) AS revenue
FROM e_darshnam_orders o
LEFT JOIN e_temple_master tm 
ON o.temple_id = tm.temple_id
WHERE o.payment_status='SUCCESS' and o.d_in=0
GROUP BY o.temple_id
ORDER BY revenue DESC
LIMIT 5
`;

  sqlinjection(MySQLConPool, QRY, [], "getTempleRevenueShareMdl", callback);
}
export function getTopTempleRevenueMdl(data, callback) {
  const QRY = `
SELECT 
o.temple_id,
tm.temple_name_english,
SUM(o.total_amount) AS revenue
FROM e_darshnam_orders o
LEFT JOIN e_temple_master tm 
ON o.temple_id = tm.temple_id
WHERE o.payment_status='SUCCESS' and o.d_in=0
GROUP BY o.temple_id
ORDER BY revenue DESC
LIMIT 10
`;

  sqlinjection(MySQLConPool, QRY, [], "getTopTempleRevenueMdl", callback);
}
export function getTempleInsightsMdl(data, callback) {
  const QRY = `
SELECT

(SELECT tm.temple_name_english
 FROM e_darshnam_orders o
 JOIN e_temple_master tm ON o.temple_id=tm.temple_id
 WHERE o.payment_status='SUCCESS' and d_i n=0
 GROUP BY o.temple_id
 ORDER BY SUM(o.total_amount) DESC
 LIMIT 1) AS highest_revenue_temple,

(SELECT SUM(total_amount)
 FROM e_darshnam_orders
 WHERE payment_status='SUCCESS' 
 GROUP BY temple_id
 ORDER BY SUM(total_amount) DESC
 LIMIT 1) AS highest_revenue,

(SELECT tm.temple_name_english
 FROM e_darshnam_orders o
 JOIN e_temple_master tm ON o.temple_id=tm.temple_id
 WHERE o.payment_status='SUCCESS'
 GROUP BY o.temple_id
 ORDER BY SUM(o.total_amount) ASC
 LIMIT 1) AS lowest_revenue_temple,

(SELECT SUM(total_amount)
 FROM e_darshnam_orders
 WHERE payment_status='SUCCESS'
 GROUP BY temple_id
 ORDER BY SUM(total_amount) ASC
 LIMIT 1) AS lowest_revenue,

(SELECT tm.temple_name_english
 FROM e_darshnam_orders o
 JOIN e_temple_master tm ON o.temple_id=tm.temple_id
 GROUP BY o.temple_id
 ORDER BY COUNT(*) DESC
 LIMIT 1) AS highest_ticket_temple,

(SELECT COUNT(*)
 FROM e_darshnam_orders
 GROUP BY temple_id
 ORDER BY COUNT(*) DESC
 LIMIT 1) AS highest_ticket_count,

(SELECT tm.temple_name_english
 FROM e_darshnam_orders o
 JOIN e_temple_master tm ON o.temple_id=tm.temple_id
 GROUP BY o.temple_id
 ORDER BY COUNT(*) ASC
 LIMIT 1) AS lowest_ticket_temple,

(SELECT COUNT(*)
 FROM e_darshnam_orders
 GROUP BY temple_id
 ORDER BY COUNT(*) ASC
 LIMIT 1) AS lowest_ticket_count
`;

  sqlinjection(MySQLConPool, QRY, [], "getTempleInsightsMdl", callback);
}
export function getTemplePerformanceScatterMdl(data, callback) {
  const QRY = `
SELECT
o.temple_id,
tm.temple_name_english,
COUNT(*) AS tickets,
SUM(o.total_amount) AS revenue
FROM e_darshnam_orders o
LEFT JOIN e_temple_master tm
ON o.temple_id = tm.temple_id
WHERE o.payment_status='SUCCESS' and o.d_i n=0
GROUP BY o.temple_id
ORDER BY revenue DESC
LIMIT 20
`;

  sqlinjection(MySQLConPool, QRY, [], "getTemplePerformanceScatterMdl", callback);
}

// Prasadam Analysis

export function getOrderSourceDistributionMdl(data, callback) {
  console.log(data, 2795);

  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND temple_id = ?";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
CASE
WHEN order_from = 0 THEN 'WhatsApp'
WHEN order_from = 1 THEN 'Kiosk'
ELSE 'Other'
END AS source,
COUNT(*) total_orders
FROM e_prasadam_orders
WHERE payment_status = 'SUCCESS' and d_in=0
${templeCondition}
GROUP BY order_from
`;

  sqlinjection(MySQLConPool, QRY, params, "getOrderSourceDistributionMdl", callback);
}
export function getPrasadmCardsDataMdl(data, callback) {
  let templeCondition = "";
  let params = [];

  if (data.temple_id) {
    templeCondition = "AND temple_id = ? ";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
COUNT(*) AS total_orders,

SUM(total_amount) AS total_revenue,

SUM(CASE WHEN payment_status = 'SUCCESS' THEN 1 ELSE 0 END) AS success_payments,

SUM(CASE WHEN payment_status = 'PENDING' THEN 1 ELSE 0 END) AS pending_payments,

SUM(CASE WHEN DATE(booking_date) = CURDATE() THEN 1 ELSE 0 END) AS today_orders,

SUM(CASE WHEN DATE(booking_date) = CURDATE() THEN total_amount ELSE 0 END) AS today_revenue

FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' and d_in=0
${templeCondition}
`;

  sqlinjection(MySQLConPool, QRY, params, "getPrasadmCardsDataMdl", callback);
}
export function getPrasadamRevenueTrendMdl(data, callback) {
  console.log(data);

  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND temple_id=?";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
DATE(booking_date) date,
SUM(total_amount) revenue
FROM e_prasadam_orders
WHERE payment_status='SUCCESS' and d_in=0
${templeCondition}
GROUP BY DATE(booking_date)
ORDER BY date ASC
LIMIT 11
`;

  sqlinjection(MySQLConPool, QRY, params, "getPrasadamRevenueTrendMdl", callback);
}
export function getTopPrasadamMdl(data, callback) {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND o.temple_id=?";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
pm.name_in_english name,
COUNT(o.id) orders
FROM e_prasadam_orders o
LEFT JOIN e_prasadam_master pm
ON o.prasadam_id=pm.prasadam_id
WHERE o.payment_status='SUCCESS' and d_in=0
${templeCondition}
GROUP BY pm.prasadam_id
ORDER BY orders DESC
LIMIT 5
`;
  console.log(QRY);

  sqlinjection(MySQLConPool, QRY, params, "getTopPrasadamMdl", callback);
}
export function getPrasadamTempleRevenueShareMdl(data, callback) {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND o.temple_id=?";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
tm.temple_name_english temple_name,
SUM(o.total_amount) revenue,
ROUND(
(SUM(o.total_amount) /
(SELECT SUM(total_amount)
FROM e_prasadam_orders
WHERE payment_status='SUCCESS' and d_in=0
${data.temple_id && data.temple_id !== "All" ? "AND temple_id=?" : ""}
))*100,2
) percentage
FROM e_prasadam_orders o
LEFT JOIN e_temple_master tm
ON o.temple_id=tm.temple_id
WHERE o.payment_status='SUCCESS' and o.d_in=0
${templeCondition}
GROUP BY o.temple_id
ORDER BY revenue DESC
LIMIT 6
`;

  let finalParams = [...params];
  if (data.temple_id && data.temple_id !== "All") {
    finalParams.push(data.temple_id);
  }

  sqlinjection(MySQLConPool, QRY, finalParams, "getTempleRevenueShareMdl", callback);
}
export function getDailyOrdersMdl(data, callback) {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND temple_id=?";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
DATE(booking_date) date,
COUNT(*) orders
FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' and d_in=0
${templeCondition}
GROUP BY DATE(booking_date)
ORDER BY date ASC
LIMIT 10
`;

  sqlinjection(MySQLConPool, QRY, params, "getDailyOrdersMdl", callback);
}
export function getPrasadamRevenueDistributionMdl(data, callback) {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All") {
    templeCondition = "AND temple_id=?";
    params.push(data.temple_id);
  }

  const QRY = `
SELECT
CASE
WHEN total_amount < 100 THEN '0-100'
WHEN total_amount BETWEEN 100 AND 500 THEN '100-500'
WHEN total_amount BETWEEN 500 AND 1000 THEN '500-1000'
ELSE '1000+'
END range_value,
COUNT(*) count
FROM e_prasadam_orders WHERE payment_status = 'SUCCESS' and d_in=0
${templeCondition}
GROUP BY range_value
`;

  sqlinjection(MySQLConPool, QRY, params, "getRevenueDistributionMdl", callback);
}

// Tonsure Analysis
// export function getTonsureCardsDataMdl(data,callback){

// let cond = " WHERE d_in = 0 ";

// let params = [];

// if(data.temple_id){
// cond += " AND temple_id = ? ";
// params.push(data.temple_id);
// }

// const QRY = `

// SELECT
// COUNT(*) AS total_orders,

// SUM(total_amount) AS total_revenue,

// SUM(CASE WHEN payment_status='SUCCESS' THEN 1 ELSE 0 END)
// AS success_payments,

// SUM(CASE WHEN payment_status='PENDING' THEN 1 ELSE 0 END)
// AS pending_payments

// FROM e_tonsure_orders
// ${cond}

// `;

// sqlinjection(
// MySQLConPool,
// QRY,
// params,
// "getTonsureCardsDataMdl",
// callback
// );

// }

// export function tonsureDashboardAnalyticsMdl(data,callback){

// let templeCond="";
// let params=[];

// if(data.temple_id){
// templeCond=" AND o.temple_id=?";
// params.push(data.temple_id);
// }

// const queries=[

// /* KPI */
// `SELECT
// COUNT(*) total_orders,
// SUM(total_amount) total_revenue,
// SUM(CASE WHEN payment_status='SUCCESS' THEN 1 ELSE 0 END) success_payments,
// SUM(CASE WHEN payment_status='PENDING' THEN 1 ELSE 0 END) pending_payments
// FROM e_tonsure_orders
// WHERE d_in=0 ${templeCond}`,

// /* Daily Trend */
// `SELECT
// tonsure_date,
// COUNT(*) orders,
// SUM(total_amount) revenue
// FROM e_tonsure_orders o
// WHERE o.d_in=0 ${templeCond}
// GROUP BY tonsure_date
// ORDER BY tonsure_date`,

// /* Temple Orders */
// `SELECT
// t.temple_name_english,
// COUNT(o.id) orders
// FROM e_tonsure_orders o
// JOIN e_temple_master t
// ON t.temple_id=o.temple_id
// WHERE o.d_in=0 ${templeCond}
// GROUP BY o.temple_id
// ORDER BY orders DESC
// LIMIT 10`,

// /* Temple Revenue */
// `SELECT
// order_from,
// COUNT(*) total_orders
// FROM e_tonsure_orders
// WHERE d_in=0
// GROUP BY order_from`,

// /* Tonsure Services */
// `SELECT
// m.name_in_english,
// COUNT(o.id) orders
// FROM e_tonsure_orders o
// JOIN e_tonsure_master m
// ON m.tonsure_id=o.tonsure_id
// WHERE o.d_in=0 ${templeCond}
// GROUP BY o.tonsure_id
// ORDER BY orders DESC`,

// /* Payment Status */
// `SELECT
// payment_status,
// COUNT(*) total
// FROM e_tonsure_orders
// WHERE d_in=0 ${templeCond}
// GROUP BY payment_status`,

// /* District Orders */
// `SELECT
// t.district,
// COUNT(o.id) orders
// FROM e_tonsure_orders o
// JOIN e_temple_master t
// ON t.temple_id=o.temple_id
// WHERE o.d_in=0 ${templeCond}
// GROUP BY t.district
// ORDER BY orders DESC`

// ];

// MySQLConPool.getConnection(function(err,connection){

// if(err){
// callback(err,null);
// return;
// }

// let results={};

// connection.query(queries[0],params,function(err,r1){
// if(err){callback(err,null);return;}

// results.kpi=r1;

// connection.query(queries[1],params,function(err,r2){
// if(err){callback(err,null);return;}

// results.daily=r2;

// connection.query(queries[2],params,function(err,r3){
// if(err){callback(err,null);return;}

// results.temple_orders=r3;

// connection.query(queries[3],params,function(err,r4){
// if(err){callback(err,null);return;}

// results.temple_revenue=r4;

// connection.query(queries[4],params,function(err,r5){
// if(err){callback(err,null);return;}

// results.services=r5;

// connection.query(queries[5],params,function(err,r6){
// if(err){callback(err,null);return;}

// results.payment=r6;

// connection.query(queries[6],params,function(err,r7){

// connection.release();

// if(err){
// callback(err,null);
// return;
// }

// results.district=r7;

// callback(null,results);

// });

// });
// });
// });
// });
// });
// });
// })}

// export function tonsureDashboardAnalyticsMdl(data,callback){

// let templeCond="";
// let params=[];

// if(data.front_temple_id){
// templeCond=" AND o.temple_id=? ";
// params.push(data.front_temple_id);
// }

// const queries={};

// /* KPI CARDS (NO PAYMENT FILTER) */

// // queries.kpi=`
// // SELECT
// // COUNT(*) total_orders,
// // SUM(total_amount) total_revenue,
// // SUM(CASE WHEN payment_status='SUCCESS' THEN 1 ELSE 0 END) success_payments,
// // SUM(CASE WHEN payment_status='PENDING' THEN 1 ELSE 0 END) pending_payments
// // FROM e_tonsure_orders o
// // WHERE o.d_in=0
// // ${templeCond}
// // `;
// queries.kpi = `
// SELECT
// COUNT(*) AS total_orders,

// IFNULL(SUM(total_amount),0) AS total_revenue,

// SUM(
// CASE
// WHEN DATE(o.tonsure_date)=CURDATE()
// THEN 1 ELSE 0 END
// ) AS today_orders,

// SUM(
// CASE
// WHEN DATE(o.tonsure_date)=CURDATE()
// AND o.payment_status='SUCCESS'
// THEN o.total_amount ELSE 0 END
// ) AS today_revenue

// FROM e_tonsure_orders o
// WHERE o.d_in=0 and payment_status = 'SUCCESS'
// ${templeCond}
// `;
// /* DAILY TREND (SUCCESS ONLY) */

// queries.daily=`
// SELECT
// tonsure_date,
// COUNT(*) orders,
// SUM(total_amount) revenue
// FROM e_tonsure_orders o
// WHERE o.d_in=0
// AND o.payment_status='SUCCESS'
// ${templeCond}
// GROUP BY tonsure_date
// ORDER BY tonsure_date
// `;

// /* TOP TONSURE SERVICES (SUCCESS ONLY) */

// queries.services=`
// SELECT
// m.name_in_english,
// COUNT(o.id) orders
// FROM e_tonsure_orders o
// JOIN e_tonsure_master m
// ON m.temple_id=o.temple_id
// WHERE o.d_in=0
// AND o.payment_status='SUCCESS'
// ${templeCond}
// GROUP BY o.tonsure_id
// ORDER BY orders DESC
// LIMIT 10
// `;

// /* DISTRICT ORDERS (SUCCESS ONLY) */

// queries.district=`
// SELECT
// t.district,
// COUNT(o.id) orders
// FROM e_tonsure_orders o
// JOIN e_temple_master t
// ON t.temple_id=o.temple_id
// WHERE o.d_in=0
// AND o.payment_status='SUCCESS'
// ${templeCond}
// GROUP BY t.district
// ORDER BY orders DESC
// `;

// /* ORDER SOURCE (SUCCESS ONLY) */

// queries.order_source=`
// SELECT
// o.order_from,
// COUNT(*) total_orders
// FROM e_tonsure_orders o
// WHERE o.d_in=0
// AND o.payment_status='SUCCESS'
// ${templeCond}
// GROUP BY o.order_from
// `;

// MySQLConPool.getConnection(function(err,connection){

// if(err){
// callback(err,null);
// return;
// }

// let result={};

// /* KPI */

// connection.query(queries.kpi,params,function(err,r1){

// if(err){connection.release();callback(err,null);return;}

// result.kpi=r1;

// /* DAILY */

// connection.query(queries.daily,params,function(err,r2){

// if(err){connection.release();callback(err,null);return;}

// result.daily=r2;

// /* SERVICES */

// connection.query(queries.services,params,function(err,r3){

// if(err){connection.release();callback(err,null);return;}

// result.services=r3;

// /* DISTRICT */

// connection.query(queries.district,params,function(err,r4){

// if(err){connection.release();callback(err,null);return;}

// result.district=r4;

// /* ORDER SOURCE */

// connection.query(queries.order_source,params,function(err,r5){

// connection.release();

// if(err){
// callback(err,null);
// return;
// }

// result.order_source=r5;

// callback(null,result);

// });

// });

// });

// });

// });
// })
// }
export function tonsureDashboardAnalyticsMdl(data, callback) {
  let templeCond = "";
  let params = [];

  if (data.front_temple_id) {
    templeCond = " AND o.temple_id=? ";
    params.push(data.front_temple_id);
  }

  const queries = {};

  /* KPI CARDS (SUCCESS ONLY) */
  queries.kpi = `
    SELECT
      COUNT(*) AS total_orders,
      IFNULL(SUM(total_amount),0) AS total_revenue,
      SUM(CASE WHEN DATE(o.tonsure_date) = CURDATE() THEN 1 ELSE 0 END) AS today_orders,
      IFNULL(SUM(CASE WHEN DATE(o.tonsure_date) = CURDATE() THEN o.total_amount ELSE 0 END),0) AS today_revenue
    FROM e_tonsure_orders o
    WHERE o.d_in = 0 
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
  `;

  /* DAILY TREND (SUCCESS ONLY) */
  queries.daily = `
    SELECT
      tonsure_date,
      COUNT(*) AS orders,
      SUM(total_amount) AS revenue
    FROM e_tonsure_orders o
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY tonsure_date
    ORDER BY tonsure_date DESC
    LIMIT 30
  `;

  /* TOP TONSURE SERVICES (SUCCESS ONLY) */
  queries.services = `
    SELECT
      m.name_in_english,
      COUNT(o.id) AS orders,
      SUM(o.total_amount) AS revenue
    FROM e_tonsure_orders o
    JOIN e_tonsure_master m ON JSON_EXTRACT(o.tonsure_dtl, '$[0].tonsure_id') = m.tonsure_id
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY m.name_in_english
    ORDER BY orders DESC
    LIMIT 10
  `;

  /* DISTRICT ORDERS (SUCCESS ONLY) */
  queries.district = `
    SELECT
      t.district,
      COUNT(o.id) AS orders,
      SUM(o.total_amount) AS revenue
    FROM e_tonsure_orders o
    JOIN e_temple_master t ON t.temple_id = o.temple_id
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY t.district
    ORDER BY orders DESC
  `;

  /* ORDER SOURCE (SUCCESS ONLY) */
  queries.order_source = `
    SELECT
      o.order_from,
      COUNT(*) AS total_orders,
      SUM(o.total_amount) AS total_revenue
    FROM e_tonsure_orders o
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY o.order_from
  `;

  /* TOP 10 TEMPLES BY REVENUE */
  queries.top_temples = `
    SELECT
      t.temple_name_english,
      t.district,
      COUNT(o.id) AS orders,
      SUM(o.total_amount) AS revenue
    FROM e_tonsure_orders o
    JOIN e_temple_master t ON t.temple_id = o.temple_id
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY t.temple_id
    ORDER BY revenue DESC
    LIMIT 10
  `;

  /* MONTHLY GROWTH CHART */
  queries.monthly_growth = `
    SELECT
      DATE_FORMAT(tonsure_date, '%Y-%m') AS month,
      DATE_FORMAT(tonsure_date, '%b %Y') AS month_name,
      COUNT(*) AS orders,
      SUM(total_amount) AS revenue
    FROM e_tonsure_orders o
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY DATE_FORMAT(tonsure_date, '%Y-%m')
    ORDER BY month DESC
    LIMIT 12
  `;

  /* CATEGORY WISE DISTRIBUTION */
  queries.category_wise = `
    SELECT
      m.name_in_english AS category_name,
      COUNT(o.id) AS orders,
      SUM(o.total_amount) AS revenue
    FROM e_tonsure_orders o
    JOIN e_tonsure_master m ON JSON_EXTRACT(o.tonsure_dtl, '$[0].tonsure_id') = m.tonsure_id
    WHERE o.d_in = 0
      AND o.payment_status = 'SUCCESS'
      ${templeCond}
    GROUP BY m.name_in_english
    ORDER BY revenue DESC
  `;

  /* PAYMENT STATUS BREAKDOWN */
  queries.payment_status = `
    SELECT
      payment_status,
      COUNT(*) AS total_orders,
      SUM(total_amount) AS total_revenue
    FROM e_tonsure_orders o
    WHERE o.d_in = 0
      ${templeCond}
    GROUP BY payment_status
  `;

  MySQLConPool.getConnection(function (err, connection) {
    if (err) {
      callback(err, null);
      return;
    }

    let result = {};

    /* Execute all queries in sequence */
    connection.query(queries.kpi, params, function (err, r1) {
      if (err) {
        connection.release();
        callback(err, null);
        return;
      }
      result.kpi = r1;

      connection.query(queries.daily, params, function (err, r2) {
        if (err) {
          connection.release();
          callback(err, null);
          return;
        }
        result.daily = r2;

        connection.query(queries.services, params, function (err, r3) {
          if (err) {
            connection.release();
            callback(err, null);
            return;
          }
          result.services = r3;

          connection.query(queries.district, params, function (err, r4) {
            if (err) {
              connection.release();
              callback(err, null);
              return;
            }
            result.district = r4;

            connection.query(queries.order_source, params, function (err, r5) {
              if (err) {
                connection.release();
                callback(err, null);
                return;
              }
              result.order_source = r5;

              connection.query(queries.top_temples, params, function (err, r6) {
                if (err) {
                  connection.release();
                  callback(err, null);
                  return;
                }
                result.top_temples = r6;

                connection.query(queries.monthly_growth, params, function (err, r7) {
                  if (err) {
                    connection.release();
                    callback(err, null);
                    return;
                  }
                  result.monthly_growth = r7;

                  connection.query(queries.category_wise, params, function (err, r8) {
                    if (err) {
                      connection.release();
                      callback(err, null);
                      return;
                    }
                    result.category_wise = r8;

                    connection.query(queries.payment_status, params, function (err, r9) {
                      connection.release();

                      if (err) {
                        callback(err, null);
                        return;
                      }

                      result.payment_status = r9;
                      callback(null, result);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}
// Seva Analysis
// In your model file
export function getTopTemplesRevenueMdl(data, callback) {
  console.log(data, "getTopTemplesRevenueMdl");

  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != "All" && data.temple_id != 0) {
    templeCondition = "AND eso.temple_id = ?";
    params.push(data.temple_id);
  }

  const QRY = `
    SELECT 
      tm.temple_id,
      tm.temple_name_english,
      tm.temple_name_telugu,
      tm.district,
      COUNT(DISTINCT eso.id) as total_bookings,
      SUM(eso.total_amount) as total_revenue,
      SUM(eso.amount) as base_amount,
      SUM(eso.handling_charge) as total_handling_charges,
      AVG(eso.total_amount) as avg_ticket_value
    FROM e_seva_orders eso
    INNER JOIN e_temple_master tm ON eso.temple_id = tm.temple_id
    WHERE eso.payment_status = 'SUCCESS'
    ${templeCondition}
    GROUP BY tm.temple_id, tm.temple_name_english, tm.temple_name_telugu, tm.district
    ORDER BY total_revenue DESC
    LIMIT 10
  `;

  sqlinjection(MySQLConPool, QRY, params, "getTopTemplesRevenueMdl", callback);
}

// NEW function - Don't change existing one
export function getTopSevasRevenueMdl(data, callback) {
  console.log(data, "getTopSevasRevenueMdl");

  let templeCondition = "";
  let params = [];

  const templeId = data.front_temple_id || data.temple_id || 0;
  if (templeId && templeId != "All" && templeId != 0) {
    templeCondition = "AND o.temple_id = ?";
    params.push(templeId);
  }

  const QRY = `
    SELECT 
      m.seva_name_english,
      m.seva_name_telugu,
      COUNT(o.id) as total_bookings,
      COALESCE(SUM(o.total_amount), 0) as total_revenue
    FROM e_seva_orders o
    JOIN e_seva_master m ON m.id = o.seva_id
    WHERE o.payment_status = 'SUCCESS'
      ${templeCondition}
    GROUP BY o.seva_id, m.seva_name_english, m.seva_name_telugu
    ORDER BY total_revenue DESC
    LIMIT 10
  `;

  sqlinjection(MySQLConPool, QRY, params, "getTopSevasRevenueMdl", callback);
}

// Prasadam Analysis
// Get Top 10 Temples by Revenue
export const getTopTenTemplesRevenueMdl = (data, callback) => {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != 0) {
    templeCondition = "AND o.temple_id = ? ";
    params.push(data.temple_id);
  }

  const QRY = `
    SELECT 
        tm.temple_name_english AS temple_name,
        tm.temple_name_telugu,
        COALESCE(SUM(o.total_amount), 0) AS total_revenue,
        COUNT(DISTINCT o.id) AS total_orders,
        COALESCE(AVG(o.total_amount), 0) AS avg_order_value
    FROM e_prasadam_orders o
    JOIN e_temple_master tm ON o.temple_id = tm.temple_id
    WHERE o.payment_status = 'SUCCESS'
    ${templeCondition}
    GROUP BY o.temple_id, tm.temple_name_english, tm.temple_name_telugu
    ORDER BY total_revenue DESC
    LIMIT 10
    `;

  sqlinjection(MySQLConPool, QRY, params, "getTopTenTemplesRevenueMdl", callback);
};

// Get Top 10 Prasadam by Revenue
export const getTopTenPrasadamRevenueMdl = (data, callback) => {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != 0) {
    templeCondition = "AND o.temple_id = ? ";
    params.push(data.temple_id);
  }

  const QRY = `
    SELECT 
        COALESCE(pm.name_in_english, 'Unknown') AS prasadam_name,
        COALESCE(pm.name_in_telugu, 'Unknown') AS prasadam_name_telugu,
        COUNT(DISTINCT oi.id) AS total_items_sold,
        COALESCE(SUM(oi.amount), 0) AS total_revenue,
        COALESCE(SUM(oi.qty), 0) AS total_quantity,
        COALESCE(AVG(oi.price), 0) AS avg_price
    FROM e_prasadam_orders_items oi
    JOIN e_prasadam_orders o ON oi.main_id = o.id
    LEFT JOIN e_prasadam_master pm ON oi.prasadam_id = pm.prasadam_id
    WHERE o.payment_status = 'SUCCESS'
    ${templeCondition}
    GROUP BY oi.prasadam_id, pm.name_in_english, pm.name_in_telugu
    ORDER BY total_revenue DESC
    LIMIT 10
    `;

  sqlinjection(MySQLConPool, QRY, params, "getTopTenPrasadamRevenueMdl", callback);
};

// Get Month Growth Data
export const getMonthGrowthMdl = (data, callback) => {
  let templeCondition = "";
  let params = [];

  if (data.temple_id && data.temple_id != 0) {
    templeCondition = "AND temple_id = ? ";
    params.push(data.temple_id);
  }

  const QRY = `
    WITH monthly_data AS (
        SELECT 
            DATE_FORMAT(booking_date, '%Y-%m') AS month,
            DATE_FORMAT(booking_date, '%M %Y') AS month_name,
            COUNT(*) AS total_orders,
            COALESCE(SUM(total_amount), 0) AS total_revenue,
            COUNT(DISTINCT CASE WHEN order_from = 0 THEN id END) AS online_orders,
            COUNT(DISTINCT CASE WHEN order_from = 1 THEN id END) AS kiosk_orders
        FROM e_prasadam_orders 
        WHERE payment_status = 'SUCCESS'
        AND booking_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        ${templeCondition}
        GROUP BY DATE_FORMAT(booking_date, '%Y-%m'), DATE_FORMAT(booking_date, '%M %Y')
        ORDER BY month DESC
        LIMIT 6
    )
    SELECT 
        month,
        month_name,
        total_orders,
        total_revenue,
        online_orders,
        kiosk_orders,
        LAG(total_orders) OVER (ORDER BY month) AS prev_month_orders,
        LAG(total_revenue) OVER (ORDER BY month) AS prev_month_revenue,
        CASE 
            WHEN LAG(total_orders) OVER (ORDER BY month) > 0 
            THEN ROUND(((total_orders - LAG(total_orders) OVER (ORDER BY month)) / LAG(total_orders) OVER (ORDER BY month)) * 100, 2)
            ELSE 0 
        END AS order_growth_percentage,
        CASE 
            WHEN LAG(total_revenue) OVER (ORDER BY month) > 0 
            THEN ROUND(((total_revenue - LAG(total_revenue) OVER (ORDER BY month)) / LAG(total_revenue) OVER (ORDER BY month)) * 100, 2)
            ELSE 0 
        END AS revenue_growth_percentage
    FROM monthly_data
    ORDER BY month ASC
    `;

  sqlinjection(MySQLConPool, QRY, params, "getMonthGrowthMdl", callback);
};

// In your model file
export function getTopCategorySevasMdl(data, callback) {
  console.log(data, "getTopCategorySevasMdl");

  let templeCondition = "";
  let params = [];

  const templeId = data.front_temple_id || data.temple_id || 0;
  if (templeId && templeId != "All" && templeId != 0) {
    templeCondition = "AND o.temple_id = ?";
    params.push(templeId);
  }

  const QRY = `
    SELECT 
      m.seva_type_name,
      m.seva_type,
      COUNT(DISTINCT o.id) as total_bookings,
      COALESCE(SUM(o.total_amount), 0) as total_revenue,
      COUNT(DISTINCT m.id) as total_sevas,
      COALESCE(AVG(o.total_amount), 0) as avg_ticket_value,
      COALESCE(SUM(CASE WHEN o.gender = 'Male' THEN 1 ELSE 0 END), 0) as male_bookings,
      COALESCE(SUM(CASE WHEN o.gender = 'Female' THEN 1 ELSE 0 END), 0) as female_bookings
    FROM e_seva_master m
    LEFT JOIN e_seva_orders o ON m.id = o.seva_id 
      AND o.payment_status = 'SUCCESS'
      ${templeCondition}
    WHERE m.active = 1 AND m.seva_type_name IS NOT NULL
    GROUP BY m.seva_type_name, m.seva_type
    HAVING total_bookings > 0
    ORDER BY total_revenue DESC, total_bookings DESC
    LIMIT 10
  `;

  sqlinjection(MySQLConPool, QRY, params, "getTopCategorySevasMdl", callback);
}

// ANALYSIS ENDS

// export function getConsolidateddataMdl(data, callback) {
//   const cntxtDtls = "in getConsolidateddataMdl";
//   const IST = "Asia/Kolkata";
//   const today = moment().tz(IST).format("YYYY-MM-DD");

//   let value = [];
//   let QRY_TO_EXEC = "";

//   let templeDarshan = "";
//   let templeSeva = "";
//   let templePrasadam = "";
//   let templeTonsure = "";
//   let templeEhundi = "";

//   if (data.role_type === 10 || data.role_type === 14) {
//     templeDarshan = " AND d.temple_id = ?";
//     templeSeva = " AND a.temple_id = ?";
//     templePrasadam = " AND a.temple_id = ?";
//     templeTonsure = " AND o.temple_id = ?";
//     templeEhundi = " AND temple_id = ?";
//   }

//   if (data.value === 0) {
//     let darshanamDateFilter = "";
//     let darshanamVals = [];

//     if (data.date1 && data.date2) {
//       darshanamDateFilter = " AND DATE(d.seva_date) >= ? AND DATE(d.seva_date) <= ?";
//       darshanamVals.push(data.date1, data.date2);
//     } else if (data.date1) {
//       darshanamDateFilter = " AND DATE(d.seva_date) >= ?";
//       darshanamVals.push(data.date1);
//     } else if (data.date2) {
//       darshanamDateFilter = " AND DATE(d.seva_date) <= ?";
//       darshanamVals.push(data.date2);
//     } else {
//       darshanamDateFilter = " AND DATE(d.seva_date) = ?";
//       darshanamVals.push(today);
//     }

//     let sevaDateFilter = "";
//     let sevaVals = [];

//     if (data.date1 && data.date2) {
//       sevaDateFilter = " AND DATE(a.seva_date) >= ? AND DATE(a.seva_date) <= ?";
//       sevaVals.push(data.date1, data.date2);
//     } else if (data.date1) {
//       sevaDateFilter = " AND DATE(a.seva_date) >= ?";
//       sevaVals.push(data.date1);
//     } else if (data.date2) {
//       sevaDateFilter = " AND DATE(a.seva_date) <= ?";
//       sevaVals.push(data.date2);
//     } else {
//       sevaDateFilter = " AND DATE(a.seva_date) = ?";
//       sevaVals.push(today);
//     }

//     let prasadamDateFilter = "";
//     let prasadamVals = [];

//     if (data.date1 && data.date2) {
//       prasadamDateFilter = " AND DATE(a.booking_date) >= ? AND DATE(a.booking_date) <= ?";
//       prasadamVals.push(data.date1, data.date2);
//     } else if (data.date1) {
//       prasadamDateFilter = " AND DATE(a.booking_date) >= ?";
//       prasadamVals.push(data.date1);
//     } else if (data.date2) {
//       prasadamDateFilter = " AND DATE(a.booking_date) <= ?";
//       prasadamVals.push(data.date2);
//     } else {
//       prasadamDateFilter = " AND DATE(a.booking_date) = ?";
//       prasadamVals.push(today);
//     }

//     let tonsureDateFilter = "";
//     let tonsureVals = [];

//     if (data.date1 && data.date2) {
//       tonsureDateFilter = " AND DATE(o.tonsure_date) >= ? AND DATE(o.tonsure_date) <= ?";
//       tonsureVals.push(data.date1, data.date2);
//     } else if (data.date1) {
//       tonsureDateFilter = " AND DATE(o.tonsure_date) >= ?";
//       tonsureVals.push(data.date1);
//     } else if (data.date2) {
//       tonsureDateFilter = " AND DATE(o.tonsure_date) <= ?";
//       tonsureVals.push(data.date2);
//     } else {
//       tonsureDateFilter = " AND DATE(o.tonsure_date) = ?";
//       tonsureVals.push(today);
//     }

//     let ehundiDateFilter = "";
//     let ehundiVals = [];

//     if (data.date1 && data.date2) {
//       ehundiDateFilter = " AND DATE(donation_date) >= ? AND DATE(donation_date) <= ?";
//       ehundiVals.push(data.date1, data.date2);
//     } else if (data.date1) {
//       ehundiDateFilter = " AND DATE(donation_date) >= ?";
//       ehundiVals.push(data.date1);
//     } else if (data.date2) {
//       ehundiDateFilter = " AND DATE(donation_date) <= ?";
//       ehundiVals.push(data.date2);
//     } else {
//       ehundiDateFilter = " AND DATE(donation_date) = ?";
//       ehundiVals.push(today);
//     }

//     if (data.role_type === 10 || data.role_type === 14) {
//       value = [
//         data.temple_id,
//         ...darshanamVals,
//         data.temple_id,
//         ...sevaVals,
//         data.temple_id,
//         ...prasadamVals,
//         data.temple_id,
//         ...tonsureVals,
//         data.temple_id,
//         ...ehundiVals,
//       ];
//     } else {
//       value = [...darshanamVals, ...sevaVals, ...prasadamVals, ...tonsureVals, ...ehundiVals];
//     }

//     QRY_TO_EXEC = `

// SELECT 'Darshanam' AS category,
//        m.darshan_name_english AS ticket_name,
//        COUNT(d.id) AS ticket_count,
//        SUM(d.no_persons) AS total_persons,
//        m.price AS price,
//        (SUM(d.no_persons) * m.price) AS total_amount
// FROM e_darshnam_orders d
// JOIN e_darshan_master m ON m.id = d.darshanam_id
// WHERE d.d_in = 0 
// AND m.d_in = 0 
// AND d.payment_status = "SUCCESS" and d.order_from = 1
// ${templeDarshan} ${darshanamDateFilter}
// GROUP BY m.id

// UNION ALL

// SELECT 'Seva' AS category, b.seva_name_english AS ticket_name, COUNT(a.id) AS ticket_count, COUNT(a.id) AS total_persons, b.amount AS price, SUM(a.total_amount) AS total_amount FROM e_seva_orders a JOIN e_seva_master b ON a.seva_id = b.id WHERE a.d_in = 0 AND b.d_in = 0 AND a.payment_status = "SUCCESS" and a.order_from = 1 ${templeSeva} ${sevaDateFilter} group by a.seva_id

// UNION ALL

// SELECT 'Prasadam' AS category,
//        c.name_in_english AS ticket_name,     
//        COUNT(a.id) AS ticket_count,        
//        SUM(b.qty) AS total_persons,          
//        c.price AS price,                      
//        SUM(b.amount) AS total_amount          
// FROM e_prasadam_orders a
// JOIN e_prasadam_orders_items b ON a.id = b.main_id
// JOIN e_prasadam_master c ON b.prasadam_id = c.prasadam_id
// WHERE c.d_in = 0 and a.order_from = 1
//   AND b.d_in = 0 
//   AND a.d_in = 0  and a.payment_status = "SUCCESS" ${templePrasadam} ${prasadamDateFilter} 
// GROUP BY b.prasadam_id

// UNION ALL

// SELECT 'Tonsure' AS category,
// JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].name_in_english')) AS ticket_name,
// COUNT(o.id) AS ticket_count,
// SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].noofperson')) AS UNSIGNED)) AS total_persons,
// JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].price')) AS price,
// (
//  SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].noofperson')) AS UNSIGNED)) *
//  CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].price')) AS DECIMAL(10,2))
// ) AS total_amount
// FROM e_tonsure_orders o
// WHERE o.payment_status='SUCCESS' and o.order_from = 1
// ${templeTonsure}
// AND o.d_in=0
// ${tonsureDateFilter}
// GROUP BY ticket_name, price

// UNION ALL

// SELECT 'E-Hundi' AS category,
// 'Hundi Donation' AS ticket_name,
// COUNT(id) AS ticket_count,
// COUNT(id) AS total_persons,
// SUM(CAST(total_amount AS DECIMAL(10,2))) AS price,
// SUM(CAST(total_amount AS DECIMAL(10,2))) AS total_amount
// FROM e_hundi_orders
// WHERE payment_status = 'SUCCESS' and order_from = 1
// ${templeEhundi}
// AND d_in = 0
// ${ehundiDateFilter};
// `;
//   }

//   if (data.value > 0 && data.value <= 5) {
//     let dateFilter = "";
//     let vals = [];
//     let dateColomun = "";

//     let templeFilter = "";

//     switch (data.value) {
//       case 1:
//         dateColomun = "d.seva_date";
//         if (data.role_type === 10 || data.role_type === 14) {
//           templeFilter = " AND d.temple_id = ?";
//         }
//         break;

//       case 2:
//         dateColomun = "a.seva_date";
//         if (data.role_type === 10 || data.role_type === 14) {
//           templeFilter = " AND a.temple_id = ?";
//         }
//         break;

//       case 3:
//         dateColomun = "a.booking_date";
//         if (data.role_type === 10 || data.role_type === 14) {
//           templeFilter = " AND a.temple_id = ?";
//         }
//         break;

//       case 4:
//         dateColomun = "o.tonsure_date";
//         if (data.role_type === 10 || data.role_type === 14) {
//           templeFilter = " AND o.temple_id = ?";
//         }
//         break;

//       case 5:
//         dateColomun = "donation_date";
//         if (data.role_type === 10 || data.role_type === 14) {
//           templeFilter = " AND temple_id = ?";
//         }
//         break;
//     }

//     if (data.date1 && data.date2) {
//       dateFilter = ` AND DATE(${dateColomun}) >= ? AND DATE(${dateColomun}) <= ?`;
//       vals.push(data.date1, data.date2);
//     } else if (data.date1) {
//       dateFilter = ` AND DATE(${dateColomun}) >= ?`;
//       vals.push(data.date1);
//     } else if (data.date2) {
//       dateFilter = ` AND DATE(${dateColomun}) <= ?`;
//       vals.push(data.date2);
//     } else {
//       dateFilter = ` AND DATE(${dateColomun}) = ?`;
//       vals.push(today);
//     }

//     if (data.role_type === 10 || data.role_type === 14) {
//       value = [data.temple_id, ...vals];
//     } else {
//       value = [...vals];
//     }

//     if (data.value == 1) {
//       QRY_TO_EXEC = `
//   SELECT m.darshan_name_english AS ticket_name,
//          m.price AS price,
//          COUNT(d.id) AS ticket_count,
//          SUM(d.no_persons) AS total_persons,
//          SUM(d.no_persons) AS total_quantity,
//          (SUM(d.no_persons) * m.price) AS total_amount
//   FROM e_darshnam_orders d
//   JOIN e_darshan_master m ON m.id = d.darshanam_id
//   WHERE d.d_in = 0 AND m.d_in = 0 AND d.payment_status = "SUCCESS" and d.order_from = 1
//   ${templeFilter} ${dateFilter}
// GROUP BY m.id
// `;
//     }

//     if (data.value == 2) {
//       QRY_TO_EXEC = `
//   SELECT 'Seva' AS category, b.seva_name_english AS ticket_name, COUNT(a.id) AS ticket_count, COUNT(a.id) AS total_persons, b.amount AS price, SUM(a.total_amount) AS total_amount FROM e_seva_orders a JOIN e_seva_master b ON a.seva_id = b.id WHERE a.d_in = 0 AND b.d_in = 0 AND a.payment_status = "SUCCESS" and a.order_from = 1 ${templeFilter} ${dateFilter} group by a.seva_id;
// `;
//     }

//     if (data.value == 3) {
//       QRY_TO_EXEC = `
//   SELECT 
//     c.name_in_english AS ticket_name,     
//        COUNT(a.id) AS ticket_count,         
//        SUM(b.qty) AS total_persons,          
//        c.price AS price,                      
//        SUM(b.amount) AS total_amount    
// FROM e_prasadam_orders a
// JOIN e_prasadam_orders_items b ON a.id = b.main_id
// JOIN e_prasadam_master c ON b.prasadam_id = c.prasadam_id
// WHERE c.d_in = 0 and a.order_from = 1
//   AND b.d_in = 0 
//   AND a.d_in = 0 
//   AND a.payment_status = "SUCCESS"
//   ${templeFilter} ${dateFilter}
// GROUP BY b.prasadam_id;
// `;
//     }

//     if (data.value == 4) {
//       QRY_TO_EXEC = `
//   SELECT JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].name_in_english')) AS ticket_name,
//          JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].price')) AS price,
//          COUNT(o.id) AS ticket_count,
//          SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].noofperson')) AS UNSIGNED)) AS total_persons,
//          SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].noofperson')) AS UNSIGNED)) AS total_quantity,
//          (
//            SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].noofperson')) AS UNSIGNED)) *
//            CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].price')) AS DECIMAL(10,2))
//          ) AS total_amount
//   FROM e_tonsure_orders o
//   WHERE o.payment_status = 'SUCCESS' and o.order_from = 1
//   ${templeFilter} AND o.d_in = 0 ${dateFilter}
//   GROUP BY ticket_name, price
//   ORDER BY ticket_name
// `;
//     }

//     if (data.value == 5) {
//       QRY_TO_EXEC = `
//   SELECT 'Hundi Donation' AS ticket_name,
//          COUNT(id) AS ticket_count,
//          COUNT(id) AS total_persons,
//          COUNT(id) AS total_quantity,
//          SUM(CAST(total_amount AS DECIMAL(10,2))) AS price,
//          SUM(CAST(total_amount AS DECIMAL(10,2))) AS total_amount
//   FROM e_hundi_orders
//   WHERE payment_status = 'SUCCESS' and order_from = 1
//   ${templeFilter} AND d_in = 0 ${dateFilter}
// `;
//     }
//   }

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }

// export function getTempleWiseDonationsMdl(data, callback) {
//   const cntxtDtls = "in getTempleWiseDonationsMdl";
//   const IST = "Asia/Kolkata";
//   const today = moment().tz(IST).format("YYYY-MM-DD");
//   let value = [];
//   let templeId = ``;

//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = " AND e.temple_id = ?";
//     value = [data.temple_id];
//   } else {
//     templeId = "";
//   }

//   const QRY_TO_EXEC = `SELECT 
// t.temple_name_english,
// COUNT(e.id) AS total_transactions,
// SUM(e.total_amount) AS total_donation
// FROM e_hundi_orders e
// JOIN e_temple_master t ON t.temple_id = e.temple_id
// WHERE payment_status='SUCCESS' and e.d_in = 0 and t.d_in = 0 ${templeId}
// GROUP BY e.temple_id;`;

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }

// export function getTopFiveDonationsMdl(data, callback) {
//   const cntxtDtls = "in getTopFiveDonationsMdl";
//   const IST = "Asia/Kolkata";
//   const today = moment().tz(IST).format("YYYY-MM-DD");
//   let value = [];
//   let templeId = ``;

//   if (data.role_type == 10 || data.role_type == 14) {
//     templeId = " AND e.temple_id = ?";
//     value = [data.temple_id];
//   } else {
//     templeId = "";
//   }

//   const QRY_TO_EXEC = `SELECT 
//     t.temple_name_english,
//     SUM(e.total_amount) AS total_donation
// FROM e_hundi_orders AS e
// JOIN e_temple_master AS t ON e.temple_id = t.temple_id
// WHERE e.payment_status = 'SUCCESS'
//   AND e.d_in = 0
//   ${templeId}
// GROUP BY t.temple_name_english
// ORDER BY total_donation DESC
// LIMIT 5;`;

//   if (callback && typeof callback === "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
//   }
// }

export function getConsolidateddataMdl(data, callback) {
  const cntxtDtls = "in getConsolidateddataMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");

  let value = [];
  let QRY_TO_EXEC = "";

  let templeDarshan = "";
  let templeSeva = "";
  let templePrasadam = "";
  let templeTonsure = "";
  let templeEhundi = "";

  if (data.role_type === 10 || data.role_type === 14) {
    templeDarshan = " AND d.temple_id = ?";
    templeSeva = " AND a.temple_id = ?";
    templePrasadam = " AND a.temple_id = ?";
    templeTonsure = " AND o.temple_id = ?";
    templeEhundi = " AND temple_id = ?";
  }

  if (data.value === 0) {

    let darshanamDateFilter = "";
    let darshanamVals = [];

    if (data.date1 && data.date2) {
      darshanamDateFilter = " AND DATE(d.seva_date) >= ? AND DATE(d.seva_date) <= ?";
      darshanamVals.push(data.date1, data.date2);
    } else if (data.date1) {
      darshanamDateFilter = " AND DATE(d.seva_date) >= ?";
      darshanamVals.push(data.date1);
    } else if (data.date2) {
      darshanamDateFilter = " AND DATE(d.seva_date) <= ?";
      darshanamVals.push(data.date2);
    } else {
      darshanamDateFilter = " AND DATE(d.seva_date) = ?";
      darshanamVals.push(today);
    }

    let sevaDateFilter = "";
    let sevaVals = [];

    if (data.date1 && data.date2) {
      sevaDateFilter = " AND DATE(a.seva_date) >= ? AND DATE(a.seva_date) <= ?";
      sevaVals.push(data.date1, data.date2);
    } else if (data.date1) {
      sevaDateFilter = " AND DATE(a.seva_date) >= ?";
      sevaVals.push(data.date1);
    } else if (data.date2) {
      sevaDateFilter = " AND DATE(a.seva_date) <= ?";
      sevaVals.push(data.date2);
    } else {
      sevaDateFilter = " AND DATE(a.seva_date) = ?";
      sevaVals.push(today);
    }

    let prasadamDateFilter = "";
    let prasadamVals = [];

    if (data.date1 && data.date2) {
      prasadamDateFilter = " AND DATE(a.booking_date) >= ? AND DATE(a.booking_date) <= ?";
      prasadamVals.push(data.date1, data.date2);
    } else if (data.date1) {
      prasadamDateFilter = " AND DATE(a.booking_date) >= ?";
      prasadamVals.push(data.date1);
    } else if (data.date2) {
      prasadamDateFilter = " AND DATE(a.booking_date) <= ?";
      prasadamVals.push(data.date2);
    } else {
      prasadamDateFilter = " AND DATE(a.booking_date) = ?";
      prasadamVals.push(today);
    }

    let tonsureDateFilter = "";
    let tonsureVals = [];

    if (data.date1 && data.date2) {
      tonsureDateFilter = " AND DATE(o.tonsure_date) >= ? AND DATE(o.tonsure_date) <= ?";
      tonsureVals.push(data.date1, data.date2);
    } else if (data.date1) {
      tonsureDateFilter = " AND DATE(o.tonsure_date) >= ?";
      tonsureVals.push(data.date1);
    } else if (data.date2) {
      tonsureDateFilter = " AND DATE(o.tonsure_date) <= ?";
      tonsureVals.push(data.date2);
    } else {
      tonsureDateFilter = " AND DATE(o.tonsure_date) = ?";
      tonsureVals.push(today);
    }

    let ehundiDateFilter = "";
    let ehundiVals = [];

    if (data.date1 && data.date2) {
      ehundiDateFilter = " AND DATE(donation_date) >= ? AND DATE(donation_date) <= ?";
      ehundiVals.push(data.date1, data.date2);
    } else if (data.date1) {
      ehundiDateFilter = " AND DATE(donation_date) >= ?";
      ehundiVals.push(data.date1);
    } else if (data.date2) {
      ehundiDateFilter = " AND DATE(donation_date) <= ?";
      ehundiVals.push(data.date2);
    } else {
      ehundiDateFilter = " AND DATE(donation_date) = ?";
      ehundiVals.push(today);
    }

    if (data.role_type === 10 || data.role_type === 14) {
      value = [
        data.temple_id, ...darshanamVals,
        data.temple_id, ...sevaVals,
        data.temple_id, ...prasadamVals,
        data.temple_id, ...tonsureVals,
        data.temple_id, ...ehundiVals
      ];
    } else {
      value = [
        ...darshanamVals,
        ...sevaVals,
        ...prasadamVals,
        ...tonsureVals,
        ...ehundiVals
      ];
    }

    QRY_TO_EXEC = `

SELECT 'Darshanam' AS category,
       m.darshan_name_english AS ticket_name,
       COUNT(d.id) AS ticket_count,
       SUM(d.no_persons) AS total_persons,
       m.price AS price,
       (SUM(d.no_persons) * m.price) AS total_amount
FROM e_darshnam_orders d
JOIN e_darshan_master m ON m.id = d.darshanam_id
WHERE d.d_in = 0 
AND m.d_in = 0 
AND d.payment_status = "SUCCESS" and d.order_from = 1
${templeDarshan} ${darshanamDateFilter}
GROUP BY m.id

UNION ALL

SELECT 'Seva' AS category, b.seva_name_english AS ticket_name, COUNT(a.id) AS ticket_count, sum(b.max_persons) AS total_persons, b.amount AS price, SUM(a.total_amount) AS total_amount FROM e_seva_orders a JOIN e_seva_master b ON a.seva_id = b.id WHERE a.d_in = 0 AND b.d_in = 0 AND a.payment_status = "SUCCESS" and a.order_from = 1 ${templeSeva} ${sevaDateFilter} group by a.seva_id

UNION ALL

SELECT 'Prasadam' AS category,
       c.name_in_english AS ticket_name,     
       COUNT(a.id) AS ticket_count,        
       SUM(b.qty) AS total_persons,          
       c.price AS price,                      
       SUM(b.amount) AS total_amount          
FROM e_prasadam_orders a
JOIN e_prasadam_orders_items b ON a.id = b.main_id
JOIN e_prasadam_master c ON b.prasadam_id = c.prasadam_id
WHERE c.d_in = 0 and a.order_from = 1
  AND b.d_in = 0 
  AND a.d_in = 0  and a.payment_status = "SUCCESS" ${templePrasadam} ${prasadamDateFilter} 
GROUP BY b.prasadam_id

UNION ALL

SELECT 'Tonsure' AS category,
JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].name_in_english')) AS ticket_name,
COUNT(o.id) AS ticket_count,
SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].noofperson')) AS UNSIGNED)) AS total_persons,
JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].price')) AS price,
(
 SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].noofperson')) AS UNSIGNED)) *
 CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl,'$[0].price')) AS DECIMAL(10,2))
) AS total_amount
FROM e_tonsure_orders o
WHERE o.payment_status='SUCCESS' and o.order_from = 1
${templeTonsure}
AND o.d_in=0
${tonsureDateFilter}
GROUP BY ticket_name, price

UNION ALL

SELECT 'E-Hundi' AS category,
'Hundi Donation' AS ticket_name,
COUNT(id) AS ticket_count,
COUNT(id) AS total_persons,
SUM(CAST(total_amount AS DECIMAL(10,2))) AS price,
SUM(CAST(total_amount AS DECIMAL(10,2))) AS total_amount
FROM e_hundi_orders
WHERE payment_status = 'SUCCESS' and order_from = 1
${templeEhundi}
AND d_in = 0
${ehundiDateFilter};
`;
  }

  if (data.value > 0 && data.value <= 5) {

    let dateFilter = "";
    let vals = [];
    let dateColomun = "";

    let templeFilter = "";

    switch (data.value) {
      case 1:
        dateColomun = "d.seva_date";
        if (data.role_type === 10 || data.role_type === 14) {
          templeFilter = " AND d.temple_id = ?";
        }
        break;

      case 2:
        dateColomun = "a.seva_date";
        if (data.role_type === 10 || data.role_type === 14) {
          templeFilter = " AND a.temple_id = ?";
        }
        break;

      case 3:
        dateColomun = "a.booking_date";
        if (data.role_type === 10 || data.role_type === 14) {
          templeFilter = " AND a.temple_id = ?";
        }
        break;

      case 4:
        dateColomun = "o.tonsure_date";
        if (data.role_type === 10 || data.role_type === 14) {
          templeFilter = " AND o.temple_id = ?";
        }
        break;

      case 5:
        dateColomun = "donation_date";
        if (data.role_type === 10 || data.role_type === 14) {
          templeFilter = " AND temple_id = ?";
        }
        break;
    }

    if (data.date1 && data.date2) {
      dateFilter = ` AND DATE(${dateColomun}) >= ? AND DATE(${dateColomun}) <= ?`;
      vals.push(data.date1, data.date2);
    } else if (data.date1) {
      dateFilter = ` AND DATE(${dateColomun}) >= ?`;
      vals.push(data.date1);
    } else if (data.date2) {
      dateFilter = ` AND DATE(${dateColomun}) <= ?`;
      vals.push(data.date2);
    } else {
      dateFilter = ` AND DATE(${dateColomun}) = ?`;
      vals.push(today);
    }

    if (data.role_type === 10 || data.role_type === 14) {
      value = [data.temple_id, ...vals];
    } else {
      value = [...vals];
    }

    if (data.value == 1) {
      QRY_TO_EXEC = `
  SELECT m.darshan_name_english AS ticket_name,
         m.price AS price,
         COUNT(d.id) AS ticket_count,
         SUM(d.no_persons) AS total_persons,
         SUM(d.no_persons) AS total_quantity,
         (SUM(d.no_persons) * m.price) AS total_amount
  FROM e_darshnam_orders d
  JOIN e_darshan_master m ON m.id = d.darshanam_id
  WHERE d.d_in = 0 AND m.d_in = 0 AND d.payment_status = "SUCCESS" and d.order_from = 1
  ${templeFilter} ${dateFilter}
GROUP BY m.id
`;
    }

    if (data.value == 2) {
      QRY_TO_EXEC = `
  SELECT 'Seva' AS category, b.seva_name_english AS ticket_name, COUNT(a.id) AS ticket_count, sum(b.max_persons) AS total_persons, b.amount AS price, SUM(a.total_amount) AS total_amount FROM e_seva_orders a JOIN e_seva_master b ON a.seva_id = b.id WHERE a.d_in = 0 AND b.d_in = 0 AND a.payment_status = "SUCCESS" and a.order_from = 1 ${templeFilter} ${dateFilter} group by a.seva_id;
`;
    }

    if (data.value == 3) {
      QRY_TO_EXEC = `
        SELECT 
          c.name_in_english AS ticket_name,     
            COUNT(a.id) AS ticket_count,         
            SUM(b.qty) AS total_persons,          
            c.price AS price,                      
            SUM(b.amount) AS total_amount    
      FROM e_prasadam_orders a
      JOIN e_prasadam_orders_items b ON a.id = b.main_id
      JOIN e_prasadam_master c ON b.prasadam_id = c.prasadam_id
      WHERE c.d_in = 0 and a.order_from = 1
        AND b.d_in = 0 
        AND a.d_in = 0 
        AND a.payment_status = "SUCCESS"
        ${templeFilter} ${dateFilter}
      GROUP BY b.prasadam_id ; `
    }

    if (data.value == 4) {
      QRY_TO_EXEC = `
  SELECT JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].name_in_english')) AS ticket_name,
         JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].price')) AS price,
         COUNT(o.id) AS ticket_count,
         SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].noofperson')) AS UNSIGNED)) AS total_persons,
         SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].noofperson')) AS UNSIGNED)) AS total_quantity,
         (
           SUM(CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].noofperson')) AS UNSIGNED)) *
           CAST(JSON_UNQUOTE(JSON_EXTRACT(o.tonsure_dtl, '$[0].price')) AS DECIMAL(10,2))
         ) AS total_amount
  FROM e_tonsure_orders o
  WHERE o.payment_status = 'SUCCESS' and o.order_from = 1
  ${templeFilter} AND o.d_in = 0 ${dateFilter}
  GROUP BY ticket_name, price
  ORDER BY ticket_name
`;
    }

    if (data.value == 5) {
      QRY_TO_EXEC = `
  SELECT 'Hundi Donation' AS ticket_name,
         COUNT(id) AS ticket_count,
         COUNT(id) AS total_persons,
         COUNT(id) AS total_quantity,
         SUM(CAST(total_amount AS DECIMAL(10,2))) AS price,
         SUM(CAST(total_amount AS DECIMAL(10,2))) AS total_amount
  FROM e_hundi_orders
  WHERE payment_status = 'SUCCESS' and order_from = 1
  ${templeFilter} AND d_in = 0 ${dateFilter}
`;
    }
  }

  if (callback && typeof callback === "function") {

    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      if (err) return callback(err);
      let grandTotalAmount = 0;
      //  Only for ALL (value === 0)
      if (data.value === 0 && results && results.length > 0) {

        results.forEach((row) => {
          grandTotalAmount += Number(row.total_amount || 0);
        });
      }
      callback(null, {
        data: results,
        total_amount: grandTotalAmount
      });
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function gettemplenameforconsoldatedReport(data, callback) {
  var cntxtDtls = "in gettemplenameforconsoldatedReport";
  const IST = "Asia/Kolkata";

  var QRY_TO_EXEC = `select temple_name_english from e_temple_master where temple_id = ?;`
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  }
  else
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};







export function getLeastFiveDonationsCtrl(data, callback) {
  const cntxtDtls = "in getLeastFiveDonationsCtrl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND e.temple_id = ?";
    value = [data.temple_id];
  } else {
    templeId = "";
  }

  const QRY_TO_EXEC = `SELECT 
    t.temple_name_english,
    SUM(e.total_amount) AS total_donation
FROM e_hundi_orders AS e
JOIN e_temple_master AS t ON e.temple_id = t.temple_id
WHERE e.payment_status='SUCCESS'
  AND e.d_in = 0
  ${templeId}
GROUP BY t.temple_name_english
ORDER BY total_donation ASC
LIMIT 5;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getLast7DaysDonationsMdl(data, callback) {
  const cntxtDtls = "in getLast7DaysDonationsMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    value.push(data.temple_id);
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    value.push(data.front_temple_id);
  } else {
    templeId = ``;
  }

  const QRY_TO_EXEC = `SELECT 
    DATE_FORMAT(CONVERT_TZ(donation_date,'+00:00','+05:30'), '%Y-%m-%d') AS donation_date,
    SUM(total_amount) AS total_donation
FROM e_hundi_orders
WHERE donation_date >= CURDATE() - INTERVAL 6 DAY
  AND donation_date <= CURDATE()
  AND payment_status = "SUCCESS" ${templeId}
GROUP BY donation_date
ORDER BY donation_date;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls);
  }
}

export function getehunicardsAnalysisMdl(data, callback) {
  const cntxtDtls = "in getehunicardsAnalysisMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let params = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    params.push(data.temple_id);
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    params.push(data.front_temple_id);
  } else {
    templeId = ``;
  }

  const QRY_TO_EXEC = `SELECT 
    COUNT(*) AS total_tickets,
    SUM(total_amount) AS total_donation,
    SUM(CASE WHEN payment_status = 'SUCCESS' THEN 1 ELSE 0 END) AS completed_tickets,
    SUM(CASE WHEN payment_status = 'PENDING' THEN 1 ELSE 0 END) AS pending_tickets
FROM e_hundi_orders
WHERE d_in = 0 ${templeId} and payment_status = 'SUCCESS' and d_in = 0;
;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
  }
}

export function getOrderByDonationsMdl(data, callback) {
  const cntxtDtls = "in getOrderByDonationsMdl";
  const IST = "Asia/Kolkata";
  const today = moment().tz(IST).format("YYYY-MM-DD");
  let params = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = ` and temple_id=?`;
    params.push(data.temple_id);
  } else if (data.role_type == 1 && data.front_temple_id) {
    templeId = ` and temple_id=?`;
    params.push(data.front_temple_id);
  } else {
    templeId = ``;
  }

  const QRY_TO_EXEC = `SELECT 
    SUM(CASE WHEN order_from = 0 THEN 1 ELSE 0 END) AS whatsapp_orders,
    SUM(CASE WHEN order_from = 1 THEN 1 ELSE 0 END) AS kiosk_orders
FROM e_hundi_orders
WHERE d_in = 0 ${templeId} and  payment_status = 'SUCCESS'`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, callback);
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls);
  }
}
