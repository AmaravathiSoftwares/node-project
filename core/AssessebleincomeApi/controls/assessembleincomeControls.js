import * as masterMdl from '../models/assessebleincomeModels.js';

// sankar code 
export async function assessembleincomecountCtrl(req, res) {
    masterMdl.assessembleincomecountMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getAssembleIncomeCtrl(req, res) {
  const { limit = 50, offset = 0, incomecategory = null } = req.body; 

  console.log('Request params:', { limit, offset, incomecategory }); 

  masterMdl.getAssembleIncomeMdl(limit, offset, incomecategory, function (err, cRes) {
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