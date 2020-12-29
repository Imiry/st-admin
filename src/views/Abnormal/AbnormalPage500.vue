<!--
 * @Author: sitao
 * @Date: 2020-12-29 11:15:43
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-29 15:57:05
-->
<template>
  <div class="AbnormalPage500_con">
    <st-exception :exceptionPic="exceptionPic" :exceptionTitle="exceptionTitle" @backWork="backWork"></st-exception>
  </div>
</template>

<script>
export default {
  name: 'AbnormalPage500',
  data() { 
    return {
      exceptionPic: require("../../assets/images/exception/500.png"),
      exceptionTitle:"抱歉！服务器出错了"
    }
  },
  methods: {
    backWork() {
      this.$router.push('/st_work')
    }
  }
 }
</script>

<style lang="scss" >
  .AbnormalPage500_con{

  }
</style>