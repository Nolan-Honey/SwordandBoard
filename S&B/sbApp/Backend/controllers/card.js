const mtg = require('mtgsdk')



module.exports.card = (req, res, next) => {

    var cardName = req.body.cardName;

    var card = "Squee"
    mtg.card.all({ name:card, pageSize: 1 })
    .on('data', card => {
        console.log(card.name)
    
    })

console.log(cardName)
}