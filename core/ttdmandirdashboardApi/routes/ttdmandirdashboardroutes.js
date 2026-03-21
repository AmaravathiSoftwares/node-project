import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/ttdmandirdashboardctrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";

// <-----------------------------------------Districts---------------------------------------> 

router.post('/getdistricts', ctrl.getdistricts);

router.post('/getmandals', ctrl.getmandals);

router.post('/getvillagesbymandalid', ctrl.getvillagesbymandalid);

router.post('/getconstituenciesbydistrictid', ctrl.getconstituenciesbydistrictid);

router.post('/submitttdmandirrequest', ctrl.submitttdmandirrequest);

router.post('/editttdmandirrequest', validateJWT, ctrl.editttdmandirrequest);



// <-----------------------------------------Get Bajana TTD Mandir ---------------------------------------> 

router.post('/getRequestsformandir', ctrl.getRequestsformandir);

router.post('/getdistrictRequestscountformandir', ctrl.getdistrictRequestscountformandir);

router.post('/getdistrictRequestsformandir', ctrl.getdistrictRequestsformandir);

router.post('/getdistrictsdata', ctrl.getdistrictsdataCtrl);

router.post('/getallditrictsbmdata', ctrl.getallditrictsbmdataCtrl);

router.post('/getbmdataCounts', ctrl.getbmdataCountsCtrl);

router.post('/getconstuencydata', ctrl.getconstuencydataCtrl);

router.post('/getttdbmconstdata', ctrl.getttdbmconstdataCtrl);

// <-----------------------------------------Get Bajana TTD Mandir --------------------------------------->

router.post('/getbmdataCounts', ctrl.getbmdataCountsCtrl);

router.post('/getcardmodeldata', ctrl.getcardmodeldataCtrl);

router.post('/getconsultancywisereportdata', ctrl.getconsultancywisereportdataCtrl);

router.post('/getcarddatabyconstituency', ctrl.getcarddatabyconstituencyCtrl);

router.post('/getmandalwisereportdata', ctrl.getmandalwisereportdataCtrl);

router.post('/getcarddatabymandal', ctrl.getcarddatabymandalCtrl);

router.post('/getindividualwisereportdata', ctrl.getindividualwisereportdataCtrl);

router.post('/getindividualcarddatabymandal', ctrl.getindividualcarddatabymandalCtrl);

router.post('/getdistrictdropdowndata', ctrl.getdistrictdropdowndataCtrl);

router.post('/getconstituencydatabydistrict', ctrl.getconstituencydatabydistrictCtrl);

router.post('/getconstituencydropdown', ctrl.getconstituencydropdownCtrl);

router.post('/getmandalstatusdropdown', ctrl.getmandalstatusdropdownCtrl);

router.post('/getmandaldropdowndata', ctrl.getmandaldropdowndataCtrl);

router.post('/getallconstituencystatusdata', ctrl.getallconstituencystatusdataCtrl);

router.post('/sanctionamount', validateJWT,ctrl.sanctionamountCtrl);

router.post('/postsanctionedstages', validateJWT,ctrl.postsanctionedstagesCtrl);

router.post('/getsanctionedamountlist', validateJWT,ctrl.getsanctionedamountlistCtrl);

export default router;