<template>
  <div class="element_container">
    <!-- 面包屑 -->
    <el-breadcrumb class="el-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/st_welcome' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item >{{$t('nav.element')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('others_subnav.St_element')}}</el-breadcrumb-item>
    </el-breadcrumb>  

    <!-- 卡片 -->
    <el-row :gutter="20">
      <el-col :span="13">
        <st-card :cardData="carddata">
          <!-- <div class="textBtn">  //用下面写法不用考虑布局
            <st-button :buttons="textButtons"></st-button>
          </div> -->
          <el-row>
            <st-button :buttons="textButtons"></st-button>
          </el-row>
          <el-row>
            <st-button :buttons="defaultButtons"></st-button>
          </el-row>       
        </st-card>
      </el-col>
      
      <el-col :span="11">
        <el-card class="box-card1">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>

        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {

  name: 'Element',
  data() { 
    return {
      carddata:{
        cardname:'element-按钮',
        btntype:'primary',
        icon:"el-icon-share",
        size:"mini"
      },
      textButtons:[
        {
          type:"primary",
          label:"创建",
          icon:"el-icon-circle-plus-outline",
          click:this.add
        },
        {
          type:"primary",
          label:"编辑",
          icon:"el-icon-edit-outline",
          click:this.edit
        },
        {
          type:"primary",
          label:"上传",
          icon:"el-icon-upload el-icon--right",
          click:this.importExcel
        },
        {
          type:"primary",
          label:"下载",
          icon:"el-icon-download",
          click:this.axportExcel
        },
        {
          type:"primary",
          label:"",
          icon:"el-icon-share",
          click:this.share
        },
        {
          type:"primary",
          label:"",
          icon:"el-icon-delete",
          click:this.delete
        },
        {
          type:"primary",
          label:"",
          icon:"el-icon-search",
          click:this.search
        }
      ],
      defaultButtons:[
        {
          type:"",
          label:"默认按钮",
          click:() => {
            this.$message('默认按钮')
          }
        },
        {
          type:"primary",
          label:"主要按钮",
          click:() => {
            this.$message('主要按钮')
          }
        },
        {
          type:"success",
          label:"成功按钮",
          click:() => {
            this.$message('成功按钮')
          }
        },
        {
          type:"info",
          label:"信息按钮",
          click:() => {
            this.$message('信息按钮')
          }
        },
        {
          type:"warning",
          label:"警告按钮",
          click:() => {
            this.$message('警告按钮')
          }
        },
        {
          type:"danger",
          label:"危险按钮",
          click:() => {
            this.$message('危险按钮')
          }
        }
      ]
    }
  },
  methods:{
    add(){
      this.$message('add')
    },
    edit(){
      this.$message('edit')
    },
    importExcel(){
      this.$message('importExcel')
    },
    axportExcel(){
      this.$message('axportExcel')
    },
    share(){
      this.$message('share')
    },
    delete(){
      this.$message('delete')
    },
    search(){
      this.$message('search')
    }
  }
 }
</script>

<style lang="scss" >
  .element_container{
    height: 100%;
    .el-breadcrumb{
      margin-bottom: 20px;
    }
    .el-row{
      margin-bottom: 10px;
    }

  }
</style>