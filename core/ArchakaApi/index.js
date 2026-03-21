import express from 'express';
const ArchakaModuleRoutes = express();
import router from '../ArchakaApi/routes/archakaRoutes.js';

ArchakaModuleRoutes.use(router);

export default ArchakaModuleRoutes;