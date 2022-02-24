<!--
 * @Author: sitao
 * @Date: 2020-12-29 09:57:22
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-20 16:03:33
-->
<template>
  <div>
    <div class="stepContainer" v-for="(item,index) in stepData" :key="index">
      <div class="stepHeader">
        <div class="stepPointCon">
          <div class="stepPoint">{{index+1}}</div>
        </div>
        <div class="stepTitleCon">
          <div class="stepTitle">{{item.title}}</div>
        </div>
      </div>
      <div class="stepMain">
        <div class="stepLineLast" v-if="index===stepData.length-1"></div>
        <div class="stepLine" v-else></div>
        <div class="stepDesc">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stepPanle',
  props:{
    stepData:{   //父组件向子组件传递的数据  （ title, desc ）
      type:Array,
      default:[]
    }
  }
  
 }
</script>

<style lang="scss" >
  .stepContainer{
    .stepHeader{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .stepPointCon{
        box-sizing: border-box;
        width: 40px;
        .stepPoint{
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background-color: rgb(202, 74, 74);
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
      .stepTitleCon{
        width: calc(100% - 40px);
        box-sizing: border-box;
        border-bottom: 1px dashed #ccc;
        .stepTitle{
          padding-top: 5px;
          padding-bottom: 5px;
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .stepMain{
      display: flex;
      .stepLine{
        width: 30px;
        margin-left: 10px;
        border-left: 1px dashed rgb(202, 74, 74);
      }
      .stepLineLast{
        width: 30px;
        margin-left: 10px;
        border-left: 1px dashed #fff;
      }
      .stepDesc{
        width: calc(100% - 30px);
        padding: 20px 0px 30px 0px;
        font-size: 14px;
      }
    }
  }
</style>