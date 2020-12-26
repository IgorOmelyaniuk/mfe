const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/', // to avoid issue with loading main.js with nested paths
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: 'index.html',
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap'
      },
      shared: packageJson.dependencies,
    }),
  ]
}

module.exports = merge(commonConfig, devConfig);
