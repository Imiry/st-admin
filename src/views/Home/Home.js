/*
 * @Author: sitao
 * @Date: 2020-11-26 09:58:32
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-09 15:28:56
 */
import { mapActions } from "vuex";
import { mapState } from 'vuex'
export default {
  name: "Layout",
  data() {
    return {
      user: {}, // 当前登录用户信息
      // isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')), // 侧边菜单栏的展示状态
      // language: sessionStorage.getItem('language') || 'zh', //选择语言定义
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
    };
  },
  computed:mapState({
    isCollapse: state=> state.i18n.isCollapse,
    language:state=> state.i18n.language
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
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出"
        });    
      })
    },
    
    //设置
    setting(){
      this.$router.push('/st_settings')
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

    }
    

    //vue-custom-scrollbar----------------------------监听滚动位置的变化
    // scrollHanle(evt) {
    //   this.event = evt.target;
    //   this.backheight = parseInt(evt.target.scrollTop);
    //   if(parseInt(evt.target.scrollTop) >= 250){
    //     this.backtopflag = true
    //   }else{
    //     this.backtopflag = false
    //   }
    //   // console.log(parseInt(evt.target.scrollTop))
    // },
    // backtop() {
    //   if(this.event){
    //     let timer =setInterval(()=> {
    //       this.event.scrollTop -=50; 
    //       if(this.event.scrollTop <= 0){
    //         clearInterval(timer)
    //       }
    //     },5)
    //   }
    // }
    //vue-custom-scrollbar----------------------------监听滚动位置的变化
  },
  mounted() {
    this.currentLanguage = this.language == 'zh' ? '中文' : 'English',
    this.handleScroll()
  }


};
