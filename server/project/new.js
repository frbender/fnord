let db = require('../database/database');

async function createProject(client, userid, name, url, username, password) {
    let query = `INSERT INTO 
                   FNORD_PROJECT (OWNER, NAME, URL, SVN_USERNAME, SVN_PASSWORD) 
                 VALUES
                   ($1, $2, $3, $4, $5)
                 RETURNING
                   ID`;

    let result = await client.query(
        query,
        [userid, name, url, username, password]
    );

    return result.rows[0].id;
}


module.exports = async function (userid, name, url, username, password) {
    let client = null;
    try {
        client = await db.connect();

        let id = await createProject(client, userid, name, url, username, password);

        client.release();
        return id;
    } catch (_) {
        if (client) {
            client.release();
        }
        return null;
    }
};