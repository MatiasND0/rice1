"use strict";(self.webpackChunkjump_cutter=self.webpackChunkjump_cutter||[]).push([[259],{1002:(t,e,r)=>{r.d(e,{A:()=>p});var o=r(1601),n=r.n(o),a=r(6314),i=r.n(a)()(n());i.push([t.id,'.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}',""]);const p=i},6314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r="",o=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),o&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=t(e),o&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(t,r,o,n,a){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(o)for(var p=0;p<this.length;p++){var c=this[p][0];null!=c&&(i[c]=!0)}for(var s=0;s<t.length;s++){var l=[].concat(t[s]);o&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),r&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=r):l[2]=r),n&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=n):l[4]="".concat(n)),e.push(l))}},e}},1601:t=>{t.exports=function(t){return t[1]}},6259:(t,e,r)=>{r.r(e),r.d(e,{default:()=>h});var o=r(5072),n=r.n(o),a=r(7825),i=r.n(a),p=r(7659),c=r.n(p),s=r(5056),l=r.n(s),d=r(540),u=r.n(d),f=r(1113),m=r.n(f),b=r(1002),y={};y.styleTagTransform=m(),y.setAttributes=l(),y.insert=c().bind(null,"head"),y.domAPI=i(),y.insertStyleElement=u(),n()(b.A,y);const h=b.A&&b.A.locals?b.A.locals:void 0},5072:t=>{var e=[];function r(t){for(var r=-1,o=0;o<e.length;o++)if(e[o].identifier===t){r=o;break}return r}function o(t,o){for(var a={},i=[],p=0;p<t.length;p++){var c=t[p],s=o.base?c[0]+o.base:c[0],l=a[s]||0,d="".concat(s," ").concat(l);a[s]=l+1;var u=r(d),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var m=n(f,o);o.byIndex=p,e.splice(p,0,{identifier:d,updater:m,references:1})}i.push(d)}return i}function n(t,e){var r=e.domAPI(e);return r.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;r.update(t=e)}else r.remove()}}t.exports=function(t,n){var a=o(t=t||[],n=n||{});return function(t){t=t||[];for(var i=0;i<a.length;i++){var p=r(a[i]);e[p].references--}for(var c=o(t,n),s=0;s<a.length;s++){var l=r(a[s]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=c}}},7659:t=>{var e={};t.exports=function(t,r){var o=function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}(t);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(r)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},5056:(t,e,r)=>{t.exports=function(t){var e=r.nc;e&&t.setAttribute("nonce",e)}},7825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(r){!function(t,e,r){var o="";r.supports&&(o+="@supports (".concat(r.supports,") {")),r.media&&(o+="@media ".concat(r.media," {"));var n=void 0!==r.layer;n&&(o+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),o+=r.css,n&&(o+="}"),r.media&&(o+="}"),r.supports&&(o+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(o,t,e.options)}(e,t,r)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},1113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}}]);