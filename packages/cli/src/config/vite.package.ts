import type { InlineConfig, LibraryFormats } from 'vite';
import { getEntryPath, getExistFile, setBuildTarget } from '../common';
import { CWD, getPackageJson } from '../common/constant';

export function getViteConfigForPackage({
  outputDir,
  minify,
  format,
}: {
  outputDir: string;
  minify?: boolean;
  format: LibraryFormats;
}): InlineConfig {
  setBuildTarget('package');

  const pkgJSON = getPackageJson();
  const { name } = pkgJSON;
  const external = [
    ...Object.keys((format !== 'umd' && pkgJSON.dependencies) || {}),
    ...Object.keys(pkgJSON.peerDependencies || {}),
  ];
  const entry = getEntryPath();
  return {
    root: CWD,
    logLevel: 'silent',
    // disable public assets build in lib mode
    publicDir: '___public___',
    resolve: {
      alias: {
        [pkgJSON.name]: entry,
      },
    },
    build: {
      emptyOutDir: false,
      lib: {
        name,
        entry,
        formats: [format],
        fileName: (fmt: string) => {
          const isModulePkg = pkgJSON.type === 'module';
          const isESMFile = /esm?/.test(fmt);
          const ext = (function () {
            if ((isModulePkg && isESMFile) || (!isModulePkg && !isESMFile)) {
              return 'js';
            } else {
              return isESMFile ? 'mjs' : 'cjs';
            }
          })();
          const suffix = fmt === 'umd' ? '' : `.${fmt}`;
          return minify ? `${name}${suffix}.min.${ext}` : `${name}${suffix}.${ext}`;
        },
      },
      cssTarget: ['chrome61'],
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
        output: {
          dir: outputDir,
          exports: 'named',
          // preserveModules: format !== 'umd',
          // entryFileNames: format !== 'umd' ? '[name].js' : `${name}${minify ? '.min' : ''}.js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name == 'style.css') {
              if (minify) return `index.min.css`;
              return `index.css`;
            }
            return assetInfo.name;
          },
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  };
}
