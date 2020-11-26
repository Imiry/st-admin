<template>
  <div class="welcome_container">
    <div class="moban">
      <div class="moban_1">
        <el-row :gutter="20">
          <el-col :span="12">
            <div  class="grid-content1 purple1">
              <el-col :span="14" class="purple_left_1">
                <st-swiper class="swiper" :swiperlist="swiperImages"></st-swiper>
              </el-col>
              <el-col :span="10" class="purple_left_2"><img src="../../assets/images/logo.png" alt="" srcset=""></el-col>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 purple2">
              <st-bar></st-bar>
            </div>
          </el-col>
          <el-col :span="6"><div class="grid-content1 purple3"></div></el-col>
        </el-row>
      </div>
      <div class="moban_2">
        <el-row :gutter="20">
          <el-col :span="15"><div class="grid-content2 purple1"></div></el-col>
          <el-col :span="9"><div class="grid-content2 purple2"></div></el-col>          
        </el-row>        
      </div>
      <div class="moban_3">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content3 purple1"></div></el-col>
          <el-col :span="8"><div class="grid-content3 purple2"></div></el-col>
          <el-col :span="8"><div class="grid-content3 purple3"></div></el-col>          
        </el-row> 
      </div>
      <div class="moban_4"></div>
    </div>
  </div>
</template>

<script>
import StBar from '../../components/st-chart/st-bar.vue'
import stSwiper from '../../components/st-swiper/st-swiper.vue'
export default {
  components: { stSwiper, StBar },
  name: 'Welcome',
  data() { 
    return {
      //轮播图数据
      swiperImages:[
        {id:1,src:"a.jpg"},
        {id:2,src:"b.jpg"},
        {id:3,src:"c.jpg"},
        {id:4,src:"d.jpg"}
      ]
    }
  }
 }
</script>

<style lang="scss" >
  .welcome_container{
    width: 100%;
    // height: 100%;
  }
  .welcome_container .moban{
    width: 100%;
    height: auto;
  }
  .welcome_container .moban .el-row{
    margin-bottom: -20px;
  }
  .el-col{ 
    border-radius: 5px;
  }
  .moban_1,.moban_2,.moban_3{
    padding: 20px;
  }
  .moban_1 .el-row .grid-content1{
    border-radius: 5px;
    height: 200px;
    background-color: #fff;
    padding: 10px 10px;
    box-sizing: border-box;
  }
  .moban_1 .el-row .grid-content1 .purple_left_1{
    height: 180px;
    // background: rgb(161, 81, 81);

  }
  .moban_1 .el-row .grid-content1 .purple_left_1 .swiper{
    margin-top: 15px;
  }
  .moban_1 .el-row .grid-content1 .purple_left_2{
    height: 180px;
    // background-color: rgb(79, 138, 97);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .moban_1 .el-row .grid-content1 .purple_left_2 img{
      border-radius: 5px;
  }
  .moban_2 .el-row .grid-content2{
    border-radius: 5px;
    height: 350px;
    background-color: #fff;
  }

  .moban_3 .el-row .grid-content3{
    border-radius: 5px;
    height: 400px;
    background-color: #fff;
  }
  .moban_4 {  
    height: 100px;
  }
</style>