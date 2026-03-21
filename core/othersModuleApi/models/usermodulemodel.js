import { MySQLConPool } from '../../../config/dbconnect.js';
import { sqlinjection, execQuery } from '../../../utils/utils.js';


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



export function getStationMasterMdl(reqdata, callback) {
    var cntxtDtls = "";
    var m = [reqdata.police_id]
    var QRY_TO_EXEC =
        `SELECT * FROM stations_master where point_id=? and d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            m,
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
     mm.iconName AS main_module_iconName,
    sm.sub_module_id,
    sm.displayName AS sub_module_name,
    sm.iconName AS sub_module_icon,
    sm.route AS sub_module_route,
    sm.sub_module_order As sub_module_order,
    sm.iconName AS sub_module_iconName
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
    // let phonenumber = reqdata.phonenumber;
    // let otp = reqdata.otp
    var cntxtDtls = "posting otp in the db";
    let created_by = ``
    if (reqdata.role_type == 1) {
        created_by
    } else {
        created_by = `and u.entry_by =?`
    }

    var QRY_TO_EXEC =
        `SELECT u.id AS id, u.user_name AS Name,u.phone_number AS Mobile, u.image AS imagePath,u.department_id,u.designation AS designation,r.role_type AS Role,u.last_login_time,d.department_nm,u.role_type,u.district_id,u.mandal_id,u.village_id,u.temple_id FROM users_data as u
            join roles as r on r.id= u.role_type
            left join department_master as d on d.id= u.department_id
            where u.d_in=0 ${created_by} ORDER BY u.user_name,r.role_type;`;
    console.log(QRY_TO_EXEC, "121")
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [reqdata.userId],
            cntxtDtls,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


// SELECT mm.module_id,mm.displayName,sm.sub_module_id,sm.displayName from users_data as us join user_permissions as p on us.id=p.user_id join sub_modules as sm on p.sub_module_id=sm.sub_module_id JOIN main_modules as mm on p.module_id=mm.module_id where us.id=101;

export function getUserReportByIdMdl(reqdata, callback) {
    var cntxtDtls = "getUserReportByIdMdl";
    var QRY_TO_EXEC =
        `SELECT u.id AS id, u.user_name AS Name,u.phone_number AS Mobile, u.image AS imagePath,u.department_id,u.designation AS designation,r.role_type AS Role,u.last_login_time,d.department_nm,u.role_type,u.themecolor,u.activeTextcolor,u.buttoncolor,u.district_id,u.mandal_id,u.village_id,u.temple_id FROM users_data as u
            join roles as r on r.id= u.role_type
            left join department_master as d on d.id= u.department_id
            where u.d_in=0 AND u.id = ?;`;
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

export function getRoleMdl(reqdata, callback) {
    // ////console.log(reqdata, 843);
    var cntxtDtls = "adding users and the assigning permissions to that user ";
    var QRY_TO_EXEC = `select u.role_type,r.canCreate,r.canEdit,r.canDelete from users_data as u
join roles as r on r.id = u.role_type where u.id=? and u.d_in=0`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, reqdata, cntxtDtls, function (err, results) {
            // //console.log(674);
            callback(err, results);
            return;
        }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function addrolebasedmodulesAdminMdl(reqData, usersdata, callback) {
    const contextDetails = "Adding user to users_data table";

    // 1. Insert user into `users_data`
    const insertUserQuery = `
        INSERT INTO users_data (user_name,phone_number,role_type,entry_by, last_login_time, created_time) 
        VALUES (?, ?, ?, ?, NOW(), NOW());
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

export function addrolebasedmodulesMdl(reqData, usersdata, callback) {
    const contextDetails = "Adding user and assigning permissions to that user based on role";

    // 1. Check if the user already exists
    const checkUserExistsQuery = `
        SELECT id 
        FROM users_data 
        WHERE phone_number = ? and d_in=0;
    `;
    //console.log([usersdata[1]], 1002);
    sqlinjection(
        MySQLConPool,
        checkUserExistsQuery,
        [usersdata[1]], // Validate usersdata before accessing indexes
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
                callback(400, null);
                return;
                // return callback({ message: "User already exists", code: 409 }, null);
            }
            //console.log(existingUserResult, "1016");
            // 2. Insert user into `users_data`
            const insertUserQuery = `
                INSERT INTO users_data (user_name,phone_number,role_type,designation,last_login_time, created_time,department_id,district_id,mandal_id,
village_id,temple_id,entry_by) 
        VALUES (?, ?, ?,?, NOW(), NOW(),?,?,?,?,?,?);
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

export function updaterolebasedmodulesMdl(userId, userData, role_id, callback) {
    const contextDetails = `Updating user permissions and data for user_id: ${userId}`;

    // 1. Check if the user already exists
    const checkUserExistsQuery = `
        SELECT 
        c1,
        c2,
        (c1 + c2) AS total_sum
        FROM (
        SELECT 
            (SELECT COUNT(id) 
            FROM users_data 
            WHERE phone_number = ? AND d_in = 0) AS c1,
            (SELECT COUNT(id) 
            FROM users_data 
            WHERE phone_number = ? AND id = ? AND d_in = 0 ) AS c2
        ) AS counts;
    `;

    sqlinjection(
        MySQLConPool,
        checkUserExistsQuery,
        [userData[1], userData[1], userId], // Validate usersdata before accessing indexes
        contextDetails,
        (err, existingUserResult) => {
            //console.log(existingUserResult.length);
            if (err) {
                console.error("Error checking user existence:", err);
                callback(err, null);
                return;
                // return callback({ message: "Database error", code: 500 }, null);
            }
            console.log(existingUserResult, 367);

            if (existingUserResult[0].total_sum == 1) {
                callback(400, null);
                return;
                // return callback({ message: "User already exists", code: 409 }, null);
            }

            // 1. Update user data in the users_data table
            const updateUserDataQuery = `
        UPDATE users_data
        SET user_name = ?, phone_number = ?, role_type = ?,designation=?,department_id=?,district_id=?,mandal_id=?,village_id=?,temple_id=?
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

                            // 3. Fetch role-based modules for the role_type
                            const fetchRoleModulesQuery = `
                     SELECT module_id AS moduleId, sub_module_id AS subModuleId 
                     FROM role_based_modules 
                     WHERE role_id = ?;
                 `;
                            sqlinjection(
                                MySQLConPool,
                                fetchRoleModulesQuery,
                                [role_id],
                                contextDetails,
                                (err, roleModules) => {
                                    if (err) {
                                        console.error("Error fetching role-based modules:", err);
                                        return callback({ message: "Database error", code: 500 }, null);
                                    }

                                    if (roleModules.length === 0) {
                                        return callback({ message: "No modules found for this role", code: 404 }, null);
                                    }

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
    sm.displayName AS sub_module_name,
        m.module_id AS moduleId,
     sm.sub_module_id AS SubModuleID
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


export function editprofileimageMdl(reqdata, callback) {
    var cntxtDtls = "fetching rolebased modules from the db based on the role_type";
    var QRY_TO_EXEC = `update users_data set image=? where id=? `;
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


export function add_teammemberMdl(reqData, usersdata, callback) {
    const contextDetails = "Adding user and assigning permissions to that user based on role";

    console.log(reqData, "role");

    console.log(usersdata, "yuu");


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
        [usersdata[1]], // Validate usersdata before accessing indexes
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
               INSERT INTO users_data (user_name,phone_number,role_type,entry_by, last_login_time, created_time) 
        VALUES (?, ?, ?, ?,NOW(), NOW());
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

export function getteamMemberMdl(id, callback) {
    console.log(id, "jwt");

    var cntxtDtls = "in getteamMemberMdl";
    var QRY_TO_EXEC = `select * from users_data where d_in=0 and role_type='3' and entry_by = ?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [id],
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}


export function getcaprofileMdl(id, callback) {
    console.log(id, "jwt");

    var cntxtDtls = "in getcaprofileMdl";
    var QRY_TO_EXEC = `select * from users_data where d_in=0 and id = ?`;
    if (callback && typeof callback == "function") {
        sqlinjection(
            MySQLConPool,
            QRY_TO_EXEC,
            [id],
            cntxtDtls,
            function (err, results) {
                // //console.log(674);
                callback(err, results);
                return;
            }
        );
    } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
}

// export function getDistrictDataMdl(callback) {
//     var cntxtDtls = "";
//     var QRY_TO_EXEC =
//         `SELECT * FROM district_list where d_in=0 order by district_name asc`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             [],
//             cntxtDtls,
//             function (err, results) {
//                 callback(err, results);
//                 return;
//             }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

// export function getSlfDataMdl(callback) {
//     var cntxtDtls = "";
//     var QRY_TO_EXEC =
//         `SELECT * FROM slf_master where d_in=0 order by slf_name asc limit 20`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             [],
//             cntxtDtls,
//             function (err, results) {
//                 callback(err, results);
//                 return;
//             }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

// export function getulbMdl(data, callback) {
//     var cntxtDtls = "";
//     var QRY_TO_EXEC =
//         `SELECT * FROM ulb_list where d_in=0 and district_id = ? order by ulb_name asc`;
//     if (callback && typeof callback == "function") {
//         sqlinjection(
//             MySQLConPool,
//             QRY_TO_EXEC,
//             [data.district_id],
//             cntxtDtls,
//             function (err, results) {
//                 callback(err, results);
//                 return;
//             }
//         );
//     } else return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
// }

// new
export function employeenamemdl(callback) {
    var cntxtDtls = "in employeenamemdl";
    // var QRY_TO_EXEC = `select * from amvt_t_users_lst where tin = 0 and d_in = 0 and id != 5 and id != 6;`;
    var QRY_TO_EXEC = `select id,user_name as usr_nm from users_data where d_in = 0 and role_type=3;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function teamleadnamemdl(callback) {
    var cntxtDtls = "in teamleadnamemdl";
    // 	var QRY_TO_EXEC = `select * from amvt_t_users_lst where tin = 1 and d_in = 0 and id != 5 and id != 6 ;`;
    // var QRY_TO_EXEC = `select teamleadname as usr_nm,tid as id from amvtteamleads where d_in = '0';`;
    var QRY_TO_EXEC = `select user_name as usr_nm,id from users_data where d_in = '0' and role_type =2 order by user_name;`;


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function gettlidmdl(val, callback) {

    var cntxtDtls = "in gettlidmdl";
    var QRY_TO_EXEC = `select id from amvt_t_users_lst where usr_nm = '${val}' `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function gettmidmdl(val, callback) {

    var cntxtDtls = "in gettmidmdl";
    var QRY_TO_EXEC = `select id from amvt_t_users_lst where usr_nm = '${val}' `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function submitteammemberdetailsmdl(data, callback) {
    var cntxtDtls = "in submitteammemberdetailsmdl";
    var QRY_TO_EXEC = '';
    var SUB_QRY_TO_EXEC = '';
    var b = data.teamlead.split(',');
    data.employee.forEach(element => {
        var a = element.split(',');
        SUB_QRY_TO_EXEC = `insert into  amvtteammembers(teamlead,teammember,tlid,tmid) values ('${b[0]}' ,'${a[0]}' ,'${b[1]}' ,'${a[1]}' );`;
        QRY_TO_EXEC = QRY_TO_EXEC + SUB_QRY_TO_EXEC;
    });
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function getmembersdatamdl(callback) {

    var cntxtDtls = "in getmembersdatamdl";
    var QRY_TO_EXEC = `select * from amvtteammembers where d_in = '0' ;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};

export function editteammembermdl(data, callback) {
    //console.log(data, "mainmodel");
    var cntxtDtls = "in editteammembermdl";
    var QRY_TO_EXEC = `update amvtteammembers set teamlead = '${data.eteamlead}' , teammember = '${data.eemployee}',tlid =  '${data.tlid}' ,tmid =  '${data.tmid}'  where id='${data.id}' `;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, cntxtDtls);
};
export function deleteteammembermdl(data, callback) {

    var cntxtDtls = "in deleteteammembermdl";
    var QRY_TO_EXEC = `update amvtteammembers set d_in='1' where id=? `;


    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [data.id], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};


export function getUserWithId(userId, callback) {

    var cntxtDtls = "in getUserWithId";
    var QRY_TO_EXEC = `select * from users_data where d_in = '0' and  id =?;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [userId], cntxtDtls);
};
export function updateUserColorsMdl(data, callback) {

    var cntxtDtls = "in updateUserColorsMdl";
    const { themecolor, activeTextcolor, buttoncolor, userId } = data;
    var QRY_TO_EXEC = `update users_data set themecolor=?,activeTextcolor=?,buttoncolor=? where id=? ;`;
    if (callback && typeof callback == "function") {
        sqlinjection(MySQLConPool, QRY_TO_EXEC, [themecolor, activeTextcolor, buttoncolor, userId], cntxtDtls, function (err, results) {
            callback(err, results);
            return;
        });
    }
    else
        return sqlinjection(MySQLConPool, QRY_TO_EXEC, [], cntxtDtls);
};
