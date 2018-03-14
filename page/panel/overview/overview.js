let list = require('../../../server/project/list');

module.exports = async function (req, res) {
    let userid = req.session.userid;

    let projectList = await list(userid);

    res.render('overview', {
        projects: projectList,
        showProjectOverview: false
    });
};