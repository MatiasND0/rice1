import{c as Z,d as tt,e as et,f as at,h as nt,i as Q,l as B,m as it,q as F,r as ot,s as ct,t as L,u as N}from"../chunks/LBYZKPAQ.js";import{g as W}from"../chunks/PXBNPWXS.js";import{b as pt}from"../chunks/INX7XKZL.js";import{N as rt,U as ht}from"../chunks/OUY2RNSM.js";import{a as R}from"../chunks/AN2KFIQS.js";import"../chunks/JHPJZVMO.js";import{a as Y}from"../chunks/VKMWG32H.js";import{a as A,c as z,d as J}from"../chunks/OQIGTGDY.js";import"../chunks/AIELLESQ.js";import{a as I}from"../chunks/FD2Z72JR.js";import{h as M,j as ut,k as dt}from"../chunks/QR6RJRLJ.js";import{a as st}from"../chunks/MRYPIC4L.js";import"../chunks/5RAT6PZN.js";import{a as Ot,j as O}from"../chunks/MLSHBHXX.js";import"../chunks/BXPPDSGN.js";import"../chunks/6XGCBYK4.js";import"../chunks/H3JIZ2LT.js";import"../chunks/JV43EUJH.js";import{c as p,h as $,l as S,t as w}from"../chunks/RH65ACLS.js";import{a as y}from"../chunks/UX5Z4UUX.js";import"../chunks/HKH3FKAW.js";import{f as g,i as o}from"../chunks/3PS7M655.js";var mt=()=>{A(async(r,t,e,a)=>{if(r==="shortcut")switch(t){case"ShortCuts_getContentOfURL":{let{URL:s,timeOut:n,withSnapshot:i}=e,c=await R(Z(s,"",i),n!=null?n:999999,{title:"",body:"",url:s,success:!1});return{data:c,success:c.success,message:"ok"}}case"ShortCuts_getHtmlOfURL":{let{URL:s}=e,n=await et(s);return{data:n,success:n.success,message:"ok"}}case"ShortCuts_getContentOfSearchEngine":{let{URL:s,proxyFetch:n}=e,i=await tt(s,n);return{data:i,success:i.success,message:"ok"}}default:break}})};var f=g(y());var Ct=g(Ot());var It=async r=>{try{if(globalThis.navigator.userAgent.indexOf("Firefox")>-1)return;if(!r.email)return null;let e=Ct.default.encrypt(JSON.stringify(r),"MaxAI").toString();return await(await fetch(`${$}/user/vote`,{method:"POST",body:JSON.stringify({info_object:e}),headers:{"Content-Type":"application/json"}})).json()}catch(t){return null}};var lt=()=>{A(async(r,t,e,a)=>{if(r==="client")switch(t){case"Client_logCallApiRequest":{return It(e),{success:!0,message:"ok",data:{}};break}default:break}})};var gt=g(y());var P=class{constructor(t){o(this,"bardChat");o(this,"sendQuestion",async(t,e,a,s)=>{let n=I();await this.bardChat.askChatGPT(a.question,{taskId:a.messageId,regenerate:s.regenerate,include_history:s.includeHistory,max_history_message_cnt:s.maxHistoryMessageCnt},async({type:i,done:c,error:d,data:h})=>{var u;(u=e.tab)!=null&&u.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:h.text,parentMessageId:a.messageId,conversationId:h.conversationId,messageId:n},error:d,done:c})})});this.bardChat=t}async auth(t){await this.bardChat.auth()}async preAuth(){await this.bardChat.checkAuth()}get status(){return this.bardChat.status}async createConversation(){return Promise.resolve("")}async removeConversation(t){return await this.bardChat.reset(),Promise.resolve(!0)}async abortAskQuestion(t){return await this.bardChat.abortTask(t)}async destroy(){await this.bardChat.destroy()}async sendResponseToClient(t,e){await gt.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var At=g(y());var T=class{constructor(t){o(this,"bingChat");o(this,"sendQuestion",async(t,e,a,s)=>{var i;let n=I();await this.bingChat.askChatGPT(a.question,{taskId:a.messageId,regenerate:s.regenerate,include_history:s.includeHistory,max_history_message_cnt:s.maxHistoryMessageCnt,clientTabId:(i=e==null?void 0:e.tab)==null?void 0:i.id},async({type:c,done:d,error:h,data:u})=>{var C;(C=e.tab)!=null&&C.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:u.text,parentMessageId:a.messageId,conversationId:u.conversationId,messageId:n},error:h,done:d})})});this.bingChat=t}async auth(t){await this.bingChat.auth()}async preAuth(){await this.bingChat.auth()}get status(){return this.bingChat.status}async createConversation(){return Promise.resolve("")}async removeConversation(t){return await this.bingChat.removeConversation(t),Promise.resolve(!0)}async abortAskQuestion(t){return await this.bingChat.abortTask(t)}async destroy(){await this.bingChat.destroy()}async sendResponseToClient(t,e){await At.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var m=class{constructor(t){o(this,"chatAdapter");o(this,"sendQuestion",(t,e,a,s)=>this.chatAdapter.sendQuestion(t,e,a,s));this.chatAdapter=t}async preAuth(){await this.chatAdapter.preAuth()}async auth(t){await this.chatAdapter.auth(t)}get status(){return this.chatAdapter.status}async abortAskQuestion(t){return await this.chatAdapter.abortAskQuestion(t)}async destroy(){await this.chatAdapter.destroy()}async createConversation(){return await this.chatAdapter.createConversation()}async removeConversation(t){return await this.chatAdapter.removeConversation(t)}};var ft=g(y());var k=class{constructor(t){o(this,"claudeChat");o(this,"sendQuestion",async(t,e,a,s)=>{let n=I();await this.claudeChat.askChatGPT(a.question,{taskId:a.messageId,regenerate:s.regenerate,include_history:s.includeHistory,max_history_message_cnt:s.maxHistoryMessageCnt},async({type:i,done:c,error:d,data:h})=>{var u;(u=e.tab)!=null&&u.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:h.text,parentMessageId:a.messageId,conversationId:h.conversationId,messageId:n},error:d,done:c})})});this.claudeChat=t}async auth(t){await this.claudeChat.auth()}async preAuth(){await this.claudeChat.preAuth()}get status(){return this.claudeChat.status}async createConversation(){return await this.claudeChat.createConversation()}async removeConversation(t){return await this.claudeChat.removeConversation(t),Promise.resolve(!0)}async abortAskQuestion(t){return await this.claudeChat.abortTask(t)}async destroy(){await this.claudeChat.destroy()}async sendResponseToClient(t,e){await ft.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var yt=g(y());var _=class{constructor(t){o(this,"openAIChat");o(this,"sendQuestion",async(t,e,a,s)=>{var i;let n=I();await this.openAIChat.askChatGPT(a.question,{taskId:a.messageId,regenerate:s.regenerate,include_history:s.includeHistory,max_history_message_cnt:s.maxHistoryMessageCnt,newConversation:!!((i=s.meta)!=null&&i.newConversation)},async({type:c,done:d,error:h,data:u})=>{var C;(C=e.tab)!=null&&C.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:u.text,parentMessageId:a.messageId,conversationId:u.conversationId,messageId:n},error:h,done:d})})});this.openAIChat=t}async preAuth(){return this.openAIChat.preAuth()}async auth(t){await this.openAIChat.auth(t)}get status(){return this.openAIChat.status}async abortAskQuestion(t){try{return await this.openAIChat.abortAskQuestion(t),!0}catch(e){return!1}}async createConversation(){let t=await this.openAIChat.createConversation();return t&&t.conversationId?t.conversationId:Promise.resolve("")}async removeConversation(t){return await this.openAIChat.removeConversation(t)}destroy(){return this.openAIChat.destroy()}async sendResponseToClient(t,e){await yt.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var vt=g(y());var E=class{constructor(t){o(this,"freeAIChat");o(this,"sendQuestion",async(t,e,a,s)=>{var c;let n=I(),i=[];await this.freeAIChat.askChatGPT(a.question,{backendAPI:"get_freeai_web_response",taskId:a.messageId,chat_history:i,streaming:(c=s.meta)==null?void 0:c.streaming},async({type:d,done:h,error:u,data:C})=>{var l;(l=e.tab)!=null&&l.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:C.text,parentMessageId:a.messageId,conversationId:C.conversationId,messageId:n},error:u,done:h})})});this.freeAIChat=t}async auth(t){await this.freeAIChat.auth(t)}async preAuth(){await this.freeAIChat.preAuth()}get status(){return this.freeAIChat.status}async createConversation(){return await this.freeAIChat.createConversation()}async removeConversation(t){return await this.freeAIChat.removeConversation(),Promise.resolve(!0)}async abortAskQuestion(t){return await this.freeAIChat.abortTask(t)}async destroy(){await this.freeAIChat.destroy()}async sendResponseToClient(t,e){await vt.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var wt=g(y());var x=class{constructor(t){o(this,"geminiChat");o(this,"sendQuestion",async(t,e,a,s)=>{let n=I();await this.geminiChat.askChatGPT(a.question,{taskId:a.messageId,regenerate:s.regenerate,include_history:s.includeHistory,max_history_message_cnt:s.maxHistoryMessageCnt},async({type:i,done:c,error:d,data:h})=>{var u;(u=e.tab)!=null&&u.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:h.text,parentMessageId:a.messageId,conversationId:h.conversationId,messageId:n},error:d,done:c})})});this.geminiChat=t}async auth(t){await this.geminiChat.auth()}async preAuth(){await this.geminiChat.checkAuth()}get status(){return this.geminiChat.status}async createConversation(){return Promise.resolve("")}async removeConversation(t){return await this.geminiChat.reset(),Promise.resolve(!0)}async abortAskQuestion(t){return await this.geminiChat.abortTask(t)}async destroy(){await this.geminiChat.destroy()}async sendResponseToClient(t,e){await wt.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var V=new st("BackgroundAbortFetch"),j=class{constructor(){o(this,"fetchMap");this.fetchMap=new Map}fetch(t,e,a){let s=new AbortController,n=s.signal;if(a){if(this.fetchMap.has(a)){let i=this.fetchMap.get(a);i==null||i.abort()}this.fetchMap.set(a,s),V.info("start [task]",t,a)}else V.info("start [no task]",t);return e={...e,signal:n},fetch(t,e).finally(()=>{a&&this.fetchMap.delete(a)})}abort(t){let e=this.fetchMap.get(t);return e==null||e.abort(),this.fetchMap.delete(t),V.info("abort task",t),!0}},bt=new j;var v=g(y()),Pt=()=>{let r=O();A(async(t,e,a,s)=>{var n,i;if(t==="client")switch(e){case"Client_openUrl":{let{url:c,key:d,query:h=""}=a;if(c)return await v.default.tabs.create({url:c}),{data:!0,success:!0,message:"ok"};if(d){if(d==="current_page")(n=s.tab)!=null&&n.id&&await v.default.tabs.update(s.tab.id,{active:!0});else if(d==="shortcuts")r?await v.default.runtime.openOptionsPage():await v.default.tabs.create({url:"chrome://extensions/shortcuts",active:!0});else if(d==="options")r?await v.default.runtime.openOptionsPage():await J(h);else if(d==="manage_extension")if(r)await v.default.runtime.openOptionsPage();else{let u="chrome://extensions";await v.default.tabs.create({url:`${u}${h?`?${h}`:""}`,active:!0})}return{data:!0,success:!0,message:"ok"}}}break;case"Client_restartApp":return await z(),{data:!0,success:!0,message:"ok"};case"Client_getChromeExtensionCommands":return{data:await v.default.commands.getAll()||[],success:!0,message:"ok"};case"Client_getTabInfo":{let c=s.tab;return(i=s.tab)!=null&&i.id||(c=(await v.default.tabs.query({active:!0,currentWindow:!0}))[0]),{data:c,success:!0,message:"ok"}}break;case"Client_proxyFetchAPI":try{let{url:c,options:d,abortTaskId:h}=a,{parse:u="json",...C}=d,l=await bt.fetch(c,C,h),G=null;if(u==="json")G=await l.json();else if(u==="blob"){let K=await l.blob();G={base64:await ht(K),contentType:K.type}}else G=await l.text();return{success:!0,data:{response:{ok:l.ok,status:l.status,statusText:l.statusText,url:l.url,redirected:l.redirected},data:G},message:"ok"}}catch(c){return{success:!1,data:c,message:"ok"}}default:break}})};var Tt=()=>{A(async(r,t,e,a)=>{if(r==="client")switch(t){case"Requester_proxyFetch":return await Y.fetch(e.url,e.options,e.proxySettings);default:break}})};var kt=()=>{A(async(r,t,e,a)=>{if(r==="client")switch(t){case"LarkBot_sendMessage":{return await rt(e.title,e.message,e.attr),{success:!0,message:"ok",data:{}};break}default:break}})};var _t=g(y());var D=class{constructor(t){o(this,"maxAIClaudeChat");o(this,"sendQuestion",async(t,e,a,s)=>{var i;let n=I();await this.maxAIClaudeChat.askChatGPT(a.question,{taskId:a.messageId,regenerate:s.regenerate,streaming:(i=s.meta)==null?void 0:i.streaming},async({type:c,done:d,error:h,data:u})=>{var C;(C=e.tab)!=null&&C.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:u.text,parentMessageId:a.messageId,conversationId:u.conversationId,messageId:n},error:h,done:d})})});this.maxAIClaudeChat=t}async auth(t){await this.maxAIClaudeChat.auth(t)}async preAuth(){await this.maxAIClaudeChat.preAuth()}get status(){return this.maxAIClaudeChat.status}async createConversation(){return await this.maxAIClaudeChat.createConversation()}async removeConversation(t){return await this.maxAIClaudeChat.removeConversation(),Promise.resolve(!0)}async abortAskQuestion(t){return await this.maxAIClaudeChat.abortTask(t)}async destroy(){await this.maxAIClaudeChat.destroy()}async sendResponseToClient(t,e){await _t.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var xt=g(y());var U=class{constructor(t){o(this,"useChatGPTPlusChat");o(this,"sendQuestion",async(t,e,a,s)=>{var c;let n=I(),i=[];await this.useChatGPTPlusChat.askChatGPT(a.question,{backendAPI:"webchatgpt_gpt_response",taskId:a.messageId,chat_history:i,streaming:(c=s.meta)==null?void 0:c.streaming},async({type:d,done:h,error:u,data:C})=>{var l;(l=e.tab)!=null&&l.id&&await this.sendResponseToClient(e.tab.id,{taskId:t,data:{text:C.text,parentMessageId:a.messageId,conversationId:C.conversationId,messageId:n},error:u,done:h})})});this.useChatGPTPlusChat=t}async auth(t){await this.useChatGPTPlusChat.auth(t)}async preAuth(){await this.useChatGPTPlusChat.preAuth()}get status(){return this.useChatGPTPlusChat.status}async createConversation(){return await this.useChatGPTPlusChat.createConversation()}async removeConversation(t){return await this.useChatGPTPlusChat.removeConversation(),Promise.resolve(!0)}async abortAskQuestion(t){return await this.useChatGPTPlusChat.abortTask(t)}async destroy(){await this.useChatGPTPlusChat.destroy()}async sendResponseToClient(t,e){await xt.default.tabs.sendMessage(t,{id:p,event:"Client_askChatGPTQuestionResponse",data:e})}};var Mt=()=>{let r=new m(new _(new F)),t=new m(new P(new Q)),e=new m(new x(new L)),a=new m(new T(new B)),s=new m(new k(new N));return{[M.OPENAI]:r,[M.BARD]:t,[M.BING]:a,[M.CLAUDE]:s,[M.GEMINI]:e}};var X=class{constructor(){o(this,"currentProvider");o(this,"conversationId");o(this,"adapters",{});o(this,"sendQuestion",(t,e,a,s)=>{var n;return((n=this.currentAdapter)==null?void 0:n.sendQuestion(t,e,a,s))||Promise.resolve()});this.adapters=Mt(),this.initChatSystem(),ut().then(t=>{this.currentProvider=t.aiProvider})}get currentAdapter(){return this.currentProvider?this.adapters[this.currentProvider]:void 0}initChatSystem(){A(async(t,e,a,s)=>{var n;if(t==="client")switch(e){case"SWAI_switchAIProvider":{let{provider:i}=a;return await this.switchAdapter(i),await this.preAuth(),{success:!0,data:i,message:""};break}case"SWAI_askAIQuestion":{await this.auth(((n=s.tab)==null?void 0:n.id)||0),this.conversationId&&await this.removeConversation(this.conversationId);let i=a.taskId,c=a.question,d=a.options,h=await this.createConversation();d.meta={newConversation:!0},this.conversationId=h,await this.sendQuestion(i,s,c,d);break}case"SWAI_abortAskChatGPTQuestion":{let{taskId:i}=a;return await this.abortAskQuestion(i),{success:!0,data:{},message:""}}case"SWAI_getConversationId":return{success:!0,data:{conversationId:this.conversationId},message:""};default:break}})}async switchAdapter(t){return await this.destroy(),this.currentProvider=t,await dt({aiProvider:t}),this.currentAdapter}async auth(t){this.currentAdapter&&await this.currentAdapter.auth(t)}async preAuth(){this.currentAdapter&&await this.currentAdapter.preAuth()}async abortAskQuestion(t){return this.currentAdapter?await this.currentAdapter.abortAskQuestion(t):!1}async createConversation(t){var e;return this.currentAdapter&&await((e=this.currentAdapter)==null?void 0:e.createConversation(t))||""}async removeConversation(t){var e;return!this.currentAdapter||!t?!1:await((e=this.currentAdapter)==null?void 0:e.removeConversation(t))}async destroy(){var t,e;await((t=this.currentAdapter)==null?void 0:t.removeConversation("")),await((e=this.currentAdapter)==null?void 0:e.destroy())}},St=X;var Et=()=>{new St};var H=g(y());var Gt=S?["mhnlakgilnojmhinhkckjpncpbhabphi","ngphehpfehdmjellohmlojkplilekadg"]:["gloekbmifleoijoldhopjhfkpibbhocd","ggbhngjbmfdpfdopebodgdfpioeoocdb","mhnlakgilnojmhinhkckjpncpbhabphi","ngphehpfehdmjellohmlojkplilekadg"];var Rt="https://www.extensions-hub.com/partners/updated?name=WebChatGPT";var Qt=async()=>!(await Promise.all(Gt.map(t=>R(H.default.runtime.sendMessage(t,{event:"GET_MAXAI_USERINFO"}),5e3,{isLogin:!1,success:!1})))).every(t=>!t||!t.success);H.default.runtime.onInstalled.addListener(async r=>{r.reason==="update"&&(await Qt()||H.default.tabs.create({url:Rt,active:!0}))});var Bt=O();f.default.runtime.onInstalled.addListener(async r=>{r.reason==="install"&&(q(),Ft())});f.default.runtime.setUninstallURL("https://tools.zmo.ai/webchatgpt/uninstall?from=crx");function q(){S?f.default.tabs.create({url:"https://chatgpt.com"}):f.default.runtime.openOptionsPage()}function Ft(){f.default.tabs.create({active:!1,url:"https://tools.zmo.ai/webchatgpt/install"})}Bt?f.default.browserAction.onClicked.addListener(q):f.default.action.onClicked.addListener(q);f.default.commands.onCommand.addListener(async r=>{r==="toggle-web-access"&&f.default.tabs.query({active:!0,currentWindow:!0}).then(t=>{let e=t[0];e.url&&e.id&&e.url.startsWith("https://chatgpt.com/")&&f.default.tabs.sendMessage(e.id,{id:p,event:"Client_ToggleWebAccess"})})});f.default.tabs.onUpdated.addListener(async(r,t,e)=>{t.status==="complete"&&e.url&&e.url.includes("google")&&W()});S&&W();Pt();mt();at();lt();Tt();kt();pt();var b=new it,Lt=new m(new _(new F)),Nt=new m(new P(new Q)),Dt=new m(new T(new B)),Ut=new m(new k(new N)),Ht=new m(new D(new ot)),Wt=new m(new U(new nt)),Vt=new m(new E(new ct)),jt=new m(new x(new L));b.addAdapter(w.OPENAI,Lt);b.addAdapter(w.BING,Dt);b.addAdapter(w.BARD,Nt);b.addAdapter(w.CLAUDE,Ut);b.addAdapter(w.MAXAI_CLAUDE,Ht);b.addAdapter(w.USE_CHAT_GPT_PLUS,Wt);b.addAdapter(w.FREE_AI,Vt);b.addAdapter(w.GEMINI,jt);Et();