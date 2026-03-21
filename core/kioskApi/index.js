import express from 'express';
const kioskModuleRoutes = express();
import router from '../kioskApi/routes/kioskRoutes.js';

kioskModuleRoutes.use(router);

export default kioskModuleRoutes;