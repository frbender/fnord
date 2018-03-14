let db = require('../database/database');

module.exports = async function (userid) {
    let client = null;
    try {
        client = await db.connect();

        let result = await client.query(
            `SELECT
               fnord_project.id,
               fnord_project.name,
               fnord_project.url
             FROM
                 fnord_project
               JOIN
                 fnord_user
               ON
                 fnord_project.owner = fnord_user.id
             WHERE
               fnord_user.id = $1`,
            [userid]
        );
        client.end();

        return result.rows;
    } catch (_) {
        if (client) {
            client.end();
        }
        return false;
    }
};