import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './state.js'
import mutations from './mutations.js'
import * as actions from './actions.js'
import * as getters from './getters.js'
//实例store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

//导出store对象
export default store