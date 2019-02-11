const mongoose = require('mongoose');
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
const Customer = mongoose.model('Customer');

module.exports.register = (req, res, next) => {
    var customer = new Customer();
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.email = req.body.email;
    customer.password = req.body.password;
    customer.credit = 0,
    customer.time =  new Date().toString().substring(4,15);
    customer.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
    });
    var mailOptions = {
        from: '02capstone@gmail.com',
        to: customer.email,
        subject: 'Sword and Board',
        text:'Your Sword and Board account informations.\nusername: '+customer.email+"\npassword: "+ customer.password
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}