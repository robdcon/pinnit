const pg = require('pg');
const { Pool } = pg
const cs = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

const pgPool = new Pool()

module.exports = pgPool