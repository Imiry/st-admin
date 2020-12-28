/*
 * @Author: sitao
 * @Date: 2020-11-26 09:58:32
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-28 17:47:28
 */
import { mapActions } from "vuex";
import { mapState } from 'vuex';

import { removeUserToken } from '../../utils/auth/auth-token.js'
// import { menuList } from '../../utils/menu/menu.js'
export default {
  name: "Layout",
  data() {
    return {
      user: {}, // 当前登录用户信息
      currentLanguage:"",  //当前的选中的语言
      exprandflag:true,//放大缩小的状态
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
        swipeEasing:true
      },
      backtopflag:false, //箭头的状态
      event:null,
      backheight:null,
      tabShow:false, //右侧工具状态
      tabIconFlag:true, //右侧图标状态
      navFlag: false,//侧边栏位置的状态判断
      defaultUrl:require('../../assets/images/swiper/avtor.jpg'),

      routeTag:[
        // { path:'/home',name:'首页',type:'' },
        { path:'/st_template',name:'st_template',type:'' },
      ],
      disable_tag:true,
      menuList:[
        { 
          path:'/st_welcomes',
          icon:'iconfont icon-shouye icbg',
          name:this.$t('nav.home'),
          children:[
            { path:'/st_welcome',icon:'iconfont icon-shouye icbg',name:this.$t('nav.home') },
          ]
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
          children:[
            { path:'/st_editor',icon:'iconfont icon-fuwenbenbianjiqi_biaoge icbg',name:this.$t('nav.editor') },
          ]
        },
        { 
          path:'/st_form',
          icon:'iconfont icon-biaoge icbg',
          name:this.$t('nav.form'),
          children:[
            { path:'/st_form',icon:'iconfont icon-biaoge icbg',name:this.$t('nav.form') },
          ]
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
    };
  },
  computed:mapState({
    isCollapse: state=> state.i18n.isCollapse,
    language:state=> state.i18n.language,
    avtorPath: state => state.user.avtorPath,
    exist() {
      if(this.avtorPath){
        this.defaultUrl = this.avtorPath
        return this.defaultUrl
      }else{
        return this.defaultUrl
      }
    }
  }),
  
  methods:{
    ...mapActions(['changeCollapse','changeLanguage']),
    //登出
    logout(){
      this.$confirm("确认退出吗？","退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //退出登录要把用户的登录状态清楚
        removeUserToken('user')
        localStorage.removeItem('router_tag')
        this.$router.push({path:"/login",replace:true})
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出"
        });    
      })
    },
    
    //设置
    setting(){
      this.$router.push('/st_usersetting')
    },
    
    exprandChange(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
      this.exprandflag = ! this.exprandflag
    },
    //切换中英文
    handleChange(value){
      let language = value === 'zh' ? 'zh' : 'en'
      this.currentLanguage = language === 'zh' ? '中文' : 'English'
      this.$i18n.locale = language
      this.changeLanguage(language)
    },
    
    //显示隐藏
    toggleNav() {
      let isCol = this.isCollapse
      this.changeCollapse(!isCol)
    },

    handleScroll() {
      let scrollbarEl = this.$refs.scrollbar.wrap
      scrollbarEl.onscroll = () => {
        if(scrollbarEl.scrollTop >= 250){
          this.backtopflag = true
        }else{
          this.backtopflag = false
        }
      }
    },
    backtop() {
      // this.$refs.scrollbar.wrap.scrollTop = 0
      // console.log(this.$refs.scrollbar.wrap.scrollTop)
        let timer =setInterval(()=> {
          this.$refs.scrollbar.wrap.scrollTop -=50; 
          if(this.$refs.scrollbar.wrap.scrollTop <= 0){
            clearInterval(timer)
          }
        },10)

    },
    //左侧图标显示
    tabOut(){
      this.tabShow = !this.tabShow
      this.tabIconFlag = !this.tabIconFlag
    },
    // 左侧图标隐藏
    closeHandle() {
      this.tabIconFlag = true
      this.tabShow = false
    },
    //改变左边的侧边栏在左在右
    changeNavposition() {
      this.navFlag = !this.navFlag
      this.tabIconFlag = true
      this.tabShow = false
    },

    //关闭tagrouter
    closeTag(index){
      //解释：当关闭tag路由标签的时候，要处理点击之后，当前激活路由的位置，现在有两种情况，
      //当用户点击最后一个时候，要对最后一个的前一个激活，并对删除之后保存在localStorage
      //当用户点击中间的话，就直接删除对应索引的内容，即保存
      if(index === this.routeTag.length-1){
        this.routeTag[index-1].type = ''
        this.routeTag.splice(index, 1);
        this.$router.push(`${this.routeTag[index-1].path}`)
        localStorage.setItem('router_tag',JSON.stringify(this.routeTag))
      }else{
        this.routeTag.splice(index, 1);
        localStorage.setItem('router_tag',JSON.stringify(this.routeTag))
      }   
      // console.log(this.routeTag)
    },


    hasSomeRoute(route,item){
      return route.some(val=> val.name===item.name)
    },
    //点击对应的侧边栏的内容实现添加tag
    handleGet(item) {
      let seletedItem = { path:item.path,name:item.name,type:'' };
       let some=this.hasSomeRoute(this.routeTag,seletedItem)
       if(!some){
         this.routeTag.map(item=> item.type='info')
         this.routeTag.push(seletedItem)
         localStorage.setItem('router_tag',JSON.stringify(this.routeTag))
       }else{
         this.routeTag.map(item=>{
            if(seletedItem.name===item.name){
              item.type=''
            }else{
              item.type='info'
            }
         })
       }
    },

    //点击tag时要保证点击的激活，其他的不激活，颜色状态变化
    handelClick(tag){
      this.routeTag.map(item=> item.type='info')
      tag.type=''
      this.$router.push(`${tag.path}`)
    }
    
  },
  mounted() {
    // this.routeTag = JSON.parse(localStorage.getItem('router_tag'))
    this.currentLanguage = this.language == 'zh' ? '中文' : 'English'
    this.handleScroll()
    
  },


};
