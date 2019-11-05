const express = require('express');
const router = express.Router();


// require("dotenv").config();
// const keys = require('../../config/keys');
// console.log('keys hyurrr', keys)

router.get('/', (req, res) => {
  res.status(200).send(`<a href='/api/places/'>Places</a>`);
})

router.get('/test', (req, res) => {
  res.send('test')
});

// router.get('/keys'), (req, res) => {
//   console.log('reaching routes/api folder')
//   res.json({keys: keys});
// };

router.use('/keys', require('./keys'));
router.use('/places', require('./places'));

module.exports = router;