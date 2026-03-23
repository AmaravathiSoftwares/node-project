//import
import { header, body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { preventFormulaInjection } from "../../../utils/formulaInjection.js";
// export function signupValidation(req, res, next) {
//   validationResult(req).isEmpty() ? next() : res.status(400).json({ errors: validationResult(req).array() })
// }
import moment from "moment-timezone";
export function checkValidation(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    // Extract only messages
    const errorMessages = errors.array().map(err => err.msg);

    return res.status(400).json({ status: false, errors: errorMessages });
}

export const esevaValidator = {

    "e_darshan_masterValidator": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required'),
        body('darshan_name_english')
            .trim()
            .notEmpty()
            .withMessage('Darshan_name_english is required'),
        body('darshan_name_telugu')
            .trim()
            .notEmpty()
            .withMessage('Darshan_name_telugu is required'),
        body('darshan_type')
            .trim()
            .notEmpty()
            .withMessage('Darshan_type is required'),
        body('price')
            .trim()
            .notEmpty()
            .withMessage('Price is required'),
        body('slot_booking_required')
            .trim()
            .notEmpty()
            .withMessage('Slot_booking_required is required'),
        body('dress_code')
            .trim()
            .notEmpty()
            .withMessage('Dress_code is required'),
        body('daily_start_time')
            .trim()
            .notEmpty()
            .withMessage('Daily_start_time is required'),
        body('daily_end_time')
            .trim()
            .notEmpty()
            .withMessage('Daily_end_time is required'),
        body('max_quota_per_slot')
            .trim()
            .notEmpty()
            .withMessage('Max_quota_per_slot is required'),
        body('booking_cutoff_time')
            .trim()
            .notEmpty()
            .withMessage('Booking_cutoff_time is required'),
        body('instructions')
            .trim()
            .notEmpty()
            .withMessage('Instructions is required')
    ],

    "e_room_masterValidator": [
        body('block_name')
            .trim()
            .notEmpty()
            .withMessage('Block Name is required'),
        body('instructions')
            .trim()
            .notEmpty()
            .withMessage('instructions is required'),

    ],
    "dharshanam": [

        body('darshn_eng_nm')
            .trim()
            .notEmpty()
            .withMessage('Darshan English Name is required'),
        body('darshn_tel_nm')
            .trim()
            .notEmpty()
            .withMessage('Darshan Telugu Name is required'),
        body('price')
            .trim()
            .notEmpty()
            .withMessage('price is required'),
        body('instructions')
            .trim()
            .notEmpty()
            .withMessage('instructions is required'),
        body('slot_booking_req')
            .trim()
            .notEmpty()
            .withMessage('slot_booking_req is required'),
    ],
    "seva": [

        body('seva_name_english')
            .trim()
            .notEmpty()
            .withMessage('Seva English Name is required'),
        body('seva_name_telugu')
            .trim()
            .notEmpty()
            .withMessage('Seva Telugu Name is required'),
        body('seva_type')
            .trim()
            .notEmpty()
            .withMessage('Seva Type  is required'),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required')
            .isInt({ gt: 0 })
            .withMessage('Amount must be a positive integer greater than 0')
            .customSanitizer(preventFormulaInjection),
        body('max_persons')
            .trim()
            .notEmpty()
            .withMessage('max_persons is required'),
        body('instructions')
            .trim()
            .notEmpty()
            .withMessage('instructions is required'),
        body('slot_booking_req')
            .trim()
            .notEmpty()
            .withMessage('slot_booking_req is required'),
    ],
    "e_prasadam_masterValidator": [
        // body('temple_id')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Temple_id is required'),
        body('name_in_telugu')
            .trim()
            .notEmpty()
            .withMessage('name_in_telugu is required'),
        body('name_in_english')
            .trim()
            .notEmpty()
            .withMessage('name_in_english is required'),
        body('price')
            .trim()
            .notEmpty()
            .withMessage('price is required'),
        body('max_booking_per_order')
            .trim()
            .notEmpty()
            .withMessage('max_booking_per_order is required'),
        body('from_time')
            .trim()
            .notEmpty()
            .withMessage('from_time is required'),
        body('to_time')
            .trim()
            .notEmpty()
            .withMessage('to_time is required'),
        body('description')
            .trim()
            .notEmpty()
            .withMessage('description is required')
    ],
    "e_tonsure_masterValidator": [
        // body('temple_id')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Temple_id is required'),
        body('name_in_telugu')
            .trim()
            .notEmpty()
            .withMessage('name_in_telugu is required'),
        body('name_in_english')
            .trim()
            .notEmpty()
            .withMessage('name_in_english is required'),
        body('price')
            .trim()
            .notEmpty()
            .withMessage('Price is required'),
        body('daily_start_time')
            .trim()
            .notEmpty()
            .withMessage('Daily_start_time is required'),
        body('daily_end_time')
            .trim()
            .notEmpty()
            .withMessage('Daily_end_time is required'),
        // body('max_capacity_per_slot')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Max_capacity_per_slot is required'),
        // body('dress_code')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Dress_code is required'),
        // body('instructions')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Instructions is required'),
    ],


    "getTemples": [
        body('district_id')
            .trim()
            .notEmpty()
            .withMessage('District is required')
            .isInt({ min: 1, max: 26 })
            .withMessage('Invalid district id')
            .toInt()
            .customSanitizer(preventFormulaInjection),
    ],
    "getServicesTypes": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple is required')
            .customSanitizer(preventFormulaInjection),
    ],
    "getSelectedService": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple  is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),

    ],
    "getDarshanSlots": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple  is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('darshanam_date')
            .trim()
            .notEmpty()
            .withMessage('Date is required')
            .isISO8601()
            .withMessage('Invalid date format (YYYY-MM-DD expected)')
            .custom((value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    throw new Error('Date must be today or a future date');
                }
                return true;
            })
            .customSanitizer(preventFormulaInjection),
        body('darshanam_id')
            .trim()
            .notEmpty()
            .withMessage('Darshanam  is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
    ],

    "e_darshnam_ordersValidator": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('ref_no')
            .trim()
            .notEmpty()
            .withMessage('ref_no is required')
            .isLength({ min: 8, max: 64 })
            .withMessage('ref_no length invalid')
            .matches(/^[A-Za-z0-9_-]+$/)
            .withMessage('ref_no format invalid')
            .customSanitizer(preventFormulaInjection),
        // body('devotee_name')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Devotee_name is required')
        //     .isLength({ min: 2, max: 100 })
        //     .withMessage('Devotee name must be 2–100 characters')
        //     // .matches(/^(?=.*\p{L})[\p{L}\s.,!?'"-]+$/u)
        //     .matches(/^(?=.*\p{L})[\p{L}0-9\s.,!?'"-]+$/u)
        //     .withMessage('Text contains invalid characters')
        //     .customSanitizer(preventFormulaInjection),
        body('no_persons')
            .trim()
            .notEmpty()
            .withMessage('No_persons is required')
            .customSanitizer(preventFormulaInjection),
        body('darshanam_date')
            .trim()
            .notEmpty()
            .withMessage('darshanam_date is required')
            .customSanitizer(preventFormulaInjection),
        body('contact_number')
            .trim()
            .notEmpty()
            .withMessage('Contact_number is required')
            .isLength({ min: 10, max: 10 })
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Invalid mobile number')
            .customSanitizer(preventFormulaInjection),
        body('darshanam_id')
            .trim()
            .notEmpty()
            .withMessage('Darshanam is required')
            .customSanitizer(preventFormulaInjection),
    ],

    "temple_profile": [
        body('name_in_telugu')
            .trim()
            .notEmpty()
            .withMessage('name_in_telugu is required'),
        body('name_in_english')
            .trim()
            .notEmpty()
            .withMessage('name_in_english is required'),
        body('address')
            .trim()
            .notEmpty()
            .withMessage('Address is required'),
        body('information')
            .trim()
            .notEmpty()
            .withMessage('Information is required'),
        body('temple_contact')
            .trim()
            .notEmpty()
            .withMessage('Contact Number is required')
            .isLength({ min: 10, max: 10 })
            .withMessage('Contact Number must be exactly 10 digits')
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Contact Number must start with digits 6–9 and contain only numbers')
    ],

    "editdharshanam": [
        body('darshn_eng_nm')
            .trim()
            .notEmpty()
            .withMessage('Darshan English Name is required'),
        body('darshn_tel_nm')
            .trim()
            .notEmpty()
            .withMessage('Darshan Telugu Name is required'),
        body('price')
            .trim()
            .notEmpty()
            .withMessage('price is required'),
        body('instructions')
            .trim()
            .notEmpty()
            .withMessage('instructions is required')
    ],
    "editseva": [
        body('seva_name_english')
            .trim()
            .notEmpty()
            .withMessage('Seva English Name is required'),
        body('seva_type')
            .trim()
            .notEmpty()
            .withMessage('Seva Type  is required'),
        body('seva_name_telugu')
            .trim()
            .notEmpty()
            .withMessage('Seva Telugu Name is required'),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required'),
        body('max_persons')
            .trim()
            .notEmpty()
            .withMessage('max_persons is required'),
        body('instructions')
            .trim()
            .notEmpty()
            .withMessage('instructions is required'),
    ],
    "all_temple_profile": [
        body('temple_name_telugu')
            .trim()
            .notEmpty()
            .withMessage('temple_name_telugu is required'),
        body('temple_name_english')
            .trim()
            .notEmpty()
            .withMessage('temple_name_english is required'),
        body('address')
            .trim()
            .notEmpty()
            .withMessage('Address is required'),
        body('information')
            .trim()
            .notEmpty()
            .withMessage('Information is required'),
        body('support_number')
            .trim()
            .notEmpty()
            .withMessage('Support Number is required')
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Support Number must be 10 digits and start with 6, 7, 8, or 9'),
        body('email_id')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please enter a valid email address'),

        body('information')
            .trim()
            .notEmpty()
            .withMessage('Information is required'),
    ],
    "getSevaMainData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('seva_type')
            .trim()
            .notEmpty()
            .withMessage('seva_type is required')
            .matches(/^[0-9]+$/)
            .withMessage('seva_type must be numeric')
            .customSanitizer(preventFormulaInjection),
    ],
    "getSevaSlotsMainData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('seva_id')
            .trim()
            .notEmpty()
            .withMessage('seva_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('seva_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        // body('seva_date')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Date is required')
        //     .isISO8601()
        //     .withMessage('Invalid date format (YYYY-MM-DD expected)')
        //     .custom((value) => {
        //         const IST = "Asia/Kolkata";
        //         let dated = moment().tz(IST).format("YYYY-MM-DD");
        //         let selectedDate = moment(value).tz(IST).format("YYYY-MM-DD");
        //         if (selectedDate < dated) {
        //             throw new Error('Date must be today or a future date');
        //         }
        //         return true;
        //     })
        //     .customSanitizer(preventFormulaInjection),
    ],
    "createSevaOrder": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('seva_id')
            .trim()
            .notEmpty()
            .withMessage('seva_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('seva_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('devotee_name')
            .trim()
            .notEmpty()
            .withMessage('Devotee_name is required')
            .isLength({ min: 2, max: 100 })
            .withMessage('Devotee name must be 2–100 characters')
            .matches(/^(?=.*\p{L})[\p{L}0-9\s.,!?'"-]+$/u)
            .withMessage('Text contains invalid characters')
            .customSanitizer(preventFormulaInjection),
        body('seva_date')
            .trim()
            .notEmpty()
            .withMessage('seva_date is required')
            .isISO8601()
            .withMessage('Invalid date format (YYYY-MM-DD expected)')
            .custom((value) => {
                const IST = "Asia/Kolkata";
                let dated = moment().tz(IST).format("YYYY-MM-DD");
                let selectedDate = moment(value).tz(IST).format("YYYY-MM-DD");
                if (selectedDate < dated) {
                    throw new Error('Date must be today or a future date');
                }
                return true;
            })
            .customSanitizer(preventFormulaInjection),
        body('contact_number')
            .trim()
            .notEmpty()
            .withMessage('Contact_number is required')
            .isLength({ min: 10, max: 10 })
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Invalid mobile number')
            .customSanitizer(preventFormulaInjection),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required')
            .isInt({ gt: 0 })
            .withMessage('Amount must be a positive integer greater than 0')
            .customSanitizer(preventFormulaInjection),
        // body('date_of_birth')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('date_of_birth is required')
        //     .customSanitizer(preventFormulaInjection),
        // body('gender')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('gender is required')
        //     .customSanitizer(preventFormulaInjection),
        body('aadhar_no')
            .trim()
            .notEmpty()
            .isLength({ min: 12, max: 12 })
            .withMessage('aadhar_no is required')
            .matches(/^[0-9]+$/)
            .withMessage('aadhar_no must be numeric')
            .customSanitizer(preventFormulaInjection)
    ],
    "getPrasadameMainData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
    ],

    "createPrasadamOrder": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        // body('devotee_name')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Devotee_name is required')
        //     .isLength({ min: 2, max: 100 })
        //     .withMessage('Devotee name must be 2–100 characters')
        //     // .matches(/^(?=.*\p{L})[\p{L}\s.,!?'"-]+$/u)
        //     .matches(/^(?=.*\p{L})[\p{L}0-9\s.,!?'"-]+$/u)
        //     .withMessage('Text contains invalid characters')
        //     .customSanitizer(preventFormulaInjection),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required')
            .isInt({ gt: 0 })
            .withMessage('Amount must be a positive integer greater than 0')
            .customSanitizer(preventFormulaInjection),
        body('contact_number')
            .trim()
            .notEmpty()
            .withMessage('Contact_number is required')
            .isLength({ min: 10, max: 10 })
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Invalid mobile number')
            .customSanitizer(preventFormulaInjection),
    ],

    "getTonsureMainData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
    ],
    "createTonsureOrder": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        // body('tonsure_id')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('tonsure_id is required')
        //     .matches(/^[0-9]+$/)
        //     .withMessage('tonsure_id must be numeric')
        //     .customSanitizer(preventFormulaInjection),
        // body('gender')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('gender is required')
        //     .customSanitizer(preventFormulaInjection),
        // body('devotee_name')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Devotee_name is required')
        //     .isLength({ min: 2, max: 100 })
        //     .withMessage('Devotee name must be 2–100 characters')
        //     .matches(/^(?=.*\p{L})[\p{L}0-9\s.,!?'"-]+$/u)
        //     .withMessage('Text contains invalid characters')
        //     .customSanitizer(preventFormulaInjection),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required')
            .isInt({ gt: 0 })
            .withMessage('Amount must be a positive integer greater than 0')
            .customSanitizer(preventFormulaInjection),
        body('contact_number')
            .trim()
            .notEmpty()
            .withMessage('Contact_number is required')
            .isLength({ min: 10, max: 10 })
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Invalid mobile number')
            .customSanitizer(preventFormulaInjection),
    ],
    "createEhundiOrder": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        // body('devotee_name')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Devotee_name is required')
        //     .isLength({ min: 2, max: 100 })
        //     .withMessage('Devotee name must be 2–100 characters')
        //     .matches(/^(?=.*\p{L})[\p{L}0-9\s.,!?'"-]+$/u)
        //     .withMessage('Text contains invalid characters')
        //     .customSanitizer(preventFormulaInjection),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required')
            .isInt({ gt: 0 })
            .withMessage('Amount must be a positive integer greater than 0')
            .customSanitizer(preventFormulaInjection),
        // body('contact_number')
        //     .trim()
        //     .notEmpty()
        //     .withMessage('Contact_number is required')
        //     .isLength({ min: 10, max: 10 })
        //     .matches(/^[6-9]\d{9}$/)
        //     .withMessage('Invalid mobile number')
        //     .customSanitizer(preventFormulaInjection),
    ],
    "getAccommodationMainData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
    ],
    "getSevaAccommodationMainData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('room_id')
            .trim()
            .notEmpty()
            .withMessage('room_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('room_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('booking_date')
            .trim()
            .notEmpty()
            .withMessage('booking_date is required')
            .isISO8601()
            .withMessage('Invalid date format (YYYY-MM-DD expected)')
            .custom((value) => {
                const IST = "Asia/Kolkata";
                let dated = moment().tz(IST).format("YYYY-MM-DD");
                let selectedDate = moment(value).tz(IST).format("YYYY-MM-DD");
                if (selectedDate < dated) {
                    throw new Error('Date must be today or a future date');
                }
                return true;
            })
            .customSanitizer(preventFormulaInjection),
    ],
    "createAccommodationOrder": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('room_id')
            .trim()
            .notEmpty()
            .withMessage('room_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('room_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('booking_date')
            .trim()
            .notEmpty()
            .withMessage('booking_date is required')
            .isISO8601()
            .withMessage('Invalid date format (YYYY-MM-DD expected)')
            .custom((value) => {
                const IST = "Asia/Kolkata";
                let dated = moment().tz(IST).format("YYYY-MM-DD");
                let selectedDate = moment(value).tz(IST).format("YYYY-MM-DD");
                if (selectedDate < dated) {
                    throw new Error('Date must be today or a future date');
                }
                return true;
            })
            .customSanitizer(preventFormulaInjection),
        body('room_category_id')
            .trim()
            .notEmpty()
            .withMessage('room_category_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('room_category_id must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('aadhar_no')
            .trim()
            .notEmpty()
            .isLength({ min: 12, max: 12 })
            .withMessage('aadhar_no is required')
            .matches(/^[0-9]+$/)
            .withMessage('aadhar_no must be numeric')
            .customSanitizer(preventFormulaInjection),
        body('devotee_name')
            .trim()
            .notEmpty()
            .withMessage('Devotee_name is required')
            .isLength({ min: 2, max: 100 })
            .withMessage('Devotee name must be 2–100 characters')
            // .matches(/^(?=.*\p{L})[\p{L}\s.,!?'"-]+$/u)
            .matches(/^(?=.*\p{L})[\p{L}0-9\s.,!?'"-]+$/u)
            .withMessage('Text contains invalid characters')
            .customSanitizer(preventFormulaInjection),
        body('amount')
            .trim()
            .notEmpty()
            .withMessage('Amount is required')
            .isInt({ gt: 0 })
            .withMessage('Amount must be a positive integer greater than 0')
            .customSanitizer(preventFormulaInjection),
        body('contact_number')
            .trim()
            .notEmpty()
            .withMessage('Contact_number is required')
            .isLength({ min: 10, max: 10 })
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Invalid mobile number')
            .customSanitizer(preventFormulaInjection),

    ],
    "getTempleInfoData": [
        body('temple_id')
            .trim()
            .notEmpty()
            .withMessage('Temple_id is required')
            .matches(/^[0-9]+$/)
            .withMessage('Temple_id must be numeric')
            .customSanitizer(preventFormulaInjection),
    ],


}
