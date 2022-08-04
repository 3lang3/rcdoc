var m=Object.defineProperty,p=Object.defineProperties;var s=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var o=(r,n,t)=>n in r?m(r,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[n]=t,d=(r,n)=>{for(var t in n||(n={}))C.call(n,t)&&o(r,t,n[t]);if(c)for(var t of c(n))A.call(n,t)&&o(r,t,n[t]);return r},i=(r,n)=>p(r,s(n));import{a as e,j as u}from"./main.96b1f29e.js";import{c as l,F as v}from"./index.782460b2.js";var h=()=>e(l,{title:!0});const B={code:`import React from 'react';
import { Skeleton } from 'react-vant';

export default () => {
  return <Skeleton title />;
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React from 'react';
import { Skeleton } from 'react-vant';

export default () => {
  return <Skeleton title />;
};`}},key:"skeleton-demo",meta:{title:"\u57FA\u7840\u7528\u6CD5",compact:!0}};var a=()=>e(l,{avatar:!0});const D={code:`import React from 'react';
import { Skeleton } from 'react-vant';

export default () => {
  return <Skeleton avatar />;
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React from 'react';
import { Skeleton } from 'react-vant';

export default () => {
  return <Skeleton avatar />;
};`}},key:"skeleton-demo-1",meta:{title:"\u663E\u793A\u5934\u50CF",compact:!0}};var F=()=>e(l,{rowHeight:10});const k={code:`import React from 'react';
import { Skeleton } from 'react-vant';

export default () => {
  return <Skeleton rowHeight={10} />;
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React from 'react';
import { Skeleton } from 'react-vant';

export default () => {
  return <Skeleton rowHeight={10} />;
};`}},key:"skeleton-demo-2",meta:{title:"\u81EA\u5B9A\u4E49\u9AD8\u5EA6",compact:!0}};var E=()=>e("div",{className:"demo-skeleton",children:e(l,{avatar:!0,loading:!0,children:u(v,{className:"demo-preview",children:[e("img",{alt:"",src:"https://img.yzcdn.cn/vant/logo.png"}),u("div",{className:"demo-content",children:[e("h2",{children:"\u5173\u4E8E Vant"}),e("p",{children:"Vant \u662F\u4E00\u5957\u8F7B\u91CF\u3001\u53EF\u9760\u7684\u79FB\u52A8\u7AEF Vue \u7EC4\u4EF6\u5E93\uFF0C\u63D0\u4F9B\u4E86\u4E30\u5BCC\u7684\u57FA\u7840\u7EC4\u4EF6\u548C\u4E1A\u52A1\u7EC4\u4EF6\uFF0C\u5E2E\u52A9\u5F00\u53D1\u8005\u5FEB\u901F\u642D\u5EFA\u79FB\u52A8\u5E94\u7528\u3002"})]})]})})});const x={code:`import React from 'react';
import { Flex, Skeleton } from 'react-vant';
import './demo/style.less';

export default () => {
  return (
    <div className="demo-skeleton">
      <Skeleton avatar loading={true}>
        <Flex className="demo-preview">
          <img alt="" src="https://img.yzcdn.cn/vant/logo.png" />
          <div className="demo-content">
            <h2>\u5173\u4E8E Vant</h2>
            <p>
              Vant \u662F\u4E00\u5957\u8F7B\u91CF\u3001\u53EF\u9760\u7684\u79FB\u52A8\u7AEF Vue
              \u7EC4\u4EF6\u5E93\uFF0C\u63D0\u4F9B\u4E86\u4E30\u5BCC\u7684\u57FA\u7840\u7EC4\u4EF6\u548C\u4E1A\u52A1\u7EC4\u4EF6\uFF0C\u5E2E\u52A9\u5F00\u53D1\u8005\u5FEB\u901F\u642D\u5EFA\u79FB\u52A8\u5E94\u7528\u3002
            </p>
          </div>
        </Flex>
      </Skeleton>
    </div>
  );
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React from 'react';
import { Flex, Skeleton } from 'react-vant';
import './demo/style.less';

export default () => {
  return (
    <div className="demo-skeleton">
      <Skeleton avatar loading={true}>
        <Flex className="demo-preview">
          <img alt="" src="https://img.yzcdn.cn/vant/logo.png" />
          <div className="demo-content">
            <h2>\u5173\u4E8E Vant</h2>
            <p>
              Vant \u662F\u4E00\u5957\u8F7B\u91CF\u3001\u53EF\u9760\u7684\u79FB\u52A8\u7AEF Vue
              \u7EC4\u4EF6\u5E93\uFF0C\u63D0\u4F9B\u4E86\u4E30\u5BCC\u7684\u57FA\u7840\u7EC4\u4EF6\u548C\u4E1A\u52A1\u7EC4\u4EF6\uFF0C\u5E2E\u52A9\u5F00\u53D1\u8005\u5FEB\u901F\u642D\u5EFA\u79FB\u52A8\u5E94\u7528\u3002
            </p>
          </div>
        </Flex>
      </Skeleton>
    </div>
  );
};`},"demo/style.less":{type:"FILE",value:`.demo-skeleton {
  .rv-switch {
    margin: 0 16px 12px;
  }
  .demo-preview {
    padding: 0 16px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 16px;
    }
  }
}
`}},key:"skeleton-demo-3",meta:{title:"\u57FA\u7840\u7528\u6CD5",compact:!0}},g=function({previewer:r=()=>null,api:n=()=>null}){const t=r;return e("div",{children:u("div",{children:[e("h1",{id:"skeleton-\u9AA8\u67B6\u5C4F","data-anchor":"skeleton-\u9AA8\u67B6\u5C4F",children:"Skeleton \u9AA8\u67B6\u5C4F"}),e("h2",{id:"\u4ECB\u7ECD","data-anchor":"\u4ECB\u7ECD",children:"\u4ECB\u7ECD"}),e("p",{children:"\u7528\u4E8E\u5728\u5185\u5BB9\u52A0\u8F7D\u8FC7\u7A0B\u4E2D\u5C55\u793A\u4E00\u7EC4\u5360\u4F4D\u56FE\u5F62\u3002"}),e("h2",{id:"\u5F15\u5165","data-anchor":"\u5F15\u5165",children:"\u5F15\u5165"}),e(t,{code:"import { Skeleton } from 'react-vant';",lang:"js"}),e("h2",{id:"\u4EE3\u7801\u6F14\u793A","data-anchor":"\u4EE3\u7801\u6F14\u793A",children:"\u4EE3\u7801\u6F14\u793A"}),e("h3",{id:"\u57FA\u7840\u7528\u6CD5","data-anchor":"\u57FA\u7840\u7528\u6CD5",children:"\u57FA\u7840\u7528\u6CD5"}),u("p",{children:["\u901A\u8FC7 ",e("code",{children:"title"})," \u5C5E\u6027\u663E\u793A\u6807\u9898\u5360\u4F4D\u56FE\uFF0C\u901A\u8FC7 ",e("code",{children:"row"})," \u5C5E\u6027\u914D\u7F6E\u5360\u4F4D\u6BB5\u843D\u884C\u6570\u3002"]}),e(t,i(d({},B),{children:e(h,{})})),e("h3",{id:"\u663E\u793A\u5934\u50CF","data-anchor":"\u663E\u793A\u5934\u50CF",children:"\u663E\u793A\u5934\u50CF"}),u("p",{children:["\u901A\u8FC7 ",e("code",{children:"avatar"})," \u5C5E\u6027\u663E\u793A\u5934\u50CF\u5360\u4F4D\u56FE\u3002"]}),e(t,i(d({},D),{children:e(a,{})})),e("h3",{id:"\u81EA\u5B9A\u4E49\u9AD8\u5EA6","data-anchor":"\u81EA\u5B9A\u4E49\u9AD8\u5EA6",children:"\u81EA\u5B9A\u4E49\u9AD8\u5EA6"}),u("p",{children:["\u901A\u8FC7 ",e("code",{children:"rowHeight"})," \u5C5E\u6027\u663E\u793A\u5934\u50CF\u5360\u4F4D\u56FE\u3002"]}),e(t,i(d({},k),{children:e(F,{})})),e("h3",{id:"\u5C55\u793A\u5B50\u7EC4\u4EF6","data-anchor":"\u5C55\u793A\u5B50\u7EC4\u4EF6",children:"\u5C55\u793A\u5B50\u7EC4\u4EF6"}),u("p",{children:["\u5C06 ",e("code",{children:"loading"})," \u5C5E\u6027\u8BBE\u7F6E\u6210 ",e("code",{children:"false"})," \u8868\u793A\u5185\u5BB9\u52A0\u8F7D\u5B8C\u6210\uFF0C\u6B64\u65F6\u4F1A\u9690\u85CF\u5360\u4F4D\u56FE\uFF0C\u5E76\u663E\u793A ",e("code",{children:"Skeleton"})," \u7684\u5B50\u7EC4\u4EF6\u3002"]}),e(t,i(d({},x),{children:e(E,{})})),e("h2",{id:"api","data-anchor":"api",children:"API"}),e("h3",{id:"props","data-anchor":"props",children:"Props"}),u("table",{children:[e("thead",{children:u("tr",{children:[e("th",{children:"\u53C2\u6570"}),e("th",{children:"\u8BF4\u660E"}),e("th",{children:"\u7C7B\u578B"}),e("th",{children:"\u9ED8\u8BA4\u503C"})]})}),u("tbody",{children:[u("tr",{children:[e("td",{children:"row"}),e("td",{children:"\u6BB5\u843D\u5360\u4F4D\u56FE\u884C\u6570"}),e("td",{children:e("em",{children:"number | string"})}),e("td",{children:e("code",{children:"3"})})]}),u("tr",{children:[e("td",{children:"rowWidth"}),e("td",{children:"\u6BB5\u843D\u5360\u4F4D\u56FE\u5BBD\u5EA6\uFF0C\u53EF\u4F20\u6570\u7EC4\u6765\u8BBE\u7F6E\u6BCF\u4E00\u884C\u7684\u5BBD\u5EA6"}),e("td",{children:u("em",{children:["number | string |",e("br",{}),"(number | string)[]"]})}),e("td",{children:e("code",{children:"100%"})})]}),u("tr",{children:[e("td",{children:"rowHeight"}),e("td",{children:"\u6BB5\u843D\u5360\u4F4D\u56FE\u9AD8\u5EA6\uFF0C\u53EF\u4F20\u6570\u7EC4\u6765\u8BBE\u7F6E\u6BCF\u4E00\u884C\u7684\u9AD8\u5EA6"}),e("td",{children:u("em",{children:["number | string |",e("br",{}),"(number | string)[]"]})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"title"}),e("td",{children:"\u662F\u5426\u663E\u793A\u6807\u9898\u5360\u4F4D\u56FE"}),e("td",{children:e("em",{children:"boolean"})}),e("td",{children:e("code",{children:"false"})})]}),u("tr",{children:[e("td",{children:"avatar"}),e("td",{children:"\u662F\u5426\u663E\u793A\u5934\u50CF\u5360\u4F4D\u56FE"}),e("td",{children:e("em",{children:"boolean"})}),e("td",{children:e("code",{children:"false"})})]}),u("tr",{children:[e("td",{children:"loading"}),u("td",{children:["\u662F\u5426\u663E\u793A\u9AA8\u67B6\u5C4F\uFF0C\u4F20 ",e("code",{children:"false"})," \u65F6\u4F1A\u5C55\u793A\u5B50\u7EC4\u4EF6\u5185\u5BB9"]}),e("td",{children:e("em",{children:"boolean"})}),e("td",{children:e("code",{children:"true"})})]}),u("tr",{children:[e("td",{children:"animate"}),e("td",{children:"\u662F\u5426\u5F00\u542F\u52A8\u753B"}),e("td",{children:e("em",{children:"boolean"})}),e("td",{children:e("code",{children:"true"})})]}),u("tr",{children:[e("td",{children:"round"}),e("td",{children:"\u662F\u5426\u5C06\u6807\u9898\u548C\u6BB5\u843D\u663E\u793A\u4E3A\u5706\u89D2\u98CE\u683C"}),e("td",{children:e("em",{children:"boolean"})}),e("td",{children:e("code",{children:"false"})})]}),u("tr",{children:[e("td",{children:"titleWidth"}),e("td",{children:"\u6807\u9898\u5360\u4F4D\u56FE\u5BBD\u5EA6"}),e("td",{children:e("em",{children:"number | string"})}),e("td",{children:e("code",{children:"40%"})})]}),u("tr",{children:[e("td",{children:"avatarSize"}),e("td",{children:"\u5934\u50CF\u5360\u4F4D\u56FE\u5927\u5C0F"}),e("td",{children:e("em",{children:"number | string"})}),e("td",{children:e("code",{children:"32px"})})]}),u("tr",{children:[e("td",{children:"avatarShape"}),u("td",{children:["\u5934\u50CF\u5360\u4F4D\u56FE\u5F62\u72B6\uFF0C\u53EF\u9009\u503C\u4E3A ",e("code",{children:"square"})]}),e("td",{children:e("em",{children:"string"})}),e("td",{children:e("code",{children:"round"})})]}),u("tr",{children:[e("td",{children:"className"}),e("td",{children:"\u7C7B\u540D"}),e("td",{children:e("em",{children:"string"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"style"}),e("td",{children:"style"}),e("td",{children:e("em",{children:"React.CSSProperties"})}),e("td",{children:"-"})]})]})]}),e("h2",{id:"\u4E3B\u9898\u5B9A\u5236","data-anchor":"\u4E3B\u9898\u5B9A\u5236",children:"\u4E3B\u9898\u5B9A\u5236"}),e("h3",{id:"\u6837\u5F0F\u53D8\u91CF","data-anchor":"\u6837\u5F0F\u53D8\u91CF",children:"\u6837\u5F0F\u53D8\u91CF"}),u("p",{children:["\u7EC4\u4EF6\u63D0\u4F9B\u4E86\u4E0B\u5217 CSS \u53D8\u91CF\uFF0C\u53EF\u7528\u4E8E\u81EA\u5B9A\u4E49\u6837\u5F0F\uFF0C\u4F7F\u7528\u65B9\u6CD5\u8BF7\u53C2\u8003 ",e("a",{href:"#/zh-CN/config-provider",children:"ConfigProvider \u7EC4\u4EF6"}),"\u3002"]}),u("table",{children:[e("thead",{children:u("tr",{children:[e("th",{children:"\u540D\u79F0"}),e("th",{children:"\u9ED8\u8BA4\u503C"}),e("th",{children:"\u63CF\u8FF0"})]})}),u("tbody",{children:[u("tr",{children:[e("td",{children:"--rv-skeleton-row-height"}),e("td",{children:e("em",{children:"16px"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"--rv-skeleton-row-background-color"}),e("td",{children:e("em",{children:"var(--rv-active-color)"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"--rv-skeleton-row-margin-top"}),e("td",{children:e("em",{children:"var(--rv-padding-sm)"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"--rv-skeleton-title-width"}),e("td",{children:e("em",{children:"40%"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"--rv-skeleton-avatar-size"}),e("td",{children:e("em",{children:"32px"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"--rv-skeleton-avatar-background-color"}),e("td",{children:e("em",{children:"var(--rv-active-color)"})}),e("td",{children:"-"})]}),u("tr",{children:[e("td",{children:"--rv-skeleton-animation-duration"}),e("td",{children:e("em",{children:"1.2s"})}),e("td",{children:"-"})]})]})]})]})})},f=[{Component:h,key:"skeleton-demo",title:"\u57FA\u7840\u7528\u6CD5",compact:!0},{Component:a,key:"skeleton-demo-1",title:"\u663E\u793A\u5934\u50CF",compact:!0},{Component:F,key:"skeleton-demo-2",title:"\u81EA\u5B9A\u4E49\u9AD8\u5EA6",compact:!0},{Component:E,key:"skeleton-demo-3",title:"\u57FA\u7840\u7528\u6CD5",compact:!0}],y=void 0,S=[{depth:1,text:"Skeleton \u9AA8\u67B6\u5C4F",id:"skeleton-\u9AA8\u67B6\u5C4F"},{depth:2,text:"\u4ECB\u7ECD",id:"\u4ECB\u7ECD"},{depth:2,text:"\u5F15\u5165",id:"\u5F15\u5165"},{depth:2,text:"\u4EE3\u7801\u6F14\u793A",id:"\u4EE3\u7801\u6F14\u793A"},{depth:3,text:"\u57FA\u7840\u7528\u6CD5",id:"\u57FA\u7840\u7528\u6CD5"},{depth:3,text:"\u663E\u793A\u5934\u50CF",id:"\u663E\u793A\u5934\u50CF"},{depth:3,text:"\u81EA\u5B9A\u4E49\u9AD8\u5EA6",id:"\u81EA\u5B9A\u4E49\u9AD8\u5EA6"},{depth:3,text:"\u5C55\u793A\u5B50\u7EC4\u4EF6",id:"\u5C55\u793A\u5B50\u7EC4\u4EF6"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:2,text:"\u4E3B\u9898\u5B9A\u5236",id:"\u4E3B\u9898\u5B9A\u5236"},{depth:3,text:"\u6837\u5F0F\u53D8\u91CF",id:"\u6837\u5F0F\u53D8\u91CF"}],w="/src/components/skeleton/README.md",b="Skeleton \u9AA8\u67B6\u5C4F",N="1659605538000";var R=r=>r.children({MdContent:g,demos:f,frontmatter:y,slugs:S,filePath:w,title:b,updatedTime:N});export{g as MdContent,R as default,f as demos,w as filePath,y as frontmatter,S as slugs,b as title,N as updatedTime};
