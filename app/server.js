const express = require('express');
var mongoose   = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const restApi = require('./routes/rest-api');
const config = require('./config');

const debug = config.DEBUG;
const app = express();
// logger.. dev means log to console
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// db
// mongoose promise is depricated
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Middlewares
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// session
let store = new MongoDBStore({
  uri: config.MONGODB_URI,
  collection: 'session'
});
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});
app.use(session({
  secret: config.SESSION_SECRET,
  key: config.SESSION_KEY,
  store,
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
    quiet: false,
    publicPath: `http://localhost:${config.SERVER_PORT}/static/`,
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
});

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
  res.json({error: err.message});
});

module.exports = app;
