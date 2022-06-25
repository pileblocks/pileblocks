import Vue from 'vue'
import VueI18n from "vue-i18n"

import App from './App.vue'
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue';
import './theme.scss'
import 'bootstrap-icons/font/bootstrap-icons.scss'
import router from './router'
import store from './store'
import './AppFilters'
import en from "../i18n/en";
import kr from "../i18n/kr";

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: {...en, ...kr}
})


new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

