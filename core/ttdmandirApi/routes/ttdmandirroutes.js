import { Router } from "express";
const router = Router();
import * as ctrl from "../controls/ttdmandirctrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";

// sankar code

router.post("/submitShopsDetails", validateJWT, ctrl.submitShopsDetailsCtrl);
router.post(
  "/getshopsandbuildingsdata",
  validateJWT,
  ctrl.getshopsandbuildingsdataCtrl
);
router.post("/updateShopsDetails", validateJWT, ctrl.updateShopsDetailsCtrl);
router.post(
  "/deleteshopsandbuildingsDetails",
  validateJWT,
  ctrl.deleteshopsandbuildingsDetailsCtrl
);

// <-----------------------------------------Districts--------------------------------------->

router.post("/getdistricts", ctrl.getdistricts);

router.post("/getmandals", ctrl.getmandals);

router.post("/getvillagesbymandalid", ctrl.getvillagesbymandalid);

router.post("/getconstituenciesbydistrictid",ctrl.getconstituenciesbydistrictid);

router.post("/submitttdmandirrequest", ctrl.submitttdmandirrequest);

router.post("/sendOtp", ctrl.sendOtpCtrl);

router.post("/veriftOtp", ctrl.veriftOtpCtrl);

router.post('/getuserdatadetailsamdnumber', ctrl.getuserdatadetailsamdnumber);

router.post('/getusermandirrequests', ctrl.getusermandirrequestsctrl);

export default router;
