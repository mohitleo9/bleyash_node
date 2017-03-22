const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// logger.. dev means log to console
app.use(logger('dev'));
// config haha
var port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.get('*', (req, res) => res.status(200)
  .send({message: 'Welcome'})
)

app.listen(port);
