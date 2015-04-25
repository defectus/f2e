var mongoose = require("mongoose");

var countrySchema = new mongoose.Schema({
    _id: {type: String},
    code: String,
    name: String
});

module.exports = mongoose.model("Country", countrySchema);

