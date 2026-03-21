import express from 'express';
const LandsModuleRoutes = express();
import router from '../LandsApi/routes/landsRoutes.js';

LandsModuleRoutes.use(router);

export default LandsModuleRoutes;