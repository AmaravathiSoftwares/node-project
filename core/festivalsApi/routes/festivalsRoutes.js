import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/festivalsControls.js";


// sankar code

router.post('/getjccaderdata', ctrl.getjccaderdataCtrl);
router.post('/getdccaderdata', ctrl.getdccaderdataCtrl);
router.post('/getstateleveldata', ctrl.getstateleveldataCtrl);




export default router;