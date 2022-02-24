
<template>
<div>
  <div v-for="(item, index) in questionList" :key="index">

    <!-- 简单题类型 [1,2,3,6] :根据判断题的类型渲染 -->
    <el-card class="boxCard" v-if="signQuestionTypes.includes(item.question_type)" :id="`page${index}`">
      <div class="boxHeader">
        <div class="headerLeft">
            <div class="check">
              <input type="checkbox" class="checkInpt" v-model="selectSubjects" :value="item" @change="slectSubItem(item)"/>
            </div>
            <div class="title">
              <div class="titleType">{{index+1}}、{{item.question_title}}</div>
              <div class="titleDec" v-html="item.question_content"></div>
            </div>
        </div>
        <div class="pmty"></div>
        <div class="headerRight">
          <div class="scoreValue">
            <span class="lableScore">分数：</span>
            <el-input v-model="item.score"></el-input> 
          </div>
        </div>
      </div>
      <div class="boxMain">
        <el-radio-group class="options" >
          <el-radio  v-for="(v,id) in item.question_options" :key="item.id" :label="v.options" class="option" >{{v.options}}</el-radio>
        </el-radio-group> 
      </div>
      <div class="boxFooter">
        <div>正确答案：</div>
        <div class="boxAnswer">{{item.question_answer}}</div>
      </div>
    </el-card>
    
    <!-- 复杂题类型 [5,7,8] :根据判断题的类型渲染   复杂利用上面的头部，内部重新写个页面渲染复杂题中的小题-->
    <el-card class="boxCard" v-if="intricacyQuestionTypes.includes(item.question_type)" :id="`page${index}`">
      <div class="boxHeader">
        <div class="headerLeft">
          <div class="check">
            <input type="checkbox" class="checkInpt" v-model="selectSubjects" :value="item" @change="slectSubItem(item)" />
          </div>
          <div class="title">
            <div class="titleType">{{index+1}}、{{item.question_title}}</div>
            <div class="titleDec" v-html="item.question_content"></div>
          </div>
        </div>
        <div class="headerRight">
          <div class="scoreValue">
            <span class="lableScore">分数：</span>
            <el-input :value="getSubScore(item)"></el-input> 
          </div>
        </div>
      </div>
      <div class="intricacyBoxMain" v-for="(v, index) in item.list" :key="index" style="marginTop:20px" >
        <div class="intricacyHeader">
          <div class="intricacyDsc">
            <div class="intricacyTitle">{{index+1}}、{{v.question_title}}</div>
            <div class="titleDec" v-html="v.question_content"></div>
          </div>
          <div class="intricacyScoreValue">
            <span class="lableScore">分数：</span>
            <el-input v-model="v.score"></el-input> 
          </div>
          <div class="empty"></div>
        </div>
        <div class="intricacyMain">
          <el-radio-group class="options" >
            <el-radio  v-for="(o,id) in v.question_options" :key="o.id" :label="o.options" class="option">{{o.options}}</el-radio>
          </el-radio-group>
        </div>
        <div class="intricacyFooter">
          <div>正确答案：</div>
          <div class="intricacyAnswer">{{v.question_answer}}</div>
        </div>
      </div>
    </el-card>
  </div>
</div>
</template>

<script>
export default {
// 问答、情景、案例
  props:{
    questionList: { //试题数据
      type: Array
    }
  },
  data(){
    return{
      selectSubjects: [], //选中的题
      signQuestionTypes:[1,2,3,6],  //简单题类型
      intricacyQuestionTypes:[5,7,8],  //复杂题类型
    }
  },

  methods:{
    //根据小题的分数计算大题的分数，以至于监听分数变化   s.score*1 是为了下次修改，返回的是字符串变成number类型才可以计算
    getSubScore(item) {
      return item?.list?.map(s => s.score*1).filter(f => typeof(f) !==NaN).reduce((pre,em) => pre+em,0)
    },

    //返回点击题号的offsettop
    handleScroll(key) {
      const PageId = document.querySelector('#page' + key)
      this.$emit('handlePosition', PageId.offsetTop)
    },

    //选中的数据回传
    slectSubItem(item) {
      console.log(item)
      this.$emit('selectSubjectsChange', this.selectSubjects)
    }
  }
}
</script>

<style lang="scss">
.boxCard{
  margin-bottom: 10px;
  .boxHeader{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .headerLeft{
      flex: 0.75;
      display: flex;
      .check{
        margin-right: 20px;
      }
      .title{
        justify-content: space-around;
        .titleType{
          width: 200px;
          color: #1890ff;
        }
      }
      .checkInpt .title{
        display: inline-block;
      }
    }
    .pmty{
      flex: 0.05;
    }
    .headerRight{
      flex: 0.2;
      display: flex;
      position: relative;
      .scoreValue{
        position: absolute;
        top: 0px;
        display: flex;
        align-items: center;
        .lableScore{
          width: 100px;
        }
      } 
    }
  }
  .boxMain{
    padding-left: 70px;
    .options{
      display: flex;
      flex-direction: column;
      .option{
        margin-bottom: 5px;
      }
    }
  }
  .boxFooter{
      margin-top: 30px;
      padding-left: 40px;
      display: flex;
      align-items: center;
      .boxAnswer{
        color: #1890ff;
        font-size: 14px;
      }
  }
  .intricacyBoxMain{
    padding-left: 70px;
    padding-top: 20px;
    .options{
      display: flex;
      flex-direction: column;
      .option{
        margin-bottom: 5px;
      }
    }
    .intricacyHeader{
      display: flex;
      align-items: center;

      .intricacyDsc{
        flex: 0.8;
        .intricacyTitle{
          width: 200px;
          color: #949091;
        }
      }
      .intricacyScoreValue{
        flex: 0.2;
        margin-left: 50px;
        display: flex;
        align-items: center;
        .lableScore{
          width: 80px;
        }
      }
    }
    .intricacyMain{
      padding-left: 30px;
    }
    .intricacyFooter{
      margin-top: 10px;
      display: flex;
      align-items: center;
      .intricacyAnswer{
        color: #1890ff;
        font-size: 14px;
      }
    }
  }
}

</style>
