import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';

export async function resolveConfig(configName, isTs) {
  try {
    const root = process.cwd()
    const resolvedPath = path.join(root, configName)
    const fileUrl = pathToFileURL(resolvedPath)
    if (isTs) {
      const result = await build({
        absWorkingDir: root,
        entryPoints: [configName],
        outfile: 'out.js',
        write: false,
        platform: 'node',
        bundle: true,
        format: 'esm',
        sourcemap: 'inline',
        metafile: true,
        plugins: [
          {
            name: 'externalize-deps',
            setup(build) {
              build.onResolve({ filter: /.*/ }, (args) => {
                const id = args.path
                if (id[0] !== '.' && !path.isAbsolute(id)) {
                  return {
                    external: true
                  }
                }
              })
            }
          },
          {
            name: 'replace-import-meta',
            setup(build) {
              build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
                const contents = await fs.promises.readFile(args.path, 'utf8')
                return {
                  loader: args.path.endsWith('.ts') ? 'ts' : 'js',
                  contents: contents
                    .replace(
                      /\bimport\.meta\.url\b/g,
                      JSON.stringify(`file://${args.path}`)
                    )
                    .replace(
                      /\b__dirname\b/g,
                      JSON.stringify(path.dirname(args.path))
                    )
                    .replace(/\b__filename\b/g, JSON.stringify(args.path))
                }
              })
            }
          }
        ]
      })
      const { text } = result.outputFiles[0]
      fs.writeFileSync(resolvedPath + '.js', text)
      fs.unlinkSync(resolvedPath + '.js')
    }
    const config = (await import(`${fileUrl}.js?t=${Date.now()}`))
      .default
    return config
  } catch (error) {
    console.log('resolveConfig error:', error)
  }
}