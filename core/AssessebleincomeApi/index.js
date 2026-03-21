import express from 'express';
const assessembleincomeRoutes = express();
import router from './routes/assessembleincomeRoutes.js';

assessembleincomeRoutes.use(router);

export default assessembleincomeRoutes;