import pg from "pg";
import env from "dotenv";

env.config();

console.log("DB User:", process.env.PG_USER);
console.log("DB Password:", process.env.PG_PASSWORD);
console.log("DB Host:", process.env.PG_HOST);
console.log("DB Port:", process.env.PG_PORT);


const db = new pg.Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,    
    },
});

export default db;