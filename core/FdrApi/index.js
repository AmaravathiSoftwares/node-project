import express from 'express';
const fdrRoutes = express();
import router from './routes/fdrRoutes.js';

fdrRoutes.use(router);

export default fdrRoutes;