import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/jewelleryControls.js";

// sankar code 


router.post('/jewellerytotalcount', ctrl.jewellerytotalcountCtrl);
router.post('/getJewellery', ctrl.getJewelleryCtrl);


export default router;