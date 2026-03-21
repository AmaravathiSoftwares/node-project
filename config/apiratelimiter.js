import express from 'express';
import rateLimit from 'express-rate-limit'; // npm i express-rate-limit
import requestIp from 'request-ip'; // npm i request-ip

const app = express();

// Middleware to get client IP address
app.use(requestIp.mw());

// Create a rate limiter for the specific API endpoint
export const apiRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per windowMs
    keyGenerator: (req) => {
        // Use the x-forwarded-for header or remote address
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    },
    handler: (req, res) => {
        // Send a 429 response when rate limit is exceeded
        res.status(429).json({
            error: 'You sent too many requests. Please wait a while then try again.',
        });
    },
});
