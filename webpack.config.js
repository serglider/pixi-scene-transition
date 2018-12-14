const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scene-transition.js',
            publicPath: '/build/'
        },
        devtool: 'source-map',
        plugins: [
            new webpack.ProgressPlugin()
        ]
    };
};