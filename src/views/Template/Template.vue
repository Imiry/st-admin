<!--
 * @Author: sitao
 * @Date: 2020-11-26 09:58:50
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-08 18:08:07
-->
<template>
  <div class="tempalte_container">
    <!-- <st-panel></st-panel> -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="elcol_right">
          <st-panel class="panel" :title="'Default Table'">
            <div slot="content">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  >
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                </el-table>
            </div>
          </st-panel>
          <st-panel class="panel">
            <div slot="content">
              
            </div>
          </st-panel>
          <st-panel class="panel">
            <div slot="content">
              
            </div>
          </st-panel>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="elcol_left">
          <st-panel>
            <div slot="content"></div>
          </st-panel>
          <st-panel>
            <div slot="content"></div>
          </st-panel>
          <st-panel>
            <div slot="content"></div>
          </st-panel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import StPanel from '../../components/st-panel/st-panel.vue'

export default {
  name: 'Tempalte',
  components: {
    StPanel

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
      }]
    }
  }
 }
</script>

<style lang="scss" >
  .tempalte_container{
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-col{
        border-radius: 5px;
        .elcol_right{
          width: 100%;
          border-radius: 5px;
          .panel{
            margin-bottom: 10px;
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