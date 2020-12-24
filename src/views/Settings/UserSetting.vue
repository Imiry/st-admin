<!--
 * @Author: sitao
 * @Date: 2020-12-24 09:22:18
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-24 16:23:55
-->
<template>
  <div class="userSetting_container">
    <!-- {{defaultUrl +avtorPath}} -->
    <el-row :gutter="10">
      <el-col :span="10">
        <div class="grid-content1">
          <div class="avtor_left">
            <div class="user_avtor">
              <img :src="exist" alt="">
            </div>
            <el-button class="eadit" size="mini" @click="eaditUser" type="success">编辑资料</el-button>
            <el-button type="info" size="mini" @click="changeAvtor">更改头像</el-button>
            <div class="mylink">
              <div class="link_title">我的链接:</div>
              <div class="mylink_con">
                <a href="https://github.com/"><img src="../../assets/images/link/github.png" alt=""></a>
                <a href="https://wx.qq.com/"><img src="../../assets/images/link/chat.png" alt=""></a>
                <a href="https://www.csdn.net/"><img src="../../assets/images/link/csdn.png" alt=""></a>
                <a href="https://music.163.com/"><img src="../../assets/images/link/wy.png" alt=""></a>
              </div>
              
            </div>
            <div class="my_tag">
              <div class="tag_title">我的标签:</div>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-tag v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-tag>
            </div>
          </div>
          <div class="user_right">
            <div class="pre_title">个人信息:</div>
            <el-form ref="form" :label-position="'right'" :model="user" label-width="80px">
              <el-form-item label="名称:">
                <div>{{user.name}}</div>
              </el-form-item>
              <el-form-item label="性别:">
                <div>{{user.sex}}</div>
              </el-form-item>
              <el-form-item label="密码:">
                <div>{{user.password}}</div>
              </el-form-item>
              <el-form-item label="邮箱:">
                <div>{{user.email}}</div>
              </el-form-item>
              <el-form-item label="微信:">
                <div>{{user.chat}}</div>
              </el-form-item>
              <el-form-item label="简介:">
                <div div>{{user.synopsis}}</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content2"></div>
      </el-col>
    </el-row>

    <!-- 剪裁组件弹窗 -->
    <el-dialog
        title="裁切封面"
        :visible.sync="cropperModel"
        width="950px"
        :modal-append-to-body='false'
        center
       >
     <st-cropperImage
         :Name="cropperName"
         @getpicPath = "getpicPath"
         ref="child">
     </st-cropperImage>
    </el-dialog>
    <!-- 剪裁组件弹窗 -->

    <!-- 编辑用户资料弹窗 -->
    <el-dialog
      title="用户编辑"
      :visible.sync="eaditVisible"
      width="30%"
      :modal-append-to-body='false'
      :before-close="handleCloseeadit">
      <el-form ref="form" :label-position="'right'" :model="eaditUsered" label-width="80px">
        <el-form-item label="名称:">
          <el-input v-model="eaditUsered.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-input v-model="eaditUsered.sex"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="eaditUsered.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="eaditUsered.email"></el-input>
        </el-form-item>
        <el-form-item label="微信:">
          <el-input v-model="eaditUsered.chat"></el-input>
        </el-form-item>
        <el-form-item label="简介:">
          <el-input v-model="eaditUsered.synopsis"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="eaditVisible = false">取 消</el-button>
        <el-button type="primary" @click="eaditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户资料弹窗 -->
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
  name: 'UserSetting',
  data() { 
    return {
      user:{},
      eaditUsered:{},
      //裁切图片参数
      cropperModel:false,
      cropperName:'',
      defaultUrl:require('../../assets/images/swiper/avtor.jpg'),
      
      //标签
      dynamicTags: ['电影', '旅游', '篮球'],
      inputVisible: false,
      inputValue: '',

      //编辑弹窗
      eaditVisible:false
    }
  },
  computed:{
    ...mapState({
      avtorPath: state => state.user.avtorPath,
      userInfoData: state => state.user.userInfo
    }),
     exist() {
       if(this.avtorPath){
         this.defaultUrl = this.avtorPath
         return this.defaultUrl
       }else{
         return this.defaultUrl
       }
     }

  },
  mounted() {
    this.user = this.userInfoData
  },
  methods:{
    ...mapActions({
      usersetting:'usersettingAction',
      userinfo:'userinfoAction'
    }),
    changeAvtor() {
      this.cropperModel = true
    },
    getpicPath(url) {
      console.log(url)
      this.usersetting(url)
      this.cropperModel = false;
    },
    //加标签--------------
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    //-------------------

    //编辑用户
    eaditUser() {
      this.eaditVisible = true;
      this.eaditUsered = JSON.parse(JSON.stringify(this.user))        //vuex里面的对象数据拿到之后赋值给编辑对象，然后编辑数据会跟着更改，因为引用该关系，要用深拷贝来拿数据，再进行修改
    },
    handleCloseeadit(){
      this.$confirm('确认关闭？')
      .then(_ => {
        this.eaditVisible = false;
        done();
      })
      .catch(_ => {});
    },

    //编辑确定
    eaditConfirm() {
      this.userinfo(this.eaditUsered);
      this.user = this.userInfoData
      this.eaditVisible = false;
    }
  }
 }
</script>

<style lang="scss" >
  .userSetting_container{
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 5px;
    }
    .grid-content1,.grid-content2 {
      border-radius: 5px;
      height: 700px;
      background-color: #fff;
    }
    .grid-content1{
      display: flex;
      justify-content: space-around;
      .avtor_left{
        flex: 40%;
        height: 600px;
        margin-top: 50px;
        border-right: 1px solid rgba(0,0,0,.1);
        
        position: relative;
        .user_avtor{
          position: absolute;
          width: 80px;
          height: 80px;
          top: 50px;
          right: 20px;
          background-color: rgb(231, 192, 192);
          border-radius: 50%;
          border: 1px solid #eee;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .el-button{
          position: absolute;
          top: 150px;
          right: 20px;
        }
        .eadit{
          position: absolute;
          top: 200px;
          right: 20px;
        }
        .mylink{
          width: 100%;
          .link_title{
            margin-bottom: 20px;
            margin-left: 10px;
            font-weight: bold;
            font-size: 14px;
          }
          .mylink_con{
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          position: absolute;
          top: 280px;          
          // height: 100px;

          // background-color: rgb(51, 204, 128);
        }
        .my_tag{
          height: 200px;
          left: 10px;
          // background-color: rgb(121, 71, 71);
          position: absolute;
          bottom: 30px;
          overflow: hidden;
          .tag_title{
            margin-bottom: 15px;
            font-weight: bold;
          }
          .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
          }
          .button-new-tag {
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            width: 80px;
            margin-left: 10px;
            vertical-align: center;
          }
        }
      }
      .user_right{
        flex: 60%;
        // background-color: rgb(171, 206, 186);
        position: relative;
        .pre_title{
          font-weight: bold;
          font-size: 14px;
          position: absolute;
          top: 100px;
          left: 10px;
        }
        .el-form{
          position: absolute;
          top: 150px;
        }
        
        
      }
    }

  }
</style>