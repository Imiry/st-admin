<!--
 * @Author: sitao
 * @Date: 2021-01-26 12:22:54
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-27 11:13:44
-->
<template>
  <div class="article_con">
    <el-row style="display: flex">
      <el-input
        class="m-t-20"
        v-model="form.title"
        placeholder="输入标题"
        style="flex: 0.5"
      ></el-input>
      <el-select
        class="m-t-20"
        v-model="form.class"
        placeholder="请选择分类"
        style="width: 200px; margin-left: 10px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
    <mavon-editor class="m-t-20" v-model="form.content" @change="change" />

    <el-upload class="m-t-20" action="#" list-type="picture-card" :limit="1" :auto-upload="false" :on-change="handleChange">
      <i slot="default" class="el-icon-plus"></i>
      <div  slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <!-- {{form}} -->
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button
      type="primary"
      class="m-t-20"
      style="width: 100%"
      @click="submit()"
      >发布</el-button
    >
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      form: {
        title: "",
        class: this.value || "",
        content: "",
        coverImg: '' ,
      },
      value: "",
      options: [
        {
          value: "Vue",
        },
        {
          value: "React",
        },
        {
          value: "node",
        },
        {
          value: "Reacjs",
        },
        {
          value: "koa",
        },
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    change(e, s) {
      console.log(e, s);
    },
    handleRemove(file) {
      // console.log(file);
      
    },
    handleChange(file, fileList) {
      // console.log(URL.createObjectURL(file.raw));
      // this.imgA = URL.createObjectURL(file.raw);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.form.coverImg = URL.createObjectURL(file.raw);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async submit() {
      if(this.form.title == '' || this.form.class == '' || this.form.content == ''){
         this.$message({ type: "warning", message: "发布失败，请把信息必填项填完" });
      }else{
        const { data: res } = await this.$http.post(
          "/article/createArticle",
          this.form
        );
        console.log(res);
        if (res.status == 200) {
          this.$message({ type: "success", message: "发布成功" });
          this.form.title = ""
          this.form.class = ""
          this.form.content = ""
          this.form.coverImg = ""
          // this.dialogImageUrl = ""
        } else {
          this.$message({ type: "warning", message: "发布失败，请重新发送！" });
        }
       
      }
    },
  },
};
</script>

<style lang="scss" >
.article_con {
  
}
</style>