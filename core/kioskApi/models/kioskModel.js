import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";

export function sendOtpForLogoutMdl(reqdata, callback) {
    const { phonenumber, otp, expiresAt } = reqdata;
    const cntxtDtls = "Posting OTP in the DB";
    const QRY_TO_EXEC = `
        UPDATE users_data
        SET otp = ?, otp_expires_at = ?
        WHERE phone_number = ? AND d_in = 0;
        SELECT IF(ROW_COUNT() = 0, 'No rows updated', 'OTP updated') AS result;
    `;

    const queryValues = [otp, expiresAt, phonenumber];

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls);
    }
}


// App logins

export function sendotpformobileMdl(reqdata, callback) {
    const { phonenumber, otp, expiresAt } = reqdata;
    const cntxtDtls = "Posting OTP in the DB";
    const QRY_TO_EXEC = `
        UPDATE users_data
        SET otp = ?, otp_expires_at = ?
        WHERE phone_number = ? AND d_in = 0 and role_type='10';
        SELECT IF(ROW_COUNT() = 0, 'No rows updated', 'OTP updated') AS result;
    `;

    const queryValues = [otp, expiresAt, phonenumber];

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls);
    }
}
export function veriftOtpMdl(reqdata, callback) {
    let phonenumber = reqdata.phonenumber;
    let otp = reqdata.otpsending;
    var cntxtDtls = "verifying otp in the db";
    var QRY_TO_EXEC = ` SELECT id,phone_number,district_id,mandal_id,role_type,image,user_name,designation,temple_id, CASE WHEN COUNT(otp) > 0 THEN MAX(otp) ELSE 0 
    END AS otp FROM users_data WHERE phone_number = ? AND d_in = 0 and role_type='10' GROUP BY id, role_type, image, user_name, designation LIMIT 0, 25;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [phonenumber], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function deleteOtpMdl(reqdata, callback) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    let phonenumber = reqdata.phonenumber;
    let otp = reqdata.otpsending;
    var cntxtDtls = "deleting otp in the db";
    var QRY_TO_EXEC =
        `UPDATE users_data SET otp = NULL,last_login_time=?,login_ind='1' WHERE phone_number = ? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [formattedDate, phonenumber], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getMobileappProfileMdl(data, callback) {
    var cntxtDtls = "getMobileappProfileMdl";
    var QRY_TO_EXEC = `SELECT * FROM users_data as u WHERE u.id=?;`;
    let paramsData = [data.user_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function checkMobileAppversionMdl(data, callback) {
    var cntxtDtls = "checkMobileAppversionMdl";
    var QRY_TO_EXEC = `SELECT * FROM app_version WHERE d_in =0;`;
    let paramsData = [data.insertId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function gettempledetailsMdl(data, callback) {
    var cntxtDtls = "gettempledetailsMdl";
    var QRY_TO_EXEC = `SELECT * FROM e_temple_master WHERE temple_id =?;`;
    let paramsData = [data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



//RGTs Apis

export function getDistrictsMdl(data, callback) {
    var cntxtDtls = "in getDistrictsMdl";
    var QRY_TO_EXEC = `SELECT id as district_id,district_nm as district_name,district_nm_telugu as district_name_telugu from e_district WHERE d_in='0' ORDER BY district_nm asc;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temples], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function getTemplesMdl(data, callback) {
    var cntxtDtls = "in getTemplesMdl";
    var QRY_TO_EXEC = `SELECT temple_id,temple_name_english,temple_name_telugu,temple_image_url as temple_logo,district_id from e_temple_master WHERE d_in='0' and active='1' and district_id=? ORDER BY temple_name_english asc; `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.district_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
export function getServicesListMdl(data, callback) {
    var cntxtDtls = "in getServicesListMdl";
    var QRY_TO_EXEC = `SELECT s.id as service_id,s.service_name,s.service_name_telugu,t.temple_id,s.icon,s.path,s.telugu_icon from e_temple_service as t join e_services as s on s.id=t.service_id WHERE t.d_in='0' and s.d_in='0' and t.temple_id=? order by service_id; `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

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
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getDarshanSlotsMdl(data, callback) {
    var cntxtDtls = "in getDarshanSlotsMdl";
    const IST = "Asia/Kolkata";
    let darshanam_date = moment(data.darshanam_date).tz(IST).format("YYYY-MM-DD");
    // var dated = "2025-06-01";
    let paramsData = [];
    const QRY_TO_EXEC = `SELECT 
    s.id AS slot_id,s.main_table_id as darshanam_id,s.temple_id,s.slot_end_time, s.slot_start_time,CONCAT(DATE_FORMAT(s.slot_start_time, '%h:%i %p'),' to ',
        DATE_FORMAT(s.slot_end_time, '%h:%i %p')) AS slot_time,s.max_capacity_slots AS total_tickets,(SELECT COALESCE(SUM(no_persons), 0)
        FROM e_darshnam_orders WHERE d_in = '0' AND seva_date = ? and darshanam_id=? and s.id=slot_id) AS booked,
    (s.max_capacity_slots -(SELECT COALESCE(SUM(no_persons), 0)FROM e_darshnam_orders WHERE d_in = '0' AND seva_date = ? and darshanam_id=? and s.id=slot_id)) AS availability
    FROM e_darshan_slot_time_t AS s WHERE s.d_in = '0' AND s.master_type = '1' AND s.main_table_id = ?  AND s.temple_id = ? HAVING availability > 0;`
    paramsData = [darshanam_date, data.darshanam_id, darshanam_date, data.darshanam_id, data.darshanam_id, data.temple_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getTicketRefMdl(callback) {
    var cntxtDtls = "in getTicketRefMdl";
    var QRY_TO_EXEC = `SELECT id as ticket_id  from e_darshnam_orders order by id desc limit 1;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function verifydarshanam(data, callback) {
    var cntxtDtls = "in verifydarshanam";
    var QRY_TO_EXEC = `SELECT  price  from e_darshan_master where  id = ?  and temple_id =? ; `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.darshanam_id, data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


//------------------------------------------------------  Get Secret -------------------------------------------------------------------------

export function getsecret(temple_id, callback) {
    const cntxtDtls = "in getsecret";
    const QRY_TO_EXEC = `SELECT client_id, secret_client_id FROM e_temple_master  WHERE temple_id = ?`;
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [temple_id], cntxtDtls, function (err, results) {
        callback(err, results);
        return;
    }
    );
}

export function updatedarshanamorder_idMdl(data, callback) {
    const cntxtDtls = "in updatedarshanamorder_idMdl";
    const QRY_TO_EXEC = `Update  e_darshnam_orders set ticket_id = ? , order_id = ? where id = ? `;
    let paramsData = [data.ticket_id, data.order_id, data.id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function createeDarshnamOrdersMdl(data, callback) {
    const cntxtDtls = "in createeDarshnamOrdersMdl";
    const IST = "Asia/Kolkata";
    let created_at = moment().tz(IST).format("YYYY-MM-DD");
    let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let seva_date = moment(data.darshanam_date).tz(IST).format("YYYY-MM-DD");
    const { temple_id, ticket_id, order_id, ticket_type, devotee_name, no_persons, slot_time, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, payment_id, reqId, darshanam_id, slot_id } = data;
    const QRY_TO_EXEC = `INSERT INTO e_darshnam_orders (temple_id, ticket_id, order_id, ticket_type, devotee_name, no_persons, slot_time, seva_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,darshanam_id,slot_id,i_ts,kiosk_entry_by,order_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;
    let paramsData = [temple_id, ticket_id, order_id, ticket_type, devotee_name, no_persons, slot_time, seva_date, amount, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, payment_id, created_at, reqId, darshanam_id, slot_id, i_ts, data.entry_by, 1];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getDarshanDetailswithTicketid(data, callback) {
    var cntxtDtls = "in getDarshanDetailswithTicketid";

    if (data.category_type == 1) {            // Darshanam
        var QRY_TO_EXEC = `SELECT  a.*,b.darshan_name_english , b.darshan_name_telugu  FROM e_darshnam_orders a join e_darshan_master b on a.darshanam_id=b.id WHERE a.ticket_id = ? ; `
    } else if (data.category_type == 2) {    //Seva
        var QRY_TO_EXEC = `SELECT a.* ,b.seva_type_name , b.seva_name_english , b.seva_name_telugu FROM e_seva_orders a join e_seva_master b on a.seva_id=b.id where a.ticket_id= ?;`
    } else if (data.category_type == 3) {    //Prasadam
        var QRY_TO_EXEC = `SELECT a.*, CONCAT('[', GROUP_CONCAT( CONCAT( '{', '"prasadam_id":', oi.prasadam_id, ',',
                    '"prasadam_name_telugu":"', IFNULL(pm.name_in_telugu,''), '",', '"prasadam_name_english":"', IFNULL(pm.name_in_english,''), '",',
                    '"price":', oi.price, ',',  '"qty":', oi.qty, ',', '"amount":', oi.amount,'}' )
            ORDER BY oi.id SEPARATOR ',' ),']' ) AS items FROM e_prasadam_orders AS a left JOIN e_prasadam_orders_items  as oi ON a.id = oi.main_id LEFT JOIN e_prasadam_master AS pm ON oi.prasadam_id = pm.prasadam_id AND pm.d_in = 0 WHERE  a.d_in = 0 AND a.ticket_id = ?; `
    } else if (data.category_type == 4) {    //kesakanda
        var QRY_TO_EXEC = `SELECT a.*  FROM e_tonsure_orders a  where a.ticket_id =  ? ; `
    } else if (data.category_type == 5) {    //E-hundi
        var QRY_TO_EXEC = `SELECT * FROM e_hundi_orders WHERE ticket_id = ? ;`
    } else if (data.category_type == 6) {    // Darshan + Prasadam
        var QRY_TO_EXEC = ` 
    SELECT a.*,  b.darshan_name_english,  b.darshan_name_telugu FROM e_darshnam_orders a JOIN e_darshan_master b ON a.darshanam_id = b.id WHERE a.ticket_id = ?;
    SELECT  p.*,CONCAT('[',GROUP_CONCAT(CONCAT(
            '{','"prasadam_id":', oi.prasadam_id, ',',
            '"prasadam_name_telugu":"', IFNULL(pm.name_in_telugu,''), '",',
            '"prasadam_name_english":"', IFNULL(pm.name_in_english,''), '",',
            '"price":', oi.price, ',',
            '"qty":', oi.qty, ',',
            '"amount":', oi.amount,'}') ORDER BY oi.id SEPARATOR ','),']') AS items
    FROM e_prasadam_orders p LEFT JOIN e_prasadam_orders_items oi ON p.id = oi.main_id LEFT JOIN e_prasadam_master pm  ON oi.prasadam_id = pm.prasadam_id AND pm.d_in = 0
    WHERE p.ticket_id = '${data.ticket_id}' GROUP BY p.id; `
    }

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.ticket_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function updateDarshnamOrderStatusMdl(data, paymentstatus, callback) {
    var cntxtDtls = "in updateDarshnamOrderStatusMdl";
    const payment_id = paymentstatus.payment_id || null;

    if (data.category_type == 6) {
        const darshanQry = `UPDATE e_darshnam_orders SET payment_status = ?, payment_id = ? WHERE ticket_id = ? `;
        const prasadamQry = `UPDATE e_prasadam_orders SET payment_status = ?, payment_id = ? WHERE ticket_id = ? `;
        const params = [paymentstatus.status, payment_id, data.ticket_id];
        sqlinjection(MySQLConPool, darshanQry, params, cntxtDtls, function (err) {
            if (err) return callback(err);
            sqlinjection(MySQLConPool, prasadamQry, params, cntxtDtls, function (err2, result) {
                callback(err2, result);
            });
        });
        return;
    }

    const tableMap = {
        1: 'e_darshnam_orders',
        2: 'e_seva_orders',
        3: 'e_prasadam_orders',
        4: 'e_tonsure_orders',
        5: 'e_hundi_orders'
    };

    const table = tableMap[data.category_type];

    var QRY_TO_EXEC = `Update ${table} set payment_status = ? , payment_id = ?  Where ticket_id = ? ;`
    let paramsData = [paymentstatus.status, paymentstatus.payment_id, data.ticket_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

//Darshanm End

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
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

// export function getPrasadameMainMdl(data, callback) {
//     var cntxtDtls = "in getPrasadameMainMdl";
//     var QRY_TO_EXEC = `SELECT temple_id,prasadam_id,name_in_english,name_in_telugu,price,CONCAT('Available Daily from ',
//         DATE_FORMAT(from_time, '%h:%i %p'),
//         ' to ',
//         DATE_FORMAT(to_time, '%h:%i %p')
//     ) AS description,max_booking_per_order as maximum_qty_per_order , img_one from e_prasadam_master WHERE d_in='0' and active='1' and temple_id=?;`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
// };


export function getblockdatesMdl(data, callback) {
    console.log(data);

    var cntxtDtls = "in getblockdatesMdl";
    var QRY_TO_EXEC = `SELECT category_type , fromdate , todate from  e_block_dates WHERE d_in='0' and temple_id=?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


//  LEAST(
//         pm.max_booking_per_order,
//         (IFNULL(es.total_qty, 0) - IFNULL(o.sold_qty, 0))
//     ) AS maximum_qty_per_order,

// export function getPrasadameMainMdl(data, callback) {
//     const cntxtDtls = "in getPrasadameMainMdl";
//     const IST = "Asia/Kolkata";
//     const current_date = moment().tz(IST).format("YYYY-MM-DD");

//     console.log(current_date);

//     const QRY_TO_EXEC = `SELECT
//     pm.temple_id,
//     pm.prasadam_id,
//     pm.name_in_english,
//     pm.name_in_telugu,
//     pm.price,
//     pm.max_booking_per_order  as  maximum_qty_per_order ,
//     pm.max_booking_per_order , 

//     CONCAT(
//         'Available Daily from ',
//         DATE_FORMAT(pm.from_time, '%h:%i %p'),
//         ' to ',
//         DATE_FORMAT(pm.to_time, '%h:%i %p')
//     ) AS description,


//     pm.img_one,
//     (IFNULL(es.total_qty, 0) - IFNULL(o.sold_qty, 0)) AS available_stock

// FROM e_prasadam_master pm

// JOIN (
//     SELECT
//         prasadam_id,
//         temple_id,
//         SUM(
//             CASE 
//                 WHEN entry_type = 0 THEN quantity
//                 WHEN entry_type = 1 THEN -quantity
//                 ELSE 0
//             END
//         ) AS total_qty
//     FROM e_prasadam_stock
//     WHERE DATE(i_ts) = ?
//       AND d_in = 0
//     GROUP BY prasadam_id, temple_id
// ) es
//     ON es.prasadam_id = pm.prasadam_id
//    AND es.temple_id = pm.temple_id

// LEFT JOIN (
//     SELECT
//         oi.prasadam_id,
//         o.temple_id,
//         SUM(oi.qty) AS sold_qty
//     FROM e_prasadam_orders o
//     JOIN e_prasadam_orders_items oi
//         ON o.id = oi.main_id
//     WHERE o.payment_status = 'SUCCESS'
//       AND DATE(o.created_at) = ?
//       AND o.d_in = 0
//     GROUP BY oi.prasadam_id, o.temple_id
// ) o
//     ON o.prasadam_id = pm.prasadam_id
//    AND o.temple_id = pm.temple_id

// WHERE
//     pm.d_in = 0
//     AND pm.active = 1
//     AND pm.temple_id = ?
//     AND (IFNULL(es.total_qty, 0) - IFNULL(o.sold_qty, 0)) > 0;
// `

//     const params = [current_date, current_date, data.temple_id];

//     return sqlinjection(
//         MySQLConPool,
//         QRY_TO_EXEC,
//         params,
//         cntxtDtls,
//         callback
//     );
// }

export function getPrasadameMainMdl(data, callback) {
    const cntxtDtls = "in getPrasadameMainMdl";
    const IST = "Asia/Kolkata";
    const current_date = moment().tz(IST).format("YYYY-MM-DD");

    console.log(current_date);

    const QRY_TO_EXEC = `SELECT
    pm.temple_id,
    pm.prasadam_id,
    pm.name_in_english,
    pm.name_in_telugu,
    pm.price,
    pm.max_booking_per_order  as  maximum_qty_per_order ,
    pm.max_booking_per_order , 

    CONCAT(
        'Available Daily from ',
        DATE_FORMAT(pm.from_time, '%h:%i %p'),
        ' to ',
        DATE_FORMAT(pm.to_time, '%h:%i %p')
    ) AS description,


    pm.img_one,
    (IFNULL(es.total_qty, 0) - IFNULL(o.sold_qty, 0)) AS available_stock

FROM e_prasadam_master pm

JOIN (
    SELECT
        prasadam_id,
        temple_id,
        SUM(
            CASE 
                WHEN entry_type = 0 THEN quantity
                WHEN entry_type = 1 THEN -quantity
                ELSE 0
            END
        ) AS total_qty
    FROM e_prasadam_stock
    WHERE  d_in = 0
    GROUP BY prasadam_id, temple_id
) es
    ON es.prasadam_id = pm.prasadam_id
   AND es.temple_id = pm.temple_id

LEFT JOIN (
    SELECT
        oi.prasadam_id,
        o.temple_id,
        SUM(oi.qty) AS sold_qty
    FROM e_prasadam_orders o
    JOIN e_prasadam_orders_items oi
        ON o.id = oi.main_id
    WHERE o.payment_status = 'SUCCESS'
      AND o.d_in = 0
    GROUP BY oi.prasadam_id, o.temple_id
) o
    ON o.prasadam_id = pm.prasadam_id
   AND o.temple_id = pm.temple_id

WHERE
    pm.d_in = 0
    AND pm.active = 1
    AND pm.temple_id = ?
    AND (IFNULL(es.total_qty, 0) - IFNULL(o.sold_qty, 0)) > 0;
`

    const params = [data.temple_id];

    return sqlinjection(
        MySQLConPool,
        QRY_TO_EXEC,
        params,
        cntxtDtls,
        callback
    );
}

export function getSevaTypesMdl(callback) {
    var cntxtDtls = "in getSevaTypesMdl";
    var QRY_TO_EXEC = `SELECT  id AS seva_type_id,seva_type_name,seva_type_name_telugu FROM e_seva_types WHERE d_in = '0';`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getSevaMainMdl(data, callback) {
    var cntxtDtls = "in getSevaMainMdl";
    const IST = "Asia/Kolkata";
    const weekday = moment().tz(IST).day() + 1;
    var QRY_TO_EXEC = ` SELECT  id AS seva_id,max_persons, seva_name_english,seva_name_telugu,description, amount as price, temple_id,
        CASE WHEN slot_booking_req = 1 THEN 'Yes' ELSE 'No' END AS slot_booking_req FROM e_seva_master WHERE d_in = '0' AND active = 1 AND temple_id = ? 
        AND seva_type = ?    AND (week_days = 0 OR FIND_IN_SET(?, week_days)) `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id, data.seva_type, weekday], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id, data.seva_type, weekday], cntxtDtls);
    }
}

export function getAccommodationMainMdl(data, callback) {
    var cntxtDtls = "in getAccommodationMainMdl";
    var QRY_TO_EXEC = `SELECT room_id,block_name,description,room_image_url from e_room_master WHERE d_in='0' and active='1' and temple_id=?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getSevaSlotsMainMdl(data, callback) {
    var cntxtDtls = "in getSevaSlotsMainMdl";
    const IST = "Asia/Kolkata";
    let darshanam_date = moment(data.seva_date).tz(IST).format("YYYY-MM-DD");
    let paramsData = [];
    const QRY_TO_EXEC = `SELECT 
    s.id AS slot_id,s.main_table_id as seva_id,s.temple_id, s.slot_start_time,s.slot_end_time, CONCAT(DATE_FORMAT(s.slot_start_time, '%h:%i %p'),' to ',
        DATE_FORMAT(s.slot_end_time, '%h:%i %p')) AS slot_time,s.max_capacity_slots AS total_tickets,(SELECT COALESCE(count(id), 0)
        FROM e_seva_orders WHERE d_in = '0'  and seva_id=? and s.id=slot_id ) AS booked,
    (s.max_capacity_slots -(SELECT COALESCE(count(id), 0)FROM e_seva_orders WHERE d_in = '0'  and seva_id=? and s.id=slot_id)) AS availability
    FROM e_darshan_slot_time_t AS s WHERE s.d_in = '0' AND s.master_type = '2' AND s.main_table_id = ?  AND s.temple_id = ? HAVING availability > 0;`;

    paramsData = [data.seva_id, data.seva_id, data.seva_id, data.temple_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function getsevascountforcalenderMdl(data, callback) {
    var cntxtDtls = "in getsevascountforcalenderMdl";

    const QRY_TO_EXEC = `SELECT   DATE(seva_date) AS seva_date, seva_id, COUNT(*) AS total_count FROM e_seva_orders WHERE seva_date > CURDATE() AND seva_id = ? and temple_id = ? GROUP BY seva_date, seva_id ORDER BY seva_date, seva_id;`;
    let paramsData = [];
    paramsData = [data.seva_id, data.temple_id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

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
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getEhundiTicketRefMdl(callback) {
    var cntxtDtls = "in getEhundiTicketRefMdl";
    var QRY_TO_EXEC = `SELECT id as ticket_id  from e_hundi_orders order by id desc limit 1;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updatehundiorder_id(data, callback) {
    const cntxtDtls = "in updatehundiorder_id";
    const QRY_TO_EXEC = `Update  e_hundi_orders set ticket_id = ? , order_id = ? where id = ? `;
    let paramsData = [data.ticket_id, data.order_id, data.id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function createEhundiOrderMdl(data, callback) {
    const cntxtDtls = "in createEhundiOrderMdl";
    const IST = "Asia/Kolkata";
    let created_at = moment().tz(IST).format("YYYY-MM-DD");
    let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let donation_date = moment().tz(IST).format("YYYY-MM-DD");
    const { temple_id, ticket_id, order_id, devotee_name, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, payment_id, reqId } = data;
    const QRY_TO_EXEC = `INSERT INTO e_hundi_orders (temple_id, ticket_id, order_id,  devotee_name, donation_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts,kiosk_entry_by,order_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    let paramsData = [temple_id, ticket_id, order_id, devotee_name, donation_date, amount, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, payment_id, created_at, reqId, i_ts, data.entry_by, 1];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}





export function createDarshanandPrasadamOrdermdl(data, callback) {
    const cntxtDtls = "in createDarshanandPrasadamOrdermdl";
    const IST = "Asia/Kolkata";
    const created_at = moment().tz(IST).format("YYYY-MM-DD");
    const i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    const seva_date = moment(data.darshanam_date).tz(IST).format("YYYY-MM-DD");

    const prasadam_need = data.prasadamcheck === true ? 1 : 0;

    const QRY_TO_EXEC = ` INSERT INTO e_darshnam_orders
    (temple_id, ticket_id, order_id, ticket_type, devotee_name,
     no_persons, slot_time, seva_date, amount, handling_charge,
     total_amount, contact_number, partner_code, printed_on,
     payment_status, payment_id, created_at, reqId,
     darshanam_id, slot_id, i_ts, kiosk_entry_by, order_from,
     prasadam_check, grand_amount)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

    const params = [
        data.temple_id,
        data.ticket_id,
        data.order_id,
        data.ticket_type,
        data.devotee_name,
        data.no_persons,
        data.slot_time,
        seva_date,
        data.amount,
        data.handling_charge,
        data.total_amount,
        data.contact_number,
        data.partner_code,
        i_ts,
        data.payment_status,
        data.payment_id || null,
        created_at,
        data.reqId,
        data.darshanam_id,
        data.slot_id,
        i_ts,
        data.entry_by,
        1,
        prasadam_need,
        data.grand_amount
    ];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function createPrasadamOrder(data, callback) {
    const cntxtDtls = "in createPrasadamOrder";
    const IST = "Asia/Kolkata";
    const created_at = moment().tz(IST).format("YYYY-MM-DD");
    const i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    // const booking_date = moment(data.seva_date).tz(IST).format("YYYY-MM-DD");
    const darshanam_date = moment(data.darshanam_date).tz(IST).format("YYYY-MM-DD");
    const QRY_TO_EXEC = `
    INSERT INTO e_prasadam_orders
    (temple_id, darshanam_table_id, ticket_id, order_id, prasadam_id, qty,
     devotee_name, booking_date, price, amount, handling_charge,
     total_amount, contact_number, partner_code, printed_on,
     payment_status, created_at, reqId, i_ts, kiosk_entry_by, order_from)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

    const params = [
        data.temple_id,
        data.darshan_table_id, // ✅ COMES FROM DARSHAN insertId
        data.ticket_id,
        data.order_id,
        data.prasadam_id,
        data.qty,
        data.devotee_name,
        darshanam_date,
        0,
        data.laddu_amount,
        data.handling_charge,
        data.laddu_amount,
        data.contact_number,
        data.partner_code,
        i_ts,
        data.payment_status,
        created_at,
        data.reqId,
        i_ts,
        data.entry_by,
        1
    ];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, params, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    }
    else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function prasadamOrderItems(ordered_items, booking_date, main_id, callback) {
    const cntxtDtls = "in prasadamOrderItems";
    const IST = "Asia/Kolkata";
    const created_at = moment(booking_date).tz(IST).format("YYYY-MM-DD");

    const values = ordered_items.map(item => [
        main_id,
        created_at,
        item.prasadam_id,
        item.price,
        item.quantity,
        item.total_price
    ]);

    const QRY_TO_EXEC = `INSERT INTO e_prasadam_orders_items (main_id, booking_date, prasadam_id, price, qty, amount)    VALUES ?  `;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [values], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function postrollsdata(data, callback) {
    const cntxtDtls = "in postrollsdata";
    const IST = "Asia/Kolkata";
    const created_at = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let paramsData = [data.capacity, data.entry_by, data.temple_id, created_at]
    const QRY_TO_EXEC = `INSERT INTO e_rolls_data (capacity,entry_by,temple_id,i_ts)VALUES(?, ?, ?, ?);`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getAccommodationTicketRefMdl(callback) {
    var cntxtDtls = "in getAccommodationTicketRefMdl";
    var QRY_TO_EXEC = `SELECT id as ticket_id  from e_room_orders order by id desc limit 1;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function createAccommodationOrderMdl(data, callback) {
    const cntxtDtls = "in createAccommodationOrderMdl";
    const IST = "Asia/Kolkata";
    let created_at = moment().tz(IST).format("YYYY-MM-DD");
    let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let booking_date = moment(data.booking_date).tz(IST).format("YYYY-MM-DD");
    const { temple_id, ticket_id, order_id, room_id, room_category_id, aadhar_no, devotee_name, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, payment_id, reqId } = data;
    const QRY_TO_EXEC = `INSERT INTO e_room_orders (temple_id, ticket_id, order_id,  room_id,room_category_id, aadhar_no,devotee_name, booking_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
    let paramsData = [temple_id, ticket_id, order_id, room_id, room_category_id, aadhar_no, devotee_name, booking_date, amount, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, payment_id, created_at, reqId, i_ts];

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
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function verifytonsure(data, callback) {
    var cntxtDtls = "in verifytonsure";
    var QRY_TO_EXEC = `SELECT price from e_tonsure_master where  tonsure_id = ?  and temple_id =? ; `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.tonsure_id, data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function updatetonsureOrder_id(data, callback) {
    const cntxtDtls = "in updatetonsureOrder_id";
    const QRY_TO_EXEC = `Update  e_tonsure_orders set ticket_id = ? , order_id = ? where id = ? `;
    let paramsData = [data.ticket_id, data.order_id, data.id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function createTonsureOrderMdl(data, callback) {
    const cntxtDtls = "in createTonsureOrderMdl";
    const IST = "Asia/Kolkata";
    let created_at = moment().tz(IST).format("YYYY-MM-DD");
    let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let tonsure_date = moment(data.tonsure_date).tz(IST).format("YYYY-MM-DD");
    const { temple_id, ticket_id, order_id, tonsure_id, gender, devotee_name, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, payment_id, reqId, tonsure_details } = data;

    console.log(data);

    const QRY_TO_EXEC = `INSERT INTO e_tonsure_orders (temple_id, ticket_id, order_id,  tonsure_id,gender, devotee_name, tonsure_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts,kiosk_entry_by,order_from , tonsure_dtl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,? , ?)`;
    let paramsData = [temple_id, ticket_id, order_id, '0', gender, devotee_name, tonsure_date, amount, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, payment_id, created_at, reqId, i_ts, data.entry_by, 1, tonsure_details];

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
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function verifyprasdam(data, callback) {
    const cntxtDtls = "in verifyPrasadamItems";
    const prasadamIds = data.ordered_items.map(item => item.prasadam_id);
    const QRY_TO_EXEC = `SELECT prasadam_id, price FROM e_prasadam_master  WHERE prasadam_id IN (?) AND temple_id = ?`;
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [prasadamIds, data.temple_id], cntxtDtls, function (err, results) {
        callback(err, results);
        return;
    }
    );
}

export function UpdatePrasadamOrder_id(data, callback) {
    const cntxtDtls = "in UpdatePrasadamOrder_id";
    const QRY_TO_EXEC = `Update  e_prasadam_orders set ticket_id = ? , order_id = ? where id = ? `;
    let paramsData = [data.ticket_id, data.order_id, data.id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}


export function createPrasadamOrderMdl(data, callback) {
    const cntxtDtls = "in createPrasadamOrderMdl";
    const IST = "Asia/Kolkata";
    let created_at = moment().tz(IST).format("YYYY-MM-DD");
    let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let booking_date = moment(data.booking_date).tz(IST).format("YYYY-MM-DD");
    const { temple_id, ticket_id, order_id, prasadam_id, qty, devotee_name, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, reqId, gtot } = data;
    const QRY_TO_EXEC = `INSERT INTO e_prasadam_orders (temple_id, ticket_id, order_id,  prasadam_id,qty, devotee_name, booking_date, price, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, created_at, reqId,i_ts,kiosk_entry_by,order_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;
    let paramsData = [temple_id, ticket_id, order_id, prasadam_id, qty, devotee_name, booking_date, amount, gtot, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, created_at, reqId, i_ts, data.entry_by, 1];

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
    let paramsData = ordered_items.map(item => [rowId, created_at, item.prasadam_id, item.price, item.quantity, item.total_price]);

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
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function verifySeva(data, callback) {
    var cntxtDtls = "in verifySeva";
    var QRY_TO_EXEC = `SELECT amount as  price from e_seva_master where  id = ?  and temple_id =? ; `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.seva_id, data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function UpdateSevaOrder_id(data, callback) {
    const cntxtDtls = "in UpdateSevaOrder_id";
    const QRY_TO_EXEC = `Update  e_seva_orders set ticket_id = ? , order_id = ? where id = ? `;
    let paramsData = [data.ticket_id, data.order_id, data.id];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}


export function createSevaOrderMdl(data, callback) {
    const cntxtDtls = "in createSevaOrderMdl";
    const IST = "Asia/Kolkata";
    let created_at = moment().tz(IST).format("YYYY-MM-DD");
    let i_ts = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let seva_date = moment(data.seva_date).tz(IST).format("YYYY-MM-DD");
    const { temple_id, ticket_id, order_id, seva_id, slot_id, slot_time, gothram, date_of_birth, gender, aadhar_no, devotee_name, amount, handling_charge, total_amount, contact_number, partner_code, payment_status, payment_id, reqId } = data;
    const QRY_TO_EXEC = `INSERT INTO e_seva_orders (temple_id, ticket_id, order_id,  seva_id,slot_id, slot_time,gothram,date_of_birth,gender,aadhar_no,devotee_name, seva_date, amount, handling_charge, total_amount, contact_number, partner_code, printed_on, payment_status, payment_id, created_at, reqId,i_ts,kiosk_entry_by,order_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`;
    let paramsData = [temple_id, ticket_id, order_id, seva_id, slot_id, slot_time, gothram, date_of_birth, gender, aadhar_no, devotee_name, seva_date, amount, handling_charge, total_amount, contact_number, partner_code, i_ts, payment_status, payment_id, created_at, reqId, i_ts, data.entry_by, 1];

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
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

export function getTempledataMdl(data, callback) {
    var cntxtDtls = "in getTempledataMdl";
    var QRY_TO_EXEC = `SELECT bm_contact from e_temple_master WHERE  temple_id=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};

//mana mitra apis end
