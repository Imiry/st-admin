<!--
 * @Author: sitao
 * @Date: 2020-12-09 16:25:42
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-10 13:54:04
-->
<template>
  <div class="tempalte2_container">
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/st_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('nav.template')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('template_subnav.template2')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card">
          <div class="cd_header">
              <div class="title">TODAY'S VISITS</div>
              <div class="number">7,842,900</div>
              <div class="percent"><st-progress :height="2" :bgcolor="'rgba(0,0,0,.5)'" :perColor="'#fff'" :percent="70.1"></st-progress></div>
              <div class="percented">Better than last week (70.1%)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card1">
          <div class="cd_header">
              <div class="title">TODAY'S PROFIT</div>
              <div class="number">180,200</div>
              <div class="percent"><st-progress :height="2" :bgcolor="'rgba(0,0,0,.5)'" :perColor="'#fff'" :percent="40.5"></st-progress></div>
              <div class="percented">Better than last week (40.5%)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card2">
          <div class="cd_header">
              <div class="title">NEW ORDERS</div>
              <div class="number">38,900</div>
              <div class="percent"><st-progress :height="2" :bgcolor="'rgba(0,0,0,.5)'" :perColor="'#fff'" :percent="76.3"></st-progress></div>
              <div class="percented">Better than last week (76.3%)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card3">
          <div class="cd_header">
              <div class="title">NEW COMMENTS</div>
              <div class="number">3,988</div>
              <div class="percent"><st-progress :height="2" :bgcolor="'rgba(0,0,0,.5)'" :perColor="'#fff'" :percent="54.9"></st-progress></div>
              <div class="percented">Better than last week (54.9%)</div>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <!-- <st-progress :height="2" :bgcolor="'rgba(0,0,0,.5)'" :perColor="'#fff'" :percent="70"></st-progress> -->
  </div>
</template>

<script>
export default {
  name: 'Template2',
  data() { 
    return {

    }
  },
  methods: {
      format(percentage) {
        return '';
      }
    }
 }
</script>

<style lang="scss" >
  .tempalte2_container{
    .crumb{
      margin-bottom: 20px;
    }
    .card,.card1,.card2,.card3{
      height: 130px;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 15px;;
      .cd_header{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .title{
        font-size: 12px;
        color: #FFFFFFB3;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin:0 0 4px;
        }
        .number{
          font-size: 24px;
          color: #fff;
          margin: 0 0 20px;
        }
        .percented{
          margin: 10px 0 0 0;
          font-size: 12px;
          color: #FFFFFFB3;
        }
      }
      
    }
    .card{
      background-color: #00ACAC !important;
    }
    .card1{
      background-color: #348FE2 !important;
    }
    .card2{
      background-color: #8753DE !important;
    }
    .card3{
      background-color: #2D353C !important;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-col{
        border-radius: 5px;
        .elcol_right{
          width: 100%;
          border-radius: 4px;
        }
      }
        
    }
  }
</style>