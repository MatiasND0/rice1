import{i as U,j as G}from"./RCVOV644.js";import{b as D}from"./7D473XBD.js";import{$ as B,Q as I,ba as z,i as R}from"./HO3OOGBX.js";import{na as N,x as C,ya as W}from"./HSWGCWRI.js";import{a as F}from"./BXPPDSGN.js";import{f as g}from"./3PS7M655.js";var L=g(F());var A={am:{label:"\u12A0\u121B\u122D\u129B",en_label:"Amharic"},ar:{label:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629",en_label:"Arabic"},bg:{label:"\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438",en_label:"Bulgarian"},bn:{label:"\u09AC\u09BE\u0982\u09B2\u09BE",en_label:"Bengali"},ca:{label:"Catal\xE0",en_label:"Catalan"},cs:{label:"\u010Ce\u0161tina",en_label:"Czech"},da:{label:"Dansk",en_label:"Danish"},de:{label:"Deutsch",en_label:"German"},el:{label:"\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",en_label:"Greek"},en:{label:"English",en_label:"English"},en_GB:{label:"English (UK)",en_label:"English (UK)"},en_US:{label:"English (US)",en_label:"English (US)"},es:{label:"Espa\xF1ol",en_label:"Spanish"},es_419:{label:"Espa\xF1ol (Latinoam\xE9rica)",en_label:"Spanish (Latin America)"},et:{label:"Eesti",en_label:"Estonian"},fa:{label:"\u0641\u0627\u0631\u0633\u06CC",en_label:"Persian"},fi:{label:"Suomi",en_label:"Finnish"},fil:{label:"Filipino",en_label:"Filipino"},fr:{label:"Fran\xE7ais",en_label:"French"},gu:{label:"\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",en_label:"Gujarati"},he:{label:"\u05E2\u05D1\u05E8\u05D9\u05EA",en_label:"Hebrew"},he_IL:{label:"\u05E2\u05D1\u05E8\u05D9\u05EA (\u05D9\u05E9\u05E8\u05D0\u05DC)",en_label:"Hebrew (Israel)"},hi:{label:"\u0939\u093F\u0928\u094D\u0926\u0940",en_label:"Hindi"},hr:{label:"Hrvatski",en_label:"Croatian"},hu:{label:"Magyar",en_label:"Hungarian"},in:{label:"Bahasa Indonesia",en_label:"Indonesian"},id:{label:"Indonesia",en_label:"Indonesian"},it:{label:"Italiano",en_label:"Italian"},ja:{label:"\u65E5\u672C\u8A9E",en_label:"Japanese"},kn:{label:"\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",en_label:"Kannada"},ko:{label:"\uD55C\uAD6D\uC5B4",en_label:"Korean"},lt:{label:"Lietuvi\u0173",en_label:"Lithuanian"},lv:{label:"Latvie\u0161u",en_label:"Latvian"},ml:{label:"\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",en_label:"Malayalam"},mr:{label:"\u092E\u0930\u093E\u0920\u0940",en_label:"Marathi"},ms:{label:"Melayu",en_label:"Malay"},nl:{label:"Nederlands",en_label:"Dutch"},no:{label:"Norsk",en_label:"Norwegian"},pl:{label:"Polski",en_label:"Polish"},pt_BR:{label:"Portugu\xEAs (Brasil)",en_label:"Portuguese (Brazil)"},pt_PT:{label:"Portugu\xEAs (Portugal)",en_label:"Portuguese (Portugal)"},ro:{label:"Rom\xE2n\u0103",en_label:"Romanian"},ru:{label:"\u0420\u0443\u0441\u0441\u043A\u0438\u0439",en_label:"Russian"},sk:{label:"Sloven\u010Dina",en_label:"Slovak"},sl:{label:"Sloven\u0161\u010Dina",en_label:"Slovenian"},sr:{label:"\u0421\u0440\u043F\u0441\u043A\u0438",en_label:"Serbian"},sv:{label:"Svenska",en_label:"Swedish"},sw:{label:"Kiswahili",en_label:"Swahili"},ta:{label:"\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",en_label:"Tamil"},te:{label:"\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",en_label:"Telugu"},th:{label:"\u0E44\u0E17\u0E22",en_label:"Thai"},tr:{label:"T\xFCrk\xE7e",en_label:"Turkish"},ua:{label:"\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",en_label:"Ukrainian"},uk:{label:"\u0627\u0631\u062F\u0648",en_label:"Urdu"},vi:{label:"Ti\u1EBFng Vi\u1EC7t",en_label:"Vietnamese"},zh_CN:{label:"\u7B80\u4F53\u4E2D\u6587",en_label:"SimplifiedChinese"},zh_TW:{label:"\u7E41\u4F53\u4E2D\u6587",en_label:"TraditionalChinese"}};var _=g(F());var b=g(C());function H(i,{inputValue:t}){return i.filter(n=>{var s,u;let o=n.label.toLowerCase(),l=n.value.toLowerCase(),r=((u=(s=n.origin)==null?void 0:s.en_label)==null?void 0:u.toLowerCase())||"",p=t.toLowerCase();return o.includes(p)||l.includes(p)||r.includes(p)})}var K=i=>{var x;let{options:t,label:n="",value:o="",onChange:l=a=>{},sx:r,placement:p="auto",disablePortal:s=!0,onPermission:u}=i,[T,y]=_.default.useState(!1),m=()=>{i.onClose&&i.onClose(),y(!1)},P=()=>{i.onOpen&&i.onOpen(),y(!0)},{t:h}=D("common"),c=a=>(0,b.jsx)(W,{primary:(0,b.jsx)(N,{fontSize:14,children:a.label})}),v=(0,_.useCallback)((a,e)=>{var E,M;return(E=e.origin)!=null&&E.permission?(0,b.jsx)(G,{mountContainerName:e.origin.permission.mountContainerName,sceneType:e.origin.permission.sceneType,allowedRoles:e.origin.permission.allowedRoles,preAuth:e.origin.permission.preAuth,onPermission:u,TooltipProps:{placement:"left"},children:(0,b.jsx)(I,{selected:e.value===o,disabled:(M=e.origin)==null?void 0:M.disabled,value:e.value,onClick:d=>{var f;(f=e.origin)!=null&&f.disabled&&(d.stopPropagation(),d.preventDefault());let S=e.value;l&&l(S),m()},children:c(e)})},e.value):(0,b.jsx)(I,{value:e.value,selected:e.value===o,onClick:d=>{var f;(f=e.origin)!=null&&f.disabled&&(d.stopPropagation(),d.preventDefault());let S=e.value;l&&l(S),m()},children:c(e)},e.value)},[o,l]),w=(0,_.useMemo)(()=>t.find(a=>a.value===o)||t[0],[t,o]);return(0,b.jsx)(R,{open:T,onClose:m,onOpen:P,disablePortal:s,disableClearable:!0,autoHighlight:!0,value:w,size:"small",sx:{width:220,"& .MuiInputBase-root":{height:(x=r==null?void 0:r.height)!=null?x:"auto"},"& .MuiInputBase-input":{fontSize:14,fontWeight:500,pl:"2px !important"},"& .MuiAutocomplete-popupIndicator":{color:"inherit",p:0},...r},getOptionLabel:a=>a.label,options:t,onChange:(a,e)=>{l(e.value)},noOptionsText:h("no_options"),filterOptions:H,renderOption:v,componentsProps:{popper:{placement:p}},renderInput:a=>(0,b.jsx)(B,{...a,label:n,inputProps:{...a.inputProps,autoComplete:"new-password"}})})},O=K;var k=g(C()),V=i=>{let{label:t="",value:n="",onChange:o=h=>{},placement:l="left",sx:r,disablePortal:p,hasAuto:s=!1,inWhere:u,hasPermission:T=!1}=i,{waitAuthModalPromise:y}=U(),m=(0,L.useMemo)(()=>{let h=Object.keys(A).map(c=>{let v=A[c];return{label:v.label,value:c,origin:{value:c,...v}}});return s&&h.unshift({label:"Auto",value:"auto"}),h},[s,u]),P=(0,L.useMemo)(()=>n&&n!==""?n:s?"auto":"en",[n,s]);return T?(0,k.jsx)(O,{label:t,options:m,value:P,onChange:o,placement:l,sx:r}):(0,k.jsx)(O,{label:t,options:m,value:P,onChange:o,placement:l,disablePortal:p,sx:r})},be=V;export{A as a,O as b,be as c};