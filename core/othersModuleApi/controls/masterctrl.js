import * as masterMdl from '../models/mastermodel.js';
import jwt from 'jsonwebtoken';
import { smsotp, verifysmsotp } from '../../../utils/mepmasmsutil.js';
import axios from "axios";
import { sendSmsOtpAmvtServer, verifySmsOtpAmvtServer } from '../../../utils/amvtSmsUtil.js';
const EXPIRY_MINUTES = 1;
const storedData = new Map();

export function addmasteruserpersmissionsCtrl(req, res) {
    const { headers } = req;
    // console.log(headers);
    // const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    // if (!auth) {
    //     return res.status(401).send({ status: 401, msg: "Unauthorized" });
    // }

    // const jwttoken = jwt.verify(auth, 'Amvt@1234');
    console.log(req.body, 13);
    const { role_type } = req.body;
    console.log(role_type, 15);
    let modulesAndSubModules = []
    req.body.allow.forEach((item) => {
        modulesAndSubModules.push({ moduleId: item.moduleId, subModuleId: item.subModuleId });
    });
    masterMdl.addmasteruserpersmissionsMdl(role_type, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        const list_of_users = [];
        results.forEach((item) => {
            list_of_users.push(item.id);
        });
        console.log(list_of_users, 28);
        console.log(modulesAndSubModules, 29);
        let finaldata = [];
        for (let data of list_of_users) {
            req.body.allow.forEach((item) => {
                finaldata.push({ id: data, moduleId: item.moduleId, subModuleId: item.subModuleId });
            });
        }
        console.log(finaldata, 36);
        masterMdl.addmasteruserpersmissionsMdl2(role_type, list_of_users, modulesAndSubModules,finaldata, function (err, results1) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            console.log(results1, 824);
            return res.status(200).send({ status: 200, data: results1 });
        });
    });
}

export function fetchexistingMasterModulesBasedOnRoleCtrl(req, res) {
    const { headers } = req;
    // console.log(headers);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    const { role_type } = req.body;
    masterMdl.fetchexistingMasterModulesBasedOnRoleMdl(role_type, function (err, results) {
        if (err) {
            return res.status(500).send({ status: 500, msg: err });
        }
        return res.status(200).send({ status: 200, data: results });
    });
}
