import parser from '@rcdoc/parser';

type WebpackThis = {
  resourcePath: string;
};

module.exports = function (this: WebpackThis, source) {
  const fileAbsPath = this.resourcePath;
  parser(source, fileAbsPath);
  /* Do some file lookups based on source and modify source */
  return source;
};
