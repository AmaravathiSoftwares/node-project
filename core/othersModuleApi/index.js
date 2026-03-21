
import express from 'express';

const othersModuleApiRoutes = express();
import loginRouter from './routes/loginroutes.js';
import usermoduleroutes from './routes/usermoduleroutes.js';
import masterRoutes from './routes/masterroutes.js';


othersModuleApiRoutes.use(loginRouter);
othersModuleApiRoutes.use(usermoduleroutes);
othersModuleApiRoutes.use(masterRoutes);

export default othersModuleApiRoutes;
