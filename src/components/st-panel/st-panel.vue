<!--
 * @Author: sitao
 * @Date: 2020-12-08 14:41:06
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-15 13:42:40
-->
<template>
  
  <div class="panel" v-if="disable" :class="{panel1:exprandFlag}">
    <div class="panel_header">
      <div class="header_left">{{title}}</div>
      <div class="header_right">
        <el-button circle size="mini" @click="exprand"></el-button>
        <el-button type="success" circle size="mini" @click="loadingHandle" ></el-button>
        <el-button type="warning" circle size="mini" @click="showHandle"></el-button>
        <el-button type="danger" circle size="mini" @click="deleteHandle" ></el-button>
      </div>
    </div>
    <div class="panel_content"
      v-show="disable_content" 
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.3)">
        <slot name="content" class="slot_con"></slot>
        <slot name="footer"></slot>
    </div>
  </div>
  
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'st-panel',
  props:{
    disable:{
      type:Boolean,
      default:true
    },
    title:{
      type:String,
      default:''
    }
  },
  data() { 
    return {
      loading:false,
      exprandFlag:false,
      disable_content:true
    }
  },
  methods:{
    exprand(){
      this.exprandFlag = !this.exprandFlag
      this.$emit('resize')
    },
    loadingHandle(){
      this.loading = true
      setTimeout(() => {
        this.loading = false
      },2000)
    },
    showHandle(){
      this.disable_content = !this.disable_content
    },
    deleteHandle(){
      this.disable = !this.disable
    }
  }
 }
</script>

<style lang="scss" >

  .panel{
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    .panel_header{
      height:40px;
      background-color: rgba(0,0,0,.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      .header_left{
        color: #fff;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left: 10px;
      }
      .header_right{
        margin-right: 10px;
        display: flex;
        align-items: center;
      }
    }
  }
  .panel1{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
    .panel_header{
      height:50px;
      background-color:rgba(0,0,0,.4);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header_left{
        color: #fff;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-left: 10px;
      }
      .header_right{
        margin-right: 10px;
        display: flex;
        align-items: center;
      }
    }
    .panel_content{
      background-color: #f2f3f4;
    }
  }
</style>