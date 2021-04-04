(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(5),u=n.n(a),i=(n(12),n(2)),s="not_started",o="in_progress",l="over",j={easy:"easy",medium:"medium",difficult:"difficult"},f={1:1,0:0,2:-1},d=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e},h=function(e){return 1===e?2:1},b=n(6),m=function e(t){var n=this;Object(b.a)(this,e),this.getEmptySquares=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.grid,t=[];return e.forEach((function(e,n){null===e&&t.push(n)})),t},this.makeMove=function(e,t){null===n.grid[e]&&(n.grid[e]=t)},this.isEmpty=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.grid;return n.getEmptySquares(e).length===Math.pow(3,2)},this.getWinner=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n.grid,t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],c=null;return t.forEach((function(t,r){null!==e[t[0]]&&e[t[0]]===e[t[1]]&&e[t[0]]===e[t[2]]?c=e[t[0]]:null===c&&0===n.getEmptySquares(e).length&&(c=0)})),c},this.clone=function(){return new e(n.grid.concat())},this.grid=t||new Array(Math.pow(3,2)).fill(null)},v=n(7),O=function e(t,n){var c,r=f[n],a=-1,u=null;if(null!==t.getWinner())return[f[t.getWinner()],0];var i,s=Object(v.a)(t.getEmptySquares());try{for(s.s();!(i=s.n()).done;){var o=i.value,l=t.clone();l.makeMove(o,n),(c=r*e(l,h(n))[0])>=a&&(a=c,u=o)}}catch(j){s.e(j)}finally{s.f()}return[r*a,u]},p=(n(13),n(0)),x=new Array(Math.pow(3,2)).fill(null),g=new m,y=function(){var e={width:"".concat(315,"px")},t=Object(c.useState)(x),n=Object(i.a)(t,2),r=n[0],a=n[1],u=Object(c.useState)({human:null,computer:null}),f=Object(i.a)(u,2),b=f[0],v=f[1],y=Object(c.useState)(s),M=Object(i.a)(y,2),S=M[0],E=M[1],C=Object(c.useState)(j.medium),N=Object(i.a)(C,2),q=N[0],P=N[1],A=Object(c.useState)(null),W=Object(i.a)(A,2),X=W[0],D=W[1],I=Object(c.useState)(null),J=Object(i.a)(I,2),T=J[0],_=J[1];Object(c.useEffect)((function(){var e=g.getWinner(r);null!==e&&S!==l&&function(e){var t;switch(e){case 1:t="Player X wins";break;case 2:t="Player O wins";break;case 0:default:t="It's a Draw!"}E(l),_(t)}(e)}),[S,r,X]);var B=Object(c.useCallback)((function(e,t){t&&S===o&&a((function(n){var c=n.concat();return c[e]=t,c}))}),[S]),z=Object(c.useCallback)((function(){var e,t=new m(r.concat()),n=t.getEmptySquares(r);switch(q){case j.easy:for(e=d(0,8);!n.includes(e);)e=d(0,8);break;case j.medium:if(!t.isEmpty(r)&&Math.random()<.5)e=O(t,b.computer)[1];else for(e=d(0,8);!n.includes(e);)e=d(0,8);break;case j.difficult:default:e=t.isEmpty(r)?d(0,8):O(t,b.computer)[1]}r[e]||(B(e,b.computer),D(b.human))}),[B,b,r,q]);Object(c.useEffect)((function(){var e;return null!==X&&X===b.computer&&S!==l&&(e=setTimeout((function(){z()}),500)),function(){return e&&clearTimeout(e)}}),[X,z,b.computer,S]);var F=function(e){r[e]||X!==b.human||(B(e,b.human),D(b.computer))};switch(S){case s:default:return Object(p.jsx)(w,{changeMode:function(e){P(e.target.value)},mode:q,choosePlayer:function(e){v({human:e,computer:h(e)}),E(o),D(1)}});case o:return Object(p.jsx)("div",{className:"container",style:e,children:r.map((function(e,t){var n=null!==e;return Object(p.jsx)(k,{isActive:n,value:e,index:t,humanMove:F},t)}))});case l:return Object(p.jsxs)("div",{children:[Object(p.jsx)("p",{children:T}),Object(p.jsx)("button",{onClick:function(){E(s),a(x)},children:"Start Over"})]})}},w=function(e){var t=e.choosePlayer,n=e.changeMode,c=e.mode;return Object(p.jsxs)("div",{className:"screen",children:[Object(p.jsxs)("div",{className:"inner",children:[Object(p.jsx)("p",{children:"Select Difficulty !!"}),Object(p.jsx)("select",{onChange:n,value:c,children:Object.keys(j).map((function(e){var t=j[e];return Object(p.jsx)("option",{value:t,children:e},t)}))})]}),Object(p.jsxs)("div",{className:"inner",children:[Object(p.jsx)("p",{children:"Choose your Player"}),Object(p.jsxs)("div",{className:"button-row",children:[Object(p.jsx)("button",{onClick:function(){return t(1)},children:"X"}),Object(p.jsx)("p",{children:"or"}),Object(p.jsx)("button",{onClick:function(){return t(2)},children:"O"})]})]})]})},k=function(e){var t=e.isActive,n=e.value,c=e.index,r=e.humanMove;return Object(p.jsx)("div",{className:"square",onClick:function(){return r(c)},children:t&&Object(p.jsx)(M,{value:n})})},M=function(e){var t=e.value;return Object(p.jsx)("div",{className:"marker",children:1===t?"X":"O"})},S=function(){return Object(p.jsx)(y,{})};n(15);var E=function(){return Object(p.jsx)("div",{className:"app",children:Object(p.jsx)(S,{})})};u.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(E,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.7e74e7f2.chunk.js.map