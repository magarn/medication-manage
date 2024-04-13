(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/tabbar"],{"1c20":function(t,n,e){},6872:function(t,n,e){"use strict";var a=e("1c20"),u=e.n(a);u.a},"7e7b":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{index:0,tabbar:[{icon:"cuIcon-homefill",text:"详情",page:"../index/index",center:!1},{icon:"cuIcon-add",text:"新建",page:"../add/add",center:!0},{icon:"cuIcon-myfill",text:"我的",page:"../user/user",center:!1}]}},name:"tabbar",computed:{},props:{tabIndex:{type:String,default:JSON.toString(0)}},mounted:function(){this.index=this.tabIndex},methods:{setTab:function(n){t.navigateTo({url:n.page})}}};n.default=e}).call(this,e("543d")["default"])},"9e58":function(t,n,e){"use strict";e.r(n);var a=e("7e7b"),u=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=u.a},b1b0:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},c=[]},bb3a:function(t,n,e){"use strict";e.r(n);var a=e("b1b0"),u=e("9e58");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);e("6872");var r,i=e("f0c5"),o=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,"89bbd2c2",null,!1,a["a"],r);n["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/components/tabbar-create-component',
    {
        'pages/components/tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bb3a"))
        })
    },
    [['pages/components/tabbar-create-component']]
]);
