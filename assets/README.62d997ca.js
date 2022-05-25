var l=Object.defineProperty,s=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var i=(e,t,n)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,a=(e,t)=>{for(var n in t||(t={}))m.call(t,n)&&i(e,n,t[n]);if(d)for(var n of d(t))f.call(t,n)&&i(e,n,t[n]);return e},u=(e,t)=>s(e,h(t));import{R as v,j as r,a as o}from"./main.1894e6db.js";import{B as x}from"./index.8777afc5.js";var p=()=>{const[e,t]=v.useState(0);return r(x,{onClick:()=>t(n=>n+1),children:["count: ",e]})};const g={code:`import React from 'react';
import { Button } from 'react-vant';

export default () => {
  const [count, updateCount] = React.useState(0);
  return <Button onClick={() => updateCount((c) => c + 1)}>count: {count}</Button>;
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';

export default () => {
  const [count, updateCount] = React.useState(0);
  return <Button onClick={() => updateCount((c) => c + 1)}>count: {count}</Button>;
};`}},key:"grid-demo",meta:{title:"hello",compact:!0}},C=function({previewer:e=()=>null,api:t=()=>null}){const n=e,c=t;return o("div",{children:r("div",{children:[o("h1",{id:"grid","data-anchor":"grid",children:"Grid"}),o("p",{children:"hello mdoc"}),o(n,u(a({},g),{children:o(p,{})})),r("div",{children:[o("h2",{id:"api","data-anchor":"api",children:"API"}),o(c,{identifier:"grid",export:"default"}),o("h3",{id:"api-other","data-anchor":"api-other",children:"Other"}),o(c,{identifier:"grid",export:"Other"})]})]})})},B=[{Component:p,key:"grid-demo",title:"hello",compact:!0}],P=void 0,R=[{depth:1,text:"Grid",id:"grid"},{depth:2,text:"API",id:"api"},{depth:3,text:"Other",id:"api-other"}],M="/src/components/grid/README.md",j="Grid",k="1653472770000";var I=e=>e.children({MdContent:C,demos:B,frontmatter:P,slugs:R,filePath:M,title:j,updatedTime:k});export{C as MdContent,I as default,B as demos,M as filePath,P as frontmatter,R as slugs,j as title,k as updatedTime};
