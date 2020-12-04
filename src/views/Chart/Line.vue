<!--
 * @Author: sitao
 * @Date: 2020-11-26 09:58:03
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 16:05:20
-->
<template>
  <div class="chart_container">
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
                title="折线图示例1"
                width="200"
                trigger="hover"
                content="columns是对应列的数据名称，rows下面是对应一行的数据">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-line :data="row1_chartData.chartData1" height="250px"></ve-line>
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
                content="metrics：维度，dimension：指标，metrics: ['访问用户', '下单用户'],
      dimension: ['日期']">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-line :data="row1_chartData.chartData2" :settings="this.row1_chartSettings.chartSettings2" height="200px"></ve-line>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content1 purple3">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="设置双y轴"
                width="200"
                trigger="hover"
                content="chartSettings里面的设置：axisSite: { right: ['下单率'] }，yAxisType: ['KMB', 'percent']，yAxisName: ['数值', '比率'] 。 axisSite	：指标所在的轴，默认不在right轴的指标都在left轴">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-line :data="row1_chartData.chartData3" :settings="this.row1_chartSettings.chartSettings3" height="250px"></ve-line>
          </div>
        </el-col> 
        <el-col :span="6">
          <div class="grid-content1 purple4">
            <div class="line_header">
              <el-popover
                placement="top-start"
                title="横坐标的倾斜"
                width="200"
                trigger="hover"
                content="this.extend = { 'xAxis.0.axisLabel.rotate': 45 }">
                <el-button slot="reference" icon="el-icon-share" circle size="mini"></el-button>
              </el-popover>
            </div>
            <ve-line :data="row1_chartData.chartData4" :extend="this.row1_extend.extend4" height="250px"></ve-line>
          </div>
        </el-col>          
      </el-row> 

      <el-row :gutter="20">
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
            <ve-line :data="row2_chartData.chartData1" :settings="this.row2_chartSettings.chartSettings1" height="250px"></ve-line>
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
            <ve-line :data="row2_chartData.chartData2" :settings="this.row2_chartSettings.chartSettings2" height="250px"></ve-line>
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
            <ve-line :data="row2_chartData.chartData3" :extend="this.row2_extend.extend3" height="250px"></ve-line>
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
            <ve-line :data="row2_chartData.chartData4" :settings="this.row2_chartSettings.chartSettings4" height="250px"></ve-line>
          </div>
        </el-col>          
      </el-row> 
    </div> 

    <!-- 配置项的解析模态框 -->
    <st-dialog :dialog_visible="dialog_visible" :dialog_title="title" dialog_width="50%"  @handleClose="handleClose" @submit="submit" >
      <st-table
        :tableData="tableData"
        :columnData="columnData"
        :border="border"
        :stripe="stripe"
        :height="400"
      >
      </st-table>
    </st-dialog>
  </div>
</template>

<script>
import stDialog from '../../components/st-dialog/st-dialog.vue'
import StTable from '../../components/st-table/st-table.vue'
export default {
  components: { stDialog, StTable },
  name: 'Line',
  data() { 
      this.row1_chartSettings = {
        chartSettings2:{
          metrics: ['访问用户', '下单用户'],
          dimension: ['日期']
        },
        chartSettings3:{
          axisSite: { right: ['下单率'] },
          yAxisType: ['KMB', 'percent'],
          yAxisName: ['数值', '比率']
        },
      },
      this.row2_chartSettings = {
        chartSettings1:{
          stack: { '用户': ['访问用户', '下单用户'] },
          area: true
        },
        chartSettings2:{
          labelMap: {
            'PV': '访问用户',
            'Order': '下单用户'
          },
          legendName: {
            '访问用户': '访问用户 total: 10000'
          }
        },
        chartSettings4:{
          xAxisType: 'value', //设置横轴为连续的数值轴
          // xAxisType: 'time' //设置横轴为连续的时间轴
        }
      },
      this.row1_extend = {
        extend4:{
          'xAxis.0.axisLabel.rotate': 45
        }
      },
      this.row2_extend = {
        extend3:{
          series: {
            label: {
              normal: {
                show: true
              }
            }
          }
      }
      }
    return {
      dialog_visible:false,
      title:this.$t('msg.settings'),
      loading: true, //表格loading
      border: false, //表格边框显示 默认true 显示边框
      stripe: true, //表格斑马线 默认false不显示

      tableData:[ //表格数据
        {settings:'dimension',jianjie:'维度',dataType:'array',note:'默认columns第一项为维度'},
        {settings:'metrics	',jianjie:'指标',dataType:'array',note:'默认columns第二项起为指标'},
        {settings:'xAxisType',jianjie:'横轴的数据类型	',dataType:'string',note:'可选值: category, value, time, log'},
        {settings:'yAxisType',jianjie:'左右坐标轴数据类型	',dataType:'array',note:'可选值: KMB, normal, percent'},
        {settings:'yAxisName',jianjie:'左右坐标轴标题	',dataType:'array',note:'-'},
        {settings:'axisSite',jianjie:'指标所在的轴',dataType:'object',note:'默认不在right轴的指标都在left'},
        {settings:'stack',jianjie:'堆叠选项',dataType:'object',note:'-'},
        {settings:'area',jianjie:'是否展示为面积图',dataType:'boolean',note:'默认为false'},
        {settings:'scale	',jianjie:'	是否是脱离 0 值比例',dataType:'array',note:'默认为[false, false]，表示左右两个轴都不会脱离0值比例。设置成 true 后坐标刻度不会强制包含零刻度'},
        {settings:'min',jianjie:'	左右坐标轴最小值',dataType:'array',note:'-'},
        {settings:'max',jianjie:'左右坐标轴最大值	',dataType:'array',note:'-'},
        {settings:'digit',jianjie:'设置数据类型为percent时保留的位数',dataType:'number',note:'默认为2'},
        {settings:'labelMap',jianjie:'设置指标的别名，同时作用于提示框和图例	',dataType:'array',note:'-'},
        {settings:'legendName',jianjie:'设置图表上方图例的别名',dataType:'array',note:'-'},
      ],
      columnData:[ //对应列的表头数据
        {
          label: '配置项',//this.$t('table.status')
          prop: "settings",
          type: "settings",  
          width: "200"      
        },
        {
          label: '简介',//this.$t('table.status')
          prop: "jianjie",
          type: "jianjie",        
        },
        {
          label: '类型',//this.$t('table.status')
          prop: "dataType",
          type: "dataType",        
        },
        {
          label: '备注',//this.$t('table.status')
          prop: "note",
          type: "note", 
          width:'250px'      
        },

      ],
      buttons:[{
        type:'info',
        icon:'iconfont icon-peizhi',
        size:'mini',
        click:() => {
          this.dialog_visible = true
        },
        label:"配置"
      }],
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
        },
        chartData3: {
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
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
            { '日期': '1/7', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/8', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/9', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/10', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/11', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/12', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }  
      },
      row2_chartData:{
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
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '5', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '10', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '11', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '20', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      },
      
    }
  },
  methods:{
    handleClose(flag){
      this.dialog_visible = flag
    },
    submit(flag){
      this.dialog_visible = flag
    }
  }
 }
</script>

<style lang="scss" scope >
  .chart_container{
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
    .el-dialog__wrapper{
      top: -70px;
    }
  }
</style>