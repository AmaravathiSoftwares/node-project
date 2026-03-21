import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


// sankar code 
export function jewellerytotalcountMdl(callback) {
  const cntxtDtls = "in jewellerytotalcountMdl";
  const QRY_TO_EXEC = `SELECT Gold___Silver ,SUM(Total_Value_in_Rs_) AS total FROM jeweller_data GROUP BY Gold___Silver;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}

export function getJewelleryMdl(limit, offset, jewellerycategory, callback) {
  const cntxtDtls = "in getJewelleryMdl";
  
  let dataQuery = `SELECT * FROM jeweller_data`;
  let countQuery = `SELECT COUNT(*) AS totalCount FROM jeweller_data`;
  let queryParams = [];
  let countParams = [];
  
  // Add filter if fdpurpose is provided
  if (jewellerycategory) {
    dataQuery += ` WHERE Gold___Silver = ?`;
    countQuery += ` WHERE Gold___Silver = ?`;
    queryParams.push(jewellerycategory);
    countParams.push(jewellerycategory);
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
