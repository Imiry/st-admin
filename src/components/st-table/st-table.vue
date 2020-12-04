<!--
 * @Author: sitao
 * @Date: 2020-12-04 14:25:07
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-04 15:31:25
 *  @tableData 表格数据
 *  @columnData 表头数据
 *  @total 总条数
 *  @handleSizeChange 每页显示条数选择
 *  @handleCurrentChange 当前页选择
 *  @border 表格边框
 *  @stripe 表格斑马线
 *  @height 表格固定高度
 *  @size 表格尺寸
 *  @loading loading
 *  @select_all 全选
 *  @select_single 单选
 *  @toPage 跳转页面回调
 *  @sortChange 排序回调 ASC升序 DESC降序
 *  @selectAllData 全选回调
 *  @selectSinger 单选回调
-->
<template>
  <div class="st-table_container">
    <el-table 
      ref="multipleTable"
      :data="tableData" 
      :columnData="columnData"
      :border="border"
      :stripe="stripe"
      :height="height"
      :size="size"
      v-loading="loading"
      :header-cell-class-name="cellclass"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      @select="select"
    >
    <template v-for="(column,index) in columnData">
      <el-table-column
        :label="column.label || ''"
        :prop="column.prop" 
        :key="index+'column'"
        :align="column.align || 'center'"
        :width="column.width || null"
        :sortable="column.sort"
      >
        <template v-slot="props">
          <!-- 可能以后不同的表头 -->
          <span v-if="column.type === 'settings'">{{props.row[column.prop]}}</span>
          <span v-if="column.type === 'jianjie'">{{props.row[column.prop]}}</span>
          <span v-if="column.type === 'dataType'">{{props.row[column.prop]}}</span>
          <span v-if="column.type === 'note'">{{props.row[column.prop]}}</span>
        </template>

      </el-table-column>
    </template>
    </el-table>
  </div>
</template>

<script>
import Template from '../../views/Template/Template.vue'
export default {
  components: { Template },
  name: 'st-table',
  props: {
    tableData: {
        type: Array,
        required: true,
        default: () => []
    },
    columnData: {
      type: Array,
      required: true,
      default: () => []
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number | String,
      default: null
    },
    width: {
      type: Number | String,
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    },
    loading: {
      type: Boolean,
      default: false
    },
    select_all: {
      type: Boolean,
      default: false
    },
    select_single: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {

    }
  },
  methods:{
    toPage(row) {
      this.$emit('toPage', row)
    },
    sortChange(sort) {
      let order = sort.order === 'ascending' ? 'asc' : 'desc'
      this.$emit('sortChange', order)
    },
    handleSelectionChange(data) { //当选择项发生变化时会触发该事件
        if(this.select_single) return
        this.$emit('selectAllData',data) //全选，向父组件自定义一个事件
    },
    select(selection, row) { //element-ui中的事件：当用户手动勾选数据行的 Checkbox 时触发的事件
        if (this.select_all) return
        this.$refs.multipleTable.clearSelection();
        if (selection.length === 0) return;
        this.$refs.multipleTable.toggleRowSelection(row, true);
        this.$emit('selectSinger',Array.of(row)) //发起单选
    },
    cellclass(row){
        if(this.select_single&&row.columnIndex===0){
          return 'disabled_selection'
        }
    }
  }
 }
</script>

<style lang="scss" >
  .st-table_container{
  }
</style>