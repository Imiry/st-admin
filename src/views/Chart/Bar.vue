<!--
 * @Author: sitao
 * @Date: 2020-12-03 11:01:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 13:38:22
-->
<template>
  <div class="bar_container">
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
                title="条形图示例1"
                width="200"
                trigger="hover"
                content="columns是对应列的数据名称，rows下面是对应一行的数据">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-bar :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings1" height="250px"></ve-bar>
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
            <ve-bar :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-bar>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="排序条形图"
                width="200"
                trigger="hover"
                content="chartSettings = { metrics: ['访问用户'], dataOrder: { label: '访问用户', order: 'desc' } }">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-bar :data="row1_chartData.chartData" :settings="row1_chartSettings.chartSettings3" height="250px"></ve-bar>
          </div>
        </el-col> 
        <el-col :span="6">
          <div class="grid-content1 purple4">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="条形轴配置双y轴"
                width="200"
                trigger="hover"
                content="this.chartSettings = { xAxisType: ['KMB', 'KMB'], xAxisName: ['下单用户', '访问用户'], axisSite: { top: ['访问用户'] }}">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-bar :data="row1_chartData.chartData4" :settings="row1_chartSettings.chartSettings4" height="250px"></ve-bar>
          </div>
        </el-col>          
      </el-row> 

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content1 purple1">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置legend别名"
                width="200"
                trigger="hover"
                content="this.chartSettings = { labelMap: { 'PV': '访问用户', 'Order': '下单用户' }, legendName: { '访问用户': '访问用户 total: 10000'}}">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-bar :data="row2_chartData.chartData1" :settings="row2_chartSettings.chartSettings1" height="250px"></ve-bar>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="堆叠条形图"
                width="200"
                trigger="hover"
                content="stack: { 'xxx': ['访问用户', '下单用户']}">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-bar :data="row1_chartData.chartData" :settings="row2_chartSettings.chartSettings2" height="250px"></ve-bar>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置纵轴为连续的数值轴"
                width="200"
                trigger="hover"
                content="yAxisType: 'value'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-bar :data="row2_chartData.chartData3" :settings="row2_chartSettings.chartSettings3" height="250px"></ve-bar>
          </div>
        </el-col> 
        <!-- <el-col :span="6">
          <div class="grid-content1 purple4">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置横轴为连续的数值轴"
                width="200"
                trigger="hover"
                content="	this.chartSettings = { xAxisType: 'value' }">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            
          </div>
        </el-col>           -->
      </el-row> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  data() { 
    this.row1_chartSettings = {
      chartSettings1:{
        dimension: ['日期'],
        metrics: ['访问用户'],
      },
      chartSettings2:{
        dimension: ['日期'],
        metrics: ['访问用户']
      },
      chartSettings2:{
        metrics: ['访问用户'],
        dataOrder: {
          label: '访问用户',
          order: 'desc'
        }
      }
    },
    this.row2_chartSettings = {
      chartSettings1:{
        labelMap: {
          'PV': '访问用户',
          'Order': '下单用户'
        },
        legendName: {
          '访问用户': '访问用户 total: 10000'
        }
      },
      chartSettings2:{
        stack: {
          'xxx': ['访问用户', '下单用户']
        }
      },
      chartSettings3:{
        yAxisType: 'value'
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
        chartData4: {
          columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293 }
          ]
        }
      },
      row2_chartData:{
        chartData1: {
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
        chartData3: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': 1, '访问用户': 1393 },
            { '日期': 2, '访问用户': 3530 },
            { '日期': 5, '访问用户': 2923 },
            { '日期': 10, '访问用户': 1723 },
            { '日期': 15, '访问用户': 3792 },
            { '日期': 36, '访问用户': 4593 }
          ]
        }
      }
    }
  }
 }
</script>

<style lang="scss" >
  .bar_container{
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
        .ve-line{
          padding: 10px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
</style>