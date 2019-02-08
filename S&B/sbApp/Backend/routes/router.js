const express = require('express');
const router = express.Router();
const ctrlCustomer = require('../controllers/customer');
const customer = require('../models/costumer');

router.post('/register',ctrlCustomer.register);

router.route('/').get(function (req,res){
    customer.find(function (err, customer) {
        if (err){
            console.log(err);
        }
        else{
            console.log(customer)
            res.json(customer)
        }
    });
});

router.get('/customers',function(req,res){
    customer.find({}).exec(function(err,customers){
        if (err){
            console.log(err);
        }
        else{
            res.json(customers)
        }
    })
});
//update customer that was edited
router.route('/customer/update/:id').post(function (res, req){
    customer.findById(req.params.id, function (err, customer){
        if (!customer)
            return new Error('Could not load customer')
        else{
            customer.first_name = req.body.first_name
        }
    })
})
module.exports = router;