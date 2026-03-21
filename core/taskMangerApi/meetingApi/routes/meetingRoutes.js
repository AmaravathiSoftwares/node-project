import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/meetingMasterctrl.js";
import { taskMangerValidator, checkValidation } from "../../validators/taskmangervalidators.js"
// import { verifyToken } from '../../utils/jwtoken.js';
// import { verifyToken } from '../../utils/jwtoken.js';
import { validateJWT } from "../../../../utils/jwtUtils.js";
router.post("/postMeetingData", validateJWT, taskMangerValidator.postmeetingData, checkValidation, ctrl.postMeetingCtrl);
router.post("/viewMeetingData", validateJWT, ctrl.viewMeetingCtrl);
router.post("/editMeetingData", validateJWT, ctrl.editMeetingCtrl);
router.post("/addMOMMeetingData", validateJWT, ctrl.addMOMMeetingCtrl);

//Notes
router.post('/createuserNotes', validateJWT, ctrl.createuserNotesCtrl);
router.post('/getuserNotess', validateJWT, ctrl.getuserNotessCtrl);
router.post('/updateuserNotes', validateJWT, ctrl.updateuserNotesCtrl);
router.post('/deleteuserNotes', validateJWT, ctrl.deleteuserNotesCtrl);

router.post("/getviewMeetingDataById", validateJWT, ctrl.getviewMeetingDataByIdCtrl);
router.post("/updateMeetingDetails", validateJWT, taskMangerValidator.postmeetingData, checkValidation, ctrl.updateMeetingDetailsCtrl);
router.post("/deleteMeetingData", validateJWT,ctrl.deleteMeetingDataCtrl);

router.post("/openresnedMomPdfMessages", validateJWT, ctrl.openresnedMomPdfMessagesCtrl);

export default router;
