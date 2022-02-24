<template>
  <div style="margin-top: 32px">
    <el-row :gutter="20">
      <!-- 试题列表 -->
      <el-col :span="16">
        <el-card id="questionMain"
          ><div slot="header" class="clearfix">
            <span class="clearfix_tit"> 试题列表</span>
            <el-button class="clearfix_del" type="primary" @click="delCheckedQuestion">删除所选试题</el-button>
            <el-button class="clearfix_add" type="primary" @click="addPaper">添加试题</el-button>
          </div>
          <!-- 题目列表 -->
          <QuestionListItem
            :questionList="questionList"
            ref="listItemRef"
            @handlePosition="handlePosition"
            @selectSubjectsChange="selectSubjectsChange"
          />
          <!-- <div class="nonePaper">该试卷无试题，去添加试题吧</div> -->
        </el-card>
      </el-col>
      <!-- 题目序号列表 -->
      <el-col :span="8">
        <el-card>
          <div class="titleIndex">
            <ul>
              <li
                :class="currentIndex === index + 1 ? `dotItem` : ''"
                v-for="(item, index) in questionList"
                :key="index"
                @click="titleClick(index)"
              >
                {{ index + 1 }}
              </li>
            </ul>
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center">
              <el-button type="primary" @click="savePaper">保存试卷</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <addPaper :visible.sync="visible" />
  </div>
</template>

<script>
import QuestionListItem from './QuestionListItemcopy.vue'
// import addPaper from './AddPaper.vue'
export default {
  components: {
    QuestionListItem,
    // addPaper
  },
  data() {
    return {
      visible: false, // 控制增加试题弹框显示还是隐藏
      questionList: [
        {
          id: '1',
          tag: '1',
          type: '选择题',
          title: 'hqduuhdqj',
          answer: '11111',
          radioList: [
            { desc: 'fgweyfg', id: '0' },
            { desc: '1223', id: '1' }
          ],
          score: 5
        },
        {
          id: '2',
          tag: '2',
          type: '多选题',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          checkList: [
            { desc: 'jdks', id: '1' },
            { desc: 'fsf', id: '2' }
          ],
          score: 2
        },
        {
          id: '3',
          tag: '3',
          type: '简答题',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          score: 1
        },
        {
          id: '4',
          tag: '2',
          type: '多选',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          checkList: [
            { desc: 'jdks', id: '1' },
            { desc: 'fsf', id: '2' }
          ],
          score: 2
        },
        {
          id: '5',
          tag: '1',
          type: '判断题',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          radioList: [
            { desc: 'fgweyfg', id: '0' },
            { desc: '1223', id: '1' }
          ],
          score: 1
        },
        {
          id: '6',
          tag: '1',
          type: '判断题',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          radioList: [
            { desc: 'fgweyfg', id: '0' },
            { desc: '1223', id: '1' }
          ],
          score: 3
        },
        {
          id: '6',
          tag: '1',
          type: '判断题',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          radioList: [
            { desc: 'fgweyfg', id: '0' },
            { desc: '1223', id: '1' }
          ],
          score: 4
        },
        {
          id: '7',
          tag: '1',
          type: '判断题',
          title: 'hqduuhdqj',
          answer: 'hfgwhrfgiuwhfiu',
          radioList: [
            { desc: 'fgweyfg', id: '0' },
            { desc: '1223', id: '1' }
          ],
          score: 2
        }
      ],
      currentIndex: 1,
      selectQuestion: []
    }
  },
  methods: {
    // 增加试题
    addPaper() {
      console.log('dfjsf')
      this.visible = true
    },
    // 切换题目编号
    titleClick(index) {
      this.currentIndex = index + 1
      this.$refs.listItemRef.handleScroll(index)
    },
    // 试题列表滑动指定位置
    handlePosition(offsetTop) {
      document.getElementById('questionMain').scrollTo(0, offsetTop)
    },
    // 保存试卷
    savePaper() {
      console.log(this.questionList.map(item => item.score))
    },
    // 删除所选试题
    delCheckedQuestion() {
      console.log('删除的题目序号', this.selectQuestion.map(item => item.id))
    },
    selectSubjectsChange(val) {
      console.log(val)
      this.selectQuestion = val
    }
  }
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.nonePaper {
  display: flex;
  justify-content: center;
  align-items: center;
}
#questionMain {
  height: calc(100vh - 450px);
  overflow: auto;
  .clearfix {
    .clearfix_tit {
      color: #c01c40;
      font-size: 20px;
      font-weight: bold;
    }
    .clearfix_del {
      float: right;
      padding: 10px 5px;
      margin-right: 20px;
    }
    .clearfix_add {
      float: right;
      padding: 10px 5px;
      margin-right: 20px;
    }
  }
}
.titleIndex {
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;

    li {
      border-radius: 50px;
      width: 24px;
      height: 24px;
      font-size: 14px;
      text-align: center;
      border: 2px solid #ccc;
      color: #666;
      cursor: pointer;
    }
    .dotItem {
      background-color: rgb(194, 43, 43);
    }
  }
}
</style>
