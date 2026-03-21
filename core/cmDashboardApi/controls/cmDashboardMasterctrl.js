import * as masterMdl from '../models/cmDashboardModels.js';
import fs from 'fs';
import { encrypt, decrypt } from "../../../utils/cryptoUtils.js"
export async function getDdnsMonthlyDataReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getDdnsMonthlyDataReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getDdrfMonthlyDataReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getDdrfMonthlyDataReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getAuevcsMonthlyDataReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getAuevcsMonthlyDataReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getengineerworksDataReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getengineerworksDataReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getCgfDataReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getCgfDataReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getOnlineServiceReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getOnlineServiceReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getArchakaReportCtrl(req, res) {
    var data = req.body;
    let reportType;
    if (data.reportType == 'DDNS') {
        reportType = 'DDNS';
    } else if (data.reportType == 'DDRF') {
        reportType = 'DDRF';
    } else if (data.reportType == 'AUVS') {
        reportType = 'AUVS';
    } else {
        res.status(400).send({
            status: 400,
            message: 'Unknown parameter'
        });
    }


    masterMdl.getArchakaReportMdl(reportType, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        let resutls = [];
        if (data.reportType == 'AUVS') {
            resutls = cRes;
        } else {
            if (cRes.length) {
                resutls = cRes.map(res => ({
                    ...res,
                    aadhaar_number: decrypt(res.aadhaar_number).decrypted,
                }))
            }
        }

        res.send({ "status": 200, "data": resutls });
    });
};
//
export async function getDdnsMonthlyDataReportDashboardCtrl(req, res) {
    var data = req.body;
    masterMdl.getDdnsMonthlyDataReportDashboardMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getDdrfMonthlyDataReportDashboardCtrl(req, res) {
    var data = req.body;
    masterMdl.getDdrfMonthlyDataReportDashboardMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getAuevcsMonthlyDataReportDashboardCtrl(req, res) {
    var data = req.body;
    masterMdl.getAuevcsMonthlyDataReportDashboardMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getOnlineServiceReportDashboardCtrl(req, res) {
    var data = req.body;
    masterMdl.getOnlineServiceReportDashboardMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};