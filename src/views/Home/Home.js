/*
 * @Author: sitao
 * @Date: 2020-11-26 09:58:32
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-07 12:04:20
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
      currentLanguage:""  //当前的选中的语言
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

  },
  mounted() {
    this.currentLanguage = this.language == 'zh' ? '中文' : 'English'
  }


};
