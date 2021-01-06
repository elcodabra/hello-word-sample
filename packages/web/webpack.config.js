const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Terser = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = resolve(__dirname, '../..');
const public = resolve(root, 'public');
const path = resolve(__dirname, 'build');
const context = resolve(__dirname, 'src');

const ENV_TYPE = process.env.ENV_TYPE || 'development';

const MODE = (() => {
  switch (ENV_TYPE) {
    case 'production':
    case 'staging':
      return 'production';

    case 'development':
      return 'development';

    default:
      return 'none';
  }
})();

process.env.NODE_ENV = MODE;
process.env.BABEL_ENV = MODE;

const dev = MODE === 'development' || MODE === 'none';
const prod = MODE === 'production';

module.exports = {
  mode: MODE,
  devtool: !prod && 'inline-source-map',

  target: 'web',
  context,

  entry: {
    web: './index.js',
  },

  output: {
    path,
    filename: prod ? 'static/js/[name].js' : 'static/js/[name].[chunkhash].js',
  },

  resolve: {
    symlinks: true,
    alias: {
      public,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts|tsx|js|jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
              presets: [
                '@babel/typescript',
                '@babel/react',
                [
                  '@babel/env',
                  {
                    corejs: {
                      version: 3,
                      proposals: true,
                    },
                    modules: false,
                    targets: [
                      'last 5 Chrome versions',
                      'last 10 ChromeAndroid versions',
                      'last 5 Firefox versions',
                      'last 10 FirefoxAndroid versions',
                      'last 5 Edge versions',
                      'last 5 Opera versions',
                      'last 3 Safari versions',
                      'last 4 iOS versions',
                      'last 10 Android versions',
                      'last 2 Samsung versions',
                    ],
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { modules: false },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/assets/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(MODE),
      'process.env.ENV_TYPE': JSON.stringify(ENV_TYPE),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: resolve(public, 'images'), to: 'assets/images' }],
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new Terser({
        test: /\.m?js$/,
      }),
    ],
  },

  devServer: {
    hot: true,
    disableHostCheck: true,
    port: 3001,
    sockPort: 443,
    historyApiFallback: true,
    compress: true,
  },
};
