<template>
  <el-drawer size="90%" v-bind="$attrs" v-on="$listeners">
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
        <AppList v-bind="tableOptions" ref="questionList">
          <template v-slot:table-x="{ row }">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(row)"></el-button>
            <el-button type="primary" icon="el-icon-remove-outline" circle @click="handleEdit(row)"></el-button>
          </template>
        </AppList>
        <el-form class="editList" :model="editQuestionList">
          <el-form-item>
            <el-select v-model="editQuestionList.questionType">
              <el-option label="单选题" :value="0"></el-option>
              <el-option label="多选题" :value="1"></el-option>
              <el-option label="判断题" :value="2"></el-option>
              <el-option label="问答题" :value="3"></el-option>
              <el-option label="情景题" :value="4"></el-option>
              <el-option label="案例题" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="editQuestionList.difficulty">
              <el-option label="难" :value="0"></el-option>
              <el-option label="易" :value="1"></el-option>
              <el-option label="中" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="editQuestionList.questionNum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="editQuestionList.questionScore"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="editQuestionList.questionCategory">
              <el-option label="dsvnkskJVGB d" :value="0"></el-option>
              <el-option label="fisreoaff" :value="1"></el-option>
              <el-option label="fdjgidfg" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" circle></el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" circle></el-button>
            <el-button type="primary" icon="el-icon-remove-outline" circle></el-button>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="您计划自动组卷的试题情况：">
        <!-- 您计划自动组卷的试题情况 -->
        <div class="automatic">
          <div class="automatic_questionNum">总计试题数量：XX</div>
          <div class="automatic_totalScore">试卷总分：XXX</div>
        </div>
        <app-list v-bind="tableOptions1" ref="questionList"> </app-list>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="autoClick" @click="autoClick">自动组卷</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import AppList from './AppList.vue'
export default {
  data() {
    return {
      form: {
        paperType: '0'
      },
      paperList: [{}],
      editQuestionList: {
        difficulty: 1,
        questionNum: 0,
        questionScore: 0,
        questionType: 1,
        questionCategory: 1
      }
    }
  },
  components:{
    AppList
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
    autoClick() {}
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
  padding-left: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.automatic {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
