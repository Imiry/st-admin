/*
 * @Author: sitao
 * @Date: 2020-12-01 16:27:12
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-30 15:45:57
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUserToken } from '../utils/auth/auth-token.js'
Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect:"/ux_table",
    component: () => import('../views/Home/Home.vue'),
    children:[
      {
        path: '/st_work',
        name: 'Work',
        component: () => import('../views/Supervisory/Work.vue'),
      },
      {
        path: '/ux_table',
        name: 'Ux_table',
        component: () => import('../views/Other/UxTable/UxTable.vue'),
      },
      {
        path: '/ux_form',
        name: 'UxForm',
        component: () => import('../views/Other/UxForm/UxForm.vue'),
      },
      {
        path: '/ux_pwd',
        name: 'UxPwd',
        component: () => import('../views/Other/UxForm/UxPwd.vue'),
      },
      {
        path: '/st_welcome',
        name: 'Welcome',
        component: () => import('../views/Welcome/Welcome.vue'),
      },
      {
        path: '/st_template',
        name: 'Template',
        component: () => import('../views/Template/Template.vue'),
      },
      {
        path: '/st_template2',
        name: 'Template2',
        component: () => import('../views/Template/Template2.vue'),
      },
      {
        path: '/st_template3',
        name: 'Template3',
        component: () => import('../views/Template/Template3.vue'),
      },
      {
        path: '/st_template4',
        name: 'Template4',
        component: () => import('../views/Template/Template4.vue'),
      },
      {
        path: '/st_template5',
        name: 'Template5',
        component: () => import('../views/Template/Template5.vue'),
      },
      {
        path: '/st_editor',
        name: 'Editor',
        component: () => import('../views/Editor/Editor.vue'),
      },

      {
        path: '/403',
        name: 'AbnormalPage403',
        component: () => import('../views/Abnormal/AbnormalPage403.vue'),
      },
      {
        path: '/404',
        name: 'AbnormalPage404',
        component: () => import('../views/Abnormal/AbnormalPage404.vue'),
      },
      {
        path: '/500',
        name: 'AbnormalPage500',
        component: () => import('../views/Abnormal/AbnormalPage500.vue'),
      },
      {
        path: '/st_line',
        name: 'Line',
        component: () => import('../views/Chart/Line.vue'),
      },
      {
        path: '/st_histogram',
        name: 'Histogram',
        component: () => import('../views/Chart/Histogram.vue'),
      },
      {
        path: '/st_bar',
        name: 'Bar',
        component: () => import('../views/Chart/Bar.vue'),
      },
      {
        path: '/st_pie',
        name: 'Pie',
        component: () => import('../views/Chart/Pie.vue'),
      },
      {
        path: '/st_ring',
        name: 'Ring',
        component: () => import('../views/Chart/Ring.vue'),
      },

      {
        path: '/st_waterfal',
        name: 'Waterfal',
        component: () => import('../views/Chart/Waterfal.vue'),
      },
      {
        path: '/st_funnel',
        name: 'Funnel',
        component: () => import('../views/Chart/Funnel.vue'),
      },
      {
        path: '/st_radar',
        name: 'Radar',
        component: () => import('../views/Chart/Radar.vue'),
      },
      {
        path: '/st_map',
        name: 'Map',
        component: () => import('../views/Chart/Map.vue'),
      },
      {
        path: '/st_sankey',
        name: 'Sankey',
        component: () => import('../views/Chart/Sankey.vue'),
      },
      {
        path: '/st_heatmap',
        name: 'Heatmap',
        component: () => import('../views/Chart/Heatmap.vue'),
      },
      {
        path: '/st_scatter',
        name: 'Scatter',
        component: () => import('../views/Chart/Scatter.vue'),
      },
      {
        path: '/st_candle',
        name: 'Candle',
        component: () => import('../views/Chart/Candle.vue'),
      },
      {
        path: '/st_gauge',
        name: 'Gauge',
        component: () => import('../views/Chart/Gauge.vue'),
      },
      {
        path: '/st_tree',
        name: 'Tree',
        component: () => import('../views/Chart/Tree.vue'),
      },     
      {
        path: '/st_liquidfill',
        name: 'Liquidfill',
        component: () => import('../views/Chart/Liquidfill.vue'),
      },
      {
        path: '/st_wordcloud',
        name: 'Wordcloud',
        component: () => import('../views/Chart/Wordcloud.vue'),
      },
      {
        path: '/st_element',
        name: 'Element',
        component: () => import('../views/Element/Element.vue'),
      },
      {
        path: '/st_settings1',
        name: 'Settings1',
        component: () => import('../views/Settings/Settings1.vue'),
      },

      {
        path: '/st_usersetting',
        name: 'UserSetting',
        component: () => import('../views/Settings/UserSetting.vue'),
      },
      // {
      //   path: '/st_adss',
      //   name: 'Adss',
      //   component: () => import('../views/Settings/Adss.vue'),
      // },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  
  if (to.path === '/login') return next()
  // 获取token
  const token = getUserToken('token')
  if (!token) return next('/login')
  next()
})

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});


export default router
