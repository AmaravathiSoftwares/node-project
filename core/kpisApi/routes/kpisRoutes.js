import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/kpisMasterctrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { validation, signupValidation } from "../../../config/validators.js";

// router.post('/getDdnsMonthlyDataReport', validateJWT, ctrl.getDdnsMonthlyDataReportCtrl);
// router.post('/getDdrfMonthlyDataReport', validateJWT, ctrl.getDdrfMonthlyDataReportCtrl);
// router.post('/getAuevcsMonthlyDataReport', validateJWT, ctrl.getAuevcsMonthlyDataReportCtrl);
// router.post('/getengineerworksDataReport', validateJWT, ctrl.getengineerworksDataReportCtrl);
// router.post('/getCgfDataReport', validateJWT, ctrl.getCgfDataReportCtrl);
// router.post('/getOnlineServiceReport', validateJWT, ctrl.getOnlineServiceReportCtrl);
//01/07/2025
router.post('/getddnsArachakReport', validateJWT, ctrl.getddnsArachakReportCtrl);
router.post('/getDistrictReportData', validateJWT, ctrl.getDistrictReportDataCtrl);
router.post('/submitArackaDetails', validateJWT, validation.submitArackaDetails, signupValidation, ctrl.submitArackaDetailsCtrl);
router.post('/getddrfsArachakReport', validateJWT, ctrl.getddrfsArachakReportCtrl);
router.post('/getAuevsArachakReport', validateJWT, ctrl.getAuevsArachakReportCtrl);
router.post('/getEngneeringWorksReport', validateJWT, ctrl.getEngneeringWorksReportCtrl);
router.post('/getOnlineServiceTemplesReport', validateJWT, ctrl.getOnlineServiceTemplesReportCtrl);

router.post('/getCCGFReport', validateJWT, ctrl.getCCGFReportCtrl);
router.post('/updateArackaDetails', validateJWT, ctrl.updateArackaDetailsCtrl);
router.post('/deleteddnsArachakaDetails', validateJWT, ctrl.deleteddnsArachakaDetailsCtrl);
//DDrf details
router.post('/updateDdrfArackaDetails', validateJWT, ctrl.updateDdrfArackaDetailsCtrl);
router.post('/submitDDrfArackaDetails', validateJWT, validation.submitDDrfArackaDetails, signupValidation, ctrl.submitDDrfArackaDetailsCtrl);
router.post('/deleteddrfArachakaDetails', validateJWT, ctrl.deleteddrfArachakaDetailsCtrl);
//Aueves Details
router.post('/updateAuevsArackaDetails', validateJWT, ctrl.updateAuevsArackaDetailsCtrl);
router.post('/submitAuevsArackaDetails', validateJWT, validation.submitAuevsArackaDetails, signupValidation, ctrl.submitAuevsArackaDetailsCtrl);
router.post('/deleteAuevsArachakaDetails', validateJWT, ctrl.deleteAuevsArachakaDetailsCtrl);

//CCGF Details
router.post('/updateCCGFDetails', validateJWT, ctrl.updateCCGFDetailsCtrl);
router.post('/submitCCGFDetails', validateJWT, validation.submitCCGFDetails, signupValidation, ctrl.submitCCGFDetailsCtrl);
router.post('/deleteCCGFDetails', validateJWT, ctrl.deleteCCGFDetailsCtrl);

//EngneeringWorksDetails 
router.post('/updateEngneeringWorksDetails', validateJWT, ctrl.updateEngneeringWorksDetailsCtrl);
router.post('/submitEngneeringWorksDetails', validateJWT, validation.submitEngneeringWorksDetails, signupValidation, ctrl.submitEngneeringWorksDetailsCtrl);
router.post('/deleteEngneeringWorksDetails', validateJWT, ctrl.deleteEngneeringWorksDetailsCtrl);

//Online Temple data
router.post('/createonlineTempleData', validateJWT, validation.online_temple_dataValidator, signupValidation, ctrl.createonlineTempleDataCtrl);
router.post('/updateonlineTempleData', validateJWT, validation.online_temple_dataValidator, signupValidation, ctrl.updateonlineTempleDataCtrl);
router.post('/deleteonlineTempleData', validateJWT, ctrl.deleteonlineTempleDataCtrl);





export default router;
