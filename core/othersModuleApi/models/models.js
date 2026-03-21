import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection, execQuery } from '../../../utils/utils.js';
// import {dbutil} from "../../utils/utils.js"


// Get Banner Images Data
export function getbannerimagesMdl(reqdata, callback) {
    var cntxtDtls = "in getBanner Images";
    var QRY_TO_EXEC =
        `select * from banner_images`;
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
    } else return execQuery(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


// posting Banner Images into the database table name (banner_images)
export function postbannerimagesMdl(reqdata, callback) {
    var cntxtDtls = "in postingbannerimages";
    var imagedata = [
        reqdata.imagename,
        reqdata.imgurl
    ];
    // //console.log(imagedata, 30);

    var QRY_TO_EXEC =
        `insert into banner_images(image_name,image_path) values(?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            imagedata,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function addTemplesdataMdl(reqdata, callback) {
    var cntxtDtls = "posting temples data";

    const addTempleData = [
        reqdata.temple_location,
        reqdata.temple_image,
        reqdata.temple_name,
        reqdata.temple_icon,
        reqdata.temple_title,
        reqdata.temple_desc,
        reqdata.temple_timings
    ];
    // //console.log(addTempleData, 82);

    var QRY_TO_EXEC =
        `insert into main_temples (temple_location,temple_image,temple_name,temple_icon,temple_title,temple_desc,temple_timings) values(?,?,?,?,?,?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            addTempleData,
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function getTemplesDataMdl(reqdata, callback) {
    var cntxtDtls = "posting temples data";
    var QRY_TO_EXEC =
        `select * from main_temples where d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getMainModulesdataMdl(reqdata, callback) {
    var cntxtDtls = "getting temples data";
    var QRY_TO_EXEC =
        `SELECT * FROM main_modules`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function getmainsubmodulesdataMdl(reqdata, callback) {
    var cntxtDtls = "getting temples data";
    var QRY_TO_EXEC =
        `SELECT 
    main_modules.module_id AS moduleId,
    main_modules.displayName AS displayName,
    main_modules.iconName AS iconName,
    main_modules.route AS route,
    sub_modules.sub_module_id AS SubModuleID,
    sub_modules.displayName AS displayName1,
    sub_modules.iconName AS iconName1,
    sub_modules.route AS route1
FROM 
    main_modules
LEFT JOIN 
    sub_modules
ON 
    main_modules.module_id = sub_modules.module_id 
where main_modules.d_in=0 and sub_modules.d_in=0;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


// export function sendOtpMdl(reqdata, callback) {
//     // //console.log(reqdata, 176);
//     let phonenumber = reqdata.phonenumber;
//     let otp = reqdata.otp
//     var cntxtDtls = "posting otp in the db";
//     var QRY_TO_EXEC =
//         `UPDATE users_data SET otp = ?
// WHERE phone_number = ? and d_in=0;
// SELECT IF(ROW_COUNT() = 0, NULL, 'OTP updated') AS result;`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             [otp, phonenumber],
//             cntxtDtls,
//             function (err, results) {
//                 callback(err, results);
//                 return;
//             }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

export function sendOtpMdl(reqdata, callback) {
    const { phonenumber, otp, expiresAt } = reqdata;

    const cntxtDtls = "Posting OTP in the DB";
    const QRY_TO_EXEC = `
        UPDATE users_data
        SET otp = ?, otp_expires_at = ?
        WHERE phone_number = ? AND d_in = 0;

        SELECT IF(ROW_COUNT() = 0, 'No rows updated', 'OTP updated') AS result;
    `;

    const queryValues = [otp, expiresAt, phonenumber];

    if (callback && typeof callback === "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls, (err, results) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    } else {
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, queryValues, cntxtDtls);
    }
}


export function veriftOtpMdl(reqdata, callback) {
    // //console.log(reqdata,200);
    let phonenumber = reqdata.phonenumber;
    let otp = reqdata.otpsending;
    var cntxtDtls = "verifying otp in the db";
    var QRY_TO_EXEC =


        ` SELECT 
    id,role_type,
    CASE 
        WHEN COUNT(*) > 0 THEN otp 
        ELSE 0 
    END AS otp
FROM users_data 
WHERE phone_number = ? 
  AND d_in = 0
GROUP BY id;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [phonenumber],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function deleteOtpMdl(reqdata, callback) {
    // //console.log(reqdata,200);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS';
    // //console.log(formattedDate);
    let phonenumber = reqdata.phonenumber;
    let otp = reqdata.otpsending;
    var cntxtDtls = "deleting otp in the db";
    var QRY_TO_EXEC =
        `UPDATE users_data SET otp = NULL,last_login_time=? WHERE phone_number = ? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [formattedDate, phonenumber],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

export function getuserpermissionmodulesMdl(reqdata, callback) {
    // //console.log(reqdata,234);
    var cntxtDtls = "getting temples data";
    var QRY_TO_EXEC =
        `SELECT 
    mm.module_id AS main_module_id,
    mm.displayName AS main_module_name,
    mm.iconName AS main_module_icon,
    mm.module_order As module_order,
    mm.route AS main_module_route,
    sm.sub_module_id,
    sm.displayName AS sub_module_name,
    sm.iconName AS sub_module_icon,
    sm.route AS sub_module_route,
    sm.sub_module_order As sub_module_order
FROM 
    user_permissions p
JOIN 
    main_modules mm ON mm.module_id = p.module_id
JOIN 
    sub_modules sm ON sm.sub_module_id = p.sub_module_id
WHERE 
    p.user_id = ? and sm.d_in=0 and mm.d_in=0 and p.d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [reqdata],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}




export function getUserReportMdl(reqdata, callback) {
    // //console.log(reqdata, 176);
    let phonenumber = reqdata.phonenumber;
    let otp = reqdata.otp
    var cntxtDtls = "posting otp in the db";
    var QRY_TO_EXEC =
        `SELECT 
    u.id AS id,
    u.user_name AS Name,
    u.designation AS Position,
    u.department AS Department,
    u.phone_number AS Mobile,
    u.image AS imagePath,
    u.role_type AS Role,
    GROUP_CONCAT(DISTINCT IFNULL(mm.displayName, 'No Modules')) AS Modules,
    GROUP_CONCAT(DISTINCT IFNULL(sm.displayName, 'No SubModules')) AS SubModules
FROM users_data u
LEFT JOIN user_permissions p ON u.id = p.user_id
LEFT JOIN main_modules mm ON p.module_id = mm.module_id AND (mm.d_in = 0 OR mm.d_in IS NULL)
LEFT JOIN sub_modules sm ON p.sub_module_id = sm.sub_module_id AND (sm.d_in = 0 OR sm.d_in IS NULL)
WHERE u.d_in = 0
GROUP BY u.id, u.user_name, u.designation, u.department, u.phone_number, u.image, u.role_type;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [otp, phonenumber],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}



export function getUserReportByIdMdl(reqdata, callback) {

    var cntxtDtls = "posting otp in the db";
    var QRY_TO_EXEC =
        `SELECT 
    u.id AS id,
    u.user_name AS Name,
    u.designation AS Position,
    u.department AS Department,
    u.phone_number AS Mobile,
    u.image AS imagePath,
    u.role_type AS Role,
    GROUP_CONCAT(DISTINCT mm.displayName) AS Modules,
    GROUP_CONCAT(DISTINCT sm.displayName) AS SubModules
FROM users_data u
LEFT JOIN user_permissions p ON u.id = p.user_id
LEFT JOIN main_modules mm ON p.module_id = mm.module_id
LEFT JOIN sub_modules sm ON p.sub_module_id = sm.sub_module_id
WHERE u.d_in = 0 and u.id=?
  AND (mm.d_in = 0 OR mm.d_in IS NULL)
  AND (sm.d_in = 0 OR sm.d_in IS NULL)
GROUP BY u.id;`;
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
}



export function getcurrentpermissionmodulesMdl(reqdata, callback) {
    var cntxtDtls = "posting otp in the db";
    var QRY_TO_EXEC =
        `SELECT 
    mm.displayName AS title,
    'false' AS selected, -- Default value for module selection
    CONCAT(
        '[',
        GROUP_CONCAT(
            CONCAT(
                '{"name": "', sm.displayName, '", "selected": false}'
            )
        ),
        ']'
    ) AS chips
FROM user_permissions p
JOIN main_modules mm ON p.module_id = mm.module_id
JOIN sub_modules sm ON p.sub_module_id = sm.sub_module_id
WHERE p.user_id = 1
  AND p.d_in = 0
  AND mm.d_in = 0
  AND sm.d_in = 0
GROUP BY mm.module_id, mm.displayName;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function AddUserMdl(reqdata, callback) {
    // //console.log(reqdata, 662);
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `INSERT INTO users_data (user_name, phone_number, department, designation, image,entry_by,created_time) VALUES (?,?,?,?,?,?,?)`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            reqdata,
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};




export function AdduserPermissionByIdMdl(reqdata, permissionModuledata, callback) {
    const userId = reqdata;
    const values = [];
    // //console.log(permissionModuledata, 687);
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `INSERT INTO user_permissions (user_id, module_id, sub_module_id)
        VALUES ?`;
    permissionModuledata.forEach((item) => {// Only include items with selected = true
        values.push([userId, item.main_module_id, item.sub_module_id]);
    });
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [values],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};


export function addmasteruserpersmissionsMdl(reqdata, callback) {
    // //console.log(reqdata, 709);
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `select id from users_data where role_type=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            reqdata,
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

// export function addmasteruserpersmissionsMdl2(reqdata, modulesAndSubModules, callback) {
//     const userIds = reqdata; //list of users which
//     // const modulesAndSubModules = [
//     //     { moduleId: 10, subModuleId: 14 },
//     //     { moduleId: 6, subModuleId: 6 },
//     //     { moduleId: 6, subModuleId: 5 },
//     // ];
//     var cntxtDtls = "adding users and the assigning permissions to that user ";
//     const QRY_INSERT_PERMISSION = `
//         INSERT INTO user_permissions (user_id, module_id, sub_module_id)
//         VALUES (?, ?, ?)
//         ON DUPLICATE KEY UPDATE d_in = 0
//     `;

//     const QRY_DELETE_ALL_PERMISSIONS = `
//         DELETE FROM user_permissions WHERE user_id = ?
//     `;
//     const assignPermissions = (callback) => {
//         sqlinjection(
//             MySQLConPool,
//             `START TRANSACTION`,
//             null,
//             cntxtDtls,
//             (err) => {
//                 if (err) {
//                     callback(err, null);
//                     return;
//                 }

//                 let queries = [];
//                 userIds.forEach((userId) => {
//                     // Add query to delete all existing permissions for the user
//                     queries.push((cb) =>
//                         sqlinjection(
//                             MySQLConPool,
//                             QRY_DELETE_ALL_PERMISSIONS,
//                             [userId],
//                             cntxtDtls,
//                             cb
//                         )
//                     );

//                     // Add queries to insert new permissions for the user
//                     modulesAndSubModules.forEach(({ moduleId, subModuleId }) => {
//                         queries.push((cb) =>
//                             sqlinjection(
//                                 MySQLConPool,
//                                 QRY_INSERT_PERMISSION,
//                                 [userId, moduleId, subModuleId],
//                                 cntxtDtls,
//                                 cb
//                             )
//                         );
//                     });
//                 });

//                 // Execute queries sequentially
//                 const executeSequentially = (tasks, finalCallback) => {
//                     const task = tasks.shift();
//                     if (!task) {
//                         finalCallback(null, "All operations completed");
//                         return;
//                     }

//                     task((err) => {
//                         if (err) {
//                             finalCallback(err, null);
//                         } else {
//                             executeSequentially(tasks, finalCallback);
//                         }
//                     });
//                 };

//                 executeSequentially(queries, (err, result) => {
//                     if (err) {
//                         sqlinjection(
//                             MySQLConPool,
//                             `ROLLBACK`,
//                             null,
//                             cntxtDtls,
//                             () => callback(err, null)
//                         );
//                     } else {
//                         sqlinjection(
//                             MySQLConPool,
//                             `COMMIT`,
//                             null,
//                             cntxtDtls,
//                             () => callback(null, result)
//                         );
//                     }
//                 });
//             }
//         );
//     };

//     assignPermissions(callback);
//     // if (callback && typeof callback == "function") {
//     //     sqlinjection(
//     //         MySQLConPool,
//     //         QRY_TO_EXEC,
//     //         reqdata,
//     //         cntxtDtls,
//     //         function (err, results) {
//     //             // //console.log(674);
//     //             callback(err, results);
//     //             return;
//     //         }
//     //     );
//     // } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };


export function addmasteruserpersmissionsMdl2(roleId, reqdata, modulesAndSubModules, callback) {
    const userIds = reqdata;
    const cntxtDtls = "adding users and assigning permissions to that user";

    const QRY_DELETE_ROLE_BASED_MODULES = `
        DELETE FROM role_based_modules WHERE role_id = ?;
    `;

    const QRY_INSERT_ROLE_BASED_MODULES = `
        INSERT INTO role_based_modules (role_id, module_id, sub_module_id)
        VALUES (?, ?, ?);
    `;

    const QRY_FETCH_ROLE_BASED_MODULES = `
        SELECT module_id, sub_module_id FROM role_based_modules WHERE role_id = ?;
    `;

    const QRY_DELETE_USER_PERMISSIONS = `
        DELETE FROM user_permissions WHERE user_id = ?;
    `;

    const QRY_INSERT_USER_PERMISSIONS = `
        INSERT INTO user_permissions (user_id, module_id, sub_module_id)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE d_in = 0;
    `;

    const assignPermissions = (callback) => {
        sqlinjection(MySQLConPool, `START TRANSACTION`, null, cntxtDtls, (err) => {
            if (err) {
                callback(err, null);
                return;
            }

            let queries = [];

            // Delete role-based modules data for a particular role_id
            queries.push((cb) => sqlinjection(MySQLConPool, QRY_DELETE_ROLE_BASED_MODULES, [roleId], cntxtDtls, cb));

            // Insert new role-based modules
            modulesAndSubModules.forEach(({ moduleId, subModuleId }) => {
                queries.push((cb) => sqlinjection(MySQLConPool, QRY_INSERT_ROLE_BASED_MODULES, [roleId, moduleId, subModuleId], cntxtDtls, cb));
            });

            // Now, for each userId, delete their current permissions and reassign role-based modules
            userIds.forEach((userId) => {
                queries.push((cbDelete) => sqlinjection(MySQLConPool, QRY_DELETE_USER_PERMISSIONS, [userId], cntxtDtls, cbDelete));

                // After deleting user permissions, fetch the role-based modules for the roleId and assign them to the user
                queries.push((cbFetch) => sqlinjection(MySQLConPool, QRY_FETCH_ROLE_BASED_MODULES, [roleId], cntxtDtls, (err, roleModules) => {
                    if (err) return cbFetch(err);

                    roleModules.forEach(({ module_id, sub_module_id }) => {
                        queries.push((cbInsert) => sqlinjection(MySQLConPool, QRY_INSERT_USER_PERMISSIONS, [userId, module_id, sub_module_id], cntxtDtls, cbInsert));
                    });

                    cbFetch(null);
                }));
            });

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
                    sqlinjection(MySQLConPool, `ROLLBACK`, null, cntxtDtls, () => callback(err, null));
                } else {
                    sqlinjection(MySQLConPool, `COMMIT`, null, cntxtDtls, () => callback(null, result));
                }
            });
        });
    };

    assignPermissions(callback);
};





export function getRoleMdl(reqdata, callback) {
    // //console.log(reqdata, 843);
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `select role_type from users_data where id=?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            reqdata,
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



// export function addrolebasedmodulesMdl(reqdata, callback) {
//     //console.log(reqdata, 864);
//     var cntxtDtls = "adding users and the assigning permissions to that user ";
//     var QRY_TO_EXEC = `SELECT module_id as moduleId,sub_module_id as subModuleId FROM role_based_modules where role_id=?;`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             reqdata,
//             cntxtDtls,
//             function (err, results) {
//                 // //console.log(674);
//                 callback(err, results);
//                 return;
//             }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// };

// export function addrolebasedmodulesMdl(reqData, usersdata, callback) {
//     const contextDetails = "Adding user and assigning permissions to that user based on role";
//     //console.log(usersdata,894);
//     // 1. Check if the user already exists
//     const checkUserExistsQuery = `
//         SELECT user_id 
//         FROM users_data 
//         WHERE phone_number = ?;
//     `;

//     sqlinjection(
//         MySQLConPool,
//         checkUserExistsQuery,
//         usersdata[2], // Assuming phone_number is at index 2 and user_name is at index 0 in `usersdata`
//         contextDetails,
//         function (err, existingUserResult) {
//             if (err) {
//                 callback(err, null);
//                 return;
//             }
//             if (existingUserResult.length > 0) {
//                 // If the user exists, throw an error
//                 callback({ message: "User already exists", code: 409 }, null);
//                 return;
//             }
//             // 2. Insert user into `users_data`
//             const insertUserQuery = `
//                 INSERT INTO users_data (user_name, image, phone_number, designation, department, role_type, entry_by, last_login_time, created_time) 
//                 VALUES (?,?,?,?,?,?,?,NOW(),NOW());
//             `;
//             sqlinjection(
//                 MySQLConPool,
//                 insertUserQuery,
//                 usersdata,
//                 contextDetails,
//                 function (err, userInsertResult) {
//                     if (err) {
//                         callback(err, null);
//                         return;
//                     }
//                     const userId = userInsertResult.insertId; // Get the inserted user's ID
//                     //console.log(userId, 902);
//                     const roleType = reqData;

//                     // 3. Fetch role-based modules for the role_type
//                     const fetchRoleModulesQuery = `
//                         SELECT module_id as moduleId, sub_module_id as subModuleId 
//                         FROM role_based_modules 
//                         WHERE role_id = ?;
//                     `;

//                     sqlinjection(
//                         MySQLConPool,
//                         fetchRoleModulesQuery,
//                         [roleType],
//                         contextDetails,
//                         function (err, roleModules) {
//                             if (err) {
//                                 callback(err, null);
//                                 return;
//                             }

//                             // 4. Prepare data for inserting into `user_permissions`
//                             const permissionsData = roleModules.map((module) => [
//                                 userId, // user_id
//                                 module.moduleId,
//                                 module.subModuleId,
//                             ]);
//                             //console.log(usersdata, 939);
//                             const insertPermissionsQuery = `
//                                 INSERT INTO user_permissions (user_id, module_id, sub_module_id) 
//                                 VALUES ?;
//                             `;

//                             sqlinjection(
//                                 MySQLConPool,
//                                 insertPermissionsQuery,
//                                 [permissionsData],
//                                 contextDetails,
//                                 function (err, permissionInsertResult) {
//                                     if (err) {
//                                         callback(err, null);
//                                         return;
//                                     }

//                                     callback(null, {
//                                         message: "User and permissions added successfully",
//                                         userId: userId,
//                                         permissionsAdded: permissionsData.length,
//                                     });
//                                 }
//                             );
//                         }
//                     );
//                 }
//             );
//         }
//     );
// }


export function addrolebasedmodulesMdl(reqData, usersdata, callback) {
    const contextDetails = "Adding user and assigning permissions to that user based on role";

    // 1. Check if the user already exists
    const checkUserExistsQuery = `
        SELECT id 
        FROM users_data 
        WHERE phone_number = ? and d_in=0;
    `;
    //console.log([usersdata[2]], 1002);
    sqlinjection(
        MySQLConPool,
        checkUserExistsQuery,
        [usersdata[2]], // Validate usersdata before accessing indexes
        contextDetails,
        (err, existingUserResult) => {
            //console.log(existingUserResult.length);
            if (err) {
                console.error("Error checking user existence:", err);
                callback(err, null);
                return;
                // return callback({ message: "Database error", code: 500 }, null);
            }
            if (existingUserResult.length > 0) {
                callback(err, null);
                return;
                // return callback({ message: "User already exists", code: 409 }, null);
            }
            //console.log(existingUserResult, "1016");
            // 2. Insert user into `users_data`
            const insertUserQuery = `
                INSERT INTO users_data 
                (user_name, image, phone_number, designation, department, role_type, entry_by, last_login_time, created_time) 
                VALUES (?,?,?,?,?,?,?,NOW(),NOW());
            `;
            sqlinjection(
                MySQLConPool,
                insertUserQuery,
                usersdata,
                contextDetails,
                (err, userInsertResult) => {
                    if (err) {
                        console.error("Error inserting user:", err);
                        return callback({ message: "Database error", code: 500 }, null);
                    }
                    //console.log("1033");
                    const userId = userInsertResult.insertId;
                    const roleType = reqData;

                    // 3. Fetch role-based modules for the role_type
                    const fetchRoleModulesQuery = `
                        SELECT module_id AS moduleId, sub_module_id AS subModuleId 
                        FROM role_based_modules 
                        WHERE role_id = ?;
                    `;
                    sqlinjection(
                        MySQLConPool,
                        fetchRoleModulesQuery,
                        [roleType],
                        contextDetails,
                        (err, roleModules) => {
                            if (err) {
                                console.error("Error fetching role-based modules:", err);
                                return callback({ message: "Database error", code: 500 }, null);
                            }

                            if (roleModules.length === 0) {
                                return callback({ message: "No modules found for this role", code: 404 }, null);
                            }
                            //console.log('1057')
                            // 4. Insert permissions into `user_permissions`
                            const permissionsData = roleModules.map((module) => [
                                userId,
                                module.moduleId,
                                module.subModuleId,
                            ]);
                            const insertPermissionsQuery = `
                                INSERT INTO user_permissions (user_id, module_id, sub_module_id) 
                                VALUES ?;
                            `;
                            sqlinjection(
                                MySQLConPool,
                                insertPermissionsQuery,
                                [permissionsData],
                                contextDetails,
                                (err) => {
                                    if (err) {
                                        console.error("Error inserting permissions:", err);
                                        return callback({ message: "Database error", code: 500 }, null);
                                    }

                                    return callback(null, {
                                        message: "User and permissions added successfully",
                                        userId,
                                        permissionsAdded: permissionsData.length,
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}



// export function addrolebasedmodulesAdminMdl(reqData, usersdata, callback) {
//     const contextDetails = "Adding user to users_data table";

//     // 1. Insert user into `users_data`
//     const insertUserQuery = `
//         INSERT INTO users_data (user_name, image, phone_number, designation, department, role_type, entry_by, last_login_time, created_time) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
//     `;

//     sqlinjection(
//         MySQLConPool,
//         insertUserQuery,
//         usersdata, // Pass the array of values for the query
//         contextDetails,
//         function (err, userInsertResult) {
//             if (err) {
//                 callback(err, null); // Return the error if insertion fails
//                 return;
//             }

//             const userId = userInsertResult.insertId; // Get the inserted user's ID
//             //console.log(`User added successfully. User ID: ${userId}`);


//             // Return the inserted user ID to the callback
//             callback(null, {
//                 message: "User added successfully",
//                 userId: userId,
//             });
//         }
//     );
// }



export function addrolebasedmodulesAdminMdl(reqData, usersdata, callback) {
    const contextDetails = "Adding user to users_data table";

    // 1. Insert user into `users_data`
    const insertUserQuery = `
        INSERT INTO users_data (user_name, image, phone_number, designation, department, role_type, entry_by, last_login_time, created_time) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;

    sqlinjection(
        MySQLConPool,
        insertUserQuery,
        usersdata, // Pass the array of values for the query
        contextDetails,
        function (err, userInsertResult) {
            if (err) {
                callback(err, null); // Return the error if insertion fails
                return;
            }

            const userId = userInsertResult.insertId; // Get the inserted user's ID
            //console.log(`User added successfully. User ID: ${userId}`);

            // 2. Insert into `user_permissions`
            const insertPermissionsQuery = `
                INSERT INTO user_permissions (user_id, module_id, sub_module_id) 
                VALUES (?, '12', '12');
            `;

            sqlinjection(
                MySQLConPool,
                insertPermissionsQuery,
                [userId], // Pass the required values as an array
                contextDetails,
                function (err, permissionInsertResult) {
                    if (err) {
                        callback(err, null); // Return the error if insertion fails
                        return;
                    }

                    // Return success message
                    callback(null, {
                        message: "User and permissions added successfully",
                        userId: userId,
                    });
                }
            );
        }
    );
}


export function updaterolebasedmodulesMdl(userId, userData, modulesAndSubModules, callback) {
    const contextDetails = `Updating user permissions and data for user_id: ${userId}`;
    //console.log("User Data:", userData);
    //console.log("Modules and SubModules:", modulesAndSubModules);

    const newPermissionsData = modulesAndSubModules.map(permission => [
        userId,
        permission.moduleId,
        permission.subModuleId
    ]);

    // 1. Update user data in the users_data table
    const updateUserDataQuery = `
        UPDATE users_data
        SET user_name = ?, image = ?, phone_number = ?, designation = ?, department = ?, role_type = ?
        WHERE id = ?;
    `;
    sqlinjection(
        MySQLConPool,
        updateUserDataQuery,
        userData,
        contextDetails,
        function (err, updateResult) {
            if (err) {
                callback(err, null);
                return;
            }
            //console.log(`Updated user data for user_id: ${userId}`);

            // 2. Delete existing permissions for the user
            const deletePermissionsQuery = `
                DELETE FROM user_permissions WHERE user_id = ?;
            `;
            sqlinjection(
                MySQLConPool,
                deletePermissionsQuery,
                [userId], // Wrap in array for safe query execution
                contextDetails,
                function (err) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    //console.log(`Deleted user permissions for user_id: ${userId}`);

                    // 3. Insert new permissions
                    const insertPermissionsQuery = `
                        INSERT INTO user_permissions (user_id, module_id, sub_module_id) 
                        VALUES (?, ?, ?);
                    `;

                    // Use Promise.all to handle multiple async operations
                    const insertPromises = newPermissionsData.map(permission => {
                        return new Promise((resolve, reject) => {
                            sqlinjection(
                                MySQLConPool,
                                insertPermissionsQuery,
                                permission,
                                contextDetails,
                                function (err) {
                                    if (err) return reject(err);
                                    resolve();
                                }
                            );
                        });
                    });

                    Promise.all(insertPromises)
                        .then(() => {
                            //console.log(`Modules updated for user_id: ${userId}`);
                            callback(null, { success: true });
                        })
                        .catch(err => {
                            callback(err, null);
                        });
                }
            );
        }
    );
}


export function deleterolebasedmodulesMdl(reqdata, callback) {
    // //console.log(reqdata, 843);
    var cntxtDtls = "deleting user from the db";
    var QRY_TO_EXEC = `update users_data set d_in=1 where id=?; delete from user_permissions where user_id=?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [reqdata, reqdata],
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



export function getrolebasedmodulesMdl(reqdata, callback) {
    // //console.log(reqdata, 843);
    var cntxtDtls = "fetching rolebased modules from the db based on the role_id";
    var QRY_TO_EXEC = `SELECT 
    m.displayName AS module_name,
    sm.displayName AS sub_module_name
FROM 
    role_based_modules rbm
JOIN 
    main_modules m ON rbm.module_id = m.module_id
JOIN 
    sub_modules sm ON rbm.sub_module_id = sm.sub_module_id
WHERE 
    rbm.role_id = ?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [reqdata],
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};



export function getroleaccessMdl(reqdata, callback) {
    // //console.log(reqdata, 843);
    var cntxtDtls = "fetching rolebased modules from the db based on the role_type";
    var QRY_TO_EXEC = `SELECT 
    m.displayName AS module_name,
    sm.displayName AS sub_module_name
FROM 
    role_based_modules rbm
JOIN 
    main_modules m ON rbm.module_id = m.module_id
JOIN 
    sub_modules sm ON rbm.sub_module_id = sm.sub_module_id
WHERE 
    rbm.role_id = ?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [reqdata],
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
