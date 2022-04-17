const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const productionConfig = require('./webpack.config.prod');
const developmentConfig = require('./webpack.config.dev');

module.exports = env => {
  if (env.production) {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};