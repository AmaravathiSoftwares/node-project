import { Router } from 'express';
const router = Router();
import * as ctrl from "../controls/mainMastersCtrl.js";
import { validateJWT } from "../../../utils/jwtUtils.js";
import { mMValidator, checkValidation } from "../validators/mainMastervalidators.js"

// strat departmnet
router.post('/createdepartmentMaster', validateJWT, mMValidator.department_masterValidator, checkValidation, ctrl.createdepartmentMasterCtrl);
router.post('/getdepartmentMasters', validateJWT, ctrl.getdepartmentMastersCtrl);
router.post('/updatedepartmentMaster', validateJWT, mMValidator.department_masterValidator, checkValidation, ctrl.updatedepartmentMasterCtrl);
router.post('/deletedepartmentMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deletedepartmentMasterCtrl);
//start desgination
router.post('/createdesgination', validateJWT, mMValidator.desginationValidator, checkValidation, ctrl.createdesginationCtrl);
router.post('/getdesginations', validateJWT, ctrl.getdesginationsCtrl);
router.post('/updatedesgination', validateJWT, mMValidator.desginationValidator, checkValidation, ctrl.updatedesginationCtrl);
router.post('/deletedesgination', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deletedesginationCtrl);

//roles start
router.post('/createRole', validateJWT, mMValidator.createRole, checkValidation, ctrl.createRoleCtrl);
router.post('/getRoles', validateJWT, ctrl.getRolesCtrl);
router.post('/updateRole', validateJWT, mMValidator.createRole, checkValidation, ctrl.updateRoleCtrl);
router.post('/deleteRole', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteRoleCtrl);
// District start
router.post('/createDistrict', validateJWT, mMValidator.createDistrict, checkValidation, ctrl.createDistrictCtrl);
router.post('/getDistricts', validateJWT, ctrl.getDistrictsCtrl);
router.post('/updateDistrict', validateJWT, mMValidator.createDistrict, checkValidation, ctrl.updateDistrictCtrl);
router.post('/deleteDistrict', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteDistrictCtrl);

//Ulb start
router.post('/createUlb', validateJWT, mMValidator.createUlb, checkValidation, ctrl.createUlbCtrl);
router.post('/getUlbs', validateJWT, ctrl.getUlbsCtrl);
router.post('/updateUlb', validateJWT, mMValidator.createUlb, checkValidation, ctrl.updateUlbCtrl);
router.post('/deleteUlb', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteUlbCtrl);

// Mandal list start

router.post('/geDistrictWiseMandalsdata', validateJWT, ctrl.geDistrictWiseMandalsdataCtrl);
router.post('/createmandalList', validateJWT, mMValidator.mandal_listValidator, checkValidation, ctrl.createmandalListCtrl);
router.post('/getmandalLists', validateJWT, ctrl.getmandalListsCtrl);
router.post('/updatemandalList', validateJWT, mMValidator.mandal_listValidator, checkValidation, ctrl.updatemandalListCtrl);
router.post('/deletemandalList', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deletemandalListCtrl);

//temple Registration
router.post('/geMandalWiseVillagesdata', validateJWT, ctrl.geMandalWiseVillagesdataCtrl);
router.post('/createtempleRegistration', validateJWT, ctrl.createtempleRegistrationCtrl);
router.post('/gettempleRegistrations', validateJWT, ctrl.gettempleRegistrationsCtrl);
router.post('/updatetempleRegistration', validateJWT, ctrl.updatetempleRegistrationCtrl);
router.post('/deletetempleRegistration', validateJWT, ctrl.deletetempleRegistrationCtrl);
//categories
router.post('/createcategoryMaster', validateJWT, mMValidator.category_masterValidator, checkValidation, ctrl.createcategoryMasterCtrl);
router.post('/getcategoryMasters', validateJWT, ctrl.getcategoryMastersCtrl);
router.post('/updatecategoryMaster', validateJWT, mMValidator.category_masterValidator, checkValidation, ctrl.updatecategoryMasterCtrl);
router.post('/deletecategoryMaster', validateJWT,mMValidator.deleteRow, checkValidation, ctrl.deletecategoryMasterCtrl);

router.post('/geVillageWiseTemplesdata', validateJWT, ctrl.geVillageWiseTemplesdataCtrl);

router.post('/getcasetypeMasters', validateJWT, ctrl.getCaseTypeDataCtrl);
router.post('/getcasetypeOrderMasters', validateJWT, ctrl.updateCaseTypeOrderCtrl);

router.post('/getCounterToBeFiled', validateJWT,ctrl.getCounterToBeFiledCtrl);
router.post('/getCounterToBeFiledOrderMasters', validateJWT, ctrl.updateCounterToBeFiledOrderCtrl);

router.post('/getCategoryTypeMasters', validateJWT,ctrl.getCategoryTypeCtrl);
router.post('/getcategoryTypeOrderMasters', validateJWT,ctrl.updateCategoryTypeOrderCtrl);

router.post('/getSectionMasters', validateJWT,ctrl.getSectionCtrl);
router.post('/getSectionOrderMasters', validateJWT,ctrl.updateSectionOrderCtrl);

router.post('/getofficerMasters', validateJWT,ctrl.getOfficerNameCtrl)

//Countertobefiled
router.post('/createCounterToBeFiledMaster', validateJWT, mMValidator.countertobefiled_masterValidator, checkValidation, ctrl.createCounterToBeFiledMasterCtrl);
router.post('/updateCounterToBeFiledMaster', validateJWT, mMValidator.countertobefiled_masterValidator, checkValidation, ctrl.updateCounterToBeFiledMasterCtrl);

router.post('/deleteCounterToBeFiledMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteCounterToBeFiledMasterCtrl);

router.post('/createsectionMaster', validateJWT, mMValidator.section_masterValidator, checkValidation, ctrl.createsectionMasterCtrl);

router.post('/updateSectionNameMaster', validateJWT, mMValidator.section_masterValidator, checkValidation, ctrl.updateSectionNameMasterCtrl);

router.post('/deleteSectionNameMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteSectionNameMasterCtrl);

//CaseType
router.post('/createcasetypeMaster', validateJWT, mMValidator.casetype_masterValidator, checkValidation, ctrl.createcasetypeMasterCtrl);
router.post('/updatecasetypeMaster', validateJWT, mMValidator.casetype_masterValidator, checkValidation, ctrl.updatecasetypeMasterCtrl);


router.post('/deletecasetypeMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deletecasetypeMasterCtrl);

//Category type
router.post('/createcategorytypeMaster', validateJWT, mMValidator.categorytype_masterValidator, checkValidation, ctrl.createcategorytypeMasterCtrl);

router.post('/updatecategorytypeMaster', validateJWT, mMValidator.categorytype_masterValidator, checkValidation, ctrl.updatecategorytypeMasterCtrl);

router.post('/deletecategorytypeMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deletecategorytypeMasterCtrl);

//Officer Name
router.post('/createofficerMaster', validateJWT, mMValidator.officer_masterValidator, checkValidation, ctrl.createofficerMasterCtrl);

router.post('/getofficerOrderMasters', validateJWT, ctrl.updateOfficerNameOrderCtrl);

router.post('/updateofficerMaster', validateJWT, mMValidator.officer_masterValidator, checkValidation, ctrl.updateofficerMasterCtrl);



router.post('/deleteofficerMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteofficerMasterCtrl);

// SUDHEER DISTRICT DISPLAY ORDER

router.post('/getDistrictOrderMasters', validateJWT, ctrl.getDistrictOrderMastersCtrl);

router.post('/getDepartmentOrderMasters', validateJWT, ctrl.getDepartmentOrderMastersCtrl);

router.post('/getCategoriesOrderMasters', validateJWT, ctrl.getCategoriesOrderMastersCtrl);

router.post('/getMandalsOrderMasters', validateJWT, ctrl.getMandalsOrderMastersCtrl);

router.post('/getVillageOrderMasters', validateJWT, ctrl.getVillageOrderMastersCtrl);

router.post('/getTempleOrderMasters', validateJWT, ctrl.getTempleOrderMastersCtrl);


router.post('/sections',validateJWT,ctrl.sectionsDataCtrl);
router.post('/ofcrs',validateJWT,ctrl.ofcrsDataCtrl);

router.post('/getrespondentes', validateJWT,ctrl.getrespondentesCtrl)

// 1 DISPLAY ORDER
router.post('/getRespodentOrderMasters', validateJWT, ctrl.updateRespodentOrderMastersCtrl);

//2 GET CALL
router.post('/getRespodents', validateJWT,ctrl.getRespodentsCtrl);

//3 CREATE CALL
router.post('/createRespondentMaster', validateJWT, mMValidator.respondentName_masterValidator, checkValidation, ctrl.createRespondentMasterCtrl);

//4 UPDATE CALL
router.post('/updateRespondentMaster', validateJWT, mMValidator.respondentName_masterValidator, checkValidation, ctrl.updateRespondentMasterCtrl);


//5 DELETE CALL
router.post('/deleteRespondentMaster', validateJWT, mMValidator.deleteRow, checkValidation, ctrl.deleteRespondentMasterCtrl);

router.post('/getDistrictWiseEtemplesdata', validateJWT, ctrl.getDistrictWiseEtemplesdataCtrl);
router.post('/getEtemplesdata', validateJWT, ctrl.getEtemplesdataCtrl);

router.post('/updateAiAnalysisStatus', validateJWT, ctrl.updateAiAnalysisStatusCtrl);

export default router;
