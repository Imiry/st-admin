/*
 * @Author: sitao
 * @Date: 2020-12-01 16:27:12
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-02 16:45:37
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
        path: '/st_manage',
        name: 'Manage',
        component: () => import('../views/Manage/Manage.vue'),
      },

      {
        path: '/st_form',
        name: 'Form',
        component: () => import('../views/Form/Form.vue'),
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
        path: '/st_element',
        name: 'Element',
        component: () => import('../views/Element/Element.vue'),
      },
      ,
      {
        path: '/st_settings',
        name: 'Settings',
        component: () => import('../views/Settings/Settings.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
