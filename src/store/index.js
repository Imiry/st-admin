/*
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-29 15:21:16
 */
import Vue from 'vue'
import Vuex from 'vuex'
import i18n from './modules/i18n.js'
import admin from './modules/admin.js'
import todo from './modules/todo.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    i18n,
    admin,
    todo,
    user,
  }
})