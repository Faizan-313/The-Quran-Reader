import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";

// Initialize RedisStore
const RedisStore = connectRedis(session);

// Create Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Connect Redis client
redisClient.connect().catch((err) => {
    console.error("Failed to connect to Redis:", err);
});

// Use RedisStore with session
const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    },
});

export default sessionMiddleware;
