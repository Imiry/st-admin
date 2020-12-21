<!--
 * @Author: sitao
 * @Date: 2020-12-21 09:57:17
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 12:07:01
-->
<template>
  <div class="ux-password">
    <el-popover placement="right" trigger="manual" width="320" v-model="visible">
      <div class="text-color f-s-12">
        <div>
          <span v-show="pwdLength == null">
            <i class="iconfont f-s-14">&#xe61d;</i>
          </span>
          <span v-show="pwdLength == true">
            <i class="iconfont success">&#xe7ca;</i>
          </span>
          <span v-show="pwdLength == false">
            <i class="iconfont danger">&#xe671;</i>
          </span>
          <span v-if="pwdLengthRange == '8~30'">{{ $t("errorMsg.passwordLengthIsBetween8And30") }}</span>
          <span v-if="pwdLengthRange == '6~10'">{{ $t("errorMsg.passwordLengthIsBetween6And10") }}</span>
        </div>
        <div class="m-t-10">
          <span v-show="pwdLevel == 0">
            <i class="iconfont f-s-14">&#xe61d;</i>
          </span>
          <span v-show="pwdLevel == 2 || pwdLevel == 3 || pwdLevel == 4">
            <i class="iconfont success">&#xe7ca;</i>
          </span>
          <span v-show="pwdLevel == 1 ">
            <i class="iconfont danger">&#xe671;</i>
          </span>
          {{ $t( "errorMsg.containAtLeastTwoCombinationsOfNumbers/Uppercase/LowercaseLetters/Characters") }}
        </div>
        <div class="m-t-10">
          {{$t('form.passwordStrength')}}:
          <span class="pwd-tip-style" :style="{ backgroundColor: lowBgColor }"></span>
          <span class="pwd-tip-style" :style="{ backgroundColor: midBgColor }"></span>
          <span class="pwd-tip-style" :style="{ backgroundColor: highBgColor }"></span>
          {{ safeMsg }} 
        </div>
      </div>
      <el-input
        slot="reference"
        type="password"
        v-model="password"
        :placeholder="$t('form.password')"
        @input="sendPwd"
        @focus="visible = true"
        @blur="visible = false"
        prefix-icon=" icon iconfont icon-zu" 
        show-password
      ></el-input>
    </el-popover>    
  </div>
</template>

<script>
import {
    checkStrong,
    pwdLength830,
    pwdLength610
} from '../../utils/mUtils.js';
export default {
  name: 'ux-password',
    data() {
      return {
          pwdLevel: 0,
          pwdLength: null,
          safeMsg: '',
          lowBgColor: '#dcdcdc',
          midBgColor: '#dcdcdc',
          highBgColor: '#dcdcdc',
          password: this.value,
          visible: false,
      }
    },
    props: {
      value: {
          type: String,
          required: '',
          default: ''
      },
      pwdLengthRange: {
          type: String,
          required: '',
          default: '8~30'
      },
    },
    watch: {
      'password'(newVal, oldVal) {
          this.pwdLevel = checkStrong(newVal);
          if (this.pwdLengthRange == '8~30') {
              this.pwdLength = pwdLength830(newVal);
          } else if (this.pwdLengthRange == '6~10') {
              this.pwdLength = pwdLength610(newVal)
          }

          if (this.pwdLevel == 2) {
              this.safeMsg = this.$i18n.t('form.weak');
              this.lowBgColor = '#ff460f';
              this.midBgColor = '#dcdcdc';
              this.highBgColor = '#dcdcdc';
          } else if (this.pwdLevel == 3) {
              this.safeMsg = this.$i18n.t('form.moderate');
              this.lowBgColor = '#ff6a00';
              this.midBgColor = '#ff6a00';
              this.highBgColor = '#dcdcdc';
          } else if (this.pwdLevel == 4) {
              this.safeMsg = this.$i18n.t('form.strong');
              this.lowBgColor = '#0a9e00';
              this.midBgColor = '#0a9e00';
              this.highBgColor = '#0a9e00'
          } else {
              this.lowBgColor = '#dcdcdc';
              this.midBgColor = '#dcdcdc';
              this.highBgColor = '#dcdcdc';
          }
      }
    },
    methods: {
        sendPwd() {
            this.$emit('input', this.password)
        },
        resetPwd() {
            this.password = '';
        },
    }
 }
</script>

<style lang="scss" >
  .ux-password{

  }
</style>