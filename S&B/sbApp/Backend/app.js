require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
var app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

app.listen(process.env.PORT,()=>console.log(`Server Started on port : ${process.env.PORT}`));