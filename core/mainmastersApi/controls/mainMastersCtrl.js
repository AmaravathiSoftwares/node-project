import * as masterMdl from '../models/mainMastersModels.js';
import fs from 'fs';

//departmant start

export async function createdepartmentMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createdepartmentMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

export async function getdepartmentMastersCtrl(req, res) {
    const data = req.body;
    masterMdl.getdepartmentMastersMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function updatedepartmentMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatedepartmentMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

export async function deletedepartmentMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletedepartmentMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}
// start  desginations

export async function createdesginationCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createdesginationMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

export async function getdesginationsCtrl(req, res) {
    const data = req.body;
    masterMdl.getdesginationsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500,"msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function updatedesginationCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatedesginationMdl(data, function (err, cRes) {
        if (err) {
             res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

export async function deletedesginationCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletedesginationMdl(data, function (err, cRes) {
        if (err) {
             res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}


//roles start
export async function createRoleCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createRoleMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "Role created successfully" });
    });
}

export async function getRolesCtrl(req, res) {
    var data = req.body; // You can add parameters here if needed
    masterMdl.getRolesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
};
export async function updateRoleCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateRoleMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "Role updated successfully" });
    });
};

export async function deleteRoleCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteRoleMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "Role deleted successfully" });
    });
}

// District start
export async function createDistrictCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createDistrictMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "District created successfully" });
    });
}

export async function getDistrictsCtrl(req, res) {
    var data = req.body;
    masterMdl.getDistrictsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function updateDistrictCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateDistrictMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "District updated successfully" });
    });
}

export async function deleteDistrictCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteDistrictMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "District deleted successfully" });
    });
}

//Ulb start
export async function createUlbCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createUlbMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "ULB created successfully" });
    });
}
export async function getUlbsCtrl(req, res) {
    var data = req.body;
    masterMdl.getUlbsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}
export async function updateUlbCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateUlbMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "ULB updated successfully" });
    });
}
export async function deleteUlbCtrl(req, res) {
    var data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteUlbMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "ULB deleted successfully" });
    });
}

//mandal lsit start


export async function geDistrictWiseMandalsdataCtrl(req, res) {
    var data = req.body;
    masterMdl.geDistrictWiseMandalsdataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function createmandalListCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createmandalListMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "msg": "mandal_list created successfully" });
    });
}

export async function getmandalListsCtrl(req, res) {
    const data = req.body;
    masterMdl.getmandalListsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function updatemandalListCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatemandalListMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "mandal_list updated successfully" });
    });
}

export async function deletemandalListCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletemandalListMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "mandal_list deleted successfully" });
    });
}

//templeRegistration start


export async function geMandalWiseVillagesdataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.geMandalWiseVillagesdatamDl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export async function createtempleRegistrationCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createtempleRegistrationMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

export async function gettempleRegistrationsCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    masterMdl.gettempleRegistrationsMdl(data,user, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function updatetempleRegistrationCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatetempleRegistrationMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

export async function deletetempleRegistrationCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletetempleRegistrationMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}
// categories

export async function createcategoryMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createcategoryMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

export async function getcategoryMastersCtrl(req, res) {
    const data = req.body;
    masterMdl.getcategoryMastersMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500,"msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "data": cRes });
    });
}

export async function updatecategoryMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatecategoryMasterMdl(data, function (err, cRes) {
        if (err) {
             res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

export async function deletecategoryMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletecategoryMasterMdl(data, function (err, cRes) {
        if (err) {
             res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}

export async function geVillageWiseTemplesdataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.geVillageWiseTemplesdataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}
//Casetype
export async function createcasetypeMasterCtrl(req, res) {
    console.log('req',req)
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createcasetypeMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}
export async function getCaseTypeDataCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getCasesDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}
export function updateCaseTypeOrderCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.updateCaseTypeOrderMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[updateCaseTypeOrderCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Case type order updated successfully." });
  });
}

export async function updatecasetypeMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatecasetypeMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}
export async function deletecasetypeMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletecasetypeMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}
//Category
export async function createcategorytypeMasterCtrl(req, res) {
    console.log('req',req)
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createcategorytypeMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}
export function getCategoryTypeCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getCategoryTypeMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}
export function updateCategoryTypeOrderCtrl(req, res) {
  const reorderedCategoryTypes = req.body;

  if (!Array.isArray(reorderedCategoryTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.updateCategoryOrderMdl(reorderedCategoryTypes, (err, result) => {
    if (err) {
      console.error("[updateCategoryTypeOrderCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Category order updated successfully." });
  });
}
export async function updatecategorytypeMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updatecategorytypeMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}
export async function deletecategorytypeMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deletecategorytypeMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}
//Counter to be filed
export async function createCounterToBeFiledMasterCtrl(req, res) {
    console.log('req',req)
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createCounterToBeFiledMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}
export function getCounterToBeFiledCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getCounterToBeFiledMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}
export function updateCounterToBeFiledOrderCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.updateCounterToBeFiledOrderMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[updateCounterToBeFiledOrderCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Counter to be filed order updated successfully." });
  });
}
export async function updateCounterToBeFiledMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateCounterToBeFiledMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}
export async function deleteCounterToBeFiledMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteCounterToBeFiledMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}

//Section
export async function createsectionMasterCtrl(req, res) {
    console.log('req',req)
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createsectionMasterrMdl(data, function (err, cRes) {

if(err){

        if (err.code=="DUPLICATE") {

  res.send({status:422,message:"Section name already exists"});
                return;

        }else{
   res.send({ status: 500, "msg": "Server Error" });
            return;
            }
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

export function getSectionCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getSectionMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}
export function updateSectionOrderCtrl(req, res) {
  const reorderedSections = req.body;

  if (!Array.isArray(reorderedSections)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.updatesectionOrderMdl(reorderedSections, (err, result) => {
    if (err) {
      console.error("[updateSectionOrderCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Section order updated successfully." });
  });
}
export async function updateSectionNameMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateSectionNameMasterMdl(data, function (err, cRes) {
        if (err) {


            if(err.code=="DUPLICATE"){
                  res.send({status:422,message:"Section name already exists"});
                return;
            }else{
 res.send({ status: 500, "msg": "Server Error" });
            return;
            }
           
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}
export async function deleteSectionNameMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteSectionNameMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}
//Officer
export async function createofficerMasterCtrl(req, res) {
    console.log('req',req)
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createofficerMasterMdl(data, function (err, cRes) {
           if (err) {


            if(err.code=="DUPLICATE"){
                  res.send({status:422,message:"Officer name already exists"});
                return;
            }else{
 res.send({ status: 500, "msg": "Server Error" });
            return;
            }
           
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}
export function getOfficerNameCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getOfficerNameMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}
export function updateOfficerNameOrderCtrl(req, res) {
  const reorderedSections = req.body;

  if (!Array.isArray(reorderedSections)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.updateOfficerNameOrderMdl(reorderedSections, (err, result) => {
    if (err) {
      console.error("[updateSectionOrderCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Section order updated successfully." });
  });
}
export async function updateofficerMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateofficerMasterMdl(data, function (err, cRes) {
             if (err) {


            if(err.code=="DUPLICATE"){
                  res.send({status:422,message:"Officer name already exists"});
                return;
            }else{
 res.send({ status: 500, "msg": "Server Error" });
            return;
            }
           
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}
export async function deleteofficerMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteofficerMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}

// Sudheer AUG 11 2025

export function getDistrictOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.getDistrictOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[getDistrictOrderMastersCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "getDistrictOrderMastersCtrl order updated successfully." });
  });
}

export function getDepartmentOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.getDepartmentOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[getDepartmentOrderMastersCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "getDepartmentOrderMastersCtrl order updated successfully." });
  });
}

export function getCategoriesOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.getCategoriesOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[getCategoriesOrderMastersCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "getCategoriesOrderMastersCtrl updated successfully." });
  });
}

export function getMandalsOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.getMandalsOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[getMandalsOrderMastersCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Mandal order updated successfully." });
  });
}

export function getVillageOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.getVillageOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[getVillageOrderMastersMdl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "village order updated successfully." });
  });
}

export function getTempleOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.getTempleOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[getTempleOrderMastersMdl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Temple order updated successfully." });
  });
}

// Prabhas
export function sectionsDataCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.sectionsDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export function ofcrsDataCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.ofcrsDataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

export function getrespondentesCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getrespondentesMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

//1 DISPLAY ORDER CALL
export function updateRespodentOrderMastersCtrl(req, res) {
  const reorderedCaseTypes = req.body;

  if (!Array.isArray(reorderedCaseTypes)) {
    return res.status(400).json({ status: 400, msg: 'Request body must be an array.' });
  }

  masterMdl.updateRespodentOrderMastersMdl(reorderedCaseTypes, (err, result) => {
    if (err) {
      console.error("[updateRespodentOrderMastersCtrl] DB error: ", err);
      return res.status(500).json({ status: 500, msg: "A database error occurred." });
    }
    return res.status(200).json({ status: 200, msg: "Respondent order updated successfully." });
  });
}


//2 GET CALL
export function getRespodentsCtrl(req,res) {
     const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.getRespodentsMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, data: cRes });
    });
}

//3 CREATE CALL
export async function createRespondentMasterCtrl(req, res) {
    console.log('req',req)
    const data = req.body;
    let user = req.user;
    data.entry_by = user.id;
    masterMdl.createRespondentMasterMdl(data, function (err, cRes) {
        if (err) {
            if(err.code=='DUPLICATE'){
                res.send({status:422,message:"Respondent name already exists"});
                return;
            }
            else{
   res.send({ status: 500, "msg": "Server Error" });
            return;
            }
         
        }
        res.send({ status: 200, "msg": "created successfully" });
    });
}

//4 UPDATE CALL
export async function updateRespondentMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.updated_by = user.id;
    masterMdl.updateRespondentMasterMdl(data, function (err, cRes) {
        if (err) {

            if(err.code=='DUPLICATE'){
res.send({status:422,message:"Respondent name already exists"})
            }else{
   res.send({ status: 500, "msg": "Server Error" });
            
            }
         return;
        }
        res.send({ status: 200, "msg": "updated successfully" });
    });
}

//5 DELETE CALL
export async function deleteRespondentMasterCtrl(req, res) {
    const data = req.body;
    let user = req.user;
    data.d_by = user.id;
    masterMdl.deleteRespondentMasterMdl(data, function (err, cRes) {
        if (err) {
            res.send({ status: 500, "msg": "Server Error" });
            return;
        }
        res.send({ status: 200, "msg": "deleted successfully" });
    });
}


export async function getDistrictWiseEtemplesdataCtrl(req, res) {
    var data = req.body;
    masterMdl.getDistrictWiseEtemplesdataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function getEtemplesdataCtrl(req, res) {
    var data = req.body;
    masterMdl.getEtemplesdataMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}

export async function updateAiAnalysisStatusCtrl(req, res) {
    var data = req.body;
    masterMdl.updateAiAnalysisStatusMdl(data, function (err, cRes) {
        if (err) {
            res.send({ "status": 500, "msg": "Server Error" });
            return;
        }
        res.send({ "status": 200, "data": cRes });
    });
}