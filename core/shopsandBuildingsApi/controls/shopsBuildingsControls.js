import * as masterMdl from '../models/shopsBuildingsModels.js';


export async function submitShopsDetailsCtrl(req, res) {
  const data = req.body;
  let user = req.user;
  data.entry_by = user.id;
  console.log(data, "formData");
  masterMdl.submitShopsDetailsMdl(data, function (err, cRes) {
    if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
})
}

export async function getshopsandbuildingsdataCtrl(req, res) {
  const { limit = 50, offset = 0 } = req.body; 
   var data = req.body;
    let user = req.user;


  console.log('Request params:', { limit, offset }); 

  masterMdl.getshopsandbuildingsdataMdl(limit, offset,data,user, function (err, cRes) {
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

export async function updateShopsDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateShopsDetailsMdl(data, function (err, cRes) {
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
