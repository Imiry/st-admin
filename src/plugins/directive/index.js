/*
 * @Author: sitao
 * @Date: 2020-12-22 18:04:09
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-22 18:05:40
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