import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";



export function getjccaderdataMdl(callback) {
  const cntxtDtls = "in getjccaderdataMdl";

  const QRY_TO_EXEC = `SELECT * FROM  jc_festvals;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function getdccaderdataMdl(callback) {
  const cntxtDtls = "in getdccaderdataMdl";

  const QRY_TO_EXEC = `SELECT * FROM  dc_festivals;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function getstateleveldataMdl(callback) {
  const cntxtDtls = "in getstateleveldataMdl";

  const QRY_TO_EXEC = `SELECT * FROM  state_festivals;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}



