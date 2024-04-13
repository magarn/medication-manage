import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import Md5 from './static/js-md5'
Vue.prototype.$md5 = Md5
//http://180.76.139.173:3008
// Vue.prototype.$api = "https://www.qsdhh.xyz"
Vue.prototype.$api = "http://localhost:3008"
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

//注册自定义tabar
import tabbar from './pages/components/tabbar.vue'
Vue.component('tabbar',tabbar)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
	 store
	
})
app.$mount()
