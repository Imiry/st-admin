<!--
 * @Author: sitao
 * @Date: 2020-11-26 09:58:50
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-27 13:51:17
-->
<template>
  <div class="tempalte_container">
    <!-- <st-panel></st-panel> -->
    <el-breadcrumb separator="/" class="crumb">
      <el-breadcrumb-item :to="{ path: '/st_welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('nav.template')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('template_subnav.template1')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="card">
          <div class="cd_header">
            <div class="header_left">
              <div class="title">TOTAL VISITORS</div>
              <countTo class="number" :startVal='0' :endVal='3291922' :duration='3000'></countTo>
              <!-- <div >3,291,922</div> -->
            </div>
            <div class="header_right">
              <sparkline height="23">
                <sparklineLine  :refLineStyles="sparkline1.refLineStyles"  :data="sparkline1.data" :limit="sparkline1.length" :styles="sparkline1.lineStyle" />
              </sparkline>
            </div>
          </div>
          <div class="cd_footer">
            <p>View Detail</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card1">
          <div class="cd_header">
            <div class="header_left">
              <div class="title">BOUNCE RATE</div>
              <countTo class="number" :startVal='0' :endVal='546134621' :duration='3000'></countTo>
              <!-- <div class="number">20.44%</div> -->
            </div>
            <div class="header_right">
              <sparkline height="23">
                <sparklineLine :refLineStyles="sparkline1.refLineStyles" :data="sparkline2.data" :limit="sparkline2.length" :styles="sparkline2.lineStyle" />
              </sparkline>
            </div>
          </div>
          <div class="cd_footer">
            <p>View Detail</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card2">
          <div class="cd_header">
            <div class="header_left">
              <div class="title">UNIQUE VISITORS</div>
              <countTo class="number" :startVal='0' :endVal='214461466' :duration='4000'></countTo>
              <!-- <div class="number">1,291,922</div> -->
            </div>
            <div class="header_right">
              <sparkline height="23">
                <sparklineLine :refLineStyles="sparkline1.refLineStyles" :data="sparkline3.data" :limit="sparkline3.length" :styles="sparkline3.lineStyle" />
              </sparkline>
            </div>
          </div>
          <div class="cd_footer">
            <p>View Detail</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card3">
          <div class="cd_header">
            <div class="header_left">
              <div class="title">AVG TIME ON SITE</div>
              <countTo class="number" :startVal='0' :endVal='10000000' :duration='4000'></countTo>
              <!-- <div class="number">00:12:23</div> -->
            </div>
            <div class="header_right">
              <sparkline height="23">
                <sparklineLine :refLineStyles="sparkline1.refLineStyles" :data="sparkline4.data" :limit="sparkline4.length" :styles="sparkline4.lineStyle" />
              </sparkline>
            </div>
          </div>
          <div class="cd_footer">
            <p>View Detail</p>
          </div>
        </div>
      </el-col>
    </el-row> 
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="elcol_right">
          <el-row>
            <el-col :span="18">
              <div class="dataChart1">
                <div class="chart_title">
                  <div class="tit">Visitors Analytics</div>
                  <div class="dec">Where do our visitors come from</div>
                </div>
                <div class="chart_con">
                  <ve-line ref="chart1" :data="lineData" :extend="lineExtend" :settings="lineSetting" height="350px" ></ve-line>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="dataChart2">
                <div class="total_number">
                  <div class="total">1,255,729</div>
                  <div class="total_dec">Total visitors</div>
                </div>
                <div class="con">
                  <ve-ring ref="chart2" :data="ringData" :extend="ringExtend" :settings="ringSettings"></ve-ring>
                </div>
                <div class="ul">
                  <div><span class="per">34.0%</span><span class="pname">New Visitors</span></div>
                  <div><span class="per">56.0%</span><span class="pname">Return Visitors</span></div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <st-panel class="panel" :title="'Line'" @resize="resizeChange">
              <div slot="content" >
                <ve-line ref="chart3"  :extend="lineExtend1" :data="lineData" :settings="lineSetting" height="300px"></ve-line>
              </div>
            </st-panel>
          </el-row>
          <el-row>
            <st-panel class="panel" >
              <div slot="content">
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    >
                    <el-table-column
                      prop="date"
                      label="日期"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                  </el-table>
              </div>
            </st-panel>
          </el-row>

        </div>
      </el-col>
      <el-col :span="8">
        <div class="elcol_left">
          <el-row>
            <st-panel @resize="resizeChange">
              <div slot="content">
                <ve-ring ref="chart4" :data="chartData" :settings="chartSettings" height="350px"></ve-ring>
              </div>
            </st-panel>
          </el-row>
          <el-row>
            <st-panel @resize="resizeChange">
              <div slot="content">
                <ve-candle ref="chart5" :data="chartData2" height="300px"></ve-candle>
              </div>
            </st-panel>
          </el-row>
          <!-- <st-panel>
            <div slot="content"></div>
          </st-panel> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import { mapState } from 'vuex'
export default {
  name: 'Tempalte1',
  components:{
    countTo
  },
  data() { 
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
      }],
      lineData:{
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '1/1', '访问用户': 20, '下单用户': 120, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 30, '下单用户': 154, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 45, '下单用户': 123, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 70, '下单用户': 223, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 58, '下单用户': 145, '下单率': 0.423 },
          { '日期': '1/6', '访问用户': 88, '下单用户': 57, '下单率': 0.78 },
          { '日期': '1/7', '访问用户': 42, '下单用户': 78, '下单率': 0.96 },
          { '日期': '1/8', '访问用户': 45, '下单用户': 36, '下单率': 0.69 },
          { '日期': '1/9', '访问用户': 10, '下单用户': 95, '下单率': 0.423 },
          { '日期': '1/10', '访问用户': 220, '下单用户': 98, '下单率': 0.98 }
        ]
      },
      
      lineSetting:{
        stack: { '用户': ['访问用户', '下单用户'] },
        area: true,
        offsetY: 200, 
      },
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
      },
      chartSettings:{roseType: 'radius'},
      ringSettings:{
        radius: [30, 60],
        offsetY: 100,
        legendLimit:0
      },
      ringExtend:{
        series:{
          label: {
            show: true,
            position: 'inner'
          },
          labelLine: {
            show: false
          },
        }
      },
      ringData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '34.0%', '访问用户': 1393 },
          { '日期': '56.0%', '访问用户': 3530 },
        ]
      },
      lineExtend:{
        legend:{
          top:30,
          right:10,
          textStyle:{
            color:'#000'
          }
        },
        textStyle:{
          color:'#000'
        },
        color:['#1A94E6','#33AECC']
      },
      lineExtend1:{
        legend:{
          top:20,
          right:20,
          textStyle:{
            color:'#000'
          }
        },
      },
      chartData2: {
        columns: ['日期', 'open', 'close', 'lowest', 'highest', 'vol'],
        rows: [
          { '日期': '2004-01-05', open: 10411.85, close: 10544.07, lowest: 10411.85, highest: 10575.92, vol: 221290000 },
          { '日期': '2004-01-06', open: 10543.85, close: 10538.66, lowest: 10454.37, highest: 10584.07, vol: 191460000 },
          { '日期': '2004-01-07', open: 10535.46, close: 10529.03, lowest: 10432.12, highest: 10587.55, vol: 225490000 },
          { '日期': '2004-01-08', open: 10530.07, close: 10592.44, lowest: 10480.59, highest: 10651.99, vol: 237770000 },
          { '日期': '2004-01-09', open: 10589.25, close: 10458.89, lowest: 10420.52, highest: 10603.48, vol: 223250000 },
          { '日期': '2004-01-12', open: 10461.55, close: 10485.18, lowest: 10389.85, highest: 10543.03, vol: 197960000 },
          { '日期': '2004-01-13', open: 10485.18, close: 10427.18, lowest: 10341.19, highest: 10539.25, vol: 197310000 },
          { '日期': '2004-01-14', open: 10428.67, close: 10538.37, lowest: 10426.89, highest: 10573.85, vol: 186280000 },
          { '日期': '2004-01-15', open: 10534.52, close: 10553.85, lowest: 10454.52, highest: 10639.03, vol: 260090000 },
          { '日期': '2004-01-16', open: 10556.37, close: 10600.51, lowest: 10503.71, highest: 10666.88, vol: 254170000 },
          { '日期': '2004-01-20', open: 10601.42, close: 10528.66, lowest: 10447.92, highest: 10676.96, vol: 224300000 },
          { '日期': '2004-01-21', open: 10522.77, close: 10623.62, lowest: 10453.11, highest: 10665.72, vol: 214920000 },
          { '日期': '2004-01-22', open: 10624.22, close: 10623.18, lowest: 10545.03, highest: 10717.41, vol: 219720000 },
          { '日期': '2004-01-23', open: 10625.25, close: 10568.29, lowest: 10490.14, highest: 10691.77, vol: 234260000 },
          { '日期': '2004-01-26', open: 10568.12, close: 10702.51, lowest: 10510.44, highest: 10725.18, vol: 186170000 },
          { '日期': '2004-01-27', open: 10701.11, close: 10609.92, lowest: 10579.33, highest: 10748.81, vol: 206560000 },
          { '日期': '2004-01-28', open: 10610.07, close: 10468.37, lowest: 10412.44, highest: 10703.25, vol: 247660000 },
          { '日期': '2004-01-29', open: 10467.41, close: 10510.29, lowest: 10369.92, highest: 10611.56, vol: 273970000 },
          { '日期': '2004-01-30', open: 10510.22, close: 10488.07, lowest: 10385.56, highest: 10551.03, vol: 208990000 },
          { '日期': '2004-02-02', open: 10487.78, close: 10499.18, lowest: 10395.55, highest: 10614.44, vol: 224800000 },
          { '日期': '2004-02-03', open: 10499.48, close: 10505.18, lowest: 10414.15, highest: 10571.48, vol: 183810000 },
          { '日期': '2004-02-04', open: 10503.11, close: 10470.74, lowest: 10394.81, highest: 10567.85, vol: 227760000 },
          { '日期': '2004-02-05', open: 10469.33, close: 10495.55, lowest: 10399.92, highest: 10566.37, vol: 187810000 },
          { '日期': '2004-02-06', open: 10494.89, close: 10593.03, lowest: 10433.74, highest: 10634.81, vol: 182880000 },
          { '日期': '2004-02-09', open: 10592.41, close: 10579.03, lowest: 10433.72, highest: 10634.81, vol: 160720000 },
          { '日期': '2004-02-10', open: 10578.74, close: 10613.85, lowest: 10511.18, highest: 10667.03, vol: 160590000 },
          { '日期': '2004-02-11', open: 10605.48, close: 10737.72, lowest: 10561.55, highest: 10779.41, vol: 277850000 },
          { '日期': '2004-02-12', open: 10735.18, close: 10694.07, lowest: 10636.44, highest: 10775.03, vol: 197560000 },
          { '日期': '2004-02-13', open: 10696.22, close: 10627.85, lowest: 10578.66, highest: 10755.47, vol: 208340000 },
          { '日期': '2004-02-17', open: 10628.88, close: 10714.88, lowest: 10628.88, highest: 10762.07, vol: 169730000 },
          { '日期': '2004-02-18', open: 10706.68, close: 10671.99, lowest: 10623.62, highest: 10764.36, vol: 164370000 },
          { '日期': '2004-02-19', open: 10674.59, close: 10664.73, lowest: 10626.44, highest: 10794.95, vol: 219890000 },
          { '日期': '2004-02-20', open: 10666.29, close: 10619.03, lowest: 10559.11, highest: 10722.77, vol: 220560000 },
          { '日期': '2004-02-23', open: 10619.55, close: 10609.62, lowest: 10508.89, highest: 10711.84, vol: 229950000 },
          { '日期': '2004-02-24', open: 10609.55, close: 10566.37, lowest: 10479.33, highest: 10681.41, vol: 225670000 },
          { '日期': '2004-02-25', open: 10566.59, close: 10601.62, lowest: 10509.42, highest: 10660.73, vol: 192420000 },
          { '日期': '2004-02-26', open: 10598.14, close: 10580.14, lowest: 10493.71, highest: 10652.96, vol: 223230000 },
          { '日期': '2004-02-27', open: 10581.55, close: 10583.92, lowest: 10519.03, highest: 10689.55, vol: 200050000 }
        ]
      },
      sparkline1: {
				data: [ 50,30,45,40,50,20,35,40,50,70,90,40 ],
        length: 12,
        // 指示器样式
        spIndicatorStyles1: false,
				lineStyle: {
					stroke: '#fff',
					strokeWidth: 2
        },
        refLineStyles:{
          strokeOpacity:0
        }
      },
      sparkline2: {
				data: [ 50,30,45,40,50,20,35,40,50,70,90,40 ],
        length: 12,
        // 指示器样式
        spIndicatorStyles1: false,
				lineStyle: {
					stroke: '#627884',
					strokeWidth: 2
        }
      },
      sparkline3: {
				data: [ 50,30,45,40,50,20,35,40,50,70,90,40 ],
        length: 12,
        // 指示器样式
        spIndicatorStyles1: false,
				lineStyle: {
					stroke: '#f59c1a',
					strokeWidth: 2
        }
      },
      sparkline4: {
				data: [ 50,30,45,40,50,20,35,40,50,70,90,40 ],
        length: 12,
        // 指示器样式
        spIndicatorStyles1: false,
				lineStyle: {
					stroke: '#e6abca',
					strokeWidth: 2
        }
      },
      
      
    }
  },
  mounted(){

  },
  computed:mapState({
    isCollapse:state => state.i18n.isCollapse
  }),
  watch:{
    isCollapse:function(newV,oldV){
      // console.log(newV)
      if(newV!==oldV){
        this.reload()
      }
    }
  },
  methods:{
    resizeChange(){
      this.$nextTick(() => {   
          // this.refs.line.resize();
          this.$refs['chart3']&&this.$refs['chart3'].echartsResize()
          this.$refs['chart4']&&this.$refs['chart4'].echartsResize()
          this.$refs['chart5']&&this.$refs['chart5'].echartsResize()
      });
    },
    reload(){    
        for(let i = 1;i <= 5;i++){
           console.log(this.$refs[`chart${i}`])
           setTimeout(() => {
            this.$refs[`chart${i}`]&&this.$refs[`chart${i}`].echartsResize()
          },300)
        }
      
    }
  }
 }
</script>

<style lang="scss" >
  .tempalte_container{
    .crumb{
      margin-bottom: 20px;
    }
    .card,.card1,.card2,.card3{
      height: 130px;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // align-items: center;
      .cd_header{
        height: 100px;
        // background-color: #899297;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .header_left{
          width: 45%;
          height: 100%;
          // background-color: rgb(134, 85, 85);
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .title{
            font-size: 12px;
            color: #FFFFFFB3;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .number{
            font-size: 24px;
            color: #fff;
          }
        }
        .header_right{
          width: 55%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          // background-color: rgb(77, 160, 69);
        }
      }
      .cd_footer{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        height: 30px;
        background-color: rgba(0,0,0,.3);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        p{
          font-size: 12px;
          margin-right: 10px;
        }
      }
      .cd_footer:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,.5);
        color: #fff;

      }
    }
    .card{
      background-color: #ff5b57 !important;
    }
    .card1{
      background-color: #f59c1a !important;
    }
    .card2{
      background-color: #899297 !important;
    }
    .card3{
      background-color: #404040 !important;
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
          .dataChart1{
            height: 350px;
            // background-color: #2d353c;
            background-color: rgba(0,0,0,.4);
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            box-sizing: border-box;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .chart_title{
              height: 30px;
              .tit{
                font-size: 18px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #000;
              }
              .dec{
                color: rgb(230, 219, 219);
              }
            }
          }
          .dataChart2{
            height: 350px;
            padding: 15px;
            box-sizing: border-box;
            // background-color: #1a2229;
            background-color: rgba(0,0,0,0.6);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            .total_number{
              .total{
                font-size: 24px;           
                color: #fff;
              }
              .total_dec{
                font-size: 12px;
                color: #9ba8b4;
              }
              
            }
            .con{
              height: 210px;
            }
            .ul{
              .per{
                color: #fff;
                font-size: 12px;
              }
              .pname{
                display: inline-block;
                margin-left: 10px;
                color:#9ba8b4 ;
                font-size: 12px;
              }
            }

          }
          .panel{
            margin-bottom: 10px;
            .el-table{
              border-radius: 4px;
            }
          }
        }
        .elcol_left{
          width: 100%;
          border-radius: 5px;
        }
      }
        
    }
  }
</style>