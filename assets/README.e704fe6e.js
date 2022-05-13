var F=Object.defineProperty,h=Object.defineProperties;var s=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var p=(e,n,t)=>n in e?F(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,d=(e,n)=>{for(var t in n||(n={}))m.call(n,t)&&p(e,t,n[t]);if(c)for(var t of c(n))E.call(n,t)&&p(e,t,n[t]);return e},r=(e,n)=>h(e,s(n));import{a as u,F as g,r as y,j as a}from"./main.888a8346.js";import{c as i,d as D}from"./index.7c05f997.js";const z=["https://img.yzcdn.cn/vant/apple-1.jpg","https://img.yzcdn.cn/vant/apple-2.jpg","https://img.yzcdn.cn/vant/apple-3.jpg","https://img.yzcdn.cn/vant/apple-4.jpg","https://img.yzcdn.cn/vant/apple-5.jpg","https://img.yzcdn.cn/vant/apple-6.jpg","https://img.yzcdn.cn/vant/apple-7.jpg"];var l=()=>u(g,{children:z.map(e=>u(i,{lazyload:!0,src:e},e))});const C={code:`import React from 'react';
import { Image } from 'react-vant';
import './demo/style.less';

const imageList = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
  'https://img.yzcdn.cn/vant/apple-5.jpg',
  'https://img.yzcdn.cn/vant/apple-6.jpg',
  'https://img.yzcdn.cn/vant/apple-7.jpg',
];

export default () => {
  return (
    <>
      {imageList.map((img) => (
        <Image lazyload src={img} key={img} />
      ))}
    </>
  );
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React from 'react';
import { Image } from 'react-vant';
import './demo/style.less';

const imageList = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
  'https://img.yzcdn.cn/vant/apple-5.jpg',
  'https://img.yzcdn.cn/vant/apple-6.jpg',
  'https://img.yzcdn.cn/vant/apple-7.jpg',
];

export default () => {
  return (
    <>
      {imageList.map((img) => (
        <Image lazyload src={img} key={img} />
      ))}
    </>
  );
};`},"demo/style.less":{type:"FILE",value:`.demo-lazyload {
  .rv-image {
    box-sizing: border-box;
    width: 100%;
    height: 250px;
    margin-bottom: 16px;
    padding: 16px;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 12px;
  }
}
`}},key:"lazyload-demo",meta:{title:"\u56FE\u7247\u61D2\u52A0\u8F7D",card:!0}},v=()=>(y.exports.useEffect(()=>{console.log("lazy component mounted")},[]),a("div",{children:[u(i,{src:"https://img.yzcdn.cn/vant/apple-8.jpg"}),u("p",{children:"\u5F53\u9875\u9762\u9700\u8981\u52A0\u8F7D\u5927\u91CF\u5185\u5BB9\u65F6\uFF0C\u4F7F\u7528\u61D2\u52A0\u8F7D\u53EF\u4EE5\u5B9E\u73B0\u5EF6\u8FDF\u52A0\u8F7D\u9875\u9762\u53EF\u89C6\u533A\u57DF\u5916\u7684\u5185\u5BB9\uFF0C\u4ECE\u800C\u4F7F\u9875\u9762\u52A0\u8F7D\u66F4\u6D41\u7545\u3002"})]}));var o=()=>u(D,{children:u(v,{})});const A={code:`import React, { useEffect } from 'react';
import { Lazyload, Image } from 'react-vant';

const LazyComponent = () => {
  useEffect(() => {
    console.log('lazy component mounted');
  }, []);
  return (
    <div>
      <Image src="https://img.yzcdn.cn/vant/apple-8.jpg" />
      <p>
        \u5F53\u9875\u9762\u9700\u8981\u52A0\u8F7D\u5927\u91CF\u5185\u5BB9\u65F6\uFF0C\u4F7F\u7528\u61D2\u52A0\u8F7D\u53EF\u4EE5\u5B9E\u73B0\u5EF6\u8FDF\u52A0\u8F7D\u9875\u9762\u53EF\u89C6\u533A\u57DF\u5916\u7684\u5185\u5BB9\uFF0C\u4ECE\u800C\u4F7F\u9875\u9762\u52A0\u8F7D\u66F4\u6D41\u7545\u3002
      </p>
    </div>
  );
};

export default () => {
  return (
    <Lazyload>
      <LazyComponent />
    </Lazyload>
  );
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React, { useEffect } from 'react';
import { Lazyload, Image } from 'react-vant';

const LazyComponent = () => {
  useEffect(() => {
    console.log('lazy component mounted');
  }, []);
  return (
    <div>
      <Image src="https://img.yzcdn.cn/vant/apple-8.jpg" />
      <p>
        \u5F53\u9875\u9762\u9700\u8981\u52A0\u8F7D\u5927\u91CF\u5185\u5BB9\u65F6\uFF0C\u4F7F\u7528\u61D2\u52A0\u8F7D\u53EF\u4EE5\u5B9E\u73B0\u5EF6\u8FDF\u52A0\u8F7D\u9875\u9762\u53EF\u89C6\u533A\u57DF\u5916\u7684\u5185\u5BB9\uFF0C\u4ECE\u800C\u4F7F\u9875\u9762\u52A0\u8F7D\u66F4\u6D41\u7545\u3002
      </p>
    </div>
  );
};

export default () => {
  return (
    <Lazyload>
      <LazyComponent />
    </Lazyload>
  );
};`}},key:"lazyload-demo-1",meta:{title:"\u7EC4\u4EF6\u61D2\u52A0\u8F7D",card:!0}},B=function({previewer:e=()=>null,api:n=()=>null}){const t=e;return u("div",{children:a("div",{children:[u("h1",{id:"lazyload-\u61D2\u52A0\u8F7D","data-anchor":"lazyload-\u61D2\u52A0\u8F7D",children:"Lazyload \u61D2\u52A0\u8F7D"}),u("h2",{id:"\u4ECB\u7ECD","data-anchor":"\u4ECB\u7ECD",children:"\u4ECB\u7ECD"}),u("p",{children:"\u5F53\u9875\u9762\u9700\u8981\u52A0\u8F7D\u5927\u91CF\u5185\u5BB9\u65F6\uFF0C\u4F7F\u7528\u61D2\u52A0\u8F7D\u53EF\u4EE5\u5B9E\u73B0\u5EF6\u8FDF\u52A0\u8F7D\u9875\u9762\u53EF\u89C6\u533A\u57DF\u5916\u7684\u5185\u5BB9\uFF0C\u4ECE\u800C\u4F7F\u9875\u9762\u52A0\u8F7D\u66F4\u6D41\u7545\u3002"}),u("blockquote",{children:a("p",{children:["Lazyload \u57FA\u4E8E ",u("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API",children:"IntersectionObserver"}),"\u5B9E\u73B0\uFF0C\b \u90E8\u5206\u6D4F\u89C8\u5668\u9700\u8981",u("a",{href:"https://www.npmjs.com/package/intersection-observer",children:"intersection-observer polyfill"}),"\u652F\u6301\u3002"]})}),u("h2",{id:"\u5F15\u5165","data-anchor":"\u5F15\u5165",children:"\u5F15\u5165"}),u(t,{code:"import { Lazyload } from 'react-vant';",lang:"js"}),u("h2",{id:"\u4EE3\u7801\u6F14\u793A","data-anchor":"\u4EE3\u7801\u6F14\u793A",children:"\u4EE3\u7801\u6F14\u793A"}),u("h3",{id:"\u56FE\u7247\u61D2\u52A0\u8F7D","data-anchor":"\u56FE\u7247\u61D2\u52A0\u8F7D",children:"\u56FE\u7247\u61D2\u52A0\u8F7D"}),a("p",{children:["\u5C06 ",u("code",{children:"Image"})," \u7EC4\u4EF6\u7684 lazyload \u5C5E\u6027\u8BBE\u4E3A ",u("code",{children:"true"})," \u5373\u53EF\u5F00\u542F\u61D2\u52A0\u8F7D\u529F\u80FD\u3002"]}),u(t,r(d({},C),{children:u(l,{})})),u("h3",{id:"\u7EC4\u4EF6\u61D2\u52A0\u8F7D","data-anchor":"\u7EC4\u4EF6\u61D2\u52A0\u8F7D",children:"\u7EC4\u4EF6\u61D2\u52A0\u8F7D"}),a("p",{children:["\u5C06\u9700\u8981\u61D2\u52A0\u8F7D\u7684\u7EC4\u4EF6\u653E\u5728 ",u("code",{children:"Lazyload"})," \u7EC4\u4EF6\u4E2D\uFF0C\u5373\u53EF\u5B9E\u73B0\u7EC4\u4EF6\u61D2\u52A0\u8F7D\u3002"]}),u(t,r(d({},A),{children:u(o,{})})),u("h2",{id:"api","data-anchor":"api",children:"API"}),u("h3",{id:"options","data-anchor":"options",children:"Options"}),a("table",{children:[u("thead",{children:a("tr",{children:[u("th",{children:"\u53C2\u6570"}),u("th",{children:"\u8BF4\u660E"}),u("th",{children:"\u7C7B\u578B"}),u("th",{children:"\u9ED8\u8BA4\u503C"})]})}),a("tbody",{children:[a("tr",{children:[u("td",{children:"height"}),u("td",{children:"\u8BBE\u7F6E\u5360\u4F4D\u5BB9\u5668\u9AD8\u5EA6"}),u("td",{children:u("em",{children:"number|string"})}),u("td",{children:"-"})]}),a("tr",{children:[u("td",{children:"placeholder"}),u("td",{children:"\u81EA\u5B9A\u4E49\u5360\u4F4D\u5BB9\u5668\u89C6\u56FE"}),u("td",{children:u("em",{children:"ReactNode"})}),u("td",{children:"<Skeleton title />"})]}),a("tr",{children:[u("td",{children:"style"}),u("td",{children:"\u5360\u4F4D\u5BB9\u5668\u6837\u5F0F"}),u("td",{children:u("em",{children:"CSSProperties"})}),u("td",{children:"-"})]}),a("tr",{children:[u("td",{children:"className"}),u("td",{children:"\u5360\u4F4D\u5BB9\u5668\u7C7B\u540D"}),u("td",{children:u("em",{children:"string"})}),u("td",{children:"-"})]})]})]})]})})},f=[{Component:l,key:"lazyload-demo",title:"\u56FE\u7247\u61D2\u52A0\u8F7D",card:!0},{Component:o,key:"lazyload-demo-1",title:"\u7EC4\u4EF6\u61D2\u52A0\u8F7D",card:!0}],j=void 0,x=[{depth:1,text:"Lazyload \u61D2\u52A0\u8F7D",id:"lazyload-\u61D2\u52A0\u8F7D"},{depth:2,text:"\u4ECB\u7ECD",id:"\u4ECB\u7ECD"},{depth:2,text:"\u5F15\u5165",id:"\u5F15\u5165"},{depth:2,text:"\u4EE3\u7801\u6F14\u793A",id:"\u4EE3\u7801\u6F14\u793A"},{depth:3,text:"\u56FE\u7247\u61D2\u52A0\u8F7D",id:"\u56FE\u7247\u61D2\u52A0\u8F7D"},{depth:3,text:"\u7EC4\u4EF6\u61D2\u52A0\u8F7D",id:"\u7EC4\u4EF6\u61D2\u52A0\u8F7D"},{depth:2,text:"API",id:"api"},{depth:3,text:"Options",id:"options"}],L="/src/components/lazyload/README.md",I="Lazyload \u61D2\u52A0\u8F7D",b="1652431887000";var w=e=>e.children({MdContent:B,demos:f,frontmatter:j,slugs:x,filePath:L,title:I,updatedTime:b});export{B as MdContent,w as default,f as demos,L as filePath,j as frontmatter,x as slugs,I as title,b as updatedTime};
