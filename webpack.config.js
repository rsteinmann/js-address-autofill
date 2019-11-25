var path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
      './src/app.js',
  ],
  output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist')
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
          },
      ]
  },
  resolve: {
      extensions: ['.js', '.json']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    liveReload: false,
    port: 9000
  },
  mode: devMode ? 'development' : 'production'
};