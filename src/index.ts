/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

import express = require('express');
import request = require('./model/request');
import user = require('./model/user');
import config = require('./config');
console.dir(config);
var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('views', 'dist/view');
app.use(express.static(__dirname + '/static'));
app.get('/', function (request, response) {
	response.send('Hello World!');
});
app.listen(app.get('port'), function () {
	console.log("Node app is running at localhost:" + app.get('port'));
});
