import express from 'express';
const courtcasesModuleRoutes = express();
import router from './routes/courtcasesRoutes.js';

courtcasesModuleRoutes.use(router);

export default courtcasesModuleRoutes;