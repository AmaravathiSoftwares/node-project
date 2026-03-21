import jwt from 'jsonwebtoken';
import fs from 'fs';
const JWT_TOKEN_EXPIRES_IN = '7d';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getprivateKey = resolve(__dirname, '../keys/jwt-private.key');
const getpublicKey = resolve(__dirname, '../keys/jwt-public.key');
const privateKey = fs.readFileSync(getprivateKey, 'utf8');
const publicKey = fs.readFileSync(getpublicKey, 'utf8');
import * as usermoduleMdl from "../core/othersModuleApi/models/usermodulemodel.js";

export const createAccessToken = (payload) => {// Access token
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: JWT_TOKEN_EXPIRES_IN,
  });
};

export const decodeAccessToken = (jwtToken) => {// Decode  Access token
  return jwt.verify(jwtToken, publicKey, { algorithms: ['RS256'] });
};

export const validateJWT = async (req, res, next) => { // validate  Access token
  const bearerToken = req.headers['authorization'];
  const token = bearerToken?.startsWith('bearer ') ? bearerToken.slice(7) : bearerToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'token is required'
    });
  }

  let decodedPayload;
  try {
    decodedPayload = decodeAccessToken(token);
    console.log(decodedPayload)
    const user = await usermoduleMdl.getUserWithId(decodedPayload.id);
    // console.log(user[0], 'user', decodedPayload)

    if (!user || !user[0]) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    };
    // console.log(user[0]?.login_ind,'Mahi')
     if (user[0]?.login_ind == 0) {
      return res.status(404).json({
        success: false,
        message: 'User is not active.'
      });
    }
    req.user = user[0];
    req.tokenPayload = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Your token expired or is invalid. Please login again!'
    });
  }

};

// Refresh Token authController.js
export const createRefreshToken = (payload) => {// create referesh token
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const decodeRefreshToken = (token) => { // Decode referesh token
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
};

// export const validaterefreshToken = async (req, res, next) => {
export const validaterefreshToken = async (rfToken) => { //  validate Refresh token
  const refreshToken = rfToken;
  if (!refreshToken) {
    return {
      success: false,
      message: 'Refresh token is required'
    };
  }

  let decoded;
  try {
    decoded = decodeRefreshToken(refreshToken);
    const { iat, exp, ...cleanUser } = decoded;
    const newAccessToken = createAccessToken(cleanUser);
    return newAccessToken;
  } catch (err) {
    console.log(err, 'err');
    return {
      success: false,
      message: 'Invalid or expired refresh token'
    };
  }
  // Optional: Verify refresh token exists in DB or Redis and belongs to user
  // const savedToken = await userServicev1.getRefreshToken(decoded.userId);
  // if (!savedToken || savedToken !== refreshToken) {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'Refresh token revoked or invalid'
  //   });
  // }
  // Issue new access token
  // res.json({
  //   accessToken: newAccessToken,
  // });
};