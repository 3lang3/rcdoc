// const babelJest = require('babel-jest');

// module.exports = babelJest.createTransformer(babelOptions);

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  "env": {
    "test": {
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
};