import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection } from '../../../utils/utils.js';
import moment from "moment-timezone";


//department start
export function createdepartmentMasterMdl(data, callback) {
    const cntxtDtls = "in createdepartmentMasterMdl";
    const { department_nm, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO department_master (department_nm,entry_by) VALUES (?,?) ON DUPLICATE KEY UPDATE entry_by = VALUES(entry_by)`;
    let paramsData = [department_nm, entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getdepartmentMastersMdl(data, callback) {
    const cntxtDtls = "in getdepartmentMastersMdl";
    const QRY_TO_EXEC = `SELECT * FROM department_master where d_in=0 order by 	display_number`;
    let paramsData = [];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updatedepartmentMasterMdl(data, callback) {
    const cntxtDtls = "in updatedepartmentMasterMdl";
    const { department_nm, rowId, updated_by } = data;
    const QRY_TO_EXEC = `UPDATE department_master SET department_nm = ?,updated_by=? WHERE id = ?`;
    let paramsData = [department_nm, updated_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletedepartmentMasterMdl(data, callback) {
    const cntxtDtls = "in deletedepartmentMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE department_master  SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
// start  desginations

export function createdesginationMdl(data, callback) {
    const cntxtDtls = "in createdesginationMdl";
    const { dept_id, designation_nm, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO desgination_table (dept_id, designation_nm) VALUES (?, ?)`;
    let paramsData = [dept_id, designation_nm, entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getdesginationsMdl(data, callback) {
    const cntxtDtls = "in getdesginationsMdl";
    const QRY_TO_EXEC = `SELECT de.*,d.department_nm FROM desgination_table as de 
    join department_master as d on d.id = de.dept_id
    where de.d_in=0 and d.d_in=0`;
    let paramsData = [];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updatedesginationMdl(data, callback) {
    const cntxtDtls = "in updatedesginationMdl";
    const { dept_id, designation_nm, updated_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE desgination_table SET dept_id = ?, designation_nm = ?,updated_by=? WHERE id = ?`;
    let paramsData = [dept_id, designation_nm, updated_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletedesginationMdl(data, callback) {
    const cntxtDtls = "in deletedesginationMdl";
    const { d_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE desgination_table  SET d_in = 1,d_by=? WHERE id = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

//roles start
export function createRoleMdl(data, callback) {
    var cntxtDtls = "in createRoleMdl";
    var { role_type, canCreate, canEdit, canDelete, entry_by } = data;
    var QRY_TO_EXEC = `INSERT INTO roles (role_type, canCreate, canEdit, canDelete,entry_by) VALUES (?, ?, ?, ?,?)`;
    let paramsData = [role_type, canCreate, canEdit, canDelete, entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
};
export function getRolesMdl(data, callback) {
    var cntxtDtls = "in getRolesMdl";
    var QRY_TO_EXEC = `SELECT * FROM roles where d_in=0 and id not  in (1,10,11,12,14);`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
};
export function updateRoleMdl(data, callback) {
    var cntxtDtls = "in updateRoleMdl";
    var { role_type, canCreate, canEdit, canDelete, updated_by, rowId } = data;
    var QRY_TO_EXEC = `UPDATE roles SET role_type=?, canCreate = ?, canEdit = ?, canDelete = ?,updated_by=? WHERE id = ?`;
    let paramsData = [role_type, canCreate, canEdit, canDelete, updated_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function deleteRoleMdl(data, callback) {
    var cntxtDtls = "in deleteRoleMdl";
    var { rowId } = data;
    var QRY_TO_EXEC = `UPDATE roles SET d_in=1 WHERE id = ?`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [rowId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [role_type], cntxtDtls);
    }
}
// District start

export function createDistrictMdl(data, callback) {
    var cntxtDtls = "in createDistrictMdl";
    var { district, entry_by } = data;
    var QRY_TO_EXEC = `INSERT INTO districts_data (district_name, entry_by) VALUES (?, ?)`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [district, entry_by], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function getDistrictsMdl(data, callback) {
    var cntxtDtls = "in getDistrictsMdl";
    var QRY_TO_EXEC = `SELECT * FROM districts_data where d_in=0 order by display_number`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function updateDistrictMdl(data, callback) {
    var cntxtDtls = "in updateDistrictMdl";
    var { rowId, district, updated_by } = data;
    var QRY_TO_EXEC = `UPDATE districts_data SET district_name = ?, updated_by = ? WHERE id = ?`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [district, updated_by, rowId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function deleteDistrictMdl(data, callback) {
    var cntxtDtls = "in deleteDistrictMdl";
    var { rowId, d_by } = data;
    var QRY_TO_EXEC = `UPDATE districts_data SET d_in = 1 ,d_by=? WHERE id = ?`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [d_by, rowId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

//ulb start

export function createUlbMdl(data, callback) {
    var cntxtDtls = "in createUlbMdl";
    var { village_name, district_id, mandal_id, entry_by } = data;
    var QRY_TO_EXEC = `INSERT INTO village_data (village_name, district_id,mandal_id, entry_by) VALUES (?, ?, ?,?)`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [village_name, district_id, mandal_id, entry_by], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [village_name, district_id, entry_by], cntxtDtls);
    }
}
export function getUlbsMdl(data, callback) {
    var cntxtDtls = "in getUlbsMdl";
    var QRY_TO_EXEC = `SELECT u.*,d.district_name,m.mandal_name FROM village_data as u 
    join districts_data as d on d.id = u.district_id
    LEFT JOIN mandal_list as m on m.mandal_id= u.mandal_id
    where u.d_in=0 order by u.display_number`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}
export function updateUlbMdl(data, callback) {
    var cntxtDtls = "in updateUlbMdl";
    var { rowId, village_name, district_id, mandal_id, updated_by } = data;
    var QRY_TO_EXEC = `UPDATE village_data SET village_name = ?, district_id = ?,mandal_id=?, updated_by = ? WHERE village_id   = ?`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [village_name, district_id, mandal_id, updated_by, rowId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}
export function deleteUlbMdl(data, callback) {
    var cntxtDtls = "in deleteUlbMdl";
    var { rowId, d_by } = data;
    console.log(rowId, 'rowId');

    var QRY_TO_EXEC = `UPDATE village_data SET d_in = 1,d_by=? WHERE village_id  = ?`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [d_by, rowId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [rowId], cntxtDtls);
    }
}

//Mandal list strat


export function geDistrictWiseMandalsdataMdl(data, callback) {
    var cntxtDtls = "in geDistrictWiseMandalsdataMdl";
    const { district_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM mandal_list  where d_in=0 and district_id =?  order by mandal_name`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [district_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}
export function createmandalListMdl(data, callback) {
    const cntxtDtls = "in createmandalListMdl";
    const QRY_TO_EXEC = `INSERT INTO mandal_list (district_id,mandal_name,entry_by) VALUES (?, ?, ?)`;

    let paramsData = [data.district_id, data.mandal_name, data.entry_by];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getmandalListsMdl(data, callback) {
    const cntxtDtls = "in getmandalListsMdl";
    const QRY_TO_EXEC = `SELECT m.mandal_id,m.mandal_name,m.district_id,d.district_name FROM mandal_list as m 
    join districts_data as d on d.id =m.district_id
    where m.d_in=0 order by m.display_number`;

    let paramsData = [];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updatemandalListMdl(data, callback) {
    const cntxtDtls = "in updatemandalListMdl";
    const { rowId, mandal_name, district_id } = data;
    const QRY_TO_EXEC = `UPDATE mandal_list SET district_id = ?,mandal_name = ? WHERE mandal_id  = ?`;

    let paramsData = [district_id, mandal_name, rowId];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletemandalListMdl(data, callback) {
    const cntxtDtls = "in deletemandalListMdl";
    const { rowId } = data;
    const QRY_TO_EXEC = `UPDATE mandal_list SET d_in = 1 WHERE mandal_id  = ?`;

    let paramsData = [rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

// Temple Registration start
export function geMandalWiseVillagesdatamDl(data, callback) {
    var cntxtDtls = "in geMandalWiseVillagesdatamDl";
    const { mandal_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM village_data  where d_in=0 and mandal_id =?  order by village_name`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [mandal_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}





export function createtempleRegistrationMdl(data, callback) {
    const cntxtDtls = "in createtempleRegistrationMdl";
    const QRY_TO_EXEC = `INSERT INTO temple_registration (temple_district_id, temple_village_id, temple_mandal_id, temple_name,entry_by,class,
inspector) VALUES (?, ?, ?, ?,?,?,?)`;

    let paramsData = [data.district_id, data.village_id, data.mandal_id, data.temple_name, data.entry_by,data.temple_class,data.inspector];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

// export function gettempleRegistrationsMdl(data, user, callback) {
//     const cntxtDtls = "in gettempleRegistrationsMdl";
//     console.log(user);
//     let whereCondition = ``;
//     if (user.role_type == 1) {
//         whereCondition = ``;
//     } else if (user.role_type == 5) {
//         let districts = [];
//         if (user.district_id) {
//             districts = user.district_id.includes(',') ? user.district_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.district_id.trim()}'`];
//         }
//         const inClause = districts.join(',');
//         whereCondition = `and t.temple_district_id in (${inClause})`;
//     } else if (user.role_type == 6) {
//         let temples = [];
//         if (user.temple_id) {
//             temples = user.temple_id.includes(',') ? user.temple_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.temple_id.trim()}'`];
//         }
//         const inClause = temples.join(',');
//         whereCondition = ` and t.temple_id in (${inClause})`;
//     } else {
//         whereCondition = ``;
//     }

//     const page = parseInt(data.page) || 1;
//     const limit = parseInt(data.pageSize) || 50;
//     const offset = (page - 1) * limit;
//     const searchText = data.searchText?.trim() || "";
//     let paramsData = [];
//     let searchParams = [];
//     const countQuery = `SELECT COUNT(*) AS total FROM temple_registration t where t.d_in=0 ${whereCondition};`;
//     // const QRY_TO_EXEC = `SELECT * FROM temple_registration where d_in=0 ${whereCondition} ORDER BY district_name,mandal_name,village_name,temple_name DESC LIMIT ? OFFSET ?`;
//     const QRY_TO_EXEC = `SELECT  t.temple_id,t.temple_district_id,t.temple_mandal_id,t.temple_village_id,t.temple_name,t.tcode,t.class,t.inspector,
//     d.district_name,m.mandal_name,v.village_name FROM  temple_registration t
//     JOIN  districts_data d ON d.id = t.temple_district_id
//     JOIN  mandal_list m ON m.mandal_id = t.temple_mandal_id
//     JOIN  village_data v ON v.village_id = t.temple_village_id
//     WHERE t.d_in =0  ${whereCondition} ORDER BY t.display_number DESC LIMIT ? OFFSET ?`
//     if (callback && typeof callback == "function") {
//         sqlinjection(MySQLConPool, countQuery, paramsData, cntxtDtls, function (err, countResult) {
//             if (err) {
//                 callback(err);
//                 return;
//             }
//             const total = countResult[0]?.total || 0;
//             const totalPages = Math.ceil(total / limit);
//             sqlinjection(MySQLConPool, QRY_TO_EXEC, [...searchParams, limit, offset], cntxtDtls, function (err, results) {
//                 if (err) {
//                     callback(err);
//                     return;
//                 }
//                 callback(null, { total: total, totalPages: totalPages, page: page, limit: limit, data: results });
//             });
//         });
//     } else {
//         return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
//     }
// }

export function gettempleRegistrationsMdl(data, user, callback) {
    const cntxtDtls = "in gettempleRegistrationsMdl";
    console.log(data);
    let whereCondition = ``;
    if (user.role_type == 1) {
        whereCondition = ``;
    } else if (user.role_type == 5) {
        let districts = [];
        if (user.district_id) {
            districts = user.district_id.includes(',') ? user.district_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.district_id.trim()}'`];
        }
        const inClause = districts.join(',');
        whereCondition = `and t.temple_district_id in (${inClause})`;
    } else if (user.role_type == 6) {
        let temples = [];
        if (user.temple_id) {
            temples = user.temple_id.includes(',') ? user.temple_id.split(',').map(w => `'${w.trim()}'`) : [`'${user.temple_id.trim()}'`];
        }
        const inClause = temples.join(',');
        whereCondition = ` and t.temple_id in (${inClause})`;
    } else {
        whereCondition = ``;
    }
    let search_district = ``;
    let search_mandal = ``;
    let search_village = ``;

    if (data.search_district_id) {
        search_district = `and t.temple_district_id = '${data.search_district_id}'`;
    } else {
        search_district = ``;
    };

    if (data.search_mandal_id) {
        search_mandal = `and t.temple_mandal_id = '${data.search_mandal_id}'`;
    } else {
        search_mandal = "";
    };
    if (data.search_village_id) {
        search_village = `and t.temple_village_id = '${data.search_village_id}'`;
    } else {
        search_village = "";
    };

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.pageSize) || 50;
    const offset = (page - 1) * limit;
    const searchText = data.searchText?.trim() || "";
    let paramsData = [];
    let searchParams = [];
    const countQuery = `SELECT COUNT(*) AS total FROM temple_registration t where t.d_in=0 ${whereCondition} ${search_district} ${search_mandal} ${search_village};`;
    // const QRY_TO_EXEC = `SELECT * FROM temple_registration where d_in=0 ${whereCondition} ORDER BY district_name,mandal_name,village_name,temple_name DESC LIMIT ? OFFSET ?`;
    const QRY_TO_EXEC = `SELECT  t.temple_id,t.temple_district_id,t.temple_mandal_id,t.temple_village_id,t.temple_name,t.tcode,t.class,t.inspector,
    d.district_name,m.mandal_name,v.village_name,t.ai_analysis FROM  temple_registration t
    JOIN  districts_data d ON d.id = t.temple_district_id
    JOIN  mandal_list m ON m.mandal_id = t.temple_mandal_id
    JOIN  village_data v ON v.village_id = t.temple_village_id
    WHERE t.d_in =0  ${whereCondition} ${search_district} ${search_mandal} ${search_village} ORDER BY t.display_number DESC LIMIT ? OFFSET ?`
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, countQuery, paramsData, cntxtDtls, function (err, countResult) {
            if (err) {
                callback(err);
                return;
            }
            const total = countResult[0]?.total || 0;
            const totalPages = Math.ceil(total / limit);
            sqlinjection(MySQLConPool, QRY_TO_EXEC, [...searchParams, limit, offset], cntxtDtls, function (err, results) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, { total: total, totalPages: totalPages, page: page, limit: limit, data: results });
            });
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}


export function updatetempleRegistrationMdl(data, callback) {
    const cntxtDtls = "in updatetempleRegistrationMdl";
    const { district_id, village_id, mandal_id, temple_name, updated_by,temple_class,inspector, rowId } = data;
    const QRY_TO_EXEC = `UPDATE temple_registration SET temple_district_id = ?, temple_village_id = ?, temple_mandal_id = ?, temple_name = ?,updated_by=?,class=?,inspector=? WHERE temple_id  = ?`;

    let paramsData = [district_id, village_id, mandal_id, temple_name, updated_by,temple_class,inspector, rowId];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletetempleRegistrationMdl(data, callback) {
    const cntxtDtls = "in deletetempleRegistrationMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE temple_registration  SET d_in = 1,d_by=? WHERE temple_id = ?`;
    console.log(rowId, 'rowId');

    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
// categories

export function createcategoryMasterMdl(data, callback) {
    const cntxtDtls = "in createcategoryMasterMdl";
    const { category_nm, category_type, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO category_master (category_nm, category_type,entry_by) VALUES (?, ?,?)`;

    let paramsData = [category_nm, category_type, entry_by];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getcategoryMastersMdl(data, callback) {
    const cntxtDtls = "in getcategoryMastersMdl";
    const QRY_TO_EXEC = `SELECT * FROM category_master where d_in=0 order by display_number`;

    let paramsData = [];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updatecategoryMasterMdl(data, callback) {
    const cntxtDtls = "in updatecategoryMasterMdl";
    const { category_nm, category_type, updated_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE category_master SET category_nm = ?, category_type = ?,updated_by=? WHERE id = ?`;

    let paramsData = [category_nm, category_type, updated_by, rowId];

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletecategoryMasterMdl(data, callback) {
    const cntxtDtls = "in deletecategoryMasterMdl";
    const { d_by, rowId } = data;
    const QRY_TO_EXEC = `UPDATE category_master  SET d_in = 1,d_by=? WHERE id = ?`;

    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function geVillageWiseTemplesdataMdl(data, callback) {
    var cntxtDtls = "in geVillageWiseTemplesdataMdl";
    const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM temple_registration  where d_in=0 and temple_village_id =?  order by temple_name`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [village_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

//Casetype
export function createcasetypeMasterMdl(data, callback) {
    console.log(data)
    const cntxtDtls = "in createcasetypeMasterMdl";
    const { case_type, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO case_type (case_type, display_order, entry_by, entry_date) VALUES (?, (SELECT IFNULL(MAX(display_order), 0) + 1 FROM case_type as temp),
     ?, CURDATE()) ON DUPLICATE KEY UPDATE entry_by = VALUES(entry_by)`;
    let paramsData = [case_type, entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function getCasesDataMdl(data,callback) {
    var cntxtDtls = "in getCasesDataMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM case_type WHERE d_in=0 ORDER BY display_order ASC `;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function updateCaseTypeOrderMdl(caseTypeData, callback) {
  const cntxtDtls = "in updateCaseTypeOrderMdl";
console.log(634,caseTypeData);

  if (!Array.isArray(caseTypeData) || caseTypeData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < caseTypeData.length; j++) {
    const caseType = caseTypeData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE case_type SET display_order = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function updatecasetypeMasterMdl(data, callback) {
    const cntxtDtls = "in updatecasetypeMasterMdl";
    const { case_type, rowId, updated_by } = data;
    const QRY_TO_EXEC = `UPDATE case_type SET case_type = ?,updated_by=? WHERE id = ?`;
    let paramsData = [case_type, updated_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletecasetypeMasterMdl(data, callback) {
    console.log('del request')
    const cntxtDtls = "in deletecasetypeMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE case_type  SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
//Category
export function createcategorytypeMasterMdl(data, callback) {
    console.log(data)
    const cntxtDtls = "in createcategorytypeMasterMdl";
    const { category_type, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO subject_category (category_type, display_number, entry_by, entry_date) VALUES (?, 
    (SELECT IFNULL(MAX(display_number), 0) + 1 FROM subject_category as temp),
     ?, CURDATE()) ON DUPLICATE KEY UPDATE entry_by = VALUES(entry_by)`;
    let paramsData = [category_type, entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function getCategoryTypeMdl(data, callback) {
    var cntxtDtls = "in getCategoryTypeMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM subject_category WHERE d_in=0 ORDER BY display_number ASC`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function updateCategoryOrderMdl(categoryOrderData, callback) {
  const cntxtDtls = "in updateCategoryOrderMdl";

  if (!Array.isArray(categoryOrderData) || categoryOrderData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < categoryOrderData.length; j++) {
    const categoryType = categoryOrderData[j];
    const newOrder = j; 
    
    const numericId = parseInt(categoryType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE subject_category SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function updatecategorytypeMasterMdl(data, callback) {
    const cntxtDtls = "in updatecategorytypeMasterMdl";
    const { category_type, rowId, updated_by } = data;
    const QRY_TO_EXEC = `UPDATE subject_category SET category_type = ?,updated_by=? WHERE id = ?`;
    let paramsData = [category_type, updated_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function deletecategorytypeMasterMdl(data, callback) {
    console.log('del request')
    const cntxtDtls = "in deletecategorytypeMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE subject_category SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
//counter to be filed
export function createCounterToBeFiledMasterMdl(data, callback) {
    console.log(data)
    const cntxtDtls = "in createCounterToBeFiledMasterMdl";
    const { counter_to_be_filed, entry_by } = data;
    const QRY_TO_EXEC = `INSERT INTO counter_to_be_filed (counter_to_be_filed, display_number, entry_by, entry_date) VALUES (?, 
    (SELECT IFNULL(MAX(display_number), 0) + 1 FROM counter_to_be_filed as temp),
     ?, CURDATE()) ON DUPLICATE KEY UPDATE entry_by = VALUES(entry_by)`;
    let paramsData = [counter_to_be_filed, entry_by];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function getCounterToBeFiledMdl(data, callback) {
    var cntxtDtls = "in getCounterToBeFiledMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM counter_to_be_filed WHERE d_in=0 ORDER BY display_number ASC`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function updateCounterToBeFiledOrderMdl(counterFileData, callback) {
  const cntxtDtls = "in updateCaseTypeOrderMdl";

  if (!Array.isArray(counterFileData) || counterFileData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < counterFileData.length; j++) {
    const caseType = counterFileData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE counter_to_be_filed SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}
export function updateCounterToBeFiledMasterMdl(data, callback) {
    const cntxtDtls = "in updateCounterToBeFiledMasterMdl";
    const { counter_to_be_filed, rowId, updated_by } = data;
    const QRY_TO_EXEC = `UPDATE counter_to_be_filed SET counter_to_be_filed = ?,updated_by=? WHERE id = ?`;
    let paramsData = [counter_to_be_filed, updated_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function deleteCounterToBeFiledMasterMdl(data, callback) {
    console.log('del request')
    const cntxtDtls = "in deleteCounterToBeFiledMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE counter_to_be_filed SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
//Section
export function createsectionMasterrMdl(data, callback) {
    console.log(912, data);
    
    const cntxtDtls = "in createsectionMasterrMdl";
    const { section_name, entry_by } = data;
    
    // First check if section name already exists
    const CHECK_DUPLICATE_QRY = `SELECT id FROM section_tbl WHERE section_name = ?`;
    
    if (callback && typeof callback == "function") {
        // Check for duplicate first
        sqlinjection(MySQLConPool, CHECK_DUPLICATE_QRY, [section_name], cntxtDtls, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            
            // If duplicate found
            if (results && results.length > 0) {
                callback({ code: 'DUPLICATE', message: 'Section name already exists' }, null);
                return;
            }
            
            // If no duplicate, proceed with insertion
            const QRY_TO_EXEC = `INSERT INTO section_tbl 
                (section_name, display_number, entry_by, entry_date) VALUES 
                (?, (SELECT IFNULL(MAX(display_number), 0) + 1 FROM section_tbl as temp), ?, CURDATE())`;
            
            let paramsData = [section_name, entry_by];
            
            sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
                callback(err, results);
            });
        });
    } else {
        // For non-callback version
        const QRY_TO_EXEC = `INSERT INTO section_tbl 
            (section_name, display_number, entry_by, entry_date) VALUES 
            (?, (SELECT IFNULL(MAX(display_number), 0) + 1 FROM section_tbl as temp), ?, CURDATE())`;
        
        let paramsData = [section_name, entry_by];
        
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getSectionMdl(data, callback) {
    var cntxtDtls = "in getSectionMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM section_tbl WHERE d_in=0 ORDER BY display_number ASC`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function updatesectionOrderMdl(sectionOrderData, callback) {
  const cntxtDtls = "in updateCategoryOrderMdl";

  if (!Array.isArray(sectionOrderData) || sectionOrderData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < sectionOrderData.length; j++) {
    const section = sectionOrderData[j];
    const newOrder = j; 
    
    const numericId = parseInt(section.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE section_tbl SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}
export function updateSectionNameMasterMdl(data, callback) {
    console.log(data)
    const cntxtDtls = "in updateSectionNameMasterMdl";
    const { section_name, updated_by, rowId } = data;
    console.log(section_name, rowId, updated_by)
    
    // First check if section name already exists (excluding current row)
    const CHECK_DUPLICATE_QRY = `SELECT id FROM section_tbl WHERE section_name = ? AND id != ?`;
    
    if (callback && typeof callback == "function") {
        // Check for duplicate first
        sqlinjection(MySQLConPool, CHECK_DUPLICATE_QRY, [section_name, rowId], cntxtDtls, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            
            // If duplicate found
            if (results && results.length > 0) {
                callback({ code: 'DUPLICATE', message: 'Section name already exists' }, null);
                return;
            }
            
            // If no duplicate, proceed with update
            const QRY_TO_EXEC = `UPDATE section_tbl 
                SET 
                section_name = ?,
                updated_by = ?,
                updated_date = CURDATE() WHERE id = ?`;
            
            let paramsData = [section_name, updated_by, rowId];
            
            sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
                callback(err, results);
            });
        });
    } else {
        // For non-callback version
        const QRY_TO_EXEC = `UPDATE section_tbl 
            SET 
            section_name = ?,
            updated_by = ?,
            updated_date = CURDATE() WHERE id = ?`;
        
        let paramsData = [section_name, updated_by, rowId];
        
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
export function deleteSectionNameMasterMdl(data, callback) {
    console.log('del request:', data)
    const cntxtDtls = "in deleteSectionNameMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE section_tbl SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}
//Officer ,updateofficerMasterMdl,deleteofficerMasterCtrl
export function createofficerMasterMdl(data, callback) {
    const cntxtDtls = "in createofficerMasterMdl";
    const { officer_nm, officer_number, officer_designation, entry_by } = data;
    
    // First check if officer name already exists
    const CHECK_DUPLICATE_QRY = `SELECT id FROM officers_tbl WHERE officer_nm = ?`;
    
    if (callback && typeof callback == "function") {
        // Check for duplicate first
        sqlinjection(MySQLConPool, CHECK_DUPLICATE_QRY, [officer_nm], cntxtDtls, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            
            // If duplicate found
            if (results && results.length > 0) {
                callback({ code: 'DUPLICATE', message: 'Officer name already exists' }, null);
                return;
            }
            
            // If no duplicate, proceed with insertion
            const QRY_TO_EXEC = `INSERT INTO officers_tbl 
                (officer_nm, officer_number, officer_designation, display_number, entry_by, entry_date) 
                VALUES 
                (?, ?, ?, 
                (SELECT IFNULL(MAX(display_number), 0) + 1 FROM officers_tbl as temp), 
                ?, CURDATE())`;
            
            let paramsData = [officer_nm, officer_number, officer_designation, entry_by];
            
            sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
                callback(err, results);
            });
        });
    } else {
        // For non-callback version
        const QRY_TO_EXEC = `INSERT INTO officers_tbl 
            (officer_nm, officer_number, officer_designation, display_number, entry_by, entry_date) 
            VALUES 
            (?, ?, ?, 
            (SELECT IFNULL(MAX(display_number), 0) + 1 FROM officers_tbl as temp), 
            ?, CURDATE())`;
        
        let paramsData = [officer_nm, officer_number, officer_designation, entry_by];
        
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function updateofficerMasterMdl(data, callback) {
    console.log(data)
    const cntxtDtls = "in updateofficerMasterMdl";
    const { officer_nm, officer_number, officer_designation, updated_by, rowId } = data;
    console.log(officer_nm, officer_number, officer_designation, rowId, updated_by)
    
    // First check if officer name already exists (excluding current row)
    const CHECK_DUPLICATE_QRY = `SELECT id FROM officers_tbl WHERE officer_nm = ? AND id != ?`;
    
    if (callback && typeof callback == "function") {
        // Check for duplicate first
        sqlinjection(MySQLConPool, CHECK_DUPLICATE_QRY, [officer_nm, rowId], cntxtDtls, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            
            // If duplicate found
            if (results && results.length > 0) {
                callback({ code: 'DUPLICATE', message: 'Officer name already exists' }, null);
                return;
            }
            
            // If no duplicate, proceed with update
            const QRY_TO_EXEC = `UPDATE officers_tbl 
                SET 
                officer_nm = ?,
                officer_number = ?,
                officer_designation = ?,
                updated_by = ?,
                updated_date = CURDATE() WHERE id = ?`;
            
            let paramsData = [officer_nm, officer_number, officer_designation, updated_by, rowId];
            
            sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
                callback(err, results);
            });
        });
    } else {
        // For non-callback version
        const QRY_TO_EXEC = `UPDATE officers_tbl 
            SET 
            officer_nm = ?,
            officer_number = ?,
            officer_designation = ?,
            updated_by = ?,
            updated_date = CURDATE() WHERE id = ?`;
        
        let paramsData = [officer_nm, officer_number, officer_designation, updated_by, rowId];
        
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getOfficerNameMdl(data, callback) {
    var cntxtDtls = "in getOfficerNameMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM officers_tbl WHERE d_in=0 ORDER BY display_number ASC`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}
export function updateOfficerNameOrderMdl(sectionOrderData, callback) {
  const cntxtDtls = "in updateOfficerNameOrderMdl";

  if (!Array.isArray(sectionOrderData) || sectionOrderData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < sectionOrderData.length; j++) {
    const section = sectionOrderData[j];
    const newOrder = j; 
    
    const numericId = parseInt(section.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE officers_tbl SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}
export function deleteofficerMasterMdl(data, callback) {
    console.log('del request:', data)
    const cntxtDtls = "in deleteofficerMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE officers_tbl SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

// SUdheer AUG 11 2025

export function getDistrictOrderMastersMdl(counterFileData, callback) {
  const cntxtDtls = "in getDistrictOrderMastersMdl";

  if (!Array.isArray(counterFileData) || counterFileData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < counterFileData.length; j++) {
    const caseType = counterFileData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE districts_data SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function getDepartmentOrderMastersMdl(counterFileData, callback) {
  const cntxtDtls = "in getDepartmentOrderMastersMdl";

  if (!Array.isArray(counterFileData) || counterFileData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < counterFileData.length; j++) {
    const caseType = counterFileData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE department_master SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function getCategoriesOrderMastersMdl(counterFileData, callback) {
  const cntxtDtls = "in getDepartmentOrderMastersMdl";
console.log(counterFileData,1243);
  if (!Array.isArray(counterFileData) || counterFileData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < counterFileData.length; j++) {
    const caseType = counterFileData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE category_master SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function getMandalsOrderMastersMdl(counterFileData, callback) {
  const cntxtDtls = "in getMandalsOrderMastersMdl";


console.log(counterFileData,1283);



  if (!Array.isArray(counterFileData) || counterFileData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < counterFileData.length; j++) {
    const caseType = counterFileData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);
// console.log(numericId,numericOrder);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE mandal_list SET display_number = ${numericOrder} WHERE mandal_id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
      console.log(SUB_QRY_TO_EXEC);
      
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function getVillageOrderMastersMdl(villageData, callback) {
  const cntxtDtls = "in getMandalsOrderMastersMdl";


console.log(villageData,1283);



  if (!Array.isArray(villageData) || villageData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < villageData.length; j++) {
    const caseType = villageData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);
// console.log(numericId,numericOrder);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE village_data SET display_number = ${numericOrder} WHERE village_id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
      console.log(SUB_QRY_TO_EXEC);
      
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

export function getTempleOrderMastersMdl(templeData, callback) {
  const cntxtDtls = "in getTempleOrderMastersMdl";


console.log(templeData,1283);



  if (!Array.isArray(templeData) || templeData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < templeData.length; j++) {
    const caseType = templeData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);
console.log(numericId,numericOrder);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE temple_registration SET display_number = ${numericOrder} WHERE temple_id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
      console.log(SUB_QRY_TO_EXEC);
      
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

// PRABHAS
export function sectionsDataMdl(data, callback) {
    var cntxtDtls = "in getSectionMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM section_tbl WHERE d_in=0 Order BY display_number`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC,[], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}


    export function ofcrsDataMdl(data, callback) {
    var cntxtDtls = "in ofcrsgetSectionMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM officers_tbl WHERE d_in=0 ORDER BY display_number`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC,[], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function getrespondentesMdl(data, callback) {
    var cntxtDtls = "in getOfficerNameMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM  respondents_tbl WHERE d_in=0 ORDER BY display_number ASC`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}


//1 DISPLAY ORDER CALL
export function updateRespodentOrderMastersMdl(counterFileData, callback) {
  const cntxtDtls = "in updateCaseTypeOrderMdl";

  if (!Array.isArray(counterFileData) || counterFileData.length === 0) {
    return callback(null, { message: "No case types to reorder." });
  }

  let QRY_TO_EXEC = '';

  for (let j = 0; j < counterFileData.length; j++) {
    const caseType = counterFileData[j];
    const newOrder = j; 
    
    const numericId = parseInt(caseType.id, 10);
    const numericOrder = parseInt(newOrder, 10);

    if (!isNaN(numericId) && !isNaN(numericOrder)) {
      const SUB_QRY_TO_EXEC = `UPDATE respondents_tbl SET display_number = ${numericOrder} WHERE id = ${numericId};`;
      QRY_TO_EXEC += SUB_QRY_TO_EXEC;
    }
  }

  if (QRY_TO_EXEC === '') {
    return callback(null, { message: "No valid data to process." });
  }

  console.log("Executing Batch Query:", QRY_TO_EXEC);

  if (callback && typeof callback === "function") {
    sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls, function (err, results) { // No parameters needed here
      if (err) {
        console.error(`[${cntxtDtls}] DB error:`, err);
        return callback(err);
      }
      callback(null, results);
    });
  } else {
    return sqlinjection(MySQLConPool, QRY_TO_EXEC, null, cntxtDtls);
  }
}

//2 GET CALL
export function getRespodentsMdl(data, callback) {
    var cntxtDtls = "in getRespodentsMdl";
    // const { village_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM  respondents_tbl WHERE d_in=0 ORDER BY display_number ASC`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

//3 CREATE CALL
export function createRespondentMasterMdl(data, callback) {
    console.log(data)
    const cntxtDtls = "in createRespondentMasterMdl";
    const { respodentName, entry_by } = data;
    
    // First check if respondent name already exists
    const CHECK_DUPLICATE_QRY = `SELECT id FROM respondents_tbl WHERE officer_nm = ?`;
    
    if (callback && typeof callback == "function") {
        // Check for duplicate first
        sqlinjection(MySQLConPool, CHECK_DUPLICATE_QRY, [respodentName], cntxtDtls, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            
            // If duplicate found
            if (results && results.length > 0) {
                callback({ code: 'DUPLICATE', message: 'Respondent name already exists' }, null);
                return;
            }
            
            // If no duplicate, proceed with insertion
            const QRY_TO_EXEC = `INSERT INTO respondents_tbl (officer_nm, display_number, entry_by) VALUES (?, 
                (SELECT IFNULL(MAX(display_number), 0) + 1 FROM respondents_tbl as temp),
                ?)`;
            let paramsData = [respodentName, entry_by];
            
            sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
                callback(err, results);
            });
        });
    } else {
        // For non-callback version (you might need to handle this differently)
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

//4 UPDATE CALL
export function updateRespondentMasterMdl(data, callback) {
    const cntxtDtls = "in updateRespondentMasterMdl";
    const { respodentName, rowId, updated_by } = data;
    console.log(data, 923);
    
    // First check if respondent name already exists in other records
    const CHECK_DUPLICATE_QRY = `SELECT id FROM respondents_tbl WHERE officer_nm = ? AND id != ?`;
    
    if (callback && typeof callback == "function") {
        // Check for duplicate first (excluding current record)
        sqlinjection(MySQLConPool, CHECK_DUPLICATE_QRY, [respodentName, rowId], cntxtDtls, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            
            // If duplicate found in other records
            if (results && results.length > 0) {
                callback({ code: 'DUPLICATE', message: 'Respondent name already exists' }, null);
                return;
            }
            
            // If no duplicate, proceed with update
            const QRY_TO_EXEC = `UPDATE respondents_tbl SET officer_nm = ?, updated_by = ? WHERE id = ?`;
            let paramsData = [respodentName, updated_by, rowId];
            
            sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
                callback(err, results);
            });
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

//5 DELETE CALL
export function deleteRespondentMasterMdl(data, callback) {
    console.log('del request')
    const cntxtDtls = "in deleteRespondentMasterMdl";
    const { rowId, d_by } = data;
    const QRY_TO_EXEC = `UPDATE respondents_tbl SET d_in = 1,d_by=? WHERE id  = ?`;
    let paramsData = [d_by, rowId];
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, paramsData, cntxtDtls);
    }
}

export function getDistrictWiseEtemplesdataMdl(data, callback) {
    var cntxtDtls = "in getDistrictWiseEtemplesdataMdl";
    const { district_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM  e_temple_master  where d_in=0 and district_id =?  order by temple_name_english`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [district_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}


export function getEtemplesdataMdl(data, callback) {
    var cntxtDtls = "in getEtemplesdataMdl";
    const { district_id } = data;
    var QRY_TO_EXEC = `SELECT * FROM  e_temple_master  where d_in=0 order by temple_name_english`;

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [district_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
    }
}

export function updateAiAnalysisStatusMdl(data, callback) {
    var cntxtDtls = "in updateAiAnalysisStatusMdl";
    console.log(data);

    const { temple_id, ai_analysis, darshnam_ind, anaprasdam_ind, vehicle_managenment_ind, darshnam_time_nd } = data;
    var QRY_TO_EXEC = `UPDATE temple_registration SET ai_analysis = ?, darshnam_ind=?,anaprasdam_ind=?,vehicle_managenment_ind=?,darshnam_time_nd=? WHERE temple_id   = ?`;
    console.log(ai_analysis, darshnam_ind, anaprasdam_ind, vehicle_managenment_ind, temple_id);

    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [ai_analysis, darshnam_ind, anaprasdam_ind, vehicle_managenment_ind, darshnam_time_nd, temple_id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [ai_analysis, darshnam_ind, anaprasdam_ind, vehicle_managenment_ind, darshnam_time_nd, temple_id], cntxtDtls);
    }
}
