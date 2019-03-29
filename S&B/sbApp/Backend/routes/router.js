const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const ctrlCustomer = require('../controllers/customer');
const customer = require('../models/customer');
const cardInfo = require('../models/cardInfo');
const ctrlCard = require('../controllers/card');
const History = require('../models/customerHistory');
const Settings = require('../models/adminTools');

router.post('/card',ctrlCard.card);
router.route('/settings/:id').get(function (req, res){
    const id = req.params.id
    Settings.findById(id, (err, setting)=> {
        res.json(setting)
    })
})
router.get('/settings', function (req, res) {
    Settings.find({}).exec(function (err, ci) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(ci)
        }
    })
});
router.route('/settings/update/:id').post(function (req, res){
    const id = req.params.id
    Settings.findById(id, function (err, setting){
        if (!setting)
            return new Error('Could not load customer')
        else{
            setting.Login = req.body.Login
            setting.Pricing = req.body.Pricing
            setting.Stock = req.body.Stock
            setting.Credit = req.body.Credit
            setting.save().then(setting => {
                res.json('Update complete');
            })
            .catch(err => {
                  res.status(400).send("unable to update the database");
            });
        }
    })
})

router.get('/cardInfo', function (req, res) {
    cardInfo.find({}).exec(function (err, ci) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(ci)
        }
    })
});

router.post('/register', ctrlCustomer.register);

router.route('/').get(function (req, res) {
    customer.find(function (err, customer) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(customer)
            res.json(customer)
        }
    });
});

router.get('/customers', function (req, res) {
    customer.find({}).exec(function (err, customers) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(customers)
        }
    })
});

router.post('/login', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    customer.findOne({email: req.body.email})
        .exec()
        .then(doc => {
            bcryptjs.compare(password, doc.password, (err, result) => {
                if(doc && result == true){
                    const token = jwt.sign({
                        email: email,
                        userId: doc._id
                    }, process.env.jwt_key,
                        {
                            expiresIn: "1h"
                        });
            
                    res.status(200).json({
                        message: 'Auth Success',
                        token: token,
                        expiresIn: 3600,
                        currentUser: email,
                        currentUserId: doc._id,
                        role: doc.role
                    })
                }else{
                    res.status(401).json({
                        message: 'Auth Failed'
                    })
                }
            })
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
            //customer.email = req.body.email
            customer.credit = req.body.credit
            
            customer.save().then(customer =>{
                res.json("customer updated")
                let history = new History({
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                    email: customer.email,
                    credit: customer.credit,
                    notes: req.body.notes,
                    time:  Date()
                })
                history.save().then(history =>{
                    //res.json("new update in customer history")
                    console.log("new update in customer history")
                })
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