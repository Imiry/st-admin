<!--
 * @Author: sitao
 * @Date: 2020-12-28 15:58:11
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-29 15:52:21
-->

<template>
<div>
  <el-card class="card_403">
    <div class="box">
      <div class="box_left">
        <img :src="exceptionPic" alt="" />
      </div>
      <div class="box_right">
        <p>{{ exceptionTitle }}</p>
        <el-button type="success" @click="backWork">返回工作台</el-button>
      </div>
    </div>
  </el-card>
  </div>
</template>

<script>
export default {
  props: {
    exceptionPic: {
      type: String,
      default: require("../../assets/images/exception/403.png"),
    },
    exceptionTitle: {
      type: String,
      dafault: "抱歉！你无权访问该页面",
    },
  },
  methods: {
    backWork() {
      this.$emit("backWork");
    },
  },
};
</script>

<style lang="scss" scoped>
.card_403{
  height: 700px;
  box-sizing: border-box;
  .el-card__body {
    height: 100%;
    position: relative;
    .box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .box_right {
        p {
          font-size: 20px;
          color: #808695;
        }
      }
    }
  }
}
</style>
