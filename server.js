var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    stats: { colors: true }
}).listen(8080, function(err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening on localhost:8080');
});