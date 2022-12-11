const path = require("path");
const { merge } = require('webpack-merge');//added again
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: 'development',
  output: {
    // filename: 'bundle.js', //do we need this?
    path: path.resolve(__dirname, 'dist'),
  },
  // devServer: {
  //   port: 3000,
  //   open: true,
  //   // host: "localhost",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new EslintPlugin({
      extensions: 'ts',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
