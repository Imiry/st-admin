import { Button } from 'mint-ui';
<!--
 * @Author: sitao
 * @Date: 2020-12-23 09:57:14
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-23 17:19:41
 * @ vuex-联系todolist
-->
<template>
  <div class="template_container">
    <el-card class="card_con">
      <div class="todos">
        <div class="header_input">
          <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          <el-input v-model="userDec" placeholder="请输入简介"></el-input>
          <el-button class="btn" type="primary" @click="addThing">添加</el-button>
        </div>
        <div class="content_caozuo">
          <el-table class="m-t-10" :data="todoData" style="width: 100%" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}"   max-height="350" stripe >
            <el-table-column label="" width="55px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.complateStatus"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="index" >
              <template slot-scope="scope">
                <span>{{scope.$index}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="用户名" ></el-table-column>
            <el-table-column prop="dec" label="简介" ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" type="success" @click="editByid(scope.row,scope.$index)"></el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteByid(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="xianshi">
          <div class="tongji">已完成{{complatedNum}}/总计{{totalNum}}</div>
          <el-button class="btn_complated" type="primary" @click="complated" >已完成</el-button>
          <el-button class="btn_complated" type="warning" @click="complating">未完成</el-button>
          <el-button class="btn_complated" type="success" @click="total">全部</el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="30%" title="编辑" :before-close="handleClose" :modal-append-to-body='false'>
          <div class="m-b-10">用户名</div><el-input class="m-b-20" v-model="changeName" placeholder="请输入用户名"></el-input>
          <div class="m-b-10">简介</div><el-input  v-model="changeDec" placeholder="请输入简介"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmChange">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
  name: 'Template5',
  data() { 
    return {
      todoData:[],
      // complateStatus:false,
      userName:'',
      userDec:'',
      changeName:'',
      changeDec:'',
      nId:0, //临时保存id
      dialogVisible:false //编辑模态框
    }
  },
  mounted(){
    this.todoData = this.todolist
  },
  computed:mapState({
    todolist: state => state.todo.todoData,
    complatedNum:state => { //已完成数量
      return state.todo.todoData.filter(item =>item.complateStatus).length
    },
    totalNum:state => {  //总计
      return state.todo.todoData.length
    },
    complated_list:state => {  //已完成数据
      return state.todo.todoData.filter(item => item.complateStatus)
    },    
    complating_list:state => {  //未完成数据
      return state.todo.todoData.filter(item => !item.complateStatus)
    }
    

  }),
  methods:{
    ...mapActions({
      addItem:'addtodoAction',
      deleteItem:'deleteAction'
    }),
    //添加数据
    addThing(){
      if(!this.userName&&!this.userDec){
        this.$message({
          type: 'warning',
          message: '请输入数据'
        })
      }else{
        let item = {name:this.userName,dec:this.userDec}
        this.addItem(item)
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.userName = '',
        this.userDec = ''
      }

    },
    //删除数据
    deleteByid(id){
      this.deleteItem(id)
    },
    //编辑数据
    editByid(scope,id) {
      this.dialogVisible = true;
      this.changeName = scope.name;
      this.changeDec = scope.dec;
      this.nId = id
    },
    //确定编辑
    confirmChange() {
      this.todoData[this.nId].name = this.changeName
      this.todoData[this.nId].dec = this.changeDec
      this.dialogVisible = false
    },
    //筛选已完成
    complated() {
      this.todoData = this.complated_list
    },
    //筛选未完成
    complating() {
      this.todoData = this.complating_list
    },
    total() {
      this.todoData = this.todolist 
    }
  }
 }
</script>

<style lang="scss" >
  .template_container{
    .todos{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .header_input{
        height: 100px;
        line-height: 100px;
        // text-align: center;
        // background-color: rgb(218, 190, 190);
        border-bottom: 1px solid #eee;
        .el-input{
          width: 200px;
          .el-input__inner{
            height: 40px;
            border-radius: 5px;
          }
        }
        .el-button{
          width: 100px;
          height: 40px;
          margin-left: 20px;
          font-weight: bold;
        }
        .el-input:nth-child(2){
          width: 300px;
          margin-left: 20px;
        }
      }
      .xianshi{
        margin-top: 20px;
        display: flex;
        .tongji{
          background-color: rgb(160, 142, 194);
          width: 200px;
          height: 40px;
          color: #fff;
          line-height: 40px;
          font-size: 14px;
          font-weight: bold;;
          text-align: center;
          border-radius: 5px;
        }
        .btn_complated{
          margin-left: 20px;
          height: 40px;
          font-weight: bold;
        }
      }
    }
  }
</style>