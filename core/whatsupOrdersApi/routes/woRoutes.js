import { Router } from "express";
const router = Router();
import * as ctrl from "../controls/woControls.js";
import { validateJWT } from "../../../utils/jwtUtils.js";

router.post("/getWODarshnamCardsCount", ctrl.getWODarshnamCardsCountCtrl);

router.post("/getWODarshnamdata", ctrl.getWODarshnamdataCtrl);

//darshanam start
// router.post("/getdharshanamdata", validateJWT, ctrl.getdharshanamCtrl);

// router.post("/getDetailsDarshanamByDate", validateJWT, ctrl.getDetailsDarshanamByDateCtrl);

//seva start
router.post("/getSevamoduledata", validateJWT, ctrl.getSevamoduleCtrl);

router.post("/getDetailsSevaByDate", validateJWT, ctrl.getDetailsSevaByDateCtrl);

//prasadam start
router.post("/getPrasadammoduledata", validateJWT, ctrl.getPrasadammoduleCtrl);

router.post("/getDetailsPrasadamByDate", validateJWT, ctrl.getDetailsPrasadamByDateCtrl);

//tonsure start
router.post("/getTonsuremoduledata", validateJWT, ctrl.getTonsuremoduleCtrl);

router.post("/getDetailsTonsureByDate", validateJWT, ctrl.getDetailsTonsureByDateCtrl);

// router.post("/getpaymentresponse", ctrl.getpaymentresponseCtrl);
//donation start
router.post("/getDonationCardsCount", validateJWT, ctrl.getDonationCardsCountCtrl);

router.post("/getDonationDetails", validateJWT, ctrl.getDonationDetailsCtrl);

//prabhas code started

//analysis
router.post("/getanalysiscardsCount", validateJWT, ctrl.getanalysiscardsCountCtrl);

//dharshanam
router.post("/getdharshanamtypecount", validateJWT, ctrl.getdharshanamtypecountCtrl);

router.post("/getnextdharshanamtypecount", validateJWT, ctrl.getnextdharshanamtypecountCtrl);

//Seva
router.post("/getsevatypescount", validateJWT, ctrl.getsevatypescountCtrl);

router.post("/getnextsevendaystypecount", validateJWT, ctrl.getnextsevendaystypecountCtrl);

//Prasadam
router.post("/getprasadamtypecount", validateJWT, ctrl.getprasadamtypecountCtrl);

router.post("/getnextsevendaysprasadam", validateJWT, ctrl.getnextsevendaysprasadamCtrl);

router.post("/getlasttendaysprasadam", validateJWT, ctrl.getlasttendaysprasadamCtrl);

//tonsure
router.post("/gettonsuretypesdata", validateJWT, ctrl.gettonsuretypesdataCtrl);

router.post("/getnextsevendaystonsuretypesdata", validateJWT, ctrl.getnextsevendaystonsuretypesdataCtrl);

//--------------------------------------------------------sankar code ------------------------------------------------------------
//eHundi
router.post("/getnextsevendaysdatesofeHundi", validateJWT, ctrl.getnextsevendaysdatesofeHundiCtrl);

router.post("/totaldonationsofeHundi", validateJWT, ctrl.totaldonationsofeHundiCtrl);

//accommodation
router.post("/getaccommodationdata", validateJWT, ctrl.getaccommodationdataCtrl);

router.post("/getDetailsAccommodationByDate", validateJWT, ctrl.getDetailsAccommodationByDateCtrl);

//analysis page in online orders
router.post("/getRevenuecardsCount", validateJWT, ctrl.getRevenuecardsCountCtrl);

router.post("/getDateWiseAnalysisCount", validateJWT, ctrl.getDateWiseAnalysisCountCtrl);

router.post("/getdharshanamdata", validateJWT, ctrl.getdharshanamCtrl);

router.post("/getDetailsDarshanamByDate", validateJWT, ctrl.getDetailsDarshanamByDateCtrl);

router.post("/geDistrictWiseTemplesdata", validateJWT, ctrl.geDistrictWiseTemplesdataCtrl);

router.post("/getDropdownNewTemplesNames", validateJWT, ctrl.getDropdownNewTemplesNamesCtrl);

router.post("/getalltemplesdataInformation", validateJWT, ctrl.getalltemplesdataInformationCtrl);

router.post("/getalltemplesdataInformationByFilter", validateJWT, ctrl.getalltemplesdataInformationByFilterCtrl);

// ANALYSIS STARTS

// Darshanam Analysis
router.post("/getDarshanamOrderSource", validateJWT, ctrl.getDarshanamOrderSourceCtrl);
router.post("/getCardsData", validateJWT, ctrl.getCardsDataCtrl);
router.post("/getRevenueTrend", validateJWT, ctrl.getRevenueTrendCtrl);

router.post("/paymentStatus", validateJWT, ctrl.getPaymentStatusCtrl);

router.post("/templeperformance", validateJWT, ctrl.getTemplePerformanceCtrl);

router.post("/getDarshanPopularity", validateJWT, ctrl.getDarshanPopularityCtrl);
router.post("/darshanPopularity", validateJWT, ctrl.getDarshanPopularityCtrl);
router.post("/darshanRevenue", validateJWT, ctrl.getDarshanRevenueCtrl);
router.post("/groupSize", validateJWT, ctrl.getGroupSizeCtrl);

// seva analysis
router.post("/getSevaOrderSource", validateJWT, ctrl.getSevaOrderSourceCtrl);
router.post("/getSevaCardsData", validateJWT, ctrl.getSevaCardsDataCtrl);
router.post("/getSevaRevenueTrend", validateJWT, ctrl.getSevaRevenueTrendCtrl);
router.post("/getBookingTrend", validateJWT, ctrl.getBookingTrendCtrl);
router.post("/getTopSevas", validateJWT, ctrl.getTopSevasCtrl);
router.post("/getTempleRevenue", validateJWT, ctrl.getTempleRevenueCtrl);

router.post("/getGenderDistribution", validateJWT, ctrl.getGenderDistributionCtrl);
router.post("/getMonthlyGrowth", validateJWT, ctrl.getMonthlyGrowthCtrl);

// Temple Dropdown
router.post("/getTempleDropdownData", validateJWT, ctrl.getTempleDropdownDataCtrl);

//  13-03-2026
router.post("/getTopTempleRevenue", validateJWT, ctrl.getTopTempleRevenueCtrl);

router.post("/getTempleRevenueShare", validateJWT, ctrl.getTempleRevenueShareCtrl);

router.post("/getMonthlyRevenueTrend", validateJWT, ctrl.getMonthlyRevenueTrendCtrl);

router.post("/getRevenueDistribution", validateJWT, ctrl.getRevenueDistributionCtrl);

router.post("/getTempleInsights", validateJWT, ctrl.getTempleInsightsCtrl);

router.post("/getTemplePerformanceScatter", validateJWT, ctrl.getTemplePerformanceScatterCtrl);

// Prasadam Analysis
router.post("/getOrderSourceDistribution", validateJWT, ctrl.getOrderSourceDistributionCtrl);
router.post("/getPrasadmCardsData", validateJWT, ctrl.getPrasadmCardsDataCtrl);
router.post("/getPrasadamRevenueTrend", validateJWT, ctrl.getPrasadamRevenueTrendCtrl);
router.post("/getTopPrasadam", validateJWT, ctrl.getTopPrasadamCtrl);

router.post("/getPrasadamTempleRevenueShare", validateJWT, ctrl.getPrasadamTempleRevenueShareCtrl);
router.post("/getDailyOrders", validateJWT, ctrl.getDailyOrdersCtrl);

router.post("/getPrasadamRevenueDistribution", validateJWT, ctrl.getPrasadamRevenueDistributionCtrl);

// Tonsure Analysis
router.post("/getTonsureCardsData", validateJWT, ctrl.getTonsureCardsDataCtrl);

router.post("/tonsureDashboardAnalytics", validateJWT, ctrl.tonsureDashboardAnalyticsCtrl);

// Seva Analysis
router.post("/getTopTemplesRevenue", validateJWT, ctrl.getTopTemplesRevenueCtrl);

router.post("/getTopSevasRevenue", validateJWT, ctrl.getTopSevasRevenueCtrl);

// Prasadam analysis
router.post("/getTopTenTemplesRevenue", validateJWT, ctrl.getTopTenTemplesRevenueCtrl);
router.post("/getTopTenPrasadamRevenue", validateJWT, ctrl.getTopTenPrasadamRevenueCtrl);
router.post("/getMonthGrowth", validateJWT, ctrl.getMonthGrowthCtrl);

router.post("/getTopCategorySevas", validateJWT, ctrl.getTopCategorySevasCtrl);

// ANALYSIS ENDS

//consolidated report

router.post("/getConsolidateddata", validateJWT, ctrl.getConsolidateddataCtrl);

//ehundi analysis
// ------------------routes---------------------------
router.post("/getTempleWiseDonations", validateJWT, ctrl.getTempleWiseDonationsCtrl);
router.post("/getTopFiveDonations", validateJWT, ctrl.getTopFiveDonationsCtrl);
router.post("/getLeastFiveDonations", validateJWT, ctrl.getLeastFiveDonationsCtrl);
router.post("/getLast7DaysDonations", validateJWT, ctrl.getLast7DaysDonationsCtrl);
router.post("/getehunicardsAnalysis", validateJWT, ctrl.getehunicardsAnalysisCtrl);
router.post("/getOrderByDonations", validateJWT, ctrl.getOrderByDonationsCtrl);

export default router;
