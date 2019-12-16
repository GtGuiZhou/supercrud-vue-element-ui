import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './common/axios'
import mock from './common/mock'
import './assets/iconfront/iconfont.css'
window.console.log(mock)
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
