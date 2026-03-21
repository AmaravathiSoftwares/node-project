import { Router } from "express";
import { validation, signupValidation } from "../../../config/validators.js";
import { apiRateLimiter } from "../../../config/apiratelimiter.js";
import { upload } from "../../../config/imageConvertion.js";
import * as usermodelctrl from "../controls/usermodulectrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import authorizeRole  from "./../../../utils/authorizeRole.js";
const usermoduleroutes = Router();

import multer from "multer";

import { fileURLToPath } from 'url';
import path from 'path';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/images/');
    },
    filename: function (req, file, cb) {
        console.log(file, 18);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // console.log();
        console.log(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})



usermoduleroutes.post("/getmainmodulesdata", usermodelctrl.getMainModulesdataCtrl);
usermoduleroutes.post("/getmainsubmodulesdata",authorizeRole([1,2]), usermodelctrl.getmainsubmodulesdataCtrl);
// validation.getuserpermissionmodules,
usermoduleroutes.post("/getuserpermissionmodules",validateJWT, signupValidation, usermodelctrl.getcurrentpermissionmodulesCtrl);

usermoduleroutes.post("/getuserreport", validateJWT, usermodelctrl.getUserReportCtrl); //usermodules

usermoduleroutes.post("/getuserreport/:id",validateJWT, usermodelctrl.getUserReportByIdCtrl); //usermodules


// session user role
usermoduleroutes.post("/getrole",validateJWT, usermodelctrl.getRoleCtrl); // for multiple routes

// add new user in the module of user access and a
usermoduleroutes.post("/addrolebasedmodules", validateJWT,upload.single('image'), usermodelctrl.addrolebasedmodulesCtrl);
usermoduleroutes.post("/addrolebasedmodulesform", usermodelctrl.addrolebasedmodulesformCtrl);


// updateing particular user modules and submodules and also users_data
usermoduleroutes.post("/updaterolebasedmodules/:id", usermodelctrl.updaterolebasedmodulesCtrl);

// deleting particular user modules and submodules and also users_data making d_in=1
usermoduleroutes.post("/deleterolebasedmodules/:id", usermodelctrl.deleterolebasedmodulesCtrl);

//editing the role based modules and sub_modules of a particualr user
usermoduleroutes.post("/editrolebasedmodules/:id", usermodelctrl.editrolebasedmodulesCtrl);

// getting the role of the users(like role type in masters modules)
usermoduleroutes.post("/getrolebasedmodules/:id", usermodelctrl.getrolebasedmodulesCtrl)

usermoduleroutes.post("/getroleaccess/:id", usermodelctrl.getroleaccessCtrl);



usermoduleroutes.post("/editporfileimage", upload.single('image'), usermodelctrl.editprofileimageCtrl);
// ravi

usermoduleroutes.post("/station_master", usermodelctrl.getStationMasterCtrl); //usermodules

//team members

usermoduleroutes.post("/add_teammember", usermodelctrl.add_teammemberCtrl);

usermoduleroutes.post("/getteamMemberdata", usermodelctrl.getteamMemberCtrl);

// usermoduleroutes.post("/getcaprofiledata", usermodelctrl.getcaprofileCtrl);

// usermoduleroutes.post("/getDistrictData", usermodelctrl.getDistrictDataCtrl);
// usermoduleroutes.post("/getSlfData", usermodelctrl.getSlfDataCtrl);
// usermoduleroutes.post("/getulbData", usermodelctrl.getulbCtrl);

// new
usermoduleroutes.get('/employeename', usermodelctrl.employeenamectrl);
usermoduleroutes.get('/teamleadname', usermodelctrl.teamleadnamectrl);
usermoduleroutes.get('/gettlid/:val', usermodelctrl.gettlidcrl);
usermoduleroutes.get('/gettmid/:val', usermodelctrl.gettmidcrl);
usermoduleroutes.post('/submitteammemberdetails', usermodelctrl.submitteammemberdetailsctrl);
usermoduleroutes.get('/getmembersdata', usermodelctrl.getmembersdatactrl);
usermoduleroutes.post('/editteammember', usermodelctrl.editteammemberctrl);
usermoduleroutes.post('/deleteteammember', usermodelctrl.deleteteammemberctrl);
usermoduleroutes.post('/updateUserColors', validateJWT, usermodelctrl.updateUserColors);

export default usermoduleroutes;

