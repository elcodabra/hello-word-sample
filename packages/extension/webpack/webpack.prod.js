const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {
  const mode = 'production';
  env.mode = mode;

  return merge(common(env), {
    mode,
  });
};
