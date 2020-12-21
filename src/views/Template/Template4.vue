<!--
 * @Author: sitao
 * @Date: 2020-12-21 13:47:31
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 17:19:39
-->
<template>
  <div class="Template4_container">
    <div class="scroll_main">
      <div class="scroll_left" ref="goodMenu">
        <ul class="left_data">
          <li v-for="(item, index) in left" ref="lItem" :key="index" :class="{active: currentIndex == index}" @click="selectLeft(index)">{{item}}</li>
        </ul>
      </div>
      <div class="scroll_right" ref="goodList">
        <ul class="right_data">
          <li v-for="(item, index) in right" :key="index" ref="rItem" :class="{current: currentIndex == index}">
            <div class="title">{{item.name}}</div>
            <ul class="item_list">
              <li v-for="(sunItem, index) in item.content" :key="index">
                <i :class="sunItem"></i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Template4',
  data() { 
    return {
      left: ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j'],
      right: [
        {
          name: 'a',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'b',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'c',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'd',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'e',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'f',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'g',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'h',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'i',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
        {
          name: 'j',
          content: ['iconfont icon-fsux_tubiao_bingtu', 'iconfont icon-fsux_tubiao_shuiqiutu', 'iconfont icon-ditu', 'iconfont icon-relitu', 'iconfont icon-pubutu']
        },
      ],
      scrollY: 0, //获取实时滚动位置
      heightList: [] //获取每一个li的高度
    }
  },
  created() {
    //因为 _scrollInit函数需要操作DOM，因此必须在DOM元素存在文档中才能获取DOM节点
    //因此在 nextTick回调函数里面调用可以是实现此功能
    this.$nextTick(() => {
      this._scrollInit();
      this.getHeight();
    });
  },
  computed: {
    //当前想要选中的菜单
    currentIndex() {
      const index = this.heightList.findIndex((item, index) => {
        return (
          this.scrollY >= this.heightList[index] &&
          this.scrollY < this.heightList[index + 1]
        );
      });

      return index > 0 ? index : 0;
    }
  },
  methods:{
    selectLeft(index) {
      //点击左边菜单栏，立马高亮，不会等到右侧滚动结束后，左侧菜单栏才开始高亮（优化）
      this.scrollY = this.heightList[index];
      // console.log(this.scrollY)
      //点击了左侧菜单，获取相应右侧列表的元素，并使用Bscroll提供的scrollToElement()  Api跳转
      let rItem = this.$refs.rItem;
      let el = rItem[index];
      this.goodmenu.scrollToElement(el, 1000);
    },
    //初始化 better-scroll
    _scrollInit() {
      this.menuList = new BScroll (this.$refs.goodMenu, {
        //设置点击为true，左边菜单栏才能点击
        click: true
      });

      this.goodmenu = new BScroll (this.$refs.goodList, {
        //选中模式2，避免惯性的滑动也触发事件
        probeType: 2
      });

      this.goodmenu.on("scroll", pos => {
        //获取实时滚动的距离 使用scrollY接收
        this.scrollY = Math.abs(pos.y);
      });

      this.goodmenu.on("scrollEnd", pos => {
        //结束时触发事件获取一次位置，因为使用了模式2，惯性滚动不触发事件
        this.scrollY = Math.abs(pos.y);
      });
    },
    //获取右侧列表每一个li的高度，存入数组中
    getHeight() {
      //获取每一个li的高度
      const lis = this.$refs.rItem;
      //heightList的第一个元素为0
      let height = 0;
      this.heightList.push(height);
      //之后的高度即为当前li的高度加上之前面li的高度和
      lis.forEach(item => {
        //clientHeight = content + padding
        height += item.clientHeight;
        this.heightList.push(height);
      });
    }
  }
 }
</script>

<style lang="scss" >
  .Template4_container{
    width: 100%;
    .scroll_main{
      width: 100%;
      background-color: #fff;
      display: flex;
      cursor: pointer;
      
      .scroll_left{
        background-color: #fff;
        width: 10%;
        .left_data{
          li{
            height: 55px;
            line-height: 55px;
            border-bottom: 1px solid rgba(0,0,0,.2);
            text-align: center;
            box-sizing: border-box;
            font-size: 24px;
            font-weight: bold;
            color: rgba(48, 186, 196, 0.8);;
          }
          li:first-child{
            border-top: 1px solidrgba(0,0,0,.2);
          }
          .active{
            background-color: rgba(0, 0, 0,.6);
          }
        }
      }
      .scroll_right{
        background-color: #fff;
        width: 90%;
        position: relative;
        overflow: hidden;
        
        .right_data{
          position: absolute;
          width: 100%;
          box-sizing: border-box;
          .title{
            width: 100%;
            height: 55px;
            line-height: 55px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: rgba(48, 186, 196, 0.8);
            background-color: rgba(0,0,0,.1);
          }
          .item_list{
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-flow: wrap;
            width: 100%;
            
            li{
              width: 100px;
              height: 100px;
              line-height: 100px;
              background-color: rgba(0,0,0,.1);
              text-align: center;
              margin: 10px;
              border-radius: 5px;
              
              i{
                font-size: 70px;
              }
            }
          }
        }
      }
    }
  }
</style>