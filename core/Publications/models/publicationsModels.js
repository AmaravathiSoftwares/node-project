import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


// sankar code 
export function publicationstotalcountMdl(callback) {
  const cntxtDtls = "in publicationstotalcountMdl";

  const QRY_TO_EXEC = `SELECT 
    SUM(\`6(a)(i)\`) AS total1,
    SUM(\`6(a)(ii)\`) AS total2,
    SUM(\`6(b)(i)\`) AS total3,
    SUM(\`6(b)(ii)\`) AS total4,
    SUM(\`6(c)(i)\`) AS total5,
    SUM(\`6(c)(ii)\`) AS total6,
    SUM(\`6(d)\`) AS total7,
    SUM(\`6(e)\`) AS total8
  FROM publications;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function getPublicationsdataMdl(callback) {
  const cntxtDtls = "in getPublicationsdataMdl";

  const QRY_TO_EXEC = `SELECT * FROM publications;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}
