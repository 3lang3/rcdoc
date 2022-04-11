module.exports = {
  root: true,
  extends: [require.resolve('@3lang/fabric/dist/eslint')],
  overrides: {
    parserOptions: {
      project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    },
  },
};
