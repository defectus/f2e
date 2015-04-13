/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
var express = require('express');
var config = require('./config');
console.dir(config);
var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');
app.set('views', 'dist/view');
app.use(express.static(__dirname + '/static'));
app.get('/', function (req, res) {
    res.render('request', {countries: [{code: 'CZ', description: 'Czech Republic'}]});
});
app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});
//# sourceMappingURL=index.js.map
