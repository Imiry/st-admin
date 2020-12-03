<!--
 * @Author: sitao
 * @Date: 2020-12-02 16:34:47
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-03 09:58:54
-->
<template>
  <div class="histogram_container">
      <div class="chart_a">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content1 purple1">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <ve-histogram :data="row1_chartData.chartData" height="250px"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple2">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <!-- 设置显示的指标维度 -->
              <ve-histogram :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple3">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <!-- 设置双y轴 -->
             <ve-histogram :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings3" height="250px"></ve-histogram>
            </div>
          </el-col> 
          <el-col :span="6">
            <div class="grid-content1 purple4">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <!-- 柱状图+折线图 -->
              <ve-histogram :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings4" height="250px"></ve-histogram>
            </div>
          </el-col>          
        </el-row> 

        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content1 purple1">
             <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <!-- 堆叠柱状图 -->
              <ve-histogram :data="row1_chartData.chartData" :settings="row2_chartSettings.chartSettings1" height="250px"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple2">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <!-- 默认显示柱状图数据 -->
              <ve-histogram :data="row1_chartData.chartData" :extend="row2_extend.extend2" height="250px"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple3">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <!-- 修改别名 -->
              <ve-histogram :data="row2_chartData.chartData3" :settings="row2_chartSettings.chartSettings3" height="250px"></ve-histogram>
            </div>
          </el-col> 
          <el-col :span="6">
            <div class="grid-content1 purple4">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
             <!-- 设置横轴为连续的数值轴 -->
             <ve-histogram :data="row2_chartData.chartData4" :settings="row2_chartSettings.chartSettings4" height="250px"></ve-histogram>
            </div>
          </el-col>          
        </el-row> 
      </div>
  </div>
</template>

<script>
export default {
  name: 'Histogram',
  data() { 
    this.row1_chartSettings = {
      chartSetting2:{
        metrics: ['访问用户', '下单用户'],
        dimension: ['日期']
      },
      chartSettings3:{
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      },
      chartSettings4:{
        showLine: ['下单用户']
      }
    },
    this.row2_chartSettings = {
      chartSettings1:{
        stack: { '用户': ['访问用户', '下单用户'] }
      },
      chartSettings3:{
        labelMap: {
          'PV': '访问用户',
          'Order': '下单用户'
        },
        legendName: {
          '访问用户': '访问用户 total: 10000'
        }
      },
      chartSettings4:{
        xAxisType: 'value'
      }
    },
    this.row2_extend = {
      extend2:{
        series: {
          label: { show: true, position: "top" }
        }
      }
    }

    return {
      row1_chartData:{
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
      },
      row2_chartData:{
        chartData3: {
          columns: ['date', 'PV', 'Order', 'OrderRate'],
          rows: [
            { 'date': '1/1', 'PV': 1393, 'Order': 1093, 'OrderRate': 0.32 },
            { 'date': '1/2', 'PV': 3530, 'Order': 3230, 'OrderRate': 0.26 },
            { 'date': '1/3', 'PV': 2923, 'Order': 2623, 'OrderRate': 0.76 },
            { 'date': '1/4', 'PV': 1723, 'Order': 1423, 'OrderRate': 0.49 },
            { 'date': '1/5', 'PV': 3792, 'Order': 3492, 'OrderRate': 0.323 },
            { 'date': '1/6', 'PV': 4593, 'Order': 4293, 'OrderRate': 0.78 }
          ]
        },
        chartData4: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': 1, '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': 2, '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': 5, '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': 10, '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': 20, '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': 22, '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    }
  }
 }
</script>

<style lang="scss" >
  .histogram_container{
    height: 100%;
    .chart_a{
      height: 100%;
      .el-row{
        margin-bottom: 10px;
      }
      .el-col .grid-content1{
        border-radius: 5px;
        height: 300px;
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
        .ve-histogram{
          padding: 10px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>