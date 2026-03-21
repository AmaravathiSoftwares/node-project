import express from 'express';
const shopsandBuildingsRoutes = express();
import router from './routes/shopsBuildingsRoutes.js';

shopsandBuildingsRoutes.use(router);

export default shopsandBuildingsRoutes;