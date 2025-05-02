require('dotenv').config();
const pg = require('pg');
const { Pool } = pg
// const connectionString = "host=35.214.59.104 port=5432 dbname=dbkvhbnfgnd7qh user=uxcbxdwm5ywui password=xxxxxxx connect_timeout=10 sslmode=prefer";
const connectionString = process.env.PG_CONNECTION_STRING
const pgPool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});


const pgClient = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
})

module.exports.pgPool = pgPool
module.exports.pgClient = pgClient