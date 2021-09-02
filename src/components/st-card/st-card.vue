<!--
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-16 11:43:29
-->
<template>
    <el-card class="box-card" :style="cardStyle">
      <div slot="header" class="clearfix">
        <span style="color: rgb(156, 154, 154)">{{cardname}}</span>
        <el-button style="float: right; "  :size="size" :icon="icon" :type="btntype">{{textValue}}</el-button>
      </div>
      <slot></slot>
    </el-card>
</template>

<script>

export default {
  name: 'st-card',
  props:{
    cardname: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    btntype: {
      type: String,
      default: 'primary'
    },
    textValue: {
      type: String,
      default: '查看'
    },
    cardStyle: {}
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" >
   .box-card {
      // width: 700px;
      margin-bottom: 10px;
    }

</style>