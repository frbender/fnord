let pg = require('pg');
let config = require('../../configuration');

module.exports = (function () {
    let pool = new pg.Pool({
        user: config.database.username,
        host: config.database.hostname,
        database: config.database.database,
        password: config.database.password,
        port: config.database.hostport,
    });

    return pool;
})();