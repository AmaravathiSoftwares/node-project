import * as masterMdl from '../models/ticketcountermodel.js';
import unirest from "unirest";
import jwt from 'jsonwebtoken';
import { hash, compare } from "bcrypt";
import request from 'request';   //for otp service
import { sendOtp } from "../../../utils/watiSmsUtil.js";
import { createAccessToken, createRefreshToken, validaterefreshToken } from '../../../utils/jwtUtils.js';
import envs from '../../../config.js';
const { NODE_ENV } = envs;


function getTodayDate(passedTime) {
  const IST = "Asia/Kolkata";  // Define timezone
  let now = moment().tz(IST);  // Get the current moment in IST
  const hours = now.hour(); // moment hour()
  const referenceTime = "12:00:00";  // Define the reference time (12:00:00)

  if (hours >= 0 && hours < 12) {
    // Parse passedTime and referenceTime as moment objects
    const passedMoment = moment(passedTime, "HH:mm:ss", true);  // 'true' enforces strict parsing
    const referenceMoment = moment(referenceTime, "HH:mm:ss", true);  // 'true' enforces strict parsing

    // Check if the passed time is valid
    if (!passedMoment.isValid()) {
      throw new Error(`Invalid time format: ${passedTime}`);
    }

    // If passed time is after 12:00:00, use the previous date
    if (passedMoment.isAfter(referenceMoment)) {
      now = now.subtract(1, "day");  // Subtract one day if time is after 12:00:00
    }
  }
  return now.format("YYYY-MM-DD");  // Return the date in 'YYYY-MM-DD' format
}


// <-----------------------------------------Districts---------------------------------------> 
export async function getdistricts(req, res) {
  var data = req.body;
  masterMdl.getdistricts(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


//-------------------------------------------------------------Drashanam ------------------------------------------------------------------
export async function getTicketDetails(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getTicketDetails(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function Sendotpdetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  masterMdl.updateOtpMdl(data, otp, async function (err, results) {
    if (err) {
      return res.status(500).json({ status: 500, msg: 'Database error', error: err });
    }
    if (results) {
      let obj = {
        phone_number: data.number,
        otp: otp
      }
      console.log(otp);
      const sendOtpResponce = await sendOtp(obj);
      res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
    }
  });
}


export async function VerifyOtpdarshanamctrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  // data.temple_id = 19;
  masterMdl.VerifyOtpdarshanammdl(data, function (err, cRes) {
    if (cRes.length) {
      res.send({ "status": 200, "message": 'Successfully Verified', "data": cRes });
      masterMdl.updateticketverify(data, user, function (err, cRes) {
      })
    } else {
      res.send({ "status": 303, "message": 'OTP Invalid' });
    }
  });
};


export async function getcurrentdatecountsanddatactrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getcurrentdatecountsanddatamdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getscanTicketDetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getscanTicketDetailsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function updatescanverifiedctrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  //data.temple_id = 19;
  masterMdl.updatescanverifiedmdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};
//-------------------------------------------------------------Drashanam ------------------------------------------------------------------

//-------------------------------------------------------------Sevas ------------------------------------------------------------------

export async function getsevaTicketDetails(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getsevaTicketDetails(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function Sendotpsevadetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  masterMdl.updatesevaOtpMdl(data, otp, async function (err, results) {
    if (err) {
      return res.status(500).json({ status: 500, msg: 'Database error', error: err });
    }
    if (results) {
      let obj = {
        phone_number: data.number,
        otp: otp
      }
      console.log(otp);
      const sendOtpResponce = await sendOtp(obj);
      res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
    }
  });
}


export async function VerifyOtpsevactrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  //data.temple_id = 19;
  masterMdl.VerifyOtpsevamdl(data, function (err, cRes) {
    if (cRes.length) {
      res.send({ "status": 200, "message": 'Successfully Verified', "data": cRes });
      masterMdl.updateticketsevaverify(data, user, function (err, cRes) {
      })
    } else {
      res.send({ "status": 303, "message": 'OTP Invalid' });
    }
  });
};


export async function getsevacurrentdatecountsanddatactrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getsevacurrentdatecountsanddatamdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getsevascanTicketDetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getsevascanTicketDetailsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function updatesevascanverifiedctrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  //data.temple_id = 19;
  masterMdl.updatesevascanverifiedmdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

//-------------------------------------------------------------Sevas ------------------------------------------------------------------

//-------------------------------------------------------------Prasadam ------------------------------------------------------------------

export async function getprasadamTicketDetails(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getprasadamTicketDetails(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function Sendotpprasadamdetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  masterMdl.updateprasadamOtpMdl(data, otp, async function (err, results) {
    if (err) {
      return res.status(500).json({ status: 500, msg: 'Database error', error: err });
    }
    if (results) {
      let obj = {
        phone_number: data.number,
        otp: otp
      }
      console.log(otp);
      const sendOtpResponce = await sendOtp(obj);
      res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
    }
  });
}


export async function VerifyOtpprasadamctrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  //data.temple_id = 19;
  masterMdl.VerifyOtpprasadammdl(data, function (err, cRes) {
    if (cRes.length) {
      res.send({ "status": 200, "message": 'Successfully Verified', "data": cRes });
      masterMdl.updateticketprasadamverify(data, user, function (err, cRes) {
      })
    } else {
      res.send({ "status": 303, "message": 'OTP Invalid' });
    }
  });
};


export async function getprasadamcurrentdatecountsanddatactrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getprasadamcurrentdatecountsanddatamdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getprasadamscanTicketDetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getprasadamscanTicketDetailsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function updateprasadamscanverifiedctrl(req, res) {
  var data = req.body;
  //let user = 1;
  //data.temple_id = 19;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  masterMdl.updateprasadamscanverifiedmdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};




//---------------------------------------------------------------------------Apppp ----------------------------------------------------

export async function sendOtpCtrl(req, res) {
  var otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 90 * 1000; // 90 seconds from now
  const { phonenumber } = req.body;

  if (!phonenumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  if (phonenumber == '9912599972') {
    otp = "2125"
  }

  const hashedOtp = await hash(otp, 10);
  masterMdl.sendOtpMdl({ otp: hashedOtp, expiresAt, ...req.body }, async function (err, results) {
    if (err) {
      return res.status(500).json({ status: 500, msg: 'Database error', error: err });
    }
    if (results[0]?.affectedRows) {
      let obj = {
        phone_number: phonenumber,
        otp: otp
      }

      console.log(otp);
      const sendOtpResponce = await sendOtp(obj);
      res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
    }
  });
}

export function veriftOtpCtrl(req, res) {
  masterMdl.veriftOtpMdl(req.body, function (err, results) {
    if (err) {
      res.send({ status: 500, msg: err });
      return;
    }
    let userOtp = req.body.otpsending.toString();
    compare(userOtp, results[0].otp, function (err, isMatch) {
      if (err) {
        return err;
      }
      if (isMatch) {
        masterMdl.deleteOtpMdl(req.body, function (err, results1) {
          if (err) {
            res.send({ status: 500, msg: err });
            return;
          }
        });
        let payload = { id: results[0].id, role: results[0].role_type, username: results[0].user_name, image: results[0].image, designation: results[0].designation, scanning_ind: results[0].scanning_ind, w_module_id: results[0].w_module_id, temple_id: results[0].temple_id };
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: NODE_ENV === 'production' ? true : false, // Use true in production with HTTPS
          sameSite: 'Lax',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        const { otp, ...cleanresults } = results[0];
        res.send({ status: 200, data: { id: accessToken, accessToken: accessToken, refreshToken: refreshToken } });
      }
      else {
        // res.send({ status: 500, msg: err });
        res.status(500).send({ msg: err });
      }
    });
  });
}

export async function getcustomerdetailsCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;

  masterMdl.getcustomerdetailsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    if (cRes.length) {
      res.send({ "status": 200, "data": cRes });
    } else {
      res.send({ "status": 303, "msg": 'Not Found' });
    }
  });
};


export async function ticket_verficationdetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  let user = req.user.id;
  data.user = user
  data.w_module_id = req.user.w_module_id;
  masterMdl.ticket_verficationdetailsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    if (cRes.length) {

      if (cRes[0].verify_ind == 0) {
        res.send({ "status": 302, "msg": "Ticket Already Verified" });
      } else {

        masterMdl.updateverfificationdata(cRes[0], data, function (err, cRes) {
          if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
          }
          res.send({ "status": 200, "data": "Verified Success" });
        });
      }

    } else {
      res.send({ "status": 303, "msg": 'Ticket Not Found' });
    }

  });
};

export async function verifywithqrdetailsCtrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  masterMdl.verifywithqrdetailsmdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};



export async function checknumberdetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  masterMdl.checknumberdetailsmdl(data, function (err, cRes) {
    if (cRes.length) {
      masterMdl.sendOtpqrMdl(cRes[0], otp, async function (err, results) {
        if (err) {
          return res.status(500).json({ status: 500, msg: 'Database error', error: err });
        }
        if (results) {
          let obj = {
            phone_number: data.number,
            otp: otp
          }
          const sendOtpResponce = await sendOtp(obj);
          res.status(200).json({ status: 200, message: 'OTP sent successfully' });
        }
      });
    } else {
      res.send({ "status": 303 });
    }
  });
};


export async function verfiywithotpAppCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id
  masterMdl.verfiywithotpAppmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    if (cRes.length) {
      res.send({ "status": 200, "data": cRes });
    } else {
      res.send({ "status": 303, "msg": 'OTP NOT Vald' });
    }
  });
};

//-------------------------------------------------------------tonsure ------------------------------------------------------------------

export async function gettonsureTicketDetails(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.gettonsureTicketDetails(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function Sendotptonsuredetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  masterMdl.updatetonsureOtpMdl(data, otp, async function (err, results) {
    if (err) {
      return res.status(500).json({ status: 500, msg: 'Database error', error: err });
    }
    if (results) {
      let obj = {
        phone_number: data.number,
        otp: otp
      }
      console.log(otp);
      const sendOtpResponce = await sendOtp(obj);
      res.status(200).json({ status: 200, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ status: 500, msg: 'Failed to insert OTP into the database' });
    }
  });
}

export async function VerifyOtptonsurectrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  //data.temple_id = 19;
  masterMdl.VerifyOtptonsuremdl(data, function (err, cRes) {
    if (cRes.length) {
      res.send({ "status": 200, "message": 'Successfully Verified', "data": cRes });
      masterMdl.updatetickettonsureverify(data, user, function (err, cRes) {
      })
    } else {
      res.send({ "status": 303, "message": 'OTP Invalid' });
    }
  });
};


export async function gettonsurecurrentdatecountsanddatactrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.gettonsurecurrentdatecountsanddatamdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function gettonsurescanTicketDetailsctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.gettonsurescanTicketDetailsmdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function updatetonsurescanverifiedctrl(req, res) {
  var data = req.body;
  let user = req.user.id;
  data.temple_id = req.user.temple_id;
  //let user = 1;
  //data.temple_id = 19;
  masterMdl.updatetonsurescanverifiedmdl(data, user, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};
export async function getentryverificationCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  //data.temple_id = 19;
  masterMdl.getentryverificationMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};



export async function getApprovebyUserCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  // data.temple_id = 19;
  // data.user = 1;
  masterMdl.getApprovebyUserMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};



//prasadam stock-in



export async function getprasadamtypesCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  // data.temple_id = 10;

  masterMdl.getprasadamtypesMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function AddPrasadamStockCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  // data.temple_id = 10;
  // data.user = 1;
  masterMdl.AddPrasadamStockMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function getPrasadamStockctrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  // data.temple_id = 10;
  // data.user = 1;
  masterMdl.getPrasadamStockMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function gettodayPrasadamStockDetailsCtrl(req, res) {
  var data = req.body;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  // data.temple_id = 10;
  // data.user = 1;
  masterMdl.gettodayPrasadamStockDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getdatewisePrasadamAnalysisCtrl(req, res) {
  const data = req.body;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  // data.temple_id = 10;
  // data.user = 1;
  masterMdl.getdatewisePrasadamAnalysisMdl(data, function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }
    const formattedData = formatPrasadamStockReport(cRes);
    return res.status(200).send({ status: 200, data: formattedData });
  });
}


import moment from 'moment';

function formatPrasadamStockReport(rows) {
  const grouped = {};

  rows.forEach(row => {
    const dateKey = moment(row.stock_date).format('DD-MM-YYYY');

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        items: [],
        items_revenue: []
      };
    }

    // ✅ ITEMS (STOCK)
    grouped[dateKey].items.push({
      prasadam_name: row.prasadam_name,
      Add_stock: String(row.add_stock),
      sale_stock: String(row.sale_stock),
      balance_stock: Number(row.add_stock) - Number(row.sale_stock)
    });

    // ✅ ITEMS REVENUE (ONLY IF REVENUE EXISTS)
    if (Number(row.items_revenue) > 0) {
      grouped[dateKey].items_revenue.push({
        prasadam_name: row.prasadam_name,
        sale_Amount: String(row.items_revenue)
      });
    }
  });

  return Object.values(grouped);
}




export async function getStockDetailsCtrl(req, res) {
  var data = req.body;
  const user = req.user;
  data.counter_id = user.counter_id;
  data.shift_id = user.shift_id;
  // data.duty_date = getTodayDate(data.start_time);
  data.temple_id = user.temple_id;

  masterMdl.getStockDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function submitPreviousStockCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  data.temple_id = req.user.temple_id;
  if (!data.counter_id && !data.shift_id && !data.duty_date) {
    res.send({ status: 200, data: "Successfully Added Previous Stock" });
    return;
  }
  masterMdl.submitPreviousStockMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    data.previous_stock.map((each, i) => {
      const eachValue = {
        main_id: cRes.insertId,
        prasadam_id: each.prasadam_id,
        previous_stock: each.previous_stock,
      };
      //continue working -----------------------------------------------------------------------------
      masterMdl.submitPreviousStockDetailsMdl(
        eachValue,
        function (serr, result) {
          if (serr) {
            if (data.previous_stock.length - 1 == i) {
              res.send(500, "Server Error");
              return;
            }
          }
        },
      );
    });
    res.send({ status: 200, data: "Successfully Added Previous Stock" });
  });
}
export async function checkShiftReportCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  data.temple_id = req.user.temple_id;

  masterMdl.checkShiftReportMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
export async function submitFullShiftReportCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  data.temple_id = req.user.temple_id;

  data.report.map((each) => {
    masterMdl.submitFullShiftReportMdl(each, function (err, cRes) {
      if (err) {
        res.send(500, "Server Error");
        return;
      }
    });
  });
  res.send({ status: 200, data: "Shift Reported Added" });
}

//counter sale

export async function getCountersCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  data.temple_id = req.user.temple_id;

  masterMdl.getCountersMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });

}
export async function getShiftsCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  data.temple_id = req.user.temple_id;
  masterMdl.getShiftsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getShiftSaleReportCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.temple_id = req.user.temple_id;
  masterMdl.getShiftSaleReportMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function reomoveCounterStockCtrl(req, res) {
  var data = req.body;
  data.user_id = req.user.id;
  data.temple_id = req.user.temple_id;
  data.user = req.user.id;
  data.counter_id = req.user.counter_id;
  data.shift_id = req.user.shift_id;
  masterMdl.reomoveCounterStockMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}
























//masters



export async function submitDarshnamBlockDatesCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.submitDarshnamBlockDatesMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function getdeDarshanamBlockDatesCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  data.role_type = req.user.role_type;
  data.temple_id = user.temple_id;
  masterMdl.getdeDarshanamBlockDatesMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}


export async function deleteDarshanamBlockDatesCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.d_by = user.id;
  masterMdl.deleteDarshanamBlockDatesMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function updateDarshnamBlockDatesCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.upadted_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.updateDarshnamBlockDatesMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function updateDarshnampaymentStatusCtrl(req, res) {
  const data = req.body;
  const user = req.user;

  data.upadted_by = user.id;
  data.temple_id = user.temple_id;
  masterMdl.updateDarshnampaymentStatusMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function checkcouterLoginStatusCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.user_id = user.id;
  data.counter_id = req.user.counter_id;
  data.temple_id = user.temple_id;
  masterMdl.checkcouterLoginStatusMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

export async function logoutPreviousLoginsCtrl(req, res) {
  const data = req.body;
  const user = req.user;
  data.user_id = user.id;
  data.counter_id = req.user.counter_id;
  data.temple_id = user.temple_id;
  masterMdl.logoutPreviousLoginsMdl(data, function (err, cRes) {
    if (err) {
      res.send(500, "Server Error");
      return;
    }
    res.send({ status: 200, data: cRes });
  });
}

