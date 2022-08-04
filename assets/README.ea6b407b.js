import{a as u,j as r}from"./main.84748f9e.js";const i=function({previewer:e=()=>null,api:E=()=>null}){const n=e;return u("div",{children:r("div",{children:[u("h1",{id:"configprovider-\u5168\u5C40\u914D\u7F6E","data-anchor":"configprovider-\u5168\u5C40\u914D\u7F6E",children:"ConfigProvider \u5168\u5C40\u914D\u7F6E"}),u("h2",{id:"\u4ECB\u7ECD","data-anchor":"\u4ECB\u7ECD",children:"\u4ECB\u7ECD"}),u("p",{children:"\u4E3A\u7EC4\u4EF6\u63D0\u4F9B\u7EDF\u4E00\u7684\u5168\u5C40\u5316\u914D\u7F6E\u3002"}),u("h2",{id:"\u5F15\u5165","data-anchor":"\u5F15\u5165",children:"\u5F15\u5165"}),u("p",{children:"ConfigProvider \u4F7F\u7528 React \u7684 context \u7279\u6027\uFF0C\u53EA\u9700\u5728\u5E94\u7528\u5916\u56F4\u5305\u88F9\u4E00\u6B21\u5373\u53EF\u5168\u5C40\u751F\u6548\u3002"}),u(n,{code:`import { ConfigProvider } from 'react-vant';

export default () => (
  <ConfigProvider>
    <App />
  </ConfigProvider>
);`,lang:"jsx"}),u("h3",{id:"\u8BED\u8A00\u5207\u6362","data-anchor":"\u8BED\u8A00\u5207\u6362",children:"\u8BED\u8A00\u5207\u6362"}),r("p",{children:["\u4F7F\u7528 ",u("code",{children:"locale"})," \u5C5E\u6027\u5207\u6362\u8BED\u8A00\u3002"]}),u("h3",{id:"\u5B9A\u5236\u4E3B\u9898","data-anchor":"\u5B9A\u5236\u4E3B\u9898",children:"\u5B9A\u5236\u4E3B\u9898"}),r("p",{children:[u("code",{children:"ConfigProvider"})," \u7EC4\u4EF6\u63D0\u4F9B\u4E86\u8986\u76D6 CSS \u53D8\u91CF\u7684\u80FD\u529B\uFF0C\u4F60\u9700\u8981\u5728\u6839\u8282\u70B9\u5305\u88F9\u4E00\u4E2A ",u("code",{children:"ConfigProvider"})," \u7EC4\u4EF6\uFF0C\u5E76\u901A\u8FC7 ",u("code",{children:"themeVars"})," \u5C5E\u6027\u6765\u914D\u7F6E\u4E00\u4E9B\u4E3B\u9898\u53D8\u91CF\u3002"]}),u("blockquote",{children:u("p",{children:"\u6CE8\u610F\uFF1AConfigProvider \u4EC5\u5F71\u54CD\u5B83\u7684\u5B50\u7EC4\u4EF6\u7684\u6837\u5F0F\uFF0C\u4E0D\u5F71\u54CD\u5168\u5C40 root \u8282\u70B9\u3002"})}),u("h3",{id:"\u5173\u4E8E\u4E3B\u9898","data-anchor":"\u5173\u4E8E\u4E3B\u9898",children:"\u5173\u4E8E\u4E3B\u9898"}),r("p",{children:["React Vant \u7EC4\u4EF6\u901A\u8FC7\u4E30\u5BCC\u7684 ",u("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties",children:"CSS \u53D8\u91CF"})," \u6765\u7EC4\u7EC7\u6837\u5F0F\uFF0C\u901A\u8FC7\u8986\u76D6\u8FD9\u4E9B CSS \u53D8\u91CF\uFF0C\u53EF\u4EE5\u5B9E\u73B0",u("strong",{children:"\u5B9A\u5236\u4E3B\u9898\u3001\u52A8\u6001\u5207\u6362\u4E3B\u9898"}),"\u7B49\u6548\u679C\u3002"]}),u("h4",{id:"\u793A\u4F8B","data-anchor":"\u793A\u4F8B",children:"\u793A\u4F8B"}),r("p",{children:["\u4EE5 Button \u7EC4\u4EF6\u4E3A\u4F8B\uFF0C\u67E5\u770B\u7EC4\u4EF6\u7684\u6837\u5F0F\uFF0C\u53EF\u4EE5\u770B\u5230 ",u("code",{children:".rv-button--primary"})," \u7C7B\u540D\u4E0A\u5B58\u5728\u4EE5\u4E0B\u53D8\u91CF\uFF1A"]}),u(n,{code:`.rv-button--primary {
  color: var(--rv-button-primary-color);
  background-color: var(--rv-button-primary-background-color);
}`,lang:"css"}),r("p",{children:["\u8FD9\u4E9B\u53D8\u91CF\u7684\u9ED8\u8BA4\u503C\u88AB\u5B9A\u4E49\u5728 ",u("code",{children:"root"})," \u8282\u70B9\u4E0A\uFF0CHTML \u6587\u6863\u7684\u4EFB\u4F55\u8282\u70B9\u90FD\u53EF\u4EE5\u8BBF\u95EE\u5230\u8FD9\u4E9B\u53D8\u91CF\uFF1A"]}),u(n,{code:`:root {
  --rv-white: #fff;
  --rv-blue: #3f45ff;
  --rv-button-primary-color: var(--rv-white);
  --rv-button-primary-background-color: var(--rv-primary-color);
}`,lang:"css"}),u("h3",{id:"\u81EA\u5B9A\u4E49-css-\u53D8\u91CF","data-anchor":"\u81EA\u5B9A\u4E49-css-\u53D8\u91CF",children:"\u81EA\u5B9A\u4E49 CSS \u53D8\u91CF"}),u("h4",{id:"\u901A\u8FC7-css-\u8986\u76D6","data-anchor":"\u901A\u8FC7-css-\u8986\u76D6",children:"\u901A\u8FC7 CSS \u8986\u76D6"}),u("p",{children:"\u4F60\u53EF\u4EE5\u76F4\u63A5\u5728\u4EE3\u7801\u4E2D\u8986\u76D6\u8FD9\u4E9B CSS \u53D8\u91CF\uFF0CButton \u7EC4\u4EF6\u7684\u6837\u5F0F\u4F1A\u968F\u4E4B\u53D1\u751F\u6539\u53D8\uFF1A"}),u(n,{code:`/* \u6DFB\u52A0\u8FD9\u6BB5\u6837\u5F0F\u540E\uFF0CPrimary Button \u4F1A\u53D8\u6210\u7EA2\u8272 */
:root {
  --rv-button-primary-background-color: red;
}`,lang:"css"}),u("h3",{id:"\u57FA\u7840\u53D8\u91CF","data-anchor":"\u57FA\u7840\u53D8\u91CF",children:"\u57FA\u7840\u53D8\u91CF"}),r("p",{children:["React Vant \u4E2D\u7684 CSS \u53D8\u91CF\u5206\u4E3A ",u("strong",{children:"\u57FA\u7840\u53D8\u91CF"})," \u548C ",u("strong",{children:"\u7EC4\u4EF6\u53D8\u91CF"}),"\u3002\u7EC4\u4EF6\u53D8\u91CF\u4F1A\u7EE7\u627F\u57FA\u7840\u53D8\u91CF\uFF0C\u56E0\u6B64\u5728\u4FEE\u6539\u57FA\u7840\u53D8\u91CF\u540E\uFF0C\u4F1A\u5F71\u54CD\u6240\u6709\u76F8\u5173\u7684\u7EC4\u4EF6\u3002"]}),u("h4",{id:"\u4FEE\u6539\u53D8\u91CF","data-anchor":"\u4FEE\u6539\u53D8\u91CF",children:"\u4FEE\u6539\u53D8\u91CF"}),u("p",{children:"\u7531\u4E8E CSS \u53D8\u91CF\u7EE7\u627F\u673A\u5236\u7684\u539F\u56E0\uFF0C\u4E24\u8005\u7684\u4FEE\u6539\u65B9\u5F0F\u6709\u4E00\u5B9A\u5DEE\u5F02\uFF1A"}),r("ul",{children:[r("li",{children:["\u57FA\u7840\u53D8\u91CF\u53EA\u80FD\u901A\u8FC7 ",u("code",{children:"root \u9009\u62E9\u5668"})," \u4FEE\u6539\uFF0C\u4E0D\u80FD\u901A\u8FC7 ",u("code",{children:"ConfigProvider \u7EC4\u4EF6"})," \u4FEE\u6539\u3002"]}),r("li",{children:["\u7EC4\u4EF6\u53D8\u91CF\u53EF\u4EE5\u901A\u8FC7 ",u("code",{children:"root \u9009\u62E9\u5668"})," \u548C ",u("code",{children:"ConfigProvider \u7EC4\u4EF6"})," \u4FEE\u6539\u3002"]})]}),u("h4",{id:"\u53D8\u91CF\u5217\u8868","data-anchor":"\u53D8\u91CF\u5217\u8868",children:"\u53D8\u91CF\u5217\u8868"}),u("p",{children:"\u4E0B\u9762\u662F\u6240\u6709\u7684\u57FA\u7840\u53D8\u91CF\uFF1A"}),u(n,{code:`// Color Palette
--rv-black: #000;
--rv-white: #fff;
--rv-gray-1: #f7f8fa;
--rv-gray-2: #f2f3f5;
--rv-gray-3: #ebedf0;
--rv-gray-4: #dcdee0;
--rv-gray-5: #c8c9cc;
--rv-gray-6: #969799;
--rv-gray-7: #646566;
--rv-gray-8: #323233;
--rv-red: #ee0a24;
--rv-blue: #3f45ff;
--rv-orange: #ff976a;
--rv-orange-dark: #ed6a0c;
--rv-orange-light: #fffbe8;
--rv-green: #07c160;

// Gradient Colors
--rv-gradient-red: linear-gradient(to right, #ff6034, #ee0a24);
--rv-gradient-orange: linear-gradient(to right, #ffd01e, #ff8917);

// Component Colors
--rv-primary-color: var(--rv-blue);
--rv-success-color: var(--rv-green);
--rv-danger-color: var(--rv-red);
--rv-warning-color: var(--rv-orange);
--rv-text-color: var(--rv-gray-8);
--rv-active-color: var(--rv-gray-2);
--rv-active-opacity: 0.7;
--rv-disabled-opacity: 0.5;
--rv-background-color: var(--rv-gray-1);
--rv-background-color-light: #fafafa;
--rv-text-link-color: #576b95;

// Padding
--rv-padding-base: 4px;
--rv-padding-xs: 8px;
--rv-padding-sm: 12px;
--rv-padding-md: 16px;
--rv-padding-lg: 24px;
--rv-padding-xl: 32px;

// Font
--rv-font-size-xs: 10px;
--rv-font-size-sm: 12px;
--rv-font-size-md: 14px;
--rv-font-size-lg: 16px;
--rv-font-weight-bold: 500;
--rv-line-height-xs: 14px;
--rv-line-height-sm: 18px;
--rv-line-height-md: 20px;
--rv-line-height-lg: 22px;
--rv-base-font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial,
  Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
--rv-price-integer-font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;

// Animation
--rv-animation-duration-base: 0.3s;
--rv-animation-duration-fast: 0.2s;
--rv-animation-timing-function-enter: ease-out;
--rv-animation-timing-function-leave: ease-in;

// Border
--rv-border-color: var(--rv-gray-3);
--rv-border-width-base: 1px;
--rv-border-radius-sm: 2px;
--rv-border-radius-md: 4px;
--rv-border-radius-lg: 8px;
--rv-border-radius-max: 999px;`,lang:"less"}),u("p",{children:"\u4F60\u53EF\u4EE5\u5728\u5404\u4E2A\u7EC4\u4EF6\u6587\u6863\u5E95\u90E8\u7684\u8868\u683C\u4E2D\u67E5\u770B\u7EC4\u4EF6\u53D8\u91CF\u3002"}),u("h2",{id:"api","data-anchor":"api",children:"API"}),u("h3",{id:"props","data-anchor":"props",children:"Props"}),r("table",{children:[u("thead",{children:r("tr",{children:[u("th",{children:"\u53C2\u6570"}),u("th",{children:"\u8BF4\u660E"}),u("th",{children:"\u7C7B\u578B"}),u("th",{children:"\u9ED8\u8BA4\u503C"})]})}),r("tbody",{children:[r("tr",{children:[u("td",{children:"themeVars"}),u("td",{children:"\u81EA\u5B9A\u4E49\u4E3B\u9898\u53D8\u91CF"}),u("td",{children:u("em",{children:"object"})}),u("td",{children:"-"})]}),r("tr",{children:[u("td",{children:"locale"}),u("td",{children:"\u81EA\u5B9A\u4E49\u8BED\u8A00"}),u("td",{children:u("em",{children:"object"})}),u("td",{children:u("code",{children:"zhCN"})})]}),r("tr",{children:[u("td",{children:"tag"}),r("td",{children:[u("code",{children:"ConfigProdiver"}),"\u5BF9\u5E94\u7684 HTML \u8282\u70B9\u6807\u7B7E\u540D"]}),u("td",{children:u("em",{children:"string"})}),u("td",{children:u("code",{children:"div"})})]})]})]})]})})},d=[],o=void 0,t=[{depth:1,text:"ConfigProvider \u5168\u5C40\u914D\u7F6E",id:"configprovider-\u5168\u5C40\u914D\u7F6E"},{depth:2,text:"\u4ECB\u7ECD",id:"\u4ECB\u7ECD"},{depth:2,text:"\u5F15\u5165",id:"\u5F15\u5165"},{depth:3,text:"\u8BED\u8A00\u5207\u6362",id:"\u8BED\u8A00\u5207\u6362"},{depth:3,text:"\u5B9A\u5236\u4E3B\u9898",id:"\u5B9A\u5236\u4E3B\u9898"},{depth:3,text:"\u5173\u4E8E\u4E3B\u9898",id:"\u5173\u4E8E\u4E3B\u9898"},{depth:4,text:"\u793A\u4F8B",id:"\u793A\u4F8B"},{depth:3,text:"\u81EA\u5B9A\u4E49 CSS \u53D8\u91CF",id:"\u81EA\u5B9A\u4E49-css-\u53D8\u91CF"},{depth:4,text:"\u901A\u8FC7 CSS \u8986\u76D6",id:"\u901A\u8FC7-css-\u8986\u76D6"},{depth:3,text:"\u57FA\u7840\u53D8\u91CF",id:"\u57FA\u7840\u53D8\u91CF"},{depth:4,text:"\u4FEE\u6539\u53D8\u91CF",id:"\u4FEE\u6539\u53D8\u91CF"},{depth:4,text:"\u53D8\u91CF\u5217\u8868",id:"\u53D8\u91CF\u5217\u8868"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"}],a="/src/components/config-provider/README.md",c="ConfigProvider \u5168\u5C40\u914D\u7F6E",F="1659601156000";var h=e=>e.children({MdContent:i,demos:d,frontmatter:o,slugs:t,filePath:a,title:c,updatedTime:F});export{i as MdContent,h as default,d as demos,a as filePath,o as frontmatter,t as slugs,c as title,F as updatedTime};
