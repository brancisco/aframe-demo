const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: [path.join(__dirname, 'public')],
        watchContentBase: true,
        hot: true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components/')
        }
    }
};