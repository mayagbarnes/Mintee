const path = require('path');
const ClassPropertiesPlugin = require("@babel/plugin-proposal-class-properties"); //installed via npm

module.exports = {
    context: __dirname,
    entry: './frontend/mint.jsx',
    output: {
        path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: [ClassPropertiesPlugin, "@babel/plugin-transform-runtime"],
            }
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        }
      ]
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '*'],
    },
   
};