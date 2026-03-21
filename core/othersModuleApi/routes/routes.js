import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/controls.js"
import { validation, signupValidation } from "../../../config/validators.js";
import { apiRateLimiter } from "../../config/apiratelimiter.js";
//routes
import * as loginCtrl from '../controls/loginctrl.js';
import loginRouter from './loginroutes.js';

// get and posting banner images
router.get("/getbannerimages", ctrl.getbannerimagesCtrl);
router.post("/postbannerimages", ctrl.postbannerimagesCtrl)
router.post("/posttemplesdata", ctrl.addTemplesdataCtrl);
router.post("/gettemplesdata", ctrl.getTemplesDataCtrl);

// router.post("/sendotp", apiRateLimiter, validation.sendotp, signupValidation, loginCtrl.sendOtpCtrl); //done
// router.post("/verifyotp", apiRateLimiter, validation.verifyotp, signupValidation, ctrl.veriftOtpCtrl); //done
router.get("/login", ctrl.loginCtrl); //dummy
// router.post("/sendhashotp",ctrl.router)
router.post("/logout", ctrl.logoutCtrl); //done



router.post("/getmainmodulesdata", ctrl.getMainModulesdataCtrl); //dummy
router.post("/getmainsubmodulesdata", ctrl.getmainsubmodulesdataCtrl);  //usermodules
router.post("/getuserpermissionmodules", validation.getuserpermissionmodules, signupValidation, ctrl.getcurrentpermissionmodulesCtrl); //usermodules

router.post("/getuserreport", ctrl.getUserReportCtrl); //usermodules
router.post("/getuserreport/:id", ctrl.getUserReportByIdCtrl); //usermodules


// master modules permission based on the role for the multiple users 
router.post('/addmasteruserpersmissions', ctrl.addmasteruserpersmissionsCtrl);

// session user role
router.post("/getrole", ctrl.getRoleCtrl); // for multiple routes

// add new user in the module of user access and a
router.post("/addrolebasedmodules", ctrl.addrolebasedmodulesCtrl); +

    // updateing particular user modules and submodules and also users_data
    router.post("/updaterolebasedmodules/:id", ctrl.updaterolebasedmodulesCtrl);

// deleting particular user modules and submodules and also users_data making d_in=1
router.post("/deleterolebasedmodules/:id", ctrl.deleterolebasedmodulesCtrl);

//editing the role based modules and sub_modules of a particualr user
router.post("/editrolebasedmodules/:id", ctrl.editrolebasedmodulesCtrl);

// getting the role of the users(like role type in masters modules)
router.post("/getrolebasedmodules/:id", ctrl.getrolebasedmodulesCtrl)

router.post("/getroleaccess/:id", ctrl.getroleaccessCtrl);

export default router;
