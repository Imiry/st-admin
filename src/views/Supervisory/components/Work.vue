<template>
  <div size="80%" v-bind="$attrs" v-on="$listeners" >
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
                {{scope.row[item.prop]}}
                <el-option v-for="(el, index) in item.options" :key="index" :label="el.label" :value="el.value">
                </el-option>
              </el-select>
              <!-- 数量 -->
              <el-input-number
                v-if="scope.row.edit && item.type === 'input' && item.prop === 'question_num'"
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="'请输入' + item.label"
                :min="1"
                :max="20"
              ></el-input-number>

              <!-- 分值 -->
              <el-input-number
                v-if="scope.row.edit && item.type === 'input' && item.prop === 'question_score'"
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="'请输入' + item.label"
                :min="1"
                :max="30"
              >
              </el-input-number>
              <span v-if="!scope.row.edit && item.prop === 'questionType'">{{ subOptionType[scope.row[item.prop]] }}</span>
              <span v-if="!scope.row.edit && item.prop === 'difficulty'">{{ difficultyOptionType[scope.row[item.prop]] }}</span>
              <span v-if="!scope.row.edit && item.prop === 'question_num'" >{{ scope.row[item.prop] }}</span>
              <span v-if="!scope.row.edit &&item.prop === 'question_score'">{{ scope.row[item.prop] }}</span>
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
          <el-table-column
            align="center"
            v-for="(item, index, key) in add_columns"
            :item="item"
            :key="key"
            :index="index"
            :label="item.label"
          >
            <template slot-scope="scope">
              <!-- 多选 -->
              <el-select v-model="scope.row[item.prop]" v-if="item.type === 'select'">
                <el-option v-for="(el, index) in item.options" :key="index" :label="el.label" :value="el.value">
                </el-option>
              </el-select>
              <!-- 数量 -->
              <el-input-number
                v-if="item.type === 'input' && item.prop === 'question_num_add'"
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="'请输入' + item.label"
                :min="1"
                :max="20"
              ></el-input-number>

              <!-- 分值 -->
              <el-input-number
                v-if="item.type === 'input' && item.prop === 'question_score_add'"
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="'请输入' + item.label"
                :min="1"
                :max="30"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column >
            <template slot-scope="scope">
              <el-popconfirm
                title="确定要添加？"
                @confirm="saveEdit(scope.row)"
              >
              <el-button type="primary" icon="el-icon-plus" circle slot="reference"></el-button>

              </el-popconfirm>
            </template>
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
        <div>
          <el-table ref="mytable" :data="getSituationData" style="width: 100%">
          <el-table-column
            align="center"
            v-for="(item, index, key) in situation_columns"
            :item="item"
            :key="key"
            :index="index"
            :label="item.label"
          >
            <template slot-scope="scope">
              <span v-if="item.prop === 'questionType'">{{ subOptionType[scope.row.questionType] }}</span>
              <span v-if="item.prop === 'questionDesc'">
                难 / {{scope.row.newItem.items[0].num}} / {{scope.row.newItem.items[0].score}} 
                易 / {{scope.row.newItem.items[1].num}} / {{scope.row.newItem.items[1].score}} 
                中 / {{scope.row.newItem.items[2].num}} / {{scope.row.newItem.items[2].score}}
              </span>
              <span v-if="item.prop === 'questionTotal'">{{ scope.row.newItem.tNum }} / {{ scope.row.newItem.tScore }}</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="autoClick" @click="autoClick">自动组卷</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        paperType: '0'
      },
      editData: [
        { questionType_add: '', difficulty_add: '', question_num_add: 1, question_score_add: 1, question_category_add: '', edit: false }
      ],
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
              value: '0',
              label: '单选题'
            },
            {
              value: '1',
              label: '多选题'
            },
            {
              value: '2',
              label: '判断题'
            },
            {
              value: '3',
              label: '问答题'
            },
            {
              value: '4',
              label: '情景题'
            },
            {
              value: '5',
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
              value: '0',
              label: '难'
            },
            {
              value: '1',
              label: '易'
            },
            {
              value: '2',
              label: '中'
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
          type: 'input'
        },
        {
          prop: 'question_category',
          label: '题目类别',
          type: 'select',
          options: [
            {
              value: '0',
              label: '难'
            },
            {
              value: '0',
              label: '易'
            },
            {
              value: '0',
              label: '高'
            }
          ]
        }
      ],
      add_columns: [
        {
          prop: 'questionType_add',
          label: '题目类型',
          type: 'select',
          options: [
            {
              value: '0',
              label: '单选题'
            },
            {
              value: '1',
              label: '多选题'
            },
            {
              value: '2',
              label: '判断题'
            },
            {
              value: '3',
              label: '问答题'
            },
            {
              value: '4',
              label: '情景题'
            },
            {
              value: '5',
              label: '案例题'
            }
          ]
        },
        {
          prop: 'difficulty_add',
          label: '难度',
          type: 'select',
          options: [
            {
              value: '0',
              label: '难'
            },
            {
              value: '1',
              label: '易'
            },
            {
              value: '2',
              label: '中'
            }
          ]
        },
        {
          prop: 'question_num_add',
          label: '数量',
          type: 'input'
        },
        {
          prop: 'question_score_add',
          label: '分值',
          type: 'input'
        },
        {
          prop: 'question_category_add',
          label: '题目类别',
          type: 'select',
          options: [
            {
              value: '0',
              label: '难'
            },
            {
              value: '1',
              label: '易'
            },
            {
              value: '2',
              label: '高'
            }
          ]
        }
      ],
      situation_columns:[
       {
          prop: 'questionType',
          label: '题目类型',
       },
       {
          prop: 'questionDesc',
          label: '难度 / 数量 / 分值',
       },
       {
          prop: 'questionTotal',
          label: '小计 (数量 / 分值）',
       },
      ],
      // 表格数据
      table_data: [],
      //select之后回显数据
      subOptionType : {
        0: '单选题',
        1: '多选题',
        2: '判断题',
        3: '问答题',
        4: '情景题',
        5: '案例题'
      },
      //题难度回显
      difficultyOptionType:{
        0: '难',
        1: '易',
        2: '中',
      }
    }
  },
  computed:{
    // 试题情况
    getSituationData() {
      //对每次天加的数据进行计算分值和数量
      const getNumsAndScores = (diffValue,type) => {
        let data = this.table_data
        console.log(data)
        if(type ==='num'){ //数量
          const numArray = data?.filter(item =>item.difficulty === diffValue).map(val => val.question_num)
          const init = 0
          const totalNum = numArray.reduce((prev, cur)=>prev+cur,init)
          return totalNum
        }else if(type === 'score'){ //分值
          const numArray = data?.filter(item =>item.difficulty === diffValue).map(val => val.question_score)
          const init = 0
          const totalScore = numArray.reduce((prev, cur)=>prev+cur,init)
          return totalScore
        }
      }
      const getLastData = () => {
        const newItem = {
          items:[
            {
              type:'难',
              num:getNumsAndScores('0','num'),
              score:getNumsAndScores('0','score')
            },
            {
              type:'易',
              num:getNumsAndScores('1','num'),
              score:getNumsAndScores('1','score')
            },
            {
              type:'中',
              num:getNumsAndScores('2','num'),
              score:getNumsAndScores('2','score')
            }
          ],
          tNum: getNumsAndScores('0','num') + getNumsAndScores('1','num') + getNumsAndScores('2','num'),
          tScore: getNumsAndScores('0','score') + getNumsAndScores('1','score') + getNumsAndScores('2','score'),
        }
        this.table_data.forEach(item => { item.newItem = newItem })  //为每次添加的数据进行加上newItem选项
        // return this.table_data
        return this.deteleObjectItem(this.table_data)   //去重，添加每个题型会累加，需要根据题的类型去重
      }
      const data = getLastData()  //赋值
      return data
    },
  },
  methods: {

    //去重方法 ---根据题的类型去重
    deteleObjectItem(obj) {
      let newArr=[]
      let newIndex = []
      obj.forEach(item => {
        if(newIndex.indexOf(item.questionType) === -1){
          newIndex.push(item.questionType)
          newArr.push(item)
        } 
      })
      return newArr;
    },
    
    autoClick() {},
    // 新增列表项
    saveEdit(row) {
      // console.log(row)
      const newData = {
        questionType: row.questionType_add,
        difficulty: row.difficulty_add,
        question_num: row.question_num_add,
        question_score: row.question_score_add,
        question_category: row.question_category_add,
        edit: false
      }

      if(newData?.questionType&&newData?.difficulty&&newData?.question_num>=1&&newData?.question_score>=1){
        this.table_data.push(newData)
        const addData = [
          { questionType_add: null, difficulty_add: null, question_num_add: 1, question_score_add: 1, question_category_add: null, edit: false }
        ]
        this.editData = addData // 重置
      }else{
        this.$message({
        message: '试题规则不能为空！',
        type: 'warning'
      })
      }
    },
    // 编辑
    handleEdit(index, row) {
      console.log(row, '----')
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
    }
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
