/*
 * @Author: sitao
 * @Date: 2020-11-26 09:58:32
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-25 18:07:00
 */
import { mapActions } from "vuex";
import { mapState } from 'vuex';
import { removeUserToken } from '../../utils/auth/auth-token.js'
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
        { path:'/home',name:'首页',type:'info' },
        { path:'/st_template',name:'模板1',type:'' },

      ],
      disable_tag:true
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


    closeTag(index){
      console.log(index)
      this.routeTag.splice(index, 1);
    },
    
    handleOpen(key,path) {
      console.log(path)
    }
    
  },
  mounted() {
    this.currentLanguage = this.language == 'zh' ? '中文' : 'English',
    this.handleScroll()
  },


};
