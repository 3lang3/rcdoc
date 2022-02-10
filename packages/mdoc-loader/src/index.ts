import mdoc from '@mdoc/core';

type WebpackThis = {
  resourcePath: string;
}

module.exports = function (this: WebpackThis, source) {
  const fileAbsPath = this.resourcePath
  mdoc(source, fileAbsPath)
  /* Do some file lookups based on source and modify source */
  return source
}