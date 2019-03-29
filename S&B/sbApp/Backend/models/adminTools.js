var mongoose = require("mongoose")
var Schema = mongoose.Schema
var settings = new Schema({
    Login: Boolean,
    Pricing: Boolean,
    Stock: Boolean,
    Credit: Boolean
})
module.exports = mongoose.model('Settings', settings)
