<!--
 * @Author: sitao
 * @Date: 2020-12-07 15:03:59
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-07 17:54:49
-->
<template>
    <div class="backtop" @click="backtop"><i class="iconfont icon-jiantoushangsheng jiantou"></i></div>
</template>

<script>
export default {
  name: 'st-back-top',
  data() { 
    return {

    }
  },
  methods:{
    backtop() {
      this.$emit('backtop')
    }
  }
 }
</script>

<style lang="scss" >
  .backtop{
    position: fixed;
    right: 40px;
    top: 600px;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    .jiantou{
      position: absolute;
      top: 10px;
      left: 12px;
    }
  }
</style>