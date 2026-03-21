import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection } from "../../../utils/utils.js";
import moment from "moment-timezone";

export function qlinesdataMdl(data, callback) {
  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id = ?`;
  }
  var cntxtDtls = "in qlinesdataMdl";

  let values = [data.temple_id];
  var QRY_TO_EXEC = `SELECT 
    DATE_FORMAT(qline_date, '%Y-%m-%d') AS date,
    temple_id,
    SUM(qline_people_count) AS total_count,

    SUM(CASE WHEN qline_type = 'Q1' THEN qline_people_count ELSE 0 END) AS Q1,
    SUM(CASE WHEN qline_type = 'Q2' THEN qline_people_count ELSE 0 END) AS Q2,
    SUM(CASE WHEN qline_type = 'Q3' THEN qline_people_count ELSE 0 END) AS Q3,
    SUM(CASE WHEN qline_type = 'Q4' THEN qline_people_count ELSE 0 END) AS Q4,
    SUM(CASE WHEN qline_type = 'Q5' THEN qline_people_count ELSE 0 END) AS Q5,
    SUM(CASE WHEN qline_type = 'Q6' THEN qline_people_count ELSE 0 END) AS Q6,
     SUM(CASE WHEN qline_type = 'Q7' THEN qline_people_count ELSE 0 END) AS Q7
FROM 
    b_qline_data
WHERE 
    d_in = 0
    AND ind = 0 
    ${whereCondition}
GROUP BY 
    DATE_FORMAT(qline_date, '%Y-%m-%d'),
    temple_id
ORDER BY 
    date,
    temple_id;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}
export function newQlineDayCountDetailsMdl(data, callback) {
  var cntxtDtls = "newQlineDayCountDetailsMdl";
  const IST = "Asia/Kolkata";
  var mdate = moment().tz(IST).format("YYYY-MM-DD");
  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id = ?`;
  } 
  var QRY_TO_EXEC = `SELECT 
   qline_type,
    sum(qline_people_count) AS total_people,
temple_id
FROM b_qline_data where d_in='0' and ind='0' and qline_date=(
        SELECT MAX(qline_date)
        FROM b_qline_data
        WHERE d_in = '0' AND ind = '0' ${whereCondition}
  ) ${whereCondition}
GROUP BY qline_type,temple_id
ORDER BY qline_type,temple_id ASC;`;
  let paramsData = [data.temple_id,data.temple_id];
  console.log(QRY_TO_EXEC,paramsData)
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function timewisedataMdl(data, callback) {
  var cntxtDtls = "in qlinesdataMdl";
  var values = [data.date];
  var QRY_TO_EXEC = `WITH hours AS (
    SELECT 0 AS hour_num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
    SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
    SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL 
    SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL 
    SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL 
    SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23
),
formatted_hours AS (
    SELECT 
        hour_num,
        LPAD(hour_num, 2, '0') AS hour_24,
                CONCAT(
            DATE_FORMAT(STR_TO_DATE(hour_num, '%H'), '%l:%i %p'),
            ' to ',
            DATE_FORMAT(STR_TO_DATE((hour_num + 1) % 24, '%H'), '%l:%i %p')
        ) AS hour_label

    FROM hours
),
data_hourly AS (
    SELECT 
        DATE_FORMAT(qline_date, '%Y-%m-%d') AS date,
        CAST(DATE_FORMAT(STR_TO_DATE(REPLACE(qline_time, 'Up to ', ''), '%I%p'), '%H') AS UNSIGNED) AS hour_num,
        qline_type,
        qline_people_count
    FROM 
        b_qline_data
    WHERE 
        d_in = 0 
        AND ind = 0
        AND DATE_FORMAT(qline_date, '%Y-%m-%d') = ?
)
SELECT
    dh.date,
    fh.hour_label,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q1' THEN dh.qline_people_count ELSE 0 END), 0) AS Q1,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q2' THEN dh.qline_people_count ELSE 0 END), 0) AS Q2,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q3' THEN dh.qline_people_count ELSE 0 END), 0) AS Q3,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q4' THEN dh.qline_people_count ELSE 0 END), 0) AS Q4,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q5' THEN dh.qline_people_count ELSE 0 END), 0) AS Q5,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q6' THEN dh.qline_people_count ELSE 0 END), 0) AS Q6,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'Q7' THEN dh.qline_people_count ELSE 0 END), 0) AS Q7,
    COALESCE(SUM(dh.qline_people_count), 0) AS total_count
FROM 
    formatted_hours fh
LEFT JOIN 
    data_hourly dh ON fh.hour_num = dh.hour_num
GROUP BY 
    fh.hour_label, fh.hour_num
ORDER BY 
    fh.hour_num;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
  }
}

export function qlinedaycountdetailsMdl(data, callback) {
  var cntxtDtls = "in qlinedaycountdetailsMdl";
  var values = [0];
  var QRY_TO_EXEC = `SELECT 
    qline_type, SUM(qline_people_count) AS qline_people_count FROM b_qline_data WHERE d_in = 0 and ind=? AND qline_date = CURRENT_DATE() GROUP BY qline_type ORDER BY 
    CASE 
        WHEN qline_type = 'free' THEN 0
        ELSE 1
    END, 
    qline_type;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}

export function ttyw_qlinecountdetailsMdl(data, callback) {
  var cntxtDtls = "in ttyw_qlinecountdetailsMdl";
  var values = [0, 0, 0, 0, 0];
  var QRY_TO_EXEC = `SELECT SUM(CASE WHEN d_in = 0 and ind=? THEN qline_people_count ELSE 0 END) AS total_people_count, SUM(CASE WHEN d_in = 0 and ind=? AND qline_date = CURRENT_DATE() THEN qline_people_count ELSE 0 END) AS today_people_count, SUM(CASE WHEN d_in = 0 and ind=? AND qline_date = CURRENT_DATE() - INTERVAL 1 DAY THEN qline_people_count ELSE 0 END) AS yesterday_people_count, SUM(CASE WHEN d_in = 0 and ind=? AND qline_date >= DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY) AND qline_date < CURRENT_DATE() + INTERVAL (7 - WEEKDAY(CURRENT_DATE())) DAY THEN qline_people_count ELSE 0 END) AS week_people_count FROM b_qline_data where d_in='0' and ind=?;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}

export function getQlinewisehourlycountanalysisMdl(data, callback) {
  var cntxtDtls = "getQlinewisehourlycountanalysisMdl";
  const IST = "Asia/Kolkata";
  //   var mdate = moment().tz(IST).format("YYYY-MM-DD");
  // const mdate = CURRENT_DATE();
  // console.log(data, 'tetststs');

  let condQueery = ``;
  if (data.selectedQline == "All") {
    condQueery = ``;
  } else {
    // const map = {
    //   "Queue 1": "Q1",
    //   "Queue 2": "Q2",
    //   "Queue 3": "Q3",
    //   "Queue 4": "Q4",
    //   "Queue 5": "Q5",
    //   "Queue 6": "Q6",
    //   "Queue 7": "Q7",
    // };

    // let value = map[data.selectedQline] || null;
    condQueery = `AND qline_type = '${data.selectedQline}'`;
  }

  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id = ${data.temple_id}`;
  }


  var QRY_TO_EXEC = `SELECT qline_time, sum(qline_people_count) AS total_people FROM b_qline_data WHERE  d_in='0' and ind=? and qline_date =CURRENT_DATE() ${condQueery} ${whereCondition}  GROUP BY qline_time order by qline_time_id asc;`;
  let paramsData = [data.ind];
  // console.log(QRY_TO_EXEC);
  // console.log(paramsData);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getweekwiseqlineanalysisMdl(data, callback) {
  var cntxtDtls = "in getweekwiseqlineanalysisMdl";
  var values = [0];
  console.log(data, 'datadatadatadata');

  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id = ${data.temple_id}`;
  }
  var QRY_TO_EXEC = `SELECT 
    CONVERT_TZ(qline_date, '+00:00', '+05:30') AS date,    
    SUM(CASE WHEN qline_type IN ('Q1','Q2','Q3','Q4','Q5','Q6','Q7') THEN qline_people_count ELSE 0 END) AS free_count,
    SUM(CASE WHEN qline_type = '100' THEN qline_people_count ELSE 0 END) AS hundred_count,
    SUM(CASE WHEN qline_type = '300' THEN qline_people_count ELSE 0 END) AS threehundred_count,
    SUM(CASE WHEN qline_type = 'protocol' THEN qline_people_count ELSE 0 END) AS protocol_count,
    SUM(qline_people_count) AS total_count
FROM 
    b_qline_data 
WHERE 
    d_in = 0 
    AND ind = ? ${whereCondition}
    AND DATE(CONVERT_TZ(qline_date, '+00:00', '+05:30'))>= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
GROUP BY 
    DATE(CONVERT_TZ(qline_date, '+00:00', '+05:30'))
ORDER BY 
    qline_date;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}

// anna
export function getanndanamnewQlineCountsMdl(data, callback) {
  var cntxtDtls = "getanndanamnewQlineCountsMdl";
  const IST = "Asia/Kolkata";
  //   var mdate = moment().tz(IST).format("YYYY-MM-DD");
  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id = ?`;
  }


  let values = [data.temple_id];

  var mdate = "2026-01-24";
  var QRY_TO_EXEC = `WITH RECURSIVE dates AS (
    SELECT CURDATE() AS qline_date
    UNION ALL
    SELECT DATE_SUB(qline_date, INTERVAL 1 DAY)
    FROM dates
    WHERE qline_date > DATE_SUB(CURDATE(), INTERVAL 6 DAY)
)
SELECT 
    d.qline_date,
    SUM(CASE WHEN b.qline_type = 'A1' THEN b.qline_people_count ELSE 0 END) AS a1line_count,
    SUM(CASE WHEN b.qline_type = 'A2' THEN b.qline_people_count ELSE 0 END) AS a2line_count,
    SUM(COALESCE(b.qline_people_count, 0)) AS total
FROM dates d
LEFT JOIN b_qline_data b
    ON DATE(b.qline_date) = d.qline_date
    AND b.ind = 2
${whereCondition}
GROUP BY d.qline_date
ORDER BY d.qline_date DESC;;
`;
  let paramsData = [data.temple_id];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function annaprasadhamgetHourwiseqlineanalysisMdl(data, callback) {
  var cntxtDtls = "annaprasadhamgetHourwiseqlineanalysisMdl";
  const IST = "Asia/Kolkata";
  var mdate = moment().tz(IST).format("YYYY-MM-DD");
  let condQueery = ``;
  let dateQueery = ``;
  if (data.selectedQline == "All") {
    condQueery = ``;
  } else {
    const map = {
      "Queue 1": "A1",
      "Queue 2": "A2",
    };

    let value = map[data.selectedQline] || null;
    condQueery = `AND qline_type = '${value}'`;
  }
  if (data.selecteddate == "All") {
    dateQueery = ``;
  } else {
    // let value = map[data.selectedQline] || null;
    dateQueery = `and qline_date ='${data.selecteddate}'`;
  }

  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id =${data.temple_id}`;
  }


  var QRY_TO_EXEC = `SELECT qline_time, sum(qline_people_count) AS total_people FROM b_qline_data WHERE  d_in='0' and ind=? ${dateQueery} ${condQueery} ${whereCondition}  GROUP BY qline_time order by qline_time_id asc;`;
  let paramsData = [data.ind];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function annaprasadhamDaywiseqlineanalysisMdl(data, callback) {
  var cntxtDtls = "in annaprasadhamDaywiseqlineanalysisMdl";
  var values = [data.ind];
  let condQueery = ``;
  let dateQueery = ``;
  // Generate date range for the last 7 days
  let startDate, endDate;

  if (data.selecteddate == "All") {
    // When "All" is selected, get last 7 days including today
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6); // Last 7 days including today

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    startDate = formatDate(sevenDaysAgo);
    endDate = formatDate(today);
    dateQueery = `AND DATE(CONVERT_TZ(qline_date, '+00:00', '+05:30')) BETWEEN '${startDate}' AND '${endDate}'`;
  } else {
    // When a specific date is selected, use that date only
    dateQueery = `AND DATE(CONVERT_TZ(qline_date, '+00:00', '+05:30')) = '${data.selecteddate}'`;
  }

  if (data.selectedQline == "All") {
    condQueery = ``;
  } else {
    const map = {
      "Queue 1": "A1",
      "Queue 2": "A2",
    };

    let value = map[data.selectedQline] || null;
    condQueery = `AND qline_type = '${value}'`;
  }

  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``
  } else {
    whereCondition = `and temple_id = ${data.temple_id}`;
  }



  var QRY_TO_EXEC = `SELECT 
    CONVERT_TZ(qline_date, '+00:00', '+05:30') AS date,
    SUM(qline_people_count) AS total_count
FROM 
    b_qline_data 
WHERE 
    d_in = 0 
    AND ind = ?
    ${dateQueery}
    ${condQueery}
${whereCondition}
GROUP BY 
    DATE(CONVERT_TZ(qline_date, '+00:00', '+05:30'))
ORDER BY 
    qline_date;`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}

export function annaprasadhamanalysisMdl(data, callback) {
  var cntxtDtls = "in annaprasadhamanalysisMdl";
  let values = [];
  let whereCondition = "";
  if (data.temple_id == 'all') {
    whereCondition = ``;
    values = [2];
  } else {
    whereCondition = `and temple_id = ?`;
    values = [2, data.temple_id];
  }

  var QRY_TO_EXEC = `SELECT 
    DATE_FORMAT(qline_date, '%Y-%m-%d') AS date,
    SUM(qline_people_count) AS total_count,

    SUM(CASE WHEN qline_type = 'A1' THEN qline_people_count ELSE 0 END) AS cam_one,
    SUM(CASE WHEN qline_type = 'A2' THEN qline_people_count ELSE 0 END) AS cam_two
FROM 
    b_qline_data 
WHERE 
    d_in = 0 
    AND ind = ? ${whereCondition}
GROUP BY 
    DATE_FORMAT(qline_date, '%Y-%m-%d')
ORDER BY 
    qline_date;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}

export function annaprasadhamtimeMdl(data, callback) {
  var cntxtDtls = "in annaprasadhamtimeMdl";
  var values = [data.date];
  var QRY_TO_EXEC = `WITH hours AS (
    SELECT 0 AS hour_num UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
    SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
    SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL 
    SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL 
    SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL 
    SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23
),
formatted_hours AS (
    SELECT 
        hour_num,
        LPAD(hour_num, 2, '0') AS hour_24,
                CONCAT(
            DATE_FORMAT(STR_TO_DATE(hour_num, '%H'), '%l:%i %p'),
            ' to ',
            DATE_FORMAT(STR_TO_DATE((hour_num + 1) % 24, '%H'), '%l:%i %p')
        ) AS hour_label

    FROM hours
),
data_hourly AS (
    SELECT 
        DATE_FORMAT(qline_date, '%Y-%m-%d') AS date,
        CAST(DATE_FORMAT(STR_TO_DATE(REPLACE(qline_time, 'Up to ', ''), '%I%p'), '%H') AS UNSIGNED) AS hour_num,
        qline_type,
        qline_people_count
    FROM 
        b_qline_data
    WHERE 
        d_in = 0 
        AND ind = 2
        AND DATE_FORMAT(qline_date, '%Y-%m-%d') = ?
)
SELECT 
    fh.hour_label,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'A1' THEN dh.qline_people_count ELSE 0 END), 0) AS cam_one,
    COALESCE(SUM(CASE WHEN dh.qline_type = 'A2' THEN dh.qline_people_count ELSE 0 END), 0) AS cam_two,
    COALESCE(SUM(dh.qline_people_count), 0) AS total_count
FROM 
    formatted_hours fh
LEFT JOIN 
    data_hourly dh ON fh.hour_num = dh.hour_num
GROUP BY 
    fh.hour_label, fh.hour_num
ORDER BY 
    fh.hour_num;
`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
  }
}

// parking

export function getparkingdataMdl(data, callback) {
  var cntxtDtls = "in getparkingdataMdl";
  var QRY_TO_EXEC = `SELECT a.id AS parking_area_id, a.icon_type, a.title, a.total_capacity, COALESCE(b.bus, 0) AS bus, COALESCE(b.dcm, 0) AS dcm, COALESCE(b.tempo, 0) AS tempo, COALESCE(b.cars, 0) AS cars, COALESCE(b.time, '00:00:00') AS time, COALESCE(b.date, CURRENT_DATE()) AS date FROM b_lat_dlts AS a LEFT JOIN b_lat_dlts_tracking AS b ON a.id = b.parking_area_id WHERE a.icon_type = 'Parking' group by a.id   ORDER BY a.order_ind ASC;
`;
  // console.log(data, QRY_TO_EXEC);

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getparkingcardscountdataMdl(data, callback) {
  var cntxtDtls = "in getparkingdataMdl";
  var QRY_TO_EXEC = `SELECT sum(bus) as bus, sum(dcm) as dcm, sum(tempo) as tempo, sum(cars) as cars from b_lat_dlts_tracking;
`;
  // console.log(data, QRY_TO_EXEC);

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

// temples camerafeed

export function templesCamerasFeedDataMdl(data, callback) {
  var cntxtDtls = "in templesCamerasFeedDataMdl";
    console.log(data);

  var QRY_TO_EXEC = `
        INSERT INTO b_people_count_events 
        (feedName, locationName,  countd, camera_its,reqId,temple_id) 
        VALUES (?, ?, ?, ?, ?,?)`;

  const values = [
    data.queue,
    data.camera,
    data.count,
    data.timestamp,
    data.reqId,
    data.temple_id || 0
  ];
  //  console.log(values,'values');

  if (callback && typeof callback === "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      values,
      cntxtDtls,
      function (err, results) {
        if (err) return callback(err);

        //type start
        let indd;
        let typeName;

        if (data.queue == "A1") {
          indd = 2;
          typeName = "A1";
        }
        else if (data.queue == "A2") {
          indd = 2;
          typeName = "A2";
        }

        else if (data.queue == 'Q1') {
          indd = 0;
          typeName = "Q1";
        }
        else if (data.queue == 'Q2') {
          indd = 0;
          typeName = "Q2";
        }
        else if (data.queue == 'Q3') {
          indd = 0;
          typeName = "Q3";
        }
        else if (data.queue == 'Q4') {
          indd = 0;
          typeName = "Q4";
        }
        else if (data.queue == 'Q5') {
          indd = 0;
          typeName = "Q5";
        }
        else if (data.queue == 'Q6') {
          indd = 0;
          typeName = "Q6";
        } else if (data.queue == 'Q7') {
          indd = 0;
          typeName = "Q7";
        }
        // else if (
        //   data.queue == "Q1" ||
        //   data.queue == "Q2" ||
        //   data.queue == "Q3" ||
        //   data.queue == "Q4" ||
        //   data.queue == "Q5" ||
        //   data.queue == "Q6"
        // ) {
        //   indd = 0;
        //   typeName = "Free";
        // }

        else if (data.queue == 'P1') {
          indd = 15;
          typeName = "P1";
        }

        else if (data.queue == 'P2') {
          indd = 15;
          typeName = "P2";
        }

        else {
          indd = 14;
          typeName = data.queue;
        }
        //type end

        // Use moment with +05:30 offset for IST
        const nowIST = moment().utcOffset("+05:30");
        const currentDate = nowIST.format("YYYY-MM-DD"); // e.g., '2025-09-22'
        const currentHour = nowIST.hour(); // e.g., 14 (for 2 PM)

        const checkQuery = `
                SELECT * FROM b_qline_data WHERE qline_type = ? AND qline_date = ? AND qline_time_id = ? and temple_id=?`;
        const checkValues = [typeName, currentDate, currentHour, data.temple_id];

        sqlinjection(
          MySQLConPool,
          checkQuery,
          checkValues,
          cntxtDtls,
          function (err, rows) {
            if (err) return callback(err);

            //timings start
            let timed;
            if (currentHour == 0) {
              timed = "12AM to 01AM";
            } else if (currentHour == 1) {
              timed = "01AM to 02AM";
            } else if (currentHour == 2) {
              timed = "02AM to 03AM";
            } else if (currentHour == 3) {
              timed = "03AM to 04AM";
            } else if (currentHour == 4) {
              timed = "04AM to 05AM";
            } else if (currentHour == 5) {
              timed = "05AM to 06AM";
            } else if (currentHour == 6) {
              timed = "06AM to 07AM";
            } else if (currentHour == 7) {
              timed = "07AM to 08AM";
            } else if (currentHour == 8) {
              timed = "08AM to 09AM";
            } else if (currentHour == 9) {
              timed = "09AM to 10AM";
            } else if (currentHour == 10) {
              timed = "10AM to 11AM";
            } else if (currentHour == 11) {
              timed = "11AM to 12PM";
            } else if (currentHour == 12) {
              timed = "12PM to 01PM";
            } else if (currentHour == 13) {
              timed = "01PM to 02PM";
            } else if (currentHour == 14) {
              timed = "02PM to 03PM";
            } else if (currentHour == 15) {
              timed = "03PM to 04PM";
            } else if (currentHour == 16) {
              timed = "04PM to 05PM";
            } else if (currentHour == 17) {
              timed = "05PM to 06PM";
            } else if (currentHour == 18) {
              timed = "06PM to 07PM";
            } else if (currentHour == 19) {
              timed = "07PM to 08PM";
            } else if (currentHour == 20) {
              timed = "08PM to 09PM";
            } else if (currentHour == 21) {
              timed = "09PM to 10PM";
            } else if (currentHour == 22) {
              timed = "10PM to 11PM";
            } else if (currentHour == 23) {
              timed = "11PM to 12AM";
            }
            //timings end
            if (rows.length > 0) {
              const ucheckValues = [typeName, currentDate, currentHour, data.temple_id];
              const updateQuery = `
                        UPDATE b_qline_data 
                        SET qline_people_count = qline_people_count + 1 
                        WHERE qline_type = ? AND qline_date = ? AND qline_time_id = ? and temple_id=? `;
              sqlinjection(
                MySQLConPool,
                updateQuery,
                ucheckValues,
                cntxtDtls,
                callback
              );
            } else {
              const icheckValues = [
                data.temple_id || 0,
                typeName,
                currentDate,
                currentHour,
                timed,
                indd,
              ];
              const insertQuery = `
                        INSERT INTO b_qline_data (temple_id, qline_type, qline_date, qline_time_id,qline_time, ind, qline_people_count) 
                        VALUES (?, ?, ?, ?, ?,?, 1)`;
              sqlinjection(
                MySQLConPool,
                insertQuery,
                icheckValues,
                cntxtDtls,
                callback
              );
            }
          }
        );
      }
    );
  } else {
    return execQuery(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
  }
}

export function getAiAnalysisTemplesMdl(data, callback) {
  var cntxtDtls = "in getAiAnalysisTemplesMdl";
  const { type } = data;
  let whereCondition = "";
  let temple_id = "";

  if(data.role_type == '1' || data.role_type == '15'){
    temple_id = ``;
  }else{
    temple_id = `and nine_and_nine_id='${data.temple_id}'`;
  }

  if (type === "All") {
    whereCondition = `and ai_analysis=1`
  } else if (type === "darshanam") {
    whereCondition = `and ai_analysis=1 and darshnam_ind=1`
  } else if (type === "annapradham") {
    whereCondition = `and ai_analysis=1 and anaprasdam_ind=1`
  } else if (type === "darshantime") {
    whereCondition = `and ai_analysis=1 and darshnam_time_nd=1`
  }
  else if (type === "vehicle") {
    whereCondition = `and ai_analysis=1 and vehicle_managenment_ind=1`
  }
  // All
  // darshanam
  // annapradham
  // darshantime
  var QRY_TO_EXEC = `SELECT * FROM  temple_registration  where d_in=0 ${temple_id} ${whereCondition} order by temple_id desc`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}


export function newQlineWaitngDetailsMdl(data, callback) { // last 10 records
  var cntxtDtls = "newQlineWaitngDetailsMdl";
  const IST = "Asia/Kolkata";
  //   var mdate = moment().tz(IST).format("YYYY-MM-DD");
  var mdate = moment().utcOffset("+05:30").format("YYYY-MM-DD");
  var QRY_TO_EXEC = `WITH queue1 AS (
    SELECT 
        barcode,
        MAX(CASE WHEN location_id = 1 THEN STR_TO_DATE(CONCAT(DATE(date), ' ', entry_time), '%Y-%m-%d %H:%i:%s') END) AS loc1_time,
        MAX(CASE WHEN location_id = 2 THEN STR_TO_DATE(CONCAT(DATE(date), ' ', entry_time), '%Y-%m-%d %H:%i:%s') END) AS loc2_time,
        MAX(CASE WHEN location_id = 6 THEN STR_TO_DATE(CONCAT(DATE(date), ' ', entry_time), '%Y-%m-%d %H:%i:%s') END) AS loc6_time
    FROM b_tagentries
    WHERE location_id IN (1,2,6)
      AND DATE(date) = CURRENT_DATE()
    GROUP BY barcode
),
queue2 AS (
    SELECT 
        barcode,
        MAX(CASE WHEN location_id = 3 THEN STR_TO_DATE(CONCAT(DATE(date), ' ', entry_time), '%Y-%m-%d %H:%i:%s') END) AS loc3_time,
        MAX(CASE WHEN location_id = 4 THEN STR_TO_DATE(CONCAT(DATE(date), ' ', entry_time), '%Y-%m-%d %H:%i:%s') END) AS loc4_time,
        MAX(CASE WHEN location_id = 6 THEN STR_TO_DATE(CONCAT(DATE(date), ' ', entry_time), '%Y-%m-%d %H:%i:%s') END) AS loc6_time
    FROM b_tagentries
    WHERE location_id IN (3,4,6)
      AND DATE(date) = CURRENT_DATE()
    GROUP BY barcode
),
q1_last10 AS (
    SELECT
        barcode,
        TIMESTAMPDIFF(SECOND, loc1_time, loc2_time) AS holding_area_seconds,
        TIMESTAMPDIFF(SECOND, loc2_time, loc6_time) AS waiting_inline_seconds,
        TIMESTAMPDIFF(SECOND, loc1_time, loc2_time) 
        + TIMESTAMPDIFF(SECOND, loc2_time, loc6_time) AS total_waiting_seconds
    FROM queue1
    WHERE loc1_time IS NOT NULL AND loc2_time IS NOT NULL AND loc6_time IS NOT NULL
    ORDER BY barcode DESC
    LIMIT 10
),
q2_last10 AS (
    SELECT
        barcode,
        TIMESTAMPDIFF(SECOND, loc3_time, loc4_time) AS holding_area_seconds,
        TIMESTAMPDIFF(SECOND, loc4_time, loc6_time) AS waiting_inline_seconds,
        TIMESTAMPDIFF(SECOND, loc3_time, loc4_time)
        + TIMESTAMPDIFF(SECOND, loc4_time, loc6_time) AS total_waiting_seconds
    FROM queue2
    WHERE loc3_time IS NOT NULL AND loc4_time IS NOT NULL AND loc6_time IS NOT NULL
    ORDER BY barcode DESC
    LIMIT 10
)

SELECT 
    'Queue 1' AS queue_name,
    AVG(holding_area_seconds) AS avg_holding_area_seconds,
    AVG(waiting_inline_seconds) AS avg_waiting_inline_seconds,
    AVG(total_waiting_seconds) AS avg_total_waiting_seconds
FROM q1_last10

UNION ALL

SELECT 
    'Queue 2' AS queue_name,
    AVG(holding_area_seconds) AS avg_holding_area_seconds,
    AVG(waiting_inline_seconds) AS avg_waiting_inline_seconds,
    AVG(total_waiting_seconds) AS avg_total_waiting_seconds
FROM q2_last10;;`;
  let paramsData = [mdate]
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    }
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getFireAlertUrlsMdl(data, callback) {
  var cntxtDtls = "in getFireAlertUrlsMdl";
  var values = [data.cam];
  var QRY_TO_EXEC = `select * from b_firealerts_urls where d_in='0' and camera=?`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
}
