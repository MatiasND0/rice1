!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=919)}({919:function(e,t,n){e.exports=n(920)},920:function(e,t,n){"use strict";function r(e,t,n,r,o,i,u){try{var l=e[i](u),a=l.value}catch(e){return void n(e)}l.done?t(a):Promise.resolve(a).then(r,o)}function o(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}var i,u;n.r(t),chrome.runtime.onMessage.addListener((i=function(e,t,n){var r,i,u,l,a;return o(this,(function(t){switch(e.activity){case"offscreenIframe":i=e.data,i=new URL(i),u=e.frameId,document.getElementById(u)||((l=document.createElement("iframe")).setAttribute("id",u),l.style.visibility="hidden",l.style.position="absolute",l.style.width=l.style.height="0",l.style.border="0",l.setAttribute("sandbox","allow-scripts allow-same-origin allow-forms"),document.body.appendChild(l),l.src=i.toString());break;case"cleanupOffscreenIframe":e.frameId&&(a=document.getElementById(e.frameId),null===(r=null==a?void 0:a.parentNode)||void 0===r||r.removeChild(a))}return[2,Promise.resolve("Dummy response to keep the console quiet")]}))},u=function(){var e=this,t=arguments;return new Promise((function(n,o){var u=i.apply(e,t);function l(e){r(u,n,o,l,a,"next",e)}function a(e){r(u,n,o,l,a,"throw",e)}l(void 0)}))},function(e,t,n){return u.apply(this,arguments)}))}});
//# sourceMappingURL=offscreen.js.map