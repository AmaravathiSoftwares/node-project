import express from 'express';
const festivalsRoutes = express();
import router from './routes/festivalsRoutes.js';

festivalsRoutes.use(router);

export default festivalsRoutes;