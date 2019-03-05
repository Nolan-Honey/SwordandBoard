var mongoose = require("mongoose")
var cardInfoSchema = mongoose.Schema({
    card: String,
    category: String,
    msrp: String,
    sale: String
})
var cardInfo = mongoose.model('card_prices_with_set_and_names', cardInfoSchema)
module.exports = cardInfo
