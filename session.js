import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";

// Create Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.connect().catch(console.error);

// Initialize Redis store
const RedisStore = connectRedis(session);

// Middleware for session
const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
});

export default sessionMiddleware;
