var mongoose = require("mongoose");
var config = require('../config');
var country = require("../model/country");
var q = require('q');

function bootstrap() {
    var deferred = q.defer();
    mongoose.connect(config.mongo.url, {}, function () {
        deferred.resolve(true);
    });
    return q.when(deferred.promise).then(function () {
        return q.all([
            country.update({_id:1},{_id: 1, code: 'CZ', name: 'Czech Republic'},{upsert:true}).exec(),
            country.update({_id:2},{_id: 2, code: 'SK', name: 'Slovak Republic'},{upsert:true}).exec()
        ]);
    });
}

module.exports = bootstrap;
