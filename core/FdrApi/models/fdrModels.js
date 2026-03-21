import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";

// sankar code 
export function fdrtotalcountMdl(callback) {
  const cntxtDtls = "in fdrtotalcountMdl";
  const QRY_TO_EXEC = `SELECT fdpurpose, SUM(da) AS total FROM fdr GROUP BY fdpurpose;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function getAllTasksMdl(limit, offset, fdpurpose, callback) {
  const cntxtDtls = "in getAllTasksMdl";
  
  let dataQuery = `SELECT * FROM fdr`;
  let countQuery = `SELECT COUNT(*) AS totalCount FROM fdr`;
  let queryParams = [];
  let countParams = [];
  
  // Add filter if fdpurpose is provided
  if (fdpurpose) {
    dataQuery += ` WHERE fdpurpose = ?`;
    countQuery += ` WHERE fdpurpose = ?`;
    queryParams.push(fdpurpose);
    countParams.push(fdpurpose);
  }
  
  dataQuery += ` LIMIT ? OFFSET ?;`;
  queryParams.push(parseInt(limit), parseInt(offset));

  sqlinjection(MySQLConPool, countQuery, countParams, cntxtDtls, function (errCount, countResults) {
    if (errCount) {
      console.error('Count Query Error:', errCount); // Debug log
      callback(errCount, null);
      return;
    }
    
    const totalCount = countResults[0].totalCount;
 
    sqlinjection(MySQLConPool, dataQuery, queryParams, cntxtDtls, function (err, results) {
      if (err) {
        console.error('Data Query Error:', err); // Debug log
        callback(err, null);
        return;
      }
      callback(null, {
        data: results,
        totalCount: totalCount
      });
    });
  });
}