import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/assessembleincomeControls.js";


// sankar code

router.post('/assessembleincomecount', ctrl.assessembleincomecountCtrl);
router.post('/getAssembleIncome', ctrl.getAssembleIncomeCtrl);


export default router;