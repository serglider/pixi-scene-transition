const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[chunkhash].bundle.js'
        },
        devtool: 'source-map',
        plugins: [
            new webpack.ProgressPlugin(),
            new htmlWebpackPlugin({
                title: 'PIXI',
                template: 'index.html'
            })
        ]
    };
};