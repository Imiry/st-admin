<!--
 * @Author: sitao
 * @Date: 2020-12-21 10:43:46
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 11:14:10
-->
<template>
  <div class="ux_pwd">
    <st-card :cardname="cardname" :cardStyle="cardStyle">
      <div class="grid-content bg-purple">
        <el-form :model="form" :rules="rules" ref="form" label-width="140px">
          <el-form-item :label="$t('form.password')" prop="password">
            <ux-password
              ref="pwd"
              v-model="form.password"
              :pwdLengthRange="'6~10'"
            ></ux-password>
          </el-form-item>
          <el-form-item
            :label="$t('form.confirmPassword')"
            prop="confirmPassword"
          >
            <el-input
              type="password"
              v-model="form.confirmPassword"
              :placeholder="$t('form.confirmPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('form')">{{
              $t("button.submit")
            }}</el-button>
            <el-button @click="reset('form')">{{
              $t("button.cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      
    </st-card>
  </div>
</template>

<script>
import { checkStrong, pwdLength610 } from "../../../utils/mUtils.js";

export default {
  name: "UxPwd",

  data() {
    let validatePassword = (rule, value, callback) => {
      if (value == "" && this.subBtn == true) {
        callback(new Error(this.$i18n.t("errorMsg.pleaseInputAPassword")));
      } else if (pwdLength610(value) == false || checkStrong(value) == 1) {
        callback(
          new Error(
            this.$i18n.t("errorMsg.thePasswordDoesNotMeetTheRequirements")
          )
        );
      } else {
        callback();
      }
    };
    let validateConfirmPassword = (rule, value, callback) => {
      if (value == "" && this.subBtn == true) {
        callback(
          new Error(this.$i18n.t("errorMsg.pleaseEnterTheConfirmationPassword"))
        );
      } else if (value !== this.form.password) {
        callback(
          new Error(this.$i18n.t("errorMsg.twoPasswordEntriesAreInconsistent"))
        );
      } else {
        callback();
      }
    };
    return {
      form: {
        password: "",
        confirmPassword: "",
      },
      cardname: '密码强度校验:',
      cardStyle: {
        width: "100%"
      },
      rules: {
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: ["blur"],
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: "change",
          },
        ],
      },
    };
  },
  watch: {
    "form.password"(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$refs["form"].clearValidate("password");
      }
    },
  },

  created() {},
  methods: {
    submit(formName) {
      this.subBtn = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.subBtn = false;
          // 表单验证通过
        } else {
          this.subBtn = false;
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
      this.$refs.pwd.resetPwd();
      this.subBtn = false;
    },
  },
};
</script>

<style lang="scss" >
.ux_pwd {
  width: 100%;
  height: 100%;
  // background-color: #fff;
  padding-top: 20px;
}
</style>