<!--
 * @Author: sitao
 * @Date: 2020-12-15 15:51:39
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-31 09:15:59
-->
<template>
  <div class="set_container" v-show="show">
    <div class="tabin" @click="close">
      <div class="icon_in">
        <i class="iconfont icon-X"></i>
      </div> 
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'st-set',
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
  data() { 
    return {

    }
  },
  methods:{
    close() {
      this.$emit('closeHandle')
    }
  }
 }
</script>

<style lang="scss" >
  .set_container{
    width: 300px;
    height: 100%;
    position: fixed;
    z-index: 99999;
    right: 5px;
    // border-radius: 4px;
    padding: 10px;
    background-color: rgba(0,0,0,0.7);
    box-sizing: border-box;
    .tabin{
      position: relative;
      top:50%;
      left: -50px;
      .icon_in{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;;
        position: absolute;
        background-color: rgba(0, 0, 0,.2);
        // border-radius: 4px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
      }
      .icon_in:hover{
        background-color: rgba(0,0,0,.1);
      }


    }
  }
</style>