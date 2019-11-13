const express = require('express');
const router = express.Router();
var request = require('request'); // "Request" library
var querystring = require('querystring');

// require("dotenv").config();
// const keys = require('../config/keys');
// console.log('keys aqui', keys);


router.use('/api', require('./api'));

module.exports = router;