const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/', // to avoid issue with loading main.js with nested paths
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ]
}

module.exports = merge(commonConfig, devConfig);
