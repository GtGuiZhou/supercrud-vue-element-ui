import Vuex from 'vuex'
import Vue from 'vue'
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
                    if (state.admin.root === 'yes') return
                    if (!state.admin.role || !(binding.value instanceof Array)
                        || !binding.value.every(item => state.admin.role.rule.find(rule => rule.rule === item))){
                        if (!el.parentNode) {
                            el.style.display = 'none'
                        } else {
                            el.parentNode.removeChild(el)
                        }
                    }
                }
            })
        }
    },
})
