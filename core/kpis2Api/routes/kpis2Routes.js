import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/kpis2Controls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { validation, signupValidation } from "../../../config/validators.js";

router.post('/getDdnsMonthlyDataReport', validateJWT, ctrl.getDdnsMonthlyDataReportCtrl);
router.post('/getDdrfMonthlyDataReport', validateJWT, ctrl.getDdrfMonthlyDataReportCtrl);
router.post('/getAuevcsMonthlyDataReport', validateJWT, ctrl.getAuevcsMonthlyDataReportCtrl);
router.post('/getengineerworksDataReport', validateJWT, ctrl.getengineerworksDataReportCtrl);
router.post('/getCgfDataReport', validateJWT, ctrl.getCgfDataReportCtrl);
router.post('/getOnlineServiceReport', validateJWT, ctrl.getOnlineServiceReportCtrl);
//01/07/2025
router.post('/getddnsArachakReport', validateJWT, ctrl.getddnsArachakReportCtrl);
router.post('/getDistrictReportData', validateJWT, ctrl.getDistrictReportDataCtrl);
router.post('/submitArackaDetails', validateJWT, ctrl.submitArackaDetailsCtrl);
router.post('/getddrfsArachakReport', validateJWT, ctrl.getddrfsArachakReportCtrl);
router.post('/getAuevsArachakReport', validateJWT, ctrl.getAuevsArachakReportCtrl);
router.post('/getEngneeringWorksReport', validateJWT, ctrl.getEngneeringWorksReportCtrl);
router.post('/getOnlineServiceTemplesReport', validateJWT, ctrl.getOnlineServiceTemplesReportCtrl);

router.post('/getCCGFReport', validateJWT, ctrl.getCCGFReportCtrl);
router.post('/updateArackaDetails', validateJWT, ctrl.updateArackaDetailsCtrl);
router.post('/deleteddnsArachakaDetails', validateJWT, ctrl.deleteddnsArachakaDetailsCtrl);
//DDrf details
router.post('/updateDdrfArackaDetails', validateJWT, ctrl.updateDdrfArackaDetailsCtrl);
router.post('/submitDDrfArackaDetails', validateJWT, ctrl.submitDDrfArackaDetailsCtrl);
router.post('/deleteddrfArachakaDetails', validateJWT, ctrl.deleteddrfArachakaDetailsCtrl);
//Aueves Details
router.post('/updateAuevsArackaDetails', validateJWT, ctrl.updateAuevsArackaDetailsCtrl);
router.post('/submitAuevsArackaDetails', validateJWT, ctrl.submitAuevsArackaDetailsCtrl);
router.post('/deleteAuevsArachakaDetails', validateJWT, ctrl.deleteAuevsArachakaDetailsCtrl);

//CCGF Details
router.post('/updateCCGFDetails', validateJWT, ctrl.updateCCGFDetailsCtrl);
router.post('/submitCCGFDetails', validateJWT, ctrl.submitCCGFDetailsCtrl);
router.post('/deleteCCGFDetails', validateJWT, ctrl.deleteCCGFDetailsCtrl);

//EngneeringWorksDetails 
router.post('/updateEngneeringWorksDetails', validateJWT, ctrl.updateEngneeringWorksDetailsCtrl);
router.post('/submitEngneeringWorksDetails', validateJWT, ctrl.submitEngneeringWorksDetailsCtrl);
router.post('/deleteEngneeringWorksDetails', validateJWT, ctrl.deleteEngneeringWorksDetailsCtrl);

//Online Temple data
router.post('/createonlineTempleData', validateJWT, ctrl.createonlineTempleDataCtrl);
router.post('/updateonlineTempleData', validateJWT, ctrl.updateonlineTempleDataCtrl);
router.post('/deleteonlineTempleData', validateJWT, ctrl.deleteonlineTempleDataCtrl);



//common apis
router.post('/getDistricts', validateJWT, ctrl.getDistrictsCtrl);
router.post('/getUlbs', validateJWT, ctrl.getUlbsCtrl);
router.post('/getVillages', validateJWT, ctrl.getvillagesCtrl);
router.post('/getTemples', validateJWT, ctrl.getTemplesCtrl);

//check duplicate entry
router.post('/checkDuplicates', validateJWT, ctrl.checkDuplicatesCtrl);

//trust board
router.post('/trustBoards', validateJWT, ctrl.TrustBoardsCtrl);

router.post('/submitCgfCDetails', validateJWT, ctrl.submitCgfCDetailsCtrl);
router.post('/getcgfCdata', validateJWT, ctrl.getcgfCdataCtrl);
router.post('/submitCgfrDetails', validateJWT, ctrl.submitCgfrDetailsCtrl);
router.post('/getcgfRdata', validateJWT, ctrl.getcgfRdataCtrl);
router.post('/submitAnnaprasadamDetails', validateJWT, ctrl.submitAnnaprasadamDetailsCtrl);
router.post('/getAnnapradasamdata', validateJWT, ctrl.getAnnapradasamdataCtrl);

router.post('/updateCgfCDetails', validateJWT, ctrl.updateCgfCDetailsCtrl);
router.post('/deleteCgfcdata', validateJWT, ctrl.deleteCgfcdataCtrl);
router.post('/updateCgfrDetails', validateJWT, ctrl.updateCgfrDetailsCtrl);
router.post('/deletecgfrDetails', validateJWT, ctrl.deletecgfrDetailsCtrl);
router.post('/updateAnnaprasadamDetails', validateJWT, ctrl.updateAnnaprasadamDetailsCtrl);
router.post('/deleteannapradsadamDetails', validateJWT, ctrl.deleteannapradsadamDetailsCtrl);



export default router;
