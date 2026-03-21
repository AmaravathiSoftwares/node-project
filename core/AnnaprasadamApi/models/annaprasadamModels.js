import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


export function annadhanamtotalcountMdl(callback) {
  const cntxtDtls = "in annadhanamtotalcountMdl";

const QRY_TO_EXEC = `SELECT 
  COUNT(temple_name) AS total1,
  SUM(amount) AS total2
FROM annadanam_info;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}


export function getannaprasadamdataMdl(callback) {
  const cntxtDtls = "in getannaprasadamdataMdl";

  const QRY_TO_EXEC = `SELECT * FROM annadanam_info;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}
