import{a as i,j as t}from"./main.a79351cd.js";const o=function({previewer:n=()=>null,api:h=()=>null}){const a=n;return i("div",{children:t("div",{children:[i("h1",{id:"quick-start","data-anchor":"quick-start",children:"Quick Start"}),i("h2",{id:"installation","data-anchor":"installation",children:"Installation"}),i(a,{code:`$ npm install --save antd-mobile
# or
$ yarn add antd-mobile`,lang:"bash"}),i("h2",{id:"import","data-anchor":"import",children:"Import"}),i("p",{children:"Just import the component directly and antd-mobile will automatically load css style files:"}),i(a,{code:"import { Button } from 'antd-mobile';",lang:"js"}),t("p",{children:["If you are developing an internal project in alibaba group or ant group, please read ",i("a",{href:"https://yuque.antfin.com/antd-mobile/kfcgs3/md4or5",children:"this additional guide"}),"."]}),i("h2",{id:"compatibility","data-anchor":"compatibility",children:"Compatibility"}),i("p",{children:"If you don't do any additional processing, then antd-mobile default compatibility is iOS Safari >= 10 and Chrome >= 51 (that is, ES6 compatibility standard)."}),i("p",{children:"With the following babel configuration, maximum compatibility can be achieved for iOS Safari >= 10 and Chrome >= 49:"}),i(a,{code:`{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "49",
          "ios": "10"
        }
      }
    ]
  ]
}`,lang:"json"}),i("p",{children:"For TypeScript, antd-mobile is compatible with versions >= 3.8."}),i("p",{children:"For React, antd-mobile is compatible with versions >= 16.8.0."}),i("h2",{id:"playground","data-anchor":"playground",children:"Playground"}),t("p",{children:["If you don't want to configure your environment locally, you can also try it directly on ",i("a",{href:"https://codesandbox.io/s/antd-mobile-snrxr?file=/package.json",children:"codesandbox"}),"."]}),i("h2",{id:"discussion-groups","data-anchor":"discussion-groups",children:"Discussion Groups"}),t("ul",{children:[i("li",{children:i("a",{href:"https://gw.alipayobjects.com/mdn/rms_25513e/afts/img/A*hBjlR4nUWjkAAAAAAAAAAAAAARQnAQ",children:"DingDing"})}),i("li",{children:i("a",{href:"https://discord.gg/jmNvw4WFYn",children:"Discord"})})]})]})})},e=[],d=void 0,r=[{depth:1,text:"Quick Start",id:"quick-start"},{depth:2,text:"Installation",id:"installation"},{depth:2,text:"Import",id:"import"},{depth:2,text:"Compatibility",id:"compatibility"},{depth:2,text:"Playground",id:"playground"},{depth:2,text:"Discussion Groups",id:"discussion-groups"}],l="/docs/guide/quick-start.md",s="Quick Start",c="1657878856000";var u=n=>n.children({MdContent:o,demos:e,frontmatter:d,slugs:r,filePath:l,title:s,updatedTime:c});export{o as MdContent,u as default,e as demos,l as filePath,d as frontmatter,r as slugs,s as title,c as updatedTime};
