<!--
 * @Author: sitao
 * @Date: 2020-12-21 10:43:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 11:14:10
-->
<template>
  <div class="st-select">
    <st-card></st-card>
    <div class="box1">1</div>
    <div class="box2">2</div>
    <div class="box3">3</div>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-select
            v-model="choose"
            size="small"
            v-el-select-loadmore:rangeNumber="loadMore(rangeNumber)"
          >
            <el-option
              v-for="(item, index) in list.slice(0, rangeNumber)"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-popover placement="bottom" width="400" trigger="click">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              suffix-icon="el-icon-search"
            >
            </el-input>
            <div style="height: 400px">
              <el-scrollbar style="height: 100%">
                <div style="height: 100%">
                  <div
                    style="margin-top: 10px; heght: 20px; cursor: pointer"
                    v-for="(item, index) in list"
                  >
                    {{ item.value }}
                  </div>
                </div>
              </el-scrollbar>
            </div>

            <el-button
              class="btn-click"
              icon="el-icon-search"
              circle
              slot="reference"
            ></el-button>
          </el-popover>
        </div>
      </el-col>
      <el-col :span="8">
         <el-select v-model="value" v-loadmore="loadMore1" filterable placeholder="请选择">
           <div style="padding:2px;height:50px;box-sizing: border-box;">
             <el-input style="position: fixed;width: 190px; z-index: 1000;"></el-input>
           </div>
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { checkStrong, pwdLength610 } from "../../../utils/mUtils.js";

import Vue from "vue";
Vue.directive("el-select-loadmore", {
  bind(el, binding) {
    let self = this;
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector(
      ".el-select-dropdown .el-select-dropdown__wrap"
    );
    SELECTWRAP_DOM.addEventListener("scroll", function () {
      const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (condition) binding.value();
    });
  },
});
Vue.directive('loadmore', {
        bind(el, binding) {
          
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
        
          SELECTWRAP_DOM.addEventListener('scroll', function() {
    
              /*
               * scrollHeight 获取元素内容高度(只读)
               * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
               * clientHeight 读取元素的可见高度(只读)
               * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
               * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
               */
              const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
              
              if(CONDITION) {
                  binding.value();
              }
          });
       }
   })
export default {
  name: "UxPwd",

  data() {
    let validatePassword = (rule, value, callback) => {
      if (value == "" && this.subBtn == true) {
        callback(new Error(this.$i18n.t("errorMsg.pleaseInputAPassword")));
      } else if (pwdLength610(value) == false || checkStrong(value) == 1) {
        callback(
          new Error(
            this.$i18n.t("errorMsg.thePasswordDoesNotMeetTheRequirements")
          )
        );
      } else {
        callback();
      }
    };
    let validateConfirmPassword = (rule, value, callback) => {
      if (value == "" && this.subBtn == true) {
        callback(
          new Error(this.$i18n.t("errorMsg.pleaseEnterTheConfirmationPassword"))
        );
      } else if (value !== this.form.password) {
        callback(
          new Error(this.$i18n.t("errorMsg.twoPasswordEntriesAreInconsistent"))
        );
      } else {
        callback();
      }
    };
    return {
      list: [],
      choose: "",
      rangeNumber: 10,

      form: {
        password: "",
        confirmPassword: "",
      },
      rules: {
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: ["blur"],
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: "change",
          },
        ],
      },
      input:'',
      options: [], //渲染数据
      value: '',
      currentNo:1,
      pageSize:10,
      total:30,  //数据总划分多少页
      result:[],  //根据分页截取的数据
      allData:[]  //全部数据
    };
  },
  watch: {
    "form.password"(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$refs["form"].clearValidate("password");
      }
    },
  },

  created() {
    this.getList();
    this.initData(); //请求全部数据
    this.getData(this.currentNo,this.pageSize) //默认展示第一页10条数据
  },
  methods: {
    getList() {
      for (let i = 0; i < 10000; i++) {
        this.list.push({
          label: "menu",
          value: "menu",
        });
      } //测试数据10万条数据, 这里数据多少条无所谓,list.slice(0, rangeNumber)方法只会默认加载初始的10条数据
    },
    loadMore(n) {
      //n是默认初始展示的条数会在渲染的时候就可以获取,具体可以打log查看
      //if(n < 8) this.rangeNumber = 10 //elementui下拉超过7条才会出滚动条,如果初始不出滚动条无法触发loadMore方法
      return () => (this.rangeNumber += 5); //每次滚动到底部可以新增条数  可自定义
    },
    initData(){
      for(let i=0;i<10000;i++){
        this.allData.push({value:`选项${i}`,label:`北京${i}`})
      }
    },
    loadMore1(){
      this.currentNo++;
      console.log('加载更多',this.currentNo)
      this.getData(this.currentNo,this.pageSize)
    },
        //获取数据
    getData(currentPage,pageSize){
      let data=[];
      this.result=this.allData;
      let start = (currentPage - 1) * pageSize;
      let end = currentPage * pageSize;
      data=this.result.slice(start,end);
      console.log(data)
      if(this.currentNo==1){
        this.options=data;
      }else if(this.currentNo>1 && this.currentNo<=this.total){
        this.options=this.options.concat(data)
      }else{
        return
      }
    },
    submit(formName) {
      this.subBtn = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.subBtn = false;
          // 表单验证通过
        } else {
          this.subBtn = false;
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      this.$refs.pwd.resetPwd();
      this.subBtn = false;
    },
  },
};
</script>

<style lang="scss" >
.ux_pwd {
  width: 100%;
  height: 100%;
  // background-color: #fff;
  padding-top: 20px;
  .box1,.box2,.box3{
    width: 100%;
    height: 400px;
    border-radius: 5px;
    background-color: #fff;
  }
  .box2,.box3{
    margin-top: 10px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #fff;
    padding: 30px;
  }

  .btn-click {
    margin-left: 40px;
  }
  .ul_jiansuo {
    height: 100px;
  }
}
</style>