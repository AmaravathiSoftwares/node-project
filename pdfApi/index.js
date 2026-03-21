import { Router } from 'express';
const pdfRouter = Router();
import * as meeitngMdl from '../core/taskMangerApi/meetingApi/models/meetingModels.js'
pdfRouter.get("/meetingpdf/:meetingid", async (req, res) => {

    const { meetingid } = req.params;   

  try {
    const [
        meetingArray
    ] = await Promise.all([
        meeitngMdl.getmomprintMdl(meetingid)
    ])
    
    let formatted = '';
    if (meetingArray[0] && meetingArray[0].meeting_date) {
        var dated = new Date(meetingArray[0].meeting_date);
        formatted = `${dated.getDate().toString().padStart(2, '0')}-${(dated.getMonth()+1).toString().padStart(2, '0')}-${dated.getFullYear()}`;
    }   
    res.render("meeting", {
        formatted:formatted,
        meetingArray : meetingArray
    });

  }catch (e) {    
  }

});

export default pdfRouter;