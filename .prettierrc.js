module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
  arrowParens: 'avoid',
};
