/*
 * @Author: sitao
 * @Date: 2020-12-17 11:23:04
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-21 10:07:35
 */
import {
  regExpConfig
} from './regular.config'

//根据用户输入的值判断数字，小写字母，大写字母，特殊符号
export function checkStrong(value) {

  let modes = 0;

  if (value.length < 1) return modes;
  if (regExpConfig.numValidate.test(value)) modes++;
  if (regExpConfig.lowerValidate.test(value)) modes++;
  if (regExpConfig.upperValidate.test(value)) modes++;
  if (regExpConfig.specialValidate.test(value)) modes++;

  switch (modes) {
      case 1:
          return 1;
      case 2:
          return 2;
      case 3:
          return 3;
      case 4:
          return 4;
  }
  return modes;
}
//登录的字段长度检验
export function pwdLengthlogin(value) {
  let charLength = null;
  if(value.length >=3  && value.length <= 6) {
    charLength = true
  }else if(value.length === 0){
    charLength = null
  }else{
    charLength = false
  }
  // console.log(charLength)
  return charLength
}

/**
 * pwdLength830 密码长度为8~30为校验
 */
export function pwdLength830(value) {
  let charLength = null;
  if(value.length >= 8 && value.length <= 30) {
    charLength = true
  }else if(value.length === 0){
    charLength = null
  }else{
    charLength = false
  }
  // console.log(charLength)
  return charLength
}
/**
 * pwdLength610 密码长度为6~10为校验
 */
export function pwdLength610(value) {
  let charLength = null;
  if (value != '') {
      if (6 <= value.length && value.length <= 10) {
          charLength = true;
      } else {
          charLength = false;
      }
  } else {
      charLength = null;
  }

  return charLength;
}