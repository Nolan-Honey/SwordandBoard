const csv = require('csv-parser'),
      fs = require('fs'),
      CardData = require('../models/cards')

fs.createReadStream('./mtgPrices.csv')  
  .pipe(csv())
  .on('data', (row) => {
    for(var detail in row){
      if(row.msrp){
        var prices=row.msrp.trim().replace('/CAD$')
        var p=parseFloat(prices)
        var card = new CardData({name:row.card, category:row.category, price:p})
        card.save((err)=>{
          if(err) throw err;
          console.log('====CARD SAVED TO DATABASE====\nName: '+ card.name+'\nCategory: '+card.category+'\nPrice: '+card.price+'\n')
        })
      }else{
        var card = new CardData({name:row.card, category:row.category})
        card.save((err)=>{
          if(err) throw err;
          console.log('====CARD SAVED TO DATABASE====\nName: '+ card.name+'\nCategory: '+card.category+'\nPrice: '+card.price+'\n')
        })
      }
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });