import type { InlineConfig, LibraryFormats } from 'vite';
import { getExistFile, setBuildTarget } from '../common';
import { CWD, getPackageJson, PROJECT_SRC_DIR } from '../common/constant';

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
  const { name } = pkgJSON
  const external = [...Object.keys(format !== 'umd' && pkgJSON.dependencies || {}), ...Object.keys(pkgJSON.peerDependencies || {})]
  const entry = getExistFile({ cwd: PROJECT_SRC_DIR, files: ['index.ts', 'index.tsx', 'index.js', 'index.jsx'] })
  return {
    root: CWD,
    logLevel: 'silent',
    resolve: {
      alias: {
        [pkgJSON.name]: PROJECT_SRC_DIR
      },
    },
    build: {
      emptyOutDir: false,
      lib: {
        name,
        entry,
        formats: [format],
        fileName: (fmt: string) => {
          const suffix = fmt === 'umd' ? '' : `.${fmt}`;
          return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`;
        },
      },
      cssCodeSplit: format !== 'umd',
      cssTarget: ['chrome61'],
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
        output: {
          dir: outputDir,
          exports: 'named',
          preserveModules: format !== 'umd',
          entryFileNames: format !== 'umd' ? '[name].js' : `${name}${minify ? '.min' : ''}.js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name == 'style.css') {
              if (minify) return `${name}.min.css`
              return `${name}.css`
            }
            return assetInfo.name;
          },
          globals: {
            react: 'React',
          },
        }
      },
    },
  };
}