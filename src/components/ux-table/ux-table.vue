
<template>
  <div class="ux-table-tpl">
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
         <!-- 下面有不同的column -->
            <el-table-column
                v-if="select_all"
                align="center"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                class="select-single"
                v-if="select_single"
                align="center"
                type="selection"
                width="55">
            </el-table-column>
             <template v-for="(column,index) in columnData">
                 <!-- 渲染每个column，每个column对应prop下面的数据放到tempalte里面，然后再根据你再根据column.type选择类型，在渲染下面v-if判断对应的模块 -->
                 <el-table-column 
                    :label="column.label || ''"
                    :prop="column.prop" 
                    :key="index+'column'"
                    :align="column.align || 'center'"
                    :width="column.width || null"
                    :sortable="column.sort"  
                  >
                  <!-- 下面是用来放数据的版块 -->
                    <template v-slot="props">
                        <!-- 下面是根据column对应的prop的数据中的类型column.type选择渲染那个模块 -->
                          <el-tooltip v-if="column.type==='uuid'" effect="dark" :content="`ID : ${props.row.uuid}`" placement="top-start"  popper-class="atooltip">
                            <span size="medium">{{ props.row[column.prop] }}</span>
                          </el-tooltip>
                           <span class="cursor" v-if="column.type==='to-page'" @click="toPage(props.row)">{{props.row[column.prop]}}</span>
                           <span v-if="column.type==='html'">{{props.row[column.prop]}}</span>
                           <span v-if="column.type==='status'||column.type==='state'">{{props.row[column.prop] | statusFilter}}</span>
                           <span v-if="column.type==='time'">{{props.row[column.prop].includes&&props.row[column.prop].includes('-')? props.row[column.prop]:props.row[column.prop] | dateFormat}}</span>
                           <span v-if="column.type==='progress'">
                               <el-progress class="ux-table-progress" :text-inside="true" :stroke-width="18"  :percentage="props.row[column.prop]"></el-progress>
                           </span>
                           <span v-if="column.type==='size'">{{props.row[column.prop]|humanLimitSize}}</span>
                           <span v-if="column.type==='size-format'">{{props.row[column.prop]}}</span>
                           <span v-if="column.type==='size-unit'">{{props.row[column.prop]}}{{column.limit}}</span>
                           <span v-if="column.type==='select'">
                                <el-select v-model="props.row[column.prop+'_list']" size="mini">
                                      <el-option
                                        v-for="(select,index) in props.row[column.prop]" 
                                        :key="'select'+index"
                                        :label="select"
                                        :value="select"
                                      >
                                     </el-option>
                               </el-select>
                           </span>
                            <span v-if="column.type==='dragdown'">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
                                        {{$t('button.more')}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <template v-for="(drag,index) in column.drag_list" >
                                            <el-dropdown-item :key="index" :disabled="!drag.isDisabled(props.row)">
                                                <div @click="drag.handle(props.row)">{{$t(`button.${drag.label}`)}}</div> 
                                            </el-dropdown-item>
                                        </template>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </span>
                             <span v-if="column.type==='button'">
                                <template v-for="(btn,index) in column.btn_list">
                                    <el-button :type="btn.type||'primary'" :key="index" size="mini"
                                        :disabled="!btn.isDisabled(props.row)"
                                        @click="btn.handle(props.row)"
                                        >{{$t(`button.${btn.label}`)}}
                                    </el-button>
                                </template>
                            </span>
                    </template>
                 </el-table-column>
             </template>
    </el-table>
    <!-- {{$attrs}} -->
    <!-- <ux-pagination ></ux-pagination> -->

    <ux-pagination class="m-t-10" v-bind="$attrs" v-on="$listeners" v-if="$attrs.total"></ux-pagination>
  </div>
</template>
<script src="./ux-table.js"></script>
<style lang="scss" scoped src="./ux-table.scss"></style>