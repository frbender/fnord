let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    res.render('welcome');
});

router.get('/imprint', function(req, res) {
    res.render('imprint');
});

module.exports = router;