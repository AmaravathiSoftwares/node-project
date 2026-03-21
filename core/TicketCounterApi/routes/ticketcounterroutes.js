import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/ticketcounterctrl.js";
import { validation, signupValidation } from "../../../config/validators.js";
import { apiRateLimiter } from "../../../config/apiratelimiter.js";
import { validateJWT } from "../../../utils/jwtUtils.js";

router.post('/getdistricts', ctrl.getdistricts);

//-------------------------------------------------------------Drashanam ------------------------------------------------------------------

router.post('/getTicketDetails', validateJWT, ctrl.getTicketDetails);

router.post('/Sendotpdetails', validateJWT, ctrl.Sendotpdetailsctrl);

router.post('/VerifyOtpdarshanam', validateJWT, ctrl.VerifyOtpdarshanamctrl);

router.post('/getcurrentdatecountsanddata', validateJWT, ctrl.getcurrentdatecountsanddatactrl);

router.post('/getscanTicketDetails', validateJWT, ctrl.getscanTicketDetailsctrl);

router.post('/updatescanverified', validateJWT, ctrl.updatescanverifiedctrl);



//-------------------------------------------------------------Sevsa ------------------------------------------------------------------

router.post('/getsevaTicketDetails', validateJWT, ctrl.getsevaTicketDetails);

router.post('/Sendotpsevadetails', validateJWT, ctrl.Sendotpsevadetailsctrl);

router.post('/VerifyOtpseva', validateJWT, ctrl.VerifyOtpsevactrl);

router.post('/getsevacurrentdatecountsanddata', validateJWT, ctrl.getsevacurrentdatecountsanddatactrl);

router.post('/getsevascanTicketDetails', validateJWT, ctrl.getsevascanTicketDetailsctrl);

router.post('/updatesevascanverified', validateJWT, ctrl.updatesevascanverifiedctrl);


//-------------------------------------------------------------prasadam ------------------------------------------------------------------

router.post('/getprasadamTicketDetails', validateJWT, ctrl.getprasadamTicketDetails);

router.post('/Sendotpprasadamdetails', validateJWT, ctrl.Sendotpprasadamdetailsctrl);

router.post('/VerifyOtpprasadam', validateJWT, ctrl.VerifyOtpprasadamctrl);

router.post('/getprasadamcurrentdatecountsanddata', validateJWT, ctrl.getprasadamcurrentdatecountsanddatactrl);

router.post('/getprasadamscanTicketDetails', validateJWT, ctrl.getprasadamscanTicketDetailsctrl);

router.post('/updateprasadamscanverified', validateJWT, ctrl.updateprasadamscanverifiedctrl);


//------------------------------------------------------------------------------------ App Login -------------------------------------------------------------------------

//---------------------------login ---------------------------------------------------------------------
router.post("/sendotp", apiRateLimiter, ctrl.sendOtpCtrl);

router.post("/verifyotp", apiRateLimiter, ctrl.veriftOtpCtrl);

//---------------------------Verification ---------------------------------------------------------------
router.post('/ticket_verficationdetails', validateJWT, ctrl.ticket_verficationdetailsctrl);

//--------------------------- Ticket-Scanner  -----------------------------------------------------------
router.post('/getcustomerdetails', validateJWT, ctrl.getcustomerdetailsCtrl);

router.post('/verifywithqrdetails', validateJWT, ctrl.verifywithqrdetailsCtrl);

//--------------------------- number -verifvcation tike  ------------------------------------------------
router.post('/checknumberdetails', validateJWT, ctrl.checknumberdetailsctrl);
router.post('/verfiywithotpApp', validateJWT, ctrl.verfiywithotpAppCtrl);

router.post('/gettonsureTicketDetails', validateJWT, ctrl.gettonsureTicketDetails);

router.post('/Sendotptonsuredetails', validateJWT, ctrl.Sendotptonsuredetailsctrl);

router.post('/VerifyOtptonsure', validateJWT, ctrl.VerifyOtptonsurectrl);

router.post('/gettonsurecurrentdatecountsanddata', validateJWT, ctrl.gettonsurecurrentdatecountsanddatactrl);

router.post('/gettonsurescanTicketDetails', validateJWT, ctrl.gettonsurescanTicketDetailsctrl);

router.post('/updatetonsurescanverified', validateJWT, ctrl.updatetonsurescanverifiedctrl);

router.post('/getentryverification', validateJWT, ctrl.getentryverificationCtrl);

router.post('/getApprovebyUser', validateJWT, ctrl.getApprovebyUserCtrl);


//---------------------------------------------Prasadam Stock-In --------------------------------------------

router.post('/getprasadamtypes',validateJWT,  ctrl.getprasadamtypesCtrl);

router.post('/AddPrasadamStock',validateJWT , ctrl.AddPrasadamStockCtrl);

router.post('/getPrasadamStock',validateJWT, ctrl.getPrasadamStockctrl);

router.post('/gettodayPrasadamStockDetails', validateJWT, ctrl.gettodayPrasadamStockDetailsCtrl);

//---------------------------------------------Prasadam Stock-In --------------------------------------------

router.post('/getdatewisePrasadamAnalysis' , validateJWT , ctrl.getdatewisePrasadamAnalysisCtrl);



router.post("/getStockDetails",validateJWT,  ctrl.getStockDetailsCtrl);
router.post("/checkShiftReport",validateJWT, ctrl.checkShiftReportCtrl);
router.post("/submitShiftReport",validateJWT, ctrl.submitPreviousStockCtrl);
router.post("/submitFullShiftReport",validateJWT, ctrl.submitFullShiftReportCtrl);


//sale report
router.post("/getCounters",validateJWT, ctrl.getCountersCtrl);
router.post("/getShifts",validateJWT, ctrl.getShiftsCtrl);
router.post("/getShiftSaleReport",validateJWT, ctrl.getShiftSaleReportCtrl);
router.post("/reomoveCounterStock",validateJWT, ctrl.reomoveCounterStockCtrl);


// --------------------------------------------ticket counter routes---------------------------------------


router.post('/submitDarshnamBlockDates', validateJWT, ctrl.submitDarshnamBlockDatesCtrl);
router.post('/getdeDarshanamBlockDates', validateJWT, ctrl.getdeDarshanamBlockDatesCtrl);
router.post('/deleteDarshanamBlockDates', validateJWT, ctrl.deleteDarshanamBlockDatesCtrl);
router.post('/updateDarshnamBlockDates', validateJWT, ctrl.updateDarshnamBlockDatesCtrl);

router.post('/updateDarshnampaymentStatus', validateJWT, ctrl.updateDarshnampaymentStatusCtrl);


// entry-verification checking

router.post('/checkcouterLoginStatus', validateJWT, ctrl.checkcouterLoginStatusCtrl);
router.post('/logoutPreviousLogins', validateJWT, ctrl.logoutPreviousLoginsCtrl);

export default router;