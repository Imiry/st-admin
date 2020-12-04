
<!--
 * @Author: sitao
 * @Date: 2020-12-03 11:01:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 13:36:16
-->
<template>
  <div class="pie_container">
    <el-card>
      <st-button :buttons="buttons"></st-button>
    </el-card>
    <div class="chart_a">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content1 purple1">
            <div class="line_header">
                <el-popover
                placement="top-start"
                title="饼图示例1"
                width="200"
                trigger="hover"
                content="columns是对应列的数据名称，rows下面是对应一行的数据">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-pie :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings1"  height="250px"></ve-pie>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置显示的指标维度"
                width="200"
                trigger="hover"
                content="metrics：维度，dimension：指标，metrics: ['访问用户'],dimension: ['日期']">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-pie :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-pie>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple1">
            <div class="line_header">
                <el-popover
                placement="top-start"
                title="玫瑰图"
                width="200"
                trigger="hover"
                content="roseType: 'radius'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-pie :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings3"  height="250px"></ve-pie>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="限制显示条数饼图  /  设置数据类型"
                width="200"
                trigger="hover"
                content="limitShowNum: 5  /   /  dataType: 'percent'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-pie :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings4" height="250px"></ve-pie>
          </div>
        </el-col>
        
      </el-row> 

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content1 purple1">
            <div class="line_header">
                <el-popover
                placement="top-start"
                title="多圆饼图"
                width="200"
                trigger="hover"
                content="chartSettings = { level: [ ['1/1', '1/2', '1/3'],['1/4', '1/5'] ] }">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-pie :data="row1_chartData.chartData" :settings="row2_chartSettings.chartSettings1"  height="250px"></ve-pie>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置饼图半径边距 "
                width="200"
                trigger="hover"
                content="radius: 10, offsetY: 300">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-pie :data="row1_chartData.chartData" :settings="row2_chartSettings.chartSettings2" height="250px"></ve-pie>
          </div>
        </el-col>
        
      </el-row> 
      <div class="tag"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: ' Pie',
  data() { 
    this.row1_chartSettings = {
      chartSettings1:{
        offsetY: 145,
        radius: 80,
      },
      chartSettings2:{
        dimension: '日期',
        metrics: '访问用户',
        offsetY: 145,
        radius: 80,
      },
      chartSettings3:{
        offsetY: 145,
        roseType: 'radius',
        radius: 80,
      },
      chartSettings4:{
        offsetY: 145,
        limitShowNum: 5,
        radius: 80,
      },
    },
    this.row2_chartSettings = {
      chartSettings1:{
        level: [
          ['1/1', '1/2', '1/3'],
          ['1/4', '1/5']
        ],
        offsetY: 145,
        radius: 80,
      },
      chartSettings2:{
        radius: 30,
        offsetY: 150
      }
    }
    return {
      buttons:[{
        type:'info',
        icon:'iconfont icon-peizhi',
        size:'mini',
        click:() => {
          alert(1)
        },
        label:"配置"
      }],
      row1_chartData:{
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
      }
    }
  }
 }
</script>

<style lang="scss" >
  .pie_container{
    height: 100%;
    .el-card{
      height: 50px;
      border-radius: 5px;
      margin-bottom: 10px;
      .el-card__body{
        padding: 10px 0px 10px 10px;
      }
    }
    .chart_a{
      height: 100%;
      .el-row{
        margin-bottom: 10px;
      }
      .el-col .grid-content1{
        border-radius: 5px;
        height: 340px;
        background-color: #fff;
        padding-top: 50px;
        box-sizing: border-box;
        position: relative;
        .line_header{
          position: absolute;
          // width: 28px;
          // height: 28px;
          left: 10px;
          top: 10px;
        }
        .ve-line{
          padding: 10px 10px;
          box-sizing: border-box;
        }
      }
      .tag{
        height: 100px;
      }
    }
  }
</style>