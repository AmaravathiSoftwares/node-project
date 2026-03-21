import express from 'express';
const publicationsRoutes = express();
import router from './routes/publicationsRoutes.js';

publicationsRoutes.use(router);

export default publicationsRoutes;