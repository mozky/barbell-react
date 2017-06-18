const config = {};

config.env = process.env.NODE_ENV || 'development';
config.port = process.env.WEB_PORT || 3000;

module.exports = config;
