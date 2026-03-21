//import
import { header, body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
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

export const mMValidator = {
    "department_masterValidator": [
        body('department_nm').trim().notEmpty().withMessage('Department Name is required').isLength({ min: 2 }).withMessage('Department Name must be at least 2 characters')
    ],
    "desginationValidator": [
        body('dept_id').trim().notEmpty().withMessage('Department Id is required'),
        body('designation_nm').trim().notEmpty().withMessage('Designation Name is required').isLength({ min: 2 }).withMessage('Designation Name must be at least 2 characters')
    ],
    "createRole": [
        body('role_type').trim().notEmpty().withMessage('Role Type is required').isLength({ min: 2 }).withMessage('Role Type must be at least 2 characters'),
    ],

    "deleteRow": [
        body('rowId').trim().notEmpty().withMessage('Id is required'),
    ],

    "createDistrict": [
        body('district').trim().notEmpty().withMessage('District is required').isLength({ min: 2 }).withMessage('District must be at least 2 characters'),
    ],

    "createUlb": [
        body('district_id').trim().notEmpty().withMessage('District Id is required'),
        body('mandal_id').trim().notEmpty().withMessage('Mandal Id is required'),
        body('village_name').trim().notEmpty().withMessage('Village is required').isLength({ min: 2 }).withMessage('Village must be at least 2 characters'),


    ],



    "mandal_listValidator": [
        body('district_id')
            .trim()
            .notEmpty()
            .withMessage('District_id is required'),
        body('mandal_name')
            .trim()
            .notEmpty()
            .withMessage('Mandal_name is required')
            .isLength({ min: 3 })
            .withMessage('Mandal_name must be at least 3 characters')
    ],
    "temple_registrationValidator": [
        body('temple_district_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_district_id is required'),
        body('temple_ubl_id')
            .trim()
            .notEmpty()
            .withMessage('temple_ubl_id is required'),
        body('temple_mandal_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_mandal_id is required'),
        body('temple_name')
            .trim()
            .notEmpty()
            .withMessage('Temple_name is required')
            .isLength({ min: 3 })
            .withMessage('Temple_name must be at least 3 characters')
    ],
     "category_masterValidator": [
        body('category_nm')
            .trim()
            .notEmpty()
            .withMessage('Category Name is required'),
        body('category_type')
            .trim()
            .notEmpty()
            .withMessage('Category type is required')
    ], "casetype_masterValidator": [
        body('case_type')
            .trim()
            .notEmpty()
            .withMessage('Case type is required')
    ],
    "categorytype_masterValidator": [
        body('category_type')
            .trim()
            .notEmpty()
            .withMessage('Category type is required')
    ],
    "countertobefiled_masterValidator": [
         body('counter_to_be_filed')
            .trim()
            .notEmpty()
            .withMessage('Counter to be filed is required')
    ],
    "respondentName_masterValidator": [
         body('respodentName')
            .trim()
            .notEmpty()
            .withMessage('Respondent to be filed is required')
    ],
    "section_masterValidator": [
        // body('district_id')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('District id is required'),
        body('section_name')
            .trim()
            .notEmpty()
            .withMessage('Section name is required')
            // .isLength({ min: 3 })
            // .withMessage('Mandal_name must be at least 3 characters')
    ],
    "officer_masterValidator": [
        // body('district_id')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('District id is required'),
        body('officer_nm')
            .trim()
            .notEmpty()
            .withMessage('Officer name is required'),
        body('officer_designation')
            .trim()
            .notEmpty()
            .withMessage('Officer designation is required'),
        body('officer_number')
            .trim()
            .notEmpty()
            .withMessage('Officer number is required'),
            // .isLength({ min: 3 })
            // .withMessage('Mandal_name must be at least 3 characters')
    ],

}

