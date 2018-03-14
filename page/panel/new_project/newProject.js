let checkRepository = require('../../../server/project/checkRepository');
let newProject = require('../../../server/project/new');

let URL_REGEX = /^(((https?)|(svn)):\/\/)([\da-z\.-]+)(\.([a-z\.]{2,6}))?(\/[\/\w \.-]*)?$/;

function syntaxCorrect(name, url, user, pass) {
    return !(typeof(name) !== 'string'
        || name.length < 3
        || typeof(user) !== 'string'
        || typeof(pass) !== 'string'
        || typeof(url) !== 'string'
        || !url.match(URL_REGEX));

}

module.exports = async function (req, res) {
    let owner = req.session.userid;
    let name = req.body.name;
    let repositoryUrl = req.body.repourl;
    let repositoryUsername = req.body.repouser;
    let repositoryPassword = req.body.repopass;

    if (name === undefined &&
        repositoryUrl === undefined &&
        repositoryUsername === undefined &&
        repositoryPassword === undefined) {
        res.render('new_project', {
            error: false,
            defaults: {
                name: "",
                url: "",
                username: ""
            }
        });
        return;
    }

    if (!syntaxCorrect(name, repositoryUrl, repositoryUsername, repositoryPassword)) {
        res.render('new_project', {
            error: true,
            defaults: {
                name: name,
                url: repositoryUrl,
                username: repositoryUsername
            }
        });
        return;
    }

    if (!(await checkRepository(repositoryUrl, repositoryUsername, repositoryPassword))) {
        res.render('new_project', {
            error: true,
            defaults: {
                name: name,
                url: repositoryUrl,
                username: repositoryUsername
            }
        });
        return;
    }

    await newProject(owner, name, repositoryUrl, repositoryUsername, repositoryPassword);
    res.redirect('/panel/overview?success=true');
};