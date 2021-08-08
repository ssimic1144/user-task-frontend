import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {VueFormBuilderPlugin} from 'v-form-builder'
import 'v-form-builder/dist/v-form-builder.css' //load CSS from your App

// install now
Vue.use(VueFormBuilderPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')