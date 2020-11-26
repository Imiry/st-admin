
export default {
  name: "Layout",
  data() {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false, // 侧边菜单栏的展示状态
      language:['zh','en'], //选择语言定义
    };
  },
  methods:{
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
    
    // 切换中英文点击
    handleChange(lang){
      console.log(lang)
      if(lang == 'zh'){
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
      }else if((lang == 'en')){
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale') 
      }
    },

  }


};
