export default function rtgsAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    // const timestamp = req.headers['x-timestamp'];
    // const timestamp = Math.floor(Date.now() / 1000);
    // pm.environment.set("x_timestamp", timestamp);
    if (!apiKey) {
        return res.status(401).json({ status: false, message: "API key required" });
    }

    if (apiKey !== process.env.RTGS_API_KEY) {
        return res.status(403).json({ status: false, message: "Invalid API key" });
    }

    // const now = Math.floor(Date.now() / 1000);
    // if (Math.abs(now - timestamp) > 300) return false;

    next();
}
