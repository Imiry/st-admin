<template>
  <el-card>
    <div class="titleIndex">
      <ul>
        <li :class="currentIndex===index ? `dotItem` : '' " v-for="(item, index) in list" :key="index" @click="TitleClick(index)">{{ index + 1 }}</li>
      </ul>
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center">
        <el-button type="primary">保存试卷</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      indexList: [],
      currentIndex:0 //当前点击题号
    }
  },
  methods: {
    TitleClick(index) {
      this.currentIndex =index
      this.$emit('indexClick', `${index + 1}`)
    }
  }
}
</script>

<style lang="scss" >
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
      line-height: 150%;
      text-align: center;
      border: 2px solid #ccc;
      color: #666;
      cursor: pointer;
    }
    .dotItem{
      background-color: rgb(243, 190, 190);
    }
  }
}
</style>
