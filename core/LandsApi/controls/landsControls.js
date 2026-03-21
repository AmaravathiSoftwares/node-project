import * as masterMdl from '../models/landsModel.js';
import fs from 'fs';

export async function getLandsInfoDistrictWiseReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getLandsInfoDistrictWiseReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getLandDetailsDistrictWiseReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getLandDetailsDistrictWiseReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};