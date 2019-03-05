var mongoose = require("mongoose")
var Schema = mongoose.Schema
var cardSchema = new Schema({
    name: String,
    type: String,
    inventory: {type:Number, default:0}

})
var card = mongoose.model('card', cardSchema)
module.exports = card

