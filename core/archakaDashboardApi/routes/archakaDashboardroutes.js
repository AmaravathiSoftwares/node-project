import { Router } from 'express';
import { validation, signupValidation } from "../../../config/validators.js";
import { apiRateLimiter } from "../../../config/apiratelimiter.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
//routes
const archakaDashboardRouter = Router();
import * as archakaDashboardCtrl from '../controls/archakaDashboardctrl.js';
import { validaterefreshToken } from "../../../utils/jwtUtils.js";


//Cm Dashboard Api
// archakaDashboardRouter.post("/getthecandidatesreportdata",  archakaDashboardCtrl.getUserprofileDataCtrl);
archakaDashboardRouter.post("/getthecandidatesreportdata",  archakaDashboardCtrl.getthecandidatesreportdataCtrl);
archakaDashboardRouter.post("/gettheapplicationsreportdata",  archakaDashboardCtrl.gettheapplicationsreportdataCtrl);

archakaDashboardRouter.post("/gettheuserapplications",  archakaDashboardCtrl.gettheuserapplicationsCtrl);

archakaDashboardRouter.post("/getdashboardcandidatescount",  archakaDashboardCtrl.getdashboardcandidatescountCtrl);
archakaDashboardRouter.post("/getdashboardapplicationscount",  archakaDashboardCtrl.getdashboardapplicationscountCtrl);
archakaDashboardRouter.post('/getReportImages',  archakaDashboardCtrl.getReportImagesCtrl);
archakaDashboardRouter.post('/getPostsMasters',  archakaDashboardCtrl.getPostsMastersCtrl);
archakaDashboardRouter.post('/getPositionMasters',  archakaDashboardCtrl.getPositionMastersCtrl);

archakaDashboardRouter.post('/getcategorywiseApplications',  archakaDashboardCtrl.getcategorywiseApplicationsCtrl);

archakaDashboardRouter.post('/postwiseapplicationsCounts',  archakaDashboardCtrl.postwiseapplicationsCountsCtrl);

archakaDashboardRouter.post('/postwiseapplicationsidData',  archakaDashboardCtrl.postwiseapplicationsidCtrl);

// //Dashboard
archakaDashboardRouter.post("/getthedashboardcandidatesreport",  archakaDashboardCtrl.getthedashboardcandidatesreportCtrl);
archakaDashboardRouter.post("/getthedashboardapplicationreport",  archakaDashboardCtrl.getthedashboardapplicationreportCtrl);


export default archakaDashboardRouter;
