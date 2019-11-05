const express = require('express');
const router = express.Router();

// require("dotenv").config();
// const keys = require('../config/keys');
// console.log('keys aqui', keys)

router.use('/api', require('./api'));

// router.get('/keys', (req, res) => {
//     res.status(200).send(`this is where keys is returned`);
//   })

// router.get('/keys'), (req, res) => {
//     console.log('reaching routes folder')
//     res.json({keys: keys});
// };

module.exports = router;