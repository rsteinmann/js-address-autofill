const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

console.log('devMode:', devMode)

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'addressAutofill.js',
        libraryTarget: 'var',
        library: 'AddressAutofill',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new UnminifiedWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json']
    },
    devtool: 'source-map',
    devServer: {
    contentBase: [
        path.join(__dirname, 'demo'),
        path.join(__dirname, 'dist'),
    ],
    compress: true,
    liveReload: true,
    port: 9000
    },
}