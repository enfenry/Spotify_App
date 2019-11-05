const express = require('express');
const router = express.Router();
// const keys = require('../../config/keys');

// GET all places
router.get('/', (req, res) => {
    // console.log('res  >>', res.json)
    // console.log('keys please  >>', keys)
    res.json({ keys: keys })
});

module.exports = router;


