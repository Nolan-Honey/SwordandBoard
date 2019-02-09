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
//find customer by id
router.route('/customers/:id').get(function (req, res){
    const id = req.params.id
    customer.findById(id, (err, customer)=> {
        res.json(customer)
    })
})

//update customer
router.route('/customers/update/:id').post(function (req, res){
    const id = req.params.id
    customer.findById(id, function (err, customer){
        if (!customer)
            return new Error('Could not load customer')
        else{
            customer.first_name = req.body.first_name
            customer.last_name = req.body.last_name
            customer.email = req.body.email
            customer.password = req.body.password
            customer.credit = req.body.credit
            
            customer.save().then(customer =>{
                res.json("customer updated")
            })
            .catch(function (err) {
                res.status(400).send('unable to update database')
            });
        }
    })
})

//Delete Customer
router.route('/customers/delete/:id').get(function(req,res){
    const id = req.params.id
    customer.findByIdAndRemove(id, (err, customer)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json("successfully removed customer")
        }
    })
})
module.exports = router;