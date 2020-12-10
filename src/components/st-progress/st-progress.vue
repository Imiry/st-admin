<!--
 * @Author: sitao
 * @Date: 2020-12-10 11:56:17
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-10 12:25:21
 * @height: 进度条的高度
 * @bgcolor：进度条底层的背景颜色
 * @percolor：进度条进度的背景颜色
 * @percent：进度条的比例值 
-->
<template>
  <div class="progerss_container">
    <div class="progress_con" :style="{'height':`${height}`+ 'px','background-color':bgcolor}">
      <div class="progress_percent" :style="{'background-color': perColor,'width':`${percent}`+'%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'st-progress',
  props:{
    height:{
      type:String,
      default:'2'
    },
    bgcolor:{
      type:String,
      default:'rgba(0,0,0,.5)'
    },
    perColor:{
      type:String,
      default:'#fff'
    },
    percent:{
      type:String,
      default:'50'
    }
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" >
  .progerss_container{
    .progress_con{
      width: 100%;
      // height: 2px;
      // background-color: rgba(0,0,0,.5);
      position: relative;
      border-radius: 4px;
      .progress_percent{
        position: absolute;
        // width: 50%;
        height: 100%;
        // background-color: #fff;
        border-radius: 4px;
      }
    }
  }
</style>