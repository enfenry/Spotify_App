const express = require('express');
const router = express.Router();

// require("dotenv").config();
// const keys = require('../../config/keys');
// console.log('keys har dee har', keys)

// GET all keys
router.get('/', (req, res) => {
// console.log('res  >>', res.json)
// console.log('keys please  >>', keys)
    res.json({keys:keys})
});

module.exports = router;