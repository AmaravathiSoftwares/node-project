import express, { json, urlencoded } from 'express';
import https from "https";
import cors from 'cors';
import fs from "fs"
import cookieParser from 'cookie-parser';
import apiRoutes from './core/index.js'; // import Api Routes 
import { v4 as uuid } from 'uuid';
import * as httpContext from 'express-http-context';
// import padfRouter from './pdfgeneration/index.js'
import path from 'path';
import { fileURLToPath } from 'url';
import envs from "./config.js";
const PORT = envs.PORT || process.env.PORT || 3000;
// create clusters 
import os from 'os';
import { validateJWT } from "./utils/jwtUtils.js"
import padfRouter from './pdfApi/index.js';
const numCPUs = os.cpus().length; // Get the number of available CPU cores
import { parse } from 'url';
import axios from 'axios';
import promClient from 'prom-client';
const app = express();
process.env.OPENSSL_CONF = '/path/to/openssl.cnf';
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, origin || "*"); // Allow any origin dynamically
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization', 'browse', 'x-api-key'],
    // exposedHeaders:["UID"],
    credentials: true,
    preflightContinue: false
};
// emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set view engine
app.set('views', path.join(__dirname, 'pdfApi', 'pdf_html'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
// app.use('/nodeapp/assets', express.static(path.join(__dirname, 'assets')));
// app.use('/assets', validateJWT, express.static(path.join(__dirname, 'assets')));


app.use(cors(corsOptions));
app.use(json({ limit: '500mb' }));
app.use(urlencoded({ limit: '500mb', extended: true }));
app.use(cookieParser());
app.disable('x-powered-by');
app.use((err, _req, _res, next) => (console.error(err.stack, 23), next(err)));
app.use(httpContext.middleware);
app.use(function (req, res, next) {
    res.setHeader('X-Frame-Options', 'DENY'); // Prevent clickjacking
    res.setHeader('X-XSS-Protection', '1; mode=block'); // XSS protection
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Prevent MIME-type sniffing
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'); // Enforce HTTPS
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); // Prevent cross-origin risks
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin'); // Restrict resource sharing 
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none';");
    httpContext.set('reqId', uuid());
    req.body.reqId = uuid();
    next();
});


// ------------------------------------------->>> Prometheus config <<<---------------------------------------

const promRegistry = new promClient.Registry();
promClient.collectDefaultMetrics({ register: promRegistry });
const apiRequestCounter = new promClient.Counter({
    name: "api_total_requests",
    help: "Total number of requests received",
    labelNames: ["method", "endpoint"],
    registers: [promRegistry],
});

const responseTimeHistogram = new promClient.Histogram({
    name: "total_api_response_time",
    help: "Response time of API",
    labelNames: ["method", "endpoint"],
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 5], // Buckets for response time in seconds
    registers: [promRegistry],
});
const responseStatusCounter = new promClient.Counter({
    name: "api_response_status_count",
    help: "Count of API responses by status code",
    labelNames: ["status_code", "method", "endpoint"],
    registers: [promRegistry],
});

// ------------------------------------------->>> LOGGING REQUESTS <<<---------------------------------------------
app.use(function (req, res, next) {
    const endpoint = parse(req.originalUrl).pathname;
    apiRequestCounter.labels(req.method, endpoint).inc();
    res.locals.prometheusTimer = responseTimeHistogram
        .labels(req.method, endpoint)
        .startTimer();
    const oldSend = res.send;
    res.send = function (data) {
        responseStatusCounter
            .labels(res.statusCode.toString(), req.method, endpoint)
            .inc();
        res.locals.prometheusTimer();
        oldSend.apply(res, arguments);
    };
    next();
});


//Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", promRegistry.contentType);
        res.end(await promRegistry.metrics());
    } catch (error) {
        // logger.error("Error generating metrics:", error);
        res.status(500).json({ status: false, message: "Something went wrong " });
    }
});

app.post('/payment-callback', (req, res) => {

    console.log('Gateway Response:', req.body);

    // Adjust these fields according to your gateway response
    const ticketId = req.body.merchant_order_reference;

    // Some gateways send status like SUCCESS / FAILED
    // Change this mapping if needed
    let status = 'failed';

    if (req.body.status === 'SUCCESS' || req.body.txn_status === 'SUCCESS') {
        status = 'success';
    }

    const categoryType = 5;

    // Redirect to Angular frontend (GET request)
    res.redirect(
        `https://8pcpvdcd-3001.inc1.devtunnels.ms/home?ticket_id=${ticketId}&category_type=${categoryType}`
    );

});




app.use(apiRoutes);
app.use("/nodeapp", padfRouter);



app.get('/', (_, res) => res.send("APTMSAI Api Server"));


// Connect to  Redis
// (async function checkRedis() {
//     try {
//         const redisClient = await getRedisClient();
//         if (redisClient) logger.info("Connected to  redis successfully\n\n");
//         else throw new AppError("Unable to connect to redis")
//     } catch (e) {
//         console.log(`Error Connecting to Redis:: ${e}\n\n`);
//     }
// })();

const server = app.listen(PORT, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`http://localhost:${port}`, host, port);
});
