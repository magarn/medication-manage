(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"03d3":function(n,t,e){"use strict";e.r(t);var u=e("235a"),o=e("4629");for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);e("ce01");var c,a=e("f0c5"),r=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,"7ec5d69d",null,!1,u["a"],c);t["default"]=r.exports},"235a":function(n,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}));var u={uAvatar:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(e.bind(null,"5384"))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"89c9"))}},o=function(){var n=this,t=n.$createElement;n._self._c},i=[]},4629:function(n,t,e){"use strict";e.r(t);var u=e("6cea"),o=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=o.a},"6cea":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;e("26cb");var u={data:function(){return{avatar:"https://cdn.uviewui.com/uview/album/1.jpg",list:[{name:"设置",id:"setUp",icon:"setting-fill",iconBackground:"#3b2021"}]}},onLoad:function(){},mounted:function(){},computed:{userName:function(){return this.$store.getters.getName},isLogin:function(){return this.$store.getters.isLogin}},methods:{onClick:function(n){},hasLogin:function(){1==isNaN(this.isLogin)?n.showToast({title:"您已经登录",icon:"success"}):n.navigateTo({url:"/pages/user/loginAndReg/login"})},loginOut:function(){0==isNaN(this.isLogin)?n.showToast({title:"您还未登录",icon:"none"}):this.$store.dispatch("LogOut").then((function(t){n.showToast({title:"成功退出",icon:"success"})}))}}};t.default=u}).call(this,e("543d")["default"])},"9a1a":function(n,t,e){},bf4c:function(n,t,e){"use strict";(function(n){e("a46c");u(e("66fd"));var t=u(e("03d3"));function u(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e("543d")["createPage"])},ce01:function(n,t,e){"use strict";var u=e("9a1a"),o=e.n(u);o.a}},[["bf4c","common/runtime","common/vendor"]]]);