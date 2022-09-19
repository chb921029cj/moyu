import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import store from 'store/index.js'
const app = new Vue({
    ...App,
	store
})
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif