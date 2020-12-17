
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
          <el-form-item prop="code" class="iput_psd">
            <el-input  placeholder="请输入密码" v-model="userLogin.code" prefix-icon=" icon iconfont icon-zu" show-password></el-input>
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
          <el-form-item prop="code" class="iput_psd">
            <el-popover
              placement="right"
              width="400"
              trigger="hover"
              >
              <div class="text-color f-s-12">
                <div>
                  <span v-show="pwdLengthlogin === null">
                    <i class="iconfont icon-gantanhao f-s-14 "></i>
                  </span>
                  <span v-show="pwdLengthlogin">
                    <i class="iconfont icon-chenggong1 success"></i>
                  </span>
                  <span v-show="!pwdLengthlogin && pwdLengthlogin !== null">
                    <i class="iconfont icon-shibai danger"></i>
                  </span>
                  {{ $t("errorMsg.passwordLengthIsBetween3And6") }}
                </div>
                <div class="m-t-10">
                  <span v-show="pwdLevel == 0">
                    <i class="iconfont icon-gantanhao f-s-14"></i>
                  </span>
                  <span v-show="pwdLevel == 2 || pwdLevel == 3 || pwdLevel == 4">
                    <i class="iconfont icon-chenggong1 success"></i>
                  </span>
                  <span v-show="pwdLevel == 1 ">
                    <i class="iconfont icon-shibai danger"></i>
                  </span>
                  {{
                  $t(
                  "errorMsg.containAtLeastTwoCombinationsOfNumbers/Uppercase/LowercaseLetters/Characters"
                  )
                  }}
                </div>
                <div class="m-t-10">
                  {{$t('form.passwordStrength')}}:
                  <span
                    class="pwd-tip-style"
                    :style="{ backgroundColor: lowBgColor }"
                  ></span>
                  <span class="pwd-tip-style" :style="{ backgroundColor: midBgColor }"></span>
                  <span class="pwd-tip-style" :style="{ backgroundColor: highBgColor }"></span>
                  {{ safeMsg }}
                </div>
              </div>
              <el-input slot="reference"  :placeholder="$t('form.password')" v-model="userRegister.code" prefix-icon=" icon iconfont icon-zu" show-password></el-input>
            </el-popover>
          </el-form-item>
          <el-form-item prop="codeCirfim" class="iput_psd">
            <el-input  :placeholder="$t('form.confirmPassword')" type="password" v-model="userRegister.codeCirfim" prefix-icon=" icon iconfont icon-querenmima" ></el-input>
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
    pwdLengthlogin 
} from '../../utils/mUtils';
export default {
  name: 'Login',
  data () { 
    let validateConfirmPassword = (rule, value, callback) => {
        if (value == '') {
            callback(new Error(this.$i18n.t('errorMsg.pleaseEnterTheConfirmationPassword')));
        } else if (value !== this.userRegister.code) {
            callback(new Error(this.$i18n.t('errorMsg.twoPasswordEntriesAreInconsistent')));
        } else {
            callback();
        }
    }
    return {
      userLogin: {
        // mobile: '13911111111', // 手机号
        // code: '246810', // 密码
        mobile: '', // 手机号
        code: '', // 密码
        agree: false // 是否同意协议
      },
      userRegister: {
        mobile: '', // 手机号
        code: '', // 密码
        codeCirfim:'',//确认密码
      },

      pwdLevel: 0,
      pwdLengthlogin: null,
      safeMsg: '',
      lowBgColor: '#dcdcdc',
      midBgColor: '#dcdcdc',
      highBgColor: '#dcdcdc',

      loginFlag:true,//登录状态
      Qrflag:true,//二维码显示状态
      defaultindex:0,//默认一个数组索引[0]图片
      bgImages:[
        {id:1,src:require("@/assets/images/timg2.gif")},
        {id:2,src:require("@/assets/images/bg2.jpg")},
        {id:3,src:require("@/assets/images/bg3.jpg")},
        {id:4,src:require("@/assets/images/bg4.jpg")},
        {id:5,src:require("@/assets/images/bg6.jpg")}
      ],
      loginLoading:false,
      //表单验证规则
      loginRules: { 
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
      },
      registerRules:{
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
        ],
        code: [{
          required: true,
          message: this.$i18n.t('errorMsg.pleaseInputAPassword'),
          trigger: 'blur'
        }],
        codeCirfim: [{
          required: true,
          validator: validateConfirmPassword,
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    "userRegister.code"(newVal, oldVal) {
      // console.log(newVal)
        this.pwdLevel = checkStrong(newVal);
        this.pwdLengthlogin = pwdLengthlogin(newVal);
        if (this.pwdLevel == 2) {
            this.safeMsg = this.$i18n.t('form.weak');
            this.lowBgColor = '#ff460f';
            this.midBgColor = '#dcdcdc';
            this.highBgColor = '#dcdcdc';
        } else if (this.pwdLevel == 3) {
            this.safeMsg = this.$i18n.t('form.moderate');
            this.lowBgColor = '#ff6a00';
            this.midBgColor = '#ff6a00';
            this.highBgColor = '#dcdcdc';
        } else if (this.pwdLevel == 4) {
            this.safeMsg = this.$i18n.t('form.strong');
            this.lowBgColor = '#0a9e00';
            this.midBgColor = '#0a9e00';
            this.highBgColor = '#0a9e00'
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
      
      /* 在这里就模拟下刚才新用户注册填写的信息进行登录，信息被保存在sessionStorage */
      let registerPhone = sessionStorage.getItem('registerPhone')
      let registerCode = sessionStorage.getItem('registerCode')
      if(this.userLogin.mobile == registerPhone && this.userLogin.code == registerCode){
        this.$router.push('/st_template')
      }
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
        目前实现一个本地注册，主要采用回话存储机制，当用户输入数据的时候，
        当用户输入的数据保存在sessionstorey中，当用户登录的时候就会采用这个注册过的手机号进行登录。
        本身实现注册就是调用注册接口将输入的信息保存到对应新用户的数据库中，
        当这个用户进行登录时，就调用登录接口，及后端处理的注册新用户有登录权限
      */
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 表单验证通过
            console.log(this.userRegister.code)
            sessionStorage.setItem('registerPhone',this.userRegister.mobile)
            sessionStorage.setItem('registerCode',this.userRegister.code)
            this.$message('恭喜您！注册成功')
            this.loginFlag = true
          } else {
              return false;
          }
      })
      
      
    },
    //取消注册
    cancleRrgister(formName) {
      this.$confirm('是否退出注册！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '没有账号的小朋友需要注册哦！!'
          });
          this.loginFlag = true
          this.$refs[formName].resetFields();
          this.Qrflag = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '继续你的表演！'
          });          
        });
      
    },
    //切换背景
    changeBg (item) {
      // console.log(item.id)
      this.defaultindex = item.id-1
      
    }
  },

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
          .iput_con,.iput_psd,.xieyi{
            width: 300px;
          }
          .btn .el-form-item__content{
            width: 300px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .btn  .denglu{
            margin-right: 150px;
            width: 70px;
            height: 40px;
            text-align: center;
          }
          .btn  .zhuce{
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