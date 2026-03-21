import express from 'express';
const annaprasadamRoutes = express();
import router from './routes/annaprasadamRoutes.js';

annaprasadamRoutes.use(router);

export default annaprasadamRoutes;