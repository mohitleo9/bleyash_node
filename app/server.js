const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
// logger.. dev means log to console
app.use(logger('dev'));
// config haha
var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// XXX
app.use(session({
  secret: '$#%!@#@@#caddmiumSSDASASDVV@@@@',
  key: 'sid',
  resave: false,
  saveUninitialized: true,
}));
// static files
app.use(express.static(path.join(__dirname + '/build')));



app.get('/', (req, res) =>{
  res.render('index');
})

app.listen(port);
