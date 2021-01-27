<!--
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-26 14:54:56
-->
<template>
  <div class="manage_container">
     <div>
       <mavon-editor v-model="value" @change="change"/>
     </div>
  </div>
</template>

<script>

export default {
  name: 'Manage',
  data() { 
    return {
      value:'1'
    }
  },
  methods:{
    change(e,s){
      console.log(e,s)
    }
  }
 }
</script>

<style lang="scss" >
  .manage_container{
    
  }
</style>