import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit"); // ideally instead of "my-rate-limit" it should be something like the user id or ip address (e.g. to limit per user)

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            });
        }
        next();
    } catch (error) {
        console.log("Rate limt error", error);
        next(error);
    }
}

export default rateLimiter;