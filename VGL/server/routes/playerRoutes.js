var express = require('express');
var app = express();
var playerRoutes = express.Router();
var Player = require('../models/player');
//addplayer
playerRoutes.route('/add').post(function (req, res) {
    var player = new Player(req.body);
     player.save()
      .then(item => {
      res.status(200).json({'player': 'Player added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });

  //get data
  playerRoutes.route('/').get(function (req, res) {
    Player.find(function (err, players){
     if(err){
       console.log(err);
     }
     else {
       res.json(players);
     }
   });
 });

 //edit player
 playerRoutes.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Player.findById(id, function (err, player){
        res.json(player);
    });
  });

  //update player
  playerRoutes.route('/update/:id').post(function (req, res) {
    Player.findById(req.params.id, function(err, player) {
     if (!player)
       return next(new Error('Could not load Document'));
     else {
        player.player = req.body.player;
        player.rank = req.body.rank;
        player.score = req.body.score;
        player.time = req.body.time;
        player.gamesPlayed = req.body.gamesPlayed;
        player.status = req.body.status;
        player.join= req.body.join
 
       player.save().then(player => {
           res.json('Update complete');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

 //find player for join
 playerRoutes.route('/join/:id').get(function (req, res) {
  var id = req.params.id;
  Player.findById(id, function (err, player){
      res.json(player);
  });
});

//player join game
playerRoutes.route('/joingame/:id').post(function (req, res) {
  Player.findById(req.params.id, function(err, player) {
   if (!player)
     return new Error('Could not load Document');
   else {
      player.player = req.body.player;
      player.rank = req.body.rank;
      player.score = req.body.score;
      player.time = req.body.time;
      player.gamesPlayed = req.body.gamesPlayed;
      player.status = req.body.status;
      player.join= req.body.join

     player.save().then(player => {
         res.json('Update complete');
     })
     .catch(err => {
           res.status(400).send("unable to update the database");
     });
   }
 });
});
 // Defined delete | remove | destroy route
playerRoutes.route('/delete/:id').get(function (req, res) {
    Player.findByIdAndRemove({_id: req.params.id}, function(err, player){
         if(err) res.json(err);
         else res.json('Successfully removed');
     });
 });

 module.exports = playerRoutes;