import express from 'express';
const taskMangerApiRoutes = express();


import taskModuleRoutes from "./taskApi/index.js";
import meetingModuleRoutes from "./meetingApi/index.js";
import aptModuleRoutes from "./appointmentApi/index.js";


taskMangerApiRoutes.use(taskModuleRoutes);
taskMangerApiRoutes.use(meetingModuleRoutes);
taskMangerApiRoutes.use(aptModuleRoutes);


export default taskMangerApiRoutes;