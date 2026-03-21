import express from 'express';
const woRoutes = express();
import router from './routes/woRoutes.js';

woRoutes.use(router);

export default woRoutes;