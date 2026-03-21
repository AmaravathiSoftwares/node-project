import express from 'express';
const jewelleryRoutes = express();
import router from './routes/jewelleryRoutes.js';

jewelleryRoutes.use(router);

export default jewelleryRoutes;