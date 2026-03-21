//import
import { header, body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { preventFormulaInjection } from "../../../utils/formulaInjection.js";
// export function signupValidation(req, res, next) {
//   validationResult(req).isEmpty() ? next() : res.status(400).json({ errors: validationResult(req).array() })
// }
export function checkValidation(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    // Extract only messages
    const errorMessages = errors.array().map(err => err.msg);

    return res.status(400).json({ status: false, errors: errorMessages });
}

export const taskMangerValidator = {
    "postnewtaskData": [
        body('title')
            .trim()
            .notEmpty().withMessage('Title is required')
            .isLength({ min: 2 }).withMessage('Title must be at least 2 characters')
            .customSanitizer(preventFormulaInjection),
        body('description')
            .trim()
            .notEmpty().withMessage('Description is required')
            .isLength({ min: 2 }).withMessage('Description must be at least 2 characters')
            .customSanitizer(preventFormulaInjection),
        body('priority')
            .trim()
            .notEmpty().withMessage('Priority is required')
            .customSanitizer(preventFormulaInjection),
        body('category_id')
            .trim()
            .notEmpty().withMessage('Category Id is required')
            .customSanitizer(preventFormulaInjection),
    ],
    
     "postmeetingData": [
        body('meeting_title')
            .trim()
            .notEmpty().withMessage('Title is required')
            .isLength({ min: 2 }).withMessage('Title must be at least 2 characters')
            .customSanitizer(preventFormulaInjection),
        body('meeting_description')
            .trim()
            .notEmpty().withMessage('Description is required')
            .isLength({ min: 2 }).withMessage('Description must be at least 2 characters')
            .customSanitizer(preventFormulaInjection),
        body('type')
            .trim()
            .notEmpty().withMessage('Type is required')
            .customSanitizer(preventFormulaInjection),
        body('meeting_date')
            .trim()
            .notEmpty().withMessage('Date is required')
            .customSanitizer(preventFormulaInjection),
        body('meeting_start_tm')
            .trim()
            .notEmpty().withMessage('Start Time is required')
            .customSanitizer(preventFormulaInjection),
        body('meeting_end_tm')
            .trim()
            .notEmpty().withMessage('End Time Id is required')
            .customSanitizer(preventFormulaInjection),
            
    ],

    "postnewAppointmentData": [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .customSanitizer(preventFormulaInjection),
        body('category')
            .trim()
            .notEmpty().withMessage('category is required')
            .customSanitizer(preventFormulaInjection),
        body('mobile_no')
            .trim()
            .notEmpty().withMessage('PhoneNumber is required')
            .isLength({ min: 10 }).withMessage('PhoneNumber must be at least 10 characters')
            .isLength({ max: 10 }).withMessage('PhoneNumber must be at most 10 characters')
            .customSanitizer(preventFormulaInjection),
        body('visit_date')
            .trim()
            .notEmpty().withMessage('AppointmentDate is required')
            .customSanitizer(preventFormulaInjection),
        body('visit_time')
            .trim()
            .notEmpty().withMessage('AppointmentTime is required')
            .customSanitizer(preventFormulaInjection),
        body('purpose_visit')
            .trim()
            .notEmpty().withMessage('PurposeOfVisit is required')
            .customSanitizer(preventFormulaInjection),
        body('location')
            .trim()
            .notEmpty().withMessage('Location is required')
            .customSanitizer(preventFormulaInjection)
    ],

    "deleteRow": [
        body('rowId').trim().notEmpty().withMessage('Id is required'),
    ],

    // "createDistrict": [
    //     body('district').trim().notEmpty().withMessage('District is required').isLength({ min: 2 }).withMessage('District must be at least 2 characters'),
    // ],

    // "createUlb": [
    //     body('district_id').trim().notEmpty().withMessage('District Id is required'),
    //     body('mandal_id').trim().notEmpty().withMessage('Mandal Id is required'),
    //     body('village_name').trim().notEmpty().withMessage('Village is required').isLength({ min: 2 }).withMessage('Village must be at least 2 characters'),


    // ],



    // "mandal_listValidator": [
    //     body('district_id')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('District_id is required'),
    //     body('mandal_name')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('Mandal_name is required')
    //         .isLength({ min: 3 })
    //         .withMessage('Mandal_name must be at least 3 characters')
    // ],
    // "temple_registrationValidator": [
    //     body('temple_district_id')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('Temple_district_id is required'),
    //     body('temple_ubl_id')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('temple_ubl_id is required'),
    //     body('temple_mandal_id')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('Temple_mandal_id is required'),
    //     body('temple_name')
    //         .trim()
    //         .notEmpty()
    //         .withMessage('Temple_name is required')
    //         .isLength({ min: 3 })
    //         .withMessage('Temple_name must be at least 3 characters')
    // ]


}
