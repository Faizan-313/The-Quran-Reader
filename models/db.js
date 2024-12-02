import pg from "pg";
import env from "dotenv";

env.config();

// console.log("DB User:", process.env.PG_USER);
// console.log("DB Password:", process.env.PG_PASSWORD);
// console.log("DB Host:", process.env.PG_HOST);
// console.log("DB Port:", process.env.PG_PORT);


// const db = new pg.Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,    
//     },
// });

const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


export default db;