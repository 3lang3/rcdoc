
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
  site: {
    htmlMeta: {
      'docsearch:version': 'v3',
    },
  },
  navs: {
    'en-US': [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'Guide',
        path: '/guide',
      },
      {
        title: 'Components',
        path: '/components',
      },
      {
        title: 'Discover More',
        children: [
          {
            title: 'Playground',
            path: 'https://codesandbox.io/s/antd-mobile-snrxr?file=/package.json',
          },
          {
            title: 'Roadmap',
            path: 'https://github.com/ant-design/ant-design-mobile/discussions/3924',
          },
          {
            title: 'Contributing',
            path: 'https://github.com/ant-design/ant-design-mobile/blob/master/.github/CONTRIBUTING.md',
          },
        ],
      },
      {
        title: 'Vant',
        path: 'https://github.com/ant-design/ant-design'
      }
    ],
    'zh-CN': [
      {
        title: '首页',
        path: '/zh-CN',
      },
      {
        title: '指南',
        path: '/zh-CN/guide',
      },
      {
        title: '组件',
        path: '/zh-CN/components',
      },
      {
        title: '了解更多',
        children: [
          {
            title: '在线体验',
            path: 'https://codesandbox.io/s/antd-mobile-snrxr?file=/package.json',
          },
          {
            title: 'Roadmap',
            path: 'https://github.com/ant-design/ant-design-mobile/discussions/3924',
          },
          {
            title: '参与贡献',
            path: 'https://github.com/ant-design/ant-design-mobile/blob/master/.github/CONTRIBUTING.md',
          },
        ],
      },
      {
        title: 'Vant',
        path: 'https://github.com/ant-design/ant-design'
      }
    ],
  },
  menus: {
    '/components': [
      {
        title: 'Layout Components',
        children: [
          '/components/space',
        ],
      },
      {
        title: 'Basic Components',
        children: [
          '/components/button',
        ],
      }
    ],
    '/zh-CN/components': [
      {
        title: '基础组件',
        children: [
          '/zh-CN/components/space'
        ]
      }
    ],
  }
} as any)
