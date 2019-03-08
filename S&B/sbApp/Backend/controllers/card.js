const mtg = require('mtgsdk')


module.exports.card = (req, res, next) => {
    var cardValue = req.body.cardName;
    //var card = "Squee"
    var cards = []
    var cardss = {}

    mtg.card.all({ name:cardValue, pageSize: 1 })
        .on('data', x => {
            cards.push(x.name)
            cardss[x.id] = x.name
        })

var promise1 = new Promise(function(resolve, reject) {
setTimeout(function() {
    resolve(cards);
},2000);
});
var promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(cardss);
    },2000);
    });
  
promise2.then(function(value) {
    console.log(value);
});

}