import { join } from 'path';
import type { InlineConfig, LibraryFormats } from 'vite';
import { setBuildTarget } from '../common';
import { CWD, getPackageJson, PROJECT_SRC_DIR } from '../common/constant';

export function getViteConfigForPackage({
  outputDir,
  minify,
  formats,
}: {
  outputDir: string;
  minify: boolean;
  formats: LibraryFormats[];
}): InlineConfig {
  setBuildTarget('package');

  const pkgJSON = getPackageJson();
  const { name } = pkgJSON

  return {
    root: CWD,

    // logLevel: 'silent',
    resolve: {
      alias: {
        [pkgJSON.name]: PROJECT_SRC_DIR
      },
    },
    build: {
      lib: {
        name,
        entry: join(PROJECT_SRC_DIR, 'index.ts'),
        formats,
        // fileName: (format: string) => {
        //   const suffix = format === 'umd' ? '' : `.${format}`;
        //   return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`;
        // },
      },
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          dir: outputDir,
          exports: 'named',
          preserveModules: true,
          globals: {
            react: 'React',
          },
        },
      },
    },
  };
}
