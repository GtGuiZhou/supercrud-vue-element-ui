import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './common/axios'
// import mock from './common/mock'
import './assets/iconfront/iconfont.css'
import Viewer from 'v-viewer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {throttle,debounce} from "./common/common";

Vue.use(ElementUI);
Vue.use(Viewer);


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$throttle = throttle
Vue.prototype.$debounce = debounce
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
