<!--
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-16 11:43:29
-->
<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{cardData.cardname}}</span>
        <el-button style="float: right; " :size="cardData.size" :icon="cardData.icon" :type="cardData.btntype">{{cardData.textValue}}</el-button>
      </div>
      <slot></slot>
    </el-card>
</template>

<script>

export default {
  name: 'st-card',
  props:{
    cardData:{
      type:Object,
      default:() => {
        return {}
      }
    }
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" >

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      // width: 700px;
      margin-bottom: 10px;
    }

</style>