import express from "express";
const AianalyticsRoutes = express();
import router from "../AI-Analytics/routes/aianalyticsRoutes.js";

AianalyticsRoutes.use(router);

export default AianalyticsRoutes;
