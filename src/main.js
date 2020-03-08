import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './common/axios'
// import mock from './common/mock'
import './assets/iconfont/iconfont.css'
import Viewer from 'v-viewer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {throttle, debounce} from "./common/common";
import auth from "./common/auth";

Vue.use(ElementUI);
Vue.use(Viewer);


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$throttle = throttle
Vue.prototype.$debounce = debounce


// if (localStorage.getItem("store")) {
//     let state = JSON.parse(localStorage.getItem("store"))
//     if (state instanceof Object) {
//         store.replaceState(state)
//         store.commit('initAuth')
//     }
// }
//
// //在页面刷新时将vuex里的信息保存到sessionStorage里
// window.addEventListener("beforeunload", () => {
//     localStorage.setItem("store", JSON.stringify(store.state))
// })
Vue.prototype.$auth = rules => auth(store.state, rules)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
