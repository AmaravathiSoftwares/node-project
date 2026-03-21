import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/analysisMasterctrl.js";
// import { verifyToken } from '../../utils/jwtoken.js';
// import { verifyToken } from '../../utils/jwtoken.js';

// router.post("/postMeetingData", ctrl.postMeetingCtrl);

router.post('/getastsevendayscrmdata', ctrl.getastsevendayscrmdataCtrl);
router.post('/getcrmweekdaysgraph', ctrl.getcrmweekdaysgraphCtrl);
router.get('/empDashboardCounts', ctrl.empDashboardCountsCtrl);
router.get('/getcarwisepayment', ctrl.getcarwisepaymentCtrl);
router.get('/getalldatawise', ctrl.getalldatawiseCtrl);
router.get('/gettotalcountsdata/:mind', ctrl.gettotalcountsdataCtrl);
router.get('/getweblogsdata', ctrl.getweblogsdataCtrl);
router.get('/getlastsevendaysbookingllist', ctrl.getlastsevendaysbookingllistCtrl);
router.get('/changeComersData/:ind', ctrl.changeComersCtrl);
router.get('/getToptenissusesData/', ctrl.getToptenissusesCtrl);
router.get('/toatlcntsordersData/', ctrl.toatlcntsordersCtrl);


export default router;
