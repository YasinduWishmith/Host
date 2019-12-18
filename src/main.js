import Vue from 'vue'
import App from './App.vue'
import NavBar from './components/NavBar'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from './routes.js'
import { LayoutPlugin } from 'bootstrap-vue'


Vue.use(LayoutPlugin)


Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.component('NavBar',NavBar);

new Vue({
  render: h => h(App),
  router: Router,
}).$mount('#app')


