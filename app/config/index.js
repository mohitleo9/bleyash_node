const fs = require('fs');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;
let configBuffer = null;

// Init config_buffer according to the NODE_ENV
switch (NODE_ENV) {
  case 'production':
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'production.json'), 'utf-8');
    break;
  case 'development':
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'development.json'), 'utf-8');
    break;
  default:
    process.env.NODE_ENV = 'development';
    configBuffer = fs.readFileSync(path.resolve(__dirname, 'development.json'), 'utf-8');
}

let defaultBuffer = fs.readFileSync(path.resolve(__dirname, 'default.json'), 'utf-8');
let defaultConfig = JSON.parse(defaultBuffer);
let envConfig =  JSON.parse(configBuffer);
let config = Object.assign({}, defaultConfig, envConfig);
module.exports = config;
