<template>
  <div style="margin-top: 32px">
    <el-row :gutter="20">
      <!-- 试题列表 -->
      <el-col :span="18">
        <el-card id="questionMain"
          ><div slot="header" class="clearfix">
            <span class="clearfix_tit"> 试题列表</span>
            <el-button class="clearfix_del" type="primary" @click="delCheckedQuestion" v-if="questionList.length > 0"
              >删除所选试题</el-button
            >
            <el-button class="clearfix_add" type="primary" @click="addPaper">添加试题</el-button>
          </div>
          <!-- 题目列表 -->
          <QuestionListItem
            :questionList="getSortQuestionList()"
            ref="listItemRef"
            @handlePosition="handlePosition"
            @selectSubjectsChange="selectSubjectsChange"
            :disabled="selectQuestion.length === 0"
          />
          <!-- 选题组卷无数据情况下显示 -->
          <div class="nonePaper" v-show="questionList.length === 0">
            <!-- <el-result icon="info" subTitle="该试卷无试题，去添加试题吧"></el-result> -->
          </div>
        </el-card>
      </el-col>
      <!-- 题目序号列表 -->
      <el-col :span="4" v-if="getSortQuestionList().length > 0">
        <el-card style="position: fixed">
          <div class="titleIndex">
            <ul>
              <li v-for="(item, index) in getSortQuestionList()" :key="index" @click="titleClick(index)">
                <div id="subNum" :class="currentIndex === index + 1 ? `titleItem` : ''">{{ index + 1 }}</div>
                <div class="subType">{{subType[item.question_type]}}</div>
              </li>
            </ul>
            <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center">
              <el-button type="primary" @click="savePaper">保存试卷</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <AutomaticPaper :visible.sync="visible" v-if="paperMode === '自动组卷'" /> -->

    <!-- <addPaper :visible.sync="visible" v-else /> -->
  </div>
</template>

<script>
import QuestionListItem from './QuestionListItem.vue'
// import AutomaticPaper from './AutomaticPaper.vue'
// import addPaper from './AddPaper.vue'
export default {
  components: {
    QuestionListItem,
    // addPaper,
    // AutomaticPaper
  },
  props: {
    paperMode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false, // 控制增加试题弹框显示还是隐藏
      currentIndex: 1,
      selectQuestion: [],  //选择的题
      questionListed:[], //处理好排序的试题列表
      subType:{  //匹配类型显示
        1:'单',
        2:'多',
        3:'简',
        5:'案', 
        6:'判',
        7:'实',
        8:'情'
      },
      questionList: [
        {
          question_title:"单选题",
          question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
          question_type: 1,
          is_parent: 1,
          child_question_type: 1,
          question_options: [
              {
                  id: "1",
                  options: "示向功能",
                  checked: true
              },
              {
                  id: "2",
                  options: "示向----",
                  checked: false
              }  
          ],
          question_answer: "示向功能",
          group_id: "1001",
          score:2
        },
        {
          question_title:"多选题",
          question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
          question_type: 2,
          is_parent: 1,
          child_question_type: 0,
          score:2,
          question_options: [
              {
                  id: "1",
                  options: "示向功能",
                  checked: true
              },
              {
                  id: "2",
                  options: "示向----",
                  checked: true
              },
              {
                  id: "3",
                  options: "示向---12333-",
                  checked: false
              }
          ],
          question_answer: "示向功能、示向----",
          group_id: "1002",
        },
        {
          question_title:"判断题",
          question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
          question_type: 6,
          is_parent: 1,
          child_question_type: 0,
          score:2,
          question_options: [
              {
                  id: "1",
                  options: "正确",
                  checked: true
              },
              {
                  id: "2",
                  options: "错误",
                  checked: false
              }  
          ],
          question_answer: "正确",
          group_id: "1003",
        },
        {
          question_title:"简答题",
          question_content: "<p>复购率在金融数字化营销中是反应用户对品牌忠诚度的一个重要指标，锡盟高钙奶是一家专门生产乳制品的企业，其中脱脂牛奶的销量一直不太理想，所以想看一下过往的购买客户的订单记录，计算以下这一部分客户的复购率为多少，根据数据显示，2021年一季度华北市场的脱脂牛奶交易笔数为12000笔，4000人实现二次购买，而这4000人当中2000人实现了三次购买。</p>",
          question_type: 3,
          is_parent: 1,
          child_question_type: 0,
          question_answer: "2021年一季度华北市场的脱脂牛奶交易笔数为12000笔",
          group_id: "1004",
          score:2
        },
        {
          question_title:"案例题",
          question_content: "<p>平邦保险公司想通过一些建设性的方案来解决目前4个策略中所存在的问题，以下为各个策略分别所对应的问题。</p><p>①　在产品策略方面，某保险公司主要售卖两款疾病险和一款年金险产品，由于整体保险市场的产品同质化严重，与同行业其他保险公司相比没有明显优势。</p><p>②　在定价策略方面，某保险公司的产品定价整体处于中等水平，比大型保险公司定价整体相比较低，比其他小型保险公司定价略高。过去人们在比较不同保险产品时，关注的主要是经济补偿，而现在不仅包括经济补偿，还包括各类附加功能。比如保险公司与医院联网合作，不仅可以在费用阶段直接垫付客户治疗费用，还可以增加包括专家门诊、预约病床、绿色通道在内的多种特色服务，成为了公司品牌特色的一部分。</p><p>③　在渠道策略方面，某保险公司目前营销渠道还是以个人代理制为主。目前，保险代理人队伍的整体文化素质不高，学历在高中及以下超过90%，另外由于公司对保险代理人实施以业务业绩为主的晋升机制，导致目前忽视了对整体代理人队伍文化及金融素养的培训。</p><p>④　在促销策略方面，某保险公司的广告投入较少，投放了电视广告，但是一般在非黄金时段播放；同时，其销售方式以人员推销为主。</p>",
          question_type: 5,
          is_parent: 1,
          child_question_type: 0,
          question_answer: null,
          group_id: "1005",
          score:8,
        },
        {
              question_title:"单选题",
              question_content: "<p>根据题目描述，若按交易方法计算，则重复购买次数为？</p>",
              question_type: 5,
              is_parent: 0,
              child_question_type: 1,
              question_options: [
                  {
                      id: "1",
                      options: "2000",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "2000",
                      checked: false
                  }  
              ],
              question_answer: "2000",
              group_id: "1005",
              score:2
        },
        {
              question_title:"多选题",
              question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
              question_type: 5,
              is_parent: 0,
              child_question_type: 2,
              question_options: [
                  {
                      id: "1",
                      options: "示向功能",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "示向----",
                      checked: true
                  },
                  {
                      id: "3",
                      options: "示向---12333-",
                      checked: false
                  }
              ],
              question_answer: "示向功能、示向----",
              group_id: "1005",
              score:2
        },
        {
              question_title:"判断题",
              question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
              question_type: 5,
              is_parent: 0,
              child_question_type: 6,
              question_options: [
                  {
                      id: "1",
                      options: "正确",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "错误",
                      checked: false
                  }  
              ],
              question_answer: "正确",
              group_id: "1005",
              score:2
        },
        {
              question_title:"简答题",
              question_content: "<p>复购率在金融数字化营销中是反应用户对品牌忠诚度的一个重要指标，锡盟高钙奶是一家专门生产乳制品的企业，其中脱脂牛奶的销量一直不太理想,2021年一季度华北市场的脱脂牛奶交易笔数为12000笔，4000人实现二次购买，而这4000人当中2000人实现了三次购买。</p>",
              question_type: 5,
              is_parent: 0,
              child_question_type: 3,
              question_answer: "2021年一季度华北市场的脱脂牛奶交易笔数为12000笔",
              group_id: "1005",
              score:2
        },

        {
          question_title:"情景题",
          question_content: "<p>平邦保险公司想通过一些建设性的方案来解决目前4个策略中所存在的问题，以下为各个策略分别所对应的问题。</p><p>①　在产品策略方面，某保险公司主要售卖两款疾病险和一款年金险产品，由于整体保险市场的产品同质化严重，与同行业其他保险公司相比没有明显优势。</p><p>②　在定价策略方面，某保险公司的产品定价整体处于中等水平，比大型保险公司定价整体相比较低，比其他小型保险公司定价略高。过去人们在比较不同保险产品时，关注的主要是经济补偿，而现在不仅包括经济补偿，还包括各类附加功能。比如保险公司与医院联网合作，不仅可以在费用阶段直接垫付客户治疗费用，还可以增加包括专家门诊、预约病床、绿色通道在内的多种特色服务，成为了公司品牌特色的一部分。</p><p>③　在渠道策略方面，某保险公司目前营销渠道还是以个人代理制为主。目前，保险代理人队伍的整体文化素质不高，学历在高中及以下超过90%，另外由于公司对保险代理人实施以业务业绩为主的晋升机制，导致目前忽视了对整体代理人队伍文化及金融素养的培训。</p><p>④　在促销策略方面，某保险公司的广告投入较少，投放了电视广告，但是一般在非黄金时段播放；同时，其销售方式以人员推销为主。</p>",
          question_type: 8,
          is_parent: 1,
          child_question_type: 0,
          question_answer: null,
          group_id: "1006",
          score:8,
        },
        {
              question_title:"单选题",
              question_content: "<p>根据题目描述，若按交易方法计算，则重复购买次数为？</p>",
              question_type: 8,
              is_parent: 0,
              child_question_type: 1,
              question_options: [
                  {
                      id: "1",
                      options: "2000",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "2000",
                      checked: false
                  }  
              ],
              question_answer: "2000",
              group_id: "1006",
              score:2
        },
        {
              question_title:"多选题",
              question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
              question_type: 8,
              is_parent: 0,
              child_question_type: 2,
              question_options: [
                  {
                      id: "1",
                      options: "示向功能",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "示向----",
                      checked: true
                  },
                  {
                      id: "3",
                      options: "示向---12333-",
                      checked: false
                  }
              ],
              question_answer: "示向功能、示向----",
              group_id: "1006",
              score:2
        },
        {
              question_title:"判断题",
              question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
              question_type: 8,
              is_parent: 0,
              child_question_type: 6,
              question_options: [
                  {
                      id: "1",
                      options: "正确",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "错误",
                      checked: false
                  }  
              ],
              question_answer: "正确",
              group_id: "1006",
              score:2
        },
        {
              question_title:"简答题",
              question_content: "<p>复购率在金融数字化营销中是反应用户对品牌忠诚度的一个重要指标，锡盟高钙奶是一家专门生产乳制品的企业，其中脱脂牛奶的销量一直不太理想,2021年一季度华北市场的脱脂牛奶交易笔数为12000笔，4000人实现二次购买，而这4000人当中2000人实现了三次购买。</p>",
              question_type: 8,
              is_parent: 0,
              child_question_type: 3,
              question_answer: "2021年一季度华北市场的脱脂牛奶交易笔数为12000笔",
              group_id: "1006",
              score:2
        },

        {
          question_title:"实操题",
          question_content: "<p>平邦保险公司想通过一些建设性的方案来解决目前4个策略中所存在的问题，以下为各个策略分别所对应的问题。</p><p>①　在产品策略方面，某保险公司主要售卖两款疾病险和一款年金险产品，由于整体保险市场的产品同质化严重，与同行业其他保险公司相比没有明显优势。</p><p>②　在定价策略方面，某保险公司的产品定价整体处于中等水平，比大型保险公司定价整体相比较低，比其他小型保险公司定价略高。过去人们在比较不同保险产品时，关注的主要是经济补偿，而现在不仅包括经济补偿，还包括各类附加功能。比如保险公司与医院联网合作，不仅可以在费用阶段直接垫付客户治疗费用，还可以增加包括专家门诊、预约病床、绿色通道在内的多种特色服务，成为了公司品牌特色的一部分。</p><p>③　在渠道策略方面，某保险公司目前营销渠道还是以个人代理制为主。目前，保险代理人队伍的整体文化素质不高，学历在高中及以下超过90%，另外由于公司对保险代理人实施以业务业绩为主的晋升机制，导致目前忽视了对整体代理人队伍文化及金融素养的培训。</p><p>④　在促销策略方面，某保险公司的广告投入较少，投放了电视广告，但是一般在非黄金时段播放；同时，其销售方式以人员推销为主。</p>",
          question_type: 7,
          is_parent: 1,
          child_question_type: 0,
          question_answer: null,
          group_id: "1007",
          score:8,
        },
        {
              question_title:"单选题",
              question_content: "<p>根据题目描述，若按交易方法计算，则重复购买次数为？</p>",
              question_type: 7,
              is_parent: 0,
              child_question_type: 1,
              question_options: [
                  {
                      id: "1",
                      options: "2000",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "2000",
                      checked: false
                  }  
              ],
              question_answer: "2000",
              group_id: "1007",
              score:2
        },
        {
              question_title:"多选题",
              question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
              question_type: 7,
              is_parent: 0,
              child_question_type: 2,
              question_options: [
                  {
                      id: "1",
                      options: "示向功能",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "示向----",
                      checked: true
                  },
                  {
                      id: "3",
                      options: "示向---12333-",
                      checked: false
                  }
              ],
              question_answer: "示向功能、示向----",
              group_id: "1007",
              score:2
        },
        {
              question_title:"判断题",
              question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
              question_type: 7,
              is_parent: 0,
              child_question_type: 6,
              question_options: [
                  {
                      id: "1",
                      options: "正确",
                      checked: true
                  },
                  {
                      id: "2",
                      options: "错误",
                      checked: false
                  }  
              ],
              question_answer: "正确",
              group_id: "1007",
              score:2
        },
        {
              question_title:"简答题",
              question_content: "<p>复购率在金融数字化营销中是反应用户对品牌忠诚度的一个重要指标，锡盟高钙奶是一家专门生产乳制品的企业，其中脱脂牛奶的销量一直不太理想,2021年一季度华北市场的脱脂牛奶交易笔数为12000笔，4000人实现二次购买，而这4000人当中2000人实现了三次购买。</p>",
              question_type: 7,
              is_parent: 0,
              child_question_type: 3,
              question_answer: "2021年一季度华北市场的脱脂牛奶交易笔数为12000笔",
              group_id: "1007",
              score:2
        },

        {
          question_title:"单选题",
          question_content: "<p>市场营销通过多方面手段便利交换、便利物流，从而保障交换工能够和物流功能的实现。这主要说的是市场营销的哪一项功能？</p>",
          question_type: 1,
          is_parent: 1,
          child_question_type: 1,
          question_options: [
              {
                  id: "1",
                  options: "示向功能",
                  checked: true
              },
              {
                  id: "2",
                  options: "示向----",
                  checked: false
              }  
          ],
          question_answer: "示向功能",
          group_id: "1001",
          score:2
        },
      ],
    }
  },

  mounted(){
    this.getlist() //处理后端返回
  },
  methods: {

    getlist() {
      const newQuestionList = []
      let bigData = this.questionList.filter(item => item.is_parent ===1)  //大题
      let smallData = this.questionList.filter(item => item.is_parent ===0) //小题
      for (let i = 0; i < bigData.length; i++) {
        let listArray = []  //存放每次外层符合条件的数据
        for (let j = 0; j < smallData.length; j++) {
          if(bigData[i].group_id === smallData[j].group_id){  //如果大题的group_id和小题group_id相等就push listArray数组中，然后赋值给bigData[i].list 相当于加个list属性
            listArray.push(smallData[j])  //符合就push listArray数组暂存
            bigData[i].list = listArray
          }
        } 
        newQuestionList.push(bigData[i])
      }
      this.questionList = newQuestionList

    },

    //排好序数据        左侧的题号，需对后端返回的数据进行排序循环 [1,2,3,6],  //简单题类型   [5,7,8],  //复杂题类型
    getSortQuestionList() {
      // [1,2,3,6,5,7,8]  //以这个顺序排序
      let data = [...this.getListBytype(1),...this.getListBytype(2),...this.getListBytype(3),...this.getListBytype(6),...this.getListBytype(5),...this.getListBytype(7),...this.getListBytype(8)]  //存放排好序的试题
      return data
    },

    //拿到指定类型的试题
    getListBytype(type){
      return this.questionList.filter(item => item.question_type === type)
    },

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
      console.log(offsetTop)
      // document.getElementById('questionMain').scrollTo(0, offsetTop)
      window.scrollTo(0, offsetTop)
    },
    // 保存试卷
    savePaper() {

      // 校验分数
      let tottalScore = 34 //假如这套试卷的总分为 32分
      let bigScore = this.questionList.map(item => item.score*1).reduce((pre, em) => (pre += em),0) //大题分数
      
      let bigQuestionNum = this.questionList.filter(item => item?.list).length  //记录复杂题的个数
      let num = [] //保存分数正确的复杂题，准确来说 num.length 和 bigQuestionNum相等 才说明每一道复杂题的分数等于小题总分
      this.questionList.forEach(item => { //循环大题，如果有小题，就拿有小题的大题的分数和小题的总分比较，分数相等就push num中，之后根据复杂题的个数和num数组length相等，说明复杂题下面的小题都满足小题分总和等于大题的分
        if(item?.list?.length>0){
         let smallAllSore = item.list.map(v => v.score*1).reduce((pre, em) => (pre += em), 0) //小题总分
          if(item.score === smallAllSore){  // 大题分数 === 小题总分
            num.push(item.score) //保存分数正确的复杂题
          }
        }
      })
      if(tottalScore === bigScore && bigQuestionNum == num.length){    //检测分数：首先判断所有大题的总分和试卷的总分相等并且有小题的大题的总分和所有对应所有小题的总分数相等
        //在这里调接口
        this.$message({
          message: '分数正确，去调接口',
          type: 'success'
        });
      }else {
        this.$message({
          message: '分数和总分不相等，请确保分数保持一致',
          type: 'warning'
        });
      }

    },
    // 删除所选试题
    delCheckedQuestion() {
      console.log('删除的题目序号', this.selectQuestion)
    },
    selectSubjectsChange(val) {
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
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#questionMain {
  // height: calc(100vh - 450px);
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
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    li {
      flex: 1;
      width: 20%;
      min-width: 20%;
      max-width: 20%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      #subNum {
        border-radius: 50px;
        width: 24px;
        height: 24px;
        font-size: 14px;
        text-align: center;
        border: 2px solid #ccc;
        color: #666;
        cursor: pointer;
      }
      .subType{
        font-size: 14px;
        color: #666;
      }
    }
    .titleItem {
      background-color: rgb(194, 43, 43);
    }
  }
}
</style>
