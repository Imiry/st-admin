<!--
 * @Author: sitao
 * @Date: 2020-11-27 11:21:22
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-01 10:57:22
-->
<template>
  <div class="st_button_container">
      <el-button v-for="(btn,index) in buttons" 
      :key="index" 
      :type="btn.type ? btn.type :'primary'" 
      :icon="btn.icon" 
      :size="btn.size ? btn.size:'medium'"
      :circle="btn.circle"
      @click="btn.click" >{{btn.label ? btn.label : '' }}</el-button>
  </div>
</template>

<script>
      // :size="btn.size ? btn.size:'medium'" 
export default {
  name: 'st-button',
  props: {
    buttons: {
      type: Array,
      default: []
    },
    
  data() { 
    return {

    }
  }
  }
 }
</script>

<style lang="scss" >
  .st_button_container{

  }
</style>