import{c as Q}from"./3PS7M655.js";var G=Q((U,F)=>{(function(b,D){typeof U=="object"&&typeof F!="undefined"?F.exports=D():typeof define=="function"&&define.amd?define(D):(b=typeof globalThis!="undefined"?globalThis:b||self).dayjs=D()})(U,function(){"use strict";var b=1e3,D=6e4,J=36e5,k="millisecond",p="second",w="minute",O="hour",m="day",W="week",l="month",Z="quarter",y="year",_="date",z="Invalid Date",q=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,B=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,E={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var e=["th","st","nd","rd"],t=i%100;return"["+i+(e[(t-20)%10]||e[t]||e[0])+"]"}},I=function(i,e,t){var r=String(i);return!r||r.length>=e?i:""+Array(e+1-r.length).join(t)+i},P={s:I,z:function(i){var e=-i.utcOffset(),t=Math.abs(e),r=Math.floor(t/60),n=t%60;return(e<=0?"+":"-")+I(r,2,"0")+":"+I(n,2,"0")},m:function i(e,t){if(e.date()<t.date())return-i(t,e);var r=12*(t.year()-e.year())+(t.month()-e.month()),n=e.clone().add(r,l),u=t-n<0,s=e.clone().add(r+(u?-1:1),l);return+(-(r+(t-n)/(u?n-s:s-n))||0)},a:function(i){return i<0?Math.ceil(i)||0:Math.floor(i)},p:function(i){return{M:l,y,w:W,d:m,D:_,h:O,m:w,s:p,ms:k,Q:Z}[i]||String(i||"").toLowerCase().replace(/s$/,"")},u:function(i){return i===void 0}},Y="en",S={};S[Y]=E;var j=function(i){return i instanceof x},C=function i(e,t,r){var n;if(!e)return Y;if(typeof e=="string"){var u=e.toLowerCase();S[u]&&(n=u),t&&(S[u]=t,n=u);var s=e.split("-");if(!n&&s.length>1)return i(s[0])}else{var a=e.name;S[a]=e,n=a}return!r&&n&&(Y=n),n||!r&&Y},c=function(i,e){if(j(i))return i.clone();var t=typeof e=="object"?e:{};return t.date=i,t.args=arguments,new x(t)},o=P;o.l=C,o.i=j,o.w=function(i,e){return c(i,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var x=function(){function i(t){this.$L=C(t.locale,null,!0),this.parse(t)}var e=i.prototype;return e.parse=function(t){this.$d=function(r){var n=r.date,u=r.utc;if(n===null)return new Date(NaN);if(o.u(n))return new Date;if(n instanceof Date)return new Date(n);if(typeof n=="string"&&!/Z$/i.test(n)){var s=n.match(q);if(s){var a=s[2]-1||0,h=(s[7]||"0").substring(0,3);return u?new Date(Date.UTC(s[1],a,s[3]||1,s[4]||0,s[5]||0,s[6]||0,h)):new Date(s[1],a,s[3]||1,s[4]||0,s[5]||0,s[6]||0,h)}}return new Date(n)}(t),this.$x=t.x||{},this.init()},e.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},e.$utils=function(){return o},e.isValid=function(){return this.$d.toString()!==z},e.isSame=function(t,r){var n=c(t);return this.startOf(r)<=n&&n<=this.endOf(r)},e.isAfter=function(t,r){return c(t)<this.startOf(r)},e.isBefore=function(t,r){return this.endOf(r)<c(t)},e.$g=function(t,r,n){return o.u(t)?this[r]:this.set(n,t)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(t,r){var n=this,u=!!o.u(r)||r,s=o.p(t),a=function(T,$){var g=o.w(n.$u?Date.UTC(n.$y,$,T):new Date(n.$y,$,T),n);return u?g:g.endOf(m)},h=function(T,$){return o.w(n.toDate()[T].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice($)),n)},f=this.$W,d=this.$M,v=this.$D,M="set"+(this.$u?"UTC":"");switch(s){case y:return u?a(1,0):a(31,11);case l:return u?a(1,d):a(0,d+1);case W:var H=this.$locale().weekStart||0,L=(f<H?f+7:f)-H;return a(u?v-L:v+(6-L),d);case m:case _:return h(M+"Hours",0);case O:return h(M+"Minutes",1);case w:return h(M+"Seconds",2);case p:return h(M+"Milliseconds",3);default:return this.clone()}},e.endOf=function(t){return this.startOf(t,!1)},e.$set=function(t,r){var n,u=o.p(t),s="set"+(this.$u?"UTC":""),a=(n={},n[m]=s+"Date",n[_]=s+"Date",n[l]=s+"Month",n[y]=s+"FullYear",n[O]=s+"Hours",n[w]=s+"Minutes",n[p]=s+"Seconds",n[k]=s+"Milliseconds",n)[u],h=u===m?this.$D+(r-this.$W):r;if(u===l||u===y){var f=this.clone().set(_,1);f.$d[a](h),f.init(),this.$d=f.set(_,Math.min(this.$D,f.daysInMonth())).$d}else a&&this.$d[a](h);return this.init(),this},e.set=function(t,r){return this.clone().$set(t,r)},e.get=function(t){return this[o.p(t)]()},e.add=function(t,r){var n,u=this;t=Number(t);var s=o.p(r),a=function(d){var v=c(u);return o.w(v.date(v.date()+Math.round(d*t)),u)};if(s===l)return this.set(l,this.$M+t);if(s===y)return this.set(y,this.$y+t);if(s===m)return a(1);if(s===W)return a(7);var h=(n={},n[w]=D,n[O]=J,n[p]=b,n)[s]||1,f=this.$d.getTime()+t*h;return o.w(f,this)},e.subtract=function(t,r){return this.add(-1*t,r)},e.format=function(t){var r=this,n=this.$locale();if(!this.isValid())return n.invalidDate||z;var u=t||"YYYY-MM-DDTHH:mm:ssZ",s=o.z(this),a=this.$H,h=this.$m,f=this.$M,d=n.weekdays,v=n.months,M=function($,g,N,A){return $&&($[g]||$(r,u))||N[g].slice(0,A)},H=function($){return o.s(a%12||12,$,"0")},L=n.meridiem||function($,g,N){var A=$<12?"AM":"PM";return N?A.toLowerCase():A},T={YY:String(this.$y).slice(-2),YYYY:this.$y,M:f+1,MM:o.s(f+1,2,"0"),MMM:M(n.monthsShort,f,v,3),MMMM:M(v,f),D:this.$D,DD:o.s(this.$D,2,"0"),d:String(this.$W),dd:M(n.weekdaysMin,this.$W,d,2),ddd:M(n.weekdaysShort,this.$W,d,3),dddd:d[this.$W],H:String(a),HH:o.s(a,2,"0"),h:H(1),hh:H(2),a:L(a,h,!0),A:L(a,h,!1),m:String(h),mm:o.s(h,2,"0"),s:String(this.$s),ss:o.s(this.$s,2,"0"),SSS:o.s(this.$ms,3,"0"),Z:s};return u.replace(B,function($,g){return g||T[$]||s.replace(":","")})},e.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},e.diff=function(t,r,n){var u,s=o.p(r),a=c(t),h=(a.utcOffset()-this.utcOffset())*D,f=this-a,d=o.m(this,a);return d=(u={},u[y]=d/12,u[l]=d,u[Z]=d/3,u[W]=(f-h)/6048e5,u[m]=(f-h)/864e5,u[O]=f/J,u[w]=f/D,u[p]=f/b,u)[s]||f,n?d:o.a(d)},e.daysInMonth=function(){return this.endOf(l).$D},e.$locale=function(){return S[this.$L]},e.locale=function(t,r){if(!t)return this.$L;var n=this.clone(),u=C(t,r,!0);return u&&(n.$L=u),n},e.clone=function(){return o.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},i}(),V=x.prototype;return c.prototype=V,[["$ms",k],["$s",p],["$m",w],["$H",O],["$W",m],["$M",l],["$y",y],["$D",_]].forEach(function(i){V[i[1]]=function(e){return this.$g(e,i[0],i[1])}}),c.extend=function(i,e){return i.$i||(i(e,x,c),i.$i=!0),c},c.locale=C,c.isDayjs=j,c.unix=function(i){return c(1e3*i)},c.en=S[Y],c.Ls=S,c.p={},c})});export{G as a};