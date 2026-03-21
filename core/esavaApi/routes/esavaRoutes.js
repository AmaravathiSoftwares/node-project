import { Router } from "express";
const router = Router();
import * as ctrl from "../controls/esavaControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { esevaValidator, checkValidation } from "../validators/esevavalidators.js";
import rtgsAuth from "../middleware/rtgsAuth.js";

//Accommodation

// router.post('/getTempleMaster', validateJWT, ctrl.getTempleMasterCtrl);

router.post(
  "/createeRoomMaster",
  validateJWT,
  esevaValidator.e_room_masterValidator,
  checkValidation,
  ctrl.createeRoomMasterCtrl,
);
router.post("/geteRoomMaster", validateJWT, ctrl.geteRoomMasterCtrl);
router.post(
  "/updateeRoomMaster",
  validateJWT,
  esevaValidator.e_room_masterValidator,
  checkValidation,
  ctrl.updateeRoomMasterCtrl,
);
router.post("/deleteeRoomMaster", validateJWT, ctrl.deleteeRoomMasterCtrl);

// Prasadam
router.post(
  "/createePrasadamMaster",
  validateJWT,
  esevaValidator.e_prasadam_masterValidator,
  checkValidation,
  ctrl.createePrasadamMasterCtrl,
);
router.post("/getePrasadamMaster", validateJWT, ctrl.getePrasadamMasterCtrl);
router.post(
  "/updateePrasadamMaster",
  validateJWT,
  esevaValidator.e_prasadam_masterValidator,
  checkValidation,
  ctrl.updateePrasadamMasterCtrl,
);
router.post("/deleteePrasadamMaster", validateJWT, ctrl.deleteePrasadamMasterCtrl);
//Tonsure
router.post(
  "/createeTonsureMaster",
  validateJWT,
  esevaValidator.e_tonsure_masterValidator,
  checkValidation,
  ctrl.createeTonsureMasterCtrl,
);
router.post("/geteTonsureMaster", validateJWT, ctrl.geteTonsureMasterCtrl);
router.post(
  "/updateeTonsureMaster",
  validateJWT,
  esevaValidator.e_tonsure_masterValidator,
  checkValidation,
  ctrl.updateeTonsureMasterCtrl,
);
router.post("/deleteeTonsureMaster", validateJWT, ctrl.deleteeTonsureMasterCtrl);

//Darshnam
router.post("/getTempleMasters", validateJWT, ctrl.getTempleMastersCtrl);
router.post(
  "/postDarshnamDetails",
  validateJWT,
  esevaValidator.dharshanam,
  checkValidation,
  ctrl.postDarshnamDetailsCtrl,
);
router.post("/getDarshnamDetails", validateJWT, ctrl.getDarshnamDetailsCtrl);
router.post(
  "/editDarshnamDetails",
  validateJWT,
  esevaValidator.editdharshanam,
  checkValidation,
  ctrl.editDarshnamDetailsCtrl,
);
router.post("/deleteDarshnamDetails", validateJWT, ctrl.deleteDarshnamDetailsCtrl);

router.post(
  "/submitSevaMastersDetails",
  validateJWT,
  esevaValidator.seva,
  checkValidation,
  ctrl.submitSevaMastersDetailsCtrl,
);
router.post("/getsevaMastersdata", validateJWT, ctrl.getsevaMastersdataCtrl);

router.post(
  "/editSevaMastersDetails",
  validateJWT,
  esevaValidator.editseva,
  checkValidation,
  ctrl.editSevaMastersDetailsCtrl,
);
router.post("/deleteSevaMastersDetails", validateJWT, ctrl.deleteSevaMastersDetailsCtrl);
router.post("/activeDarshanMastersDetails", validateJWT, ctrl.inactiveDarshanMastersDetailsCtrl);
router.post("/activeSevaMastersDetails", validateJWT, ctrl.inactiveSevaMastersDetailsCtrl);

router.post("/getRoomDetails", validateJWT, ctrl.getRoomDetailsCtrl);

router.post("/getTheSlotDetails", validateJWT, ctrl.getTheSlotDetailsCtrl);

//RGTs Apis
router.post("/getDistricts", rtgsAuth, ctrl.getDistrictsCtrl);
router.post("/getTemples", rtgsAuth, esevaValidator.getTemples, checkValidation, ctrl.getTemplesCtrl);
router.post("/getServicesList", rtgsAuth, esevaValidator.getServicesTypes, checkValidation, ctrl.getServicesListCtrl);

// Darshnam start 1
router.post(
  "/getDarshnamService",
  rtgsAuth,
  esevaValidator.getSelectedService,
  checkValidation,
  ctrl.getDarshnamServiceCtrl,
);
router.post("/getDarshanSlots", rtgsAuth, esevaValidator.getDarshanSlots, checkValidation, ctrl.getDarshanSlotsCtrl);
router.post(
  "/createDarshnamOrder",
  rtgsAuth,
  esevaValidator.e_darshnam_ordersValidator,
  checkValidation,
  ctrl.createeDarshnamOrdersCtrl,
);

router.post("/getCheckboxesData", validateJWT, ctrl.getCheckboxesDataCtrl);
router.post(
  "/updatetempleProfiledata",
  validateJWT,
  esevaValidator.temple_profile,
  checkValidation,
  ctrl.updatetempleProfiledataCtrl,
);

router.post("/activePrasadamMastersDetails", validateJWT, ctrl.inactivePrasadamMastersDetailsCtrl);
router.post("/activeTonsureMastersDetails", validateJWT, ctrl.inactiveTonsureMastersDetailsCtrl);
router.post("/activeAccomodationMastersDetails", validateJWT, ctrl.inactiveAccomodationMastersDetailsCtrl);

router.post("/updateSlotDetails", validateJWT, ctrl.updateSlotDetailsCtrl);
router.post("/getalltemplesdata", validateJWT, ctrl.getalltemplesdataCtrl);

router.post(
  "/editAllTempleProfileDetails",
  validateJWT,
  esevaValidator.all_temple_profile,
  checkValidation,
  ctrl.editAllTempleProfileDetailsCtrl,
);
router.post("/deleteTempleProfileDetails", validateJWT, ctrl.deleteTempleProfileDetailsCtrl);
router.post("/activeTempleProfileDetails", validateJWT, ctrl.activeTempleProfileDetailsCtrl);

router.post("/activeSlotVisibility", validateJWT, ctrl.activeSlotVisibilityCtrl);
router.post("/deleteSlotsSub", validateJWT, ctrl.deleteSlotsSubCtrl);
router.post("/insertSlotDetails", validateJWT, ctrl.insertSlotDetailsCtrl);

//mana mitra apis start

//seva start 2

router.post("/getSevaTypes", rtgsAuth, ctrl.getSevaTypesCtrl);
router.post("/getSevaMainData", rtgsAuth, esevaValidator.getSevaMainData, checkValidation, ctrl.getSevaMainCtrl);
router.post(
  "/getSevaSlotsMainData",
  rtgsAuth,
  esevaValidator.getSevaSlotsMainData,
  checkValidation,
  ctrl.getSevaSlotsMainCtrl,
);
router.post("/createSevaOrder", rtgsAuth, esevaValidator.createSevaOrder, checkValidation, ctrl.createSevaOrderCtrl);
//prasadam 3
router.post(
  "/getPrasadameMainData",
  rtgsAuth,
  esevaValidator.getPrasadameMainData,
  checkValidation,
  ctrl.getPrasadameMainCtrl,
);
router.post("/createPrasadamOrder", rtgsAuth, ctrl.createPrasadamOrderCtrl);

//Tonsure 4
router.post(
  "/getTonsureMainData",
  rtgsAuth,
  esevaValidator.getTonsureMainData,
  checkValidation,
  ctrl.getTonsureMainCtrl,
);
router.post(
  "/createTonsureOrder",
  rtgsAuth,
  esevaValidator.createTonsureOrder,
  checkValidation,
  ctrl.createTonsureOrderCtrl,
);
//e-Hundi -5

router.post(
  "/createEhundiOrder",
  rtgsAuth,
  esevaValidator.createEhundiOrder,
  checkValidation,
  ctrl.createEhundiOrderCtrl,
);
//Accommodation 6
router.post(
  "/getAccommodationMainData",
  rtgsAuth,
  esevaValidator.getAccommodationMainData,
  checkValidation,
  ctrl.getAccommodationMainCtrl,
);
router.post(
  "/getSevaAccommodationMainData",
  rtgsAuth,
  esevaValidator.getSevaAccommodationMainData,
  checkValidation,
  ctrl.getSevaAccommodationMainCtrl,
);
router.post(
  "/createAccommodationOrder",
  rtgsAuth,
  esevaValidator.createAccommodationOrder,
  checkValidation,
  ctrl.createAccommodationOrderCtrl,
);

router.post("/getTempleInfoData", rtgsAuth, esevaValidator.getTempleInfoData, checkValidation, ctrl.getTempleInfoCtrl);

//mana mitra apis end

router.post("/sendTempleMidOtp", validateJWT, ctrl.sendTempleMidOtpCtrl);

router.post("/updateTempleMids", validateJWT, ctrl.updateTempleMidsCtrl);

//Counter  Permsissions

router.post("/geteMastersUserModules", validateJWT, ctrl.geteMastersUserModulesCtrl);

router.post("/eSevaAddUser", validateJWT, esevaValidator.addUserineMasters, checkValidation, ctrl.eSevaAddUserCtrl);

router.post("/activePrasadamcarryforwardDetails", validateJWT, ctrl.activePrasadamcarryforwardDetailsCtrl);

//Department masters
router.post("/getDepartmentMasters", validateJWT, ctrl.getDepartmentMastersCtrl);

router.post("/submitDepartmentDetails", validateJWT, ctrl.submitDepartmentDetailsCtrl);

router.post("/updateDepartmentDetails", validateJWT, ctrl.updateDepartmentDetailsCtrl);

router.post("/deleteDepartmentDetails", validateJWT, ctrl.deleteDepartmentDetailsCtrl);

//counter masters
router.post("/getCounterMasters", validateJWT, ctrl.getCounterMastersCtrl);

router.post("/submitCounterDetails", validateJWT, ctrl.submitCounterDetailsCtrl);

router.post("/updateCounterDetails", validateJWT, ctrl.updateCounterDetailsCtrl);

router.post("/deleteCounterDetails", validateJWT, ctrl.deleteCounterDetailsCtrl);

//shift masters

router.post("/getShiftMasters", validateJWT, ctrl.getShiftMastersCtrl);

router.post("/submitShiftDetails", validateJWT, ctrl.submitShiftDetailsCtrl);

router.post("/updateShiftDetails", validateJWT, ctrl.updateShiftDetailsCtrl);

router.post("/deleteShiftDetails", validateJWT, ctrl.deleteShiftDetailsCtrl);

router.post("/geteMastersUserModules", validateJWT, ctrl.geteMastersUserModulesCtrl);

router.post("/eSevaAddUser", validateJWT, esevaValidator.addUserineMasters, checkValidation, ctrl.eSevaAddUserCtrl);

router.post("/getEsevaUserReport", validateJWT, ctrl.getEsevaUserReportCtrl);

router.post("/updateEsevaUser", validateJWT, ctrl.updateEsevaUserCtrl);

router.post("/deleteEsevaUser", validateJWT, ctrl.deleteEsevaUserCtrl);

router.post("/getCounterDetails", validateJWT, ctrl.getCounterDetailsCtrl);

router.post("/getShiftDetails", validateJWT, ctrl.getShiftDetailsCtrl);

router.post("/getAlertDetails", validateJWT, ctrl.getAlertDetailsCtrl);

//--------------------------------------------------------Add  Temple Wise Users------------------------------------------------------

router.post("/addTemplewiseUsers", validateJWT, ctrl.addTemplewiseUsersCtrl);

router.post("/getTempleWiseUserUserReport", validateJWT, ctrl.getTempleWiseUserUserReportCtrl);

router.post("/updateTempleWiseUsers", validateJWT, ctrl.updateTempleWiseUsersCtrl);

router.post("/deleteTempleWiseUser", validateJWT, ctrl.deleteTempleWiseUserCtrl);

//---------------------------------------------------- OTP 's  Temple MID's  ----------------------------------------------------------

router.post("/sendTwoOtpVerify", validateJWT, ctrl.sendTwoOtpVerify);

router.post("/verifyTwoOtps", validateJWT, ctrl.verifyTwoOtps);

// ----------------temple information whatsapp---------------------------------

router.post("/updatetempleProfileWhatsappdata", validateJWT, checkValidation, ctrl.updatetempleProfileWhatsappdataCtrl);
router.post("/getTempleMasterWhatsapp", validateJWT, ctrl.getTempleMasterWhatsappCtrl);

export default router;
