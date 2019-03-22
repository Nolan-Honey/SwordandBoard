const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//+++++++++++++++++++++++++++EMAIL SERVICE++++++++++++++++++++++++++++++++++++++
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '02capstone@gmail.com',
    pass: 'Capstone23#'
  }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Customer = require('../models/customer');


module.exports.register = (req, res, next) => {

  const email = req.body.email;
  Customer.findOne({ email: email })
    .exec()
    .then(result => {
      if (result) {
        res.status(400).json({
          message: "User Already Exist!"
        });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          const customer = new Customer({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            credit: 0,
            time: new Date().toString().substring(4, 15)
          });

          customer.save((err, doc) => {
            if (!err) {
              res.send(doc);
            }
          });

          var mailOptions = {
            from: '02capstone@gmail.com',
            to: email,
            subject: 'Sword and Board',
            text: 'Your Sword and Board account informations.\nusername: ' + email
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        });
      }
    })




}