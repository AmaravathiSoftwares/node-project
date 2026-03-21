import express from 'express';
const mainMastersModuleRoutes = express();
import router from './routes/mainMastersRoutes.js';

mainMastersModuleRoutes.use(router);

export default mainMastersModuleRoutes;