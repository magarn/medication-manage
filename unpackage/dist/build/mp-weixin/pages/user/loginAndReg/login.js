(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/loginAndReg/login"],{"0c07":function(e,n,t){"use strict";t.r(n);var u=t("be04"),r=t("4c0f");for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);t("7c02");var i,s=t("f0c5"),c=Object(s["a"])(r["default"],u["b"],u["c"],!1,null,"cfcb6426",null,!1,u["a"],i);n["default"]=c.exports},"4c0f":function(e,n,t){"use strict";t.r(n);var u=t("8bf0"),r=t.n(u);for(var o in u)"default"!==o&&function(e){t.d(n,e,(function(){return u[e]}))}(o);n["default"]=r.a},"7c02":function(e,n,t){"use strict";var u=t("c63e"),r=t.n(u);r.a},"8bf0":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{hideEyes:!1,loginForm:{Phone:"",userPwd:""},userType:"text",Pwdtype:"password",rules:{Phone:[{required:!0,message:"请输入手机号",trigger:["change","blur"]},{validator:function(n,t,u){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}],userPwd:[{required:!0,message:"请填写密码",trigger:["blur","change"]}]}}},methods:{loginBtn:function(){var n=this;this.$refs.uLoginForm.validate().then((function(t){e.request({url:"/api/users/login",data:{Phone:n.loginForm.Phone,userPwd:n.loginForm.userPwd},method:"post",success:function(t){t.data.length?(n.$store.dispatch("saveUserInfo",t.data[0].userName),n.$store.dispatch("saveUserId",t.data[0].userId),n.$store.dispatch("isLogin","token"),e.reLaunch({url:"/pages/user/user"})):e.showToast({title:"账号或者密码输入有误",icon:"none"})}})}))},registerBtn:function(){e.navigateTo({url:"/pages/user/loginAndReg/register"})},passwordF_B:function(){this.hideEyes=!this.hideEyes},formSubmit:function(e){console.log(e.detail.value)}},onReady:function(){this.$refs.uLoginForm.setRules(this.rules)}};n.default=t}).call(this,t("543d")["default"])},be04:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return u}));var u={uForm:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form/u-form")]).then(t.bind(null,"cd2e"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"1aa0"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,"41fc"))}},r=function(){var e=this,n=e.$createElement;e._self._c},o=[]},c63e:function(e,n,t){},d62c:function(e,n,t){"use strict";(function(e){t("a46c");u(t("66fd"));var n=u(t("0c07"));function u(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])}},[["d62c","common/runtime","common/vendor"]]]);