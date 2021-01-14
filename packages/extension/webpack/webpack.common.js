const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BuildManifest = require('./webpack.manifest');

const root = resolve(__dirname, '../../..');
const public = resolve(root, 'public');
const path = resolve(__dirname, '../dist/js');
const context = resolve(__dirname, '../src');

module.exports = (env) => ({
  entry: {
    popup: resolve(context, 'popup/index.js'),
    background: resolve(context, 'background.ts'),
    content: resolve(context, 'content/index.js'),
    options: resolve(context, 'options.ts'),
    learn: resolve(context, 'learn/index.js'),
  },
  output: {
    publicPath: '',
    path,
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
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
                      version: '3.6',
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
              name: '../static/assets/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    symlinks: true,
    alias: {
      react: resolve(__dirname, '../node_modules/react'),
      '~public': public,
      '~static': resolve(__dirname, '../static'),
      '~components': resolve(context, 'components'),
      '~utils': resolve(context, 'utils'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: resolve(public, 'images'), to: '../images' },
        { from: resolve(public, 'fonts'), to: '../fonts' },
        {
          from: '.',
          to: '../',
          globOptions: {
            ignore: ['manifest.json'],
          },
          context: './static',
        },
      ],
    }),
    new BuildManifest({
      browser: env.browser,
      pretty: env.mode === 'production',
      stream: env.stream,
    }),
  ],
});
