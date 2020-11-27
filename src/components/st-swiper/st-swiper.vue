<template>
  <div class="st-swiper">
    <el-carousel height="150px" :interval="interval">
      <el-carousel-item v-for="(item,id) in swiperlist" :key="id">
        <img :src="require(`../../assets/images/swiper/${item.src}`)" alt="" srcset="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'st-swiper',
  props:{
    swiperlist:{
      type:Array,
      default:[]
    }
  },
  data() { 
    return {
      interval:1000,//轮播滚动时间间隔
    }
  }
 }
</script>

<style lang="scss" >
  .st-swiper{
    // width: 100%;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>