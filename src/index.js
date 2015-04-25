var express = require('express');
var request = require('./model/request');
var user = require('./model/user');
var config = require('./config');
var bootstrap = require('./util/bootstrap');
var country = require('./model/country');


var application = function () {
    console.dir(config);
    var app = express();
    app.set('port', (process.env.PORT || 5000));
    app.set('view engine', 'jade');
    app.set('views', 'dist/view');
    app.use(express.static(__dirname + '/static'));
    app.get('/', function (req, res) {
        country.find({}).exec().then(function(countries){
            res.render('request', {countries: countries});
        });
    });
    app.listen(app.get('port'), function () {
        console.log("Node app is running at localhost:" + app.get('port'));
    });
};
bootstrap().done(application);

