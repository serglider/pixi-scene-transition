const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'scene-transition.js',
        publicPath: '/build/',
        library: 'sceneTransition',
        libraryTarget: 'umd'
    },
    plugins: [
        new CleanWebpackPlugin(['build'], { root: path.resolve(__dirname , '..'), verbose: true }),
        new webpack.ProgressPlugin()
    ],
    optimization: {
        noEmitOnErrors: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};