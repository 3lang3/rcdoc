
import { defineConfig } from '@mdoc/cli'

export default defineConfig({
  title: 'mdoc',
  description: '轻量、可靠的移动端 React 组件库',
  favicon: '',
  logo: 'https://github.com/3lang3/react-vant/blob/main/public/logo.svg?raw=true',
  /** 是否额外导出demo组件 */
  exportDemos: true,
  resolve: {
    includes: ['docs', 'src'],
    excludes: [],
  },
  build: {
    packageManager: 'pnpm',
    srcDir: 'src',
    namedExport: true,
    css: {
      preprocessor: 'less',
      // component: './style'
    },
    site: { publicPath: './' },
  },
  links: [
    {
      url: 'https://github.com/youzan/vant',
      title: 'vant',
      alt: 'vant官网',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/3lang3/react-vant',
    },
  ],
  site: {
    htmlMeta: {
      'docsearch:version': 'v3',
    },
  },
  navs: [

  ],
  menus: {
    '/': [
      {
        title: 'Layout Components',
        children: [
          '/space',
        ],
      },
      {
        title: 'Basic Components',
        children: [
          '/button',
        ],
      }
    ],
    '/zh-CN': [
      {
        title: '基础组件',
        children: [
          '/zh-CN/space'
        ]
      }
    ],
  }
} as any)
