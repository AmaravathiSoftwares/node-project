import express from 'express';
const taskModuleRoutes = express();
import router from './routes/taskRoutes.js';

taskModuleRoutes.use(router);

export default taskModuleRoutes;
