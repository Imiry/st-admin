/*
 * @Author: sitao
 * @Date: 2020-11-25 18:15:00
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-22 18:07:25
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// plugins
import Directives from './plugins/directive/index.js';
Vue.use(Directives); 


import ElementUI from 'element-ui';
import '../src/assets/css/vue.scss'
import '../src/assets/css/global.scss';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/font/iconfont.css";
import '@/components/index.js';
import filters from './utils/filters.js';
import axios from 'axios';
import i18n from '@/i18n/i18n.js';
// import echarts from 'echarts';
import message from '@/utils/message.js';
import notifyMsg from '@/utils/notify.js';
import VCharts from 'v-charts';
import VueCustomScrollbar from 'vue-custom-scrollbar';
import 'vue-custom-scrollbar/dist/vueScrollbar.css';
import VuePanel from './plugins/Panel/';
import screenfull from 'screenfull';
import VueSparkline from 'vue-sparklines';
import '../node_modules/echarts/map/js/world.js' // 引入世界地图


Vue.use(ElementUI);
Vue.use(filters);
Vue.use(VCharts);
Vue.use(VuePanel);
Vue.use(screenfull);
Vue.use(VueSparkline);



Vue.prototype.$echarts = window.echarts;
Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.prototype.$notifyMsg = notifyMsg;
Vue.component('vue-custom-scrollbar', VueCustomScrollbar)

axios.defaults.baseURL = 'http://localhost:8888/api/';
Vue.prototype.$http = axios;
//将全局echarts对象挂载到vue的原型上
// Vue.prototype.$echarts = window.echarts
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
