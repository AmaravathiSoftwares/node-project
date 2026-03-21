import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/shopsBuildingsControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";


// sankar code

router.post('/submitShopsDetails',validateJWT,ctrl.submitShopsDetailsCtrl);
router.post('/getshopsandbuildingsdata',validateJWT, ctrl.getshopsandbuildingsdataCtrl);

router.post('/updateShopsDetails',validateJWT, ctrl.updateShopsDetailsCtrl);
router.post('/deleteshopsandbuildingsDetails', validateJWT, ctrl.deleteshopsandbuildingsDetailsCtrl);


export default router;