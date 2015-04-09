/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");

export interface IRequest {
    username: string;
    description: string;
    inception: Date;
    language: string;
    items: [{
        description: string;
        quantity: number;
    }];
    maxPrice: number;
    offers:[{
        username: string;
        date: Date;
        price: number;
        postage: number;
    }];
}

export interface IRequestModel extends IRequest, mongoose.Document {
}

export var requestSchema:mongoose.Schema = new mongoose.Schema({
    username: String,
    gender: String,
    forename: String,
    surname: String,
    password: String,
    email: String,
    displayName: String,
    lastLogin: Date
});

export var Request = mongoose.model<IRequestModel>("Request", requestSchema);

