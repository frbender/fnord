let check = require('../../../server/account/check');
let newUser = require('../../../server/account/new');

async function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let checkResult = await check(username, password);

    if (checkResult === false) {
        res.redirect('/authentication/login?wrongCredentials=true');
    } else {
        req.session.userid = checkResult;
        res.redirect('/panel/overview');
    }
}

function logout(req, res) {
    delete req.session.userid;
    res.redirect('/authentication/login');
}

async function register(req, res) {
    function dataValid(firstname, lastname, username, password) {
        return !(
            (firstname === undefined ||
                lastname === undefined ||
                username === undefined ||
                password === undefined) ||
            (firstname.length < 2 ||
                lastname.length < 2 ||
                username.length < 2 ||
                password.length < 5));
    }

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let termsconditions = req.body.termsconditions === "on";

    let tryAgainParams = `firstname=${firstname}&lastname=${lastname}&username=${username}`;

    if (!termsconditions || !dataValid(firstname, lastname, username, password)) {
        res.redirect(`/authentication/register?${tryAgainParams}&error=true`);
    } else {
        let status = await newUser(firstname, lastname, username, password);

        if (status.success) {
            req.session.userid = status.userid;
            res.redirect('/panel/overview');
        } else if (status.usernameTaken) {
            res.redirect(`/authentication/register?${tryAgainParams}&usernameTaken=true`);
        } else {
            res.redirect(`/authentication/register?${tryAgainParams}&error=true`);
        }
    }
}

let validActions = ["login", "logout", "register"];
module.exports = function (req, res) {
    let action = req.query.action;
    let validAction = validActions.indexOf(action) !== -1;

    if (validAction) {
        switch (action) {
            case 'login':
                login(req, res);
                break;
            case 'logout':
                logout(req, res);
                break;
            case 'register':
                register(req, res);
                break;
        }
    } else {
        res.redirect('/');
    }
};