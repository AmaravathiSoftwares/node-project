import { createPool } from 'mysql2';
var MySQLConPool = {};

// var USER = 'amaravathilive_users';
// var PWD = 'bX+#IyoowOAd';
// var DATABASE = 'amaravathilive_new_database';
// var DB_HOST_NAME = 'localhost';


var USER = 'root';  
var PWD = '';
var DATABASE = 'tms_db2';
var DB_HOST_NAME = 'localhost';


var MAX_POOL_SIZE = 100;

var MySQLConPool = createPool({
    host: DB_HOST_NAME,
    port: 3306,
    user: USER,
    password: PWD,
    database: DATABASE,
    connectTimeout: 20000,
    connectionLimit: MAX_POOL_SIZE,
    debug: false,
    multipleStatements: true
});


const _MySQLConPool = MySQLConPool;
export { _MySQLConPool as MySQLConPool };


