import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '../src/assets/css/global.scss'
import 'element-ui/lib/theme-chalk/index.css';
import '@/components/index.js';
import filters from './utils/filters.js'
import axios from 'axios'
import i18n from '@/i18n/i18n.js'
// import echarts from 'echarts'

Vue.prototype.$echarts = window.echarts
Vue.use(ElementUI);
Vue.use(filters)
Vue.config.productionTip = false



axios.defaults.baseURL = 'http://localhost:8888/api/'
Vue.prototype.$http = axios
//将全局echarts对象挂载到vue的原型上
// Vue.prototype.$echarts = window.echarts
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
