import{a as e,j as t}from"./main.3f03be90.js";const i=function({previewer:n=()=>null,api:u=()=>null}){const s=n;return e("div",{children:t("div",{children:[e("h1",{id:"ssr","data-anchor":"ssr",children:"SSR"}),e("p",{children:"The support for SSR (server-side rendering) is still in the initial stage. If you find bugs during use, please submit an issue to us."}),e("h2",{id:"nextjs","data-anchor":"nextjs",children:"Next.js"}),e("p",{children:"Using antd-mobile in Next.js requires some additional configuration."}),t("p",{children:["First, you need to install the dependencies ",e("code",{children:"next-transpile-modules"})," and ",e("code",{children:"next-images"}),":"]}),e(s,{code:`$ npm install --save-dev next-transpile-modules next-images
# or
$ yarn add -D next-transpile-modules next-images`,lang:"bash"}),t("p",{children:["Then configure it in ",e("code",{children:"next.config.js"}),":"]}),e(s,{code:`const withImages = require('next-images');

const withTM = require('next-transpile-modules')(['antd-mobile']);

module.exports = withTM(
  withImages({
    // other Next.js configuration in your project
  }),
);`,lang:"js"})]})})},r=[],d=void 0,o=[{depth:1,text:"SSR",id:"ssr"},{depth:2,text:"Next.js",id:"nextjs"}],a="/docs/guide/ssr.md",l="SSR",c="1657878771000";var m=n=>n.children({MdContent:i,demos:r,frontmatter:d,slugs:o,filePath:a,title:l,updatedTime:c});export{i as MdContent,m as default,r as demos,a as filePath,d as frontmatter,o as slugs,l as title,c as updatedTime};
