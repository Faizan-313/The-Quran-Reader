import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
    PGUSER: process.env.PG_USER,
    PGHOST: process.env.PG_HOST,
    POSTGRES_DB: process.env.PG_DATABASE,
    POSTGRES_PASSWORD: process.env.PG_PASSWORD,
    PGPORT: process.env.PG_PORT,
});

export default db;