import express from 'express';
const analysisModuleRoutes = express();
import router from './routes/analysisRoutes.js';

analysisModuleRoutes.use(router);

export default analysisModuleRoutes;