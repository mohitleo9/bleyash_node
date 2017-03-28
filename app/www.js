const app = require('./server');
const config = require('./config');

app.listen(config.server.port);
