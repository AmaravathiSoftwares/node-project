import * as masterMdl from '../models/kpis2Models.js';
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




export async function getddnsArachakReportCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    masterMdl.getddnsArachakReportMdl(data, user, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        let resutls = [];
        if (cRes.length) {
            resutls = cRes.map(res => ({
                ...res,
                aadhaar_number_org: decrypt(res.aadhaar_number).decrypted,
                aadhaar_number: decrypt(res.aadhaar_number).maskedAadhar,
            }))
        }

        res.send({ "status": 200, "data": resutls });
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
    let user = req.user;
    masterMdl.getddrfsArachakReportMdl(data, user, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        let resutls = [];
        if (cRes.length) {
            resutls = cRes.map(res => ({
                ...res,
                aadhaar_number_org: decrypt(res.aadhaar_number).decrypted,
                aadhaar_number: decrypt(res.aadhaar_number).maskedAadhar,
            }))
        };
        res.send({ "status": 200, "data": resutls });
    });
};

export async function getAuevsArachakReportCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    masterMdl.getAuevsArachakReportMdl(data, user, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        let resutls = [];
        // if (cRes.length) {
        //     resutls = cRes.map(res => ({
        //         ...res,
        //         aadhaar_number_org: decrypt(res.aadhaar_number).decrypted,
        //         aadhaar_number: decrypt(res.aadhaar_number).maskedAadhar,
        //     }))
        // };
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
    // console.log(data)
    const modified_data=data.archakas.map((each) => ({
    ...each,
    aadhaar_number:encrypt(each.aadhaar_number),
    entry_by:user.id,
    district_id:data.district_id,
    mandal_id:data.mandal_id,
    village_id:data.village_id,
    temple_nm:data.temple_nm,
    temple_name:data.temple_name,
  }));
    
    masterMdl.submitAuevsArackaDetailsMdl(modified_data, function (err, cRes) {
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

export async function getDistrictsCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.getDistrictsMdl(data, user, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export async function getUlbsCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.getUlbsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export async function getvillagesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.getvillagesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export async function getTemplesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.getTemplesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export async function checkDuplicatesCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.checkDuplicatesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        let resutls = [];
        if (cRes.length) {
            resutls = cRes.map(res => ({
                ...res,
                aadhaar_number_org: decrypt(res.aadhaar_number).decrypted,
                aadhaar_number: decrypt(res.aadhaar_number).maskedAadhar,
            }))
        };
        res.send({ status: 200, data: resutls });
    });
}

export async function TrustBoardsCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.TrustBoardsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
      
        res.send({ status: 200, data: cRes });
    });
}

export async function submitCgfCDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitCgfCDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getcgfCdataCtrl(req, res) {
    const { limit = 50, offset = 0 } = req.body;
    var data = req.body;
    let user = req.user;

    console.log('Request params:', { limit, offset });

    masterMdl.getcgfCdataMdl(limit, offset, data, user, function (err, cRes) {
        if (err) {
            res.send({ status: 500, msg: "Server Error" });
            return;
        }
        const response = {
            status: 200,
            data: cRes.data,        // paginated records
            totalCount: cRes.totalCount // total number of records
        };
        res.send(response);
    });
}

export async function submitCgfrDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitCgfrDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getcgfRdataCtrl(req, res) {
    const { limit = 50, offset = 0 } = req.body;
    var data = req.body;
    let user = req.user;

    console.log('Request params:', { limit, offset });

    masterMdl.getcgfRdataMdl(limit, offset, data, user, function (err, cRes) {
        if (err) {
            res.send({ status: 500, msg: "Server Error" });
            return;
        }
        const response = {
            status: 200,
            data: cRes.data,        // paginated records
            totalCount: cRes.totalCount // total number of records
        };
        res.send(response);
    });
}

export async function submitAnnaprasadamDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.submitAnnaprasadamDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};

export async function getAnnapradasamdataCtrl(req, res) {
    console.log(req,585);
    const { limit = 50, offset = 0 } = req.body;
     var data = req.body;
    let user = req.user;
    console.log('Request params:', { limit, offset });
    masterMdl.getAnnapradasamdataMdl(limit, offset,data,user, function (err, cRes) {
        if (err) {
            res.send({ status: 500, msg: "Server Error" });
            return;
        }
        const response = {
            status: 200,
            data: cRes.data,        // paginated records
            totalCount: cRes.totalCount // total number of records
        };
        res.send(response);
    });
}

export async function updateCgfCDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateCgfCDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteCgfcdataCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteCgfcdataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function updateCgfrDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateCgfrDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deletecgfrDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletecgfrDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function updateAnnaprasadamDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateAnnaprasadamDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function deleteannapradsadamDetailsCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteannapradsadamDetailsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};



