import { Router } from "express";
const router = Router();
import * as ctrl from "../controls/ctrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";

// sankar code


router.post("/getorders", ctrl.getorders);

router.get("/getorders", ctrl.captureOrder);



export default router;
