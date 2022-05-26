import { defineConfig } from '@rcdoc/cli';

export default defineConfig({
  title: '<%= name %>',
  description: '基于rcdoc打造的React组件库',
  locales: false,
  navs: [
    {
      title: '首页',
      path: '/',
    },
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: '组件',
      path: '/components',
    },
    {
      title: '了解更多',
      children: [
        {
          title: '在线体验',
          path: 'https://codesandbox.io/s/uelmz4?resolutionWidth=320&resolutionHeight=675',
        },
        {
          title: 'Issues',
          path: 'https://github.com/3lang3/rcdoc/issues',
        }
      ],
    },
  ],
});
