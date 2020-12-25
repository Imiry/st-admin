/*
 * @Author: sitao
 * @Date: 2020-12-22 18:04:09
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-25 13:56:47
 */
import drag from './drag.js'

const directives = {
  drag,
}
export default {
  install(Vue) {
    Object.keys(directives).forEach(key=>{
      Vue.directive(key, directives[key])
    })
  }
}