<!--
 * @Author: sitao
 * @Date: 2020-12-25 16:24:36
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-04 09:42:06
-->
<template>
  <div class="routetag_container">
      <el-tag
        v-for="(tag,index) in routeTag"
        :key="index"
        class=" m-r-5 m-b-10 m-t-10 tag"
        :closable="tag.name !== '工作台'"
        :type="tag.type"
        
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
    // left:220px;
    z-index: 999;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    background-color: #eee;
    .tag:hover{
      cursor: pointer;
    }
  }
</style>