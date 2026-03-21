import * as masterMdl from '../models/publicationsModels.js';


export async function publicationstotalcountCtrl(req, res) {
    masterMdl.publicationstotalcountMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getPublicationsdataCtrl(req, res) {
    masterMdl.getPublicationsdataMdl( function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}