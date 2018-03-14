let subversion = require('svn-interface');
let Promise = require("bluebird");
Promise.promisifyAll(subversion);

module.exports = subversion;