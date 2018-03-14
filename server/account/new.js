let db = require('../database/database');
let crypto = require('crypto');
let salt = require('./salt');

function genString() {
    return crypto.randomBytes(128)
        .toString('hex')
        .slice(0, 256);
}

async function createUser(client, firstname, lastname, username, password) {
    let query = `INSERT INTO 
                   FNORD_USER (USERNAME,FIRST_NAME,LAST_NAME,SALTED_PASSWORD_HASH,SALT) 
                 VALUES
                   ($1, $2, $3, $4, $5)
                 RETURNING
                   ID`;

    let saltString = genString();
    let saltedPassword = salt(password, saltString);
    let result = await client.query(
        query,
        [username, firstname, lastname, saltedPassword, saltString]
    );

    return result.rows[0].id;
}


module.exports = async function (firstname, lastname, username, password) {
    let status = {
        success: false,
        usernameTaken: false,
        userid: null
    };
    let client = null;
    try {
        client = await db.connect();

        let result = await client.query(
            'SELECT ID FROM FNORD_USER WHERE USERNAME = $1',
            [username]
        );

        if (result.rows.length > 0) {
            status.usernameTaken = true;
        } else {
            status.userid = await createUser(client, firstname, lastname, username, password);
            status.success = true;
        }

        client.release();
        return status;
    } catch (_) {
        if (client) {
            client.release();
        }
        return status;
    }
};