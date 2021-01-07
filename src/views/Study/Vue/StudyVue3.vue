<!--
 * @Author: sitao
 * @Date: 2021-01-07 11:57:07
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-07 14:55:05
-->
<template>
  <div class="studyv3_con">
    <div  class="vue_link m-b-10">
      <el-tag effect="dark">js</el-tag>
      <el-tag effect="dark" type="success">vue</el-tag>
      <el-tag effect="dark" type="info">vue3.0</el-tag>
      <el-tag effect="dark" type="warning">TS</el-tag>
      <el-tag effect="dark" type="danger">webpack</el-tag>
      <el-tag effect="dark">html5</el-tag>
      <el-tag effect="dark" type="success">css3</el-tag>
      <el-tag effect="dark" type="info">node</el-tag>
      <el-tag effect="dark" type="warning">koa</el-tag>
      <el-tag effect="dark" type="danger">UI</el-tag>
    </div>

    <el-row class="vue3_con" :gutter="10">
      <el-col :span="4">
        <div class="vue_note">
          <el-tag>Composition API</el-tag>
          <el-tag type="success">TypeScript</el-tag>
          <el-tag type="info">node</el-tag>
          <el-tag type="warning">vue3.0</el-tag>

        </div>
      </el-col>
      <el-col :span="20">
        <div class="vue_md">
          <vue3></vue3>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vue3 from "./vue3.0.md";
export default {
  components: {
    vue3,
  },
  name: "StudyV3",
  data() {
    return {};
  },
};
</script>

<style lang="scss" >
.studyv3_con {
  box-sizing: border-box;
  .vue_link {
    background-color: #fff;
    height: 70px;
    width: 1538px;
    top: 112px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    z-index: 99;
    border-radius: 5px;
    .el-tag{
      cursor: pointer;
    }
    .el-tag:hover{
      opacity: 0.8;
    }
  }
  .vue3_con {
    margin-top: 110px;
    
  }
  .vue_note {
    background-color: #fff;
    height: 700px;
    padding: 10px;
    box-sizing: border-box;
    .el-tag {
      margin: 10px 10px 0 0;
      cursor: pointer;
    }
  }
  .vue_md {
    background-color: #fff;
    padding: 20px;
  }
}
</style>