const express = require('express');
const { numbersController } = require('./numbersController');

const router = express.Router();

router.post('/numbers/generate', numbersController);
router.get('/numbers', (req, res) => {
  res.send('How far how far')
});

module.exports = router;