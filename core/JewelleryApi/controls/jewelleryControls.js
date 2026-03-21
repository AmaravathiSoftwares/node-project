import * as masterMdl from '../models/jewelleryModels.js';


// sankar code 
export async function jewellerytotalcountCtrl(req, res) {
    masterMdl.jewellerytotalcountMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getJewelleryCtrl(req, res) {
  const { limit = 50, offset = 0, jewellerycategory = null } = req.body; 

  console.log('Request params:', { limit, offset, jewellerycategory }); 

  masterMdl.getJewelleryMdl(limit, offset, jewellerycategory, function (err, cRes) {
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