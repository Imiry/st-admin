<template>
  <div class="Uxtable_container">
    <el-breadcrumb class="el-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/st_welcome' }">{{$t('nav.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item >{{$t('nav.others')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('others_subnav.Ux_Table')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <ux-table
      :border="border"
      :stripe="stripe"
      :total="total"
      :tableData="tableData"
      :loading="loading"
      :columnData="columnData"
      :pageOptions="pageOptions"
      :select_all="select_all"
      :select_single="select_single"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @toPage="toPage"
      @sortChange="sortChange"
      @selectAllData="selectAllData"
      @selectSinger="selectSinger"
    ></ux-table>
    <!-- <el-button type="success" @click="changezh">{{$t('change.zh')}}</el-button>
    <el-button type="success" @click="changeen">{{$t('change.en')}}</el-button> 
     -->
    <!-- dialog区域-->
    <ux-dialog
      :dialog_title="dialog_title"
      :dialog_visible="dialog_visible"
      :dialog_width="dialog_width"
      @handleClose="handleClose"
      @submit="submit"
      >
      <!--<div>这是一条弹出框</div>   可以插入文本 插入表单示例-->
      <el-form ref="demo-form" :label-position="labelPosition" :rules="rules" label-width="80px"  :model="formData">
        <el-form-item :label="$t('lable.name')" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.status')"   prop="status">
          <el-input  v-model="formData.status" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.create_time')" prop="create_time">
          <el-input  v-model="formData.create_time"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.usage')" prop="usage">
          <el-input  v-model="formData.usage"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.size')" prop="size">
          <el-input  v-model="formData.size"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.free_size')" prop="free_size">
          <el-input  v-model="formData.free_size"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.size_utils')" prop="size_utils">
          <el-input  v-model="formData.size_utils"></el-input>
        </el-form-item>
        <el-form-item :label="$t('lable.users')" prop="users">
          <!-- <el-input  v-model="formData.users"></el-input> -->
            <el-select v-model="select" size="mini">
                  <el-option
                    v-for="(select,index) in formData.users" 
                    :key="'select'+index"
                    :label="select"
                    :value="select"
                  >
                  </el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </ux-dialog>

    <h1>11</h1>
    <h1>11</h1>
    <h1>11</h1>
    <h1>11</h1>

    <h1>11</h1>
    <h1>11</h1>
    <h1>11</h1>

    <h1>11</h1>
    <h1>11</h1>
    <h1>11</h1>
    <h1>11</h1>
    <h1>11</h1>

    <h1>11</h1>
    <h1>11</h1>

    <h1>11</h1>

    <h1>11</h1>

    
  </div>
</template>

<script>
import moment from 'moment'
export default {
  
  name: "Uxtable",
  data() {
    return {
      loading: true, //表格loading
      border: false, //表格边框显示 默认true 显示边框
      stripe: true, //表格斑马线 默认false不显示
      total: 0, //表格分页总数据
      pageOptions: {
        //表格分页显示配置
        currentPage: 1, //当前第一页
        pageSize: 5, //每页显示条目数
      },
      //表格全选功能启用  默认不启用 启用此功能 需配@selectAllData回调
      select_all: true,
      //表格单选功能 默认不启用 启用此功能 需配合@selectSinger回调
      select_single: true,
      dialog_visible:false,
      dialog_width:'30%',
      dialog_title:this.$t('button.more'),
      labelPosition:'top', //dialog位置
      rules:{},//dialog的校验规则
      //表格数据 tableData Array类型
      tableData: [
        {
          uuid: "1122111",
          id: "1",
          name: "zdb",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122112",
          id: "2",
          name: "aas",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122111",
          id: "3",
          name: "zdb",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122112",
          id: "4",
          name: "aas",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122111",
          id: "5",
          name: "zdb",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122112",
          id: "6",
          name: "aas",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122111",
          id: "7",
          name: "zdb",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        },
        {
          uuid: "1122112",
          id: "8",
          name: "aas",
          status: "active",
          create_time: 1605756297384,
          usage: 70,
          size: 100000,
          free_size: "100KB",
          size_utils: "100",
          users: ["admin", "user"], //表格select选项数据
          users_list: "admin", //默认选中值
        }
        
      ],
      columnData: [
        {
          label: this.$t('table.name'), //表头名称
          prop: "name", //prop需要与返回字段对应上
          //3种类型 uuid表示 鼠标划过名字 会有id提示框 to-page类型表示 点击名称可跳转到某一页,此类型需配合@toPage 回调函数使用, html普通的类型 名称只展示无功能
          type: "uuid",
          //排序标识符 表格某一项排序需加此功能  需配@sortChange回调使用
          sort: true,
        },
        {
          label: this.$t('table.status'),
          prop: "status",
          type: "status", //状态的标识字段 默认数据返回 state与 status都可标识
        },
        {
          label: this.$t('table.create_time'),
          prop: "create_time",
          type: "time", //后台返回时间类型字段  可处理 2020-11-20 18:03:00 或 时间戳类型
        },
        {
          label: this.$t('table.usage'),
          prop: "usage",
          type: "progress", //进度条表示字段
        },
        {
          label: this.$t('table.size'),
          prop: "size",
          type: "size", //普通单位转换 后台返回以B计量的数据 前端自己转换成对应的单位
        },
        {
          label: this.$t('table.free_size'),
          prop: "free_size",
          type: "size-format", //后台固定返回 数据大小 例如 10GB等
        },
        {
          label: this.$t('table.Use_space'),
          prop: "size_utils",
          limit: "B",
          type: "size-unit", //后台返回 10 需前端手动加上GB 处理结果10GB
        },
        {
          label: this.$t('table.users'),
          prop: "users",
          type: "select", //表格里有下拉框表示字段 选择后的数据 是prop字段拼接_list 例如users选择后的结果在users_list字段里
        },
        {
          label: this.$t('table.operate'),
          prop: "operate",
          type: "dragdown", //下拉菜单按钮 需配置 drag_list数组
          drag_list: [
            {
              label: "delete", //按钮名称
              isDisabled: () => false, //禁用状态
              handle: (row) => {
                //点击回调
                console.log(row);
              },
            },
            {
              label: "edit",
              isDisabled: () => true, //可用状态
              handle: (row) => {
                this.editMsg(row)
              },
            },
          ],
        },
        {
          label: this.$t('table.operate1'),
          prop: "operate1",
          type: "button", //按钮类型 需配置 btn_list
          btn_list: [
            {
              type: "danger", //按钮修改类型 默认是primary类型
              label: "delete",
              isDisabled: () => true,
              handle: (row) => {
                console.log(row);
                this.delete(row.id)
              },
            },
          ],
        },
      ],
      formData: {
        name:'',
        status:'',
        create_time:null,
        usage:null,
        size:null,
        free_size:null,
        size_utils:null,
        users:null
      },      
      select:"",   //模态框里面的select属性定义
      
    };
  },
  methods: {

    //表格当前页回调
    handleCurrentChange(page) { //点击页数，跳转到当前的页数对应的数据
      console.log(page);  

    },
    //每页显示条数回调
    handleSizeChange(size) {  
      console.log(size);
      // let data = this.tableData.slice(0,size)
      // this.tableData = data
      
    },
    //点击名称跳转回调
    toPage(row) {
      console.log("点击", row);
    },
    //排序回调
    sortChange(sort) {
      console.log(sort);
    }, //全选回调
    selectAllData(data) {
      console.log(data);
    }, //单选回调
    selectSinger(data) {
      console.log(data);
    },
    clearSelection(){
      this.$refs['multipleTable'].clearSelection();//把选中的数据置空
    },
    // async getTableData(){
    //   const { data: res } = await this.$http.get('abc')
    //   // console.log(res)
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.tableData = res
    //     this.total = res.length
    //   }, 1000);
    // },
    getTableData(){
      setTimeout(() => {
        this.loading = false;
        this.total = 400;
      }, 1000);
    },


    //关闭模态框
    handleClose(bool){
      this.dialog_visible=bool;
      setTimeout(()=>{
        this.$refs['demo-form'].resetFields()
      },100)
    },
    //模态框确定
    submit(bool){
      this.$refs['demo-form'].validate((valid)=>{
        if(valid){
          this.dialog_visible=bool;
          this.$refs['demo-form'].resetFields()
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },

    //根据id删除对应的值 ----------简单的页面删除
    delete(id){
      this.$confirm(this.$t('warning.title'),{
        confirmButtonText: this.$t('button.confirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      }).then( ()=> {
        this.tableData.splice(id-1,1) 
        this.$message({
          type: 'success',
          message: this.$t('success.title')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('fail.title')
          });          
        });
      })
      console.log(id)
           
    },

    //根据id获取数据对数据进行编辑
    editMsg(row){
       this.dialog_visible = true
      //  console.log(row)
       let data ={
        name:row.name,
        status:row.status,
        create_time:this.dateFormat(row.create_time),
        usage:row.usage,
        size:row.size,
        free_size:row.free_size,
        size_utils:row.size_utils,
        users:row.users         
       }
       this.formData = data
    },

  },
  computed:{
    dateFormat(){
      return (val) => {
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted() { 
    //获取数据
    this.getTableData()

  },
};
</script>
<style lang="scss" scoped>
.Uxtable_container{
  // height: 100%;

}
.Uxtable_container .el-breadcrumb{
  margin-bottom: 20px;
}
</style>
