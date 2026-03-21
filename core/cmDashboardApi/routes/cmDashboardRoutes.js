import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/cmDashboardMasterctrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { validation, signupValidation } from "../../../config/validators.js";

router.post('/getDdnsMonthlyDataReport', validateJWT, ctrl.getDdnsMonthlyDataReportCtrl);
router.post('/getDdrfMonthlyDataReport', validateJWT, ctrl.getDdrfMonthlyDataReportCtrl);
router.post('/getAuevcsMonthlyDataReport', validateJWT, ctrl.getAuevcsMonthlyDataReportCtrl);

router.post('/getengineerworksDataReport', validateJWT, ctrl.getengineerworksDataReportCtrl);
router.post('/getCgfDataReport', validateJWT, ctrl.getCgfDataReportCtrl);
router.post('/getOnlineServiceReport', validateJWT, ctrl.getOnlineServiceReportCtrl);
//02/12/2025
router.post('/getArchakaReport', validateJWT, ctrl.getArchakaReportCtrl);

//
router.post('/getDdnsMonthlyDataReportDashboard', validateJWT, ctrl.getDdnsMonthlyDataReportDashboardCtrl);
router.post('/getDdrfMonthlyDataReportDashboard', validateJWT, ctrl.getDdrfMonthlyDataReportDashboardCtrl);
router.post('/getAuevcsMonthlyDataReportDashboard', validateJWT, ctrl.getAuevcsMonthlyDataReportDashboardCtrl);
router.post('/getOnlineServiceReportDashboard', validateJWT, ctrl.getOnlineServiceReportDashboardCtrl);

export default router;
