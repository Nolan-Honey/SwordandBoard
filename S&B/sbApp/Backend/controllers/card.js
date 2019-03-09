const mtg = require('mtgsdk')

module.exports.card = (req, res, next) => {
    var cardValue = req.body.cardName;
    var cardss = {}

    mtg.card.all({ name:cardValue, pageSize: 1 })
        .on('data', x => {
            cardss[x.name] = x.imageUrl
        })

setTimeout(function(){
    res.send(cardss)
},3000)
}