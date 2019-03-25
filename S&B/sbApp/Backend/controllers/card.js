const mongoose = require('mongoose');

module.exports.card = (req, res, next) => {
var cardValue = req.body.cardName;
var white = req.body.white
var blue = req.body.blue
var black = req.body.black
var red = req.body.red
var green = req.body.green
var colors =[]
if(white == true){
    white = "W"
    if(blue == true){
        blue = "B"
        if(black == true){
            black = "U"
            if(red == true){
                red = "R"
                if(green == true){
                    green = "G"
                }
            }
        }
    }
}
var card = mongoose.model('Scryfall');
card.find({name: { "$regex": cardValue, "$options": "i" } },function (err, docs) {
    if(err){
    }
    console.log(white,blue,black,red,green)
    res.send(docs)
})
}
//const mtg = require('mtgsdk')

//     var cards = []
//     mtg.card.all({ name:cardValue, pageSize: 1 })
//         .on('data', x => {
//             cards.push(x)
//         })

// setTimeout(function(){
//     res.send(cards)
// },3000)