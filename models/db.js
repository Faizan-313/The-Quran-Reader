import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
    PGUSER: process.env.DB_USER,
    PGHOST: process.env.DB_HOST,
    PGDATABASE: process.env.DB_DATABASE,
    PGPASSWORD: process.env.DB_PASSWORD,
    PGPORT: process.env.DB_PORT,
});

export default db;