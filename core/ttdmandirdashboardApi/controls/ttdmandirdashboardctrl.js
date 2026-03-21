import * as masterMdl from '../models/ttdmandirdashboardmodel.js';
import fs from "fs";

import path from "path"

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


export async function getmandals(req, res) {
  var data = req.body;
  masterMdl.getmandals(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function getvillagesbymandalid(req, res) {
  var data = req.body;
  masterMdl.getvillagesbymandalid(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getconstituenciesbydistrictid(req, res) {
  var data = req.body;
  masterMdl.getconstituenciesbydistrictid(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function submitttdmandirrequest(req, res) {
  let data = req.body;
  masterMdl.submitttdmandirrequest(data, function (err, cRes) {
    if (err) {
      return res.send({ status: 500, msg: "Server Error" });
    }
    const lastInsertId = cRes.insertId;
    if (data.other_temples_details.length == 0) {
      return res.send({ status: 200, msg: "Request submitted successfully"});
    } else {
      const templesNearby = data.other_temples_details;
      masterMdl.submitotherstemplesnearby(lastInsertId, templesNearby, function (err, childRes) {
        if (err) {
          return res.send({ status: 500, msg: "Server Error" });
        }
        return res.send({
          status: 200, msg: "Request submitted successfully", request_id: lastInsertId, nearby_temples_inserted: childRes
        });
      });
    }
  });
}

export async function getRequestsformandir(req, res) {
  masterMdl.getRequestsformandir(function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getdistrictRequestscountformandir(req, res) {
  let data = req.body;
  masterMdl.getdistrictRequestscountformandir(function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getdistrictRequestsformandir(req, res) {
  let data = req.body;
  masterMdl.getdistrictRequestsformandir(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function editttdmandirrequest(req, res) {


  const data = req.body;
  let user = req.user.id;
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
  
  // const basePath = "F:/images";

  // const baseUrl = "F:/images/";

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
  masterMdl.editttdmandirrequest(data, user ,  function (err, cRes) {
    if (err) {
      return res.status(500).send({ status: 500, msg: "Server Error" });
    }
    const lastInsertId = cRes.insertId;
    return res.status(200).send({ status: 200, msg: "Request submitted successfully", request_id: lastInsertId, });

  });
}


export async function getdistrictsdataCtrl(req, res) {
  let data = req.body;
  // console.log('data');
  
  masterMdl.getdistrictsdataMdl(function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    // console.log(cRes);
    
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getallditrictsbmdataCtrl(req, res) {
  let data = req.body;
  // console.log('data');
  
  masterMdl.getallditrictsbmdataMdl(function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    // console.log(cRes);
    
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getbmdataCountsCtrl(req, res) {
  let data = req.body;
  // console.log('data');
  
  masterMdl.getbmdataCountsMdl(function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    // console.log(cRes);
    
    res.send({ "status": 200, "data": cRes });
  });
};


export async function getconstuencydataCtrl(req, res) {
  let data = req.body;
  masterMdl.getconstuencydataMdl(function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getttdbmconstdataCtrl(req, res) {
  let data = req.body;
  masterMdl.getttdbmconstdataMdl(data,function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};



// export async function getbmdataCountsCtrl(req, res) {
//   let data = req.body;
//   masterMdl.getbmdataCountsMdl(function (err, cRes) {
//     if (err) {
//       res.send({ "status": 500, "msg": "Server Error" });
//       return;
//     }
//     res.send({ "status": 200, "data": cRes });
//   });
// };

export async function getcardmodeldataCtrl(req, res) {
  let data = req.body;
  masterMdl.getcardmodeldataMdl(data,function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


export async function getconsultancywisereportdataCtrl(req, res) {
  let data = req.body;
  masterMdl.getconsultancywisereportdataMdl(data,function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getcarddatabyconstituencyCtrl(req, res) {
  let data = req.body;
  masterMdl.getcarddatabyconstituencyMdl(data,function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getmandalwisereportdataCtrl(req, res) {
  let data = req.body;
  masterMdl.getmandalwisereportdataMdl(data,function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getcarddatabymandalCtrl(req, res) {
  let data = req.body;
  masterMdl.getcarddatabymandalMdl(data,function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getindividualwisereportdataCtrl(req, res) {
  let data = req.body;
  masterMdl.getindividualwisereportdataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getindividualcarddatabymandalCtrl(req, res) {
  let data = req.body;
  masterMdl.getindividualcarddatabymandalMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getdistrictdropdowndataCtrl(req, res) {
  let data = req.body;
  masterMdl.getdistrictdropdowndataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getconstituencydatabydistrictCtrl(req, res) {
  let data = req.body;
  masterMdl.getconstituencydatabydistrictMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getconstituencydropdownCtrl(req, res) {
  let data = req.body;
  masterMdl.getconstituencydropdownMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getmandalstatusdropdownCtrl(req, res) {
  let data = req.body;
  masterMdl.getmandalstatusdropdownMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getmandaldropdowndataCtrl(req, res) {
  let data = req.body;
  masterMdl.getmandaldropdowndataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getallconstituencystatusdataCtrl(req, res) {
  let data = req.body;
  masterMdl.getallconstituencystatusdataMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function sanctionamountCtrl(req, res) {
  let data = req.body;
  data.user_id = req.user.id
  masterMdl.sanctionamountMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function getsanctionedamountlistCtrl(req, res) {
  let data = req.body;
  masterMdl.getsanctionedamountlistMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};

export async function postsanctionedstagesCtrl(req, res) {
  let data = req.body;
  data.user_id = req.user.id

  for (let i = 1; i <= 4; i++) {
    const key = `img${i}`;
    if (data[key]) {
      data[key] = convertBase64ToImage(data[key]);
    }
  }

  masterMdl.postsanctionedstagesMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  });
};


function convertBase64ToImage(image) {
  if (image) {
    let image_url = image;
    let imgcnt = 0;
    let array = image_url.split(',');
    let datetimestamp = Date.now();
    let random_number = Math.floor(100000 + Math.random() * 900000);
    let unicnumber = random_number + '' + datetimestamp;
    let base64Data = array[1];
    const fileName = `${unicnumber}.png`;
    const imagePath = path.join("/mnt/uploads/ttd_sanctioned_images", fileName);

    fs.writeFileSync(imagePath, base64Data, "base64");
    return `https://endowmentsinfo.ap.gov.in/uploads/ttd_sanctioned_images/${fileName}`;
  } else {
    return;
  }
}
