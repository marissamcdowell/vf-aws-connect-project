(this["webpackJsonplast-five-calls-app"]=this["webpackJsonplast-five-calls-app"]||[]).push([[0],{44:function(e,t,a){},46:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a.n(c),s=a(29),r=a.n(s),i=(a(44),a(19)),l=a.n(i),j=a(30),o=a(37),b=(a(46),a(31)),d=a.n(b),u=a(86),O=a(87),h=a(88),p=a(90),x=a(89),m=a(84),f=a(3),v=Object(m.a)({table:{minWidth:650,maxWidth:800,marginLeft:"auto",marginRight:"auto"},list:{listStyle:"none",paddingLeft:0}});var N=function(){var e=Object(c.useState)(""),t=Object(o.a)(e,2),a=t[0],n=t[1];Object(c.useEffect)((function(){s()}),[]);var s=function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("https://3kljlyids7.execute-api.us-east-1.amazonaws.com/prod");case 3:t=e.sent,console.log(t.data),n(t.data.Items),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),r=v();return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)("h2",{children:"Call in at: +1 866-872-4191"}),Object(f.jsx)("h3",{children:"Last 5 callers"}),a&&Object(f.jsxs)(u.a,{className:r.table,"aria-label":"simple table",children:[Object(f.jsx)(O.a,{children:Object(f.jsxs)(h.a,{children:[Object(f.jsx)(p.a,{children:"Caller's Number"}),Object(f.jsx)(p.a,{children:"Vanity Options"}),Object(f.jsx)(p.a,{children:"Timestamp"})]})}),Object(f.jsx)(x.a,{children:a&&a.map((function(e){return Object(f.jsxs)(h.a,{children:[Object(f.jsx)(p.a,{children:e.PHONE_NUMBER}),Object(f.jsx)(p.a,{children:Object(f.jsx)("ul",{className:r.list,children:e.VANITY_OPTIONS&&e.VANITY_OPTIONS.map((function(e,t){return Object(f.jsx)("li",{children:e})}))})}),Object(f.jsx)(p.a,{children:new Date(e.TIMESTAMP).toLocaleString("en-US")})]},"".concat(e.PHONE_NUMBER,"-").concat(e.TIMESTAMP))}))})]})]})};r.a.render(Object(f.jsx)(n.a.StrictMode,{children:Object(f.jsx)(N,{})}),document.getElementById("root"))}},[[70,1,2]]]);
//# sourceMappingURL=main.977e689d.chunk.js.map