import Vue from 'vue'
import VueRouter from 'vue-router'
import {Notification} from 'element-ui'
import store from 'vuex'
Vue.use(VueRouter)

// 路由数据
import routes from './router'

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})

window.console.log(store)
/**
 * 路由拦截
 */
// router.beforeEach(async (to, from, next) => {
//     window.console.log(store)
//     if (!store.state.admin && to.path !== '/login'){
//         if (from.path !== '/login'){
//             Notification.warning('请先登录')
//             router.push('/login')
//         } else {
//             return
//         }
//     }
//     next()
// })

export default router
