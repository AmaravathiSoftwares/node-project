import * as analysisMdl from "../models/analysis.model.js";

export function getanalysisdataCtrl(req, res) {
    try {
        analysisMdl.getanalysisdataMdl(function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results[0] });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: err });
    }
}

export function getlast7daysCtrl(req, res) {
    try {
        analysisMdl.getlast7daysMdl(function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results});
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: err });
    }
}

export function getlastalldaysCtrl(req, res) {
    try {
        analysisMdl.getlastalldaysMdl(function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results});
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: err });
    }
}