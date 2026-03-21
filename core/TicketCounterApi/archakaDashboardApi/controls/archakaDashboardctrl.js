import jwt from 'jsonwebtoken';
import { hash, compare } from "bcrypt";
import request from 'request';   //for otp service
import * as archakaDashboardMdl from "../models/archakaDashboardmodel.js"
import unirest from "unirest";
import { smsotp, verifysmsotp } from '../../../utils/mepmasmsutil.js';
import { createAccessToken, createRefreshToken, validaterefreshToken } from '../../../utils/jwtUtils.js';
import { sendOtp } from "../../../utils/watiSmsUtil.js";
import envs from '../../../config.js';
import fs from 'fs';
const otpStore = new Map();
const { NODE_ENV } = envs;




// export function getUserprofileDataCtrl(req, res) {
//     let user = req.user;
//     archakaDashboardMdl.getUserprofileDataMdl(user, function (err, results) {
//         if (err) {
//             res.send({ status: 500, msg: err });
//             return;
//         }
//         res.send({ status: 200, data: results });
//     });
// }

export function getthecandidatesreportdataCtrl(req, res) {
    // let user = req.user;
    let data = req.body;
    console.log(data, '...........')

    archakaDashboardMdl.getthecandidatesreportdataMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

export function gettheapplicationsreportdataCtrl(req, res) {
    let data = req.body;
    console.log(data, '...........')
    let user = req.user;
    archakaDashboardMdl.gettheapplicationsreportdataMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}



export function gettheuserapplicationsCtrl(req, res) {
    let data = req.body;
    // let user = req.user;
    // data.user=user;
    archakaDashboardMdl.gettheuserapplicationsMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


export function getdashboardcandidatescountCtrl(req, res) {
    let data = req.body;
    // let user = req.user;
    // data.user=user;
    archakaDashboardMdl.getdashboardcandidatescountMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


export function getdashboardapplicationscountCtrl(req, res) {
    let data = req.body;
    // let user = req.user;
    // data.user=user;
    archakaDashboardMdl.getdashboardapplicationscountMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

export async function getReportImagesCtrl(req, res) {
    const data = req.body;
    console.log(data)
    archakaDashboardMdl.getReportImagesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}
export async function getPostsMastersCtrl(req, res) {
    const data = req.body;
    console.log(data)
    archakaDashboardMdl.getPostsMastersMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function getPositionMastersCtrl(req, res) {
    const data = req.body;
    console.log(data)
    archakaDashboardMdl.getPositionMastersMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function getcategorywiseApplicationsCtrl(req, res) {
    const data = req.body;
    console.log(data)
    archakaDashboardMdl.getcategorywiseApplicationsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function postwiseapplicationsCountsCtrl(req, res) {
    const data = req.body;
    console.log(data)
    archakaDashboardMdl.postwiseapplicationsCountsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function postwiseapplicationsidCtrl(req, res) {
    const data = req.body;
    console.log(data)
    archakaDashboardMdl.postwiseapplicationsidMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}


//Analysis Page
export function getthedashboardcandidatesreportCtrl(req, res) {
    // let user = req.user;
    let data = req.body;
    console.log(data, '...........')

    archakaDashboardMdl.getthedashboardcandidatesreportMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

export function getthedashboardapplicationreportCtrl(req, res) {
    // let user = req.user;
    let data = req.body;
    console.log(data, '...........')

    archakaDashboardMdl.getthedashboardapplicationreportMdl(data, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

