<!--
 * @Author: sitao
 * @Date: 2020-12-09 16:25:42
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-18 11:07:07
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
    <el-row :gutter="20">
      <el-col :span="8">
        <st-card :cardData="cardData">
          <div class="per_con">
            <el-progress type="circle" :key="key"  :percentage="percentage" :color="colors"></el-progress>
            <div class="per_num f-w-600 width-80 height-80 text-center">{{percentage}}%</div>
          </div>
          <div class="per_dec m-t-50">
            <el-steps :active="active" finish-status="success">
              <el-step title="0%"></el-step>
              <el-step title="50%"></el-step>
              <el-step title="100%"></el-step>
            </el-steps>
          </div>
          <!-- <st-progress :height="5" :percent="percentage" :perColor="'#00ACAC'"></st-progress> -->
        </st-card>
      </el-col>
      <el-col :span="16">
        <el-card class="card_map"><div class='chart' id='chart'></div></el-card>
      </el-col>
    </el-row>
    
    <!-- <st-progress :height="2" :bgcolor="'rgba(0,0,0,.5)'" :perColor="'#fff'" :percent="70"></st-progress> -->
  </div>
</template>

<script>
    import echarts from 'echarts'
import stProgress from '../../components/st-progress/st-progress.vue'
export default {
  components: { stProgress },
  name: 'Template2',
  data() { 
    return {
      cardData: {
        cardname:"Task",
        size:'mini',
        btntype:'info',
        textValue:'share',
        icon:"",
      },
      percentage:0,
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      status:'',
      key:0, //用来控制定时器的
      active: 0,//步骤条
    }
  },
  props:{
        msg:{
          type:Object,
          default:() => {}
        }
      },
  watch:{
    msg:{
      deep: true,
      handler(val) {
        this.getWorld(val)
      }
    }
  },
  mounted () {
    this.getWorld(this.msg);
    this.timeOut()
    
  },
  methods: {
    format(percentage) {
      return '';
    },
    getWorld (data) {
      var that = this
      this.$http.get('world').then(function (res) {
        // console.log(res)
        let namemap = res.data.namemap
        let dataArr = res.data.dataArr
        // let dataArr = data.data
        that.drawChart(namemap, dataArr)
      })
    },
    drawChart (name, data) {
      // 基于准备好的dom，初始化echarts实例
      let chart = echarts.init(document.getElementById('chart'))
      // 监听屏幕变化自动缩放图表
      window.addEventListener('resize', function () {
        chart.resize()
      })
      // 绘制图表
      chart.setOption({
        // 图表主标题
        // title: {
        //   text: '世界地图', // 主标题文本，支持使用 \n 换行
        //   top: 10, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
        //   left: 'center', // 值: 'left', 'center', 'right' 同上
        //   textStyle: { // 文本样式
        //     fontSize: 24,
        //     fontWeight: 600,
        //     color: '#000'
        //   }
        // },
        grid: {
          width:'100%',
          height:'100%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        // 提示框组件
        tooltip: {
          trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 使用函数模板  传入的数据值 -> value: number | Array
          formatter: function (val) {
            if(val.data == null) return ;
            return val.data.name + ': ' + val.data.value
          }
        },
        // 视觉映射组件
        // visualMap: {
        //   min: 0,
        //   max: 10000,
        //   text:['max','min'],
        //   realtime: false,
        //   calculable: true,
        //   color: ['#0064d0','#c3e0ff'],
        // },
        series: [
          {
            type: 'map', // 类型
            // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
            name: '世界地图',
            mapType: 'world', // 地图类型
            // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
            roam: true,
            // 图形上的文本标签
            label: {
              show: false // 是否显示对应地名
            },
            zoom: 1.2,
            // 地图区域的多边形 图形样式
            itemStyle: {
              areaColor: '#2D353C', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
              borderWidth: 0.5, // 描边线宽 为 0 时无描边
              borderColor: '#fff', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
              borderType: 'solid' // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
            },
            // 高亮状态下的多边形和标签样式
            emphasis: {
              label: {
                show: true, // 是否显示标签
                color: '#fff' // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
              },
              itemStyle: {
                areaColor: '#00ACAC' // 地图区域的颜色
              }
            },
            // 自定义地区的名称映射
            nameMap: name,
            // 地图系列中的数据内容数组 数组项可以为单个数值
            data: data
          }
        ],
        
      })
    },
    //进度定时器
    timeOut() {  
        let timer = setInterval(() => {
          this.percentage++;
          if(this.percentage == 50){
            this.active = 2
          }else if(this.percentage ==100){
            this.active = 3  
          }
          if(this.percentage >= 100){   
              clearInterval(timer)
              this.percentage = 0
              this.key = 1
              let timer1 = setTimeout(() => {
                this.key = 0
                this.active = 0
                this.timeOut()
                clearTimeout(timer1)
                // console.log(111)
              }, 1000);
          }
        },300)
      
    },

  },

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
      padding: 15px;
      cursor: pointer;
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
    .per_con{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .per_num{
        font-size: 30px;
        background-color: rgba(0,0,0,.1);
        line-height: 80px;
        border-radius: 5px;
      }
      
    }
    .card_map{
      width: 100%;
      background-color: rgba(0,0,0,.1);
      .chart{
        width: 100%;
        margin:0 auto;
        height: 300px;
        // border: 1px solid #c21b1b;
      }
    }
    
  }
</style>