/*! For license information please see 305.js.LICENSE.txt */
"use strict";(self.webpackChunkjump_cutter=self.webpackChunkjump_cutter||[]).push([[305],{9182:(e,t,n)=>{n.d(t,{A:()=>s});var o=n(1647);function s(e){o.y.runtime.sendMessage({type:"contentStatus",...e})}},4866:(e,t,n)=>{n.d(t,{_:()=>o});const o="undefined"!=typeof requestIdleCallback?requestIdleCallback:e=>setTimeout((()=>setTimeout(e)))},2305:(e,t,n)=>{n.d(t,{default:()=>l});var o=n(1647),s=n(845),a=n(6943),c=n(9182),u=n(8059),d=n.n(u),i=n(4866);const r=e=>e?e.broadcastStatus():(0,c.A)({elementLastActivatedAt:void 0});async function l(){const e=(0,s.m)("applyTo");let t;const c=d()((async function(){const e=(await Promise.all([n.e(221),n.e(22),n.e(717),n.e(255)]).then(n.bind(n,8255))).default;return t=new e,t})),u=e=>{"checkContentStatus"===e&&r(t)};o.y.runtime.onMessage.addListener(u),r(t);const l=e=>{!1===e.enabled?.newValue&&(o.y.runtime.onMessage.removeListener(u),y(),(0,a.dt)(l))};(0,a.oo)(l);const{applyTo:f}=await e,m=[];"audioOnly"!==f&&m.push("VIDEO"),"videoOnly"!==f&&m.push("AUDIO");const y=function(e,t){for(const n of e){const e=document.getElementsByTagName(n);e.length&&t([...e])}const n=new MutationObserver((n=>(0,i._)((()=>function(n){const o=[];for(const t of n)if("childList"===t.type)for(const n of t.addedNodes){if(n.nodeType!==Node.ELEMENT_NODE)continue;const t=n;if(e.includes(t.tagName))o.push(t);else for(const n of e){const e=t.getElementsByTagName(n);e.length&&o.push(...e)}}o.length&&t(o)}(n)),{timeout:5e3})));return n.observe(document,{subtree:!0,childList:!0}),()=>n.disconnect()}(m,(e=>c().then((t=>{t.onNewMediaElements(...e)}))))}},9136:(e,t,n)=>{n.d(t,{I:()=>a});var o=n(1647),s=n(4484);const a=o.y.storage[s.F]},845:(e,t,n)=>{n.d(t,{m:()=>s});var o=n(9136);async function s(...e){return o.I.get(...e)}},6943:(e,t,n)=>{n.d(t,{dt:()=>u,oo:()=>c});var o=n(4484),s=n(1647);const a=new WeakMap;function c(e){const t=function(e){return(t,n)=>{n===o.F&&e(t)}}(e);a.set(e,t),s.y.storage.onChanged.addListener(t)}function u(e){const t=a.get(e);t&&s.y.storage.onChanged.removeListener(t)}}}]);