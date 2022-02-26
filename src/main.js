import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue';
import './theme.scss'
import 'bootstrap-icons/font/bootstrap-icons.scss'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

