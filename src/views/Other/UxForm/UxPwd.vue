<!--
 * @Author: sitao
 * @Date: 2020-12-21 10:43:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 11:14:10
-->
<template>
  <div class="ux_pwd">
    <div class="select_header" @click="changeUp">
      <div class="content">{{ currentContent }}</div>
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
        <vxe-list height="240" class="my-list" :loading="loading" :data="list">
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
import search from "./componets/search.vue";
export default {
  name: "UxPwd",
  components: {
    search,
  },
  data() {
    return {
      searchMemberStyle: {
        width: "100%",
      },
      visibale: false,
      currentContent: "项目", //当前显示的内容
      loading: false, //loading显示
      list: [],
    };
  },
  watch: {},

  created() {
    this.getList();
  },
  methods: {
    //回车确定搜索
    onKeyUp(val) {
      console.log(val);
    },

    //搜索数据
    searchMember(val) {
      console.log(val);
    },

    //下拉图标切换
    changeUp() {
      this.visibale = !this.visibale;
    },

    //模拟后台返回数据
    getList() {
      for (let i = 0; i < 10000; i++) {
        this.list.push({
          label: "项目" + i,
        });
      }
    },
    //选中当前的数据
    selectItem(item) {
      this.currentContent = item.label;
    },
  },
};
</script>

<style lang="scss" >
.ux_pwd {
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
      color: #ccc;
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