import Vue from 'vue'
import App from './App'
import store from './store'
import './common/filter.js'
const myCloud = uniCloud.init({
	provider: 'aliyun',
	spaceId: '380c7682-e928-4ccd-b19b-99323fd9fdc6',
	clientSecret: 'dH77i2f5k0Jxp8wCY+Hcwg=='
});
import uView from '@/uni_modules/uview-ui'
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
// Vue.prototype.$serverUrl = 'https://voc.m-excel.cn/appapi.php?m=login&a=login'
// Vue.prototype.$serverUrl1 = 'https://voc.16861.com:2020/api/v1/query?'
// Vue.prototype.$serverUrl2 = 'https://voc.blueinfo.com.cn/appapi.php?m=api&'
Vue.prototype.$store = store
const app = new Vue({
	store,
	...App
})
app.$mount()
