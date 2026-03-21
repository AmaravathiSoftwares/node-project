import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/kioskControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { esevaValidator, checkValidation } from "../validators/kioskvalidators.js";
import rtgsAuth from "../middleware/rtgsAuth.js";

//requests limit ------------------------------------------------------------------

import rateLimit from "express-rate-limit";

// General API limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, // normal APIs need higher limit
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});


// OTP limiter (STRICT)
export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: "OTP request limit exceeded. Try again later."
    }
});

//requests limit ----------------------------------------------------------------------------

//App login
router.post('/apprefresh-token', ctrl.apprefreshTokenController);

router.post("/sendotpformobile", ctrl.sendotpformobileCtrl);

router.post("/veriftMobileOtp", ctrl.veriftMobileOtpCtrl);

router.post('/getMobileappProfileData', rtgsAuth, validateJWT, ctrl.getMobileappProfileCtrl);

router.post('/checkMobileAppversion', ctrl.checkMobileAppversionCtrl);

router.post('/gettempledetails', rtgsAuth, validateJWT, ctrl.gettempledetailsCtrl);

router.post('/sendOtpForLogout', rtgsAuth, validateJWT, ctrl.sendOtpForLogoutCtrl);

router.post('/VerifyOtpForLogout', rtgsAuth, validateJWT, ctrl.VerifyOtpForLogoutCtrl);

//RGTs Apis
router.post('/getDistricts', rtgsAuth, validateJWT, ctrl.getDistrictsCtrl);

router.post('/getTemples', rtgsAuth, esevaValidator.getTemples, checkValidation, ctrl.getTemplesCtrl);

router.post('/getServicesList', rtgsAuth, validateJWT, esevaValidator.getServicesTypes, checkValidation, ctrl.getServicesListCtrl);

// Darshnam start 1
router.post('/getDarshnamService', rtgsAuth, validateJWT, esevaValidator.getSelectedService, checkValidation, ctrl.getDarshnamServiceCtrl);

router.post('/getDarshanSlots', rtgsAuth, validateJWT, esevaValidator.getDarshanSlots, checkValidation, ctrl.getDarshanSlotsCtrl);

router.post('/createDarshnamOrder', rtgsAuth, validateJWT, esevaValidator.e_darshnam_ordersValidator, checkValidation, ctrl.createeDarshnamOrdersCtrlOrg);

router.post('/updateDarshnamOrderStatus', rtgsAuth, validateJWT, ctrl.updateDarshnamOrderStatusCtrl);

//mana mitra apis start

//seva start 2
router.post('/getSevaTypes', rtgsAuth, validateJWT, ctrl.getSevaTypesCtrl);

router.post('/getSevaMainData', rtgsAuth, validateJWT, esevaValidator.getSevaMainData, checkValidation, ctrl.getSevaMainCtrl);

router.post('/getSevaSlotsMainData', rtgsAuth, validateJWT, esevaValidator.getSevaSlotsMainData, checkValidation, ctrl.getSevaSlotsMainCtrl);


router.post('/getsevascountforcalender', rtgsAuth, validateJWT, ctrl.getsevascountforcalenderCtrl);

router.post('/createSevaOrder', rtgsAuth, validateJWT, esevaValidator.createSevaOrder, checkValidation, ctrl.createSevaOrderCtrlOrg);

//prasadam 3


router.post('/getblockdates', validateJWT, ctrl.getblockdatesCtrl);

router.post('/getPrasadameMainData', rtgsAuth, validateJWT, esevaValidator.getPrasadameMainData, checkValidation, ctrl.getPrasadameMainCtrl);

router.post('/createPrasadamOrder', rtgsAuth, validateJWT, esevaValidator.createPrasadamOrder, checkValidation, ctrl.createPrasadamOrderCtrlOrg);

//Tonsure 4 
router.post('/getTonsureMainData', rtgsAuth, validateJWT, esevaValidator.getTonsureMainData, checkValidation, ctrl.getTonsureMainCtrl);

router.post('/createTonsureOrder', rtgsAuth, validateJWT, esevaValidator.createTonsureOrder, checkValidation, ctrl.createTonsureOrderCtrlOrg);

//e-Hundi -5
router.post('/createEhundiOrder', rtgsAuth, validateJWT, esevaValidator.createEhundiOrder, checkValidation, ctrl.createEhundiOrderCtrlOrg);

//Accommodation 6
router.post('/getAccommodationMainData', rtgsAuth, esevaValidator.getAccommodationMainData, checkValidation, ctrl.getAccommodationMainCtrl);

router.post('/getSevaAccommodationMainData', rtgsAuth, esevaValidator.getSevaAccommodationMainData, checkValidation, ctrl.getSevaAccommodationMainCtrl);

router.post('/createAccommodationOrder', rtgsAuth, esevaValidator.createAccommodationOrder, checkValidation, ctrl.createAccommodationOrderCtrl);

router.post('/getTempleInfoData', rtgsAuth, esevaValidator.getTempleInfoData, checkValidation, ctrl.getTempleInfoCtrl);

//---------------------------------------------------------- Darshan And Laddu -------------------------------------------------------



// router.post('/createTonsureOrder', rtgsAuth, validateJWT, esevaValidator.createTonsureOrder, checkValidation, ctrl.createTonsureOrderCtrlOrg);

// //e-Hundi -5
// router.post('/createEhundiOrder', rtgsAuth, validateJWT, esevaValidator.createEhundiOrder, checkValidation, ctrl.createEhundiOrderCtrlOrg);

router.post('/createDarshanandPrasadamOrder', rtgsAuth, validateJWT, ctrl.createDarshanandPrasadamOrderCtrl);


//---------------------------------------------------------- Darshan And Laddu -------------------------------------------------------

router.post('/postrollsdata', validateJWT, ctrl.postrollsdata);

router.post('/rollEndingAlert', validateJWT, ctrl.rollEndingAlert);

//mana mitra apis end

export default router;
