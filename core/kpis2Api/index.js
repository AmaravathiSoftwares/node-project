import express from 'express';
const kpis2ModuleRoutes = express();
import router from './routes/kpis2Routes.js';

kpis2ModuleRoutes.use(router);

export default kpis2ModuleRoutes;