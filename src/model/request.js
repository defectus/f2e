/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require("mongoose");
exports.requestSchema = new mongoose.Schema({
    username: String,
    gender: String,
    forename: String,
    surname: String,
    password: String,
    email: String,
    displayName: String,
    lastLogin: Date
});
exports.Request = mongoose.model("Request", exports.requestSchema);
//# sourceMappingURL=request.js.map