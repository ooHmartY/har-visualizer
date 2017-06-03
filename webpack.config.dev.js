/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const config = require('./webpack.config');

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
        ].concat(_.tail(config.entry.main)),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ].concat(config.plugins),
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
    module: config.module,
};
