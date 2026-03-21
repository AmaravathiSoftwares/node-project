import * as masterMdl from "../models/ttdmandirmodel.js";
import request from "request"; //for otp service
import unirest from "unirest";

import fs from 'fs';
import path from 'path';

export async function submitShopsDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  console.log(data, "formData");
  masterMdl.submitShopsDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getshopsandbuildingsdataCtrl(req, res) {
  const { limit = 50, offset = 0 } = req.body;
  var data = req.body;
  let user = req.user;

  console.log("Request params:", { limit, offset });

  masterMdl.getshopsandbuildingsdataMdl(
    limit,
    offset,
    data,
    user,
    function (err, cRes) {
      if (err) {
        res.send({ status: 500, msg: "Server Error" });
        return;
      }
      const response = {
        status: 200,
        data: cRes.data, // paginated records
        totalCount: cRes.totalCount, // total number of records
      };
      res.send(response);
    }
  );
}

export async function updateShopsDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.updated_by = user.id;
  masterMdl.updateShopsDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function deleteshopsandbuildingsDetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteshopsandbuildingsDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

// <-----------------------------------------Districts--------------------------------------->
export async function getdistricts(req, res) {
  var data = req.body;
  masterMdl.getdistricts(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getmandals(req, res) {
  var data = req.body;
  masterMdl.getmandals(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getvillagesbymandalid(req, res) {
  var data = req.body;
  masterMdl.getvillagesbymandalid(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getconstituenciesbydistrictid(req, res) {
  var data = req.body;
  masterMdl.getconstituenciesbydistrictid(data, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}



export async function submitttdmandirrequest(req, res) {
  const data = req.body;

  masterMdl.Checkmobilenumber(data.person_no, function (err, results) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }

    if (results && results.length > 0) {
      res.send({ "status": 303, "msg": "Mobile Number Already Exist" });
    }
    const DOC_FIELDS = [
      'temple_commitee_doc',
      'bank_passbook_doc',
      'land_title_doc',
      'adangla_ib_doc',
      'donor_acceptance_doc',
      'ceritified_doc',
      'aadhaar_doc'
    ];

    const basePath = "/mnt/uploads/ttdmandirdocs";
    const baseUrl = "https://endowmentsinfo.ap.gov.in/uploads/ttdmandirdocs/";

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    for (let i = 0; i < DOC_FIELDS.length; i++) {
      const field = DOC_FIELDS[i];
      data[field + "_url"] = "";
      if (data[field] && Array.isArray(data[field]) && data[field].length > 0) {
        const image_url = data[field][0].reviewimage;
        const filetype = data[field][0].filetype;

        if (image_url && filetype) {
          const array = image_url.split(",");
          if (array[1]) {
            const datetimestamp = Date.now();
            const random_number = Math.floor(100000 + Math.random() * 900000);
            const unicnumber = random_number + "" + datetimestamp;
            const fileName = unicnumber + "." + filetype;
            const filePath = basePath + "/" + fileName;
            fs.writeFileSync(filePath, array[1], "base64");
            data[field + "_url"] = baseUrl + fileName;
          }
        }
      }
      delete data[field];
    }


    // ✅ Insert main request
    masterMdl.submitttdmandirrequest(data, function (err, cRes) {
      if (err) {
        return res.status(500).send({ status: 500, msg: "Server Error" });
      }

      const lastInsertId = cRes.insertId;
      const templesNearby = data.other_temples_details;

      // ✅ CASE 1: No nearby temples → return success
      if (!Array.isArray(templesNearby) || templesNearby.length === 0) {
        return res.status(200).send({ status: 200, msg: "Request submitted successfully", request_id: lastInsertId, });
      }

      // ✅ CASE 2: Nearby temples exist → insert them
      masterMdl.submitotherstemplesnearby(
        lastInsertId,
        templesNearby,
        function (err, childRes) {
          if (err) {
            return res.status(500).send({ status: 500, msg: "Server Error" });
          }
          return res.status(200).send({ status: 200, msg: "Request submitted successfully", request_id: lastInsertId, nearby_temples_inserted: childRes, });
        }
      );
    });
  });
}

export async function getuserdatadetailsamdnumber(req, res) {
  var data = req.body;
  masterMdl.getuserdatadetailsamdnumber(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getusermandirrequestsctrl(req, res) {
  var data = req.body;
  masterMdl.getusermandirrequestsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};



export async function sendOtpCtrl(req, res) {


  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  var phone_number = req.body.number

  masterMdl.sendOtpMdl(phone_number, otp, function (err, results) {

    console.log(results.affectedRows)


    if (err) {
      return res.status(500).json({ status: 500, msg: 'Database error', error: err });
    }

    if (results) {
      const message = `Amaravathi ${otp} is the OTP to complete your login. It is valid for 90 seconds. Please do not share with anyone. Team Amaravathi.`;

      const smsApiUrl = `http://sms.sunstechit.com/app/smsapi/index.php?key=55C4941BC46BE5&campaign=0&routeid=13&type=text&contacts=${phone_number}&senderid=AMVTIT&msg=${message}&template_id=1207165884239050921`;

      request(smsApiUrl, function (error, response, body) {
      });


      //whatsapp
      // console.log("its working here")
      var req = unirest("POST", "https://live-mt-server.wati.io/6023/api/v1/sendTemplateMessages");
      // var generatedate = moment().format("DDMMYY");
      req.headers({
        "postman-token": "7582f32a-780b-bdb7-dc50-704bff9bd850",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMzY5NzlkMi02NWM2LTQzN2UtYmQwOC04YzljZDBlNDIwMTYiLCJ1bmlxdWVfbmFtZSI6InNlb0BhbWFyYXZhdGhpc29mdHdhcmUuY29tIiwibmFtZWlkIjoic2VvQGFtYXJhdmF0aGlzb2Z0d2FyZS5jb20iLCJlbWFpbCI6InNlb0BhbWFyYXZhdGhpc29mdHdhcmUuY29tIiwiYXV0aF90aW1lIjoiMTEvMjYvMjAyNCAwNTowNjoxNyIsInRlbmFudF9pZCI6IjYwMjMiLCJkYl9uYW1lIjoibXQtcHJvZC1UZW5hbnRzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkJST0FEQ0FTVF9NQU5BR0VSIiwiVEVNUExBVEVfTUFOQUdFUiIsIkNPTlRBQ1RfTUFOQUdFUiIsIk9QRVJBVE9SIiwiREVWRUxPUEVSIiwiQVVUT01BVElPTl9NQU5BR0VSIl0sImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.3zgQI5MNYgXIUeflelJVeV637ZOSvmtegI63bz2UmSo"
      });

      req.type("json");
      req.send({
        "template_name": "otp_new_amvt",
        "broadcast_name": "string",
        "receivers": [
          {
            "whatsappNumber": "91" + phone_number,
            "customParams": [
              {
                "name": "1",
                "value": otp
              }
              // {
              //     "name": "client_nm",
              //     "value": "Ravi"
              // },
              // {
              //     "name": "amount_amvt",
              //     "value": pdf_front_data.grand_total
              // },
            ]
          }
        ]
      });
      req.end(function (res) {
        // console.log(res.body, 18127);
      });
      res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
    }
  });
}







//verfiying the otp

export function veriftOtpCtrl(req, res) {
  console.log("Mahi");

  masterMdl.veriftOtpMdl(req.body, function (err, results) {
    if (!results.length) {
      res.send({ status: 300, msg: "INVALID OTP" });
      return;
    } else {
      res.send({ status: 200, data: results });
    }
  });
}
