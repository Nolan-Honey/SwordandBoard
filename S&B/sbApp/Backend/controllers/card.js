const mongoose = require('mongoose');

module.exports.card = (req, res, next) => {
    var cardValue = req.body.cardName;
    var white = req.body.white
    var blue = req.body.blue
    var black = req.body.black
    var red = req.body.red
    var green = req.body.green
    var set = req.body.set
    var cardColor = []
    if (white == true) {
        white = "W"
        cardColor.push(white)
    }
    if (blue == true) {
        blue = "U"
        cardColor.push(blue)
    }
    if (black == true) {
        black = "B"
        cardColor.push(black)
    }
    if (red == true) {
        red = "R"
        cardColor.push(red)
    }
    if (green == true) {
        green = "G"
        cardColor.push(green)
    }

    var card2 = mongoose.model('card_prices_with_set_and_names')
    card2.find({card:cardValue},function(err,docs){
        if(err){
        }
        console.log(docs)
    });
    var card = mongoose.model('Scryfall');
    if (!set == "") {
        card.find({set_name:set}, function (err, docs) {
            if (err) {
            }
            res.send(docs)
        }
        )
    }
    else{
    if (!cardValue == "" && !cardColor.length == 0) {
        card.find({ colors: { $all: cardColor },name: { "$regex": cardValue, "$options": "i" } }, function (err, docs) {
            if (err) {
            }
            res.send(docs)
        }
        )
    }
    else if(cardValue == ""){
        card.find({ colors: { $all: cardColor } }, function (err, docs) {
            if (err) {
            }
            res.send(docs)
        }
        )
    }
    else {
        card.find({ name: { "$regex": cardValue, "$options": "i" } }, function (err, docs) {
            if (err) {
            }
            res.send(docs)
        })
    }
}
}