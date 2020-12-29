<!--
 * @Author: sitao
 * @Date: 2020-12-29 11:15:21
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-29 15:53:57
-->
<template>
  <div class="AbnormalPage404_con">
    <st-exception :exceptionPic="exceptionPic" :exceptionTitle="exceptionTitle" @backWork="backWork"></st-exception>
  </div>
</template>

<script>
export default {
  name: 'AbnormalPage404',
  data() { 
    return {
      exceptionPic: require("../../assets/images/exception/404.png"),
      exceptionTitle:"抱歉！你访问的页面不存在"
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
  .AbnormalPage404_con{

  }
</style>