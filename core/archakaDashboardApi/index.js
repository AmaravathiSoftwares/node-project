
import express from 'express';

const archakaDashboardApiRoutes = express();
import archakaDashboardRouter from './routes/archakaDashboardroutes.js';

archakaDashboardApiRoutes.use(archakaDashboardRouter);

export default archakaDashboardApiRoutes;
