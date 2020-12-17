<template>
  <div class="home-tpl">
    <el-row>
      <el-col :span="12">
        <el-form :model="form" :rules="rules" ref="form" label-width="140px">
          <el-form-item :label="$t('form.password')" prop="password">
            <el-popover placement="right" trigger="hover" width="320">
              <div class="text-color f-s-12">
                <div>
                  <span v-show="pwdLength == 0">
                    <i class="iconfont f-s-14">&#xe61d;</i>
                  </span>
                  <span v-show="pwdLength == 8 ">
                    <i class="iconfont success">&#xe7ca;</i>
                  </span>
                  <span v-show="pwdLength != 8 && pwdLength != 0">
                    <i class="iconfont danger">&#xe671;</i>
                  </span>
                  {{ $t("errorMsg.passwordLengthIsBetween8And30") }}
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
                  {{
                  $t(
                  "errorMsg.containAtLeastTwoCombinationsOfNumbers/Uppercase/LowercaseLetters/Characters"
                  )
                  }}
                </div>
                <div class="m-t-10">
                  {{$t('form.passwordStrength')}}:
                  <span
                    class="pwd-tip-style"
                    :style="{ backgroundColor: lowBgColor }"
                  ></span>
                  <span class="pwd-tip-style" :style="{ backgroundColor: midBgColor }"></span>
                  <span class="pwd-tip-style" :style="{ backgroundColor: highBgColor }"></span>
                  {{ safeMsg }}
                </div>
              </div>
              <el-input
                type="password"
                v-model="form.password"
                :placeholder="$t('form.password')"
                slot="reference"
              ></el-input>
            </el-popover>
          </el-form-item>
          <el-form-item :label="$t('form.confirmPassword')" prop="confirmPassword">
            <el-input
              type="password"
              v-model="form.confirmPassword"
              :placeholder="$t('form.confirmPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('form')">{{$t('btn.submit')}}</el-button>
            <el-button @click="reset('form')">{{$t('btn.cancel')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped src="./home.scss"></style>
<script src="./home.js"></script>

