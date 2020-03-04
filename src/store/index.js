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
        },
    }
})
