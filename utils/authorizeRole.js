import jwt from 'jsonwebtoken';
import fs from 'fs';
const JWT_TOKEN_EXPIRES_IN = '150m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getprivateKey = resolve(__dirname, '../keys/jwt-private.key');
const getpublicKey = resolve(__dirname, '../keys/jwt-public.key');
const privateKey = fs.readFileSync(getprivateKey, 'utf8');
const publicKey = fs.readFileSync(getpublicKey, 'utf8');
// import * as usermoduleMdl from "../core/othersModuleApi/models/usermodulemodel.js";

const authorizeRole = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    };
    if (!requiredRole.includes(decoded.role)) {
      return res.status(406).json({ message: "Forbidden: Insufficient privileges" });
    }
    next();
  });
};

export default authorizeRole;
