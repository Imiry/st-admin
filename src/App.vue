<!--
 * @Author: sitao
 * @Date: 2020-12-15 10:39:37
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-25 16:17:45
-->
<template>
  <div id="app">

    <router-view v-if="activeRoute"/>
    
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  
  data(){
    return{
      activeRoute:true
    }
  },
  computed:mapState({
    isCollapse:state => state.i18n.isCollapse
  }),
  watch:{
    '$i18n.locale'(newV,oldV){
      if(newV!==oldV){
        this.reload()
        // location.reload()
      }
    },
    // isCollapse:function(newV,oldV){
    //   console.log(newV)
    //   if(newV!==oldV){
    //     this.reload()
    //   }
    // }
  },
  methods:{
    reload(){
      this.activeRoute=false;
      this.$nextTick(()=>{
        this.activeRoute=true
      })
    }
  }
}
</script>
<style lang="scss">

</style>
