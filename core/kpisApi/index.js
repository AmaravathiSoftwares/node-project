import express from 'express';
const kpisModuleRoutes = express();
import router from './routes/kpisRoutes.js';

kpisModuleRoutes.use(router);

export default kpisModuleRoutes;