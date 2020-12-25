<!--
 * @Author: sitao
 * @Date: 2020-12-25 16:24:36
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-25 17:45:42
-->
<template>
  <div class="routetag_container">
    <el-tag
      class="m-l-10 m-b-10 m-t-10"
      :key="index"
      v-for="(item,index) in routeTag"
      closable
      :type="item.type"
      :disable-transitions="disable_tag"
      @close="handleClose(index)">
      {{item.name}}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'st-routetag',
  props:{
    routeTag:{
      type:Array,
      default: () => {
        return []
      }
    },
    disable_tag:false
  },
  data() { 
    return {
      
    }
  },
  methods:{
    handleClose(path) {
      this.$emit('closeTag',path)
    }
  }
 }
</script>

<style lang="scss" >
  .routetag_container{
    position: fixed;
    top:60px;
    left:210px;
    z-index: 999999;
    width: 100%;
    background-color: #eee;
  }
</style>