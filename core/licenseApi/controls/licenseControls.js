import * as masterMdl from '../models/licenseModels.js';


export async function submitLicenseDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  console.log(data, "formData");
  masterMdl.submitLicenseDetailsMdl(data, function (err, cRes) {
    if (err) {
      res.send({ "status": 500, "msg": "Server Error" });
      return;
    }
    res.send({ "status": 200, "data": cRes });
  })
}

export async function getLicensedataCtrl(req, res) {
  const { limit = 50, offset = 0 } = req.body;
  var data = req.body;
  let user = req.user;


  console.log('Request params:', { limit, offset });

  masterMdl.getLicensedataMdl(limit, offset, data, user, function (err, cRes) {
    if (err) {
      res.send({ status: 500, msg: "Server Error" });
      return;
    }
    const response = {
      status: 200,
      data: cRes.data,        // paginated records
      totalCount: cRes.totalCount // total number of records
    };
    res.send(response);
  });
}

export async function updateLicenseDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateLicenseDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function deleteshopsandbuildingsDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteshopsandbuildingsDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

