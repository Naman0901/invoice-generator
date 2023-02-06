const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "naman",
    database: "invoice",
    port: 5432
});

module.exports = pool;