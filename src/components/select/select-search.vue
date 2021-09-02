<!--
 * @Author: sitao
 * @Date: 2020-12-21 10:43:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 11:14:10
-->
<template>
  <div class="selectCon" :style="conStyle">
    <div class="select_header" @click="changeUp">
      <div class="content">{{ content }}</div>
      <i class="el-icon-arrow-down icon" v-show="!visibale"></i>
      <i class="el-icon-arrow-up icon" v-show="visibale"></i>
    </div>
    <div class="showlist" v-show="visibale">
      <div class="search">
        <search
          :style="searchMemberStyle"
          caption=""
          @keyup="onKeyUp"
          @search="searchMember"
        ></search>
      </div>
      <div class="list">
        <vxe-list height="240" class="my-list" :loading="loading" :data="items">
          <template #default="{ items }">
            <div
              class="my-list-item"
              v-for="(item, index) in items"
              :key="index"
              @click="selectItem(item)"
            >
              {{ item.label }}
            </div>
          </template>
        </vxe-list>
      </div>
    </div>
  </div>
</template>

<script>
	const SELECT_ITEM = 'select_item';
	const SEARCH_MEMBER = 'search_member';
	const KEYUP = 'keyup';
  const CHANGE_UP = 'change_up'
export default {
  name: "select-search",

  props: {
    items: {  //下拉数据
      type: Array,
      require: true
    },
    content: {  //选中内容
      type: String,
      default: ''
    },
    visibale: {  //显示隐藏
      type: Boolean,
      default: false
    },
    conStyle: {} //设置整体样式
  },
  data() {
    return {
      searchMemberStyle: {
        width: "100%",
      },
      loading: false, //loading显示
    };
  },
  watch: {},

  created() {
  },
  methods: {
    //回车确定搜索
    onKeyUp(value) {
      this.$emit(KEYUP,value);
    },
    //搜索数据
    searchMember(value) {
      this.$emit(SEARCH_MEMBER,value);
    },
    //选中当前的数据
    selectItem(item) {
      this.$emit(SELECT_ITEM,item);
    },
    //下拉图标切换
    changeUp() {
      this.$emit(CHANGE_UP)
    }
  },
};
</script>

<style lang="scss" >
.selectCon {
  width: 350px;
  height: 100%;
  padding-top: 20px;
  .select_header {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    line-height: 20px;
    padding: 10px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    position: relative;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    background-color: #fff;
    .content {
      // color: #ccc;
      position: absolute;
      font-size: 14px;
    }
    .icon {
      position: absolute;
      right: 9px;
      color: #ccc;
    }
  }
  .select_header:hover {
    border-color: rgb(42, 165, 236);
  }
  .showlist {
    height: 300px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    .search {
      width: 100%;
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      background-color: rgb(245, 243, 243);
    }
    .list {
      .my-list .my-list-item {
        height: 30px;
        padding-left: 15px;
        cursor: pointer;
      }
      .my-list-item:hover {
        color: rgb(42, 165, 236);
        background-color: rgba(42, 165, 236, 0.2);
      }
    }
  }
}
</style>