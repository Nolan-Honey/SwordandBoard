const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

module.exports.register = (req, res, next) => {
    var customer = new Customer();
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.email = req.body.email;
    customer.password = req.body.password;
    customer.credit = 0
    customer.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
    });
}