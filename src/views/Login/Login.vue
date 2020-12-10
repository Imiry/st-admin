
<template>
  <div class="login_container">
    <!-- 'url(' + coverImgUrl + ')','background-repeat':'no-repeat' -->
    <div class="lg_content" ref="lg_content" v-bind:style="{backgroundImage: 'url(' + bgImages[defaultindex].src + ')'}"  >
      <div class="login_box">
        <div class="lg_header"></div>
        <el-form  class="login-form" ref="loginFormRef" :model="user" :rules="formRules">
          <el-form-item prop="mobile" class="iput_con">
            <el-input  placeholder="请输入手机号" v-model="user.mobile"  prefix-icon=" icon iconfont icon-yidongduanicon-"></el-input>
          </el-form-item>
          <el-form-item prop="code" class="iput_psd">
            <el-input  placeholder="请输入密码" v-model="user.code" prefix-icon=" icon iconfont icon-mima" show-password></el-input>
          </el-form-item>
          <el-form-item prop="agree" class="xieyi">
            <el-checkbox v-model="user.agree" style="color:#fff">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item class="btn" >
            <el-button class="denglu" type="success" @click="onLogin" :loading="loginLoading">登录</el-button>
            <el-button class="zhuce" type="info">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bg_change">
        <div class="img1" v-for="(item,id) in bgImages" :key="id" @click="changeBg(item)">
          <img :src="item.src" alt="">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import JSONbig from 'json-bigint'
import { now } from 'moment';
export default {
  name: 'Login',
  data () { 
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      defaultindex:0,//默认一个数组索引[0]图片
      bgImages:[
        {id:1,src:require("@/assets/images/bg1.jpg")},
        {id:2,src:require("@/assets/images/bg2.jpg")},
        {id:3,src:require("@/assets/images/bg3.jpg")},
        {id:4,src:require("@/assets/images/bg4.jpg")},
        {id:5,src:require("@/assets/images/bg5.jpg")}
      ],
      loginLoading:false,
      //表单验证规则
      formRules: { 
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请你输入密码', trigger: 'blur' },
          { min: 3,max: 6, message: "密码长度在3到6个字符串", trigger: 'blur' }
        ],
        //自定义校验规则
        agree: [
          {
            validator: (rule,value,callback) => {
              if(value) {
                //验证通过
                callback()
              } else {
                //验证失败
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //登录校验
    onLogin () {
      this.$refs.loginFormRef.validate( async valid => {
        if(!valid) return 
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      this.$router.push('/home')
      // login(this.user).then(res => {
      //   // console.log(res)
      //   // 登录成功
      //   this.$message({
      //     message: '登录成功',
      //     type: 'success'
      //   })
      //   // 关闭 loading
      //   this.loginLoading = false
        
      //   // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
      //   // 本地存储只能存储字符串
      //   // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
      //   window.localStorage.setItem('user', JSONbig.stringify(res.data.data))
      //   this.$router.push('/home')

      // }).catch(err => { // 登录失败
      //   console.log('登录失败', err)
      //   this.$message({
      //     message: '登录失败',
      //     type: 'error'
      //   })

        // 关闭 loading
        this.loginLoading = false
      // })
    },
    //切换背景
    changeBg (item) {
      // console.log(item.id)
      this.defaultindex = item.id-1
      
    }
  },
  // mounted (){
  //   this.changeBg()
  // },
}
</script>

<style lang="scss" >
  .login_container{
      height: 100%;
      min-width: 1366px;
      
  }
  .login_container .lg_content {
      position: relative;
      height: 100%;
      background: url(../../assets/images/bg6.jpg) no-repeat;
      // background-color: rgb(136, 125, 125);
      background-size: 100% 100%;
  }

  .login_container .lg_content .login_box{
        position: absolute;
        width: 450px;
        height: 350px;
        background-color: rgba(0, 0, 0,0.4);
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        padding: 20px;
        box-sizing: border-box;
  }
  .login_container .lg_content .login_box .lg_header{
      height: 20%;
      // background-color: pink;
    }
  .login_container .lg_content .login_box .login-form{
    height: 80%;
    // background-color: purple;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .login_container .lg_content .login_box .login-form .iput_con,.iput_psd,.xieyi{
      width: 300px;
  }
  .login_container .lg_content .login_box .login-form .btn .el-form-item__content{
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .login_container .lg_content .login_box .login-form .btn .el-form-item__content .denglu{
    margin-right: 150px;
  }
  .bg_change{
        position: absolute;
        width: 50px;
        height: 400px;
        // background-color: pink;
        right: 40px;
        bottom: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
  }
  .bg_change .img1{
    width: 50px;
    height: 50px;
  }
  .bg_change .img1 img{
    width: 100%;
    height: 100%;
    border: 2px solid #fff ;
    border-radius: 50%;
    background-size:100% 100%;
  }
  .bg_change .img1 img:hover{
    cursor: pointer;
  }
      
</style>