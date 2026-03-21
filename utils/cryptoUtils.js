// require('dotenv').config();
// const crypto = require('crypto');
// import {ENCRYPTION_KEY,ENCRYPTION_IV} from "../config"

import crypto from 'crypto';
import envs from '../config.js'; //for date formatting
const { ENCRYPTION_KEY, ENCRYPTION_IV } = envs;
// const key = crypto.randomBytes(32).toString('hex');
// // Generate 16-byte (128-bit) IV
// const iv = crypto.randomBytes(16).toString('hex');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(ENCRYPTION_IV, 'hex');

export function encrypt(text) { // for encryption pusrpose 
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
export function decrypt(encryptedText) {// for decryption pusrpose 
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    let maskedAadhar = maskAadhaar(decrypted)
    return { decrypted, maskedAadhar };
};

function maskAadhaar(aadhaar) {
    const clean = aadhaar.replace(/\D/g, '');
    if (clean.length !== 12) return aadhaar;
    return `XXXX-XXXX-${clean.slice(-4)}`;
}