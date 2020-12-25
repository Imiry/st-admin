
<template>
  <div class="login_container">
    <!-- 'url(' + coverImgUrl + ')','background-repeat':'no-repeat' -->
    <div class="lg_content" ref="lg_content" v-bind:style="{backgroundImage: 'url(' + bgImages[defaultindex].src + ')'}"  >
      <!-- 登录区域 -->
      <div class="login_box" v-show="loginFlag">
        <div class="lg_header">
          <i class=" iconfont icon-shoujihao"></i>
          <i class=" iconfont icon-erweima1" @click="Qr_open"></i>
        </div>
        <!-- 二维码区域 -->
        <div class="Qr_class" v-show="!Qrflag">
          <img src="../../../src/assets/images/Qr.jpg" alt="">
          <div class="Qr_note">请扫描微信二维码进行登录本系统,没有账号需要进行<span class="register_" @click="register">注册</span>哦！</div>
        </div>
        <!-- /二维码区域 -->

        <el-form  v-show="Qrflag" class="login-form" ref="loginFormRef" :model="userLogin" :rules="loginRules">
          <el-form-item prop="mobile" class="iput_con">
            <el-input  placeholder="请输入手机号" v-model="userLogin.mobile"  prefix-icon=" icon iconfont icon-yidongduanicon-"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="iput_psd">
            <el-input  placeholder="请输入密码" v-model="userLogin.password" prefix-icon=" icon iconfont icon-zu" show-password></el-input>
          </el-form-item>
          <el-form-item prop="identify" class="iput_identify">
            <el-input class="input_it" placeholder="请输入验证码" v-model="userLogin.identify" prefix-icon=" icon iconfont icon-zu" ></el-input>
            <div @click="changeCode()">
              <st-identify :identifyCode="identifyCode"></st-identify>
            </div>
            
          </el-form-item>
          <el-form-item prop="agree" class="xieyi">
            <el-checkbox v-model="userLogin.agree" style="color:#fff">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item class="btn" >
            <el-button class="denglu" type="success" @click="onLogin" :loading="loginLoading">登录</el-button>
            <el-button class="zhuce" type="info" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /登录区域 -->

      <!-- 注册区域 -->
      <div class="login_box" v-show="!loginFlag">
        <div class="lg_header">
          <i class=" iconfont icon-zhuce"></i> 
        </div>
        <el-form  class="login-form" ref="registerFormRef" :model="userRegister" :rules="registerRules">
          <el-form-item prop="mobile" class="iput_con">
              <el-input  :placeholder="$t('form.phone')" v-model="userRegister.mobile"  prefix-icon=" icon iconfont icon-yidongduanicon-"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="iput_psd">
            <ux-password class="pwd_ux" ref="pwd" v-model="userRegister.password" :pwdLengthRange="'6~10'"></ux-password>
          </el-form-item>
          <el-form-item prop="confirmPassword" class="iput_psd">
            <el-input  :placeholder="$t('form.confirmPassword')" type="password" v-model="userRegister.confirmPassword" prefix-icon=" icon iconfont icon-querenmima" ></el-input>
          </el-form-item>
          <el-form-item class="btn" >
            <el-button class="denglu" type="success" @click="submit('registerFormRef')">{{$t('button.submit')}}</el-button>
            <el-button class="zhuce" type="info" @click="cancleRrgister('registerFormRef')">{{$t('button.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- /注册区域 -->

      <!-- 切换背景区域 -->
      <div class="bg_change">
        <div class="img1" v-for="(item,id) in bgImages" :key="id" @click="changeBg(item)">
          <img :src="item.src" alt="">
        </div>
      </div>
      <!-- /切换背景区域 -->


    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import JSONbig from 'json-bigint'
import { now } from 'moment';
import {
    checkStrong,
    pwdLength610 
} from '../../utils/mUtils';
import { setUserToken } from '../../utils/auth/auth-token.js'
import stIdentify from '../../components/st-identify/st-identify.vue';
export default {
  components: { stIdentify },
  name: 'Login',
  data () { 
    let validatePassword = (rule, value, callback) => {
        if (value == '' && this.subBtn == true) {
          callback(new Error(this.$i18n.t('errorMsg.pleaseInputAPassword')));
        } else if (pwdLength610(value) == false || checkStrong(value) == 1) {
          callback(new Error(this.$i18n.t('errorMsg.thePasswordDoesNotMeetTheRequirements')))
        } else {
          callback();
        }
    }
    let validateConfirmPassword = (rule, value, callback) => {
        if (value == '' && this.subBtn == true) {
          callback(new Error(this.$i18n.t('errorMsg.pleaseEnterTheConfirmationPassword')));
        } else if (value !== this.userRegister.password) {
          console.log(this.userRegister.password + value)
          callback(new Error(this.$i18n.t('errorMsg.twoPasswordEntriesAreInconsistent')));
        } else {
          callback();
        }
    }
    return {
      userLogin: {
        // mobile: '13911111111', // 手机号
        // code: '246810', // 密码
        mobile: '18329162570', // 手机号
        password: '123456.', // 密码
        agree: false // 是否同意协议
      },
      userRegister: {
        mobile: '18329162570', // 手机号
        password: '', // 密码
        confirmPassword:'',//确认密码
      },

      loginFlag:true,//登录状态
      Qrflag:true,//二维码显示状态
      defaultindex:0,//默认一个数组索引[0]图片
      // 验证码初始值
      identifyCode: '1234',
      // 验证码的随机取值范围
      identifyCodes: '1234567890',

      bgImages:[
        {id:1,src:require("@/assets/images/timg2.gif")},
        {id:2,src:require("@/assets/images/bg2.jpg")},
        {id:3,src:require("@/assets/images/bg3.jpg")},
        {id:4,src:require("@/assets/images/bg4.jpg")},
        {id:5,src:require("@/assets/images/bg6.jpg")}
      ],
      loginLoading:false,
      subBtn: false,
      info:[],//零时保存注册对象
      //表单验证规则
      loginRules: { 
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请你输入密码', trigger: 'blur' },
          { min: 6,max: 10, message: "密码长度在3到6个字符串", trigger: 'blur' }
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
      },
      registerRules:{
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        password: [{
          required: true,
          validator: validatePassword,
          trigger: ['blur']
        }],
        confirmPassword: [{
          required: true,
          validator: validateConfirmPassword,
          trigger: 'change'
        }]
      },
    }
  },
  watch: {
    'userRegister.password'(newVal, oldVal) {
        if (newVal != oldVal) {
            this.$refs['registerFormRef'].clearValidate('password')
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
    //登录
    login () {
      this.loginLoading = true
      
      /* 在这里就模拟下刚才新用户注册填写的信息进行登录，信息被保存在localStorage */
      let registeredInfo = JSON.parse(localStorage.getItem('registerData'))
      // console.log(registeredInfo)
      let flag=registeredInfo.find(item=> item.mobile===this.userLogin.mobile && item.passWord===this.userLogin.passWord);
      if(!flag) {
             this.$message({
            message: '登录失败,密码信息或账号信息填错！',
            type: 'error'
          })
      }else{
        setUserToken('token','st')
        this.$router.push('/st_template')
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
      }
      this.loginLoading = false
    },
    Qr_open() {
      this.Qrflag = !this.Qrflag
    },
    //进入注册
    register() {
      this.loginFlag = !this.loginFlag
    },
    //提交注册
    submit(formName) {
      /*
        目前实现一个本地注册，主要采用本地存储机制，每次注册都会在本地创建一个用户信息，到时候判断用户是否存在本地，来进行登录。
        当用户输入的数据保存在localStorage中，当用户登录的时候就会采用这个注册过的手机号进行登录。
        本身实现注册就是调用注册接口将输入的信息保存到对应新用户的数据库中，
        当这个用户进行登录时，就调用登录接口，及后端处理的注册新用户有登录权限
      */
      this.subBtn = true;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.subBtn = false;
            let registerInfo = {mobile:this.userRegister.mobile,password:this.userRegister.password}
            this.info.push(registerInfo)
            localStorage.setItem('registerData',JSON.stringify(this.info))
            this.$message('恭喜您！注册成功')
            this.loginFlag = true
          } else {
              this.subBtn = false;
              return false;
          }
      })
      
      
    },
    //取消注册
    cancleRrgister(formName) {
          this.loginFlag = true
          this.$refs[formName].resetFields();
          this.$refs.pwd.resetPwd();
          this.subBtn = false;
          this.Qrflag = true      
    },
    //切换背景
    changeBg (item) {
      // console.log(item.id)
      this.defaultindex = item.id-1
      
    },


    // 点击验证码刷新验证码
    changeCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum (min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode (data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    }

  },
  mounted() { 
    let data = this.$md5(this.passWord)
    console.log(data)// e10adc3949ba59abbe56e057f20f883e
    // 刷新页面就生成随机验证码
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  }

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
      .login_box{
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
        .lg_header{
          height: 20%;
          // background-color: pink;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconfont{
            font-size: 30px;
            color: #fff;
            cursor: pointer;
          }
          .iconfont:hover{
            color: rgb(102, 101, 93);
          }
          .iconfont:active{
            color: rgb(238, 78, 78);
          }

        }
        .Qr_class{
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          cursor: pointer;
          .Qr_note{
            color: #fff;
            font-size: 14px;
            margin-top: 10px;
            .register_{
              color: rgb(238, 110, 51);
            }
            .register_:hover{
              color: rgb(44, 235, 60); 
            }
          }
        }
        .login-form{
          height: 80%;
          // background-color: purple;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          .pwd_ux{
            width: 300px;
          }
          .iput_con,.iput_psd,.xieyi{
            width: 300px;
          }
          .iput_identify,.el-form-item__content{
            display: flex;
            justify-content: space-around;
            width: 300px;
          }
          .input_it{
            margin-right: 10px;
            box-sizing: border-box;
          }
          .btn .el-form-item__content{
            width: 300px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .btn .denglu{
            margin-right: 150px;
            width: 70px;
            height: 40px;
            text-align: center;
          }
          .btn .zhuce{
            width: 70px;
            height: 40px;
            text-align: center;
          }
        }
      }
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
        .img1{
          width: 50px;
          height: 50px;
          img{
            width: 100%;
            height: 100%;
            border: 2px solid #fff ;
            border-radius: 50%;
            background-size:100% 100%;
          }
          img:hover{
            cursor: pointer;
          }
        }
  } 
      
</style>