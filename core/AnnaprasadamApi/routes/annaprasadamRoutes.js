import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/annaprasadamControls.js";

router.post('/annadhanamtotalcount', ctrl.annadhanamtotalcountCtrl);
router.post('/getannaprasadamdata', ctrl.getannaprasadamdataCtrl);



export default router;