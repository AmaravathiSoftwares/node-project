import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


// <-----------------------------------------Districts--------------------------------------->

export function getdistricts(data, callback) {
    var cntxtDtls = "in getdistricts";
    var QRY_TO_EXEC = `Select district_name , id from districts_data where d_in = 0 order by display_number asc;`
    let paramsData = []
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


//-------------------------------------------------------------Drashanam ------------------------------------------------------------------

export function getTicketDetails(data, callback) {
    const cntxtDtls = "in getTicketDetails";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    const QRY = `SELECT  a.*,b.darshan_name_english as seva_name , c.temple_name_english FROM e_darshnam_orders as a join e_darshan_master as b on a.darshanam_id=b.id join e_temple_master as c on a.temple_id=c.temple_id  WHERE a.d_in = 0  AND a.contact_number =? and a.temple_id= ? AND DATE(CONVERT_TZ(a.seva_date, '+00:00', '+05:30')) >= CURDATE() ORDER BY a.seva_date ASC`;
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}



export function Checknumberdetailsmdl(data, callback) {
    var cntxtDtls = "in Checknumberdetailsmdl";
    var QRY_TO_EXEC = `Select id from e_darshnam_orders where contact_number = ? and d_in= ?  and temple_id =?; `
    let paramsData = [data.number, 0, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function updateOtpMdl(data, otp, callback) {
    console.log(data, 52);
    console.log(otp, 53);
    var cntxtDtls = "in updateOtpMdl";
    var QRY_TO_EXEC = `update e_darshnam_orders set otp  = ? where id = ? ; `
    let paramsData = [otp, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




export function updateticketverify(data, user, callback) {
    var cntxtDtls = "in updateticketverify";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_darshnam_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? ; `
    let paramsData = [0, dated, user, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function VerifyOtpdarshanammdl(data, callback) {
    var cntxtDtls = "in VerifyOtpdarshanammdl";
    var QRY_TO_EXEC = `Select * from e_darshnam_orders where otp  = ? and  id = ? and temple_id =  ? ; `
    let paramsData = [data.otp, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getcurrentdatecountsanddatamdl(data, callback) {

    const IST = "Asia/Kolkata";
    const today = moment().tz(IST).format("YYYY-MM-DD");
    const tomorrow = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");

    const cntxtDtls = "in getcurrentdatecountsanddatamdl";

    const QRY_TO_EXEC = `
        SELECT  (SELECT COUNT(*)  FROM e_darshnam_orders WHERE DATE(seva_date) = ? and temple_id=? )  AS today_orders,
                (SELECT COUNT(*)  FROM e_darshnam_orders WHERE DATE(seva_date) = ?  AND ticket_verified = 0 and temple_id=? ) AS verified_tickets,
                (SELECT COUNT(*)  FROM e_darshnam_orders  WHERE DATE(seva_date) = ?  AND ticket_verified = 1 and temple_id=? ) AS pending_tickets,
                (SELECT COUNT(*)  FROM e_darshnam_orders  WHERE DATE(seva_date) = ? and temple_id=? ) AS tomorrow_tickets ;

        SELECT  a.id, a.temple_id,  a.slot_id, a.ticket_id, a.order_id, a.ticket_type, a.seva_name as name, a.devotee_name ,a.payment_status,
            a.no_persons, a.slot_time, a.seva_date, a.amount,a.handling_charge, a.total_amount, a.contact_number, a.partner_code, a.printed_on,
             a.ticket_verified, a.created_at, b.darshan_name_english as seva_name FROM e_darshnam_orders as a join e_darshan_master as b on a.darshanam_id=b.id WHERE DATE(a.seva_date) = ? and a.temple_id=?  ORDER BY a.created_at DESC; 
             
         SELECT  a.id, a.temple_id,  a.slot_id, a.ticket_id, a.order_id, a.ticket_type, a.seva_name as name, a.devotee_name,a.payment_status,
            a.no_persons, a.slot_time, a.seva_date, a.amount,a.handling_charge, a.total_amount, a.contact_number, a.partner_code, a.printed_on,
             a.ticket_verified, a.created_at, b.darshan_name_english as seva_name FROM e_darshnam_orders as a join e_darshan_master as b on a.darshanam_id=b.id WHERE DATE(a.seva_date) = ? and a.temple_id=?  ORDER BY a.created_at DESC; `;

    const paramsData = [today, data.temple_id, today, data.temple_id, today, data.temple_id, tomorrow, data.temple_id, today, data.temple_id, tomorrow, data.temple_id];

    console.log(paramsData);


    if (callback && typeof callback === "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls,
            callback
        );
    } else {
        return sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls
        );
    }
}

export function getscanTicketDetailsmdl(data, callback) {
    const cntxtDtls = "in getscanTicketDetailsmdl";
    const QRY =
        `
    SELECT  a.*,b.darshan_name_english as seva_name, c.temple_name_english FROM e_darshnam_orders as a join e_darshan_master as b on a.darshanam_id=b.id join e_temple_master as c on a.temple_id=c.temple_id  WHERE a.d_in = 0 AND a.ticket_id =? and a.temple_id= ? ORDER BY a.created_at DESC
    `;
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}

export function updatescanverifiedmdl(data, user, callback) {
    var cntxtDtls = "in updatescanverifiedmdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_darshnam_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? and temple_id=? and payment_status = "SUCCESS"; `
    let paramsData = [0, dated, user, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//-------------------------------------------------------------Sevas -----------------------------------------------------------------------------------------------

export function getsevaTicketDetails(data, callback) {
    const cntxtDtls = "in getsevaTicketDetails";

    const QRY = `
    SELECT a.* ,b.seva_name_english,b.seva_type_name,c.temple_name_english FROM e_seva_orders as a join e_seva_master as b on a.seva_id= b.id join e_temple_master as c on a.temple_id = c.temple_id WHERE a.d_in = 0 AND a.contact_number =? and a.temple_id=? AND a.payment_status = "SUCCESS"  AND DATE(CONVERT_TZ(a.seva_date, '+00:00', '+05:30')) >= CURDATE() ORDER BY a.seva_date ASC;     `
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}



export function Checksevanumberdetailsmdl(data, callback) {
    var cntxtDtls = "in Checksevanumberdetailsmdl";

    var QRY_TO_EXEC = `Select id from e_seva_orders where contact_number = ? and d_in=?  and temple_id=? ; `
    let paramsData = [data.number, 0, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function updatesevaOtpMdl(data, otp, callback) {
    var cntxtDtls = "in updatesevaOtpMdl";
    var QRY_TO_EXEC = `update e_seva_orders set otp  = ? where id = ? ; `
    let paramsData = [otp, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function VerifyOtpsevamdl(data, callback) {
    var cntxtDtls = "in VerifyOtpsevamdl";
    var QRY_TO_EXEC = `Select * from e_seva_orders where otp  = ? and  id = ? and temple_id=?; `
    let paramsData = [data.otp, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function updateticketsevaverify(data, user, callback) {
    var cntxtDtls = "in updateticketsevaverify";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_seva_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? and temple_id=? and payment_status = "SUCCESS" ; `
    let paramsData = [0, dated, user, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

// export function getsevacurrentdatecountsanddatamdl(data, callback) {
//     const IST = "Asia/Kolkata";
//     const today = moment().tz(IST).format("YYYY-MM-DD");
//     const tomorrow = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");
//     const cntxtDtls = "in getsevacurrentdatecountsanddatamdl";
//     const QRY_TO_EXEC = `
//         SELECT  (SELECT COUNT(*)  FROM e_seva_orders WHERE DATE(seva_date) = ? and temple_id=?) AS today_orders,
//                 (SELECT COUNT(*)  FROM e_seva_orders WHERE DATE(seva_date) = ?  AND ticket_verified = 0 and temple_id=?) AS verified_tickets,
//                 (SELECT COUNT(*)  FROM e_seva_orders  WHERE DATE(seva_date) = ?  AND ticket_verified = 1 and temple_id=?) AS pending_tickets,
//                 (SELECT COUNT(*)  FROM e_seva_orders  WHERE DATE(seva_date) = ? and temple_id=?) AS tomorrow_tickets ;

//         SELECT  id, temple_id,  slot_id, ticket_id, order_id, ticket_type, seva_name, devotee_name,
//             no_persons, slot_time, seva_date, amount,handling_charge, total_amount, contact_number, partner_code, printed_on,
//              ticket_verified, created_at FROM e_seva_orders WHERE DATE(seva_date) = ? and temple_id=? ORDER BY created_at DESC; 

//         SELECT  id, temple_id,  slot_id, ticket_id, order_id, ticket_type, seva_name, devotee_name,
//             no_persons, slot_time, seva_date, amount,handling_charge, total_amount, contact_number, partner_code, printed_on,
//              ticket_verified, created_at FROM e_seva_orders WHERE DATE(seva_date) = ? and temple_id=? ORDER BY created_at DESC; `;

//     const paramsData = [today, data.temple_id, today, data.temple_id, today, data.temple_id, tomorrow, data.temple_id, today, data.temple_id, tomorrow, data.temple_id];

//     console.log(paramsData);


//     if (callback && typeof callback === "function") {
//         sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             paramsData,
//             cntxtDtls,
//             callback
//         );
//     } else {
//         return sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             paramsData,
//             cntxtDtls
//         );
//     }
// }

export function getsevacurrentdatecountsanddatamdl(data, callback) {
    const IST = "Asia/Kolkata";
    const today = moment().tz(IST).format("YYYY-MM-DD");
    const tomorrow = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");
    const cntxtDtls = "in getsevacurrentdatecountsanddatamdl";
    const QRY_TO_EXEC = `
        SELECT  (SELECT COUNT(*)  FROM e_seva_orders WHERE DATE(seva_date) = ? and temple_id=? and payment_status = "SUCCESS") AS today_orders,
                (SELECT COUNT(*)  FROM e_seva_orders WHERE DATE(seva_date) = ?  AND ticket_verified = 0 and temple_id=? and payment_status = "SUCCESS") AS verified_tickets,
                (SELECT COUNT(*)  FROM e_seva_orders  WHERE DATE(seva_date) = ?  AND ticket_verified = 1 and temple_id=? and payment_status = "SUCCESS") AS pending_tickets,
                (SELECT COUNT(*)  FROM e_seva_orders  WHERE DATE(seva_date) = ? and temple_id=? and payment_status = "SUCCESS") AS tomorrow_tickets ;

       SELECT b.seva_type_name , b.seva_name_english, a.* FROM e_seva_orders as a LEFT JOIN e_seva_master AS b ON a.seva_id = b.id WHERE DATE(a.seva_date) = ? and a.temple_id= ? and a.payment_status = "SUCCESS" ORDER BY created_at DESC; 
             
    SELECT b.seva_type_name ,b.seva_name_english, a.* FROM e_seva_orders as a LEFT JOIN e_seva_master AS b ON a.seva_id = b.id WHERE DATE(a.seva_date) = ? and a.temple_id= ? and a.payment_status = "SUCCESS" ORDER BY created_at DESC; `;

    const paramsData = [today, data.temple_id, today, data.temple_id, today, data.temple_id, tomorrow, data.temple_id, today, data.temple_id, tomorrow, data.temple_id];

    console.log(paramsData);


    if (callback && typeof callback === "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls,
            callback
        );
    } else {
        return sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls
        );
    }
}

export function getsevascanTicketDetailsmdl(data, callback) {
    const cntxtDtls = "in getsevascanTicketDetailsmdl";
    const QRY = `
       SELECT a.*,b.seva_name_english,b.seva_type_name,c.temple_name_english FROM e_seva_orders as a join e_seva_master as b on a.seva_id= b.id join e_temple_master as c on a.temple_id = c.temple_id WHERE a.d_in = 0 AND a.ticket_id =? and a.temple_id=? and a.payment_status = "SUCCESS" ORDER BY created_at DESC
    `;
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}

export function updatesevascanverifiedmdl(data, user, callback) {
    var cntxtDtls = "in updatesevascanverifiedmdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_seva_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? and temple_id=? and payment_status = "SUCCESS"; `
    let paramsData = [0, dated, user, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




//-------------------------------------------------------------Prasadam -----------------------------------------------------------------------------------------------

export function getprasadamTicketDetails(data, callback) {
    const cntxtDtls = "in getprasadamTicketDetails";

    const QRY = `SELECT a.*, c.temple_name_english, CONCAT('[', GROUP_CONCAT(
            CONCAT( '{','"item_id":', oi.id, ',', '"booking_date":"', IFNULL(oi.booking_date,''), '",','"prasadam_id":', oi.prasadam_id, ',',
                    '"prasadam_name_telugu":"', IFNULL(pm.name_in_telugu,''), '",', '"prasadam_name_english":"', IFNULL(pm.name_in_english,''), '",',
                    '"price":', oi.price, ',',  '"qty":', oi.qty, ',', '"amount":', oi.amount,'}' )
            ORDER BY oi.id SEPARATOR ',' ),']'
    ) AS items FROM e_prasadam_orders AS a JOIN e_temple_master AS c ON a.temple_id = c.temple_id LEFT JOIN e_prasadam_orders_items AS oi ON a.id = oi.main_id LEFT JOIN e_prasadam_master AS pm ON oi.prasadam_id = pm.prasadam_id AND pm.d_in = 0 WHERE  a.d_in = 0 AND a.contact_number = ? AND a.payment_status = "SUCCESS"  AND DATE(CONVERT_TZ(a.booking_date, '+00:00', '+05:30')) >= CURDATE() AND a.temple_id = ? 
    GROUP BY  a.id,  a.temple_id, a.contact_number, a.created_at, c.temple_name_english ORDER BY a.booking_date ASC;`
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}


export function Checkprasadamnumberdetailsmdl(data, callback) {
    var cntxtDtls = "in Checkprasadamnumberdetailsmdl";
    var QRY_TO_EXEC = `Select id from e_prasadam_orders where contact_number = ? and d_in=?  and temple_id=? ; `
    let paramsData = [data.number, 0, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function updateprasadamOtpMdl(data, otp, callback) {
    var cntxtDtls = "in updateprasadamOtpMdl";
    var QRY_TO_EXEC = `update e_prasadam_orders set otp  = ? where id = ? ; `
    let paramsData = [otp, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function VerifyOtpprasadammdl(data, callback) {
    var cntxtDtls = "in VerifyOtpprasadammdl";
    // data.temple_id = req.user.temple_id;
    // data.temple_id = 10;
    var QRY_TO_EXEC = `Select * from e_prasadam_orders where otp  = ? and  id = ? and temple_id = ?; `
    let paramsData = [data.otp, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function updateticketprasadamverify(data, user, callback) {
    var cntxtDtls = "in updateticketprasadamverify";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_prasadam_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? and payment_status = "SUCCESS" ; `
    let paramsData = [0, dated, user, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getprasadamcurrentdatecountsanddatamdl(data, callback) {
    const IST = "Asia/Kolkata";
    const today = moment().tz(IST).format("YYYY-MM-DD");
    const tomorrow = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");
    const cntxtDtls = "in getprasadamcurrentdatecountsanddatamdl";
    const QRY_TO_EXEC = `
        SELECT  (SELECT COUNT(*)  FROM e_prasadam_orders WHERE DATE(booking_date) = ?  and temple_id=? and payment_status = "SUCCESS")  AS today_orders,
                (SELECT COUNT(*)  FROM e_prasadam_orders WHERE DATE(booking_date) = ?  AND ticket_verified = 0 and temple_id=? and payment_status = "SUCCESS") AS verified_tickets,
                (SELECT COUNT(*)  FROM e_prasadam_orders  WHERE DATE(booking_date) = ?  AND ticket_verified = 1 and temple_id=? and payment_status = "SUCCESS") AS pending_tickets,
                (SELECT COUNT(*)  FROM e_prasadam_orders  WHERE DATE(booking_date) = ? and temple_id=? and payment_status = "SUCCESS") AS tomorrow_tickets ;

        SELECT a.*, CONCAT( '[', GROUP_CONCAT( CONCAT( '{', '"item_id":', oi.id, ',',
                    '"prasadam_id":', oi.prasadam_id, ',', '"prasadam_name_telugu":"', IFNULL(pm.name_in_telugu,''), '",',
                    '"prasadam_name_english":"', IFNULL(pm.name_in_english,''), '",', '"qty":', oi.qty, ',', '"price":', oi.price, ',','"amount":', oi.amount,
                '}') ORDER BY oi.id SEPARATOR ',' ),']') AS items FROM e_prasadam_orders AS a LEFT JOIN e_prasadam_orders_items AS oi
    ON a.id = oi.main_id LEFT JOIN e_prasadam_master AS pm ON oi.prasadam_id = pm.prasadam_id AND pm.d_in = 0 WHERE DATE(a.booking_date) = ? AND a.temple_id = ?
    AND a.d_in = 0 AND a.payment_status = "SUCCESS" GROUP BY a.id, a.temple_id, a.ticket_id, a.order_id, a.devotee_name, a.booking_date,
    a.amount,a.handling_charge, a.total_amount, a.contact_number, a.partner_code, a.printed_on, a.ticket_verified, a.created_at ORDER BY a.created_at DESC;

             
    SELECT a.*, CONCAT( '[', GROUP_CONCAT( CONCAT( '{', '"item_id":', oi.id, ',', '"prasadam_id":', oi.prasadam_id, ',',
                    '"prasadam_name_telugu":"', IFNULL(pm.name_in_telugu,''), '",','"prasadam_name_english":"', IFNULL(pm.name_in_english,''), '",',
                    '"qty":', oi.qty, ',','"price":', oi.price, ',','"amount":', oi.amount, '}' ) ORDER BY oi.id SEPARATOR ',' ),
        ']' ) AS items FROM e_prasadam_orders AS a LEFT JOIN e_prasadam_orders_items AS oi ON a.id = oi.main_id LEFT JOIN e_prasadam_master AS pm ON oi.prasadam_id = pm.prasadam_id AND pm.d_in = 0 WHERE DATE(a.booking_date) = ? AND a.temple_id = ? AND a.d_in = 0 AND a.payment_status = "SUCCESS"
     GROUP BY a.id, a.temple_id, a.ticket_id, a.order_id, a.devotee_name, a.booking_date, a.amount, a.handling_charge, a.total_amount,
    a.contact_number, a.partner_code, a.printed_on, a.ticket_verified, a.created_at ORDER BY a.created_at DESC; `

    const paramsData = [today, data.temple_id, today, data.temple_id, today, data.temple_id, tomorrow, data.temple_id, today, data.temple_id, tomorrow, data.temple_id];

    console.log(paramsData);


    if (callback && typeof callback === "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls,
            callback
        );
    } else {
        return sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls
        );
    }
}

export function getprasadamscanTicketDetailsmdl(data, callback) {
    const cntxtDtls = "in getprasadamscanTicketDetailsmdl";
    const QRY = `SELECT a.*, c.temple_name_english,  CONCAT( '[', GROUP_CONCAT( CONCAT('{', '"item_id":', oi.id, ',',  '"prasadam_id":', oi.prasadam_id, ',', '"prasadam_name_english":"', IFNULL(pm.name_in_english,''), '",', '"qty":', oi.qty, ',','"price":', oi.price, ',','"amount":', oi.amount,'}')  ORDER BY oi.id
            SEPARATOR ',' ),']' ) AS items FROM e_prasadam_orders AS a JOIN e_temple_master AS c ON a.temple_id = c.temple_id  LEFT JOIN e_prasadam_orders_items AS oi
    ON a.id = oi.main_id LEFT JOIN e_prasadam_master AS pm ON oi.prasadam_id = pm.prasadam_id AND pm.d_in = 0 WHERE a.d_in = 0 AND a.ticket_id = ? AND a.temple_id = ? AND a.payment_status = "SUCCESS"
GROUP BY a.id, a.temple_id, a.ticket_id, a.created_at, c.temple_name_english ORDER BY a.created_at DESC; `;
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}

export function updateprasadamscanverifiedmdl(data, user, callback) {
    var cntxtDtls = "in updateprasadamscanverifiedmdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_prasadam_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? and temple_id=? AND payment_status = "SUCCESS"; `
    let paramsData = [0, dated, user, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




//================================================================== MObile App ====================================================================
export function sendOtpMdl(reqdata, callback) {
    const { phonenumber, otp, expiresAt } = reqdata;

    const cntxtDtls = "Posting OTP in the DB";
    const QRY_TO_EXEC = `
        UPDATE users_data 
        SET otp = ?, otp_expires_at = ? 
        WHERE phone_number = ? AND d_in = 0;
        SELECT role_type,image FROM users_data WHERE d_in = 0 AND phone_number = ?;
    `;

    const queryValues = [otp, expiresAt, phonenumber, phonenumber];

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
    var QRY_TO_EXEC = ` SELECT scanning_ind,w_module_id,id,phone_number,id,role_type,image,user_name,designation,temple_id,CASE WHEN COUNT(otp) > 0 THEN MAX(otp) ELSE 0 
    END AS otp FROM users_data WHERE phone_number = ? AND d_in = 0  GROUP BY id, role_type, image, user_name, designation LIMIT 0, 25;`;
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
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    let phonenumber = reqdata.phonenumber;
    let otp = reqdata.otpsending;
    var cntxtDtls = "deleting otp in the db";
    var QRY_TO_EXEC =
        `UPDATE users_data SET otp = NULL,last_login_time=?,login_ind='1' WHERE phone_number = ? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [dated, phonenumber], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function sendotpformobileMdl(reqdata, callback) {
    const { phonenumber, otp, expiresAt } = reqdata;
    const cntxtDtls = "Posting OTP in the DB";
    const QRY_TO_EXEC = `
        UPDATE users_data
        SET otp = ?, otp_expires_at = ?
        WHERE phone_number = ? AND d_in = 0 AND role_type=4;
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


// export function getcustomerdetailsmdl(data, callback) {
//     const cntxtDtls = "in getcustomerdetailsmdl";
//     let QRY_TO_EXEC = `SELECT * FROM e_darshnam_orders WHERE d_in=0 and temple_id = ? and ticket_id = ? ; `;
//     const paramsData = [19, data.barcode];

//     if (callback && typeof callback === "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//         }
//         );
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//     }
// }
export function getcustomerdetailsmdl(data, callback) {
    const cntxtDtls = "in getcustomerdetailsmdl";
    console.log(data);

    let QRY_TO_EXEC = `SELECT b.darshan_name_english, c.temple_name_english ,  a.* FROM e_darshnam_orders a join e_darshan_master b on a.darshanam_id= b.id join e_temple_master c on a.temple_id=c.temple_id WHERE a.d_in=0 and a.temple_id = ? and a.ticket_id = ? ;`;
    const paramsData = [data.temple_id, data.barcode];

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
        }
        );
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function ticket_verficationdetailsmdl(data, callback) {
    const cntxtDtls = "in ticket_verficationdetailsmdl";

    const tableMap = {
        1: 'e_darshnam_orders',
        2: 'e_seva_orders',
        3: 'e_prasadam_orders',
        4: 'e_tonsure_orders'
    };

    const table = tableMap[data.w_module_id];

    let QRY_TO_EXEC = `SELECT * FROM ${table} WHERE d_in=0 and temple_id = ? and ticket_id = ? ; `;
    const paramsData = [data.temple_id, data.barcode];

    console.log(123, QRY_TO_EXEC);

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
        }
        );
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}




export function updateverfificationdata(data, user, callback) {
    const IST = "Asia/Kolkata";
    const today = moment().tz(IST).format("YYYY-MM-DD HH:MM:SS");
    var cntxtDtls = "in updateverfificationdata";
    const tableMap = {
        1: 'e_darshnam_orders',
        2: 'e_seva_orders',
        3: 'e_prasadam_orders',
        4: 'e_tonsure_orders'
    };

    const table = tableMap[user.w_module_id];

    var QRY_TO_EXEC = `update ${table} set  verify_ind  = ? , verifiedcreated_at = ? , verified_by = ?   where  id = ? ; `
    let paramsData = [0, today, user.user, data.id]


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function verifywithqrdetailsmdl(data, user, callback) {
    const IST = "Asia/Kolkata";
    const today = moment().tz(IST).format("YYYY-MM-DD HH:MM:SS");
    var cntxtDtls = "in verifywithqrdetailsmdl";
    var QRY_TO_EXEC = `update e_darshnam_orders set  ticket_verified  = ? , entrycreated_at = ? , entry_by = ?   where  id = ? ; `
    let paramsData = [0, today, user, data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function checknumberdetailsmdl(data, callback) {
    const cntxtDtls = "in checknumberdetailsmdl";

    const QRY_TO_EXEC = `SELECT id FROM e_darshnam_orders WHERE contact_number= ? AND temple_id = ? AND d_in = ? `;
    const paramsData = [data.number, data.temple_id, 0];
    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function sendOtpqrMdl(data, otp, callback) {
    var cntxtDtls = "in sendOtpqrMdl";
    var QRY_TO_EXEC = `update e_darshnam_orders set otp  = ?  where id = ?; `
    let paramsData = [otp, data.id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


// export function verfiywithotpAppmdl(data, callback) {
//     var cntxtDtls = "in verfiywithotpAppmdl";

//     const QRY_TO_EXEC = `SELECT * FROM e_darshnam_orders  where otp  = ? and contact_number= ? AND temple_id = ? AND d_in = ? `;
//     const paramsData = [data.otp, data.mobilenumber, data.temple_id, 0];

//     console.log(QRY_TO_EXEC, paramsData);
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
//             callback(err, results);
//             return;
//         });
//     }
//     else
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };

export function verfiywithotpAppmdl(data, callback) {
    var cntxtDtls = "in verfiywithotpAppmdl";

    const QRY_TO_EXEC = `SELECT b.darshan_name_english, c.temple_name_english ,  a.* FROM e_darshnam_orders a join e_darshan_master b on a.darshanam_id= b.id join e_temple_master c on a.temple_id=c.temple_id  where a.otp  = ? and a.contact_number= ? AND a.temple_id = ? AND a.d_in = ? ;`
    const paramsData = [data.otp, data.mobilenumber, data.temple_id, 0];

    console.log(QRY_TO_EXEC, paramsData);
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

//-------------------------------------------------------------Prasadam -----------------------------------------------------------------------------------------------

export function gettonsureTicketDetails(data, callback) {
    const cntxtDtls = "in gettonsureTicketDetails";

    const QRY = `SELECT a.* ,  c.temple_name_english FROM e_tonsure_orders as a join e_temple_master as c on a.temple_id= c.temple_id WHERE a.d_in = 0 AND a.contact_number = ? and a.temple_id=? AND a.payment_status = "SUCCESS" AND DATE(CONVERT_TZ(a.tonsure_date, '+00:00', '+05:30')) >= CURDATE() ORDER BY tonsure_date ASC;`
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}



export function Checktonsurenumberdetailsmdl(data, callback) {
    var cntxtDtls = "in Checktonsurenumberdetailsmdl";
    var QRY_TO_EXEC = `Select id from e_tonsure_orders where contact_number = ? and d_in=?  and temple_id=? ; `
    let paramsData = [data.number, 0, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function updatetonsureOtpMdl(data, otp, callback) {
    var cntxtDtls = "in updatetonsureOtpMdl";
    var QRY_TO_EXEC = `update e_tonsure_orders set otp  = ? where id = ? ; `
    let paramsData = [otp, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function VerifyOtptonsuremdl(data, callback) {
    var cntxtDtls = "in VerifyOtptonsuremdl";
    // data.temple_id = req.user.temple_id;
    // data.temple_id = 19;
    var QRY_TO_EXEC = `Select * from e_tonsure_orders where otp  = ? and  id = ? and temple_id = ?; `
    let paramsData = [data.otp, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function updatetickettonsureverify(data, user, callback) {
    var cntxtDtls = "in updatetickettonsureverify";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_tonsure_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? ; `
    let paramsData = [0, dated, user, data.record_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function gettonsurecurrentdatecountsanddatamdl(data, callback) {
    const IST = "Asia/Kolkata";
    const today = moment().tz(IST).format("YYYY-MM-DD");
    const tomorrow = moment().tz(IST).add(1, 'days').format("YYYY-MM-DD");
    const cntxtDtls = "in gettonsurecurrentdatecountsanddatamdl";
    const QRY_TO_EXEC = `
        SELECT  (SELECT COUNT(*)  FROM e_tonsure_orders WHERE DATE(tonsure_date) = ?  and temple_id=? AND payment_status = "SUCCESS")  AS today_orders,
                (SELECT COUNT(*)  FROM e_tonsure_orders WHERE DATE(tonsure_date) = ?  AND ticket_verified = 0 and temple_id=? AND payment_status = "SUCCESS") AS verified_tickets,
                (SELECT COUNT(*)  FROM e_tonsure_orders  WHERE DATE(tonsure_date) = ?  AND ticket_verified = 1 and temple_id=? AND payment_status = "SUCCESS") AS pending_tickets,
                (SELECT COUNT(*)  FROM e_tonsure_orders  WHERE DATE(tonsure_date) = ? and temple_id=? AND payment_status = "SUCCESS") AS tomorrow_tickets ;

        SELECT a.*  FROM e_tonsure_orders as a  WHERE DATE(a.tonsure_date) = ?  and a.temple_id=? AND a.payment_status = "SUCCESS" ORDER BY a.created_at DESC;
             
        SELECT a.*  FROM e_tonsure_orders as a  WHERE DATE(a.tonsure_date) = ?  and a.temple_id=? AND a.payment_status = "SUCCESS" ORDER BY a.created_at DESC;`

    const paramsData = [today, data.temple_id, today, data.temple_id, today, data.temple_id, tomorrow, data.temple_id, today, data.temple_id, tomorrow, data.temple_id];

    console.log(paramsData);


    if (callback && typeof callback === "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls,
            callback
        );
    } else {
        return sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls
        );
    }
}

export function gettonsurescanTicketDetailsmdl(data, callback) {
    const cntxtDtls = "in gettonsurescanTicketDetailsmdl";
    const QRY = `
    SELECT a.*, c.temple_name_english FROM e_tonsure_orders as a join  e_temple_master as c on a.temple_id= c.temple_id WHERE a.d_in = 0 AND a.ticket_id = ? and a.temple_id=? AND a.payment_status = "SUCCESS" ORDER BY created_at DESC;
    `
    const params = [data.searchNumber, data.temple_id];
    sqlinjection(MySQLConPool, QRY, params, cntxtDtls, callback);
}

export function updatetonsurescanverifiedmdl(data, user, callback) {
    var cntxtDtls = "in updatetonsurescanverifiedmdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update e_tonsure_orders set ticket_verified  = ? , entrycreated_at = ? , entry_by = ? where id = ? and temple_id=? AND payment_status = "SUCCESS"; `
    let paramsData = [0, dated, user, data.record_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function getentryverificationMdl(data, callback) {
    const cntxtDtls = "in getentryverificationMdl";

    const tableMap = {
        1: 'e_darshnam_orders',
        2: 'e_seva_orders',
        3: 'e_prasadam_orders',
        4: 'e_tonsure_orders'
    };

    const table = tableMap[data.category];

    if (!table) {
        return callback(new Error('Invalid category'), null);
    }
    if (data.category == 1) {
        var QRY_TO_EXEC = ` SELECT b.darshan_name_english, a.* FROM e_darshnam_orders a join e_darshan_master b on 
        a.darshanam_id = b.id WHERE a.ticket_id = ? AND a.temple_id = ? AND a.payment_status = "SUCCESS";`
    } else if (data.category == 2) {
        var QRY_TO_EXEC = `SELECT b.seva_name_english,b.seva_type_name , a.* FROM e_seva_orders a join e_seva_master b on a.seva_id = b.id WHERE a.ticket_id = ? AND a.temple_id = ? AND a.payment_status = "SUCCESS";`
    } else if (data.category == 3) {
        var QRY_TO_EXEC = `SELECT a.verify_ind, a.ticket_id,a.devotee_name,b.prasadam_id,b.qty FROM e_prasadam_orders a join e_prasadam_orders_items b on a.id=b.main_id WHERE a.ticket_id = ? AND a.temple_id = ? AND a.payment_status = "SUCCESS";`;
    } else if (data.category == 4) {
        var QRY_TO_EXEC = ` SELECT  a.* FROM e_tonsure_orders a  WHERE a.ticket_id = ? AND a.temple_id = ? AND a.payment_status = "SUCCESS";`
    }

    const paramsData = [data.ticket_no, data.temple_id];

    console.log(QRY_TO_EXEC, paramsData);


    sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
        callback(err, results);
    }
    );
}


export function getApprovebyUserMdl(data, callback) {
    var cntxtDtls = "in getApprovebyUserMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");

    const tableMap = {
        1: 'e_darshnam_orders',
        2: 'e_seva_orders',
        3: 'e_prasadam_orders',
        4: 'e_tonsure_orders'
    };

    const table = tableMap[data.category];
    let QRY_TO_EXEC = ``
    let paramsData = ``

    if (data.category == 3) {
        QRY_TO_EXEC = `update e_prasadam_orders set  verify_ind  = ? , verifiedcreated_at = ? , verified_by = ?, verified_counter=? , verified_shift=?, duty_date=?  where  ticket_id = ?  and temple_id=?;`
        paramsData = [
            0,
            dated,
            data.user,
            data.counter_id,
            data.shift_id,
            data.duty_date,
            data.record_id,
            data.temple_id,
        ];
    } else {
        QRY_TO_EXEC = `update ${table} set  verify_ind  = ? , verifiedcreated_at = ? , verified_by = ? where ticket_id = ? and temple_id = ?; `

        paramsData = [0, dated, data.user, data.record_id, data.temple_id];
    }

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getprasadamtypesMdl(data, callback) {
    var cntxtDtls = "in getprasadamtypesMdl";
    var QRY_TO_EXEC = `Select * from e_prasadam_master where temple_id = ? and active =? and d_in=0 ; `
    let paramsData = [data.temple_id, 1];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function AddPrasadamStockMdl(data, callback) {
    var cntxtDtls = "in AddPrasadamStockMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `INSERT INTO e_prasadam_stock(temple_id,prasadam_id,counter_id,shift_id,duty_date,quantity, entry_by, i_ts) VALUES (?, ? , ? , ? , ?, ? , ? , ? )`;
    let paramsData = [
        data.temple_id,
        data.prasadam_id,
        data.counter_id,
        data.shift_id,
        data.duty_date,
        data.quantity,
        data.user,
        dated,
    ];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getPrasadamStockMdl(data, callback) {
    var cntxtDtls = "in getPrasadamStockMdl";
    const IST = "Asia/Kolkata";
    const todayDate = moment().tz(IST).format("YYYY-MM-DD");
    var QRY_TO_EXEC = `Select a.*,b.name_in_english from e_prasadam_stock a join e_prasadam_master b on a.prasadam_id = b.prasadam_id where a.temple_id = ? and DATE(a.i_ts) = ?   and a.d_in = ? order by a.id desc;`
    let paramsData = [data.temple_id, todayDate, 0]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function gettodayPrasadamStockDetailsMdl(data, callback) {
    const cntxtDtls = "in gettodayPrasadamStockDetailsMdl";
    const IST = "Asia/Kolkata";
    const todayDate = moment().tz(IST).format("YYYY-MM-DD");
    // const todayDate = moment().tz(IST).subtract(1, 'day').format("YYYY-MM-DD");
    let prasadamCondStock = '';
    let prasadamCondSale = '';
    let paramsData = [];
    if (data.prasadam_id != 0) {
        prasadamCondStock = ' AND prasadam_id   = ? ';
        prasadamCondSale = ' AND b.prasadam_id = ? ';
    }
    const QRY_TO_EXEC = ` 
        SELECT  IFNULL(( SELECT SUM(quantity) FROM e_prasadam_stock WHERE temple_id = ? AND DATE(i_ts) = ? ${prasadamCondStock} ), 0) AS add_stock_bytoday,
        IFNULL(( SELECT SUM(b.qty) FROM e_prasadam_orders a JOIN e_prasadam_orders_items b ON a.id = b.main_id WHERE a.temple_id = ? AND 
        DATE(a.created_at) = ? ${prasadamCondSale} AND a.payment_status = 'SUCCESS' ), 0) AS sale_stock_bytoday , ? AS today_date `;
    paramsData.push(data.temple_id, todayDate);
    if (data.prasadam_id != 0) {
        paramsData.push(data.prasadam_id);
    }
    paramsData.push(data.temple_id, todayDate);
    if (data.prasadam_id != 0) {
        paramsData.push(data.prasadam_id);
    }
    paramsData.push(todayDate);
    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
}


export function getdatewisePrasadamAnalysisMdl(data, callback) {
    var cntxtDtls = "in getdatewisePrasadamAnalysisMdl";

    var QRY_TO_EXEC = `SELECT  DATE(s.i_ts) AS stock_date, s.prasadam_id, pm.name_in_english AS prasadam_name, IFNULL(SUM(s.quantity), 0) AS add_stock,

    IFNULL(( SELECT SUM(oi.qty) FROM e_prasadam_orders o JOIN e_prasadam_orders_items oi  ON o.id = oi.main_id WHERE oi.prasadam_id = s.prasadam_id
          AND o.temple_id = s.temple_id AND DATE(o.created_at) = DATE(s.i_ts) AND o.payment_status = 'SUCCESS' ), 0) AS sale_stock,

    IFNULL(( SELECT SUM(oi.amount)  FROM e_prasadam_orders o JOIN e_prasadam_orders_items oi  ON o.id = oi.main_id
        WHERE oi.prasadam_id = s.prasadam_id AND o.temple_id = s.temple_id AND DATE(o.created_at) = DATE(s.i_ts) AND o.payment_status = 'SUCCESS'
    ), 0) AS items_revenue FROM e_prasadam_stock s JOIN e_prasadam_master pm  ON s.prasadam_id = pm.prasadam_id WHERE s.temple_id = ? AND s.d_in = 0
    GROUP BY DATE(s.i_ts), s.prasadam_id ORDER BY stock_date DESC; `

    let paramsData = [data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function updateDarshnamBlockDatesMdl(data, callback) {
    console.log(1094, data);
    var cntxtDtls = "in updateDarshnamBlockDatesMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    const { category_type, date2, date1, rowId, upadted_by, temple_id } = data;
    var QRY_TO_EXEC = `UPDATE e_block_dates 
        SET category_type = ?,todate = ?,fromdate = ?, updated_by = ?, updated_date = ?
        WHERE temple_id = ? AND id = ?`
    let paramsData = [category_type, date2, date1, upadted_by, dated, temple_id, rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



export function getStockDetailsMdl(data, callback) {
    var cntxtDtls = "in getStockDetailsMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");

    console.log(1115, data)

    var QRY_TO_EXEC = `WITH addstock_data AS (
    SELECT epm.name_in_telugu,epm.name_in_english, epm.prasadam_id,
    COALESCE(SUM( case when epm.day_expire=0 and eps.duty_date=? and eps.entry_type=0 then eps.quantity when epm.day_expire=1 and eps.entry_type=0 then eps.quantity end), 0) AS addstock, 
    COALESCE(SUM( case when epm.day_expire=0 and eps.duty_date=? and eps.entry_type=1 then eps.quantity when epm.day_expire=1 and eps.entry_type=1 then eps.quantity end), 0) AS removestock, 
    COALESCE(SUM(case when eps.counter_id=? and eps.shift_id=? and eps.duty_date=? and eps.entry_type=0  then eps.quantity end), 0) as shift_added_stock,
    COALESCE(SUM(case when eps.counter_id=? and eps.shift_id=? and eps.duty_date=? and eps.entry_type=1  then eps.quantity end), 0) as shift_removed_stock
    FROM  e_prasadam_master epm
    left JOIN e_prasadam_stock eps ON eps.prasadam_id = epm.prasadam_id and eps.counter_id = ?
    WHERE epm.temple_id=? and epm.d_in=0
    GROUP BY epm.prasadam_id
),
instock_data AS (
    SELECT  epm.prasadam_id,COALESCE(SUM(epoi.qty), 0) AS soldStock,
    COALESCE(SUM(case when epo.verified_counter=? and epo.verified_shift=? and epo.duty_date=?  then epoi.qty end), 0) as shift_sale_stock
     FROM e_prasadam_master epm 
    left JOIN e_prasadam_orders_items  epoi on epm.prasadam_id=epoi.prasadam_id 
    join e_prasadam_orders epo on epoi.main_id = epo.id AND epo.verified_counter = ? and epo.payment_status = 'SUCCESS' and epo.verify_ind = 0
    WHERE epm.temple_id=? and epm.d_in=0
    GROUP BY epm.prasadam_id
)
SELECT 
    ad.prasadam_id,ad.name_in_telugu,ad.name_in_english,
    ad.shift_added_stock,
    ad.shift_removed_stock,
    COALESCE(id.shift_sale_stock,0) as shift_sale_stock,
    CASE 
    WHEN (ad.addstock - COALESCE(id.soldstock, 0) - ad.removestock)<0 THEN 0
    ELSE ad.addstock - COALESCE(id.soldstock, 0 ) - ad.removestock
    END AS instock
    FROM addstock_data ad
    left JOIN instock_data id ON ad.prasadam_id = id.prasadam_id order by ad.prasadam_id`;

    console.log(1115, QRY_TO_EXEC)

    let values = [
        data.duty_date,

        data.duty_date,

        data.counter_id,
        data.shift_id,
        data.duty_date,

        data.counter_id,
        data.shift_id,
        data.duty_date,

        data.counter_id,
        data.temple_id,

        data.counter_id,
        data.shift_id,
        data.duty_date,
        data.counter_id,
        data.temple_id
    ]

    console.log(1115, values);



    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            values,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function submitPreviousStockMdl(data, callback) {
    var cntxtDtls = "in shiftReportMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");



    var QRY_TO_EXEC = `INSERT INTO e_shift_wise_report(user_id,shift_id,counter_id,entry_by,entry_date,entry_time,duty_date,temple_id)VALUES(?,?,?,?,?,?,?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [
                data.user_id,
                data.shift_id,
                data.counter_id,
                data.user_id,
                date,
                time,
                data.duty_date,
                data.temple_id,
            ],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function submitPreviousStockDetailsMdl(data, callback) {
    console.log(data);
    var cntxtDtls = "in submitPreviousStockDetailsMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");
    var QRY_TO_EXEC = `INSERT into e_shift_wise_report_details (main_id, prasadam_id, previous_stock)VALUES(?,?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [data.main_id, data.prasadam_id, data.previous_stock],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

export function checkShiftReportMdl(data, callback) {
    console.log(data);
    var cntxtDtls = "in shiftReportMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");
    var QRY_TO_EXEC = `SELECT esd.id, es.shift_id,es.counter_id,es.duty_date, esd.prasadam_id,esd.previous_stock,esd.shift_sold_stock,esd.shift_added_stock FROM e_shift_wise_report es left join e_shift_wise_report_details esd on es.id=esd.main_id WHERE counter_id=? and shift_id=? and duty_date=? and temple_id=? order by esd.prasadam_id`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [
                data.counter_id,
                data.shift_id,
                data.duty_date,
                data.temple_id
            ],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
export function submitFullShiftReportMdl(data, callback) {
    console.log(data);
    var cntxtDtls = "in shiftReportMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");
    var QRY_TO_EXEC = `update e_shift_wise_report_details set shift_added_stock=?,shift_sold_stock=?,shift_removed_stock=? where id=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [data.shift_added_stock, data.shift_sale_stock, data.shift_removed_stock, data.id],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}

//counter sale

export function getCountersMdl(data, callback) {
    console.log(data);
    var cntxtDtls = "in getCountersMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");
    var QRY_TO_EXEC = `SELECT * FROM e_counter_details WHERE temple_id=? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [data.temple_id],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
export function getShiftsMdl(data, callback) {
    console.log(data);
    var cntxtDtls = "in getShiftsMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");
    var QRY_TO_EXEC = `SELECT * FROM e_shift_details WHERE temple_id=? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [data.temple_id],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}
export function getShiftSaleReportMdl(data, callback) {
    console.log(data);
    var cntxtDtls = "in getShiftSaleReportMdl";
    const IST = "Asia/Kolkata";
    var date = moment().tz(IST).format("YYYY-MM-DD");
    var time = moment().tz(IST).format("HH:mm:ss");

    let sub = ``
    let values = [data.temple_id]

    if (data.from_date && data.to_date && data.counter_id && data.shift_id) {
        sub = ` and Date(esr.duty_date)>=? and Date(esr.duty_date)<=? and esr.counter_id=? and esr.shift_id=?   `
        values = [data.temple_id, data.from_date, data.to_date, data.counter_id, data.shift_id]
    } else if (data.from_date && data.to_date && data.counter_id) {
        sub = ` and Date(esr.duty_date)>=? and Date(esr.duty_date)<=? and esr.counter_id=? `
        values = [data.temple_id, data.from_date, data.to_date, data.counter_id]
    } else if (data.from_date && data.to_date && data.shift_id) {
        sub = `and Date(esr.duty_date)>=? and Date(esr.duty_date)<=? and esr.shift_id=? `
        values = [data.temple_id, data.from_date, data.to_date, data.shift_id]
    } else if (data.from_date && data.to_date) {
        sub = `and Date(esr.duty_date)>=? and Date(esr.duty_date)<=?   `
        values = [data.temple_id, data.from_date, data.to_date]
    }


    var QRY_TO_EXEC = `SELECT epm.name_in_telugu,esd.Stock_name,ecd.counter_name, esr.duty_date,esr.temple_id,esr.temple_id,esr.shift_id,esr.counter_id,esr.user_id,esw.* FROM e_shift_wise_report esr join e_shift_wise_report_details esw on esr.id = esw.main_id
join e_prasadam_master epm on epm.prasadam_id=esw.prasadam_id
join e_shift_details esd on esd.id=esr.shift_id
join e_counter_details ecd on ecd.id=esr.counter_id
WHERE esr.temple_id=? ${sub} ORDER BY esr.duty_date desc , esr.counter_id asc,esr.shift_id asc,esw.prasadam_id`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            values,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}


export function reomoveCounterStockMdl(data, callback) {
    var cntxtDtls = "in reomoveCounterStockMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `INSERT INTO e_prasadam_stock(temple_id,prasadam_id,counter_id,shift_id,duty_date,quantity, entry_by, i_ts,entry_type ) VALUES (?, ? , ? , ? , ?, ? , ? , ? , ? )`;
    let paramsData = [
        data.temple_id,
        data.prasadam_id,
        data.counter_id,
        data.shift_id,
        data.duty_date,
        data.quantity,
        data.user,
        dated,
        1
    ];
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            paramsData,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            },
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
}


//counter-sale--------------------------------------------------------------- end


export function submitDarshnamBlockDatesMdl(data, callback) {
    console.log(data, 1061);
    var cntxtDtls = "in submitDarshnamBlockDatesMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `INSERT INTO e_block_dates(temple_id,fromdate,todate,entry_by, i_ts, category_type) VALUES (?, ? , ? , ? , ? ,?)`
    let paramsData = [data.temple_id, data.date1, data.date2, data.entry_by, dated, data.category_type]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getdeDarshanamBlockDatesMdl(data, callback) {
    var cntxtDtls = "in getdeDarshanamBlockDatesMdl";
    let value = [];
    let templeId = ``;
    if (data.role_type == 10 || data.role_type == 14) {
        templeId = " AND a.temple_id = ? ";
        value = [data.temple_id];
    } else {
        value = [];
    }
    var QRY_TO_EXEC = `SELECT a.*,b.temple_name_english  FROM e_block_dates AS a LEFT JOIN e_temple_master AS b  ON a.temple_id = b.temple_id where a.d_in = 0 AND   b.d_in = 0 ${templeId} ORDER BY a.id DESC; `
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, value, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function deleteDarshanamBlockDatesMdl(data, callback) {
    console.log(1094, data);
    var cntxtDtls = "in deleteDarshanamBlockDatesMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `UPDATE e_block_dates SET d_in = 1,d_by=?,d_date=? where id = ? `
    let paramsData = [data.d_by, dated, data.rowId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function updateDarshnampaymentStatusMdl(data, callback) {
    var cntxtDtls = "in updateDarshnampaymentStatusMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    const { temple_id, ticketId, upadted_by } = data;
    var QRY_TO_EXEC = `UPDATE e_darshnam_orders  SET payment_status = 'SUCCESS', updated_by = ?, updated_date = ? WHERE temple_id = ? AND ticket_id = ? ;`
    let paramsData = [upadted_by, dated, temple_id, ticketId]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function checkcouterLoginStatusMdl(data, callback) {
    var cntxtDtls = "in updateDarshnampaymentStatusMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `SELECT user_name,phone_number FROM users_data WHERE login_ind = 1 and counter_id=? and id!=? and temple_id=? and d_in=0;`
    let paramsData = [data.counter_id, data.user_id, data.temple_id]
    console.log(QRY_TO_EXEC, paramsData);

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function logoutPreviousLoginsMdl(data, callback) {
    var cntxtDtls = "in updateDarshnampaymentStatusMdl";
    const IST = "Asia/Kolkata";
    var dated = moment().tz(IST).format("YYYY-MM-DD HH:mm:ss");
    var QRY_TO_EXEC = `update users_data set  login_ind = 0 WHERE counter_id=? and id !=? and temple_id=? and d_in=0;`
    let paramsData = [data.counter_id, data.user_id, data.temple_id]
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
