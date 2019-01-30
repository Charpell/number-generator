const express = require('express');
const { numbersController, getNumbers } = require('./numbersController');

const router = express.Router();

router.post('/numbers/generate', numbersController);
router.get('/numbers', getNumbers);

module.exports = router;