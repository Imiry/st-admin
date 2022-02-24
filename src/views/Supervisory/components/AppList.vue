<template>
  <el-drawer size="80%" v-bind="$attrs" v-on="$listeners">
    <div slot="header" class="clearfix">
      <span>试卷列表</span>
    </div>
    <el-form :model="form" style="padding-left: 30px">
      <!-- 组卷题库 -->
      <el-form-item label="组卷题库：">
        <el-radio-group v-model="form.paperType">
          <el-radio label="0">我的题库</el-radio>
          <el-radio label="1">公共题库</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 自动组卷规则 -->
      <el-form-item label="自动组件规则：">
        <el-table ref="mytable" :data="table_data" style="width: 100%">
          <el-table-column
            align="center"
            v-for="(item, index, key) in table_columns"
            :item="item"
            :key="key"
            :index="index"
            :label="item.label"
          >
            <template slot-scope="scope">
              <!-- 多选 -->
              <el-select v-model="scope.row[item.prop]" v-if="scope.row.edit && item.type === 'select'">
                <el-option v-for="(el, index) in item.options" :key="index" :label="el.label" :value="el.label">
                </el-option>
              </el-select>
              <!-- 数量 -->
              <el-input-number
                v-if="scope.row.edit && item.type === 'input' && item.prop === 'num'"
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="'请输入' + item.label"
                :min="1"
                :max="20"
              ></el-input-number>

              <!-- 分值 -->
              <el-input-number
                v-if="scope.row.edit && item.type === 'input' && item.prop === 'scodeValue'"
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="'请输入' + item.label"
                :min="1"
                :max="30"
              >
              </el-input-number>
              <span v-if="!scope.row.edit">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                v-if="!scope.row.edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <!-- 保存 -->
              <el-button
                circle
                size="mini"
                type="success"
                :plain="true"
                icon="el-icon-check"
                v-if="scope.row.edit"
                @click="handleSave(scope.$index, scope.row)"
              ></el-button>

              <el-button
                style="margin-left: 10px"
                circle
                icon="el-icon-minus"
                size="mini"
                v-if="is_delete && scope.row.add == undefined"
                :plain="true"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- editData -->
        <el-table :data="editData" :show-header="false">
          <el-table-column property="question_type" label="题目类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.questionType">
                <el-option label="单选题" :value="0"></el-option>
                <el-option label="多选题" :value="1"></el-option>
                <el-option label="判断题" :value="2"></el-option>
                <el-option label="问答题" :value="3"></el-option>
                <el-option label="情景题" :value="4"></el-option>
                <el-option label="案例题" :value="5"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column property="difficulty" label="难度"
            ><template slot-scope="scope">
              <el-select v-model="scope.row.difficulty">
                <el-option label="难" :value="0"></el-option>
                <el-option label="易" :value="1"></el-option>
                <el-option label="中" :value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column property="question_num" label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.question_num"></el-input>
            </template>
            <span></span
          ></el-table-column>
          <el-table-column property="question_score" label="每题分值">
            <template slot-scope="scope">
              <el-input v-model="scope.row.question_score"></el-input>
            </template>
            <span></span
          ></el-table-column>
          <el-table-column property="question_category" label="题目类别">
            <template slot-scope="scope">
              <el-select v-model="scope.row.question_category">
                <el-option label="测试1" :value="0"></el-option>
                <el-option label="测试2" :value="1"></el-option>
                <el-option label="测试3" :value="2"></el-option>
              </el-select>
            </template>
            <span></span
          ></el-table-column>
          <el-table-column property="date">
            <el-button type="primary" icon="el-icon-check" circle @click="saveEdit"></el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" circle></el-button>
            <el-button type="primary" icon="el-icon-remove-outline" circle></el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 您计划自动组卷的试题情况： -->
      <el-form-item label="您计划自动组卷的试题情况：">
        <!-- 您计划自动组卷的试题情况 -->
        <div class="automatic">
          <div class="automatic_questionNum">总计试题数量：XX</div>
          <div class="automatic_totalScore">试卷总分：XXX</div>
        </div>
        <app-list v-bind="tableOptions1" ref="questionList"> </app-list>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" class="autoClick" @click="autoClick">自动组卷</el-button> -->
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        paperType: '0'
      },
      editData: [{ questionType: 1, difficulty: 1, question_num: 0, question_score: 0, question_category: 2 }],
      new_date_json: {}, // 数据结构
      multipleSelection: [], // 复选框，数据
      is_edit: true, // 是否可编辑
      is_delete: true, // 是否可删除
      // 表头信息
      table_columns: [
        {
          prop: 'questionType',
          label: '题目类型',
          type: 'select',
          options: [
            {
              value: 0,
              label: '单选题'
            },
            {
              value: 1,
              label: '多选题'
            },
            {
              value: 2,
              label: '判断题'
            },
            {
              value: 3,
              label: '问答题'
            },
            {
              value: 4,
              label: '情景题'
            },
            {
              value: 5,
              label: '案例题'
            }
          ]
        },
        {
          prop: 'difficulty',
          label: '难度',
          type: 'select',
          options: [
            {
              value: 0,
              label: '难'
            },
            {
              value: 0,
              label: '易'
            },
            {
              value: 0,
              label: '高'
            }
          ]
        },
        {
          prop: 'question_num',
          label: '数量',
          type: 'input'
        },
        {
          prop: 'question_score',
          label: '分值',
          width: '',
          type: 'input'
        }
      ],
      // 表格数据
      table_data: []
    }
  },
  computed: {
    tableOptions() {
      return {
        // remote: { httpRequest: getAppList },

        columns: [
          { label: '题目类型', prop: 'name', align: 'center' },
          { label: '难度', prop: 'alias_name', align: 'center' },
          { label: '数量', prop: 'desc', align: 'center' },
          { label: '每题分值', prop: 'desc2', align: 'center' },
          { label: '题目类别', prop: 'desc3', align: 'center' },
          { label: '操作', slots: 'table-x', align: 'center', width: 150 }
        ],
        data: [
          {
            index: 1,
            name: 'dfshfh'
          },
          {
            index: 1,
            name: 'dfshfh'
          },
          {
            index: 1,
            name: 'dfshfh'
          }
        ]
      }
    },
    tableOptions1() {
      return {
        // remote: { httpRequest: getAppList },
        columns: [
          { label: '题目类型', prop: 'name', align: 'center' },
          { label: '难度', prop: 'alias_name', align: 'center' },
          { label: '小计', prop: 'desc', align: 'center' }
        ],
        data: [
          {
            index: 1,
            name: 'dfshfh'
          },
          {
            index: 1,
            name: 'dfshfh'
          },
          {
            index: 1,
            name: 'dfshfh'
          }
        ]
      }
    }
  },
  methods: {
    // 新增列表项
    saveEdit() {
      console.log(this.editData)
      this.table_data.push(this.editData[0])
    },
    // 编辑
    handleEdit(index, row) {
      console.log(row.redit, '----')
      console.log(index, row)
      row.edit = true
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row)
      this.table_data.splice(index, 1) // 前端删除
      // 下面掉接口删除-------
      this.$message({
        message: '删除成功！',
        type: 'success'
      })
    },
    // 保存
    handleSave(index, row) {
      console.log(index, row)
      row.edit = false
      delete this.table_data[index].add
      this.$message({
        message: '保存成功！',
        type: 'success'
      })
    },
    // 初始化编辑属性
    initEditAttribute() {
      // const self = this
      // const edit = edit
      const dataArray = []
      // 后端返回的数据需要对数据进行处理
      if (dataArray.length > 0) {
        // 添加编辑事件
        for (const index in dataArray) {
          dataArray[index].edit = false // 为将要展示表格每条数据加个‘edit’属性，方便前面判断编辑功能
          this.table_data.push(dataArray[index])
        }
        if (Object.keys(this.new_date_json).length === 0) {
          // 新增时，初始化数据结构
          this.initAddDataJson(dataArray[0])
        }
      }
      console.log('this.tableData:', this.table_data)
    },
    initAddDataJson(dataArray) {
      // 新增时，初始化数据结构
      const dataJson = dataArray
      const newDateJson = {}
      for (const key in dataJson) {
        if (key === 'edit') {
          newDateJson[key] = 'true'
        } else {
          newDateJson[key] = ''
        }
      }
      newDateJson.add = true
      this.new_date_json = newDateJson
    }
  },
  mounted: function () {
    this.initEditAttribute()
  }
}
</script>

<style lang="scss" scoped>
.autoClick {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.editList {
  // padding-left: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.automatic {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-table__empty-text {
  display: none;
}
::v-deep .el-table__empty-block {
  min-height: 0;
}
</style>
