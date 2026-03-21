import jwt from "jsonwebtoken";
import * as mdl from "../core/models/models.js";
export function userAuth(req, res, next) {
    // read thr token from the req cookie
    // validate the token
    //find the user in the databasee

    try {
        const { headers } = req;
        // console.log(headers);
        const auth = headers.authorization ? headers.authorization.split(" ")[1] : null;
        if(!auth){
            throw new error("token is not valid")
        }
        const decodeddata = jwt.verify(auth, "Amvt@1234");
        const { id } = decodeddata;
        
    } catch (error) {

    }

}