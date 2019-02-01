const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname+'/dist/client'));

app.use('/api/v1', routes);

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/client/index.html'))
})

// start the server in the port || 3333 !
app.listen(port, () => {
  console.log('Number generator server listening on port '+port);
});

module.exports = app;
