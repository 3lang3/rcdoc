var x=Object.defineProperty,D=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var h=(r,i,n)=>i in r?x(r,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[i]=n,d=(r,i)=>{for(var n in i||(i={}))P.call(i,n)&&h(r,n,i[n]);if(a)for(var n of a(i))k.call(i,n)&&h(r,n,i[n]);return r},o=(r,i)=>D(r,_(i));import{r as l,j as e,a as t}from"./main.6af0c80f.js";import{I as p,B as u,S as N,a as w}from"./index.52a4366a.js";const M=r=>l.exports.createElement("svg",d({width:"1em",height:"1em",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"},r),l.exports.createElement("path",{d:"M537.5 537.5v325c0 20.71-16.79 37.5-37.5 37.5s-37.5-16.79-37.5-37.5v-325h-325c-20.71 0-37.5-16.79-37.5-37.5s16.79-37.5 37.5-37.5h325v-325c0-20.71 16.79-37.5 37.5-37.5s37.5 16.79 37.5 37.5v325h325c20.71 0 37.5 16.79 37.5 37.5s-16.79 37.5-37.5 37.5h-325z",fillRule:"nonzero"})),c=r=>l.exports.createElement(p,d({name:c.name},r),l.exports.createElement(M,null)),R=r=>l.exports.createElement("svg",d({width:"1em",height:"1em",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"},r),l.exports.createElement("path",{d:"M574.975 74.022L741.64 185.133c16.493 10.995 16.493 35.23 0 46.225L574.975 342.47c-18.46 12.307-43.186-.926-43.186-23.112V218.86c-142.994-13.088-282.443 70.705-333.864 211.984C136.71 599.032 223.428 785 391.615 846.215c168.187 61.215 354.155-25.503 415.37-193.69a326.704 326.704 0 0014.287-52.363c.189-1.023.401-2.037.636-3.04a32.49 32.49 0 011.763-7.498c6.122-16.82 24.718-25.491 41.537-19.37 16.819 6.122 25.49 24.719 19.37 41.537-3.458 21.173-9.134 42.15-16.687 62.902-73.458 201.824-296.62 305.886-498.444 232.428C167.622 833.663 63.56 610.5 137.019 408.677c61.002-167.602 225.242-267.785 394.77-254.873v-56.67c0-22.185 24.726-35.419 43.186-23.112z",fillRule:"nonzero"})),m=r=>l.exports.createElement(p,d({name:m.name},r),l.exports.createElement(R,null));var s=()=>e("div",{className:"demo-button",children:[t(u,{type:"primary",children:"\u4E3B\u8981\u6309\u94AE"}),t(u,{type:"info",children:"\u4FE1\u606F\u6309\u94AE"}),t(u,{type:"default",children:"\u9ED8\u8BA4\u6309\u94AE"}),t(u,{type:"warning",children:"\u8B66\u544A\u6309\u94AE"}),t(u,{type:"danger",children:"\u5371\u9669\u6309\u94AE"})]});const z=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button type="primary">\u4E3B\u8981\u6309\u94AE</Button>
      <Button type="info">\u4FE1\u606F\u6309\u94AE</Button>
      <Button type="default">\u9ED8\u8BA4\u6309\u94AE</Button>
      <Button type="warning">\u8B66\u544A\u6309\u94AE</Button>
      <Button type="danger">\u5371\u9669\u6309\u94AE</Button>
    </div>
  );
};
`,L={code:z,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button type="primary">\u4E3B\u8981\u6309\u94AE</Button>
      <Button type="info">\u4FE1\u606F\u6309\u94AE</Button>
      <Button type="default">\u9ED8\u8BA4\u6309\u94AE</Button>
      <Button type="warning">\u8B66\u544A\u6309\u94AE</Button>
      <Button type="danger">\u5371\u9669\u6309\u94AE</Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-type",meta:{title:"\u6309\u94AE\u7C7B\u578B"}};var E=()=>e("div",{className:"demo-button",children:[t(u,{plain:!0,type:"primary",children:"\u6734\u7D20\u6309\u94AE"}),t(u,{plain:!0,type:"info",children:"\u6734\u7D20\u6309\u94AE"})]});const I=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button plain type="primary">
        \u6734\u7D20\u6309\u94AE
      </Button>
      <Button plain type="info">
        \u6734\u7D20\u6309\u94AE
      </Button>
    </div>
  );
};
`,$={code:I,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button plain type="primary">
        \u6734\u7D20\u6309\u94AE
      </Button>
      <Button plain type="info">
        \u6734\u7D20\u6309\u94AE
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-plain",meta:{title:"\u6734\u7D20\u6309\u94AE"}};var v=()=>e("div",{className:"demo-button",children:[t(u,{plain:!0,hairline:!0,type:"primary",children:"\u7EC6\u8FB9\u6846\u6309\u94AE"}),t(u,{plain:!0,hairline:!0,type:"info",children:"\u7EC6\u8FB9\u6846\u6309\u94AE"})]});const T=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button plain hairline type="primary">
        \u7EC6\u8FB9\u6846\u6309\u94AE
      </Button>
      <Button plain hairline type="info">
        \u7EC6\u8FB9\u6846\u6309\u94AE
      </Button>
    </div>
  );
};
`,S={code:T,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button plain hairline type="primary">
        \u7EC6\u8FB9\u6846\u6309\u94AE
      </Button>
      <Button plain hairline type="info">
        \u7EC6\u8FB9\u6846\u6309\u94AE
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-hairline",meta:{title:"\u7EC6\u8FB9\u6846"}};var B=()=>e("div",{className:"demo-button",children:[t(u,{disabled:!0,type:"primary",children:"\u7981\u7528\u72B6\u6001"}),t(u,{disabled:!0,type:"info",children:"\u7981\u7528\u72B6\u6001"})]});const G=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button disabled type="primary">
        \u7981\u7528\u72B6\u6001
      </Button>
      <Button disabled type="info">
        \u7981\u7528\u72B6\u6001
      </Button>
    </div>
  );
};
`,j={code:G,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button disabled type="primary">
        \u7981\u7528\u72B6\u6001
      </Button>
      <Button disabled type="info">
        \u7981\u7528\u72B6\u6001
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-disabled",meta:{title:"\u7981\u7528\u72B6\u6001"}};var F=()=>e("div",{className:"demo-button",children:[t(u,{loading:!0,type:"primary"}),t(u,{loading:!0,type:"primary",loadingType:"spinner"}),t(u,{loading:!0,loadingText:"\u52A0\u8F7D\u4E2D...",type:"info"})]});const q=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button loading type="primary" />
      <Button loading type="primary" loadingType="spinner" />
      <Button loading loadingText="\u52A0\u8F7D\u4E2D..." type="info" />
    </div>
  );
};
`,H={code:q,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button loading type="primary" />
      <Button loading type="primary" loadingType="spinner" />
      <Button loading loadingText="\u52A0\u8F7D\u4E2D..." type="info" />
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-loading",meta:{title:"\u52A0\u8F7D\u72B6\u6001"}};var A=()=>e("div",{className:"demo-button",children:[t(u,{square:!0,type:"primary",children:"\u65B9\u5F62\u6309\u94AE"}),t(u,{round:!0,type:"info",children:"\u5706\u5F62\u6309\u94AE"})]});const V=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button square type="primary">
        \u65B9\u5F62\u6309\u94AE
      </Button>
      <Button round type="info">
        \u5706\u5F62\u6309\u94AE
      </Button>
    </div>
  );
};
`,J={code:V,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button square type="primary">
        \u65B9\u5F62\u6309\u94AE
      </Button>
      <Button round type="info">
        \u5706\u5F62\u6309\u94AE
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-shape",meta:{title:"\u6309\u94AE\u5F62\u72B6"}};var y=()=>e("div",{className:"demo-button",children:[t(u,{icon:t(c,{}),type:"primary"}),t(u,{icon:t(c,{}),iconPosition:"left",type:"primary",children:"\u6309\u94AE"})]});const K=`import React from 'react';
import { Button } from 'react-vant';
import { Plus } from '@react-vant/icons';

import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button icon={<Plus />} type="primary" />
      <Button icon={<Plus />} iconPosition="left" type="primary">
        \u6309\u94AE
      </Button>
    </div>
  );
};
`,O={code:K,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"@react-vant/icons":{type:"NPM",value:"0.0.6"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import { Plus } from '@react-vant/icons';

import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button icon={<Plus />} type="primary" />
      <Button icon={<Plus />} iconPosition="left" type="primary">
        \u6309\u94AE
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-icon",meta:{title:"\u56FE\u6807\u6309\u94AE"}};var b=()=>e("div",{className:"demo-button",children:[t(u,{type:"primary",size:"large",children:"\u5927\u53F7\u6309\u94AE"}),t(u,{type:"primary",size:"normal",children:"\u666E\u901A\u6309\u94AE"}),t(u,{type:"primary",size:"small",children:"\u5C0F\u578B\u6309\u94AE"}),t(u,{type:"primary",size:"mini",children:"\u8FF7\u4F60\u6309\u94AE"})]});const Q=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button type="primary" size="large">
        \u5927\u53F7\u6309\u94AE
      </Button>
      <Button type="primary" size="normal">
        \u666E\u901A\u6309\u94AE
      </Button>
      <Button type="primary" size="small">
        \u5C0F\u578B\u6309\u94AE
      </Button>
      <Button type="primary" size="mini">
        \u8FF7\u4F60\u6309\u94AE
      </Button>
    </div>
  );
};
`,U={code:Q,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button type="primary" size="large">
        \u5927\u53F7\u6309\u94AE
      </Button>
      <Button type="primary" size="normal">
        \u666E\u901A\u6309\u94AE
      </Button>
      <Button type="primary" size="small">
        \u5C0F\u578B\u6309\u94AE
      </Button>
      <Button type="primary" size="mini">
        \u8FF7\u4F60\u6309\u94AE
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-size",meta:{title:"\u6309\u94AE\u5C3A\u5BF8"}};var g=()=>t("div",{className:"demo-button",children:t(u,{type:"primary",block:!0,round:!0,children:"\u5757\u7EA7\u5143\u7D20"})});const W=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button type="primary" block round>
        \u5757\u7EA7\u5143\u7D20
      </Button>
    </div>
  );
};
`,X={code:W,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button type="primary" block round>
        \u5757\u7EA7\u5143\u7D20
      </Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-block",meta:{title:"\u5757\u7EA7\u5143\u7D20"}};var C=()=>e("div",{className:"demo-button",children:[t(u,{color:"#7232dd",children:"\u5355\u8272\u6309\u94AE"}),t(u,{color:"#7232dd",plain:!0,children:"\u5355\u8272\u6309\u94AE"}),t(u,{color:"linear-gradient(to right, #ff6034, #ee0a24)",children:"\u6E10\u53D8\u8272\u6309\u94AE"})]});const Y=`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button color="#7232dd">\u5355\u8272\u6309\u94AE</Button>
      <Button color="#7232dd" plain>
        \u5355\u8272\u6309\u94AE
      </Button>
      <Button color="linear-gradient(to right, #ff6034, #ee0a24)">\u6E10\u53D8\u8272\u6309\u94AE</Button>
    </div>
  );
};
`,Z={code:Y,lang:"tsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Button } from 'react-vant';
import './style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button color="#7232dd">\u5355\u8272\u6309\u94AE</Button>
      <Button color="#7232dd" plain>
        \u5355\u8272\u6309\u94AE
      </Button>
      <Button color="linear-gradient(to right, #ff6034, #ee0a24)">\u6E10\u53D8\u8272\u6309\u94AE</Button>
    </div>
  );
};
`},"style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-color",meta:{title:"\u81EA\u5B9A\u4E49\u989C\u8272"}};var f=()=>t("div",{className:"demo-button",children:e(u.Group,{block:!0,round:!0,children:[t(u,{icon:t(N,{}),children:"\u4E0A\u4E00\u6B65"}),t(u,{icon:t(m,{}),children:"\u5237\u65B0"}),t(u,{iconPosition:"right",icon:t(w,{}),children:"\u4E0B\u4E00\u6B65"})]})});const tt={code:`import { Arrow, ArrowLeft, Replay } from '@react-vant/icons';
import React from 'react';
import { Button } from 'react-vant';
import './demo/style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button.Group block round>
        <Button icon={<ArrowLeft />}>\u4E0A\u4E00\u6B65</Button>
        <Button icon={<Replay />}>\u5237\u65B0</Button>
        <Button iconPosition="right" icon={<Arrow />}>
          \u4E0B\u4E00\u6B65
        </Button>
      </Button.Group>
    </div>
  );
};`,lang:"jsx",dependencies:{"@react-vant/icons":{type:"NPM",value:"0.0.6"},react:{type:"NPM",value:"17.0.2"},"react-vant":{type:"NPM",value:"1.0.0"},"index.jsx":{type:"FILE",value:`import { Arrow, ArrowLeft, Replay } from '@react-vant/icons';
import React from 'react';
import { Button } from 'react-vant';
import './demo/style.less';

export default () => {
  return (
    <div className="demo-button">
      <Button.Group block round>
        <Button icon={<ArrowLeft />}>\u4E0A\u4E00\u6B65</Button>
        <Button icon={<Replay />}>\u5237\u65B0</Button>
        <Button iconPosition="right" icon={<Arrow />}>
          \u4E0B\u4E00\u6B65
        </Button>
      </Button.Group>
    </div>
  );
};`},"demo/style.less":{type:"FILE",value:`.demo-button {
  .rv-button {
    margin: 0 16px 12px 0;
  }

  .rv-button-group {
    .rv-button {
      margin: 0;
    }
  }

  .vant-doc-demo-block {
    padding: 0 16px;
  }

  .vant-doc-demo-block__title {
    padding-left: 0;
  }
}
`}},key:"button-demo",meta:{title:"\u6309\u94AE\u7EC4"}},et=function({previewer:r=()=>null,api:i=()=>null}){const n=r;return t("div",{children:e("div",{children:[t("h1",{id:"button-\u6309\u94AE","data-anchor":"button-\u6309\u94AE",children:"Button \u6309\u94AE"}),t("h2",{id:"\u4ECB\u7ECD","data-anchor":"\u4ECB\u7ECD",children:"\u4ECB\u7ECD"}),t("p",{children:"\u6309\u94AE\u7528\u4E8E\u89E6\u53D1\u4E00\u4E2A\u64CD\u4F5C\uFF0C\u5982\u63D0\u4EA4\u8868\u5355\u3002"}),t("h2",{id:"\u5F15\u5165","data-anchor":"\u5F15\u5165",children:"\u5F15\u5165"}),t(n,{code:"import { Button } from 'react-vant';",lang:"js"}),t("h2",{id:"\u4EE3\u7801\u6F14\u793A","data-anchor":"\u4EE3\u7801\u6F14\u793A",children:"\u4EE3\u7801\u6F14\u793A"}),t("h3",{id:"\u6309\u94AE\u7C7B\u578B","data-anchor":"\u6309\u94AE\u7C7B\u578B",children:"\u6309\u94AE\u7C7B\u578B"}),e("p",{children:["\u6309\u94AE\u652F\u6301 ",t("code",{children:"default"}),"\u3001",t("code",{children:"primary"}),"\u3001",t("code",{children:"info"}),"\u3001",t("code",{children:"warning"}),"\u3001",t("code",{children:"danger"})," \u4E94\u79CD\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u4E3A ",t("code",{children:"default"}),"\u3002"]}),t("div",{children:t(n,o(d({},L),{children:t(s,{})}))}),t("h3",{id:"\u6734\u7D20\u6309\u94AE","data-anchor":"\u6734\u7D20\u6309\u94AE",children:"\u6734\u7D20\u6309\u94AE"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"plain"})," \u5C5E\u6027\u5C06\u6309\u94AE\u8BBE\u7F6E\u4E3A\u6734\u7D20\u6309\u94AE\uFF0C\u6734\u7D20\u6309\u94AE\u7684\u6587\u5B57\u4E3A\u6309\u94AE\u989C\u8272\uFF0C\u80CC\u666F\u4E3A\u767D\u8272\u3002"]}),t("div",{children:t(n,o(d({},$),{children:t(E,{})}))}),t("h3",{id:"\u7EC6\u8FB9\u6846","data-anchor":"\u7EC6\u8FB9\u6846",children:"\u7EC6\u8FB9\u6846"}),e("p",{children:["\u8BBE\u7F6E ",t("code",{children:"hairline"})," \u5C5E\u6027\u53EF\u4EE5\u5C55\u793A 0.5px \u7684\u7EC6\u8FB9\u6846\u3002"]}),t("div",{children:t(n,o(d({},S),{children:t(v,{})}))}),t("h3",{id:"\u7981\u7528\u72B6\u6001","data-anchor":"\u7981\u7528\u72B6\u6001",children:"\u7981\u7528\u72B6\u6001"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"disabled"})," \u5C5E\u6027\u6765\u7981\u7528\u6309\u94AE\uFF0C\u7981\u7528\u72B6\u6001\u4E0B\u6309\u94AE\u4E0D\u53EF\u70B9\u51FB\u3002"]}),t("div",{children:t(n,o(d({},j),{children:t(B,{})}))}),t("h3",{id:"\u52A0\u8F7D\u72B6\u6001","data-anchor":"\u52A0\u8F7D\u72B6\u6001",children:"\u52A0\u8F7D\u72B6\u6001"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"loading"})," \u5C5E\u6027\u8BBE\u7F6E\u6309\u94AE\u4E3A\u52A0\u8F7D\u72B6\u6001\uFF0C\u52A0\u8F7D\u72B6\u6001\u4E0B\u9ED8\u8BA4\u4F1A\u9690\u85CF\u6309\u94AE\u6587\u5B57\uFF0C\u53EF\u4EE5\u901A\u8FC7 ",t("code",{children:"loadingText"})," \u8BBE\u7F6E\u52A0\u8F7D\u72B6\u6001\u4E0B\u7684\u6587\u5B57\u3002"]}),t("div",{children:t(n,o(d({},H),{children:t(F,{})}))}),t("h3",{id:"\u6309\u94AE\u5F62\u72B6","data-anchor":"\u6309\u94AE\u5F62\u72B6",children:"\u6309\u94AE\u5F62\u72B6"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"square"})," \u8BBE\u7F6E\u65B9\u5F62\u6309\u94AE\uFF0C\u901A\u8FC7 ",t("code",{children:"round"})," \u8BBE\u7F6E\u5706\u5F62\u6309\u94AE\u3002"]}),t("div",{children:t(n,o(d({},J),{children:t(A,{})}))}),t("h3",{id:"\u56FE\u6807\u6309\u94AE","data-anchor":"\u56FE\u6807\u6309\u94AE",children:"\u56FE\u6807\u6309\u94AE"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"icon"})," \u5C5E\u6027\u8BBE\u7F6E\u6309\u94AE\u56FE\u6807\uFF0C\u652F\u6301 Icon \u7EC4\u4EF6\u91CC\u7684\u6240\u6709\u56FE\u6807\u3002"]}),t("div",{children:t(n,o(d({},O),{children:t(y,{})}))}),t("h3",{id:"\u6309\u94AE\u5C3A\u5BF8","data-anchor":"\u6309\u94AE\u5C3A\u5BF8",children:"\u6309\u94AE\u5C3A\u5BF8"}),e("p",{children:["\u652F\u6301 ",t("code",{children:"large"}),"\u3001",t("code",{children:"normal"}),"\u3001",t("code",{children:"small"}),"\u3001",t("code",{children:"mini"})," \u56DB\u79CD\u5C3A\u5BF8\uFF0C\u9ED8\u8BA4\u4E3A ",t("code",{children:"normal"}),"\u3002"]}),t("div",{children:t(n,o(d({},U),{children:t(b,{})}))}),t("h3",{id:"\u5757\u7EA7\u5143\u7D20","data-anchor":"\u5757\u7EA7\u5143\u7D20",children:"\u5757\u7EA7\u5143\u7D20"}),e("p",{children:["\u6309\u94AE\u5728\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4E3A\u884C\u5185\u5757\u7EA7\u5143\u7D20\uFF0C\u901A\u8FC7 ",t("code",{children:"block"})," \u5C5E\u6027\u53EF\u4EE5\u5C06\u6309\u94AE\u7684\u5143\u7D20\u7C7B\u578B\u8BBE\u7F6E\u4E3A\u5757\u7EA7\u5143\u7D20\u3002"]}),t("div",{children:t(n,o(d({},X),{children:t(g,{})}))}),t("h3",{id:"\u81EA\u5B9A\u4E49\u989C\u8272","data-anchor":"\u81EA\u5B9A\u4E49\u989C\u8272",children:"\u81EA\u5B9A\u4E49\u989C\u8272"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"color"})," \u5C5E\u6027\u53EF\u4EE5\u81EA\u5B9A\u4E49\u6309\u94AE\u7684\u989C\u8272\u3002"]}),t("div",{children:t(n,o(d({},Z),{children:t(C,{})}))}),t("h3",{id:"\u6309\u94AE\u7EC4","data-anchor":"\u6309\u94AE\u7EC4",children:"\u6309\u94AE\u7EC4"}),e("p",{children:["\u901A\u8FC7 ",t("code",{children:"Button.Group"})," \u5C06\u591A\u4E2A\u6309\u94AE\u5E76\u6392\u663E\u793A\u3002"]}),t(n,o(d({},tt),{children:t(f,{})})),t("h2",{id:"api","data-anchor":"api",children:"API"}),t("h3",{id:"props","data-anchor":"props",children:"Props"}),e("table",{children:[t("thead",{children:e("tr",{children:[t("th",{children:"\u53C2\u6570"}),t("th",{children:"\u8BF4\u660E"}),t("th",{children:"\u7C7B\u578B"}),t("th",{children:"\u9ED8\u8BA4\u503C"})]})}),e("tbody",{children:[e("tr",{children:[t("td",{children:"type"}),e("td",{children:["\u7C7B\u578B\uFF0C\u53EF\u9009\u503C\u4E3A ",t("code",{children:"primary"})," ",t("code",{children:"info"})," ",t("code",{children:"warning"})," ",t("code",{children:"danger"})]}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"default"})})]}),e("tr",{children:[t("td",{children:"size"}),e("td",{children:["\u5C3A\u5BF8\uFF0C\u53EF\u9009\u503C\u4E3A ",t("code",{children:"large"})," ",t("code",{children:"small"})," ",t("code",{children:"mini"})]}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"normal"})})]}),e("tr",{children:[t("td",{children:"text"}),t("td",{children:"\u6309\u94AE\u6587\u5B57"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"color"}),e("td",{children:["\u6309\u94AE\u989C\u8272\uFF0C\u652F\u6301\u4F20\u5165 ",t("code",{children:"linear-gradient"})," \u6E10\u53D8\u8272"]}),t("td",{children:t("em",{children:"string"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"icon"}),t("td",{children:"\u6309\u94AE Icon"}),t("td",{children:t("em",{children:"ReactNode"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"iconPosition"}),e("td",{children:["\u56FE\u6807\u5C55\u793A\u4F4D\u7F6E\uFF0C\u53EF\u9009\u503C\u4E3A ",t("code",{children:"right"})]}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"left"})})]}),e("tr",{children:[t("td",{children:"tag"}),t("td",{children:"\u6309\u94AE\u6839\u8282\u70B9\u7684 HTML \u6807\u7B7E"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"Button"})})]}),e("tr",{children:[t("td",{children:"nativeType"}),t("td",{children:"\u539F\u751F Button \u6807\u7B7E\u7684 type \u5C5E\u6027"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"Button"})})]}),e("tr",{children:[t("td",{children:"block"}),t("td",{children:"\u662F\u5426\u4E3A\u5757\u7EA7\u5143\u7D20"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"plain"}),t("td",{children:"\u662F\u5426\u4E3A\u6734\u7D20\u6309\u94AE"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"square"}),t("td",{children:"\u662F\u5426\u4E3A\u65B9\u5F62\u6309\u94AE"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"round"}),t("td",{children:"\u662F\u5426\u4E3A\u5706\u5F62\u6309\u94AE"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"shadow"}),e("td",{children:["\u663E\u793A\u9634\u5F71\uFF0C\u53EF\u9009\u503C\u4E3A ",t("code",{children:"1"})," ",t("code",{children:"2"})," ",t("code",{children:"3"})]}),t("td",{children:t("em",{children:"boolean|number"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"disabled"}),t("td",{children:"\u662F\u5426\u7981\u7528\u6309\u94AE"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"hairline"}),t("td",{children:"\u662F\u5426\u4F7F\u7528 0.5px \u8FB9\u6846"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"loading"}),t("td",{children:"\u662F\u5426\u663E\u793A\u4E3A\u52A0\u8F7D\u72B6\u6001"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"loadingText"}),t("td",{children:"\u52A0\u8F7D\u72B6\u6001\u63D0\u793A\u6587\u5B57"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"loadingType"}),e("td",{children:[t("a",{href:"#/zh-CN/loading",children:"\u52A0\u8F7D\u56FE\u6807\u7C7B\u578B"}),"\uFF0C\u53EF\u9009\u503C\u4E3A ",t("code",{children:"spinner"})]}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"circular"})})]}),e("tr",{children:[t("td",{children:"loadingSize"}),t("td",{children:"\u52A0\u8F7D\u56FE\u6807\u5927\u5C0F"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"20px"})})]})]})]}),t("h3",{id:"events","data-anchor":"events",children:"Events"}),e("table",{children:[t("thead",{children:e("tr",{children:[t("th",{children:"\u4E8B\u4EF6\u540D"}),t("th",{children:"\u8BF4\u660E"}),t("th",{children:"\u56DE\u8C03\u53C2\u6570"})]})}),t("tbody",{children:e("tr",{children:[t("td",{children:"onClick"}),t("td",{children:"\u70B9\u51FB\u6309\u94AE\uFF0C\u4E14\u6309\u94AE\u72B6\u6001\u4E0D\u4E3A\u52A0\u8F7D\u6216\u7981\u7528\u65F6\u89E6\u53D1"}),t("td",{children:t("em",{children:"event: Event"})})]})})]}),t("h3",{id:"buttongroup","data-anchor":"buttongroup",children:"Button.Group"}),e("table",{children:[t("thead",{children:e("tr",{children:[t("th",{children:"\u53C2\u6570"}),t("th",{children:"\u8BF4\u660E"}),t("th",{children:"\u7C7B\u578B"}),t("th",{children:"\u9ED8\u8BA4\u503C"})]})}),e("tbody",{children:[e("tr",{children:[t("td",{children:"type"}),t("td",{children:"\u7EDF\u4E00\u8BBE\u7F6E\u6309\u94AE\u7C7B\u578B"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"default"})})]}),e("tr",{children:[t("td",{children:"size"}),t("td",{children:"\u7EDF\u4E00\u8BBE\u7F6E\u6309\u94AE\u5C3A\u5BF8"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"normal"})})]}),e("tr",{children:[t("td",{children:"iconPosition"}),t("td",{children:"\u7EDF\u4E00\u8BBE\u7F6E\u6309\u94AE\u56FE\u6807\u5C55\u793A\u4F4D\u7F6E"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"left"})})]}),e("tr",{children:[t("td",{children:"tag"}),t("td",{children:"\u7EDF\u4E00\u8BBE\u7F6E\u6309\u94AE\u6839\u8282\u70B9\u7684 HTML \u6807\u7B7E"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"Button"})})]}),e("tr",{children:[t("td",{children:"nativeType"}),t("td",{children:"\u7EDF\u4E00\u8BBE\u7F6E\u6309\u94AE\u6807\u7B7E\u7684 type \u5C5E\u6027"}),t("td",{children:t("em",{children:"string"})}),t("td",{children:t("code",{children:"Button"})})]}),e("tr",{children:[t("td",{children:"block"}),t("td",{children:"\u7EDF\u4E00\u8BBE\u7F6E\u6309\u94AE\u4E3A\u5757\u7EA7\u5143\u7D20"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"plain"}),t("td",{children:"\u662F\u5426\u4E3A\u6734\u7D20\u6309\u94AE\u7EC4"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"square"}),t("td",{children:"\u662F\u5426\u4E3A\u65B9\u5F62\u6309\u94AE\u7EC4"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"round"}),t("td",{children:"\u662F\u5426\u4E3A\u5706\u5F62\u6309\u94AE\u7EC4"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"shadow"}),e("td",{children:["\u663E\u793A\u9634\u5F71\uFF0C\u53EF\u9009\u503C\u4E3A ",t("code",{children:"1"})," ",t("code",{children:"2"})," ",t("code",{children:"3"})]}),t("td",{children:t("em",{children:"boolean|number"})}),t("td",{children:t("code",{children:"false"})})]}),e("tr",{children:[t("td",{children:"disabled"}),t("td",{children:"\u662F\u5426\u7981\u7528\u6309\u94AE\u7EC4"}),t("td",{children:t("em",{children:"boolean"})}),t("td",{children:t("code",{children:"false"})})]})]})]}),t("h3",{id:"\u7C7B\u578B\u5B9A\u4E49","data-anchor":"\u7C7B\u578B\u5B9A\u4E49",children:"\u7C7B\u578B\u5B9A\u4E49"}),t("p",{children:"\u7EC4\u4EF6\u5BFC\u51FA\u4EE5\u4E0B\u7C7B\u578B\u5B9A\u4E49\uFF1A"}),t(n,{code:"import type { ButtonType, ButtonSize } from 'react-vant';",lang:"js"}),t("h2",{id:"\u4E3B\u9898\u5B9A\u5236","data-anchor":"\u4E3B\u9898\u5B9A\u5236",children:"\u4E3B\u9898\u5B9A\u5236"}),t("h3",{id:"\u6837\u5F0F\u53D8\u91CF","data-anchor":"\u6837\u5F0F\u53D8\u91CF",children:"\u6837\u5F0F\u53D8\u91CF"}),e("p",{children:["\u7EC4\u4EF6\u63D0\u4F9B\u4E86\u4E0B\u5217 CSS \u53D8\u91CF\uFF0C\u53EF\u7528\u4E8E\u81EA\u5B9A\u4E49\u6837\u5F0F\uFF0C\u4F7F\u7528\u65B9\u6CD5\u8BF7\u53C2\u8003 ",t("a",{href:"#/zh-CN/config-provider",children:"ConfigProvider \u7EC4\u4EF6"}),"\u3002"]}),e("table",{children:[t("thead",{children:e("tr",{children:[t("th",{children:"\u540D\u79F0"}),t("th",{children:"\u9ED8\u8BA4\u503C"}),t("th",{children:"\u63CF\u8FF0"})]})}),e("tbody",{children:[e("tr",{children:[t("td",{children:"--rv-button-mini-height"}),t("td",{children:t("em",{children:"24px"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-mini-padding"}),t("td",{children:t("em",{children:"0 var(--rv-padding-base)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-mini-font-size"}),t("td",{children:t("em",{children:"var(--rv-font-size-xs)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-small-height"}),t("td",{children:t("em",{children:"32px"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-small-padding"}),t("td",{children:t("em",{children:"0 var(--rv-padding-xs)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-small-font-size"}),t("td",{children:t("em",{children:"var(--rv-font-size-sm)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-normal-font-size"}),t("td",{children:t("em",{children:"var(--rv-font-size-md)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-normal-padding"}),t("td",{children:t("em",{children:"0 15px"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-large-height"}),t("td",{children:t("em",{children:"50px"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-default-height"}),t("td",{children:t("em",{children:"44px"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-default-line-height"}),t("td",{children:t("em",{children:"1.2"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-default-font-size"}),t("td",{children:t("em",{children:"var(--rv-font-size-lg)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-default-color"}),t("td",{children:t("em",{children:"var(--rv-text-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-default-background-color"}),t("td",{children:t("em",{children:"var(--rv-white)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-default-border-color"}),t("td",{children:t("em",{children:"var(--rv-border-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-primary-color"}),t("td",{children:t("em",{children:"var(--rv-white)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-primary-background-color"}),t("td",{children:t("em",{children:"var(--rv-primary-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-primary-border-color"}),t("td",{children:t("em",{children:"var(--rv-primary-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-success-color"}),t("td",{children:t("em",{children:"var(--rv-white)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-success-background-color"}),t("td",{children:t("em",{children:"var(--rv-success-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-success-border-color"}),t("td",{children:t("em",{children:"var(--rv-success-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-danger-color"}),t("td",{children:t("em",{children:"var(--rv-white)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-danger-background-color"}),t("td",{children:t("em",{children:"var(--rv-danger-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-danger-border-color"}),t("td",{children:t("em",{children:"var(--rv-danger-color)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-warning-color"}),t("td",{children:t("em",{children:"var(--rv-white)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-warning-background-color"}),t("td",{children:t("em",{children:"var(--rv-orange)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-warning-border-color"}),t("td",{children:t("em",{children:"var(--rv-orange)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-border-width"}),t("td",{children:t("em",{children:"var(--rv-border-width-base)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-border-radius"}),t("td",{children:t("em",{children:"var(--rv-border-radius-sm)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-round-border-radius"}),t("td",{children:t("em",{children:"var(--rv-border-radius-max)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-plain-background-color"}),t("td",{children:t("em",{children:"var(--rv-white)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-disabled-opacity"}),t("td",{children:t("em",{children:"var(--rv-disabled-opacity)"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-icon-size"}),t("td",{children:t("em",{children:"1.2em"})}),t("td",{children:"-"})]}),e("tr",{children:[t("td",{children:"--rv-button-loading-icon-size"}),t("td",{children:t("em",{children:"20px"})}),t("td",{children:"-"})]})]})]})]})})},ut=[{Component:s,key:"button-type",title:"\u6309\u94AE\u7C7B\u578B"},{Component:E,key:"button-plain",title:"\u6734\u7D20\u6309\u94AE"},{Component:v,key:"button-hairline",title:"\u7EC6\u8FB9\u6846"},{Component:B,key:"button-disabled",title:"\u7981\u7528\u72B6\u6001"},{Component:F,key:"button-loading",title:"\u52A0\u8F7D\u72B6\u6001"},{Component:A,key:"button-shape",title:"\u6309\u94AE\u5F62\u72B6"},{Component:y,key:"button-icon",title:"\u56FE\u6807\u6309\u94AE"},{Component:b,key:"button-size",title:"\u6309\u94AE\u5C3A\u5BF8"},{Component:g,key:"button-block",title:"\u5757\u7EA7\u5143\u7D20"},{Component:C,key:"button-color",title:"\u81EA\u5B9A\u4E49\u989C\u8272"},{Component:f,key:"button-demo",title:"\u6309\u94AE\u7EC4"}],nt=void 0,rt=[{depth:1,text:"Button \u6309\u94AE",id:"button-\u6309\u94AE"},{depth:2,text:"\u4ECB\u7ECD",id:"\u4ECB\u7ECD"},{depth:2,text:"\u5F15\u5165",id:"\u5F15\u5165"},{depth:2,text:"\u4EE3\u7801\u6F14\u793A",id:"\u4EE3\u7801\u6F14\u793A"},{depth:3,text:"\u6309\u94AE\u7C7B\u578B",id:"\u6309\u94AE\u7C7B\u578B"},{depth:3,text:"\u6734\u7D20\u6309\u94AE",id:"\u6734\u7D20\u6309\u94AE"},{depth:3,text:"\u7EC6\u8FB9\u6846",id:"\u7EC6\u8FB9\u6846"},{depth:3,text:"\u7981\u7528\u72B6\u6001",id:"\u7981\u7528\u72B6\u6001"},{depth:3,text:"\u52A0\u8F7D\u72B6\u6001",id:"\u52A0\u8F7D\u72B6\u6001"},{depth:3,text:"\u6309\u94AE\u5F62\u72B6",id:"\u6309\u94AE\u5F62\u72B6"},{depth:3,text:"\u56FE\u6807\u6309\u94AE",id:"\u56FE\u6807\u6309\u94AE"},{depth:3,text:"\u6309\u94AE\u5C3A\u5BF8",id:"\u6309\u94AE\u5C3A\u5BF8"},{depth:3,text:"\u5757\u7EA7\u5143\u7D20",id:"\u5757\u7EA7\u5143\u7D20"},{depth:3,text:"\u81EA\u5B9A\u4E49\u989C\u8272",id:"\u81EA\u5B9A\u4E49\u989C\u8272"},{depth:3,text:"\u6309\u94AE\u7EC4",id:"\u6309\u94AE\u7EC4"},{depth:2,text:"API",id:"api"},{depth:3,text:"Props",id:"props"},{depth:3,text:"Events",id:"events"},{depth:3,text:"Button.Group",id:"buttongroup"},{depth:3,text:"\u7C7B\u578B\u5B9A\u4E49",id:"\u7C7B\u578B\u5B9A\u4E49"},{depth:2,text:"\u4E3B\u9898\u5B9A\u5236",id:"\u4E3B\u9898\u5B9A\u5236"},{depth:3,text:"\u6837\u5F0F\u53D8\u91CF",id:"\u6837\u5F0F\u53D8\u91CF"}],dt="/src/components/button/README.md",it="Button \u6309\u94AE",ot="1653748195000";var ht=r=>r.children({MdContent:et,demos:ut,frontmatter:nt,slugs:rt,filePath:dt,title:it,updatedTime:ot});export{et as MdContent,ht as default,ut as demos,dt as filePath,nt as frontmatter,rt as slugs,it as title,ot as updatedTime};
