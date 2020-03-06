import Vuex from 'vuex'
import Vue from 'vue'
import auth from "../common/auth";
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        admin: {},
    },
    mutations: {
        setAdmin(state,admin){
            state.admin = admin
            this.commit('initAuth')
        },
        initAuth(state){
            Vue.directive('auth',{
              inserted: function (el,binding) {
                  if (!auth(state.admin,binding.value)){
                      el.parentNode.removeChild(el) // 有些组件无法移除,例如el-table-column
                  }
                }
            })
        }
    },
})
