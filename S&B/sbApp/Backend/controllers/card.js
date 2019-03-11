const mtg = require('mtgsdk')

module.exports.card = (req, res, next) => {
    var cardValue = req.body.cardName;
    var cardss = {}
    var cards = []
    mtg.card.all({ name:cardValue, pageSize: 1 })
        .on('data', x => {
            //cardss[x.name] = x.imageUrl
            cards.push(x)
        })

setTimeout(function(){
    res.send(cards)
},3000)

}