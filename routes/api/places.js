const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

// GET all images
router.get('/', (req, res) => {
// console.log('res  >>', res.json)
// console.log('keys please  >>', keys)
    return keys;
});

module.exports = router;


