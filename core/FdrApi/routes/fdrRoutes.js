import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/fdrControls.js";

// sankar code 
router.post('/fdrtotalcount', ctrl.fdrtotalcountCtrl);
router.post('/getAllTasks', ctrl.getAllTasksCtrl);

export default router;