module.exports = function (req, res, next) {
    let userid = req.session.userid;
    if (!userid) {
        res.status(403);
        res.render('403');
        return;
    }
    next();
};