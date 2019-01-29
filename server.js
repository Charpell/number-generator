const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const { numbersController } = require('./numbersController');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname+'/dist/number-generator'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/number-generator/index.html'))
})
app.use('/api/v1', routes);

// start the server in the port 3333 !
app.listen(3333, () => {
  console.log('Number generator server listening on port 3333.');
});

module.exports = app;
