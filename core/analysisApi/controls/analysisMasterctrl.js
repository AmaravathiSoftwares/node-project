import * as masterMdl from '../models/analysisModels.js';
import fs from 'fs';

export async function getastsevendayscrmdataCtrl(req, res) {
    var data = req.body;
    masterMdl.getastsevendayscrmdataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getcrmweekdaysgraphCtrl(req, res) {
    masterMdl.getcrmweekdaysgraphMdl(function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function empDashboardCountsCtrl(req, res) {
    masterMdl.empDashboardCountsMdl(function (err, empArray) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        masterMdl.empDashboardTopFourMdl(function (err, results1) {
            if (err) {
                res.send(500, "Server Error");
                return;
            }
            res.send({ "status": 200, "data": empArray, 'top_four_array': results1 });
        });
    });
};
export async function getcarwisepaymentCtrl(req, res) {
    masterMdl.getcarwisepaymentformMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export async function getalldatawiseCtrl(req, res) {
    masterMdl.getalldatawiseformMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export async function gettotalcountsdataCtrl(req, res) {
    var mind = req.params.mind;
    console.log(mind);
    masterMdl.gettotalcountsdataMdl(mind, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export async function getweblogsdataCtrl(req, res) {
    masterMdl.getweblogsdataMdl(function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getlastsevendaysbookingllistCtrl(req, res) {
    masterMdl.getlastsevendaysbookingllistMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export async function changeComersCtrl(req, res) {
    var ind = req.params.ind;
    masterMdl.changeComersMdl(ind, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export async function getToptenissusesCtrl(req, res) {
    masterMdl.getToptenissusesMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

 export async function toatlcntsordersCtrl(req, res) {
    masterMdl.toatlcntsordersMdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}