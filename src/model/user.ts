/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require("mongoose");

export interface IUser {
    username: string;
    gender: string;
    forename: string;
    surname: string;
    password: string;
    email: string;
    displayName: string;
    motherLanguage: string;
    languages: [string];
    lastLogin: Date;
}

export interface IUserModel extends IUser, mongoose.Document {
}

export var userSchema:mongoose.Schema = new mongoose.Schema({
    username: String,
    gender: String,
    forename: String,
    surname: String,
    password: String,
    email: String,
    displayName: String,
    lastLogin: Date
});

export var User = mongoose.model<IUserModel>("User", userSchema);

