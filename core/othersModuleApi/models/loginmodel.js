import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection, execQuery } from '../../../utils/utils.js';
import moment from "moment-timezone";
// export function sendOtpMdl(reqdata, callback) {
//     const { phonenumber, otp, expiresAt } = reqdata;

//     const cntxtDtls = "Posting OTP in the DB";
//     const QRY_TO_EXEC = `
//         SET otp = ?, otp_expires_at = ?
//         WHERE phone_number = ? AND d_in = 0;
//         SELECT IF(ROW_COUNT() = 0, 'No rows updated', 'OTP updated') AS result;
//         SELECT * from users_data WHERE phone_number=? and d_in=0;
//     `;

//     const queryValues = [otp, expiresAt, phonenumber,phonenumber];

//     if (callback && typeof callback === "function") {
//         sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls, (err, results) => {
//             if (err) {
//                 callback(err, null);
//                 return;
//             }
//             callback(null, results);
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls);
//     }
// }

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
    var QRY_TO_EXEC =`SELECT a.counter_id, a.shift_id, a.w_module_id, a.temple_id, a.id, a.phone_number, a.role_type, a.image, a.user_name, a.designation,b.start_time,b.end_time, COALESCE(MAX(a.otp), 0) AS otp FROM users_data AS a LEFT JOIN e_shift_details AS b ON a.shift_id = b.id WHERE a.phone_number = ? AND a.d_in = 0 GROUP BY a.id ,   a.role_type, a.image, a.user_name, a.designation LIMIT 0, 25;`
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [phonenumber],
            cntxtDtls,
            function (err, results) {
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
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [dated, phonenumber],
            cntxtDtls,
            function (err, results) {
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

//cm dashboard Api
export function verifUserAuthDetaillMdl(reqdata, callback) {
    let { userName, password } = reqdata;
    let otp = reqdata.otpsending;
    var cntxtDtls = "verifying otp in the db";
    var QRY_TO_EXEC = ` SELECT id,role_type FROM users_data WHERE user_name = ? AND password=? and d_in = 0;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [userName, password], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function updateLogoutStatus(reqdata, callback) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    
    var cntxtDtls = "deleting otp in the db";
    var QRY_TO_EXEC =
        `UPDATE users_data SET login_ind='0' WHERE id = ? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool,QRY_TO_EXEC,[reqdata.id],cntxtDtls,function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}