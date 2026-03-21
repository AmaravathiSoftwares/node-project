import * as masterMdl from '../models/annaprasadamModels.js';


export async function annadhanamtotalcountCtrl(req, res) {
    masterMdl.annadhanamtotalcountMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getannaprasadamdataCtrl(req, res) {
    masterMdl.getannaprasadamdataMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}