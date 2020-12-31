
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
            <!-- <i class="avatar iconfont icon-shouye"  alt srcset /> -->
            <img :src="exist" alt="">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">{{$t('change.settings')}}</el-dropdown-item>
            <el-dropdown-item @click.native="logout">{{$t('change.logout')}}</el-dropdown-item>
          </el-dropdown-menu> 
        </el-dropdown>
      </div>
    </el-header>
    
    <el-container :class="navFlag ? 'nav_position':''" >
      <el-aside class="el_aside" style="width:auto ;">
        <el-scrollbar class="scroll_left" >
          <el-menu
            class="nav-menu el-menu-vertical-demo"
            :default-active="$route.path"
            background-color="#222"
            text-color="#fff"
            active-text-color="#01DFD7"
            router
            :unique-opened="true"
            :collapse="isCollapse"
          >  
            <el-submenu :index="item.path" v-for="item in menuList" :key="item.path">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="handleGet(subItem)" :index="subItem.path" v-for="subItem in item.children" :key="subItem.path" >
                  <i :class="subItem.icon"></i>{{subItem.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      
      <el-scrollbar ref="scrollbar" class="conta" >
        <el-main >     
          <!-- <div class="router"  style="width:100%"> -->
            <!-- <div class="tag_hh"><el-tag  effect="dark" >工作台</el-tag></div> -->
            <st-routetag :disable_tag="disable_tag" :routeTag="routeTag" @closeTag="closeTag" @handelClick="handelClick"></st-routetag>
            
          <!-- </div> -->
          <div style="margin-top:35px"><router-view></router-view></div>
        </el-main>
      </el-scrollbar>
    </el-container>

    <!-- backtop -->
    <st-back-top v-show="backtopflag" @backtop="backtop"></st-back-top>
    <!-- backtop -->

    <transition name="set">
      <st-set :show="tabShow" @closeHandle="closeHandle" >
        <div class="tubiao">
          <el-tooltip class="item" effect="light" content="侧边栏位置" placement="bottom">
          <div class="icon" @click="changeNavposition">
              <i class="iconfont icon-nav"></i>   
          </div>
          </el-tooltip>
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
    <div class="tabout" v-show="tabIconFlag" @click="tabOut" v-drag>
      <div class="tabi"></div>
    </div>

  </el-container> 

</template>

<script src="./Home.js"></script>


<style lang="scss" src="./Home.scss" ></style> 