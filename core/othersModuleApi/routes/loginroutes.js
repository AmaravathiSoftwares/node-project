import { Router } from 'express';
import { validation, signupValidation } from "../../../config/validators.js";
import { apiRateLimiter } from "../../../config/apiratelimiter.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
//routes
const loginRouter = Router();
import * as loginCtrl from '../controls/loginctrl.js';
import { validaterefreshToken } from "../../../utils/jwtUtils.js";


loginRouter.post("/sendotp",apiRateLimiter, validation.sendotp, signupValidation, loginCtrl.sendOtpCtrl);
// loginRouter.post("/sendotpformobile", validation.sendotp, signupValidation, loginCtrl.sendotpformobileCtrl);
loginRouter.post("/verifyotp",apiRateLimiter, validation.verifyotp, signupValidation, loginCtrl.veriftOtpCtrl);
loginRouter.post("/logout",validateJWT, loginCtrl.logoutCtrl);

loginRouter.post("/veriftMobileOtp", signupValidation, loginCtrl.veriftMobileOtpCtrl);
loginRouter.post('/refresh-token', loginCtrl.refreshTokenController);


//Cm Dashboard Api
loginRouter.post("/userAuthentication", validation.userAuthentication, signupValidation, loginCtrl.userAuthenticationCtrl);


export default loginRouter;
