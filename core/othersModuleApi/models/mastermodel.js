import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection, execQuery } from '../../../utils/utils.js';
// import {dbutil} from "../../utils/utils.js"
import moment from 'moment';

export function addmasteruserpersmissionsMdl(reqdata, callback) {
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `select id from users_data where role_type=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            reqdata,
            cntxtDtls,
            function (err, results) {

                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};





// export function addmasteruserpersmissionsMdl2(roleId, reqdata, modulesAndSubModules, callback) {
//     const userIds = reqdata;
//     const cntxtDtls = "adding users and assigning permissions to that user";

//     const QRY_DELETE_ROLE_BASED_MODULES = `
//         DELETE FROM role_based_modules WHERE role_id = ?;
//     `;

//     const QRY_INSERT_ROLE_BASED_MODULES = `
//         INSERT INTO role_based_modules (role_id, module_id, sub_module_id)
//         VALUES (?, ?, ?);
//     `;

//     const QRY_FETCH_ROLE_BASED_MODULES = `
//         SELECT module_id, sub_module_id FROM role_based_modules WHERE role_id = ?;
//     `;

//     const QRY_CHECK_EXISTING_PERMISSIONS = `
//         SELECT COUNT(*) AS count 
//         FROM user_permissions 
//         WHERE user_id = ? AND module_id = ? AND sub_module_id = ?;
//     `;

//     const QRY_INSERT_USER_PERMISSIONS = `
//         INSERT INTO user_permissions (user_id, module_id, sub_module_id)
//         VALUES (?, ?, ?);
//     `;

//     const assignPermissions = (callback) => {
//         sqlinjection(MySQLConPool, `START TRANSACTION`, null, cntxtDtls, (err) => {
//             if (err) {
//                 callback(err, null);
//                 return;
//             }

//             let queries = [];

//             // Delete role-based modules data for a particular role_id
//             queries.push((cb) => sqlinjection(MySQLConPool, QRY_DELETE_ROLE_BASED_MODULES, [roleId], cntxtDtls, cb));

//             // Insert new role-based modules
//             modulesAndSubModules.forEach(({ moduleId, subModuleId }) => {
//                 queries.push((cb) => sqlinjection(MySQLConPool, QRY_INSERT_ROLE_BASED_MODULES, [roleId, moduleId, subModuleId], cntxtDtls, cb));
//             });

//             // Fetch the role-based modules for the roleId
//             queries.push((cbFetchModules) => {
//                 sqlinjection(MySQLConPool, QRY_FETCH_ROLE_BASED_MODULES, [roleId], cntxtDtls, (err, roleModules) => {
//                     if (err) return cbFetchModules(err);

//                     // For each userId, check for existing permissions before assigning role-based modules
//                     userIds.forEach((userId) => {
//                         roleModules.forEach(({ module_id, sub_module_id }) => {
//                             queries.push((cbCheckAndInsert) => {
//                                 // Check if the permission already exists
//                                 sqlinjection(
//                                     MySQLConPool,
//                                     QRY_CHECK_EXISTING_PERMISSIONS,
//                                     [userId, module_id, sub_module_id],
//                                     cntxtDtls,
//                                     (err, results) => {
//                                         if (err) return cbCheckAndInsert(err);

//                                         const { count } = results[0];
//                                         if (count === 0) {
//                                             // Insert only if the permission doesn't already exist
//                                             sqlinjection(
//                                                 MySQLConPool,
//                                                 QRY_INSERT_USER_PERMISSIONS,
//                                                 [userId, module_id, sub_module_id],
//                                                 cntxtDtls,
//                                                 cbCheckAndInsert
//                                             );
//                                         } else {
//                                             // Skip if the permission already exists
//                                             cbCheckAndInsert(null);
//                                         }
//                                     }
//                                 );
//                             });
//                         });
//                     });

//                     cbFetchModules(null);
//                 });
//             });

//             // Execute queries sequentially
//             const executeSequentially = (tasks, finalCallback) => {
//                 const task = tasks.shift();
//                 if (!task) {
//                     finalCallback(null, "All operations completed");
//                     return;
//                 }

//                 task((err) => {
//                     if (err) {
//                         finalCallback(err, null);
//                     } else {
//                         executeSequentially(tasks, finalCallback);
//                     }
//                 });
//             };

//             executeSequentially(queries, (err, result) => {
//                 if (err) {
//                     sqlinjection(MySQLConPool, `ROLLBACK`, null, cntxtDtls, () => callback(err, null));
//                 } else {
//                     sqlinjection(MySQLConPool, `COMMIT`, null, cntxtDtls, () => callback(null, result));
//                 }
//             });
//         });
//     };

//     assignPermissions(callback);
// };
export function addmasteruserpersmissionsMdl2(roleId, reqdata, modulesAndSubModules, newPermissions, callback) {
    const userIds = reqdata;
    const cntxtDtls = "adding users and assigning permissions to that user";

    const QRY_DELETE_ROLE_BASED_MODULES = `DELETE FROM role_based_modules WHERE role_id = ?;`;

    // Bulk insert query for role-based modules
    const QRY_INSERT_ROLE_BASED_MODULES = `INSERT INTO role_based_modules (role_id, module_id, sub_module_id) VALUES ?;`;

    const QRY_FETCH_ROLE_BASED_MODULES = `SELECT module_id, sub_module_id FROM role_based_modules WHERE role_id = ?;`;

    // Delete user permissions query
    const QRY_DELETE_USER_PERMISSIONS = `DELETE FROM user_permissions WHERE user_id in (?);`;

    // Bulk insert query for user_permissions
    const QRY_INSERT_USER_PERMISSIONS = `INSERT INTO user_permissions (user_id, module_id, sub_module_id) VALUES ?;`;

    const assignPermissions = (callback) => {
        sqlinjection(MySQLConPool, `START TRANSACTION`, null, cntxtDtls, (err) => {
            if (err) {
                callback(err, null);
                return;
            }

            let queries = [];

            // Delete role-based modules data for a particular role_id
            queries.push((cb) => sqlinjection(MySQLConPool, QRY_DELETE_ROLE_BASED_MODULES, [roleId], cntxtDtls, cb));

            // Prepare all the role-based modules data to insert at once
            const roleModulesValues = modulesAndSubModules.map(({ moduleId, subModuleId }) => [roleId, moduleId, subModuleId]);

            // Check if there are modules to insert
            if (roleModulesValues.length > 0) {
                queries.push((cb) => sqlinjection(MySQLConPool, QRY_INSERT_ROLE_BASED_MODULES, [roleModulesValues], cntxtDtls, cb));
            }

            const deleteUserIds = userIds.map((userId) => [userId]);

            if (userIds.length > 0) {
                queries.push((cb) => sqlinjection(MySQLConPool, QRY_DELETE_USER_PERMISSIONS, [deleteUserIds], cntxtDtls, cb));
            }

            // Prepare the list of user permissions for bulk insert
            const userPermissionsValues = newPermissions.map(({ id, moduleId, subModuleId }) => [id, moduleId, subModuleId]);
            // Perform a single bulk insert for user permissions
            if (userPermissionsValues.length > 0) {
                queries.push((cb) => sqlinjection(MySQLConPool, QRY_INSERT_USER_PERMISSIONS, [userPermissionsValues], cntxtDtls, cb));
            }

            // Execute queries sequentially
            const executeSequentially = (tasks, finalCallback) => {
                const task = tasks.shift();
                if (!task) {
                    finalCallback(null, "All operations completed");
                    return;
                }

                task((err) => {
                    if (err) {
                        finalCallback(err, null);
                    } else {
                        executeSequentially(tasks, finalCallback);
                    }
                });
            };

            executeSequentially(queries, (err, result) => {
                if (err) {
                    console.error("Transaction failed:", err);
                    sqlinjection(MySQLConPool, `ROLLBACK`, null, cntxtDtls, () => callback(err, null));
                } else {
                    console.log("Transaction successful, committing...");
                    sqlinjection(MySQLConPool, `COMMIT`, null, cntxtDtls, () => callback(null, result));
                }
            });
        });
    };

    assignPermissions(callback);
};








export function fetchexistingMasterModulesBasedOnRoleMdl(reqdata, callback) {
    const role_type = reqdata;
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `SELECT module_id,sub_module_id FROM role_based_modules where role_id=?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            role_type,
            cntxtDtls,
            function (err, results) {

                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};