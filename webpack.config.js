var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [{
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};