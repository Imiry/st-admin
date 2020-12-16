<!--
 * @Author: sitao
 * @Date: 2020-12-01 16:37:01
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-16 16:31:51
-->
<template>
  <div class="Uxform_container">
    <el-row>
      <el-col :span="12">
        <el-form :model="form" :rules="rules" ref="form" label-width="140px">
          <el-form-item :label="$t('form.userName')" prop="username">
            <el-input v-model="form.username" :placeholder="$t('form.userName')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.password')" prop="password">
            <el-input type="password" v-model="form.password" :placeholder="$t('form.password')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.confirmPassword')" prop="confirmPassword">
            <el-input
              type="password"
              v-model="form.confirmPassword"
              :placeholder="$t('form.confirmPassword')"
            ></el-input>
          </el-form-item>

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
export default {
  name: "UxForm",
  data() {
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
              required: true,
              message: this.$i18n.t('errorMsg.pleaseInputAPassword'),
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
      }]
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
