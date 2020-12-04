<!--
 * @Author: sitao
 * @Date: 2020-12-04 13:45:15
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 16:00:14
-->
<template>
  <div class="st-dialog_container">
    <el-dialog
      :title="dialog_title|| $t('msg.tips')"
      :visible.sync="dialog_visible"
      :width="dialog_width"
      :before-close="handleClose"
      :append-to-body="true"
      > 
      <div>
        
        <slot></slot>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'st-dialog',
  props:{
      dialog_title:{
          type:String,
          default:''
      },
      dialog_width:{
          type:String,
          default:'30%' 
      },
      dialog_visible:{
          type:Boolean,
          required:true,
          default:false
      }
  },
  data(){
      return{
      }
  },
  methods:{
      //关闭
      handleClose(){
         this.$emit('handleClose',false)
      },
      //提交
      submit(){
         this.$emit('submit',false)
      }
  }
 }
</script>

<style lang="scss" >
  .st-dialog_container{

    // .el-dialog{
    //   height: 500px;
    // }
  }
</style>