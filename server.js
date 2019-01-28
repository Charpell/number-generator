const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { numbersController } = require('./numbersController');
const routes = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', routes);

// start the server in the port 3333 !
app.listen(3333, () => {
  console.log('Number generator server listening on port 3333.');
});

module.exports = app;
