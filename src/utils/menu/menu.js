/*
 * @Author: sitao
 * @Date: 2020-12-28 11:00:16
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-28 11:24:32
 */
import { i18n } from '../../i18n/i18n.js'
export default menuList = [
  { 
    path:'/st_welcome',
    icon:'iconfont icon-shouye icbg',
    name:this.$t('nav.home')
  },
  { 
    path:'/ux_others',
    icon:'iconfont icon-otherfile icbg',
    name:this.$t('nav.others'),
    children:[
      { path:'/ux_table',icon:'iconfont icon-UX icbg',name:this.$t('others_subnav.Ux_Table') },
      { path:'/ux_form',icon:'iconfont icon-UX icbg',name:this.$t('others_subnav.Ux_Form') },
      { path:'/ux_pwd',icon:'iconfont icon-UX icbg',name:this.$t('others_subnav.pwd') },
    ]
  },
  { 
    path:'/st_tempaltes',
    icon:'iconfont icon-pulse icbg',
    name:this.$t('nav.template'),
    children:[
      { path:'/st_template',icon:'iconfont icon-pulse icbg',name:this.$t('template_subnav.template1-1') },
      { path:'/st_template2',icon:'iconfont icon-pulse icbg',name:this.$t('template_subnav.template2-2') },
      { path:'/st_template3',icon:'iconfont icon-pulse icbg',name:this.$t('template_subnav.template3-pwd') },
      { path:'/st_template4',icon:'iconfont icon-pulse icbg',name:this.$t('template_subnav.template4-menu-scroll') },
      { path:'/st_template5',icon:'iconfont icon-pulse icbg',name:this.$t('template_subnav.template5-todoList') },
    ]
  },
  { 
    path:'/st_editor',
    icon:'iconfont icon-fuwenbenbianjiqi_biaoge icbg',
    name:this.$t('nav.editor'),
  },
  { 
    path:'/st_form',
    icon:'iconfont icon-biaoge icbg',
    name:this.$t('nav.form'),
  },
  { 
    path:'/st_charts',
    icon:'iconfont icon-chart icbg',
    name:this.$t('nav.chart'),
    children:[
      { path:'/st_line',icon:'iconfont icon-linechart icbg',name:this.$t('chart_subnav.St_line') },
      { path:'/st_histogram',icon:'iconfont icon-zhuzhuangtu icbg',name:this.$t('chart_subnav.St_histogram') },
      { path:'/st_bar',icon:'iconfont icon-icon- icbg',name:this.$t('chart_subnav.St_bar') },
      { path:'/st_pie',icon:'iconfont icon-tianchongxing icbg',name:this.$t('chart_subnav.St_pie') },
      { path:'/st_ring',icon:'iconfont icon-fsux_tubiao_bingtu icbg',name:this.$t('chart_subnav.St_ring') },
      { path:'/st_waterfal',icon:'iconfont icon-pubutu icbg',name:this.$t('chart_subnav.St_waterfal') },
      { path:'/st_funnel',icon:'iconfont icon-loudoutu icbg',name:this.$t('chart_subnav.St_funnel') },
      { path:'/st_radar',icon:'iconfont icon-leidatu icbg',name:this.$t('chart_subnav.St_radar') },
      { path:'/st_map',icon:'iconfont icon-ditu icbg',name:this.$t('chart_subnav.St_map') },
      { path:'/st_sankey',icon:'iconfont icon-tubiaozhizuomoban_sangjitu icbg',name:this.$t('chart_subnav.St_sankey') },
      { path:'/st_heatmap',icon:'iconfont icon-sandiantu icbg',name:this.$t('chart_subnav.St_heatmap') },
      { path:'/st_scatter',icon:'iconfont icon-Kxiantu icbg',name:this.$t('chart_subnav.St_scatter') },
      { path:'/st_candle',icon:'iconfont icon-ziyuan icbg',name:this.$t('chart_subnav.St_candle') },
      { path:'/st_gauge',icon:'iconfont icon-ziyuan icbg',name:this.$t('chart_subnav.St_gauge') },
      { path:'/st_tree',icon:'iconfont icon-511tongji_shutu icbg',name:this.$t('chart_subnav.St_tree') },
      { path:'/st_liquidfill',icon:'iconfont icon-fsux_tubiao_shuiqiutu icbg',name:this.$t('chart_subnav.St_liquidfill') },
      { path:'/st_wordcloud',icon:'iconfont icon-ciyuntu icbg',name:this.$t('chart_subnav.St_wordcloud') },
    ]
  },
  { 
    path:'/st_elements',
    icon:'iconfont icon-suozhu icbg ',
    name:this.$t('nav.element'),
    children:[
      { path:'/st_element',icon:'iconfont icon-xiaolian- icbg',name:this.$t('element_subnav.St_element') },
    ]
  },
  { 
    path:'/st_settings',
    icon:'iconfont icon-shezhi icbg',
    name:this.$t('nav.settings'),
    children:[
      { path:'/st_settings1',icon:'iconfont icon-shezhi icbg',name:this.$t('settings_subnav.createUser') },
      { path:'/st_usersetting',icon:'iconfont icon-yonghushezhi icbg',name:this.$t('settings_subnav.userSetting') },
    ]
  },
]