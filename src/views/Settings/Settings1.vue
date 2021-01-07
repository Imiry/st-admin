<!--
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-05 13:46:25
-->
<template>
  <div class="settings_container">
    <el-card class="card_con">
      <div class="create_step">
        <el-steps :space="500" :active="active" finish-status="success" align-center>
          <el-step :title="$t('steps.userInfo')"></el-step>
          <el-step :title="$t('steps.picVrify')"></el-step>
          <el-step :title="$t('steps.createSuccess')"></el-step>
        </el-steps>
      </div>
      <div class="create_form">
        <!-- 个人信息 -->
        <el-form v-if="active == 0" :model="form" ref="form" :rules="rules" label-width="100px" class="person_from">
          <el-button type="success" size="mini" class="m-l-40 m-b-40" @click="dialogVisible = true">{{$t('button.findUserInfos')}}</el-button>
          <el-form-item :label="$t('form.userName')" prop="name" >
            <el-input  v-model="form.name" prefix-icon=" icon iconfont icon-yidongduanicon-" :placeholder="$t('formInput.userName_input')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.email')" prop="email" >
            <el-input  v-model="form.email" prefix-icon=" icon iconfont icon-youxiang" :placeholder="$t('formInput.email_iput')" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password')" prop="password">
            <ux-password ref="pwd" v-model="form.password" :pwdLengthRange="'6~10'"></ux-password>
          </el-form-item>
          <el-form-item :label="$t('form.confirmPassword')" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" prefix-icon=" icon iconfont icon-querenmima" :placeholder="$t('form.confirmPassword')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('form')">{{$t('button.submit')}}</el-button>
            <el-button type="danger" @click="reset('form')">{{$t('button.cancel')}}</el-button>
          </el-form-item>
        </el-form>
        <!-- 个人信息 -->

        <!-- 图形验证 -->
        <div v-if="active == 1">
          <el-button @click="open">{{$t('steps.picVrify')}}</el-button>
          <Vcode :show="isShow" @success="success" @close="close" />
        </div>
        <!-- 图形验证 -->

        <!-- 创建成功 -->
        <div v-if="active == 3">
          <el-button class=" " type="primary" @click="backCreate">创建用户</el-button>
          <el-table class="m-t-10" :data="adminInfo" style="width: 100%;" max-height="350" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}"   stripe >
              <el-table-column prop="name" label="用户名" width="180">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="180">
              </el-table-column>
              <el-table-column prop="password" label="密码">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
           
          </el-table>       
        </div>
        <!-- 创建成功 -->
      </div>
      <!-- 用户信息区域 -->
      <el-dialog title="用户信息" :visible.sync="dialogVisible"  :modal-append-to-body='false'>
        <el-table class="m-t-10" :data="InfoData" style="width: 100%" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}" max-height="350"   stripe >
          <el-table-column prop="name" label="用户名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="password" label="密码">
          </el-table-column>  
          </el-table>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode"
import {
    checkStrong,
    pwdLength610
} from '../../utils/mUtils.js';
import { mapActions,mapState } from 'vuex'
export default {
  name: 'Settings',
  components:{
    Vcode
  },
  computed:mapState({
    InfoData: state => state.admin.adminInfo
  }),
  data() {
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
        } else if (value !== this.form.password) {
            callback(new Error(this.$i18n.t('errorMsg.twoPasswordEntriesAreInconsistent')));
        } else {
            callback();
        }
    }
    let validateEmail = (rule,value,callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error(this.$i18n.t('errorMsg.incorrectEmailFormat')))
      }else if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error(this.$i18n.t('errorMsg.incorrectEmailFormat')))
      }
    }
    return {
      subBtn: false,
      form: {
        name:"",
        email:'',
        password: '',
        confirmPassword: '',
      },
      active:0,
      isShow:false,
      dialogVisible:false,//模态框状态
      adminInfo:[
        // { name:'admin',email:'123456@163.com', password: '123456.'},
        // { name:'admin123',email:'12345678@163.com', password: '123456.'},
        // { name:'admin',email:'123456@163.com', password: '123456.'},
        // { name:'admin123',email:'12345678@163.com', password: '123456.'},
        // { name:'admin',email:'123456@163.com', password: '123456.'},
        // { name:'admin123',email:'12345678@163.com', password: '123456.'},
        // { name:'admin',email:'123456@163.com', password: '123456.'},
        // { name:'admin123',email:'12345678@163.com', password: '123456.'}
      ],
      rules: {
        name: [{
            required: true,
            message:this.$i18n.t('errorMsg.pleaseEnterUserName'),
            trigger: ['blur']
        }],
        email: [{
            required: true,
            validator:validateEmail,
            trigger: ['blur']
        }],
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
    'form.password'(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$refs['form'].clearValidate('password')
      }
    }
  },
  methods: {
    ...mapActions(
      { addAmin: 'addadminAction' }
    ),
    submit(formName) {
      this.subBtn = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let info = { name:this.form.name,email:this.form.email,password:this.form.password }
          this.addAmin(info)
          this.subBtn = false;
          this.active = 1    
        } else {
          this.subBtn = false;
          return false;
        }
      })
    },
    reset(formName) {
        this.$refs[formName].resetFields();
        this.$refs.pwd.resetPwd();
        this.subBtn = false;
    },
    open() {
      this.isShow = true;
    },
    // 用户通过了验证
    success(msg) {
      this.active = 2
      setTimeout(() => {
        this.active = 3
        this.adminInfo = this.InfoData
      }, 1000);
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },

    //返回继续创建用户
    backCreate() {
      this.active = 0
      
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
 }
</script>

<style lang="scss" >
  .settings_container{
    ::-webkit-scrollbar{
      display:none;
    }
    .card_con{
      height: 620px;
      .create_step{
        width: 80%;
        height: 100px;
        // background-color: rgb(158, 50, 50);
        margin: 10px auto;
        border-bottom: 1px solid #eee;

      }
      .create_form{
        width: 80%;
        height: 450px;
        // background-color: rgb(43, 170, 92);
        margin: -10px auto;
        padding: 40px 90px 0 90px;
        box-sizing: border-box;
        .person_from .el-input{
          width: 40%;
        }
      }
    }
  }
</style>