const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let game = new Schema({
    title:String,
    platform:String,
    genre:String,
    rating:String,
    publisher:String,
    release:String,
    status:String
});


module.exports = mongoose.model('game', game);