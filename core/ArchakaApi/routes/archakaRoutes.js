import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/archakaControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { validation, signupValidation } from "../../../config/validators.js";

router.post('/getAllData', validateJWT, ctrl.getAllDataCtrl);
router.post('/getTableFilterData', validateJWT, ctrl.getTableFilterDataCtrl);
router.post('/getTableData', validateJWT, ctrl.getTableDataCtrl);

// analusis routes
router.post('/getweekdatawise', validateJWT, ctrl.getweekdatawiseCtrl);

router.post('/getusersanalysisData', validateJWT, ctrl.getusersanalysisDataCtrl);

router.post('/getexamanalysis', validateJWT, ctrl.getexamanalysisCtrl);

router.post('/getagewiseanalysis', validateJWT, ctrl.getagewiseanalysisCtrl);

router.post('/getdisitwiseFuntion', validateJWT, ctrl.getdisitwiseFuntionCtrl);

router.post('/getcentdisitwiseFuntion', validateJWT, ctrl.getcentdisitwiseFuntionCtrl);

router.post('/getlanguagess', validateJWT, ctrl.getlanguagessCtrl);

router.post('/accountwiseanalysis', validateJWT, ctrl.accountwiseanalysisCtrl);


export default router;
