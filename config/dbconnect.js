import { createPool } from "mysql2";
import envs from "../config.js";

const MySQLConPool = createPool({
  host: envs.DB_HOST || "127.0.0.1",
  port: Number(envs.DB_PORT || 3306),
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  connectTimeout: 20000,
  connectionLimit: Number(envs.DB_POOL || 100),
  debug: false,
  multipleStatements: true
});

export { MySQLConPool };