import * as masterMdl from '../models/archakaModel.js';
import fs from 'fs';

export async function getAllDataCtrl(req, res) {
    var data = req.body;
    masterMdl.getAllDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getTableFilterDataCtrl(req, res) {
    var data = req.body;
    masterMdl.getTableFilterDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getTableDataCtrl(req, res) {
    var data = req.body;
    masterMdl.getTableDataMdl(data, function (err, cRes) {
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

// Analysis controllers
export async function getweekdatawiseCtrl(req, res) {
    var data = req.body;
    masterMdl.getweekdatawiseMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};


export async function getusersanalysisDataCtrl(req, res) {
    var data = req.body;
    masterMdl.getusersanalysisDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getexamanalysisCtrl(req, res) {
    var data = req.body;
    masterMdl.getexamanalysisMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getagewiseanalysisCtrl(req, res) {
    var data = req.body;
    masterMdl.getagewiseanalysisMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getdisitwiseFuntionCtrl(req, res) {
    var data = req.body;
    masterMdl.getdisitwiseFuntionMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getcentdisitwiseFuntionCtrl(req, res) {
    var data = req.body;
    masterMdl.getcentdisitwiseFuntionMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getlanguagessCtrl(req, res) {
    var data = req.body;
    masterMdl.getlanguagessMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};


export async function accountwiseanalysisCtrl(req, res) {
    var data = req.body;
    masterMdl.accountwiseanalysisMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};