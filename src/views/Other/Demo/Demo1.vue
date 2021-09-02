
<template>
  <div class="demo1">
    <select-search 
    :content="currentContent"
    :items="list"
    :visibale="visibale"
    :conStyle="conStyle"
    @keyup="onKeyUp"
    @select_item="onSelectMember"
    @search_member="onSearchMember"
    @change_up="onChangeUp"
    ></select-search>
  </div>
</template>

<script>
import selectSearch from '../../../components/select/select-search.vue';

export default {
  components: { selectSearch },
  name: "demo1",
  data() {
    return {
      list: [],
      currentContent:'项目',
      visibale: false,
      conStyle: {
        width:"300px"
      }
    };
  },
  watch: {},

  created() {
    this.getList()
  },
  methods: {
    getList() {
      for (let i = 0; i < 10000; i++) {
        this.list.push({
          label: "项目" + i,
          index: i
        });
      }
    },
    onKeyUp(value) {
      console.log(value);
    },
    onSelectMember(item) {
      console.log(item);
      this.currentContent = item.label
      this.visibale = false
    },
    onSearchMember(value) {
      console.log(value);
    },
    onChangeUp() {
      this.visibale = !this.visibale
    }
  }
};
</script>

<style lang="scss" >

</style>