import { Router } from "express";
const router = Router();
import * as ctrl from "../controls/courtcasesCtrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
// import { mMValidator, checkValidation } from "../validators/mainMastervalidators.js"
// import { validate } from 'uuid';

router.post("/getCasesData", validateJWT, ctrl.getCasesDataCtrl);
router.post("/submitCourtCase", validateJWT, ctrl.submitCourtCaseCtrl);
router.post("/getcaseType", validateJWT, ctrl.getcaseTypeCtrl);
router.post("/updateCaseDetails", validateJWT, ctrl.updateCaseDetailsCtrl);
router.post("/deleteCase", validateJWT, ctrl.deleteCaseCtrl);
router.post("/postHearingData", validateJWT, ctrl.postHearingDataCtrl);
router.post("/getanalysisData", validateJWT, ctrl.getanalysisDataCtrl);
router.post("/sectionData", validateJWT, ctrl.sectionDataCtrl);
router.post("/catData", validateJWT, ctrl.categoryDataCtrl);
router.post("/ofcdata", validateJWT, ctrl.ofcDataCtrl);
router.post("/mandals", validateJWT, ctrl.madalsDataCtrl);
router.post("/villages", validateJWT, ctrl.villagesDataCtrl);
router.post("/temple", validateJWT, ctrl.templesDataCtrl);
router.post("/uploadDocuments", validateJWT, ctrl.uploadDocumentsCtrl);
router.post(
  "/getUploadedDocuments",
  validateJWT,
  ctrl.getUploadedDocumentsCtrl
);
router.post(
  "/uniqueCaseNumberCheck",
  validateJWT,
  ctrl.uniqueCaseNumberCheckCtrl
);

// Respondent Wise Report
router.post("/getRespondentData", validateJWT, ctrl.getRespondentDataCtrl);
router.post(
  "/getRespondentCourtCasesData",
  validateJWT,
  ctrl.getRespondentCourtCasesDataCtrl
);

router.post("/getCaseTypes", validateJWT, ctrl.getCaseTypesCtrl);

//
// DISTRICT WISE REPORT
router.post(
  "/getDistrictCourtCasesData",
  validateJWT,
  ctrl.getDistrictCourtCasesDataCtrl
);

// CATEGORY WISE REPORT
router.post(
  "/getCategoryCourtCasesData",
  validateJWT,
  ctrl.getCategoryCourtCasesDataCtrl
);

// SECTION WISE REPORT
router.post(
  "/getSectionCourtCasesData",
  validateJWT,
  ctrl.getSectionCourtCasesDataCtrl
);

// OFFICER WISE REEPORT
router.post(
  "/getOfficerCourtCasesData",
  validateJWT,
  ctrl.getOfficerCourtCasesDataCtrl
);

router.post("/addRespondent", validateJWT, ctrl.addRespondentCtrl);

router.post("/getsectionabsrtract", validateJWT, ctrl.getsectionabsrtractCtrl);

export default router;
