import config from '../../config';

if (config.env === 'production') {
    module.exports = require('./Root.prod');
} else {
    module.exports = require('./Root.dev');
}
