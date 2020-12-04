<!--
 * @Author: sitao
 * @Date: 2020-12-03 11:45:26
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 13:35:22
-->

<template>
  <div class="funnel_container">
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
                title="指定指标维度"
                width="200"
                trigger="hover"
                content="dimension: '状态1',metrics: '数值'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-funnel :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings1" height="250px"></ve-funnel>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="自动按照数值排序并过滤0值"
                width="200"
                trigger="hover"
                content="useDefaultOrder: true,filterZero: true">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-funnel :data="row1_chartData.chartData2" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-funnel>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="定制顺序漏斗图/金字塔"
                width="200"
                trigger="hover"
                content="sequence: ['订单', '点击', '访问', '展示'],------------------------/ascending: true">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-funnel :data="row1_chartData.chartData3" :settings="row1_chartSettings.chartSettings3" height="250px"></ve-funnel>
          </div>
        </el-col> 
        <el-col :span="6">
          <div class="grid-content1 purple4">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="指定数据类型漏斗图/修改legend别名漏斗图"
                width="200"
                trigger="hover"
                content="dataType: 'percent',legendName: {'订单': '订单 total:1000'}">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-funnel :data="row1_chartData.chartData4" :settings="row1_chartSettings.chartSettings4" height="250px"></ve-funnel>
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
  name: 'Funnel',
  data() { 
    this.row1_chartSettings = {
      chartSettings1: {
        dimension: '状态1',
        metrics: '数值'
      },
      chartSettings2:{
        useDefaultOrder: true,
        filterZero: true
      },
      chartSettings3:{
        sequence: ['订单', '点击', '访问', '展示'],
        ascending: true
      },
      chartSettings4:{
        dataType: 'percent',
        legendName: {
          '订单': '订单 total:1000'
        }
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
          columns: ['状态', '状态1', '数值'],
          rows: [
            { '状态': '展示', '状态1': '展示1', '数值': 900 },
            { '状态': '访问', '状态1': '访问1', '数值': 600 },
            { '状态': '点击', '状态1': '点击1', '数值': 300 },
            { '状态': '订单', '状态1': '订单1', '数值': 100 }
          ]
        },
        chartData2: {
          columns: ['状态', '数值'],
          rows: [
            { '状态': '展示', '数值': 900 },
            { '状态': '访问', '数值': 100 },
            { '状态': '零', '数值': 0 },
            { '状态': '点击', '数值': 300 },
            { '状态': '订单', '数值': 200 }
          ]
        },
        chartData3: {
          columns: ['状态', '数值'],
          rows: [
            { '状态': '展示', '数值': 900 },
            { '状态': '访问', '数值': 600 },
            { '状态': '点击', '数值': 300 },
            { '状态': '订单', '数值': 100 }
          ]
        },
        chartData4: {
          columns: ['状态', '数值'],
          rows: [
            { '状态': '展示', '数值': 0.9 },
            { '状态': '访问', '数值': 0.6 },
            { '状态': '点击', '数值': 0.3 },
            { '状态': '订单', '数值': 0.1 }
          ]
        }
      }
    }
  }
 }
</script>

<style lang="scss" >
  .funnel_container{
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