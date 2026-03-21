import * as masterCtrl from '../controls/masterctrl.js';
import express from 'express';
import { validation, signupValidation } from "../../../config/validators.js";
import { apiRateLimiter } from "../../../config/apiratelimiter.js";
const masterRoutes = express.Router();
import fileUpload from '../../../utils/multerUpload.js';

// masters routes


masterRoutes.post('/addmasteruserpersmissions', masterCtrl.addmasteruserpersmissionsCtrl);
masterRoutes.post('/fetchexistingmastermodulesbasedonrole', masterCtrl.fetchexistingMasterModulesBasedOnRoleCtrl);


export default masterRoutes