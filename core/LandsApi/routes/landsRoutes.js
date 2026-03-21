import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/landsControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { validation, signupValidation } from "../../../config/validators.js";

router.post('/getLandsInfoDistrictWiseReport', validateJWT, ctrl.getLandsInfoDistrictWiseReportCtrl);
router.post('/getLandDetailsDistrictWiseReport', validateJWT, ctrl.getLandDetailsDistrictWiseReportCtrl);

export default router;
