import { Router } from 'express';
import * as analysisCtrl from '../controls/analysis.control.js';

//routes
export const analysisroutes = Router()
    .post("/getanalysisdata",analysisCtrl.getanalysisdataCtrl)
    .post("/getlast7days",analysisCtrl.getlast7daysCtrl)
    .post("/getlastalldays",analysisCtrl.getlastalldaysCtrl)


