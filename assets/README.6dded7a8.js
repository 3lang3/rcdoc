var Z=Object.defineProperty,K=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var U=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var G=(u,i,o)=>i in u?Z(u,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):u[i]=o,y=(u,i)=>{for(var o in i||(i={}))ee.call(i,o)&&G(u,o,i[o]);if(U)for(var o of U(i))te.call(i,o)&&G(u,o,i[o]);return u},b=(u,i)=>K(u,_(i));import{j as w,a as c,R as d,b as k,_ as H,r as m}from"./main.a79351cd.js";import{C as A}from"./index.9b9e07d8.js";var z=()=>w("div",{className:"demo-styles",children:[c("div",{className:"rv-ellipsis",children:"\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E00\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565"}),c("div",{className:"rv-multi-ellipsis--l2",children:"\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E24\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565\u3002\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E24\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565"}),c("div",{className:"rv-multi-ellipsis--l3",children:"\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565"})]});const ne={code:`import React from 'react';
import './demo/ellipsis.less';

export default () => {
  return (
    <div className="demo-styles">
      <div className="rv-ellipsis">\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E00\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565</div>
      <div className="rv-multi-ellipsis--l2">
        \u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E24\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565\u3002\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E24\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565
      </div>
      <div className="rv-multi-ellipsis--l3">
        \u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565
      </div>
    </div>
  );
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"index.jsx":{type:"FILE",value:`import React from 'react';
import './demo/ellipsis.less';

export default () => {
  return (
    <div className="demo-styles">
      <div className="rv-ellipsis">\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E00\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565</div>
      <div className="rv-multi-ellipsis--l2">
        \u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E24\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565\u3002\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E24\u884C\u7684\u6587\u5B57\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u4F1A\u7701\u7565
      </div>
      <div className="rv-multi-ellipsis--l3">
        \u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565\u8FD9\u662F\u4E00\u6BB5\u6700\u591A\u663E\u793A\u4E09\u884C\u7684\u6587\u5B57\uFF0C\u591A\u4F59\u7684\u5185\u5BB9\u4F1A\u88AB\u7701\u7565
      </div>
    </div>
  );
};`},"demo/ellipsis.less":{type:"FILE",value:`.demo-styles {
  .rv-ellipsis,
  .rv-multi-ellipsis--l2,
  .rv-multi-ellipsis--l3 {
    max-width: 300px;
    font-size: 14px;
    line-height: 18px;
  }

  .rv-ellipsis,
  .rv-multi-ellipsis--l2,
  .rv-multi-ellipsis--l3 {
    margin-bottom: 16px;
  }

  .demo-animate-block {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    background-color: #3f45ff;
    border-radius: 8px;
  }
}
`}},key:"styles-demo",meta:{title:"\u6587\u5B57\u7701\u7565"}};var q=()=>c("div",{className:"demo-styles",children:c("div",{className:"rv-hairline--top"})});const ue={code:`import React from 'react';
import './demo/hairline.less';

export default () => {
  return (
    <div className="demo-styles">
      <div className="rv-hairline--top"></div>
    </div>
  );
};`,lang:"jsx",dependencies:{react:{type:"NPM",value:"17.0.2"},"index.jsx":{type:"FILE",value:`import React from 'react';
import './demo/hairline.less';

export default () => {
  return (
    <div className="demo-styles">
      <div className="rv-hairline--top"></div>
    </div>
  );
};`},"demo/hairline.less":{type:"FILE",value:`.demo-styles {
  .rv-hairline--top {
    height: 30px;
    background-color: #fff;

    &::after {
      top: 5px;
    }
  }
}
`}},key:"styles-demo-1",meta:{title:"1px \u8FB9\u6846"}};function O(u,i){if(u==null)return{};var o={},e=Object.keys(u),n,t;for(t=0;t<e.length;t++)n=e[t],!(i.indexOf(n)>=0)&&(o[n]=u[n]);return o}function $(u,i){return $=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},$(u,i)}function T(u,i){u.prototype=Object.create(i.prototype),u.prototype.constructor=u,$(u,i)}function ie(u,i){return u.classList?!!i&&u.classList.contains(i):(" "+(u.className.baseVal||u.className)+" ").indexOf(" "+i+" ")!==-1}function re(u,i){u.classList?u.classList.add(i):ie(u,i)||(typeof u.className=="string"?u.className=u.className+" "+i:u.setAttribute("class",(u.className&&u.className.baseVal||"")+" "+i))}function W(u,i){return u.replace(new RegExp("(^|\\s)"+i+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function se(u,i){u.classList?u.classList.remove(i):typeof u.className=="string"?u.className=W(u.className,i):u.setAttribute("class",W(u.className&&u.className.baseVal||"",i))}var X={disabled:!1},N=d.createContext(null),S="unmounted",x="exited",h="entering",E="entered",D="exiting",v=function(u){T(i,u);function i(e,n){var t;t=u.call(this,e,n)||this;var s=n,r=s&&!s.isMounting?e.enter:e.appear,a;return t.appearStatus=null,e.in?r?(a=x,t.appearStatus=h):a=E:e.unmountOnExit||e.mountOnEnter?a=S:a=x,t.state={status:a},t.nextCallback=null,t}i.getDerivedStateFromProps=function(n,t){var s=n.in;return s&&t.status===S?{status:x}:null};var o=i.prototype;return o.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},o.componentDidUpdate=function(n){var t=null;if(n!==this.props){var s=this.state.status;this.props.in?s!==h&&s!==E&&(t=h):(s===h||s===E)&&(t=D)}this.updateStatus(!1,t)},o.componentWillUnmount=function(){this.cancelNextCallback()},o.getTimeouts=function(){var n=this.props.timeout,t,s,r;return t=s=r=n,n!=null&&typeof n!="number"&&(t=n.exit,s=n.enter,r=n.appear!==void 0?n.appear:s),{exit:t,enter:s,appear:r}},o.updateStatus=function(n,t){n===void 0&&(n=!1),t!==null?(this.cancelNextCallback(),t===h?this.performEnter(n):this.performExit()):this.props.unmountOnExit&&this.state.status===x&&this.setState({status:S})},o.performEnter=function(n){var t=this,s=this.props.enter,r=this.context?this.context.isMounting:n,a=this.props.nodeRef?[r]:[k.findDOMNode(this),r],l=a[0],p=a[1],f=this.getTimeouts(),F=r?f.appear:f.enter;if(!n&&!s||X.disabled){this.safeSetState({status:E},function(){t.props.onEntered(l)});return}this.props.onEnter(l,p),this.safeSetState({status:h},function(){t.props.onEntering(l,p),t.onTransitionEnd(F,function(){t.safeSetState({status:E},function(){t.props.onEntered(l,p)})})})},o.performExit=function(){var n=this,t=this.props.exit,s=this.getTimeouts(),r=this.props.nodeRef?void 0:k.findDOMNode(this);if(!t||X.disabled){this.safeSetState({status:x},function(){n.props.onExited(r)});return}this.props.onExit(r),this.safeSetState({status:D},function(){n.props.onExiting(r),n.onTransitionEnd(s.exit,function(){n.safeSetState({status:x},function(){n.props.onExited(r)})})})},o.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},o.safeSetState=function(n,t){t=this.setNextCallback(t),this.setState(n,t)},o.setNextCallback=function(n){var t=this,s=!0;return this.nextCallback=function(r){s&&(s=!1,t.nextCallback=null,n(r))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},o.onTransitionEnd=function(n,t){this.setNextCallback(t);var s=this.props.nodeRef?this.props.nodeRef.current:k.findDOMNode(this),r=n==null&&!this.props.addEndListener;if(!s||r){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var a=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],l=a[0],p=a[1];this.props.addEndListener(l,p)}n!=null&&setTimeout(this.nextCallback,n)},o.render=function(){var n=this.state.status;if(n===S)return null;var t=this.props,s=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var r=O(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return d.createElement(N.Provider,{value:null},typeof s=="function"?s(n,r):d.cloneElement(d.Children.only(s),r))},i}(d.Component);v.contextType=N;v.propTypes={};function g(){}v.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:g,onEntering:g,onEntered:g,onExit:g,onExiting:g,onExited:g};v.UNMOUNTED=S;v.EXITED=x;v.ENTERING=h;v.ENTERED=E;v.EXITING=D;var ae=function(i,o){return i&&o&&o.split(" ").forEach(function(e){return re(i,e)})},P=function(i,o){return i&&o&&o.split(" ").forEach(function(e){return se(i,e)})},I=function(u){T(i,u);function i(){for(var e,n=arguments.length,t=new Array(n),s=0;s<n;s++)t[s]=arguments[s];return e=u.call.apply(u,[this].concat(t))||this,e.appliedClasses={appear:{},enter:{},exit:{}},e.onEnter=function(r,a){var l=e.resolveArguments(r,a),p=l[0],f=l[1];e.removeClasses(p,"exit"),e.addClass(p,f?"appear":"enter","base"),e.props.onEnter&&e.props.onEnter(r,a)},e.onEntering=function(r,a){var l=e.resolveArguments(r,a),p=l[0],f=l[1],F=f?"appear":"enter";e.addClass(p,F,"active"),e.props.onEntering&&e.props.onEntering(r,a)},e.onEntered=function(r,a){var l=e.resolveArguments(r,a),p=l[0],f=l[1],F=f?"appear":"enter";e.removeClasses(p,F),e.addClass(p,F,"done"),e.props.onEntered&&e.props.onEntered(r,a)},e.onExit=function(r){var a=e.resolveArguments(r),l=a[0];e.removeClasses(l,"appear"),e.removeClasses(l,"enter"),e.addClass(l,"exit","base"),e.props.onExit&&e.props.onExit(r)},e.onExiting=function(r){var a=e.resolveArguments(r),l=a[0];e.addClass(l,"exit","active"),e.props.onExiting&&e.props.onExiting(r)},e.onExited=function(r){var a=e.resolveArguments(r),l=a[0];e.removeClasses(l,"exit"),e.addClass(l,"exit","done"),e.props.onExited&&e.props.onExited(r)},e.resolveArguments=function(r,a){return e.props.nodeRef?[e.props.nodeRef.current,r]:[r,a]},e.getClassNames=function(r){var a=e.props.classNames,l=typeof a=="string",p=l&&a?a+"-":"",f=l?""+p+r:a[r],F=l?f+"-active":a[r+"Active"],Y=l?f+"-done":a[r+"Done"];return{baseClassName:f,activeClassName:F,doneClassName:Y}},e}var o=i.prototype;return o.addClass=function(n,t,s){var r=this.getClassNames(t)[s+"ClassName"],a=this.getClassNames("enter"),l=a.doneClassName;t==="appear"&&s==="done"&&l&&(r+=" "+l),s==="active"&&n&&n.scrollTop,r&&(this.appliedClasses[t][s]=r,ae(n,r))},o.removeClasses=function(n,t){var s=this.appliedClasses[t],r=s.base,a=s.active,l=s.done;this.appliedClasses[t]={},r&&P(n,r),a&&P(n,a),l&&P(n,l)},o.render=function(){var n=this.props;n.classNames;var t=O(n,["classNames"]);return d.createElement(v,H({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},i}(d.Component);I.defaultProps={classNames:""};I.propTypes={};function oe(u){if(u===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return u}function j(u,i){var o=function(t){return i&&m.exports.isValidElement(t)?i(t):t},e=Object.create(null);return u&&m.exports.Children.map(u,function(n){return n}).forEach(function(n){e[n.key]=o(n)}),e}function le(u,i){u=u||{},i=i||{};function o(p){return p in i?i[p]:u[p]}var e=Object.create(null),n=[];for(var t in u)t in i?n.length&&(e[t]=n,n=[]):n.push(t);var s,r={};for(var a in i){if(e[a])for(s=0;s<e[a].length;s++){var l=e[a][s];r[e[a][s]]=o(l)}r[a]=o(a)}for(s=0;s<n.length;s++)r[n[s]]=o(n[s]);return r}function C(u,i,o){return o[i]!=null?o[i]:u.props[i]}function de(u,i){return j(u.children,function(o){return m.exports.cloneElement(o,{onExited:i.bind(null,o),in:!0,appear:C(o,"appear",u),enter:C(o,"enter",u),exit:C(o,"exit",u)})})}function ce(u,i,o){var e=j(u.children),n=le(i,e);return Object.keys(n).forEach(function(t){var s=n[t];if(!!m.exports.isValidElement(s)){var r=t in i,a=t in e,l=i[t],p=m.exports.isValidElement(l)&&!l.props.in;a&&(!r||p)?n[t]=m.exports.cloneElement(s,{onExited:o.bind(null,s),in:!0,exit:C(s,"exit",u),enter:C(s,"enter",u)}):!a&&r&&!p?n[t]=m.exports.cloneElement(s,{in:!1}):a&&r&&m.exports.isValidElement(l)&&(n[t]=m.exports.cloneElement(s,{onExited:o.bind(null,s),in:l.props.in,exit:C(s,"exit",u),enter:C(s,"enter",u)}))}}),n}var pe=Object.values||function(u){return Object.keys(u).map(function(i){return u[i]})},fe={component:"div",childFactory:function(i){return i}},V=function(u){T(i,u);function i(e,n){var t;t=u.call(this,e,n)||this;var s=t.handleExited.bind(oe(t));return t.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},t}var o=i.prototype;return o.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},o.componentWillUnmount=function(){this.mounted=!1},i.getDerivedStateFromProps=function(n,t){var s=t.children,r=t.handleExited,a=t.firstRender;return{children:a?de(n,r):ce(n,s,r),firstRender:!1}},o.handleExited=function(n,t){var s=j(this.props.children);n.key in s||(n.props.onExited&&n.props.onExited(t),this.mounted&&this.setState(function(r){var a=H({},r.children);return delete a[n.key],{children:a}}))},o.render=function(){var n=this.props,t=n.component,s=n.childFactory,r=O(n,["component","childFactory"]),a=this.state.contextValue,l=pe(this.state.children).map(s);return delete r.appear,delete r.enter,delete r.exit,t===null?d.createElement(N.Provider,{value:a},l):d.createElement(N.Provider,{value:a},d.createElement(t,r,l))},i}(d.Component);V.propTypes={};V.defaultProps=fe;var he=function(u){T(i,u);function i(){for(var e,n=arguments.length,t=new Array(n),s=0;s<n;s++)t[s]=arguments[s];return e=u.call.apply(u,[this].concat(t))||this,e.handleEnter=function(){for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return e.handleLifecycle("onEnter",0,a)},e.handleEntering=function(){for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return e.handleLifecycle("onEntering",0,a)},e.handleEntered=function(){for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return e.handleLifecycle("onEntered",0,a)},e.handleExit=function(){for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return e.handleLifecycle("onExit",1,a)},e.handleExiting=function(){for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return e.handleLifecycle("onExiting",1,a)},e.handleExited=function(){for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return e.handleLifecycle("onExited",1,a)},e}var o=i.prototype;return o.handleLifecycle=function(n,t,s){var r,a=this.props.children,l=d.Children.toArray(a)[t];if(l.props[n]&&(r=l.props)[n].apply(r,s),this.props[n]){var p=l.props.nodeRef?void 0:k.findDOMNode(this);this.props[n](p)}},o.render=function(){var n=this.props,t=n.children,s=n.in,r=O(n,["children","in"]),a=d.Children.toArray(t),l=a[0],p=a[1];return delete r.onEnter,delete r.onEntering,delete r.onEntered,delete r.onExit,delete r.onExiting,delete r.onExited,d.createElement(V,r,s?d.cloneElement(l,{key:"first",onEnter:this.handleEnter,onEntering:this.handleEntering,onEntered:this.handleEntered}):d.cloneElement(p,{key:"second",onEnter:this.handleExit,onEntering:this.handleExiting,onEntered:this.handleExited}))},i}(d.Component);he.propTypes={};var R,L;function Ee(u,i){return!(u===i||d.isValidElement(u)&&d.isValidElement(i)&&u.key!=null&&u.key===i.key)}var B={out:"out-in",in:"in-out"},M=function(i,o,e){return function(){var n;i.props[o]&&(n=i.props)[o].apply(n,arguments),e()}},me=(R={},R[B.out]=function(u){var i=u.current,o=u.changeState;return d.cloneElement(i,{in:!1,onExited:M(i,"onExited",function(){o(h,null)})})},R[B.in]=function(u){var i=u.current,o=u.changeState,e=u.children;return[i,d.cloneElement(e,{in:!0,onEntered:M(e,"onEntered",function(){o(h)})})]},R),ve=(L={},L[B.out]=function(u){var i=u.children,o=u.changeState;return d.cloneElement(i,{in:!0,onEntered:M(i,"onEntered",function(){o(E,d.cloneElement(i,{in:!0}))})})},L[B.in]=function(u){var i=u.current,o=u.children,e=u.changeState;return[d.cloneElement(i,{in:!1,onExited:M(i,"onExited",function(){e(E,d.cloneElement(o,{in:!0}))})}),d.cloneElement(o,{in:!0})]},L),J=function(u){T(i,u);function i(){for(var e,n=arguments.length,t=new Array(n),s=0;s<n;s++)t[s]=arguments[s];return e=u.call.apply(u,[this].concat(t))||this,e.state={status:E,current:null},e.appeared=!1,e.changeState=function(r,a){a===void 0&&(a=e.state.current),e.setState({status:r,current:a})},e}var o=i.prototype;return o.componentDidMount=function(){this.appeared=!0},i.getDerivedStateFromProps=function(n,t){return n.children==null?{current:null}:t.status===h&&n.mode===B.in?{status:h}:t.current&&Ee(t.current,n.children)?{status:D}:{current:d.cloneElement(n.children,{in:!0})}},o.render=function(){var n=this.props,t=n.children,s=n.mode,r=this.state,a=r.status,l=r.current,p={children:t,current:l,changeState:this.changeState,status:a},f;switch(a){case h:f=ve[s](p);break;case D:f=me[s](p);break;case E:f=l}return d.createElement(N.Provider,{value:{isMounting:!this.appeared}},f)},i}(d.Component);J.propTypes={};J.defaultProps={mode:B.out};var Q=()=>{const u=d.useRef(null),[i,o]=d.useState(!1),[e,n]=d.useState(""),t=s=>{o(!0),n(s),setTimeout(()=>{o(!1)},500)};return w("div",{className:"demo-styles",children:[c(A,{isLink:!0,title:"Fade",onClick:()=>t("rv-fade")}),c(A,{isLink:!0,title:"Slide Up",onClick:()=>t("rv-slide-up")}),c(A,{isLink:!0,title:"Slide Down",onClick:()=>t("rv-slide-down")}),c(A,{isLink:!0,title:"Slide Left",onClick:()=>t("rv-slide-left")}),c(A,{isLink:!0,title:"Slide Right",onClick:()=>t("rv-slide-right")}),c(I,{nodeRef:u,in:i,timeout:300,classNames:e,unmountOnExit:!0,children:c("div",{className:"demo-animate-block"})})]})};const Fe=`import React from 'react';
import { Cell } from 'react-vant';
import { CSSTransition } from 'react-transition-group';
import './transition.less';

export default () => {
  const nodeRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [transition, setTransition] = React.useState('');

  const animate = (transitionName: string) => {
    setShow(true);
    setTransition(transitionName);

    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  return (
    <div className="demo-styles">
      <Cell isLink title="Fade" onClick={() => animate('rv-fade')} />
      <Cell isLink title="Slide Up" onClick={() => animate('rv-slide-up')} />
      <Cell isLink title="Slide Down" onClick={() => animate('rv-slide-down')} />
      <Cell isLink title="Slide Left" onClick={() => animate('rv-slide-left')} />
      <Cell isLink title="Slide Right" onClick={() => animate('rv-slide-right')} />

      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        classNames={transition}
        unmountOnExit
      >
        <div className="demo-animate-block" />
      </CSSTransition>
    </div>
  );
};
`,xe={code:Fe,lang:"tsx",dependencies:{react:{type:"NPM",value:">=16.6.0"},"react-vant":{type:"NPM",value:"1.0.0"},"react-transition-group":{type:"NPM",value:"4.4.2"},"react-dom":{type:"NPM",value:">=16.6.0"},"index.tsx":{type:"FILE",value:`import React from 'react';
import { Cell } from 'react-vant';
import { CSSTransition } from 'react-transition-group';
import './transition.less';

export default () => {
  const nodeRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [transition, setTransition] = React.useState('');

  const animate = (transitionName: string) => {
    setShow(true);
    setTransition(transitionName);

    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  return (
    <div className="demo-styles">
      <Cell isLink title="Fade" onClick={() => animate('rv-fade')} />
      <Cell isLink title="Slide Up" onClick={() => animate('rv-slide-up')} />
      <Cell isLink title="Slide Down" onClick={() => animate('rv-slide-down')} />
      <Cell isLink title="Slide Left" onClick={() => animate('rv-slide-left')} />
      <Cell isLink title="Slide Right" onClick={() => animate('rv-slide-right')} />

      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        classNames={transition}
        unmountOnExit
      >
        <div className="demo-animate-block" />
      </CSSTransition>
    </div>
  );
};
`},"transition.less":{type:"FILE",value:`.demo-styles {
  .demo-animate-block {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    background-color: #3f45ff;
    border-radius: 8px;
  }
}
`}},key:"styles-transition",meta:{title:"\u52A8\u753B"}},Ce=function({previewer:u=()=>null,api:i=()=>null}){const o=u;return c("div",{children:w("div",{children:[c("h1",{id:"\u5185\u7F6E\u6837\u5F0F","data-anchor":"\u5185\u7F6E\u6837\u5F0F",children:"\u5185\u7F6E\u6837\u5F0F"}),c("h2",{id:"\u4ECB\u7ECD","data-anchor":"\u4ECB\u7ECD",children:"\u4ECB\u7ECD"}),c("p",{children:"\u9ED8\u8BA4\u5305\u542B\u4E86\u4E00\u4E9B\u5E38\u7528\u6837\u5F0F\uFF0C\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 className \u7684\u65B9\u5F0F\u4F7F\u7528\u3002"}),c("h3",{id:"\u6587\u5B57\u7701\u7565","data-anchor":"\u6587\u5B57\u7701\u7565",children:"\u6587\u5B57\u7701\u7565"}),c("p",{children:"\u5F53\u6587\u672C\u5185\u5BB9\u957F\u5EA6\u8D85\u8FC7\u5BB9\u5668\u6700\u5927\u5BBD\u5EA6\u65F6\uFF0C\u81EA\u52A8\u7701\u7565\u591A\u4F59\u7684\u6587\u672C\u3002"}),c(o,b(y({},ne),{children:c(z,{})})),c("h3",{id:"1px-\u8FB9\u6846","data-anchor":"1px-\u8FB9\u6846",children:"1px \u8FB9\u6846"}),c("p",{children:"\u4E3A\u5143\u7D20\u6DFB\u52A0 Retina \u5C4F\u5E55\u4E0B\u7684 1px \u8FB9\u6846\uFF08\u5373 hairline\uFF09\uFF0C\u57FA\u4E8E\u4F2A\u7C7B transform \u5B9E\u73B0\u3002"}),c(o,b(y({},ue),{children:c(q,{})})),c("h3",{id:"\u52A8\u753B","data-anchor":"\u52A8\u753B",children:"\u52A8\u753B"}),w("p",{children:["\u8FD9\u91CC\u901A\u8FC7 ",c("code",{children:"react-transition-group"})," \u7B2C\u4E09\u65B9\u5E93\u4F7F\u7528\u5185\u7F6E\u7684\u52A8\u753B"]}),c(o,{code:`# \u5B89\u88C5
yarn add react-transition-group`,lang:"bash"}),c(o,{code:"import { CSSTransition } from 'react-transition-group';",lang:"js"}),c(o,b(y({},xe),{children:c(Q,{})}))]})})},ge=[{Component:z,key:"styles-demo",title:"\u6587\u5B57\u7701\u7565"},{Component:q,key:"styles-demo-1",title:"1px \u8FB9\u6846"},{Component:Q,key:"styles-transition",title:"\u52A8\u753B"}],Be=void 0,Ae=[{depth:1,text:"\u5185\u7F6E\u6837\u5F0F",id:"\u5185\u7F6E\u6837\u5F0F"},{depth:2,text:"\u4ECB\u7ECD",id:"\u4ECB\u7ECD"},{depth:3,text:"\u6587\u5B57\u7701\u7565",id:"\u6587\u5B57\u7701\u7565"},{depth:3,text:"1px \u8FB9\u6846",id:"1px-\u8FB9\u6846"},{depth:3,text:"\u52A8\u753B",id:"\u52A8\u753B"}],Se="/src/components/styles/README.md",Ne="\u5185\u7F6E\u6837\u5F0F",De="1657878856000";var Re=u=>u.children({MdContent:Ce,demos:ge,frontmatter:Be,slugs:Ae,filePath:Se,title:Ne,updatedTime:De});export{Ce as MdContent,Re as default,ge as demos,Se as filePath,Be as frontmatter,Ae as slugs,Ne as title,De as updatedTime};
