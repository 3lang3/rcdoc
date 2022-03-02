import { join } from 'path';
import type { InlineConfig, LibraryFormats } from 'vite';
import { setBuildTarget } from '../common';
import { CWD, PROJECT_ES_DIR, PROJECT_CJS_DIR, getPackageJson } from '../common/constant';

export function getViteConfigForPackage({
  minify,
  formats,
  external,
}: {
  minify: boolean;
  formats: LibraryFormats[];
  external: string[];
}): InlineConfig {
  setBuildTarget('package');

  const pkgJSON = getPackageJson();
  const { name } = pkgJSON

  return {
    root: CWD,

    logLevel: 'silent',

    build: {
      lib: {
        name,
        entry: join(PROJECT_ES_DIR, 'index.js'),
        formats,
        fileName: (format: string) => {
          const suffix = format === 'umd' ? '' : `.${format}`;
          return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`;
        },
      },
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
        output: {
          dir: PROJECT_CJS_DIR,
          exports: 'named',
          globals: {
            react: 'React',
          },
        },
      },
    },
  };
}
