export default {
  name: 'mdoc-demo',
  build: {
    packageManager: 'pnpm',
    srcDir: 'src',
    namedExport: true,
    css: { preprocessor: 'less' },
    site: { publicPath: './' },
  },
  site: {
    defaultLang: 'zh-CN',
    versions: [{ label: 'v1', link: 'https://3lang3.github.io/react-vant/v1' }],
    htmlMeta: {
      'docsearch:version': 'v3',
    },
    locales: {
      'zh-CN': {
        title: 'react vant',
        description: '轻量、可靠的移动端 React 组件库',
        logo: 'https://github.com/3lang3/react-vant/blob/main/public/logo.svg?raw=true',
        langLabel: '中文',
        links: [
          {
            url: 'https://github.com/youzan/vant',
            title: 'vant',
            alt: 'vant官网',
          },
          {
            url: 'https://github.com/mallfoundry/taroify/',
            title: 'taroify',
            alt: 'taro版本',
          },
          {
            title: 'GitHub',
            url: 'https://github.com/3lang3/react-vant',
          },
        ],
        nav: [
          {
            title: '基础组件',
            items: [
              { path: 'button', title: 'Button 按钮' },
            ],
          },
        ],
      },
    },
  },
};
