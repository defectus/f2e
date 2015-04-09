/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");

export interface IOrder {
    seller: string;
    buyer: string;
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

export interface IOrderModel extends IOrder, mongoose.Document {
}

export var orderModel:mongoose.Schema = new mongoose.Schema({
    username: String,
    gender: String,
    forename: String,
    surname: String,
    password: String,
    email: String,
    displayName: String,
    lastLogin: Date
});

export var Request = mongoose.model<IOrderModel>("Order", orderModel);

