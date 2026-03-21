
import express from 'express';
const apiRoutes = express();


import othersModuleApiRoutes from "./othersModuleApi/index.js";
import kpisModuleRoutes from "./kpisApi/index.js";
import mainMastersModuleRoutes from "./mainmastersApi/index.js";
import taskMangerApiRoutes from "./taskMangerApi/index.js";
import LandsModuleRoutes from "./LandsApi/index.js";
import cmDashboardModuleRoutes from "./cmDashboardApi/index.js"
import kpis2ModuleRoutes from "./kpis2Api/index.js"
import courtcasesModuleRoutes from "./courtcases/index.js"
import ArchakaModuleRoutes from './ArchakaApi/index.js';
import fdrRoutes from './FdrApi/index.js';
import jewelleryRoutes from './JewelleryApi/index.js';
import publicationsRoutes from './Publications/index.js';
import annaprasadamRoutes from './AnnaprasadamApi/index.js';
import assessembleincomeRoutes from './AssessebleincomeApi/index.js';
import shopsandBuildingsRoutes from './shopsandBuildingsApi/index.js';
import licenseRoutes from './licenseApi/index.js';
import festivalsRoutes from './festivalsApi/index.js';
import ttdmandirRoutes from './ttdmandirApi/index.js';
// imprt ttdmandirRoutes.use("/ttdMandirRoutes", ttdmandirRoutes);
import ttdmandirdashboardRoutes from './ttdmandirdashboardApi/index.js';
import esevaModuleRoutes from './esavaApi/index.js';
import TicketCounterRoutes from './TicketCounterApi/index.js';
import kioskModuleRoutes from './kioskApi/index.js';
import woRoutes from './whatsupOrdersApi/index.js';
import paymentroutes from './paymentApi/index.js';
import AianalyticsRoutes from "./AI-Analytics/index.js";
import archakaDashboardApiRoutes from "./archakaDashboardApi/index.js";
apiRoutes.use("/nodeapp", othersModuleApiRoutes);
apiRoutes.use("/kpisApi", cmDashboardModuleRoutes);
apiRoutes.use("/kpisApi", kpisModuleRoutes);
apiRoutes.use("/MainMastersApi", mainMastersModuleRoutes);

apiRoutes.use("/taskMangerApi", taskMangerApiRoutes);
apiRoutes.use("/landsApi", LandsModuleRoutes);
apiRoutes.use("/kpis2Api", kpis2ModuleRoutes);
apiRoutes.use("/courtcases", courtcasesModuleRoutes);
apiRoutes.use("/ArchakaApi", ArchakaModuleRoutes);

apiRoutes.use("/FdrApi", fdrRoutes);
apiRoutes.use("/JewelleryApi", jewelleryRoutes);
apiRoutes.use("/PublicationsApi", publicationsRoutes);
apiRoutes.use("/AnnaPrasadamApi", annaprasadamRoutes);
apiRoutes.use("/AssessebleIncomeApi", assessembleincomeRoutes);
apiRoutes.use("/shopsandBuildingsApi", shopsandBuildingsRoutes);
apiRoutes.use("/licenseApi", licenseRoutes);
apiRoutes.use("/FestivalsApi", festivalsRoutes);
apiRoutes.use("/ttdmandirApi", ttdmandirRoutes);
apiRoutes.use("/ttdmandirdashboardRoutes", ttdmandirdashboardRoutes);
apiRoutes.use("/esevaApi", esevaModuleRoutes)
apiRoutes.use("/TicketCounterApi", TicketCounterRoutes)
apiRoutes.use("/whatsupOrdersApi", woRoutes)
apiRoutes.use("/PaymentApi", paymentroutes);
apiRoutes.use("/kioskApi", kioskModuleRoutes);
apiRoutes.use("/aianalyticsApi", AianalyticsRoutes);
apiRoutes.use("/archakaDashboardApi", archakaDashboardApiRoutes);
export default apiRoutes;