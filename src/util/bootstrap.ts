/// <reference path="../../typings/q/Q.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");
import config = require('../config');
import c = require("../model/country");
import q = require('q');

function bootstrap() {
    var deferred = q.defer();
    mongoose.connect(config.mongo.url, {}, function () {
        deferred.resolve("");
    });
    return q.when(deferred.promise).then(function () {
        return q.all([
            c.Country.create({code: 'CZ', name: 'Czech Republic'}),
            c.Country.create({code: 'SK', name: 'Slovak Republic'})
        ])
    });
}

export = bootstrap;
