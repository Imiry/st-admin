<!--
 * @Author: sitao
 * @Date: 2020-12-01 16:37:01
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-18 14:46:51
-->
<template>
  <div class="Uxform_container">
    <el-row>
      <el-col :span="12">
        <el-form :model="form" :rules="rules" ref="form" label-width="140px">
          <el-form-item :label="$t('form.userName')" prop="username">
            <el-input v-model="form.username" :placeholder="$t('form.userName')"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('form.password')" prop="password">
            <el-input type="password" v-model="form.password" :placeholder="$t('form.password')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.confirmPassword')" prop="confirmPassword">
            <el-input
              type="password"
              v-model="form.confirmPassword"
              :placeholder="$t('form.confirmPassword')" 
            ></el-input>
          </el-form-item> -->

          <el-form-item :label="$t('form.age')" prop="age">
            <el-input type="age" v-model.number="form.age" :placeholder="$t('form.age')"></el-input>
          </el-form-item>
          <el-form-item label="单位" prop="utils">
              <el-input v-model="form.utils" placeholder="例如：10、10Kb"></el-input>
          </el-form-item>
          <el-form-item label="数字" prop="num">
            <!--  :min最小值  :max最大值 -->
            <el-input-number v-model="form.num" :min="1"></el-input-number>
            <!--  单位-->
            <span class="m-l-5">GB</span>
            <!--  提示信息-->
            <span class="m-l-5 tip-text">数字上限100,下限1</span>
          </el-form-item>
          <el-form-item label="添加单位" prop="num" class="define-num-unit-input">
            <el-input v-model.number="form.num">
              <i
                slot="prefix"
                class="el-input__icon el-icon-minus p-l-5 p-r-10"
                :class="form.num == 1 ? 'not-click' : '' "
                @click="minusNum"
              ></i>
              <i slot="suffix" class="el-input__icon el-icon-plus p-l-10 p-r-5" @click="addNum"></i>
              <el-select v-model="form.unit" slot="append">
                <el-option
                  v-for="(item, index) in unitArrs"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('form.email')" prop="email">
            <el-input v-model="form.email" :placeholder="$t('form.email')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.contact')" prop="contact">
            <el-input v-model="form.contact" :placeholder="$t('form.contact')"></el-input>
          </el-form-item>
          <el-form-item label="默认label与value相同下拉框" prop="defaultType">
            <el-select v-model="form.defaultType">
              <el-option
                v-for="(item,index) in defaultTypes"
                :key="index"
                :label="`${$t(`form.${item.label}`)}`"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="label与value不同下拉框" prop="type">
            <el-select v-model="form.type">
              <el-option
                v-for="(item,index) in types"
                :key="index"
                :label="`${$t(`form.${item.label}`)}`"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文本域" prop="typeareatext">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.typeareatext"></el-input>
          </el-form-item>

          <el-form-item :label="$t('form.password')" prop="password">
            <el-popover placement="right" trigger="focus" width="320">
              <div class="text-color f-s-12">
                <div>
                  <span v-show="pwdLength === null">
                    <i class="iconfont icon-gantanhao f-s-14"></i>
                  </span>
                  <span v-show="pwdLength === true">
                    <i class="iconfont icon-chenggong1 success"></i>
                  </span>
                  <span v-show="pwdLength !== null && pwdLength !== true">
                    <i class="iconfont icon-shibai danger"></i>
                  </span>
                  {{ $t("errorMsg.passwordLengthIsBetween8And30") }}
                </div>
                <div class="m-t-10">
                  <span v-show="pwdLevel == 0">
                    <i class="iconfont icon-gantanhao f-s-14"></i>
                  </span>
                  <span v-show="pwdLevel == 2 || pwdLevel == 3 || pwdLevel == 4">
                    <i class="iconfont icon-chenggong1 success"></i>
                  </span>
                  <span v-show="pwdLevel == 1 ">
                    <i class="iconfont icon-shibai danger"></i>
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
                show-password="true"
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
            <el-button type="primary" @click="submit('form')">{{$t('button.submit')}}</el-button>
            <el-button @click="reset('form')">{{$t('button.cancel')}}</el-button>
          </el-form-item>

          
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
    validateNum,
    validateEmail,
    validateContact,
    validUnits
} from '../../../utils/validator.js';
import {
    checkStrong,
    pwdLength 
} from '../../../utils/mUtils';
export default {
  name: "UxForm",
  data() {
    let validateConfirmPassword = (rule, value, callback) => {
      if (value == '') {
          callback(new Error(this.$i18n.t('errorMsg.pleaseEnterTheConfirmationPassword')));
      } else if (value !== this.form.password) {
          callback(new Error(this.$i18n.t('errorMsg.twoPasswordEntriesAreInconsistent')));
      } else {
          callback();
      }
    }
    let validatePassword = (rule,value,callback) => {
      if(value == "") {
        callback(new Error('密码不能为空！'))
      }else if(value.length < 8 || value.length > 30) {
        callback(new Error('密码长度为8～30之间'))
      }else if(this.pwdLength == 1){
        callback(new Error('至少包含数字/大写字母/小写字母/特殊字符2种组合'))
      }
    }
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        age: undefined,
        num: 1,
        unit: 'B/s',
        email: '',
        contact: '',
        defaultType: 'public',
        type: 'public',
        typeareatext: '',
        utils:''
      },
      rules: {
        username: [{
            required: true,
            message: this.$i18n.t('errorMsg.pleaseEnterUserName'),
            trigger: 'blur'
        }],
        password: [{
            required: true, //this.$i18n.t('errorMsg.pleaseInputAPassword')
            validator: validatePassword,
            trigger: 'blur'
        }],
        confirmPassword: [{
            required: true,
            validator: validateConfirmPassword,
            trigger: 'blur'
        }],
        age: [{
            required: true,
            message: this.$i18n.t('errorMsg.pleaseEnterAge'),
            trigger: 'blur'
        }],
        num: [{
            required: true,
            validator: validateNum,
            trigger: 'blur'
        }],
        email: [{
            required: true,
            validator: validateEmail,
            trigger: 'blur'
        }],
        contact: [{
            required: true,
            validator: validateContact,
            trigger: 'blur'
        }],
        utils:[
          {
            required: true, 
            validator:(rule,value,callback)=>{
                return validUnits(this.form,'utils',rule,value,callback)
            },
            trigger: 'blur'
          }
        ]
      },
      // unitArrs: ['GB', 'MB'],
      unitArrs: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
      defaultTypes: [{
              label: 'public'
          },
          {
              label: 'private'
          }
      ],
      types: [{
          label: 'public',
          value: 'public'
      }, {
          label: 'private',
          value: 'private'
      }],
      pwdLevel: 0,
      pwdLength: null,
      safeMsg: '',
      lowBgColor: '#dcdcdc',
      midBgColor: '#dcdcdc',
      highBgColor: '#dcdcdc',
    }
  },
  watch: {
    "form.password"(newVal, oldVal) {
      this.pwdLevel = checkStrong(newVal);
      this.pwdLength = pwdLength(newVal);
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
      }
    }
  },
  methods: {
    submit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                // 表单验证通过
            } else {
                return false;
            }
        })
    },
    reset(formName) {
        this.$refs[formName].resetFields();
    },
    minusNum() {
        if (this.form.num > 1) {
            --this.form.num;
        }
    },
    addNum() {
        // ++this.form.num;
        this.form.num++;
    }
  },
};
</script>
<style lang="scss" scoped>
.Uxform_container{
  height: 100%;
}

</style>
