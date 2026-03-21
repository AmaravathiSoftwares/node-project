import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/publicationsControls.js";

// sankar code

router.post('/publicationstotalcount', ctrl.publicationstotalcountCtrl);
router.post('/getPublicationsdata', ctrl.getPublicationsdataCtrl);

export default router;