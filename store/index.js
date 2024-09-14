//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: false,//是否需要强制登录
        hasLogin: false,
        username: '',
		uname: '',
        userId:'',
        token:'',
        pointId:'',
    },
    mutations: {
        login(state, user) {
            state.username = user.username || '';
            state.hasLogin = true;
           //  state.userId = user.userId || '';
           //  state.token = user.token || '';
           // state.pointId = user.pointId || '';
		   uni.setStorage({
		   	key:'uname',
		   	data:user
		   })
        },
        logout(state) {
           state.username = '';
           state.hasLogin = false;
           state.userId = '';
           state.token = '';
           state.pointId = '';
		   uni.removeStorage({
		   	key:'uname'
		   })
        }
    }
})
export default store