// require('dotenv').config();
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
    password: process.env.DB_PASSWORD
});

pgPool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
});

pgPool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
        return;
    }

    console.log('Successfully connected to PostgreSQL');
    console.log('Database host:', process.env.PGHOST);

    client.query('SELECT NOW()', (err, result) => {
        release(); // Release client back to pool

        if (err) {
            console.error('Error executing query', err.stack);
            return;
        }

        console.log('Connection test query successful:', result.rows[0]);
    });
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