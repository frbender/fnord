let db = require('../database/database');
let salt = require('./salt');

module.exports = async function (username, password) {
    let client = null;
    try {
        client = await db.connect();

        let result = await client.query(
            'SELECT ID, SALTED_PASSWORD_HASH, SALT FROM FNORD_USER WHERE USERNAME = $1',
            [username]
        );
        client.release();

        if (result.rows.length === 0) {
            return false;
        }

        let saltedPassword = result.rows[0].salted_password_hash;
        let saltString = result.rows[0].salt;

        let success = salt(password, saltString) === saltedPassword;
        return success ? result.rows[0].id : false;
    } catch (_) {
        if (client) {
            client.release();
        }
        return false;
    }
};