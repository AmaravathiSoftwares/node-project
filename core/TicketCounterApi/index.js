import express from 'express';
const ticketcounterroutes = express();
import router from './routes/ticketcounterroutes.js';

ticketcounterroutes.use(router);

export default ticketcounterroutes;