<template>
  <div id="app">
    <router-view v-if="activeRoute"/>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeRoute:true
    }
  },
  watch:{
    '$i18n.locale'(newV,oldV){
      if(newV!==oldV){
        this.reload()
        // location.reload()
      }
    }
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
