<!--
 * @Author: sitao
 * @Date: 2020-12-02 16:34:47
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-02 17:42:47
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
              <ve-histogram :data="row1_chartData.chartData1" height="250px"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple2">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              <ve-histogram :data="row1_chartData.chartData2" :settings="row1_chartSettings.chartSettings2" height="250px"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple3">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
             
            </div>
          </el-col> 
          <el-col :span="6">
            <div class="grid-content1 purple4">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              
            </div>
          </el-col>          
        </el-row> 

        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content1 purple1">
             <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple2">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple3">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
              
            </div>
          </el-col> 
          <el-col :span="6">
            <div class="grid-content1 purple4">
              <div class="line_header">
                <el-button  icon="el-icon-share" circle size="mini"></el-button>
              </div>
             
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
      chartSettings2:{
        metrics: ['访问用户', '下单用户'],
        dimension: ['日期']
      }
    }
    return {
      row1_chartData:{
        chartData1: {
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
        chartData2: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
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