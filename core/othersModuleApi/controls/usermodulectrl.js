import * as usermoduleMdl from "../models/usermodulemodel.js"
import jwt from 'jsonwebtoken';
// import {decodeRefreshToken} from "../../../utils/jwtUtils.js"
import moment from "moment-timezone";


function getTodayDate(passedTime) {
    const IST = "Asia/Kolkata";  // Define timezone
    let now = moment().tz(IST);  // Get the current moment in IST
     const hours = now.hour(); // moment hour()
    const referenceTime = "12:00:00";  // Define the reference time (12:00:00)

    if(hours >= 0 && hours < 12){
    // Parse passedTime and referenceTime as moment objects
    const passedMoment = moment(passedTime, "HH:mm:ss", true);  // 'true' enforces strict parsing
    const referenceMoment = moment(referenceTime, "HH:mm:ss", true);  // 'true' enforces strict parsing

    // Check if the passed time is valid
    if (!passedMoment.isValid()) {
        throw new Error(`Invalid time format: ${passedTime}`);
    }

    // If passed time is after 12:00:00, use the previous date
    if (passedMoment.isAfter(referenceMoment)) {
        now = now.subtract(1, "day");  // Subtract one day if time is after 12:00:00
    }
}
    return now.format("YYYY-MM-DD");  // Return the date in 'YYYY-MM-DD' format
}



export function getStationMasterCtrl(req, res) {
    const templePostingdata = req.body;
    usermoduleMdl.getStationMasterMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}



export function getMainModulesdataCtrl(req, res) {
    const templePostingdata = [];
    usermoduleMdl.getMainModulesdataMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


export function getmainsubmodulesdataCtrl(req, res) {
    const templePostingdata = [];
    let children = [];
    usermoduleMdl.getmainsubmodulesdataMdl(templePostingdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        // //console.log(results);
        const result1 = Object.values(
            results.reduce((acc, item) => {
                const {
                    moduleId,
                    displayName,
                    iconName,
                    route,
                    SubModuleID,
                    displayName1,
                    iconName1,
                    route1,
                } = item;

                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        moduleId,
                        displayName,
                        // iconName,
                        // route,
                        children: [],
                    };
                }

                if (SubModuleID) {
                    acc[moduleId].children.push({
                        SubModuleID,
                        displayName: displayName1,
                        // iconName: iconName1,
                        // route: route1,
                    });
                }

                return acc;
            }, {})
        ).sort((a, b) => a.moduleId - b.moduleId); // Sort by moduleId in ascending order

        //   //console.log(result1);

        results = result1;
        //   //console.log(result);
        res.send({ status: 200, data: results });
    });
}

export function getcurrentpermissionmodulesCtrl(req, res) {
    const { id } = req.user;
    try {
        // const jwttoken = jwt.verify(auth, 'Amvt@1234');
        //console.log(jwttoken);
        const userId = id;
        usermoduleMdl.getuserpermissionmodulesMdl(userId, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}


export function getUserReportCtrl(req, res) {
    console.log(req.user, 446);
    const { id, role_type } = req.user;
    let obj = {
        userId: id,
        role_type: role_type
    }

    let templePostingdata = []
    usermoduleMdl.getUserReportMdl(obj, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

export function getUserReportByIdCtrl(req, res) {
    const userId = req.params.id;
    usermoduleMdl.getUserReportByIdMdl(userId, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }
        res.send({ status: 200, data: results });
    });
};

export function getRoleCtrl(req, res) {
    const { id } = req.user;
    const userId = id;
    const data = req.body;
    usermoduleMdl.getRoleMdl(userId, function (err, results) {
        if (err) {
            //console.log(jwttoken)
            res.send({ status: 500, msg: err });
            return;
        }
        if([null,undefined,"",'null','undefined'].includes(data.start_time)){
            res.send({ status: 200, data: results});
            return
        }else{
            res.send({ status: 200, data: results,date:data.start_time?getTodayDate(data.start_time) : "" });
        }
    });
}






export function addrolebasedmodulesCtrl(req, res) {
    const { headers } = req;
    const { id } = req.user;
    if (req.file) {
        const fileUrl = `${req.protocol}://local:2578/images/${req.file.filename}`;
    }
    // const { role } = req.body;
    // let usersdata = [req.body.name, req.body.number, req.body.role, req.body.designation, req.body.dept_id, req.body.district_id, req.body.mandal_id, req.body.village_id, req.body.temple_id];
    // usersdata.push(id);

    const { role } = req.body;
    const templeId =
        role == 10 || role == 11
            ? req.body.e_temple_id
            : req.body.temple_id;
    const districtIds =
        role == 10 || role == 11
            ? req.body.e_district_id
            : req.body.district_id;
    let usersdata = [req.body.name, req.body.number, req.body.role, req.body.designation, req.body.dept_id, 
        districtIds, req.body.mandal_id, req.body.village_id, templeId, id];


    usermoduleMdl.addrolebasedmodulesMdl(role, usersdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }

        if (results) {

            //  res.send({ status: 200, data: results });
            res.status(200).send({ status: 200, data: results })
        }
        else {

            return res.status(500).send({ status: 500, msg: "Internal Server Error", error: err });
        }

    });


}

export function addrolebasedmodulesformCtrl(req, res) {
    const { headers } = req;
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    const { role } = req.body;
    let usersdata = [];
    Object.values(req.body).forEach(value => {
        if (value == undefined || value == "" || value == '') {
            usersdata.push("NULL");
        }
        else {
            usersdata.push(value);
        }
    });
    usersdata.push(jwttoken.id);
    //console.log(req.body.role, 937);
    if (req.body.role == '1') {
        usermoduleMdl.addrolebasedmodulesAdminMdl(role, usersdata, function (err, results) {
            if (err) {
                res.send({ status: 500, msg: err });
                return;
            }
            res.send({ status: 200, data: results });
        });
    }
    else {

        usermoduleMdl.addrolebasedmodulesMdl(role, usersdata, function (err, results) {
            if (err) {
                res.send({ status: 500, msg: err });
                return;
            }

            if (results) {

                //  res.send({ status: 200, data: results });
                res.status(200).send({ status: 200, data: results })
            }
            else {

                return res.status(500).send({ status: 500, msg: "Internal Server Error", error: err });
            }

        });
    }

}

export function updaterolebasedmodulesCtrl(req, res) {
    // const { headers } = req;
    // //console.log(headers, 1205);
    // const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    // if (!auth) {
    //     return res.status(401).send({ status: 401, msg: "Unauthorized" });
    // }
    // const userId = req.params.id;

    let user_id = req.body.data.user_id;

    // let usersdata = [req.body.data.name, req.body.data.number, req.body.data.role, req.body.data.designation, req.body.data.dept_id, req.body.data.district_id, req.body.data.mandal_id, req.body.data.village_id, req.body.data.temple_id, req.body.data.user_id];

    let role_t = req.body.data.role;
    // SAFE NORMALIZATION - Fix here!
    const safeValue = (val) => {
        if (val === undefined || val === null || val === '' || val === 'null' || val==[]) {
            return null;
        }
        return val;
    };

    const safeDistrictIds = safeValue(
        (role_t == 10 || role_t == 11) ? req.body.data.e_district_id : req.body.data.district_id
    );
    const safeTempleId = safeValue(
        (role_t == 10 || role_t == 11) ? req.body.data.e_temple_m_id : req.body.data.temple_id
    );
    let usersdata = [req.body.data.name, req.body.data.number, req.body.data.role, req.body.data.designation,
    req.body.data.dept_id, safeDistrictIds, safeValue(req.body.data.mandal_id),  // ← Fixed
    safeValue(req.body.data.village_id), // ← Fixed
    safeTempleId, req.body.data.user_id];
            
    
    try {
        // const jwttoken = jwt.verify(auth, 'Amvt@1234');
        usermoduleMdl.updaterolebasedmodulesMdl(user_id, usersdata, req.body.data.role, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            if (results) {

                //  res.send({ status: 200, data: results });
                res.status(200).send({ status: 200, data: results })
            }
            else {

                return res.status(500).send({ status: 500, msg: "Internal Server Error", error: err });
            }
            // return res.status(200).send({ status: 200, data: results });
        });
    } catch (err) {
        //console.log(err);

        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function deleterolebasedmodulesCtrl(req, res) {
    // const { headers } = req;
    const userId = req.params.id;
    // //console.log(headers);
    // const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    // if (!auth) {
    //     return res.status(401).send({ status: 401, msg: "Unauthorized" });
    // }
    // const jwttoken = jwt.verify(auth, 'Amvt@1234');
    //console.log(userId, 962);
    try {
        // const jwttoken = jwt.verify(auth, 'Amvt@1234');
        usermoduleMdl.deleterolebasedmodulesMdl(userId, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}


export function editrolebasedmodulesCtrl(req, res) {
    // const { headers } = req;
    const userId = req.params.id;
    //console.log(req.body, 898);
    // //console.log(headers);
    //console.log(req.body.changes, 1268);
    // const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    // if (!auth) {
    //     return res.status(401).send({ status: 401, msg: "Unauthorized" });
    // }
    // const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // //console.log(userId,905);
    try {

        // const jwttoken = jwt.verify(auth, 'Amvt@1234');
        usermoduleMdl.getuserpermissionmodulesMdl(userId, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            const transformedData = [];
            results.forEach(row => {
                // //console.log(row);
                let module = transformedData.find(m => m.moduleId === row.main_module_id);
                if (!module) {
                    module = {
                        moduleId: row.main_module_id,
                        displayName: row.main_module_name,
                        iconName: row.main_module_icon,
                        route: row.main_module_route,
                        children: []
                    };
                    transformedData.push(module);
                }

                if (row.sub_module_id) {
                    // module.children=[];
                    // //console.log(module.children.length,row.main_module_id,453);
                    if (row.sub_module_name != "dummy") {
                        module.children.push({
                            SubModuleID: row.sub_module_id,
                            displayName: row.sub_module_name,
                            iconName: row.sub_module_icon,
                            route: row.sub_module_route
                        });
                    }
                    else {
                        delete module.children;
                    }

                }
            });
            return res.status(200).send({ status: 200, data: transformedData });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function getrolebasedmodulesCtrl(req, res) {
    // const { headers } = req;
    const role_type = req.params.id;
    //console.log(role_type, 1025);
    // const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    // if (!auth) {
    //     return res.status(401).send({ status: 401, msg: "Unauthorized" });
    // }
    try {
        // const jwttoken = jwt.verify(auth, 'Amvt@1234');
        usermoduleMdl.getrolebasedmodulesMdl(role_type, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function getroleaccessCtrl(req, res) {
    const { headers } = req;
    const role_type = req.params.id;
    //console.log(role_type, 1025);
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    try {
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        usermoduleMdl.getroleaccessMdl(role_type, function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}

export function editprofileimageCtrl(req, res) {

    const { headers } = req;
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    try {
        let fileUrl = "";
        if (req.file) {
            fileUrl = `http://localhost/img/${req.file.filename}`;
        }
        const jwttoken = jwt.verify(auth, 'Amvt@1234');
        usermoduleMdl.editprofileimageMdl([fileUrl, req.body.userId], function (err, results) {
            if (err) {
                return res.status(500).send({ status: 500, msg: err });
            }
            return res.status(200).send({ status: 200, data: results });
        });

    } catch (err) {
        return res.status(401).send({ status: 401, msg: 'Invalid or expired token' });
    }
}


export function add_teammemberCtrl(req, res) {
    const { headers } = req;
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }

    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    // //console.log(req.body, 860);

    // //console.log(role, 872);
    let usersdata = [req.body.user_name, req.body.phone_number, 3];
    usersdata.push(jwttoken.id);

    usermoduleMdl.add_teammemberMdl(3, usersdata, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: err });
            return;
        }

        if (results) {

            //  res.send({ status: 200, data: results });
            res.status(200).send({ status: 200, data: results })
        }
        else {

            return res.status(500).send({ status: 500, msg: "Internal Server Error", error: err });
        }

    });


}

export function getteamMemberCtrl(req, res) {
    const { headers } = req;
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    usermoduleMdl.getteamMemberMdl(jwttoken.id, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: 'Server Error' });
            return;
        }
        res.send({ status: 200, data: results });
    });
}

export function getcaprofileCtrl(req, res) {
    const { headers } = req;
    const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;

    if (!auth) {
        return res.status(401).send({ status: 401, msg: "Unauthorized" });
    }
    const jwttoken = jwt.verify(auth, 'Amvt@1234');
    usermoduleMdl.getcaprofileMdl(jwttoken.id, function (err, results) {
        if (err) {
            res.send({ status: 500, msg: 'Server Error' });
            return;
        }
        res.send({ status: 200, data: results });
    });
}


// export function getDistrictDataCtrl(req, res) {
//     usermoduleMdl.getDistrictDataMdl(function (err, results) {
//         if (err) {
//             res.send({ status: 500, msg: err });
//             return;
//         }
//         res.send({ status: 200, data: results });
//     });
// }

// export function getSlfDataCtrl(req, res) {
//     usermoduleMdl.getSlfDataMdl(function (err, results) {
//         if (err) {
//             res.send({ status: 500, msg: err });
//             return;
//         }
//         res.send({ status: 200, data: results });
//     });
// }


// export function getulbCtrl(req, res) {
//     var data = req.body;
//     usermoduleMdl.getulbMdl(data, function (err, results) {
//         if (err) {
//             res.send({ status: 500, msg: err });
//             return;
//         }
//         res.send({ status: 200, data: results });
//     });
// }

// new
export function employeenamectrl(req, res) {

    usermoduleMdl.employeenamemdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}


export function teamleadnamectrl(req, res) {

    usermoduleMdl.teamleadnamemdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export function gettlidcrl(req, res) {
    var val = req.params.val;
    usermoduleMdl.gettlidmdl(val, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export function gettmidcrl(req, res) {
    var val = req.params.val;
    usermoduleMdl.gettmidmdl(val, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export function submitteammemberdetailsctrl(req, res) {
    var data = req.body;
    usermoduleMdl.submitteammemberdetailsmdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}

export function getmembersdatactrl(req, res) {

    usermoduleMdl.getmembersdatamdl(function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
export function editteammemberctrl(req, res) {
    var data = req.body;
    //console.log(data, "mainctrl");
    usermoduleMdl.editteammembermdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
}
export function deleteteammemberctrl(req, res) {
    var data = req.body;
    //console.log(data, "deleted data");
    usermoduleMdl.deleteteammembermdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
};

export function updateUserColors(req, res) {
    var data = req.body;
    let user = req.user;
    data.userId = user.id;
    usermoduleMdl.updateUserColorsMdl(data, function (err, results) {
        if (err) {
            res.send(500, "Server Error");
            return;
        }
        res.send({ 'status': 200, 'data': results });
    });
};