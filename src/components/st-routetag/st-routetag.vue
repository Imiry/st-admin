<!--
 * @Author: sitao
 * @Date: 2020-12-25 16:24:36
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-28 16:44:28
-->
<template>
  <div class="routetag_container">
      <el-tag
        v-for="(tag,index) in routeTag"
        :key="index"
        class="m-l-10 m-b-10 m-t-10 tag"
        :closable="tag.name !== 'home'"
        :type="tag.type"
        :disable-transitions="disable_tag"
        @click="handelClick(tag)"
        @close="handleClose(index)">
        {{tag.name}}
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
    handleClose(index) {
      this.$emit('closeTag',index)
      
    },
    handelClick(tag){
      this.$emit('handelClick',tag)
    }
  }
 }
</script>

<style lang="scss" >
  .routetag_container{
    position: fixed;
    top:60px;
    left:210px;
    z-index: 999;
    width: 100%;
    background-color: #eee;
    .tag:hover{
      cursor: pointer;
    }
  }
</style>