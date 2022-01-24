import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
