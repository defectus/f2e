/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");

export interface ICountry {
    code: string;
    name: string;
}

export interface ICountryModel extends ICountry, mongoose.Document {
}

export var countrySchema:mongoose.Schema = new mongoose.Schema({
    code: String,
    name: String
});

export var Country = mongoose.model<ICountryModel>("Country", countrySchema);

