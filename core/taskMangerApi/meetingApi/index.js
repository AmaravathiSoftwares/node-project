import express from 'express';
const meetingModuleRoutes = express();
import router from './routes/meetingRoutes.js';

meetingModuleRoutes.use(router);

export default meetingModuleRoutes;