import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


// sankar code 
export function assessembleincomecountMdl(callback) {
  const cntxtDtls = "in assessembleincomecountMdl";
  const QRY_TO_EXEC = `SELECT 
  (SELECT SUM(INCOME) FROM y202324 WHERE YEAR = '2023') AS total2023,
  (SELECT SUM(INCOME) FROM y202324 WHERE YEAR = '2024') AS total2024,
  (SELECT SUM(INCOME) FROM y202324 WHERE YEAR = '2025') AS total2025;`;

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
      callback(err, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}


export function getAssembleIncomeMdl(limit, offset, incomecategory, callback) {
  const cntxtDtls = "in getAssembleIncomeMdl";
  
 let dataQuery = `
  SELECT 
    TCODE,
    temple_name,
    district_name,
    MAX(CASE WHEN YEAR = 2023 THEN INCOME ELSE 0 END) AS \`2023 Year\`,
    MAX(CASE WHEN YEAR = 2024 THEN INCOME ELSE 0 END) AS \`2024 Year\`,
    MAX(CASE WHEN YEAR = 2025 THEN INCOME ELSE 0 END) AS \`2025 Year\`
  FROM y202324
`;

let countQuery = `SELECT COUNT(DISTINCT TCODE) AS totalCount FROM y202324`;
let queryParams = [];
let countParams = [];

// Optional filtering by year
if (incomecategory) {
  dataQuery += ` WHERE YEAR = ?`;
  countQuery += ` WHERE YEAR = ?`;
  queryParams.push(incomecategory);
  countParams.push(incomecategory);
}

dataQuery += ` GROUP BY TCODE, temple_name, district_name LIMIT ? OFFSET ?`;
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
