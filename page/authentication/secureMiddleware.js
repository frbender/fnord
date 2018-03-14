module.exports = function (req, res, next) {
    next();
    return;
    let userid = req.session.userid;
    if (!userid) {
        res.status(403);
        res.render('403');
        return;
    }
    next();
};