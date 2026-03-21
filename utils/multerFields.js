export const dynamicMulterFields = (fieldsArray) => {
    console.log();

    return fieldsArray.map(field => ({ name: field, maxCount: 1 }));
};


export const checkImageBlob = (req, res, next) => {
    // Fields that will be checked for image uploads
    const imageFields = ['personImage', 'familyImage', 'householdImage', 'bankBookImage'];
    console.log(req.body.data, 'chekcing');
    // Get the uploaded files from Multer
    const files = req.files || {};
    console.log(files, 'chekcing');

    // Filter fields that contain a file (blob) and store them in req.dynamicImageFields
    req.dynamicImageFields = imageFields.filter(field => files[field]);

    console.log(req.dynamicImageFields, 'feilds');


    // Proceed to the next middleware or route handler
    next();
};