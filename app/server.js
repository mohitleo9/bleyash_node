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

// spa app so whatever!
app.get('/', (req, res) =>{
  res.render('index');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error' + JSON.stringify(err));
});

app.listen(port);
