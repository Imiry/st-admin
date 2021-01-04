<!--
 * @Author: sitao
 * @Date: 2021-01-04 10:53:12
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-04 11:05:54
-->
<template>
  <div class="hints_container">
    <div class="hint-title">
      <i class="vue-dsn-icon-tishi" />
      <span><slot name="hintName" /></span>
    </div>
    <div class="hint-info">
      <slot name="hintInfo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'st-hints',
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" >
  .hints_container{
    width: 100%;
    min-height: 50px;
    padding: 8px 15px;
    margin-bottom: 20px;
    background: #ffffff;
    box-sizing: border-box;
    .hint-title{
      line-height: 30px;
      font-size: 16px;
      color: #409eff;
      i{
        font-size: 18px;
      }
    }
    .hint-info{
      padding-left: 24px;
      line-height: 24px;
    }
  }
</style>