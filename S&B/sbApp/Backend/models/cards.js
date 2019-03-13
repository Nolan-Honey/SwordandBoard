var mongoose = require("mongoose")
var Schema = mongoose.Schema
var cardSchema = new Schema({
    name: String,
    type: String,
    inventory: {type:Number, default:0}

})
var card = mongoose.model('card', cardSchema)
module.exports = card


var card = new Schema({
    name:String,
    set:String,
    text:String,
    imageUrl:String


})
var Card = mongoose.model('Card',card)

module.exports = Card;