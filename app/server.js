const express = require('express');
var mongoose   = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const restApi = require('./routes/rest-api');

const debug = true;
const app = express();
// logger.. dev means log to console
app.use(logger('dev'));
// config haha
var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// db
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Middlewares
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
if (debug){
  // dev deps
  const webpackConfig = require('../webpack.config.js');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    quiet: true,
    publicPath: `http://localhost:${port}/static/`,
    stats: {colors: true}
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}
else {
  app.use(express.static(path.join(__dirname + '/build')));
}

// routes
app.use('/api/', restApi);
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
  console.error(err);
  res.status(500).json({error: err.message});
});

app.listen(port);
