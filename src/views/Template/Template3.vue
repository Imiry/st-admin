<!--
 * @Author: zhangyao
 * @Date: 2020-12-17 17:46:00
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-18 16:16:22
-->
<template>
  <div class="markdown-tpl border-box min-height-full bg-f p-10 radius-4">
    <el-row :gutter="24">
      <el-col :span="10">
        {{validStatus}}
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item label="密码" prop="password">
            <el-popover
              placement="right"
              width="400"
              trigger="hover">
                <div class="password-tips">
                      <div class="password-length">
                          <span>
                              <i class="el-icon-warning-outline" v-if="validStatus.default_val===null"></i>
                              <i class="el-icon-circle-close danger" v-else-if="!validStatus.default_val&&validStatus.default_val!==null"></i>
                              <i class="el-icon-circle-check success" v-else></i>
                              <span>密码长度为8～30之间</span>
                          </span>
                      </div>
                      <div class="password-rule">
                          <span>
                              <i class="el-icon-warning-outline" v-if="validStatus.setLevel===null"></i>
                              <i class="el-icon-circle-check success" v-else-if="validStatus.setLevel!==null&&validStatus.setLevel!=='error'"></i>
                              <i class="el-icon-circle-close danger" v-else></i>
                              <span>至少包含数字/大写字母/小写字母/特殊字符2种组合</span>
                          </span>
                      </div>
                      <div class="password-strength display-flex">
                          <div>密码强度:</div>
                          <div>
                              <span class="default-block" :class="firstLevel"></span>
                              <span class="default-block" :class="secondLevel"></span>
                              <span class="default-block" :class="threeLevel"></span>
                          </div>
                      </div>
                </div>
                <el-input type="password" v-model="form.password" autocomplete="off" slot="reference"></el-input>
            </el-popover>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
       </el-col>
    </el-row>
  </div>
</template>
<script>
import { validatePwd,validateConfirm } from '../../utils/pwdValitator.js'
export default {
  components: {
  },
  computed:{
    firstLevel(){
       return this.validStatus.setLevel=='low'? 'low': this.validStatus.setLevel=='middle' ? 'middle' :this.validStatus.setLevel=='high' ? 'high':'default' 
    },
    secondLevel(){
       return this.validStatus.setLevel=='middle' ? 'middle' :this.validStatus.setLevel=='high' ? 'high':'default' 
    },
    threeLevel(){
       return this.validStatus.setLevel=='high' ? 'high':'default' 
    }
  },
  data() {
    return {
      visible:true,
      validStatus:{
        default_val:null,
        setLevel:null,
      },
      form:{
        password:'',
        checkPass:''
      },
      rules:{
        password:[
          {
            required: true,
            validator: (rule,value,callback)=>{
              return validatePwd(this.form,this.validStatus, this.$refs['ruleForm'],rule, value, callback)
            }, 
            trigger: 'change'
          }
        ],
        checkPass:[
          {
             required:true,validator:(rule,value,callback)=>{
                  return validateConfirm(this.form,rule,value,callback)
             },trigger: 'change'
          }
        ]
      }
    };
  },
  methods:{
    submit(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$refs['ruleForm'].resetFields();
             this.default_val=null
             this.setLevel=null
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.default-block{
  display: inline-block;
  width: 50px;
  height: 10px;
  border-radius: 2px;
  // background:rgb(220, 220, 220);
  margin-left: 5px;
}
.default{
   background:rgb(220, 220, 220);
}
.low{
   background: rgb(255, 70, 15);
}
.middle{
   background:rgb(255, 106, 0)
}
.high{
  background: rgb(10, 158, 0);
}
.display-flex{
  display: flex;
}
</style>
