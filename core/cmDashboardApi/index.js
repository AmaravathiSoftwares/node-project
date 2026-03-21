import express from 'express';
const cmDashboardModuleRoutes = express();
import router from './routes/cmDashboardRoutes.js';

cmDashboardModuleRoutes.use(router);

export default cmDashboardModuleRoutes;