import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection } from "../../../utils/utils.js";
import moment from "moment-timezone";

//Accommodation

// export function getTempleMasterMdl(data, callback) {
//     const cntxtDtls = "in getTempleMasterMdl";
//     const QRY_TO_EXEC = `SELECT * FROM e_temple_master where d_in=0`;
//     let paramsData = [];
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//     }
// }

export function createeRoomMasterMdl(data, callback) {
  const cntxtDtls = "in createeRoomMasterMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { temple_id, district_id, block_name, description, instructions, room_image_url, entry_by, reqId } = data;
  //console.log(data, 32)
  const QRY_TO_EXEC = `INSERT INTO e_room_master (temple_id,district_id,block_name, description,instructions,
                               room_image_url,entry_by,reqId,date,active) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)`;

  let values = [
    temple_id,
    district_id,
    block_name,
    description,
    instructions,
    room_image_url,
    entry_by,
    reqId,
    dated,
    1,
  ];

  sqlinjection(MySQLConPool, QRY_TO_EXEC, values, "createeRoomMasterMdl", function (err, results) {
    if (err) {
      if (callback) callback(err, null);
      return;
    }
    const masterId = results.insertId;

    if (Array.isArray(data.roomDetails)) {
      const entryTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
      const entryDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

      data.roomDetails.forEach((slot) => {
        const QRY_SLOT = `
            INSERT INTO e_room_sub 
            (temple_id, main_table_id,
            room_type,no_of_rooms, 
            persons_allowed, price, 
            gst,maintenance,total_cost,
             entry_by, entry_i_ts, entry_date)
             VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)
        `;

        const paramsSlot = [
          data.temple_id,
          masterId,
          slot.room_type,
          slot.no_of_rooms,
          slot.persons_allowed,
          slot.price,
          slot.gst,
          slot.maintenance_cost,
          slot.total,
          data.entry_by,
          entryTime,
          entryDate,
        ];
        //console.log(paramsSlot, QRY_SLOT, 364)

        sqlinjection(MySQLConPool, QRY_SLOT, paramsSlot, "insertSlotDetails");
      });
    }

    if (callback) callback(null, results);
  });
}

export function geteRoomMasterMdl(data, user, callback) {
  let condQuery = ``;
  let paramsData = [];
  if (user.role_type == "1" || user.role_type == "2") {
    condQuery = ``;
    paramsData = [];
  } else {
    condQuery = `and e.temple_id=?`;
    paramsData = [data.temple_id];
  }

  const cntxtDtls = "in geteRoomMasterMdl";
  const QRY_TO_EXEC = `SELECT e.*,t.temple_name_english FROM e_room_master as e 
    join e_temple_master as t on t.temple_id =e.temple_id where e.d_in=0 ${condQuery};`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function updateeRoomMasterMdl(data, callback) {
  const cntxtDtls = "in updateeRoomMasterMdl";
  const {
    temple_id,
    room_category,
    room_name,
    price,
    gst_applicable,
    max_occupancy,
    total_rooms,
    checkin_time,
    checkout_time,
    amenities,
    id_proof_required,
    allocation_rules,
    room_image_url,
    updated_by,
    rowId,
  } = data;
  const QRY_TO_EXEC = `UPDATE e_room_master SET temple_id = ?, room_category = ?, room_name = ?, price = ?, gst_applicable = ?, max_occupancy = ?, total_rooms = ?, checkin_time = ?, checkout_time = ?, amenities = ?, id_proof_required = ?, allocation_rules = ?, room_image_url = ?,updated_by=? WHERE reqId = ?`;

  let paramsData = [
    temple_id,
    room_category,
    room_name,
    price,
    gst_applicable,
    max_occupancy,
    total_rooms,
    checkin_time,
    checkout_time,
    amenities,
    id_proof_required,
    allocation_rules,
    room_image_url,
    updated_by,
    rowId,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function deleteeRoomMasterMdl(data, callback) {
  const cntxtDtls = "in deleteeRoomMasterMdl";
  const { d_by, rowId } = data;
  const QRY_TO_EXEC = `UPDATE e_room_master  SET d_in = 1,d_by=? WHERE reqId = ?`;

  let paramsData = [d_by, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

// prasadam

// export function createePrasadamMasterMdl(data, callback) {
//     const cntxtDtls = "in createePrasadamMasterMdl";
//     const IST = "Asia/Kolkata";
//     let dated = moment().tz(IST).format("YYYY-MM-DD");
//     let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
//     const { temple_id, district_id, name_in_telugu, name_in_english, price, max_booking_per_order, from_time, to_time, description, entry_by, reqId } = data;
//     const QRY_TO_EXEC = `INSERT INTO e_prasadam_master (temple_id,district_id, name_in_telugu, name_in_english, price,
//                        max_booking_per_order, from_time, to_time, description,entry_by,date,reqId,active) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)`;

//     let paramsData = [temple_id, district_id, name_in_telugu, name_in_english, price, max_booking_per_order, from_time, to_time, description, entry_by, dated, reqId, 1];

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     } else {
//         ``
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//     }
// }
// export function createePrasadamMasterMdl(data, callback) {
//   const cntxtDtls = "in createePrasadamMasterMdl";
//   const IST = "Asia/Kolkata";
//   let dated = moment().tz(IST).format("YYYY-MM-DD");
//   let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
//   const {
//     temple_id,
//     district_id,
//     name_in_telugu,
//     name_in_english,
//     price,
//     max_booking_per_order,
//     from_time,
//     to_time,
//     description,
//     prasadam_image_url,
//     entry_by,
//     reqId,
//   } = data;
//   const QRY_TO_EXEC = `INSERT INTO e_prasadam_master (temple_id,district_id, name_in_telugu, name_in_english, price,
//                        max_booking_per_order, from_time, to_time, description,img_one,entry_by,date,reqId,active) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`;

//   let paramsData = [
//     temple_id,
//     district_id,
//     name_in_telugu,
//     name_in_english,
//     price,
//     max_booking_per_order,
//     from_time,
//     to_time,
//     description,
//     prasadam_image_url,
//     entry_by,
//     dated,
//     reqId,
//     1,
//   ];

//   if (callback && typeof callback == "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//       callback(err, results);
//       return;
//     });
//   } else {
//     ``;
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//   }
// }

export function createePrasadamMasterMdl(data, callback) {
  const cntxtDtls = "in createePrasadamMasterMdl";
  const IST = "Asia/Kolkata";
  let dated = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const {
    temple_id,
    district_id,
    name_in_telugu,
    name_in_english,
    price,
    max_booking_per_order,
    from_time,
    to_time,
    description,
    prasadam_image_url,
    max_booking_per_order_whatsapp,
    entry_by,
    reqId,
  } = data;
  const QRY_TO_EXEC = `INSERT INTO e_prasadam_master (temple_id,district_id, name_in_telugu, name_in_english, price, 
                       max_booking_per_order, from_time, to_time, description,img_one,max_booking_per_order_whatsup,entry_by,date,reqId,active) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`;

  let paramsData = [
    temple_id,
    district_id,
    name_in_telugu,
    name_in_english,
    price,
    max_booking_per_order,
    from_time,
    to_time,
    description,
    prasadam_image_url,
    max_booking_per_order_whatsapp,
    entry_by,
    dated,
    reqId,
    1,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    ``;
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getePrasadamMasterMdl(data, user, callback) {
  const cntxtDtls = "in getePrasadamMasterMdl";
  let condQuery = ``;
  let paramsData = [];
  if (user.role_type == "1" || user.role_type == "2") {
    condQuery = ``;
    paramsData = [];
  } else {
    condQuery = `and e.temple_id=?`;
    paramsData = [data.temple_id];
  }
  const QRY_TO_EXEC = `SELECT e.*,t.temple_name_english FROM e_prasadam_master as e 
    join e_temple_master as t on t.temple_id =e.temple_id where e.d_in=0 ${condQuery}`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

// export function updateePrasadamMasterMdl(data, callback) {
//     const cntxtDtls = "in updateePrasadamMasterMdl";
//     const IST = "Asia/Kolkata";
//     let dated = moment().tz(IST).format("YYYY-MM-DD");
//     let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
//     const { name_in_telugu, name_in_english, price, max_booking_per_order, from_time, to_time, description, updated_by, rowId } = data;
//     const QRY_TO_EXEC = `UPDATE e_prasadam_master SET name_in_telugu = ?, name_in_english = ?, price = ?, max_booking_per_order = ?, from_time = ?, to_time = ?, description = ?,updated_by=?,updated_time=?,updated_date=? WHERE prasadam_id = ?`;

//     let paramsData = [name_in_telugu, name_in_english, price, max_booking_per_order, from_time, to_time, description, updated_by, i_ts, dated, rowId];

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//     }
// }
// export function updateePrasadamMasterMdl(data, callback) {
//   const cntxtDtls = "in updateePrasadamMasterMdl";
//   const IST = "Asia/Kolkata";
//   let dated = moment().tz(IST).format("YYYY-MM-DD");
//   let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
//   const {
//     name_in_telugu,
//     name_in_english,
//     price,
//     max_booking_per_order,
//     from_time,
//     to_time,
//     description,
//     prasadam_image_url,
//     updated_by,
//     rowId,
//   } = data;
//   const QRY_TO_EXEC = `UPDATE e_prasadam_master SET name_in_telugu = ?, name_in_english = ?, price = ?, max_booking_per_order = ?, from_time = ?, to_time = ?, description = ?,img_one = ?,updated_by=?,updated_time=?,updated_date=? WHERE prasadam_id = ?`;

//   let paramsData = [
//     name_in_telugu,
//     name_in_english,
//     price,
//     max_booking_per_order,
//     from_time,
//     to_time,
//     description,
//     prasadam_image_url,
//     updated_by,
//     i_ts,
//     dated,
//     rowId,
//   ];

//   if (callback && typeof callback == "function") {
//     sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//       callback(err, results);
//       return;
//     });
//   } else {
//     return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//   }
// }

export function updateePrasadamMasterMdl(data, callback) {
  const cntxtDtls = "in updateePrasadamMasterMdl";
  const IST = "Asia/Kolkata";
  let dated = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const {
    name_in_telugu,
    name_in_english,
    price,
    max_booking_per_order,
    from_time,
    to_time,
    description,
    prasadam_image_url,
    max_booking_per_order_whatsapp,
    updated_by,
    rowId,
  } = data;
  const QRY_TO_EXEC = `UPDATE e_prasadam_master SET name_in_telugu = ?, name_in_english = ?, price = ?, max_booking_per_order = ?, from_time = ?, to_time = ?, description = ?,img_one = ?,max_booking_per_order_whatsup = ?,updated_by=?,updated_time=?,updated_date=? WHERE prasadam_id = ?`;

  let paramsData = [
    name_in_telugu,
    name_in_english,
    price,
    max_booking_per_order,
    from_time,
    to_time,
    description,
    prasadam_image_url,
    max_booking_per_order_whatsapp,
    updated_by,
    i_ts,
    dated,
    rowId,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function deleteePrasadamMasterMdl(data, callback) {
  const cntxtDtls = "in deleteePrasadamMasterMdl";
  const { d_by, rowId } = data;
  const QRY_TO_EXEC = `UPDATE e_prasadam_master  SET d_in = 1,d_by=? WHERE reqId = ?`;

  let paramsData = [d_by, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

// Tonsure

export function createeTonsureMasterMdl(data, callback) {
  const cntxtDtls = "in createeTonsureMasterMdl";
  const IST = "Asia/Kolkata";
  let dated = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const {
    temple_id,
    district_id,
    name_in_telugu,
    name_in_english,
    price,
    daily_start_time,
    daily_end_time,
    entry_by,
    reqId,
  } = data;
  const QRY_TO_EXEC = `INSERT INTO e_tonsure_master (temple_id,district_id,name_in_telugu,name_in_english, price,
     daily_start_time, daily_end_time, entry_by,date,reqId,active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

  let paramsData = [
    temple_id,
    district_id,
    name_in_telugu,
    name_in_english,
    price,
    daily_start_time,
    daily_end_time,
    entry_by,
    dated,
    reqId,
    1,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function geteTonsureMasterMdl(data, user, callback) {
  let condQuery = ``;
  let paramsData = [];
  if (user.role_type == "1" || user.role_type == "2") {
    condQuery = ``;
    paramsData = [];
  } else {
    condQuery = `and e.temple_id=?`;
    paramsData = [data.temple_id];
  }
  const cntxtDtls = "in geteTonsureMasterMdl";
  const QRY_TO_EXEC = `SELECT e.*,t.temple_name_english FROM e_tonsure_master as e 
    join e_temple_master as t on t.temple_id =e.temple_id where e.d_in=0 ${condQuery};`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function updateeTonsureMasterMdl(data, callback) {
  const cntxtDtls = "in updateeTonsureMasterMdl";
  const IST = "Asia/Kolkata";
  let dated = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { name_in_telugu, name_in_english, price, daily_start_time, daily_end_time, updated_by, rowId } = data;
  const QRY_TO_EXEC = `UPDATE e_tonsure_master SET name_in_telugu = ?, name_in_english = ?, price = ?, daily_start_time = ?, daily_end_time = ?,updated_by=?,updated_date=?,updated_time=? WHERE tonsure_id  = ?`;

  let paramsData = [
    name_in_telugu,
    name_in_english,
    price,
    daily_start_time,
    daily_end_time,
    updated_by,
    dated,
    i_ts,
    rowId,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      //console.log(results, 319);
      //console.log(paramsData, 320);
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function deleteeTonsureMasterMdl(data, callback) {
  const cntxtDtls = "in deleteeTonsureMasterMdl";
  const { d_by, rowId } = data;
  const QRY_TO_EXEC = `UPDATE e_tonsure_master  SET d_in = 1,d_by=? WHERE reqId = ?`;

  let paramsData = [d_by, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

// dasrshanm

export function getTempleMastersMdl(data, callback) {
  var cntxtDtls = "in getTempleMastersMdl";
  const IST = "Asia/Kolkata";
  // var dated = moment().tz(IST).format("YYYY-MM-DD");
  var dated = "2025-06-01";

  // var QRY_TO_EXEC = `SELECT * FROM e_temple_master where d_in=0 and temple_id IN (?);`
  var QRY_TO_EXEC = `SELECT 
    tm.*,
    (
        SELECT GROUP_CONCAT(ets.service_id)
        FROM e_temple_service AS ets
        WHERE ets.temple_id = tm.temple_id
          AND ets.d_in = 0
    ) AS service_ids
FROM e_temple_master AS tm
WHERE tm.d_in = 0
  AND tm.temple_id IN (?);
`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getLastDarshnamDetailsMdl(data, callback) {
  var cntxtDtls = "in getLastDarshnamDetailsMdl";
  const IST = "Asia/Kolkata";
  // var dated = moment().tz(IST).format("YYYY-MM-DD");
  var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  var QRY_TO_EXEC = `SELECT * FROM e_darshan_master where d_in=0  Order by id DESC limit 1 ;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function postDarshnamDetailsMdl(data, callback) {
  var cntxtDtls = "in postDarshnamDetailsMdl";
  const IST = "Asia/Kolkata";
  let dated = moment().tz(IST).format("YYYY-MM-DD");
  // var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  let values = [
    data.temple_id,
    data.district_id,
    data.darshan_id,
    data.darshn_eng_nm,
    data.darshn_tel_nm,
    data.price,
    data.description,
    data.instructions,
    1,
    data.slot_booking_req,
    data.entry_by,
    dated,
    data.reqId,
  ];
  var QRY_TO_EXEC = `INSERT INTO  e_darshan_master( 
                       temple_id,district_id,darshan_id, darshan_name_english, darshan_name_telugu,
                      price, description,instructions,active,slot_booking_req, entry_by, entry_date,
                       reqId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;

  sqlinjection(MySQLConPool, QRY_TO_EXEC, values, "postDarshnamDetailsMdl", function (err, results) {
    if (err) {
      if (callback) callback(err, null);
      return;
    }
    const masterId = results.insertId;

    if (data.slot_booking_req == "1" && Array.isArray(data.slotDetails) && data.slotDetails.length > 0) {
      const entryTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
      const entryDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

      data.slotDetails.forEach((slot) => {
        const QRY_SLOT = `
            INSERT INTO e_darshan_slot_time_t 
            (temple_id,master_type, main_table_id,
            master_id,slot_name, 
            slot_start_time, slot_end_time, 
            max_capacity_slots,max_capacity_slots_whatsapp,
             entry_by, entry_time, entry_date)
             VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?,?,?)
        `;

        const paramsSlot = [
          data.temple_id,
          1,
          masterId,
          data.darshan_id,
          slot.slot_name,
          slot.s_start_time,
          slot.s_end_time,
          slot.s_max_person,
          slot.s_max_person_whatsapp,
          data.entry_by,
          entryTime,
          entryDate,
        ];
        //console.log(paramsSlot, QRY_SLOT, 364)

        sqlinjection(MySQLConPool, QRY_SLOT, paramsSlot, "insertSlotDetails");
      });
    }

    if (callback) callback(null, results);
  });
}

// export function createeTonsureMasterMdl(data, callback) {
//     //console.log(205,data);
//     const IST = "Asia/Kolkata";
//     let dated = moment().tz(IST).format("YYYY-MM-DD");
//     let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

//     const { temple_id, facility_type, slot_required, price, daily_start_time, daily_end_time, max_capacity_per_slot, dress_code, instructions, entry_by, reqId, slotDetails } = data;

//     const QRY_MASTER = `
//         INSERT INTO e_tonsure_master
//         (temple_id, facility_type, slot_required, price, daily_start_time, daily_end_time, max_capacity_per_slot, dress_code, instructions, entry_by, date, reqId)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const paramsMaster = [temple_id, facility_type, slot_required, price, daily_start_time, daily_end_time, max_capacity_per_slot, dress_code, instructions, entry_by, dated, reqId];

//     sqlinjection(MySQLConPool, QRY_MASTER, paramsMaster, "createeTonsureMasterMdl", function (err, results) {
//         if (err) {
//             if (callback) callback(err, null);
//             return;
//         }

//         const masterId = results.insertId;

//         if (slot_required === "1" && Array.isArray(slotDetails) && slotDetails.length > 0) {
//             const entryTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//             const entryDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

//             slotDetails.forEach(slot => {
//                 const QRY_SLOT = `
//             INSERT INTO tonsure_slot_time_t
//             (temple_id, main_table_id, slot_start_time, slot_end_time, max_capacity_slots, entry_by, entry_time, entry_date)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//                 const paramsSlot = [
//                     data.temple_id,
//                     masterId,
//                     slot.daily_start_time,
//                     slot.daily_end_time,
//                     slot.max_capacity_per_slot,
//                     data.entry_by,
//                     entryTime,
//                     entryDate
//                 ];

//                 sqlinjection(MySQLConPool, QRY_SLOT, paramsSlot, "insertSlotDetails");
//             });
//         }

//         if (callback) callback(null, results);
//     });
// }

export function getDarshnamDetailsMdl(data, user, callback) {
  var cntxtDtls = "in getDarshnamDetailsMdl";
  const IST = "Asia/Kolkata";
  // var dated = moment().tz(IST).format("YYYY-MM-DD");
  var dated = "2025-06-01";
  let condQuery = ``;
  let paramsData = [];
  if (user.role_type == "1" || user.role_type == "2") {
    condQuery = ``;
    paramsData = [];
  } else {
    condQuery = `and e.temple_id=?`;
    paramsData = [data.temple_id];
  }
  var QRY_TO_EXEC = `SELECT e.* ,et.temple_name_english  FROM   e_darshan_master as e JOIN e_temple_master as et ON e.temple_id=et.temple_id 
                           where e.d_in=0 ${condQuery};`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function editDarshnamDetailsMdl(data, callback) {
  var cntxtDtls = "in editDarshnamDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  let timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

  // var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  let values = [
    data.darshn_eng_nm,
    data.darshn_tel_nm,
    data.price,
    data.instructions,
    data.description,
    data.updated_by,
    dated,
    timed,
    data.rowId,
  ];
  var QRY_TO_EXEC = `UPDATE  e_darshan_master SET  darshan_name_english=?, darshan_name_telugu=?,
                       price=?, instructions=?,description=?, updated_by=?, upd_date=?,
                       upd_time=?
                    WHERE id=?`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function deleteDarshnamDetailsMdl(data, callback) {
  var cntxtDtls = "in deleteDarshnamDetailsMdl";
  const IST = "Asia/Kolkata";
  // var dated = moment().tz(IST).format("YYYY-MM-DD");
  let d_dated = moment().tz(IST).format("YYYY-MM-DD");
  let d_Time = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  var QRY_TO_EXEC = `UPDATE e_darshan_master  SET d_in=1,d_by=?,d_date=?,d_time=? WHERE id=? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.d_by, d_dated, d_Time, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getSevaDetailsMdl(data, callback) {
  var cntxtDtls = "in getSevaDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = "2025-06-01";
  var QRY_TO_EXEC = `SELECT * FROM e_seva_master where d_in=0  Order by id DESC limit 1 `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function submitSevaMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in submitSevaMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  // var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  let values = [
    data.seva_id,
    data.temple_id,
    data.district_id,
    data.seva_type_id,
    data.seva_type_name,
    data.seva_name_english,
    data.seva_name_telugu,
    data.description,
    data.amount,
    data.max_persons,
    data.instructions,
    1,
    data.slot_booking_req,
    data.entry_by,
    dated,
    data.reqId,
    data.week_days.join(","),
  ];
  var QRY_TO_EXEC = `INSERT INTO  e_seva_master( seva_id,temple_id,district_id,seva_type,seva_type_name, seva_name_english, 
                       seva_name_telugu,description, amount, max_persons, 
                       instructions,active,slot_booking_req, entry_by, entry_date,
                       reqId , week_days) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); `;

  sqlinjection(MySQLConPool, QRY_TO_EXEC, values, "submitSevaMastersDetailsMdl", function (err, results) {
    if (err) {
      if (callback) callback(err, null);
      return;
    }
    const masterId = results.insertId;

    if (data.slot_booking_req == "1" && Array.isArray(data.slotDetails) && data.slotDetails.length > 0) {
      const entryTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
      const entryDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

      data.slotDetails.forEach((slot) => {
        const QRY_SLOT = `
            INSERT INTO e_darshan_slot_time_t 
            (temple_id, master_type,main_table_id,
            master_id,slot_name, 
            slot_start_time, slot_end_time, 
            max_capacity_slots,max_capacity_slots_whatsapp,
             entry_by, entry_time, entry_date)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)
        `;

        const paramsSlot = [
          data.temple_id,
          2,
          masterId,
          data.seva_id,
          slot.slot_name,
          slot.s_start_time,
          slot.s_end_time,
          slot.s_max_person,
          slot.s_max_person_whatsapp,
          data.entry_by,
          entryTime,
          entryDate,
        ];
        //console.log(paramsSlot, QRY_SLOT, 364)

        sqlinjection(MySQLConPool, QRY_SLOT, paramsSlot, "insertSlotDetails");
      });
    }

    if (callback) callback(null, results);
  });
}

export function getsevaMastersdataMdl(data, user, callback) {
  const cntxtDtls = "in getsevaMastersdataMdl";
  let condQuery = ``;
  let paramsData = [];
  if (user.role_type == "1" || user.role_type == "2") {
    condQuery = ``;
    paramsData = [];
  } else {
    condQuery = `and e.temple_id=?`;
    paramsData = [data.temple_id];
  }

  const QRY_TO_EXEC = `SELECT e.* ,et.temple_name_english  FROM   e_seva_master as e
                         JOIN e_temple_master as et ON e.temple_id=et.temple_id 
                           where e.d_in=0 ${condQuery};`;
  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function editSevaMastersDetailsMdl(data, callback) {
  console.log(data, 687);
  var cntxtDtls = "in editSevaMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  let dated = moment().tz(IST).format("YYYY-MM-DD");
  let timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

  // var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  let values = [
    data.seva_type_id,
    data.seva_type_name,
    data.seva_name_english,
    data.seva_name_telugu,
    data.description,
    data.amount,
    data.max_persons,
    data.instructions,
    data.updated_by,
    dated,
    timed,
    data.week_days.join(","),
    data.rowId,
  ];
  var QRY_TO_EXEC = ` UPDATE e_seva_master SET seva_type = ?, seva_type_name=?, seva_name_english=?, seva_name_telugu=?,
                       description=?, amount=?,  max_persons=?,instructions=?, updated_by=?, updated_date=?,
                       updated_time=? , week_days = ? WHERE id = ? ; `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function deleteSevaMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in deleteSevaMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  let d_dated = moment().tz(IST).format("YYYY-MM-DD");
  let d_Time = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  var QRY_TO_EXEC = `UPDATE e_seva_master  SET d_in=1,d_by=?,d_date=?,d_time=? WHERE id=? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.d_by, d_dated, d_Time, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function inactiveDarshanMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in inactiveDarshanMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  var QRY_TO_EXEC = `UPDATE e_darshan_master  SET active=?,active_by=?,active_date=?,active_time=? WHERE id=? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.active, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
export function inactiveSevaMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in inactiveSevaMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  var QRY_TO_EXEC = `UPDATE e_seva_master  SET active=?,active_by=?,active_date=?,active_time=? WHERE id=? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.active, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getRoomDetailsMdl(data, callback) {
  var cntxtDtls = "in getRoomDetailsMdl";
  const IST = "Asia/Kolkata";
  // var dated = moment().tz(IST).format("YYYY-MM-DD");
  var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  var QRY_TO_EXEC = `SELECT rs.*,rm.block_name,rm.description,rm.room_image_url 
                            FROM e_room_sub AS rs 
                            JOIN e_room_master AS rm ON rm.room_id=rs.main_table_id 
                            WHERE rs.main_table_id=?;  `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.main_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getTheSlotDetailsMdl(data, callback) {
  var cntxtDtls = "in getTheSlotDetailsMdl";
  const IST = "Asia/Kolkata";
  // var dated = moment().tz(IST).format("YYYY-MM-DD");
  var dated = "2025-06-01";
  // YEAR(received_date) = YEAR('${dated}') AND MONTH(received_date) = MONTH('${dated}') and
  let table_name = ``;
  if (data.ind == 1) {
    table_name = `e_darshan_master`;
  } else {
    table_name = `e_seva_master`;
  }
  var QRY_TO_EXEC = `SELECT ds.*,dm.*,ds.id as slotId,dm.id as mainId
                     FROM  e_darshan_slot_time_t  AS ds 
                        JOIN  ${table_name} AS dm ON dm.id=ds.main_table_id  
                        WHERE ds.d_in=0 and ds.master_type=? and ds.main_table_id=? ; `;
  //console.log(data,QRY_TO_EXEC,794)
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.ind, data.main_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//RGTs Apis

export function getDistrictsMdl(data, callback) {
  var cntxtDtls = "in getDistrictsMdl";
  var QRY_TO_EXEC = `SELECT id as district_id,district_name,district_nm_telugu as district_name_telugu from districts_data WHERE d_in='0' ORDER BY district_name asc;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getTemplesMdl(data, callback) {
  var cntxtDtls = "in getTemplesMdl";
  var QRY_TO_EXEC = `SELECT temple_id,temple_name_english,temple_name_telugu,temple_image_url as temple_logo,district_id from e_temple_master WHERE d_in='0' and active='1' and district_id=? ORDER BY temple_name_english asc; `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.district_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
export function getServicesListMdl(data, callback) {
  var cntxtDtls = "in getServicesListMdl";
  var QRY_TO_EXEC = `SELECT s.id as service_id,s.service_name,s.service_name_telugu,t.temple_id from e_temple_service_whatsup as t join e_services as s on s.id=t.service_id WHERE t.d_in='0' and s.d_in='0' and t.temple_id=? and t.service_id not in (8,9) order by service_id; `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

// Darshnam start
export function getDarshnamServiceMdl(data, callback) {
  var cntxtDtls = "in getDarshnamServiceMdl";
  let paramsData = [];
  const QRY_TO_EXEC = `SELECT  id AS darshanam_id,darshan_name_english,darshan_name_telugu,description,price,temple_id,
    CASE 
        WHEN slot_booking_req = 1 THEN 'Yes'
        ELSE 'No'
    END AS slot_booking_req FROM e_darshan_master WHERE d_in = '0' and active=1 AND temple_id = ?;`;
  paramsData = [data.temple_id];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getDarshanSlotsMdl(data, callback) {
  var cntxtDtls = "in getDarshanSlotsMdl";
  const IST = "Asia/Kolkata";
  let darshanam_date = moment(data.darshanam_date).tz(IST).format("YYYY-MM-DD");
  // var dated = "2025-06-01";
  let paramsData = [];
  const QRY_TO_EXEC = `SELECT 
    s.id AS slot_id,s.main_table_id as darshanam_id,s.temple_id,CONCAT(DATE_FORMAT(s.slot_start_time, '%h:%i %p'),' to ',
        DATE_FORMAT(s.slot_end_time, '%h:%i %p')) AS slot_time,s.max_capacity_slots_whatsapp AS total_tickets,(SELECT COALESCE(SUM(no_persons), 0)
        FROM e_darshnam_orders WHERE d_in = '0' AND seva_date = ? and darshanam_id=? and s.id=slot_id) AS booked,
    (s.max_capacity_slots_whatsapp -(SELECT COALESCE(SUM(no_persons), 0)FROM e_darshnam_orders WHERE d_in = '0' AND seva_date = ? and darshanam_id=? and s.id=slot_id)) AS availability
    FROM e_darshan_slot_time_t AS s WHERE s.d_in = '0' AND s.master_type = '1' AND s.main_table_id = ?  AND s.temple_id = ? AND TIMESTAMP(?, s.slot_start_time) >= NOW() HAVING availability > 0;`;
  paramsData = [
    darshanam_date,
    data.darshanam_id,
    darshanam_date,
    data.darshanam_id,
    data.darshanam_id,
    data.temple_id,
    data.darshanam_date,
  ];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getTicketRefMdl(callback) {
  var cntxtDtls = "in getTicketRefMdl";
  var QRY_TO_EXEC = `SELECT id as ticket_id  from e_darshnam_orders order by id desc limit 1;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function createeDarshnamOrdersMdl(data, callback) {
  const cntxtDtls = "in createeDarshnamOrdersMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let seva_date = moment(data.darshanam_date).tz(IST).format("YYYY-MM-DD");

  const {
    temple_id,
    ticket_id,
    order_id,
    ticket_type,
    devotee_name,
    no_persons,
    slot_time,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    payment_status,
    payment_id,
    reqId,
    darshanam_id,
    slot_id,
  } = data;

  let soltId = 0;
  if (!["", null, undefined, "null", "undefined"].includes(slot_id)) {
    soltId = slot_id;
  } else {
    soltId = 0;
  }

  const QRY_TO_EXEC = `INSERT INTO e_darshnam_orders (temple_id, ticket_id, order_id, ticket_type, devotee_name, no_persons, slot_time, seva_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,darshanam_id,slot_id,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

  let paramsData = [
    temple_id,
    ticket_id,
    order_id,
    ticket_type,
    devotee_name,
    no_persons,
    slot_time,
    seva_date,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    i_ts,
    payment_status,
    payment_id,
    created_at,
    reqId,
    darshanam_id,
    soltId,
    i_ts,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

//Darshanm End

export function getCheckboxesDataMdl(data, callback) {
  var cntxtDtls = "in getCheckboxesDataMdl";
  const IST = "Asia/Kolkata";
  var QRY_TO_EXEC = `SELECT * FROM e_services where d_in=0;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

// export function updatetempleProfiledataMdl(data, callback) {
//     const cntxtDtls = "in updatetempleProfiledataMdl";
//     const IST = "Asia/Kolkata";
//     const dated = moment().tz(IST).format("YYYY-MM-DD");
//     const timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

//     console.log(data)

//     // Build dynamic part for temple image
//     let sqlImagePart = "";
//     let values = [
//         data.name_in_telugu,
//         data.name_in_english,
//         data.address,
//         data.email_id,
//         data.information,
//         data.temple_contact,
//         data.temple_timings,
//         data.updated_by,
//         dated,
//         timed,
//     ];

//     if (data.templePhoto && data.templePhoto.trim() !== "") {
//         sqlImagePart = "temple_image_url=?,";
//         values.splice(5, 0, data.templePhoto); // insert templePhoto at correct position
//     }

//     values.push(data.rowId); // temple_id at the end

//     // Build final query
//     const QRY_TO_EXEC = `UPDATE e_temple_master
//                          SET temple_name_telugu=?, temple_name_english=?,
//                              address=?, temple_email=?, information=?,
//                              ${sqlImagePart} temple_contact=?, temple_timings=?,
//                              updated_by=?, updated_date=?, updated_time=?
//                          WHERE temple_id=?`;

//     if (callback && typeof callback === "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
//     }
// }

export function updatetempleProfiledataMdl(data, callback) {
  const cntxtDtls = "in updatetempleProfiledataMdl";
  const IST = "Asia/Kolkata";
  const dated = moment().tz(IST).format("YYYY-MM-DD");
  const timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let sqlImagePart = "";
  let values = [
    data.name_in_telugu,
    data.name_in_english,
    data.address,
    data.email_id,
    data.information,
    data.temple_contact,
    data.temple_timings,
    data.break_timings,
    data.darshanam_timings,
    data.telugu_description,
    data.updated_by,
    dated,
    timed,
  ];
  if (data.templePhoto && data.templePhoto.trim() !== "") {
    sqlImagePart = "temple_image_url=?,temple_logo_url=?, ";
    values.splice(5, 0, data.templePhoto, data.templePhoto);
  }
  values.push(data.rowId);
  const QRY_TO_EXEC = `UPDATE e_temple_master  SET temple_name_telugu=?, temple_name_english=?, address=?, temple_email=?, information=?, ${sqlImagePart} temple_contact=?, temple_timings=?,break_timings=?,darshanam_timings=?,telugu_description=?, updated_by=?, updated_date=?, updated_time=? WHERE temple_id=?`;
  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
  }
}

export function inserttempleServicesIdMdl(templeId, selectedServiceIds, callback) {
  const cntxtDtls = "in updateTempleServices";

  const QRY_TO_EXEC = `SELECT service_id, d_in FROM e_temple_service WHERE temple_id = ?`;
  sqlinjection(MySQLConPool, QRY_TO_EXEC, [templeId], cntxtDtls, (err, results) => {
    if (err) return callback(err);

    const existingIds = results.map((r) => r.service_id);
    const deletedIds = results.filter((r) => r.d_in === 1).map((r) => r.service_id);
    const activeIds = results.filter((r) => r.d_in === 0).map((r) => r.service_id);

    const toInsert = selectedServiceIds.filter((id) => !existingIds.includes(id));
    const toReactivate = selectedServiceIds.filter((id) => deletedIds.includes(id));
    const toDelete = activeIds.filter((id) => !selectedServiceIds.includes(id));

    const execSql = (query, params, cb) => sqlinjection(MySQLConPool, query, params, cntxtDtls, cb);

    // Step 2: Soft delete removed services
    if (toDelete.length > 0) {
      const QRY_DEL = `UPDATE e_temple_service SET d_in = 1 WHERE temple_id = ? AND service_id IN (?)`;
      execSql(QRY_DEL, [templeId, toDelete], (err) => {
        if (err) return callback(err);
        proceedReactivate();
      });
    } else {
      proceedReactivate();
    }

    // Step 3: Reactivate previously deleted services
    function proceedReactivate() {
      if (toReactivate.length > 0) {
        const QRY_REACT = `UPDATE e_temple_service SET d_in = 0 WHERE temple_id = ? AND service_id IN (?)`;
        execSql(QRY_REACT, [templeId, toReactivate], (err) => {
          if (err) return callback(err);
          proceedInsert();
        });
      } else {
        proceedInsert();
      }
    }

    // Step 4: Insert completely new services
    function proceedInsert() {
      if (toInsert.length > 0) {
        const valuesArray = toInsert.map((serviceId) => [templeId, serviceId]);
        const QRY_INS = `INSERT INTO e_temple_service (temple_id, service_id) VALUES ?`;
        execSql(QRY_INS, [valuesArray], (err) => {
          if (err) return callback(err);
          callback(null, true);
        });
      } else {
        callback(null, true);
      }
    }
  });
}

export function inactivePrasadamMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in inactivePrasadamMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_prasadam_master  SET active=?,active_by=?,active_date=?,active_time=? WHERE prasadam_id =? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.active, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function inactiveTonsureMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in inactiveTonsureMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_tonsure_master  SET active=?,active_by=?,active_date=?,active_time=?  WHERE tonsure_id=? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.active, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function inactiveAccomodationMastersDetailsMdl(data, callback) {
  var cntxtDtls = "in inactiveAccomodationMastersDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_room_master  SET active=?,active_by=?,active_date=?,active_time=? WHERE room_id=? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.active, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function updateSlotDetailsMdl(data, callback) {
  var cntxtDtls = "in updateSlotDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  console.log(data, 1045);
  var QRY_TO_EXEC = `UPDATE e_darshan_slot_time_t  SET  slot_name=?,slot_start_time=?,slot_end_time=?,max_capacity_slots=? ,max_capacity_slots_whatsapp = ?, updated_by=?,updated_date=?,updated_time=?
                        WHERE id=? `;
  console.log(QRY_TO_EXEC, 1049);
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [
        data.slot_name,
        data.slot_start_time,
        data.slot_end_time,
        data.max_capacity_slots,
        data.max_capacity_slots_whatsapp,
        data.updated_by,
        dated,
        timed,
        data.slot_id,
      ],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getalltemplesdataMdl(data, callback) {
  var cntxtDtls = "in getalltemplesdataMdl";
  const IST = "Asia/Kolkata";
  var QRY_TO_EXEC = `SELECT etm.*,d.district_name AS districtName FROM e_temple_master AS etm LEFT JOIN districts_data AS d ON etm.district_id = d.id where etm.d_in=0;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//tp
export function editAllTempleProfileDetailsMdl(data, callback) {
  const cntxtDtls = "in editAllTempleProfileDetailsMdl";
  const IST = "Asia/Kolkata";
  const dated = moment().tz(IST).format("YYYY-MM-DD");
  const timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

  console.log(data);

  let sqlImagePart = "";
  let values = [
    data.temple_name_telugu,
    data.temple_name_english,
    data.address,
    data.email_id,
    data.information,
    data.support_number,
    data.updated_by,
    dated,
    timed,
  ];

  if (data.templePhoto && data.templePhoto.trim() !== "") {
    sqlImagePart = "temple_image_url=?,";
    values.splice(5, 0, data.templePhoto);
  }

  values.push(data.rowId);

  const QRY_TO_EXEC = `UPDATE e_temple_master 
                         SET temple_name_telugu=?, temple_name_english=?,
                             address=?, temple_email=?, information=?,
                             ${sqlImagePart} temple_contact=?, updated_by=?, updated_date=?, updated_time=?
                         WHERE temple_id=?`;

  console.log(QRY_TO_EXEC, values);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, values, cntxtDtls);
  }
}

export function deleteTempleProfileDetailsMdl(data, callback) {
  console.log(data, 920);
  var cntxtDtls = "in deleteTempleProfileDetailsMdl";
  const IST = "Asia/Kolkata";
  const dated = moment().tz(IST).format("YYYY-MM-DD");
  const timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

  const { d_by, rowId } = data;
  var QRY_TO_EXEC = `UPDATE e_temple_master  SET d_in=1,d_by=?,d_date=?,d_time=? WHERE temple_id=? `;
  let paramsData = [d_by, dated, timed, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function activeTempleProfileDetailsMdl(data, callback) {
  var cntxtDtls = "in activeTempleProfileDetailsMdl";
  const IST = "Asia/Kolkata";
  const dated = moment().tz(IST).format("YYYY-MM-DD");
  const timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

  const { active, active_by, rowId } = data;
  var QRY_TO_EXEC = `UPDATE e_temple_master  SET active=?,active_by=?,active_date=?,active_time=? WHERE temple_id=? `;
  let paramsData = [active, active_by, dated, timed, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function activeSlotVisibilityMdl(data, callback) {
  var cntxtDtls = "in activeSlotVisibilityMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  console.log(data, 1045);
  let tablename = ``;
  if (data.ind == 1) {
    tablename = `e_darshan_master`;
  } else {
    tablename = `e_seva_master`;
  }
  var QRY_TO_EXEC = `UPDATE ${tablename}  SET  slot_booking_req=?,slot_req_by=?,slot_req_date=?,slot_req_time=?
                        WHERE id=? `;
  console.log(QRY_TO_EXEC, 1049);
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.slotvisible, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function deleteSlotsSubMdl(data, callback) {
  var cntxtDtls = "in deleteSlotsSubMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  console.log(data, 1045);
  var QRY_TO_EXEC = `UPDATE e_darshan_slot_time_t  SET  d_in=1,d_by=?,d_date=?,d_time=?
                        WHERE id=? `;
  console.log(QRY_TO_EXEC, 1049);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.d_by, dated, timed, data.slotId], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function insertSlotDetailsMdl(data, callback) {
  var cntxtDtls = "in insertSlotDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  console.log(data, 1045);
  let paramsSlot = [
    data.temple_id,
    data.ind,
    data.id,
    data.seva_id,
    data.slot_name,
    data.slot_start_time,
    data.slot_end_time,
    data.max_capacity_slots,
    data.max_capacity_slots_whatsapp,
    data.entry_by,
    dated,
    timed,
  ];
  console.log(paramsSlot, 364);
  var QRY_TO_EXEC = `INSERT INTO e_darshan_slot_time_t  (temple_id, master_type,main_table_id,
            master_id,slot_name, 
            slot_start_time, slot_end_time, 
            max_capacity_slots,max_capacity_slots_whatsapp,
             entry_by, entry_time, entry_date)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;
  console.log(QRY_TO_EXEC, 1049);
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsSlot, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//mana mitra apis start
export function getTonsureMainMdl(data, callback) {
  var cntxtDtls = "in getTonsureMainMdl";
  var QRY_TO_EXEC = `SELECT temple_id,tonsure_id,name_in_english,name_in_telugu,price,CONCAT(
        DATE_FORMAT(daily_start_time, '%h:%i %p'),
        ' to ',
        DATE_FORMAT(daily_end_time, '%h:%i %p')
    ) AS description from e_tonsure_master WHERE d_in='0' and active='1' and temple_id=?;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getPrasadameMainMdl(data, callback) {
  var cntxtDtls = "in getPrasadameMainMdl";
  var QRY_TO_EXEC = `SELECT temple_id,prasadam_id,name_in_english,name_in_telugu,price,CONCAT('Available Daily from ',
        DATE_FORMAT(from_time, '%h:%i %p'),
        ' to ',
        DATE_FORMAT(to_time, '%h:%i %p')
    ) AS description,max_booking_per_order_whatsup as maximum_qty_per_order from e_prasadam_master WHERE d_in='0' and active='1' and temple_id=?;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getSevaTypesMdl(callback) {
  var cntxtDtls = "in getSevaTypesMdl";
  var QRY_TO_EXEC = `SELECT  id AS seva_type_id,seva_type_name,seva_type_name_telugu FROM e_seva_types WHERE d_in = '0';`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getSevaMainMdl(data, callback) {
  var cntxtDtls = "in getSevaMainMdl";
  var QRY_TO_EXEC = `SELECT  id AS seva_id,seva_name_english,seva_name_telugu,description,amount as price,temple_id,
    CASE 
        WHEN slot_booking_req = 1 THEN 'Yes'
        ELSE 'No'
    END AS slot_booking_req FROM e_seva_master WHERE d_in = '0' and active=1 AND temple_id = ? and seva_type =?;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id, data.seva_type], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getAccommodationMainMdl(data, callback) {
  var cntxtDtls = "in getAccommodationMainMdl";
  var QRY_TO_EXEC = `SELECT room_id,block_name,description,room_image_url from e_room_master WHERE d_in='0' and active='1' and temple_id=?;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getSevaSlotsMainMdl(data, callback) {
  var cntxtDtls = "in getSevaSlotsMainMdl";
  const IST = "Asia/Kolkata";
  let darshanam_date = moment(data.seva_date).tz(IST).format("YYYY-MM-DD");
  let paramsData = [];

  // const QRY_TO_EXEC = `SELECT
  // s.id AS slot_id,s.main_table_id as seva_id,s.temple_id,CONCAT(DATE_FORMAT(s.slot_start_time, '%h:%i %p'),' to ',
  //     DATE_FORMAT(s.slot_end_time, '%h:%i %p')) AS slot_time,s.max_capacity_slots AS total_tickets,(SELECT COALESCE(count(id), 0)
  //     FROM e_seva_orders WHERE d_in = '0' AND seva_date = ? and seva_id=? and s.id=slot_id ) AS booked,
  // (s.max_capacity_slots -(SELECT COALESCE(count(id), 0)FROM e_seva_orders WHERE d_in = '0' AND seva_date = ? and seva_id=? and s.id=slot_id)) AS availability
  // FROM e_darshan_slot_time_t AS s WHERE s.d_in = '0' AND s.master_type = '2' AND s.main_table_id = ?  AND s.temple_id = ? HAVING availability > 0;`;

  const QRY_TO_EXEC = `SELECT 
    s.id AS slot_id,s.main_table_id as seva_id,s.temple_id,CONCAT(DATE_FORMAT(s.slot_start_time, '%h:%i %p'),' to ',
        DATE_FORMAT(s.slot_end_time, '%h:%i %p')) AS slot_time,s.max_capacity_slots_whatsapp AS total_tickets,(SELECT COALESCE(count(id), 0)
        FROM e_seva_orders WHERE d_in = '0' AND seva_date = ? and seva_id=? and s.id=slot_id ) AS booked,
    (s.max_capacity_slots_whatsapp -(SELECT COALESCE(count(id), 0)FROM e_seva_orders WHERE d_in = '0' AND seva_date = ? and seva_id=? and s.id=slot_id)) AS availability
    FROM e_darshan_slot_time_t AS s WHERE s.d_in = '0' AND s.master_type = '2' AND s.main_table_id = ?  AND s.temple_id = ? AND TIMESTAMP(?, s.slot_start_time) >= NOW() HAVING availability > 0;`;

  paramsData = [
    darshanam_date,
    data.seva_id,
    darshanam_date,
    data.seva_id,
    data.seva_id,
    data.temple_id,
    darshanam_date,
  ];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getSevaAccommodationMainMdl(data, callback) {
  var cntxtDtls = "in getSevaAccommodationMainMdl";
  const IST = "Asia/Kolkata";
  let darshanam_date = moment(data.booking_date).tz(IST).format("YYYY-MM-DD");
  let paramsData = [];

  const QRY_TO_EXEC = `SELECT 
    s.temple_id,s.id AS room_category_id,s.main_table_id as room_id,s.room_type,s.total_cost as price,s.no_of_rooms AS total_tickets,(SELECT COALESCE(count(id), 0)
        FROM e_room_orders WHERE d_in = '0' AND booking_date = ? and room_id=? and s.id=room_category_id ) AS booked,
    (s.no_of_rooms -(SELECT COALESCE(count(id), 0)FROM e_room_orders WHERE d_in = '0' AND booking_date = ? and room_id=? and s.id=room_category_id)) AS availability
    FROM e_room_sub AS s WHERE s.d_in = '0' AND s.main_table_id = ?  AND s.temple_id = ? HAVING availability > 0;`;

  paramsData = [darshanam_date, data.room_id, darshanam_date, data.room_id, data.room_id, data.temple_id];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function getEhundiTicketRefMdl(callback) {
  var cntxtDtls = "in getEhundiTicketRefMdl";
  var QRY_TO_EXEC = `SELECT id as ticket_id  from e_hundi_orders order by id desc limit 1;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function createEhundiOrderMdl(data, callback) {
  const cntxtDtls = "in createEhundiOrderMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let donation_date = moment().tz(IST).format("YYYY-MM-DD");
  const {
    temple_id,
    ticket_id,
    order_id,
    devotee_name,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    payment_status,
    payment_id,
    reqId,
  } = data;
  const QRY_TO_EXEC = `INSERT INTO e_hundi_orders (temple_id, ticket_id, order_id,  devotee_name, donation_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let paramsData = [
    temple_id,
    ticket_id,
    order_id,
    devotee_name,
    donation_date,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    i_ts,
    payment_status,
    payment_id,
    created_at,
    reqId,
    i_ts,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getAccommodationTicketRefMdl(callback) {
  var cntxtDtls = "in getAccommodationTicketRefMdl";
  var QRY_TO_EXEC = `SELECT id as ticket_id  from e_room_orders order by id desc limit 1;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function createAccommodationOrderMdl(data, callback) {
  const cntxtDtls = "in createAccommodationOrderMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let booking_date = moment(data.booking_date).tz(IST).format("YYYY-MM-DD");
  const {
    temple_id,
    ticket_id,
    order_id,
    room_id,
    room_category_id,
    aadhar_no,
    devotee_name,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    payment_status,
    payment_id,
    reqId,
  } = data;
  const QRY_TO_EXEC = `INSERT INTO e_room_orders (temple_id, ticket_id, order_id,  room_id,room_category_id, aadhar_no,devotee_name, booking_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
  let paramsData = [
    temple_id,
    ticket_id,
    order_id,
    room_id,
    room_category_id,
    aadhar_no,
    devotee_name,
    booking_date,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    i_ts,
    payment_status,
    payment_id,
    created_at,
    reqId,
    i_ts,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getTonsureTicketRefMdl(callback) {
  var cntxtDtls = "in getTonsureTicketRefMdl";
  var QRY_TO_EXEC = `SELECT id as ticket_id  from e_tonsure_orders order by id desc limit 1;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function createTonsureOrderMdl(data, callback) {
  const cntxtDtls = "in createTonsureOrderMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let tonsure_date = moment(data.tonsure_date).tz(IST).format("YYYY-MM-DD");
  const {
    temple_id,
    ticket_id,
    order_id,
    tonsure_id,
    gender,
    devotee_name,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    payment_status,
    payment_id,
    reqId,
  } = data;
  const QRY_TO_EXEC = `INSERT INTO e_tonsure_orders (temple_id, ticket_id, order_id,  tonsure_id,gender, devotee_name, tonsure_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
  let paramsData = [
    temple_id,
    ticket_id,
    order_id,
    tonsure_id,
    gender,
    devotee_name,
    tonsure_date,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    i_ts,
    payment_status,
    payment_id,
    created_at,
    reqId,
    i_ts,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getPrasadamTicketRefMdl(callback) {
  var cntxtDtls = "in getPrasadamTicketRefMdl";
  var QRY_TO_EXEC = `SELECT id as ticket_id  from e_prasadam_orders order by id desc limit 1;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

// export function createPrasadamOrderMdl(data, callback) {
//     const cntxtDtls = "in createPrasadamOrderMdl";
//     const IST = "Asia/Kolkata";
//     let created_at = moment().tz(IST).format("YYYY-MM-DD");
//     let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
//     let booking_date = moment(data.booking_date).tz(IST).format("YYYY-MM-DD");
//     const { temple_id, ticket_id, order_id, prasadam_id, qty, devotee_name, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, reqId, gtot } = data;
//     const QRY_TO_EXEC = `INSERT INTO e_prasadam_orders (temple_id, ticket_id, order_id,  prasadam_id,qty, devotee_name, booking_date, price, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
//     let paramsData = [temple_id, ticket_id, order_id, prasadam_id, qty, devotee_name, booking_date, amount, gtot, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, created_at, reqId, i_ts];

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//     }
// }

export function createPrasadamOrderMdl(data, callback) {
  console.log(data);

  const cntxtDtls = "in createPrasadamOrderMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let booking_date = moment(data.booking_date).tz(IST).format("YYYY-MM-DD");
  const {
    temple_id,
    ticket_id,
    order_id,
    prasadam_id,
    qty,
    devotee_name,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    payment_status,
    reqId,
    gtot,
  } = data;
  const QRY_TO_EXEC = `INSERT INTO e_prasadam_orders (temple_id, ticket_id, order_id,  prasadam_id,qty, devotee_name, booking_date, price, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
  let paramsData = [
    temple_id,
    ticket_id,
    order_id,
    prasadam_id,
    qty,
    devotee_name,
    booking_date,
    amount,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    i_ts,
    payment_status,
    created_at,
    reqId,
    i_ts,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function prasadamOrderItemsMdl(ordered_items, booking_date, rowId, callback) {
  const cntxtDtls = "in prasadamOrderItemsMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment(booking_date).tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let paramsData = ordered_items.map((item) => [
    rowId,
    created_at,
    item.prasadam_id,
    item.price,
    item.quantity,
    item.total_price,
  ]);

  const QRY_TO_EXEC = `INSERT INTO e_prasadam_orders_items (main_id, booking_date , prasadam_id, price,qty, amount) VALUES ?`;

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [paramsData], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getSevaTicketRefMdl(callback) {
  var cntxtDtls = "in getSevaTicketRefMdl";
  var QRY_TO_EXEC = `SELECT id as ticket_id  from e_seva_orders order by id desc limit 1;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function createSevaOrderMdl(data, callback) {
  const cntxtDtls = "in createSevaOrderMdl";
  const IST = "Asia/Kolkata";
  let created_at = moment().tz(IST).format("YYYY-MM-DD");
  let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let seva_date = moment(data.seva_date).tz(IST).format("YYYY-MM-DD");

  console.log(data, "ddddddddddddddd");

  const {
    temple_id,
    ticket_id,
    order_id,
    seva_id,
    slot_id,
    slot_time,
    gothram,
    date_of_birth,
    gender,
    aadhar_no,
    devotee_name,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    payment_status,
    payment_id,
    reqId,
  } = data;
  let soltId = 0;
  if (!["", null, undefined, "null", "undefined"].includes(slot_id)) {
    soltId = slot_id;
  } else {
    soltId = 0;
  }
  const QRY_TO_EXEC = `INSERT INTO e_seva_orders (temple_id, ticket_id, order_id,  seva_id,slot_id, slot_time,gothram,date_of_birth,gender,aadhar_no,devotee_name, seva_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`;
  let paramsData = [
    temple_id,
    ticket_id,
    order_id,
    seva_id,
    soltId,
    slot_time,
    gothram,
    date_of_birth,
    gender,
    aadhar_no,
    devotee_name,
    seva_date,
    amount,
    handling_charge,
    total_amount,
    contact_number,
    partner_code,
    i_ts,
    payment_status,
    payment_id,
    created_at,
    reqId,
    i_ts,
  ];

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
  }
}

export function getTempleInfoMdl(data, callback) {
  var cntxtDtls = "in getTempleInfoMdl";
  var QRY_TO_EXEC = `SELECT temple_name_english,temple_name_telugu,temple_image_url as temple_logo,information from e_temple_master WHERE d_in='0' and active='1' and temple_id=?`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//mana mitra apis end

export function updateTempleMidsMdl(data, user, callback) {
  var cntxtDtls = "in updateTempleMidsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  console.log(data, 1664);
  var QRY_TO_EXEC = `Update e_temple_master SET  temple_mid=?,client_id=?,secret_client_id=?,upd_mid_by=?,upd_mid_date=?,upd_mid_time=?  WHERE  temple_id=?`;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.temple_mid, data.client_id, data.secret_client_id, data.upd_by, dated, i_ts, data.temple_id],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function activePrasadamcarryforwardDetailsMdl(data, callback) {
  console.log(data, 2140);
  var cntxtDtls = "in activePrasadamcarryforwardDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_prasadam_master  SET day_expire=?,day_expire_by=?,day_expire_date=?,day_expire_time=? WHERE prasadam_id =? `;
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      [data.active, data.updated_by, dated, timed, data.rowId],
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      },
    );
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

// export function getEsevaUserReportMdl(data, callback) {
//     var cntxtDtls = "in getEsevaUserReportMdl";
//     const IST = "Asia/Kolkata";
//     var dated = moment().tz(IST).format("YYYY-MM-DD");
//     var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
//     const { roletype, temple_id } = data;
//     var QRY_TO_EXEC = `SELECT a.id,
//     a.user_name,a.counter_id,a.shift_id,f.counter_name,g.Stock_name,
//     a.phone_number,
//     a.designation,
//     a.department_id,
//     c.displayName AS moduleName,   GROUP_CONCAT(d.displayName) AS subModuleName,
//     a.w_module_id,
//     a.role_type,e.department_name,
//     GROUP_CONCAT(d.sub_module_id) AS submoduleIds
// FROM users_data AS a
// LEFT JOIN user_permissions AS b ON a.id = b.user_id
// LEFT JOIN main_modules AS c ON b.module_id = c.module_id
// LEFT JOIN sub_modules AS d ON b.sub_module_id = d.sub_module_id
// LEFT JOIN e_department_master AS e ON a.department_id = e.id
// LEFT Join e_counter_details AS f ON a.counter_id = f.id
// LEFT Join e_shift_details AS g ON a.shift_id = g.id
// WHERE a.role_type = ?
//   AND a.temple_id = ?
//   AND a.d_in = 0 AND b.d_in = 0 AND c.d_in = 0 AND d.d_in = 0
// GROUP BY
// a.id,
//     a.user_name,
//     a.phone_number,
//     a.designation,
//     a.department_id,
//     a.w_module_id,
//     a.role_type;`;
//     let paramsData = [roletype, temple_id]
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
// };

// export function getShiftDetailsMdl(data, callback) {
//     var cntxtDtls = "in getShiftDetailsMdl";
//     const IST = "Asia/Kolkata";
//     const { userId, temple_id, counter_id } = data;

//     let QRY_TO_EXEC;
//     let paramsData;

//     if (data.indicatorId) {
//         QRY_TO_EXEC = `SELECT b.* FROM users_data AS a RIGHT JOIN e_shift_details AS b ON a.shift_id = b.id AND a.counter_id = ? WHERE b.temple_id = ? and b.d_in = 0  and a.id is null or a.id=?;`;
//         paramsData = [counter_id, temple_id, userId];
//     } else {
//         QRY_TO_EXEC = `SELECT b.* FROM  users_data AS a RIGHT JOIN e_shift_details AS b ON a.shift_id = b.id and a.counter_id = ? where  b.temple_id = ? and b.d_in = 0    and a.id is null;`;
//         paramsData = [counter_id, temple_id];
//     }

//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
//     }
// }

export function getDepartmentMastersMdl(data, callback) {
  var cntxtDtls = "in getDepartmentMastersMdl";
  let value = [];
  let templeId = ``;
  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }
  var QRY_TO_EXEC = `SELECT * FROM  e_department_master where d_in = 0 ${templeId}`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function submitDepartmentDetailsMdl(data, callback) {
  var cntxtDtls = "in submitDepartmentDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { temple_id, department_name, entry_by, reqId } = data;
  var QRY_TO_EXEC = `INSERT INTO e_department_master (temple_id,department_name,entry_by,reqId) VALUES (?, ?, ?, ?)`;
  let paramsData = [temple_id, department_name, entry_by, reqId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updateDepartmentDetailsMdl(data, callback) {
  var cntxtDtls = "in updateDepartmentDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { department_name, rowId, upadted_by, temple_id } = data;
  var QRY_TO_EXEC = `
        UPDATE e_department_master 
        SET department_name = ?, updated_by = ?, updated_date = ?
        WHERE temple_id = ? AND id = ?
    `;
  let paramsData = [department_name, upadted_by, dated, temple_id, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
  }
}

export function deleteDepartmentDetailsMdl(data, callback) {
  var cntxtDtls = "in deleteDepartmentDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_department_master SET d_in = 1,d_by=?,d_date = ? where id = ? `;
  let paramsData = [data.d_by, dated, data.rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getCounterMastersMdl(data, callback) {
  var cntxtDtls = "in getCounterMastersMdl";
  const IST = "Asia/Kolkata";
  let value = [];
  let templeId = ``;
  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }
  var QRY_TO_EXEC = `SELECT * FROM  e_counter_details where d_in = 0 ${templeId} `;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function submitCounterDetailsMdl(data, callback) {
  var cntxtDtls = "in submitCounterDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { temple_id, counter_name, entry_by, reqId } = data;
  var QRY_TO_EXEC = `INSERT INTO e_counter_details (temple_id,counter_name,entry_by,reqId) VALUES (?, ?, ?, ?)`;
  let paramsData = [temple_id, counter_name, entry_by, reqId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updateCounterDetailsMdl(data, callback) {
  var cntxtDtls = "in updateCounterDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { counter_name, rowId, upadted_by, temple_id } = data;
  var QRY_TO_EXEC = `
        UPDATE e_counter_details 
        SET counter_name = ?, updated_by = ?, updated_date = ?
        WHERE temple_id = ? AND id = ?
    `;
  let paramsData = [counter_name, upadted_by, dated, temple_id, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
  }
}

export function deleteCounterDetailsMdl(data, callback) {
  var cntxtDtls = "in deleteCounterDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_counter_details SET d_in = 1,d_by=?,d_date = ? where id = ? `;
  let paramsData = [data.d_by, dated, data.rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getShiftMastersMdl(data, callback) {
  var cntxtDtls = "in getShiftMastersMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  let value = [];
  let templeId = ``;

  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }

  var QRY_TO_EXEC = `SELECT * FROM  e_shift_details where d_in = 0 ${templeId}`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function submitShiftDetailsMdl(data, callback) {
  var cntxtDtls = "in submitShiftDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { temple_id, shift_name, start_time, end_time, entry_by, reqId } = data;
  var QRY_TO_EXEC = `INSERT INTO e_shift_details (temple_id,Stock_name,start_time,end_time,entry_by,reqId) VALUES (?, ?, ?, ?,?,?)`;
  let paramsData = [temple_id, shift_name, start_time, end_time, entry_by, reqId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updateShiftDetailsMdl(data, callback) {
  var cntxtDtls = "in updateShiftDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { shift_name, start_time, end_time, rowId, upadted_by, temple_id } = data;
  var QRY_TO_EXEC = `
        UPDATE e_shift_details 
        SET Stock_name = ?,start_time = ?,end_time = ?, updated_by = ?, updated_date = ?
        WHERE temple_id = ? AND id = ?
    `;
  let paramsData = [shift_name, start_time, end_time, upadted_by, dated, temple_id, rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
  }
}

export function deleteShiftDetailsMdl(data, callback) {
  var cntxtDtls = "in deleteShiftDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE e_shift_details SET d_in = 1,d_by=?,d_date = ? where id = ? `;
  let paramsData = [data.d_by, dated, data.rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function geteMastersUserModulesMdl(data, callback) {
  var cntxtDtls = "in geteMastersUserModulesMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `SELECT a.*,b.displayName,b.sub_module_id FROM main_modules as a LEFT JOIN sub_modules as b on a.module_id = b.module_id WHERE a.module_id IN ('35','36') and a.d_in = 0 and b.d_in = 0;`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function CheckmobilenumberMdl(data, callback) {
  var cntxtDtls = "in CheckmobilenumberMdl";
  const { number } = data;
  var QRY_TO_EXEC = `select id from users_data where phone_number = ? and d_in='0';`;
  let paramsData = [number];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function eSevaAddUserMdl(data, callback) {
  console.log(data, 1711);
  const contextDetails = "Adding user to users_data table";
  const {
    name,
    number,
    dept_id,
    designation,
    permissions,
    temple_id,
    w_module,
    entry_by,
    counterDetails,
    shiftDetails,
  } = data;
  const QRY_TO_EXEC = `
        INSERT INTO users_data 
        (user_name, image, phone_number, designation, department_id, role_type, temple_id,w_module_id, entry_by, last_login_time, created_time,counter_id,shift_id) 
        VALUES (?, ?, ?, ?, ?, 14, ?,?, ?, NOW(), NOW(),?,?); `;

  const paramsData = [
    name,
    null,
    number,
    designation,
    dept_id,
    temple_id || null,
    w_module || null,
    entry_by || null,
    counterDetails,
    shiftDetails,
  ];

  sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, contextDetails, function (err, userInsertResult) {
    if (err) {
      callback(err, null);
      return;
    }
    const userId = userInsertResult.insertId;
    const userPermissions = permissions || [];
    if (userPermissions.length === 0) {
      callback(null, { message: "User added with no permissions", userId });
      return;
    }

    const values = userPermissions.map((p) => [userId, p.module_id, p.sub_module_id]);
    const insertPermissionsQuery = `
            INSERT INTO user_permissions (user_id, module_id, sub_module_id)
            VALUES ?
        `;

    sqlinjection(
      MySQLConPool,
      insertPermissionsQuery,
      [values],
      contextDetails,
      function (err2, permissionInsertResult) {
        if (err2) {
          callback(err2, null);
          return;
        }

        callback(null, {
          message: "User and permissions added successfully",
          userId: userId,
        });
      },
    );
  });
}

export function getEsevaUserReportMdl(data, callback) {
  var cntxtDtls = "in getEsevaUserReportMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD");
  var timed = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { roletype, temple_id } = data;
  var QRY_TO_EXEC = `SELECT a.id,
            a.user_name,a.counter_id,a.shift_id,f.counter_name,g.Stock_name,
            a.phone_number,
            a.designation,
            a.department_id,
            c.displayName AS moduleName,   GROUP_CONCAT(d.displayName) AS subModuleName,
            a.w_module_id,
            a.role_type,e.department_name,
            GROUP_CONCAT(d.sub_module_id) AS submoduleIds
        FROM users_data AS a
        LEFT JOIN user_permissions AS b ON a.id = b.user_id
        LEFT JOIN main_modules AS c ON b.module_id = c.module_id
        LEFT JOIN sub_modules AS d ON b.sub_module_id = d.sub_module_id
        LEFT JOIN e_department_master AS e ON a.department_id = e.id
        LEFT Join e_counter_details AS f ON a.counter_id = f.id
        LEFT Join e_shift_details AS g ON a.shift_id = g.id
        WHERE a.role_type = ? 
        AND a.temple_id = ? 
        AND a.d_in = 0 AND b.d_in = 0 AND c.d_in = 0 AND d.d_in = 0
        GROUP BY 
        a.id,
            a.user_name,
            a.phone_number,
            a.designation,
            a.department_id,
            a.w_module_id,
            a.role_type;`;

  let paramsData = [roletype, temple_id];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
}

export function updateEsevaUserMdl(data, callback) {
  console.log(data, 1711);
  const contextDetails = "Updating user in users_data table";
  const {
    name,
    number,
    dept_id,
    designation,
    permissions,
    temple_id,
    w_module,
    entry_by,
    rowId,
    counterDetails,
    shiftDetails,
  } = data;

  const QRY_TO_EXEC = `
        UPDATE users_data SET  user_name = ?,  image = ?,  phone_number = ?,  designation = ?,  department_id = ?,  role_type = 14,  temple_id = ?,  w_module_id = ?, 
        entry_by = ?,   last_login_time = NOW(),   created_time = NOW(),counter_id = ?,shift_id = ? WHERE id = ?;
    `;
  const paramsData = [
    name,
    null,
    number,
    designation,
    dept_id,
    temple_id || null,
    w_module || null,
    entry_by || null,
    counterDetails,
    shiftDetails,
    rowId,
  ];
  sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, contextDetails, function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    const userId = rowId;
    const userPermissions = permissions || [];
    if (userPermissions.length === 0) {
      callback(null, { message: "User updated with no permissions", userId });
      return;
    }
    const deletePermissionsQuery = `UPDATE  user_permissions SET d_in = 1 WHERE user_id = ?`;
    sqlinjection(MySQLConPool, deletePermissionsQuery, [userId], contextDetails, function (err2) {
      if (err2) {
        callback(err2, null);
        return;
      }
      const values = userPermissions.map((p) => [userId, p.module_id, p.sub_module_id]);
      const insertPermissionsQuery = `
                INSERT INTO user_permissions (user_id, module_id, sub_module_id)
                VALUES ?
            `;
      sqlinjection(MySQLConPool, insertPermissionsQuery, [values], contextDetails, function (err3) {
        if (err3) {
          callback(err3, null);
          return;
        }
        callback(null, {
          message: "User and permissions updated successfully",
          userId,
        });
      });
    });
  });
}

export function deleteEsevaUserMdl(data, callback) {
  var cntxtDtls = "in deleteEsevaUserMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  var QRY_TO_EXEC = `UPDATE users_data SET d_in = 1 where id = ? `;
  let paramsData = [data.rowId];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getCounterDetailsMdl(data, callback) {
  var cntxtDtls = "in getCounterDetailsMdl";
  const IST = "Asia/Kolkata";
  var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
  const { temple_id, entry_by } = data;
  var QRY_TO_EXEC = `SELECT * FROM  e_counter_details where temple_id = ? AND entry_by = ? and d_in = 0`;
  let paramsData = [temple_id, entry_by];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getShiftDetailsMdl(data, callback) {
  var cntxtDtls = "in getShiftDetailsMdl";
  const IST = "Asia/Kolkata";
  const { userId, temple_id, counter_id } = data;

  let QRY_TO_EXEC;
  let paramsData;

  if (data.indicatorId) {
    QRY_TO_EXEC = `SELECT b.* FROM users_data AS a RIGHT JOIN e_shift_details AS b ON a.shift_id = b.id AND a.counter_id = ? WHERE b.temple_id = ? and b.d_in = 0 and a.id is null or a.id=?;`;
    paramsData = [counter_id, temple_id, userId];
  } else {
    QRY_TO_EXEC = `SELECT b.* FROM  users_data AS a RIGHT JOIN e_shift_details AS b ON a.shift_id = b.id and a.counter_id = ? where  b.temple_id = ? and b.d_in = 0 and a.id is null;`;
    paramsData = [counter_id, temple_id];
  }

  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
  }
}

export function getAlertDetailsMdl(data, callback) {
  var cntxtDtls = "in getAlertDetailsMdl";
  let value = [];
  let templeId = ``;
  if (data.role_type == 10 || data.role_type == 14) {
    templeId = " AND a.temple_id = ?";
    value = [data.temple_id];
  } else {
    value = [];
  }
  var QRY_TO_EXEC = `SELECT a.*,b.department_name,b.id as deptId FROM e_alert_messages as a LEFT JOIN e_department_master as b ON a.department_name = b.id where  a.d_in = 0 and b.d_in = 0 ${templeId};`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function addTemplewiseUsersMdl(data, callback) {
  console.log(data, 1711);
  const contextDetails = "Adding user to users_data table";
  const { name, number, dept_id, designation, district_id, temple_id, entry_by } = data;

  const QRY_TO_EXEC = `
        INSERT INTO users_data 
        (user_name, image, phone_number, designation, department_id, district_id, role_type, temple_id, entry_by, last_login_time, created_time) 
        VALUES (?, ?, ?, ?, ?, ?, 10, ?, ?, NOW(), NOW());
    `;
  const paramsData = [name, null, number, designation, dept_id, district_id, temple_id || null, entry_by || null];
  sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, contextDetails, function (err, userInsertResult) {
    if (err) {
      callback(err, null);
      return;
    }

    const userId = userInsertResult.insertId;
    if (Array.isArray(data.rolePermissions) && data.rolePermissions.length > 0) {
      data.rolePermissions.forEach((perm) => {
        const QRY_PERM = `
                    INSERT INTO user_permissions 
                    (user_id, module_id, sub_module_id)
                    VALUES (?, ?, ?)
                `;
        const paramsPerm = [userId, perm.module_id, perm.sub_module_id];

        sqlinjection(MySQLConPool, QRY_PERM, paramsPerm, "Adding user permissions");
      });
    }

    callback(null, {
      message: "User and permissions added successfully",
      userId: userId,
    });
  });
}

export function getRoleTenPermissionsMdl(data, callback) {
  var cntxtDtls = "in getRoleTenPermissionsMdl";
  var QRY_TO_EXEC = `SELECT * FROM  role_based_modules where role_id = 10  and d_in = 0`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getTempleWiseUserUserReportMdl(data, callback) {
  var cntxtDtls = "in getTempleWiseUserUserReportMdl";
  const IST = "Asia/Kolkata";
  const { roletype, temple_id } = data;
  var QRY_TO_EXEC = `SELECT a.id,
    a.user_name,
    a.phone_number,
    a.designation,
    a.department_id,
    a.role_type,b.department_nm,b.id as deptId,a.temple_id,c.id as district_id,d.temple_name_english,c.district_name
FROM users_data AS a
LEFT JOIN department_master AS b ON a.department_id = b.id
LEFT Join districts_data AS c ON a.district_id = c.id
LEFT Join e_temple_master AS d ON a.temple_id = d.temple_id
WHERE a.role_type = 10
  AND a.d_in = 0 AND b.d_in = 0 AND c.d_in = 0 AND d.d_in = 0
GROUP BY 
a.id,
    a.user_name,
    a.phone_number,
    a.designation,
    a.department_id,
    a.role_type  order by a.id desc`;
  let paramsData = [roletype, temple_id];
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
}

export function updateTempleWiseUsersMdl(data, callback) {
  console.log(data, 1711);
  const contextDetails = "Updating user in users_data table";
  const { name, number, dept_id, designation, district_id, temple_id, entry_by, rowId } = data;
  const QRY_TO_EXEC = `UPDATE users_data SET user_name = ?, image = ?, phone_number = ?, designation = ?,district_id = ?, department_id = ?, role_type = 10, temple_id = ?, entry_by = ?,  last_login_time = NOW(),    created_time = NOW()  WHERE id = ?;`;

  const paramsData = [
    name,
    null,
    number,
    designation,
    district_id,
    dept_id,
    temple_id || null,
    entry_by || null,
    rowId,
  ];
  sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, contextDetails, function (err, result) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, {
      message: "User updated successfully",
      userId: rowId,
    });
  });
}

export function deleteTempleWiseUserMdl(data, callback) {
  const cntxtDtls = "in deleteTempleWiseUserMdl";
  const QRY_TO_EXEC1 = `UPDATE users_data SET d_in = 1 WHERE id = ?`;
  const paramsUser = [data.rowId];

  sqlinjection(MySQLConPool, QRY_TO_EXEC1, paramsUser, cntxtDtls, function (err, results) {
    if (err) {
      callback(err, null);
      return;
    }

    const QRY_TO_EXEC2 = `UPDATE  user_permissions SET d_in = 1 WHERE user_id = ?`;
    const paramsPerm = [data.rowId];

    sqlinjection(MySQLConPool, QRY_TO_EXEC2, paramsPerm, cntxtDtls, function (err2, permResults) {
      if (err2) {
        callback(err2, null);
        return;
      }
      callback(null, {
        message: "User marked deleted and permissions removed",
        userResult: results,
        permissionsResult: permResults,
      });
    });
  });
}

export function updatetempleProfileWhatsappdataMdl(templeId, selectedServiceIds, callback) {
  const cntxtDtls = "in updatetempleProfileWhatsappdataMdl";
  console.log(2510, templeId, selectedServiceIds);

  const QRY_TO_EXEC = `SELECT service_id, d_in FROM e_temple_service_whatsup WHERE temple_id = ?`;
  sqlinjection(MySQLConPool, QRY_TO_EXEC, [templeId], cntxtDtls, (err, results) => {
    if (err) return callback(err);

    const existingIds = results.map((r) => r.service_id);
    const deletedIds = results.filter((r) => r.d_in === 1).map((r) => r.service_id);
    const activeIds = results.filter((r) => r.d_in === 0).map((r) => r.service_id);

    const toInsert = selectedServiceIds.filter((id) => !existingIds.includes(id));
    const toReactivate = selectedServiceIds.filter((id) => deletedIds.includes(id));
    const toDelete = activeIds.filter((id) => !selectedServiceIds.includes(id));

    const execSql = (query, params, cb) => sqlinjection(MySQLConPool, query, params, cntxtDtls, cb);

    // Step 2: Soft delete removed services
    if (toDelete.length > 0) {
      const QRY_DEL = `UPDATE e_temple_service_whatsup SET d_in = 1 WHERE temple_id = ? AND service_id IN (?)`;
      execSql(QRY_DEL, [templeId, toDelete], (err) => {
        if (err) return callback(err);
        proceedReactivate();
      });
    } else {
      proceedReactivate();
    }

    // Step 3: Reactivate previously deleted services
    function proceedReactivate() {
      if (toReactivate.length > 0) {
        const QRY_REACT = `UPDATE e_temple_service_whatsup SET d_in = 0 WHERE temple_id = ? AND service_id IN (?)`;
        execSql(QRY_REACT, [templeId, toReactivate], (err) => {
          if (err) return callback(err);
          proceedInsert();
        });
      } else {
        proceedInsert();
      }
    }

    // Step 4: Insert completely new services
    function proceedInsert() {
      if (toInsert.length > 0) {
        const valuesArray = toInsert.map((serviceId) => [templeId, serviceId]);
        const QRY_INS = `INSERT INTO e_temple_service_whatsup (temple_id, service_id) VALUES ?`;
        execSql(QRY_INS, [valuesArray], (err) => {
          if (err) return callback(err);
          callback(null, true);
        });
      } else {
        callback(null, true);
      }
    }
  });
}

export function getTempleMasterWhatsappMdl(data, callback) {
  var cntxtDtls = "in getTempleMasterWhatsappMdl";
  const IST = "Asia/Kolkata";

  var QRY_TO_EXEC = `SELECT 
    tm.*,
    (
        SELECT GROUP_CONCAT(ets.service_id)
        FROM e_temple_service_whatsup AS ets
        WHERE ets.temple_id = tm.temple_id
          AND ets.d_in = 0
    ) AS service_ids
FROM e_temple_master AS tm
WHERE tm.d_in = 0
  AND tm.temple_id IN (?);
`;
  if (callback && typeof callback == "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
      callback(err, results);
      return;
    });
  } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
