import express from 'express';
const ttdmandirdashboardroutes = express();
import router from './routes/ttdmandirdashboardroutes.js';

ttdmandirdashboardroutes.use(router);

export default ttdmandirdashboardroutes;