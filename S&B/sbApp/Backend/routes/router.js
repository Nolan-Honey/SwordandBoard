const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ctrlCustomer = require('../controllers/customer');
const customer = require('../models/costumer');



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

    console.log(email, password, process.env.admin_email, process.env.admin_pw);

    if (email == process.env.admin_email && password == process.env.admin_pw) {

        console.log(process.env.jwt_key);

        const token = jwt.sign({
            email: email,
            userId: process.env.admin_id
        }, process.env.jwt_key,
            {
                expiresIn: "1h"
            });

        res.status(200).json({
            message: 'Auth Success',
            token: token,
            expiresIn: 3600
        })

    } else {
        res.status(401).json({
            message: 'Auth Failed'
        })
    }
});

module.exports = router;