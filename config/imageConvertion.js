import multer from "multer";

import { fileURLToPath } from 'url';
import path from 'path';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'E:/xampp/htdocs/img/');
        // cb(null,"../public_html/images/");  //for storing images in c-panel
    },
    filename: function (req, file, cb) {
        // console.log(file,18);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // console.log();
        // console.log(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname));
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname));
    }
})

export const upload = multer({
    storage: storage,
    // limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
    fileFilter: function (req, file, cb) {
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, and GIF files are allowed!'));
        }
        // console.log("allowed type");
        cb(null, true);
    }
});
