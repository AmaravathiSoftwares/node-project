import { Router } from "express";
const router = Router();
import * as ctrl from "../controls/aianalyticsControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { validation, signupValidation } from "../../../config/validators.js";

router.post("/qlinesdata", validateJWT, ctrl.qlinesdataCtrl);
router.post("/newQlineDayCountDetails", ctrl.newQlineDayCountDetailsCtrl);
router.post("/timewisedata", validateJWT, ctrl.timewisedataCtrl);
router.post("/qlinedaycountdetails", validateJWT, ctrl.qlinedaycountdetailsCtrl);
router.post("/ttyw_qlinecountdetails", validateJWT, ctrl.ttyw_qlinecountdetailsCtrl);
router.post("/getQlinewisehourlycountanalysis", ctrl.getQlinewisehourlycountanalysisCtrl);
router.post("/getweekwiseqlineanalysis", validateJWT, ctrl.getweekwiseqlineanalysisCtrl);
// anna
router.post("/getanndanamnewQlineCounts", ctrl.getanndanamnewQlineCountsCtrl);
router.post("/annaprasadhamgetHourwiseqlineanalysis", ctrl.annaprasadhamgetHourwiseqlineanalysisCtrl);
router.post("/annaprasadhamDaywiseqlineanalysis", ctrl.annaprasadhamDaywiseqlineanalysisCtrl);
router.post("/annaprasadhamanalysis", validateJWT, ctrl.annaprasadhamanalysisCtrl);
router.post("/annaprasadhamtime", validateJWT, ctrl.annaprasadhamtimeCtrl);
// parking
router.post("/getparkingdata", validateJWT, ctrl.getparkingdataCtrl);
router.post("/getparkingcardscountdata", validateJWT, ctrl.getparkingcardscountdataCtrl);
router.post('/templesCamerasFeedData', ctrl.templesCamerasFeedDataCtrl);
router.post('/getAiAnalysisTemples', validateJWT, ctrl.getAiAnalysisTemplesCtrl);

router.post('/newQlineWaitngDetails', validateJWT, ctrl.newQlineWaitngDetailsCtrl);


router.post('/getcrowdDensityData', validateJWT, ctrl.getcrowdDensityCtrl);

router.post('/getFireAlertData', validateJWT, ctrl.getFireAlertCtrl);

router.post('/getFireAlertUrlsData', validateJWT, ctrl.getFireAlertUrlsCtrl);

export default router;
