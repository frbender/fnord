module.exports = function (req, res) {
    let userid = req.session.userid;
    if (userid) {
        res.redirect("/panel/overview");
        return;
    }

    res.render('login', {
        wrongCredentials: req.query.wrongCredentials === 'true'
    });
};