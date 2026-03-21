import express from 'express';
const aptModuleRoutes = express();
import router from './routes/appointmentRoutes.js';

aptModuleRoutes.use(router);

export default aptModuleRoutes;
