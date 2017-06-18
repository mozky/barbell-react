var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var serverConfig = require('./webpack.config');
var config = require('./config.js');

new WebpackDevServer(webpack(serverConfig), {
    publicPath: serverConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
}).listen(config.port, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }

  console.log('Barbell started at localhost:' + config.port);
});
