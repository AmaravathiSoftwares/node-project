import express from 'express';
const licenseRoutes = express();
import router from './routes/licenseRoutes.js';

licenseRoutes.use(router);

export default licenseRoutes;