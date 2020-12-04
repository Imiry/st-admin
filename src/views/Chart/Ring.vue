<!--
 * @Author: sitao
 * @Date: 2020-12-03 11:42:55
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 13:36:26
-->
<template>
  <div class="ring_container">
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
                title="设置指标维度"
                width="200"
                trigger="hover"
                content="metrics：维度，dimension：指标，dimension: ['日期'],metrics: '访问用户'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-ring :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings1" height="250px"></ve-ring>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
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
            <ve-ring :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-ring>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="限制显示条数环图"
                width="200"
                trigger="hover"
                content="limitShowNum: 3">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-ring :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings3" height="250px"></ve-ring>
          </div>
        </el-col> 
        <el-col :span="6">
          <div class="grid-content1 purple4">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置环图半径/设置数据类型"
                width="200"
                trigger="hover"
                content="其中是环图外半径与内半径	array------------/dataType	数据类型:string	可选值: KMB, normal, percent">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-ring :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings4" height="250px"></ve-ring>
          </div>
        </el-col>          
      </el-row> 

      <!-- <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content1 purple1">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="堆叠面积图"
                width="200"
                trigger="hover"
                content="this.chartSettings = { stack: { '用户': ['访问用户', '下单用户'] }, area: true }">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置别名"
                width="200"
                trigger="hover"
                content="labelMap：设置指标的别名，同时作用于提示框和图例，legendName：设置图表上方图例的别名	">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="显示指标数值"
                width="200"
                trigger="hover"
                content="this.extend = { series: { label: { normal: { show: true } } } }">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            
          </div>
        </el-col> 
        <el-col :span="6">
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
        </el-col>          
      </el-row>  -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ring',
  data() { 
    this.row1_chartSettings = {
      chartSettings1:{
        dimension: '日期',
        metrics: '访问用户',
        radius:[30,50],
        offsetY:150
      },
      chartSettings2:{
        roseType: 'radius',
        radius:[30,50],
        offsetY:150
      },
      chartSettings3:{
        limitShowNum: 3,
        radius:[30,50],
        offsetY:150
      },
      chartSettings4:{
        radius:[10,50],
        offsetY:150,
        dataType: 'KMB'
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
        chartData1: {
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
  .ring_container{
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