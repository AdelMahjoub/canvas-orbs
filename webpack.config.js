const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.WEBPACK_BUILD_MODE === 'dev';

const config = {
  entry: {
    bundle: ['./src/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: dev ? '[name].js' : '[name][chunkhash:8].js',
    publicPath: '/'
  },
  watch: dev,
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: 'head',
      base: {
        href: '/',
      },
      title: 'myApp',
      lang: 'en-US',
      meta: {
        description: '',
      },
      favicon: path.resolve(__dirname, './src/favicon.ico'),
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        collapseWhitespace: true,
        minifyJS: true,
      },
    }),
  ],
  devServer: {
    hot: true,
    overlay: true
  },
  devtool: dev ? 'cheap-module-eval-source-map' : false
}

if (!dev) {
  config.plugins.push(new UglifyJsPlugin({
    sourceMap: false,
  }));
}

module.exports = config;