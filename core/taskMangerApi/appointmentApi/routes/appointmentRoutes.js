import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/appointmentCtrl.js";
// import { verifyToken } from '../../utils/jwtoken.js';
import { validateJWT } from "../../../../utils/jwtUtils.js";
import { taskMangerValidator, checkValidation } from "../../validators/taskmangervalidators.js"


router.post("/postnewAppointmentData", validateJWT,taskMangerValidator.postnewAppointmentData, checkValidation, ctrl.postnewAppointmentCtrl);
router.post("/appointmentReportData", validateJWT, ctrl.appointmentReportCtrl);

router.post("/appointmentEditReportData", validateJWT, ctrl.appointmentEditReportCtrl);
router.post("/editAppointmentData", validateJWT, ctrl.editAppointmentCtrl);

router.post("/allotmentReportData", validateJWT, ctrl.allotmentReportCtrl);
router.post("/visitorReportData", validateJWT, ctrl.visitorReportCtrl);

router.post("/appointmentMisReportCountsData", validateJWT, ctrl.appointmentMisReportCountsCtrl);
router.post("/appointmentMisReportData", validateJWT, ctrl.appointmentMisReportCtrl);

router.post("/appointmentsLastsevenDaysData", validateJWT, ctrl.appointmentsLastsevenDaysCtrl);

router.post("/postAptnewtaskData", validateJWT,taskMangerValidator.postnewtaskData, checkValidation, ctrl.postnewtaskDataCtrl);

router.post("/getVisitorsRepData", validateJWT, ctrl.getVisitorsRepCtrl);


router.post("/getviewAppointmentDataById", validateJWT, ctrl.getviewAppointmentDataByIdCtrl);
router.post("/deleteAppointmentData", validateJWT, ctrl.deleteAppointmentDataCtrl);

export default router;
