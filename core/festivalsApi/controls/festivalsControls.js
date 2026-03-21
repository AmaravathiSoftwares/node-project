import * as masterMdl from '../models/festivalsModels.js';


export async function getjccaderdataCtrl(req, res) {
    masterMdl.getjccaderdataMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getdccaderdataCtrl(req, res) {
    masterMdl.getdccaderdataMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getstateleveldataCtrl(req, res) {
    masterMdl.getstateleveldataMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}