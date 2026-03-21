import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/taskMasterctrl.js";
// import { verifyToken } from '../../utils/jwtoken.js';
// import { verifyToken } from '../../utils/jwtoken.js';
import { validateJWT } from "../../../../utils/jwtUtils.js";
import { taskMangerValidator, checkValidation } from "../../validators/taskmangervalidators.js"
import authorizeRole  from "../../../../utils/authorizeRole.js";
// authorizeRole('2'),

router.post("/getCategoriesData", validateJWT, ctrl.getCategoriesDataCtrl);
router.post("/getProjectsData", validateJWT, ctrl.getProjectsCtrl);
router.post("/getOfficersData", validateJWT, ctrl.getOfficersData_Ctrl);
router.post("/postnewtaskData", validateJWT, taskMangerValidator.postnewtaskData, checkValidation, ctrl.postnewtaskDataCtrl);

router.post("/viewtasksData", validateJWT, ctrl.viewtasksCtrl);
router.post("/viewtasksPopupData", validateJWT, ctrl.viewtasksPopupCtrl);
router.post("/closeTaskSuperadminData", validateJWT, ctrl.closeTaskSuperadminCtrl);

router.post("/tasksVerificationData", validateJWT, ctrl.tasksVerificationCtrl);
router.post("/closetasksVerificationData", validateJWT, ctrl.closetasksVerificationCtrl);

router.post("/edittasksReportData", validateJWT, ctrl.edittasksReportCtrl);
router.post("/viewtasksSingleIdData", validateJWT, ctrl.viewtasksSingleIdCtrl);
router.post("/edittasksData", validateJWT, ctrl.edittasksCtrl);

router.post("/pendingPriorityCountsData", validateJWT, ctrl.pendingPriorityCountsCtrl);
 router.post("/pendingPriorityDatabK", validateJWT, ctrl.pendingPrioritybkCtrl);

router.post("/actionTakenReportData", validateJWT, ctrl.actionTakenReportCtrl);
router.post("/completedTaskReportData", validateJWT, ctrl.completedTaskReportCtrl);

router.post("/officertasksCountsData", validateJWT, ctrl.officertasksCountsCtrl);
router.post("/officertasksReportData", validateJWT, ctrl.officertasksReportCtrl);
router.post("/updateOfficerTaskData", validateJWT, ctrl.updateOfficerTaskCtrl);

//main task page
router.post("/admintasksCountsData", validateJWT, ctrl.admintasksCountsCtrl);
router.post("/admintasksCountsReportData", validateJWT, ctrl.admintasksCountsReportCtrl);

//personwise analysis start
router.post("/gettaskDepartmentData", validateJWT, ctrl.gettaskDepartmentCtrl);
router.post("/getEmployeesDeptwiseData", validateJWT, ctrl.getEmployeesDeptwiseCtrl);
router.post("/getOfficerwiseCountData", validateJWT, ctrl.getOfficerwiseCountCtrl);
router.post("/getavgresponsegrph", validateJWT, ctrl.getavgresponsegrphCtrl);
router.post("/trgtdateexcededindays", validateJWT, ctrl.trgtdateexcededindaysCtrl);
router.post("/officertaskdtls", validateJWT, ctrl.officertaskdtlsCtrl);
//personwise analysis end 

//task performance & mis-reports start
router.post("/pendingprioritystatus", validateJWT, ctrl.pendingprioritystatusCtrl);
router.post("/getallpendingtasks", validateJWT, ctrl.getallpendingtasksCtrl);
router.post("/getactiontakenrprt", validateJWT, ctrl.getactiontakenrprtCtrl);
router.post("/getcompltedtasksrprt", validateJWT, ctrl.getcompltedtasksrprtCtrl);
//task performance & mis-reports end

//edit tasks data
router.post("/viewtasksDataById", validateJWT, ctrl.viewtasksDataByIdCtrl);
router.post("/updateTaskData", validateJWT, ctrl.updateTaskDataCtrl);
router.post("/deleteTaskData", validateJWT, ctrl.deleteTaskDataCtrl);
router.post("/reassignUserTask", validateJWT, ctrl.reassignUserTaskCtrl);


export default router;
