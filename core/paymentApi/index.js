import express from 'express';
const paymentroutes = express();
import router from './routes/routes.js';

paymentroutes.use(router);

export default paymentroutes;