var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var history = new Schema({
    customer_id: String,
    first_name:String,
    last_name:String,
    email:String,
    credit: String,
    notes: String,
    time:String,
})

module.exports = mongoose.model('customer_history', history);