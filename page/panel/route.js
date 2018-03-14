let express = require('express');
let router = express.Router();
let secure = require('../authentication/secureMiddleware');

let overview = require('./overview/overview');
let newProject = require('./new_project/newProject');

router.use(secure);

router.get('/overview', overview);
router.post('/new-project', newProject);
router.get('/new-project', newProject);

module.exports = router;