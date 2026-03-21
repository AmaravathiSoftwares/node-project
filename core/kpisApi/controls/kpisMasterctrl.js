import * as masterMdl from '../models/kpisModels.js';
import fs from 'fs';

// export async function getDdnsMonthlyDataReportCtrl(req, res) {
//     var data = req.body;
//     masterMdl.getDdnsMonthlyDataReportMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ "status": 200, "data": cRes });
//     });
// };

// export async function getDdrfMonthlyDataReportCtrl(req, res) {
//     var data = req.body;
//     masterMdl.getDdrfMonthlyDataReportMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ "status": 200, "data": cRes });
//     });
// };
// export async function getAuevcsMonthlyDataReportCtrl(req, res) {
//     var data = req.body;
//     masterMdl.getAuevcsMonthlyDataReportMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ "status": 200, "data": cRes });
//     });
// };
// export async function getengineerworksDataReportCtrl(req, res) {
//     var data = req.body;
//     masterMdl.getengineerworksDataReportMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ "status": 200, "data": cRes });
//     });
// };
// export async function getCgfDataReportCtrl(req, res) {
//     var data = req.body;
//     masterMdl.getCgfDataReportMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ "status": 200, "data": cRes });
//     });
// };
// export async function getOnlineServiceReportCtrl(req, res) {
//     var data = req.body;
//     masterMdl.getOnlineServiceReportMdl(data, function (err, cRes) {
//         if (err) {
//             res.send({ "status": 500, "msg": "Server Error" });
//             return;
//         }
//         res.send({ "status": 200, "data": cRes });
//     });
// };




export async function getddnsArachakReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getddnsArachakReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getDistrictReportDataCtrl(req, res) {
    var data = req.body;
    masterMdl.getDistrictReportDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function submitArackaDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitArackaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getddrfsArachakReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getddrfsArachakReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getAuevsArachakReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getAuevsArachakReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getEngneeringWorksReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getEngneeringWorksReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getOnlineServiceTemplesReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getOnlineServiceTemplesReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function getCCGFReportCtrl(req, res) {
    var data = req.body;
    masterMdl.getCCGFReportMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function updateArackaDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateArackaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteddnsArachakaDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteddnsArachakaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

//DDRF Details

export async function updateDdrfArackaDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateDdrfArackaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function submitDDrfArackaDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitDDrfArackaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteddrfArachakaDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteddrfArachakaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
//Aueves Details
export async function updateAuevsArackaDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateAuevsArackaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function submitAuevsArackaDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitAuevsArackaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteAuevsArachakaDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteAuevsArachakaDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

//CCGF Details
export async function updateCCGFDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateCCGFDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function submitCCGFDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitCCGFDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteCCGFDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteCCGFDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

//EngneeringWorksDetails 
export async function updateEngneeringWorksDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateEngneeringWorksDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function submitEngneeringWorksDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitEngneeringWorksDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteEngneeringWorksDetailsCtrl(req, res) {
    var data = req.body;
     let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteEngneeringWorksDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
// online temple data
export async function createonlineTempleDataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createonlineTempleDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}


export async function updateonlineTempleDataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateonlineTempleDataMdl(data, function (err, cRes) {
        if (err) {
             res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

export async function deleteonlineTempleDataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteonlineTempleDataMdl(data, function (err, cRes) {
        if (err) {
             res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}