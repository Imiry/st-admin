
<template>
  <div class="searchType">
    <el-input
      type="text"
      :placeholder="caption"
      v-model="searchKey"
      @focus="onFocus"
      @blur="onBlur"
      class="input"
      @keyup.enter.native="onKeyUp($event)"
    >
    <i slot="suffix" class="el-input__icon el-icon-search" @click="onSearch"></i>
    </el-input>
  </div>
</template>

<script type="text/javascript">
const SEARCH = "search";
const KEYUP = "keyup";
const FOCUS = "focus";
const BLUR = "blur";

var search = {
  props: {
    caption: {
      type: String,
      default: "",
    },
    keyWords: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      searchKey: "",
      last: 0,
    };
  },
  methods: {
    onSearch() {
      this.$emit(SEARCH, this.searchKey);
    },
    onKeyUp(e) {
      this.last = e.timeStamp;
      //利用event的timeStamp来标记时间，这样每次的keyup事件都会修改last的值，注意last必需为全局变量
      setTimeout(
        function () {
          //设时延迟0.5s执行
          if (this.last - e.timeStamp == 0) {
            //如果时间差为0（也就是你停止输入0.5s之内都没有其它的keyup事件发生）则做你想要做的事
            if (e.keyCode == 13) {
              this.onSearch();
            } else {
              this.$emit(KEYUP, this.searchKey);
            }
          }
        }.bind(this),
        500
      );
    },
    // 在 Input 获得焦点时触发
    onFocus() {
      this.$emit(FOCUS);
    },
    //在 Input 失去焦点时触发
    onBlur() {
      this.$emit(BLUR);
    },
    onIntKey() {
      this.searchKey = "";
    },
  },
  watch: {
    keyWords: function (newVal, oldVal) {
      this.searchKey = this.keyWords;
    },
  },
  //创建的时候
  created: function () {
    this.onIntKey();
    //this.$emit(SEARCH,this.searchKey);
  },
  mounted: function () {},
  // 销毁
  destroyed: function () {},
};

export default search;
</script>
<style lang="scss">
.searchType{
  .el-input__icon{
    cursor: pointer;
  }
  .el-input__icon:hover{
    color: rgb(42, 165, 236);
  }
}

</style>