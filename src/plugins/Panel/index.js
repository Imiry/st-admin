/*
 * @Author: sitao
 * @Date: 2020-12-08 14:28:57
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-08 14:34:12
 */
import PanelComponent from './Panel.vue';

const Panel = {
  install(Vue) {
    Vue.component(PanelComponent.name, PanelComponent)
  }
}

export default Panel;