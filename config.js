// const dotenv = require('dotenv');
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
console.log('\nPlease Check Endpoints::\n');
console.log(`Running in :: ${process.env.NODE_ENV}`);
export default envs;
