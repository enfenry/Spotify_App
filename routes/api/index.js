const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(`<a href='/api/places/'>Places</a>`);
})

router.get('/test', (req, res) => {
  res.send('test')
});


// router.use('/albums', require('./albums'));
// router.use('/images', require('./images'));
// router.use('/tags', require('./tags'));

module.exports = router;