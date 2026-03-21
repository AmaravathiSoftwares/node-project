import * as masterMdl from '../models/fdrModels.js';


// sankar code 
export async function fdrtotalcountCtrl(req, res) {
    masterMdl.fdrtotalcountMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getAllTasksCtrl(req, res) {
  const { limit = 50, offset = 0, fdpurpose = null } = req.body; 

  console.log('Request params:', { limit, offset, fdpurpose }); 

  masterMdl.getAllTasksMdl(limit, offset, fdpurpose, function (err, cRes) {
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