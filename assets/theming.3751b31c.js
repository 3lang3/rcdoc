import{a as e,j as o}from"./main.6e09bf4e.js";const i=function({previewer:t=()=>null,api:m=()=>null}){const n=t;return e("div",{children:o("div",{children:[e("h1",{id:"theming","data-anchor":"theming",children:"Theming"}),o("p",{children:["Thanks to the powerful and flexible capabilities of CSS variables, it is very simple to customize a set of antd-mobile themes. You don\u2019t need to configure any compilation tools or install additional plug-ins. You can fix it directly in ",e("code",{children:":root"})," to overwrite CSS Variables are fine:"]}),e(n,{code:`:root:root {
  --adm-color-primary: #a062d4;
}`,lang:"css"}),o("blockquote",{children:[o("p",{children:["Note: Why write two duplicate ",e("code",{children:":root"}),"?"]}),o("p",{children:["Since the theme variables in antd-mobile are also declared under ",e("code",{children:":root"}),", in some cases they cannot be successfully overwritten due to priority issues. Through ",e("code",{children:":root:root"})," you can explicitly make the content you write a higher priority to ensure the successful coverage of the theme variables."]})]}),e("p",{children:"Of course, if you just want to adjust the partial theme, you can also add the above CSS variable override logic to any node you want to adjust, for example:"}),e(n,{code:`.purple-theme {
  --adm-color-primary: #a062d4;
}`,lang:"css"}),e(n,{code:`<div className="purple-theme">
  <button color="primary">Purple</button>
</div>`,lang:"html"}),e("p",{children:"You can get a button like this:"}),e(n,{code:`/**
 * inline: true
 */

import React from 'react'
import { Button } from 'antd-mobile'

export default () => {
  return (
    <div style={{
      ['--adm-color-primary']: '#a062d4',
    }}>
      <Button color='primary'>Purple</Button>
    </div>
  )
}`,lang:"html"}),e("p",{children:"The following are the global CSS variables currently provided by antd-mobile:"}),e(n,{code:`:root {
  --adm-color-primary: #1677ff;
  --adm-color-success: #00b578;
  --adm-color-warning: #ff8f1f;
  --adm-color-danger: #ff3141;
  --adm-color-white: #ffffff;
  --adm-color-weak: #999999;
  --adm-color-light: #cccccc;
  --adm-border-color: #eeeeee;
  --adm-font-size-main: 13px;
  --adm-color-text: #333333;

  --adm-font-family: -apple-system, blinkmacsystemfont, 'Helvetica Neue', helvetica, segoe ui, arial,
    roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}`,lang:"css"}),o("p",{children:["Besides, every component has its own global CSS variables. You can find more information in their document page. For detailed explanation, please refer the ",e("a",{href:"./css-variables",children:"CSS Variables"})," chapter."]})]})})},r=[],a=void 0,l=[{depth:1,text:"Theming",id:"theming"}],c="/docs/guide/theming.md",d="Theming",s="1659662070000";var u=t=>t.children({MdContent:i,demos:r,frontmatter:a,slugs:l,filePath:c,title:d,updatedTime:s});export{i as MdContent,u as default,r as demos,c as filePath,a as frontmatter,l as slugs,d as title,s as updatedTime};
