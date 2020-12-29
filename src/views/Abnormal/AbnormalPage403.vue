<!--
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-29 15:50:29
-->
<template>
  <div class="AbnormalPage403_container">
    <st-exception :exceptionPic="exceptionPic" :exceptionTitle="exceptionTitle" @backWork="backWork"></st-exception>
  </div>
</template>

<script>
import stException from '../../components/st-exception/st-exception.vue'
export default {
  components: { stException },
  name: 'AbnormalPage403',
  data() { 
    return {
      exceptionPic: require("../../assets/images/exception/403.png"),
      exceptionTitle:"抱歉！你无权访问该页面"
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
  .AbnormalPage403_container{
  
  }
</style>