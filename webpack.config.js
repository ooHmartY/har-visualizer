/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        lib: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            'react',
        ],
        main: './src/index.js',
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
        }),
    ],
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: false,
        lazy: true,
        filename: '[name]-[chunkhash].js',
        hot: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: 1,
                        },
                    },
                    { loader: 'postcss-loader' },
                ],
            },
        ],
    },
};
