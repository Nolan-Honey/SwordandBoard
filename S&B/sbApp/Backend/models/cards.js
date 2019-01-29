var mongoose = require("mongoose")
var Schema = mongoose.Schema
var cardSchema = new Schema({
    name: String,
    type: String,
    price: Number,
    inventory: Number,

})
var card = mongoose.model('card', cardSchema)
module.exports = card

