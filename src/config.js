var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config-' + process.env.ENV + '.json', 'utf8'));
module.exports = config;
