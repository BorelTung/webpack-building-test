/*eslint no-console:0 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open');

function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.port, '0.0.0.0', function(err) {
    var host = getIPAdress() + ':' + config.port;
    if (err) {
      console.log(err);
    }
    console.log('Listening at ' + host);
    console.log('Opening your system browser...');
    open('http://' + host + '/v2/');
  });
