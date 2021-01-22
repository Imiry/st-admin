<!--
 * @Author: sitao
 * @Date: 2021-01-21 14:06:22
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-22 18:20:51
-->
<!--
 * @Author: sitao
 * @Date: 2020-12-24 09:22:18
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-20 15:43:10
-->
<template>
  <div class="userSetting_container">
    <!-- {{defaultUrl +avtorPath}} -->
    <el-row :gutter="5">
      <el-col :span="4">
        <div class="grid-content1">
          <div class="avtor_left">
            <div class="user_avtor">
              <img :src="exist" alt="">
            </div>
            <!-- <el-button class="eadit" size="mini" @click="eaditUser" type="success">编辑资料</el-button>
            <el-button type="info" size="mini" @click="changeAvtor">更改头像</el-button> -->
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
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content2">
          <el-tabs v-model="tabName" class="tabs"  :tab-position="'left'" >
            <el-tab-pane label="登录信息*">
              <div class="title_lg" >登录信息*</div>
              <el-form class="m-t-40 lg_form" ref="lgUserform" require="true" :rules="loginUserRules"  :model="loginUser" label-width="80px">
                <el-form-item label="用户名:" prop="name">
                  <el-input v-model="loginUser.name" ></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="loginUser.password" ></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="loginUser.email" ></el-input>
                </el-form-item>
              </el-form>
              <el-button class="btn_lg" type="primary" @click="submitUser_lg('lgUserform')">提交</el-button>
            </el-tab-pane>
            <el-tab-pane name="base" label="基本信息*">
              <div class="title_lg">基本信息*</div>
              <el-form class="m-t-40 info_profile" ref="UserInfoForm" require="true"  :model="UserInfo" label-width="80px">
                <el-form-item label="职业:" prop="status">
                  <el-input v-model="UserInfo.status" ></el-input>
                </el-form-item>
                <el-form-item label="公司:" prop="company">
                  <el-input v-model="UserInfo.company" ></el-input>
                </el-form-item>
                <el-form-item label="居住地址:" prop="location">
                  <el-input v-model="UserInfo.location" ></el-input>
                </el-form-item>
                <el-form-item label="个人网站:" prop="website">
                  <el-input v-model="UserInfo.website" ></el-input>
                </el-form-item>
                <el-form-item label="github:" prop="github">
                  <el-input v-model="UserInfo.github" ></el-input>
                </el-form-item>
                <el-form-item label="微信:" prop="wechat">
                  <el-input v-model="UserInfo.wechat" ></el-input>
                </el-form-item>
                <el-form-item label="个人介绍:" prop="bio">
                  <el-input v-model="UserInfo.bio" ></el-input>
                </el-form-item>
                <el-form-item label="技能:" >
                  <el-input v-model="UserInfo.skills" ></el-input>
                  <!-- <el-tag class="m-l-5" v-for="(item,index) in UserInfo.skills" :key="index" >{{item}}</el-tag> -->
                </el-form-item>
                
                
              </el-form>
              <el-button class="btn_profile " type="primary" @click="submitUser_info">提交</el-button>
            </el-tab-pane>
            <el-tab-pane label="工作经验+">
              <div class="title_lg" >工作经验+</div>
              <el-button class="m-l-10" type="primary" @click="tabName = 'work'" circle icon="el-icon-search" size="mini"></el-button>
              <el-form class="m-t-40 info_profile" ref="workExpForm" require="true"  :model="workExp" label-width="80px">
                <el-form-item label="职业:" prop="title">
                  <el-input v-model="workExp.title" ></el-input>
                </el-form-item>
                <el-form-item label="公司:" prop="company">
                  <el-input v-model="workExp.company" ></el-input>
                </el-form-item>
                <el-form-item label="公司地址:" prop="location">
                  <el-input v-model="workExp.location" ></el-input>
                </el-form-item>
                <el-form-item label="date:" prop="date">
                  <el-input v-model="workExp.date" ></el-input>
                </el-form-item>
                <el-form-item label="工作描述:" prop="description">
                  <el-input v-model="workExp.description" ></el-input>
                </el-form-item>
              </el-form>
              <el-button class="btn_profile " type="primary" @click="submitWork_info">添加</el-button>
            </el-tab-pane>
            <el-tab-pane label="教育经历+">
              <div class="title_lg">教育经历+</div>
              <el-button class="m-l-10" type="primary" @click="tabName = 'edu'" circle icon="el-icon-search" size="mini"></el-button>
              <el-form class="m-t-40 info_profile" ref="eduInfoForm" require="true"  :model="eduInfo" label-width="80px">
                <el-form-item label="学校:" prop="school">
                  <el-input v-model="eduInfo.school" ></el-input>
                </el-form-item>
                <el-form-item label="学位:" prop="degree">
                  <el-input v-model="eduInfo.degree" ></el-input>
                </el-form-item>
                <el-form-item label="专业:" prop="fieldofstudy">
                  <el-input v-model="eduInfo.fieldofstudy" ></el-input>
                </el-form-item>
                <el-form-item label="date:" prop="date">
                  <el-input v-model="eduInfo.date" ></el-input>
                </el-form-item>
                <el-form-item label="学校描述:" prop="description">
                  <el-input v-model="eduInfo.description" ></el-input>
                </el-form-item>
              </el-form>
              <el-button class="btn_profile " type="primary" @click="submitEdu_info">添加</el-button>
            </el-tab-pane>
            <el-tab-pane name="work" label="工作#">
              <div class="title_lg" >工作资料</div>
              <el-table :data="workTimes" style="width: 100%" class="m-t-20">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="title" label="职位" ></el-table-column>
                <el-table-column prop="company" label="公司" ></el-table-column>
                <el-table-column prop="location" label="地址" ></el-table-column>
                <el-table-column prop="date" label="工作时间" ></el-table-column>
                <el-table-column prop="description" label="描述" ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="workEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="workDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane name="edu" label="教育#">
              <div class="title_lg" >教育资料</div>
              <el-table :data="eduTimes" style="width: 100%" class="m-t-20">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="school" label="学校" ></el-table-column>
                <el-table-column prop="degree" label="学位" ></el-table-column>
                <el-table-column prop="fieldofstudy" label="专业" ></el-table-column>
                <el-table-column prop="date" label="时间" ></el-table-column>
                <el-table-column prop="description" label="描述" ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="eduEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="eduDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    
    <!-- 工作资料弹窗 -->
    <el-dialog
      :modal="false"
      title="工作"
      :visible.sync="workDialogVisible"
      width="30%"
      :before-close="workClose">
      <el-form class="m-t-40 info_profile" ref="workExpForm_eadit" require="true"  :model="workExp" label-width="80px">
        <el-form-item label="职业:" prop="title">
          <el-input v-model="workExp.title" ></el-input>
        </el-form-item>
        <el-form-item label="公司:" prop="company">
          <el-input v-model="workExp.company" ></el-input>
        </el-form-item>
        <el-form-item label="公司地址:" prop="location">
          <el-input v-model="workExp.location" ></el-input>
        </el-form-item>
        <el-form-item label="date:" prop="date">
          <el-input v-model="workExp.date" ></el-input>
        </el-form-item>
        <el-form-item label="工作描述:" prop="description">
          <el-input v-model="workExp.description" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="workDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="workCirfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 工作资料弹窗 -->

    <!-- 教育资料弹窗 -->
    <el-dialog
      :modal="false"
      title="工作"
      :visible.sync="eduDialogVisible"
      width="30%"
      :before-close="eduClose">
      <el-form class="m-t-40 info_profile" ref="eduForm_eadit" require="true"  :model="eduInfo" label-width="80px">
        <el-form-item label="学校:" prop="school">
          <el-input v-model="eduInfo.school" ></el-input>
        </el-form-item>
        <el-form-item label="学位:" prop="degree">
          <el-input v-model="eduInfo.degree" ></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="fieldofstudy">
          <el-input v-model="eduInfo.fieldofstudy" ></el-input>
        </el-form-item>
        <el-form-item label="时间:" prop="date">
          <el-input v-model="eduInfo.date" ></el-input>
        </el-form-item>
        <el-form-item label="学校描述:" prop="description">
          <el-input v-model="eduInfo.description" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eduDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eduCirfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 教育资料弹窗 -->

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

   
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
  name: 'UserSetting',
  data() { 
    return {
      user:{},
      //用户的登录信息
      loginUser:{
        name:'st',
        password:"123456.",
        email:"123@163.com"
      },
      //用户的基本信息
      UserInfo:{
        status:"前端开发",
        company:'北京优炫软件公司',
        location:'北京',
        website:'www.baidu.com',
        github:'www.github/Imiry.com',
        wechat:'123456-----------',
        bio:'让数据更安全',
        skills:'',
      },
      //添加工作经验from
      workExp:{
        title:'xxx-xxx-xx',
        company:'xxxxxxxx',
        location:'北京昌平',
        date:'2018-2019',
        description:'xxxxxxxxxxx'
      },
      //添加教育经验from
      eduInfo:{
        school:'xxx-xxx-xx',
        degree:'xxxxxxxx',
        fieldofstudy:'计算机',
        date:'2018-2019',
        description:'xxxxxxxxxxx'
      },
      currentWork_id:'',
      currentEdu_id:'',

      //工作履历-删改查
      workTimes:[
        {
          title:'前端开发',
          company:'百度',
          location:'北京海淀西二旗',
          date:'2018-2019',
          description:'0000000'
        }
      ],
      workDialogVisible:false,
      eduDialogVisible:false,
      //教育履历-删改查
      eduTimes:[
        {
          school:'xxx-xxx-xx',
          degree:'xxxxxxxx',
          fieldofstudy:'计算机',
          date:'2018-2019',
          description:'xxxxxxxxxxx'
        }
      ],


      loginUserRules:{
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password:[
          { required: true,min: 7, max: 12, message: '长度在 7 到 12 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur'}
        ]
      },
      tabName:'base',   //el-tab-pane默认选中base
      
      
      //裁切图片参数
      cropperModel:false,
      cropperName:'',
      defaultUrl:require('../../assets/images/swiper/avtor.jpg'),
      //标签
      dynamicTags: ['电影', '旅游', '篮球','游戏'],
      inputVisible: false,
      inputValue: '',
      //编辑弹窗
      eaditVisible:false,
      //-----

    }
  },
  computed:{
    ...mapState({
      avtorPath: state => state.user.avtorPath,
      
    }),
    exist() {
       if(this.avtorPath){
         this.defaultUrl = this.avtorPath
         return this.defaultUrl
       }else{
         return this.defaultUrl
       }
    },

  },
  mounted() {
   this.getUserList();//获取当前的用户登录的信息
   this.getProfile();//获取当前的基本信息资料

  },
  methods:{
    ...mapActions({
      usersetting:'usersettingAction',
      userinfo:'userinfoAction'
    }),

    //调用接口获取当前的用户登录的信息
    async getUserList() {
      const { data:res } = await this.$http.get('/current')
      // console.log(res)
      let list = {
        name:res.user.user_name,
        email:res.user.user_email,
        password:res.user.user_pwd
      }
      this.loginUser = list
    },
    //修改用户登录信息
    submitUser_lg(from) {
      this.$refs[from].validate(async (valid) => {
        if(valid) {
          const { data:res } = await this.$http.post('/eadit',this.loginUser)
          // console.log(res)
          if(res.status == 200) return this.$message({type:'success',message:'提交成功'})
          this.$message({ type:'warning',message:'提交失败'})
        }
      })
    },
    //调用接口获取当前的基本信息资料
    async getProfile() {
      const { data:res } = await this.$http.get('/profile')
      // console.log(res)
      let info = {
        status:res[0].status,
        company:res[0].company,
        location:res[0].location,
        website:res[0].website,
        github:res[0].githubusername,
        wechat:res[0].social.wechat,
        bio:res[0].bio,
        skills:res[0].skills
      }
      this.workTimes = res[0].experience;
      this.eduTimes = res[0].education;
      this.UserInfo = info
    },

    //修改用户的基本信息
    async submitUser_info() {
      const { data:res } = await this.$http.post('/profile',this.UserInfo)
      // console.log(res)
    },
    //增加工作经验
    async submitWork_info(){
      const { data:res } = await this.$http.post('profile/experience',this.workExp)
      // console.log(res)
      if(res.status == 200) {
        this.workTimes = res.profile[0].experience;
        this.$message({type:'success',message:'添加成功'})
      }
     
    },

    //增加学校经历
    async submitEdu_info() {
       const { data:res } = await this.$http.post('profile/education',this.eduInfo)
      // console.log(res)
      if(res.status == 200) {
        this.eduTimes = res.profile[0].education
        this.$message({type:'success',message:'添加成功'})
      }  
    },

    


    //工作资料编辑-------------------
     workEdit(index, row) {
      // console.log(index, row);
      this.workDialogVisible = true
      this.workExp = {
        title:row.title,
        company:row.company,
        location:row.location,
        date:row.date,
        description:row.description
      }
      this.currentWork_id = row._id
    },
    async workCirfirm() {
      const { data:res } = await this.$http.put(`profile/experience?exp_id=${this.currentWork_id}`,this.workExp)
      console.log(res)
      this.workTimes = res.experience;
      this.workDialogVisible = false
    },
    //工作资料编辑-------------------

    
    //工作资料删除
    async workDelete(index, row) {
      // console.log(row._id);
      const { data:res } = await this.$http.delete(`profile/experience?exp_id=${row._id}`)
      this.workTimes = res.experience
      // console.log(res)
    },
    //关闭工作资料编辑弹窗
    workClose(done){
      done();
    },
    

    //教育资料编辑-------------------------
    eduEdit(index, row) {
      this.eduDialogVisible = true
      this.eduInfo = {
        school:row.school,
        degree:row.degree,
        fieldofstudy:row.fieldofstudy,
        date:row.date,
        description:row.description
      }
      this.currentEdu_id = row._id
    },
    async eduCirfirm() {
      const { data:res } = await this.$http.put(`profile/education?edu_id=${this.currentEdu_id}`,this.eduInfo)
      console.log(res)
      this.eduTimes = res.education;
      this.eduDialogVisible = false
    },
    //教育资料编辑-------------------------

    //教育资料删除
    async eduDelete(index, row) {
      // console.log(index, row);
      const { data:res } = await this.$http.delete(`profile/education?edu_id=${row._id}`)
      this.eduTimes = res.education
    },
    eduClose(done){
      done();
    },

    


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
      .avtor_left{
        height: 600px;
        border-right: 1px solid rgba(0,0,0,.1);
        position: relative;
        .user_avtor{
          position: absolute;
          width: 80px;
          height: 80px;
          top: 60px;
          right: 90px;
          border-radius: 50%;
          border: 1px solid #eee;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
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
          top: 210px;          

        }
        .my_tag{
          height: 200px;
          left: 10px;
          // background-color: rgb(121, 71, 71);
          position: absolute;
          top: 300px; 
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
      
    }
    .grid-content2{
      .tabs{
        width: 100%;
        box-sizing: border-box;
        // height: 100%;
        padding: 55px 0 0 60px;
        .title_lg{
          width: 80px;
          text-align: center;
          margin:20px 0 0 20px;
          border-bottom: 3px solid rgb(43, 172, 223); 
          display: inline-block;
        }
        .lg_form{width: 400px;}
        .info_profile{width: 500px;}
        .btn_lg{margin-left: 330px;}
        .btn_profile{margin-left: 430px;}
        
      }
    }

  }
</style>