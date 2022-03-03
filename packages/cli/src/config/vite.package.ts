import type { InlineConfig, LibraryFormats } from 'vite';
import { getExistFile, setBuildTarget } from '../common';
import { CWD, getPackageJson, PROJECT_SRC_DIR } from '../common/constant';
// import postcss from 'rollup-plugin-postcss'

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
  const external = Object.keys(pkgJSON.peerDependencies)
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
      lib: {
        name,
        entry,
        formats,
        // fileName: (format: string) => {
        //   const suffix = format === 'umd' ? '' : `.${format}`;
        //   return minify ? `${name}${suffix}.min.js` : `${name}${suffix}.js`;
        // },
      },
      // terser has better compression than esbuild
      minify: minify ? 'terser' : false,
      rollupOptions: {
        external,
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
