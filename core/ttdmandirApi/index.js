import express from 'express';
const ttdmandirroutes = express();
import router from './routes/ttdmandirroutes.js';

ttdmandirroutes.use(router);

export default ttdmandirroutes;