const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {

    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scene-transition.js',
            publicPath: '/build/',
            library: 'sceneTransition',
            libraryTarget: 'umd'
        },
        devServer: {
            open: true
        },
        devtool: 'source-map',
        plugins: [
            new webpack.ProgressPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    };
};