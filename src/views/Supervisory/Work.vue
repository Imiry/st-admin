<!--
 * @Author: sitao
 * @Date: 2020-12-29 09:57:22
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-20 16:03:33
-->
<template>
  <div class="Work_container">
    <el-card>
      <div v-for ="(item,index) in list" :index="index" v-html="change(item.dec)"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Work',
  data() { 
    return {
      color_text: [
        "#FFB5C5"
      ],
      list:[
        {
          id:"01",
          dec:"今天开心，我今天跑了，"
        },
        {
          id:"01",
          dec:"今天开心，我今天跑了5次，"
        },
        {
          id:"02",
          dec:"到今天5日，馊了2斤"
        },
        {
          id:"03",
          dec:"今天花了100元，买了3斤草莓"
        },
        {
          id:"04",
          dec:"累计50000步馊了两斤"
        }
      ]
    }
  },
  methods: {
    change(value) {
      let reg = RegExp(/\d+(万|日|步|元|次|斤)/g)
      let match=value.match(reg);
      if(match){
        let replace_text1 = value

        for(let i=0;i<match.length;i++){
          let replaceString = '<span style="color: ' + this.color_text + ';">' + match[i] + "</span>";
          replace_text1 =replace_text1.replace(match[i] ,replaceString);
        }
         return replace_text1
      }else{
        return value
      }
      
    }
  }
 }
</script>

<style lang="scss" >
  .Work_container{
    
  }
</style>