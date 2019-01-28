const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { numbersController } = require('./numbersController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.route('/tester').get((req, res) =>{
//   res.status(200).send('Welcome to number generator')
//  });
app.route('/generateNumbers').post(numbersController)

// start the server in the port 3333 !
app.listen(3333, () => {
  console.log('Number generator server listening on port 3333.');
});

module.exports = app;
