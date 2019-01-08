const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let player = new Schema({
    playerName: String,
    rank: Number,
    score: Number,
    time: String,
    gamesPlayed: String,
    status: String,
    join: String
});


module.exports = mongoose.model('player', player);

