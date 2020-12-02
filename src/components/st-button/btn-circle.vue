<!--
 * @Author: sitao
 * @Date: 2020-12-02 15:00:07
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-02 15:50:38
-->
<template>
  <div class="btn_container">
    <el-button 
    :type="btntype" 
    :size="size" 
    :disabled="disabled"  	    
    @click="btnClick" 
    :class="className"
    :round="round" 
    :plain="plain" 
    :circle="circle" 	    
    :autofocus="autofocus"
    :icon="iconName" 
    :native-type="nativeType" 	    
    :loading="loading">
    {{title}}
  </el-button>
  </div>
</template>

<script>
export default {
  name: 'btn-circle',
// 接受父组件的值
    props: {
      btntype: {  //type	类型	string	primary / success / warning / danger / info / text
        type: String,
        default: 'success'
      },
      title: {  //按钮Name
        type: String,
        default: ''
      },
      size: {  //尺寸	string	medium / small / mini
        type: String,
        default: 'mini'
      },
      disabled: {//是否禁用状态	boolean
        type: Boolean,
        default: false
      },
      round: {//圆角
        type: Boolean,
        default: false
      },
      plain: {//朴素
        type: Boolean,
        default: false
      },
      circle: {//是否圆形按钮
        type: Boolean,
        default: false
      },
      loading: {//是否加载中状态
        type: Boolean,
        default: false
      },
      autofocus: {//是否默认聚焦	boolean
        type: Boolean,
        default: false
      },
      nativeType: {  //原生 type 属性	string	button / submit / reset
        type: String,
        default: 'button'
      },
      iconName: {  //icon	图标类名	string
        type: String,
        default: ''
      },
      className: { //class
        type: String,
        default: ''
      },
    },
    
  data() { 
    return {
      btnClick(){
        this.$emit('handleClick')
      }
    }
  
  }
 }
</script>

<style lang="scss" >
  .btn_container{

  }
</style>