module.exports = function (req, res) {
    res.render('register', {
        unknownError: req.query.error === 'true',
        usernameTaken: req.query.usernameTaken === 'true',
        defaults: {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            username: req.query.username
        }
    });
};