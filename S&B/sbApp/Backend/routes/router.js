const express = require('express');
const router = express.Router();
const ctrlCustomer = require('../controllers/customer')

router.post('/register',ctrlCustomer.register);

module.exports = router;