let express = require('express');
let router = express.Router();
let secure = require('../authentication/secureMiddleware');

let overview = require('./overview/overview');

router.use(secure);

router.get('/overview', overview);
router.get('/new-project', function (req, res) {
    res.render('new_project');
});

module.exports = router;