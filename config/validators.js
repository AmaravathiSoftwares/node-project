//import
import { header, body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
// export function signupValidation(req, res, next) {
//   validationResult(req).isEmpty() ? next() : res.status(400).json({ errors: validationResult(req).array() })
// }
export function signupValidation(req, res, next) {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next();
  }

  // Extract only messages
  const errorMessages = errors.array().map(err => err.msg);
  
  return res.status(400).json({status: false, errors: errorMessages });
}

export const validation = {
  "sendotp": [
    body('phonenumber')
      .matches(/^(?:\+91|91)?[6-9][0-9]{9}$/)
      .withMessage('Invalid Details')
      .bail(),
  ],
  "verifyotp": [
    body('phonenumber')
      .matches(/^(?:\+91|91)?[6-9][0-9]{9}$/)
      .withMessage('Invalid Details')
      .bail(),
    body("otpsending")
      .matches(/^\d{6}$/)
      .withMessage("invalid Otp")
      .bail()
  ],
  "getuserpermissionmodules": [
    header('authorization')
      .exists().withMessage('Authorization header is required.')
      .isString().withMessage('Authorization header must be a string.')
      .matches(/^bearer\s([A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+)$/).withMessage('Invalid token format. Must be in "Bearer <token>" format.')
      .custom((value) => {
        const token = value.split(' ')[1];
        try {
          // Verify JWT token
          jwt.verify(token, "Amvt@1234");
          return true; // Valid token
        } catch (err) {
          throw new Error('Invalid or expired JWT token.');
        }
      }),

    // Optionally, validate Content-Type header
    header('content-type')
      .equals('application/json').withMessage('Content-Type must be application/json.')
  ],
  "adduser": [
    header('authorization')
      .exists().withMessage('Authorization header is required.')
      .isString().withMessage('Authorization header must be a string.')
      .matches(/^bearer\s([A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+)$/).withMessage('Invalid token format. Must be in "Bearer <token>" format.')
      .custom((value) => {
        const token = value.split(' ')[1];
        try {
          // Verify JWT token
          jwt.verify(token, "Amvt@1234");
          return true; // Valid token
        } catch (err) {
          throw new Error('Invalid or expired JWT token.');
        }
      }),
    header('content-type')
      .equals('application/json').withMessage('Content-Type must be application/json.')
  ],
  "image": [
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required.' });
      }
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'Only JPEG, PNG, and GIF files are allowed.' });
      }
      next();
    }
  ],
"userAuthentication": [
    body('userName')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
],
    "submitArackaDetails": [
        body('district')
            .notEmpty().withMessage('District is required')
            .isInt({ min: 1 }).withMessage('District must be a valid number'),

        body('temple_nm')
            .trim()
            .notEmpty().withMessage('Temple name is required'),

        body('archaka_name')
            .trim()
            .notEmpty().withMessage('Archaka name is required'),

        body('mobile_no')
            .trim()
            .notEmpty().withMessage('Mobile number is required')
            .isMobilePhone('en-IN').withMessage('Mobile number must be valid'),

        body('aadhaar_number')
            .trim()
            .notEmpty().withMessage('Aadhaar number is required')
            .matches(/^\d{12}$/).withMessage('Aadhaar number must be 12 digits'),

        body('district_name')
            .trim()
            .notEmpty().withMessage('District name is required'),

        body('district_id')
            .notEmpty().withMessage('District ID is required')
            .isInt({ min: 1 }).withMessage('District ID must be a valid number')
    ],
     "submitDDrfArackaDetails": [
        body('district')
            .notEmpty().withMessage('District is required')
            .isInt({ min: 1 }).withMessage('District must be a valid number'),

        body('temple_nm')
            .trim()
            .notEmpty().withMessage('Temple name is required'),

        body('archaka_name')
            .trim()
            .notEmpty().withMessage('Archaka name is required'),

        body('mobile_no')
            .trim()
            .notEmpty().withMessage('Mobile number is required')
            .isMobilePhone('en-IN').withMessage('Mobile number must be valid'),

        body('aadhaar_number')
            .trim()
            .notEmpty().withMessage('Aadhaar number is required')
            .matches(/^\d{12}$/).withMessage('Aadhaar number must be 12 digits'),

        body('district_name')
            .trim()
            .notEmpty().withMessage('District name is required'),

        body('district_id')
            .notEmpty().withMessage('District ID is required')
            .isInt({ min: 1 }).withMessage('District ID must be a valid number')
    ],
    "submitAuevsArackaDetails": [
        body('district')
            .notEmpty().withMessage('District is required')
            .isInt({ min: 1 }).withMessage('District must be a valid number'),

        body('temple_nm')
            .trim()
            .notEmpty().withMessage('Temple name is required'),

        body('archaka_name')
            .trim()
            .notEmpty().withMessage('Archaka name is required'),

        body('mobile_no')
            .trim()
            .notEmpty().withMessage('Mobile number is required')
            .isMobilePhone('en-IN').withMessage('Mobile number must be valid'),

        body('aadhaar_number')
            .trim()
            .notEmpty().withMessage('Aadhaar number is required')
            .matches(/^\d{12}$/).withMessage('Aadhaar number must be 12 digits'),

        body('district_name')
            .trim()
            .notEmpty().withMessage('District name is required'),

        body('district_id')
            .notEmpty().withMessage('District ID is required')
            .isInt({ min: 1 }).withMessage('District ID must be a valid number'),
             body('qualification')
            .trim()
            .notEmpty().withMessage('Qualification is required'),

    ],
"submitCCGFDetails":[
     body('month')
    .trim()
    .notEmpty().withMessage('Month is required'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .custom(value => value > 0).withMessage('Amount must be greater than 0')
    ],
    "submitEngneeringWorksDetails":[
      body('district')
    .notEmpty().withMessage('District is required')
    .isInt({ min: 1 }).withMessage('District must be a valid ID'),

  body('trans_ref_id')
    .trim()
    .notEmpty().withMessage('Transaction reference ID is required'),

  body('temple_nm')
    .trim()
    .notEmpty().withMessage('Temple name is required'),

  body('amount_released')
    .notEmpty().withMessage('Amount released is required')
    .custom(value => value >= 0).withMessage('Amount released must be non-negative'),

  body('ps_charges')
    .notEmpty().withMessage('PS charges are required')
    .custom(value => value >= 0).withMessage('PS charges must be non-negative'),

  body('released_date')
    .notEmpty().withMessage('Released date is required')
    ],
     "online_temple_dataValidator": [
    body('temple_nm')
      .trim()
      .notEmpty()
      .withMessage('Temple name is required')
      .isLength({ min: 3 })
      .withMessage('Temple name must be at least 3 characters')
  ]
    
}
