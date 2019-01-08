var express = require('express');
var gamesRoutes = express.Router();
var game = require('../models/game');


  //get data
  gamesRoutes.route('/').get(function (req, res) {
    game.find(function (err, games){
     if(err){
       console.log(err);
     }
     else {
       res.json(games);
     }
   });
 });


 module.exports = gamesRoutes;