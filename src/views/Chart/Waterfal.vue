
<!--
 * @Author: sitao
 * @Date: 2020-12-03 11:01:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 11:25:24
-->
<template>
  <div class="waterfal_container">
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
                content="dimension: '活动', metrics: '时间'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-waterfall :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings1" height="250px"></ve-waterfall>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple2"> 
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置数据类型"
                width="200"
                trigger="hover"
                content="dataType: 'percent'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-waterfall :data="row1_chartData.chartData2" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-waterfall>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="修改指标名称"
                width="200"
                trigger="hover"
                content="labelMap: {'时间': 'time'}">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-waterfall :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings3" height="250px"></ve-waterfall>
          </div>
        </el-col> 
        <el-col :span="6">
          <div class="grid-content1 purple4">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置 总计、剩余 的名称"
                width="200"
                trigger="hover"
                content="totalNum: 24,totalName: '总时间',remainName: '剩余时间'">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-waterfall :data="row1_chartData.chartData1" :settings="row1_chartSettings.chartSettings4" height="250px"></ve-waterfall>
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
  name: 'Waterfal',
  data() { 
    this.row1_chartSettings = {
      chartSettings1:{
        dimension: '活动',
        metrics: '时间'
      },
      chartSettings2:{
        dataType: 'percent'
      },
      chartSettings3: {
        labelMap: {
          '时间': 'time'
        }
      },
      chartSettings4:{
        totalNum: 24,
        totalName: '总时间',
        remainName: '剩余时间'
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
          columns: ['活动', '时间'],
          rows: [
            { '活动': '吃饭', '时间': 4 },
            { '活动': '睡觉', '时间': 10 },
            { '活动': '打豆豆', '时间': 5 }
          ]
        },
        chartData2: {
          columns: ['活动', '时间'],
          rows: [
            { '活动': '吃饭', '时间': 0.1 },
            { '活动': '睡觉', '时间': 0.2 },
            { '活动': '打豆豆', '时间': 0.3 }
          ]
        }
      }
    }
  }
 }
</script>

<style lang="scss" >
  .waterfal_container{
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