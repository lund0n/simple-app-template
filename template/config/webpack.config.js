/* eslint-env node */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/bootstrap.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'env',
                {
                  modules: false,
                  loose: true,
                  targets: {
                    browsers: ['ie 11', 'ios 7'],
                  },
                },
              ],
              'react',
            ],
          },
        },
      },
    ],
  },
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      templateParameters: {
        title: pkg.name,
      },
    }),
  ],
  serve: {
    port: 3000,
  },
}
