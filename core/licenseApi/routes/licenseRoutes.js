import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/licenseControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";


// sankar code


router.post('/submitLicenseDetails', validateJWT, ctrl.submitLicenseDetailsCtrl);
router.post('/getLicensedata', validateJWT, ctrl.getLicensedataCtrl);

router.post('/updateLicenseDetails', validateJWT, ctrl.updateLicenseDetailsCtrl);
router.post('/deleteshopsandbuildingsDetails', validateJWT, ctrl.deleteshopsandbuildingsDetailsCtrl);


export default router;