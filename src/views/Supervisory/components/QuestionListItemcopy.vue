
<template>
<div>
  <div v-for="(item, index) in questionList" :key="index">
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
              <el-radio  v-for="(v,id) in item.question_options" :key="item.id" :label="v.options" 
                class="option" 
              >{{v.options}}</el-radio>
            </el-radio-group> 
          </div>
          <div class="boxFooter">
            <div>正确答案：</div>
            <div>{{item.question_answer}}</div>
          </div>
        </el-card>
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
            <div class="pmty"></div>
            <div class="headerRight">
              <div class="scoreValue">
                <span class="lableScore">分数：</span>
                <el-input v-model="item.score"></el-input> 
              </div>
            </div>
          </div>
          <div class="intricacyBoxMain" v-for="(v, index) in item.question_list" :key="index" style="marginTop:20px" >
            <div class="intricacyHeader">
              <div class="intricacyDsc">
                <div class="intricacyTitle">{{index+1}}、{{v.question_title}}</div>
                <div class="titleDec" v-html="v.question_content"></div>
                </div>
              <div class="scoreValue">
                <span class="lableScore">分数：</span>
                <el-input v-model="v.score"></el-input> 
              </div>
              <div class="empty"></div>
            </div>
            <div class="intricacyMain">
              <el-radio-group class="options" >
                <el-radio  v-for="(o,id) in v.question_options" :key="o.id" :label="o.options" 
                  class="option" 
                >{{o.options}}</el-radio>
              </el-radio-group>
            </div>
            <div class="intricacyfooter">
              <div>正确答案：</div>
              <div>{{v.question_answer}}</div>
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
    questionList: {
      type: Array
    }
  },
  data(){
    return{
      selectSubjects: [], //选中的题
      signQuestionTypes:[1,2,3,4],  //简单题类型
      intricacyQuestionTypes:[5,6],  //复杂题类型
    }
  },
  methods:{
    handleScroll(key) {
      const PageId = document.querySelector('#page' + key)
      this.$emit('handlePosition', PageId.offsetTop)
      
    },

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
      flex: 0.7;
      display: flex;
      .check{
        margin-right: 20px;
      }
      .title{
        justify-content: space-around;
        .titleType{
          width: 200px;
          color: #c01c40;
        }
      }
      .checkInpt .title{
        display: inline-block;
      }
    }
    .pmty{
      flex: 0.1;
    }
    .headerRight{
      flex: 0.2;
      display: flex;
      position: relative;
      .scoreValue{
        position: absolute;
        top: 10px;
        display: flex;
        align-items: center;
        .lableScore{
          width: 100px;
        }
      }

      
    }
  }
  .boxMain{
    padding-left: 127px;
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
  }
  .intricacyBoxMain{
    padding-left: 100px;
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
        flex: 0.7;
        .intricacyTitle{
          width: 200px;
          color: #c01c40;
        }
      }
      .scoreValue{
        flex: 0.2;
        margin-left: 50px;
        display: flex;
        align-items: center;
        .lableScore{
          width: 100px;
        }
      }
      .empty{
        flex: 0.3;
      }
    }
    .intricacyMain{
      padding-left: 30px;
    }
    .intricacyfooter{
      margin-top: 10px;
      display: flex;
    }
  }
}

</style>
