import { MySQLConPool } from "../../../config/dbconnect.js";
import { sqlinjection } from "../../../utils/utils.js";
import moment from "moment-timezone";

export function submitShopsDetailsMdl(data, callback) {
  const IST = "Asia/Kolkata";
  console.log(114, data);
  var LDS = moment(data.lastDateOfListing).tz(IST).format("YYYY-MM-DD");
  var cntxtDtls = "in submitShopsDetailsMdl";
  var QRY_TO_EXEC = `insert into shopsandbuildings set ?`;
  var values = {
    district_name: data.district_id,
    mandal_name: data.mandal_id,
    village_name: data.village_id,
    temple_name: data.temple_nm,
    tcode: data.temple_code,
    select_category: data.category_type,
    shop_name: data.shop_name,
    shop_oner_name: data.shop_oner_name,
    shop_oner_number: data.shop_oner_number,
    lease_from_date: data.lease_from_date,
    lease_last_date: data.lease_last_date,
    lease_approved_by: data.lease_approved_by,
    lease_amount_per_year: data.lease_amount_per_year,
    lease_order_issued_by: data.leaseorder_issued_by,
    entry_by: data.entry_by,
  };
  console.log(values);
  if (callback && typeof callback == "function") {
    sqlinjection(
      MySQLConPool,
      QRY_TO_EXEC,
      values,
      cntxtDtls,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
  }
}
