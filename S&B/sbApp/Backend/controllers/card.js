const mongoose = require('mongoose');

module.exports.card = (req, res, next) => {
var cardValue = req.body.cardName;
var card = mongoose.model('Scryfall');
card.find({name:cardValue},function (err, docs) {
    if(err){
        
    }
    console.log(docs)
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