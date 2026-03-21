import express from 'express';
const esevaModuleRoutes = express();
import router from '../esavaApi/routes/esavaRoutes.js';

esevaModuleRoutes.use(router);

export default esevaModuleRoutes;