let subversion = require('../subversion/subversion');

module.exports = async function (path, username, password) {
    try {
        let result = await subversion.listAsync(
            path,
            {
                'non-interactive': true,
                'no-auth-cache': true,
                'username': username,
                'password': password
            }
        );
        return result.lists.list.entry.length >= 0;
    } catch (e) {
        return false
    }
};