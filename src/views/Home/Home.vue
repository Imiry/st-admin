
<template>
  <el-container class="layout-container">
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
      </div>
      
      <div class="header_right">
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
      <el-aside width="auto">
        <el-menu
          class="nav-menu el-menu-vertical-demo"
          :default-active="$route.path"
          background-color="#222"
          text-color="#fff"
          active-text-color="#01DFD7"
          router
          :collapse="isCollapse"
        > 

          <el-menu-item index="/st_welcome">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">{{$t('nav.home')}}</span>
          </el-menu-item>

          <el-submenu index="2">
            <template  slot="title" >
              <i class="iconfont icon-otherfile"></i>
              <span slot="title">{{$t('nav.others')}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ux_table"><i class="iconfont icon-UX"></i>{{$t('others_subnav.Ux_Table')}}</el-menu-item>
              <el-menu-item index="/ux_form"><i class="iconfont icon-UX"></i>{{$t('others_subnav.Ux_Form')}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/st_template">
            <i class="iconfont icon-pulse"></i>
            <span slot="title">{{$t('nav.template')}}</span>
          </el-menu-item>
          <el-menu-item index="/st_manage">
            <i class="iconfont icon-baobeiguanli"></i>
            <span slot="title">{{$t('nav.manage')}}</span>
          </el-menu-item>
          <el-menu-item index="/st_form">
            <i class="iconfont icon-biaoge"></i>
            <span slot="title">{{$t('nav.form')}}</span>
          </el-menu-item>
          <el-submenu index="6">
            <template  slot="title" >
              <i class="iconfont icon-chart"></i>
              <span slot="title">{{$t('nav.chart')}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/st_line"><i class="iconfont icon-linechart"></i>{{$t('chart_subnav.St_line')}}</el-menu-item>
              <el-menu-item index="/st_histogram"><i class="iconfont icon-zhuzhuangtu"></i>{{$t('chart_subnav.St_histogram')}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template  slot="title" >
              <i class="iconfont icon-suozhu"></i>
              <span slot="title">{{$t('nav.element')}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/st_element"><i class="iconfont icon-xiaolian-"></i>{{$t('element_subnav.St_element')}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/st_settings">
            <i class="iconfont icon-shezhi"></i>
            <span slot="title">{{$t('nav.settings')}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container> 
</template>

<script src="./Home.js"></script>


<style lang="scss" src="./Home.scss" ></style>