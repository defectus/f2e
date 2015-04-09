/// <reference path="./../typings/node/node.d.ts" />
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config-' + process.env.ENV + '.json', 'utf8'));
export = config;
