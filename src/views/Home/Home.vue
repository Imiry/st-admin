
<template>
  <el-container class="layout-container" ref="faultTree">
    <el-header class="header">
      <div class="header_left">
        <h1>
          <i
          :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse
              }"
          @click="toggleNav"
          ></i>
        </h1>
        <div class="bigBox">
          <div class="s_box1"></div>
          <div class="s_box2"></div>
          <div class="s_box3"></div>
          <div class="s_box4"></div>
          <div class="s_box5"></div>
          <div class="s_box6"></div>
        </div>
      </div>
      
      <div class="header_right">
        <div class="exprand" @click="exprandChange">
          <i :class="exprandflag ? 'iconfont icon-ziyuanldpi1' : 'iconfont icon-suoxiao'"></i>
        </div>
        <el-dropdown class="el-drop1">
          <span class="el-dropdown-link">
            {{currentLanguage}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item index="1-1" @click.native="handleChange('zh')">中文</el-dropdown-item>
            <el-dropdown-item index="1-2" @click.native="handleChange('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-select class="el-select" @change="handleChange(language)" v-model="language" placeholder="中文" >
          <el-option label="中文" value="zh"></el-option>
          <el-option label="English" value="en"></el-option>
        </el-select> -->
        <el-dropdown class="el-drop2">
          <div class="avatar-wrap">
            <i class="avatar iconfont icon-shouye"  alt srcset />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">{{$t('change.settings')}}</el-dropdown-item>
            <el-dropdown-item @click.native="logout">{{$t('change.logout')}}</el-dropdown-item>
          </el-dropdown-menu> 
        </el-dropdown>
      </div>
      
    </el-header>
    
    <el-container >
      
      <el-aside class="el_aside" style="width:auto ;">
        <el-scrollbar class="scroll_left" >
          <el-menu
            class="nav-menu el-menu-vertical-demo"
            :default-active="$route.path"
            background-color="#222"
            text-color="#fff"
            active-text-color="#01DFD7"
            router
            :collapse="isCollapse"
          > 
          <!-- <el-scrollbar style="height:100%"> -->
            <el-menu-item index="/st_welcome">
              <i class="iconfont icon-shouye icbg"></i>
              <span slot="title">{{$t('nav.home')}}</span>
            </el-menu-item>

            <el-submenu index="2">
              <template  slot="title" >
                <i class="iconfont icon-otherfile icbg"></i>
                <span slot="title">{{$t('nav.others')}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/ux_table"><i class="iconfont icon-UX"></i>{{$t('others_subnav.Ux_Table')}}</el-menu-item>
                <el-menu-item index="/ux_form"><i class="iconfont icon-UX"></i>{{$t('others_subnav.Ux_Form')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template  slot="title" >
                <i class="iconfont icon-pulse icbg"></i>
                <span slot="title">{{$t('nav.template')}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/st_template"><i class="iconfont icon-pulse"></i>{{$t('template_subnav.template1')}}</el-menu-item>
                <el-menu-item index="/st_template2"><i class="iconfont icon-pulse"></i>{{$t('template_subnav.template2')}}</el-menu-item>
                <el-menu-item index="/st_template3"><i class="iconfont icon-pulse"></i>{{$t('template_subnav.template2')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/st_manage">
              <i class="iconfont icon-baobeiguanli icbg"></i>
              <span slot="title">{{$t('nav.manage')}}</span>
            </el-menu-item>
            <el-menu-item index="/st_form">
              <i class="iconfont icon-biaoge icbg"></i>
              <span slot="title">{{$t('nav.form')}}</span>
            </el-menu-item>
            <el-submenu index="6">
              <template  slot="title" >
                <i class="iconfont icon-chart icbg"></i>
                <span slot="title">{{$t('nav.chart')}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/st_line"><i class="iconfont icon-linechart"></i>{{$t('chart_subnav.St_line')}}</el-menu-item>
                <el-menu-item index="/st_histogram"><i class="iconfont icon-zhuzhuangtu"></i>{{$t('chart_subnav.St_histogram')}}</el-menu-item>
                <el-menu-item index="/st_bar"><i class="iconfont icon-icon-"></i>{{$t('chart_subnav.St_bar')}}</el-menu-item>
                <el-menu-item index="/st_pie"><i class="iconfont icon-tianchongxing-"></i>{{$t('chart_subnav.St_pie')}}</el-menu-item>
                <el-menu-item index="/st_ring"><i class="iconfont icon-fsux_tubiao_bingtu"></i>{{$t('chart_subnav.St_ring')}}</el-menu-item>
                <el-menu-item index="/st_waterfal"><i class="iconfont icon-pubutu"></i>{{$t('chart_subnav.St_waterfal')}}</el-menu-item>
                <el-menu-item index="/st_funnel"><i class="iconfont icon-loudoutu"></i>{{$t('chart_subnav.St_funnel')}}</el-menu-item>
                <el-menu-item index="/st_radar"><i class="iconfont icon-leidatu"></i>{{$t('chart_subnav.St_radar')}}</el-menu-item>
                <el-menu-item index="/st_map"><i class="iconfont icon-ditu"></i>{{$t('chart_subnav.St_map')}}</el-menu-item>
                <el-menu-item index="/st_sankey"><i class="iconfont icon-tubiaozhizuomoban_sangjitu"></i>{{$t('chart_subnav.St_sankey')}}</el-menu-item>
                <el-menu-item index="/st_heatmap"><i class="iconfont icon-sandiantu"></i>{{$t('chart_subnav.St_heatmap')}}</el-menu-item>
                <el-menu-item index="/st_scatter"><i class="iconfont icon-Kxiantu"></i>{{$t('chart_subnav.St_scatter')}}</el-menu-item>
                <el-menu-item index="/st_candle"><i class="iconfont icon-ziyuan"></i>{{$t('chart_subnav.St_candle')}}</el-menu-item>
                <el-menu-item index="/st_gauge"><i class="iconfont icon-ziyuan"></i>{{$t('chart_subnav.St_gauge')}}</el-menu-item>
                <el-menu-item index="/st_tree"><i class="iconfont icon-511tongji_shutu"></i>{{$t('chart_subnav.St_tree')}}</el-menu-item>
                <el-menu-item index="/st_liquidfill"><i class="iconfont icon-fsux_tubiao_shuiqiutu"></i>{{$t('chart_subnav.St_liquidfill')}}</el-menu-item>
                <el-menu-item index="/st_wordcloud"><i class="iconfont icon-ciyuntu"></i>{{$t('chart_subnav.St_wordcloud')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template  slot="title" >
                <i class="iconfont icon-suozhu icbg"></i>
                <span slot="title">{{$t('nav.element')}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/st_element"><i class="iconfont icon-xiaolian-"></i>{{$t('element_subnav.St_element')}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/st_settings">
              <i class="iconfont icon-shezhi icbg"></i>
              <span slot="title">{{$t('nav.settings')}}</span>
            </el-menu-item>
            <!-- </el-scrollbar> -->
          </el-menu>
        </el-scrollbar>
      </el-aside>
      
      <el-scrollbar ref="scrollbar" class="conta" >
        <el-main >       
            <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
    <st-back-top v-show="backtopflag" @backtop="backtop"></st-back-top>
    <transition name="set">
      <st-set :show="tabShow" @closeHandle="closeHandle">
        <div class="tubiao">
          <div class="icon"><i class="iconfont icon-apple"></i></div>
          <div class="icon"><i class="iconfont icon-xiaomi"></i></div>
          <div class="icon"><i class="iconfont icon-erweima"></i></div>
          <div class="icon"><i class="iconfont icon-feiji800"></i></div>
          <div class="icon"><i class="iconfont icon-wifi"></i></div>
          <div class="icon"><i class="iconfont icon-lanya"></i></div>
          <div class="icon" ><i class="iconfont icon-jieping"></i></div>
          <div class="icon"><i class="iconfont icon-weixin"></i></div>
        </div>
      </st-set>
    </transition>
    <!-- 工具图标类 -->
    <div class="tabout" v-show="tabIconFlag" @click="tabOut"><i class="iconfont icon-peizhi"></i></div>
  </el-container> 
  
</template>

<script src="./Home.js"></script>


<style lang="scss" src="./Home.scss" ></style> 