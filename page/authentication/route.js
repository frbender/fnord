let express = require('express');
let router = express.Router();

let login = require('./login/login');
let forward = require('./forward/forward');
let register = require('./register/register');

router.post('/forward', forward);
router.get('/login', login);
router.get('/register', register);

module.exports = router;