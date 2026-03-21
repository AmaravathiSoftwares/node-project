// import process from "node:process";
// import redis from "redis";

// const redisClient = redis.createClient({
//     url: process.env.REDIS_URI,
// });

// redisClient.on("error", (err) => {
//     console.error("Redis error:", err);
// });

// async function initializeRedisClient() {
//     if (redisClient.isOpen) {
//         return redisClient;
//     }

//     await redisClient.connect();
//     await redisClient.ping();
//     console.log("Connected to Redis");

//     return redisClient;
// }

// export { initializeRedisClient };


// 14052025

// const { createClient } = require("redis");

// let redisClient;
// module.exports = {
//     getRedisClient: async () => {
//         if (!redisClient) {
//             try {
//                 redisClient = createClient({ url: REDIS_ENDPOINT });
//                 redisClient.on("error", (err) =>
//                     console.log("Redis Client Error", err)
//                 );
//                 await redisClient.connect();
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//         return redisClient;
//     },

//     getDataFromRedis: async (key) => {
//         let data;
//         try {
//             data = JSON.parse(await redisClient.get(key));
//         } catch (e) {
//             logger.error(e);
//         }
//         return data;
//     },

//     setDataInRedis: async (key, value) => {
//         try {
//             await redisClient.set(key, JSON.stringify(value), { NX: false });
//         } catch (e) {
//             logger.error(e);
//         }
//     },

//     setDataInRedisWithExpiry: async (key, value, expiry) => {
//         try {
//             await redisClient.set(key, JSON.stringify(value), { EX: expiry });
//         } catch (e) {
//             logger.error(e);
//         }
//     },
// };

import { createClient } from 'redis';

let redisClient;
const REDIS_ENDPOINT = process.env.REDIS_ENDPOINT || 'redis://localhost:6379';
export const getRedisClient = async () => {
    if (!redisClient) {
        try {
            redisClient = createClient({ url: REDIS_ENDPOINT });
            redisClient.on('error', (err) =>
                console.log('Redis Client Error', err)
            );
            await redisClient.connect();
        } catch (e) {
            console.log(e);
        }
    }
    return redisClient;
};

export const getDataFromRedis = async (key) => {
    let data;
    try {
        data = JSON.parse(await redisClient.get(key));
    } catch (e) {
        logger.error(e);
    }
    return data;
};

export const setDataInRedis = async (key, value) => {
    try {
        await redisClient.set(key, JSON.stringify(value), { NX: false });
    } catch (e) {
        logger.error(e);
    }
};

export const setDataInRedisWithExpiry = async (key, value, expiry) => {
    try {
        await redisClient.set(key, JSON.stringify(value), { EX: expiry });
    } catch (e) {
        logger.error(e);
    }
};

