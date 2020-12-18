/*
 * @Author: sitao
 * @Date: 2020-12-18 15:04:28
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-18 17:51:50
 */
//匹配0-9A-Za-z特殊字符(高)
let seniorReg=new RegExp(/^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[+.~!@#$%^&*?_-]+)[0-9a-zA-Z+.~!@#$%^&*?_-]+$/);
//匹配0-9a-z(低)
let lowerReg=new RegExp(/^(?![0-9]+$)(?![a-z]+$)[0-9a-z]+$/);
//匹配0-9A-Z(低)
let caseReg=new RegExp(/^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]+$/);
//匹配a-zA-Z(低)
let upcaseReg=new RegExp(/^(?![[a-z]+$)(?![A-Z]+$)[A-Za-z]+$/);
let upLowerReg=new RegExp(/^(?![A-Z]+$)(?![a-z]+$)[A-Za-z]+$/);
//0-9加特殊符号(低)
let numReg=new RegExp(/^(?![0-9]+$)[0-9=.*+.~!@#$%^&*?_-]+$/);
//匹配A-Z加特殊符号0-9(中)
let upcaseNumReg=new RegExp(/^(?=.*\d+)(?=.*[A-Z]+)(?=.*[+.~!@#$%^&*?_-]+)[0-9A-Z+.~!@#$%^&*?_-]+$/);
//匹配a-z加特殊符号0-9(中)
let lowerNumReg=new RegExp(/^(?=.*\d+)(?=.*[a-z]+)(?=.*[+.~!@#$%^&*?_-]+)[0-9a-z+.~!@#$%^&*?_-]+$/);
//0-9 a-z A-Z(中)
let intermediateReg=new RegExp(/^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)[0-9a-zA-Z]+$/);;

let mindle = new RegExp(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[+.~!@#$%^&*?_-]+)[a-zA-Z+.~!@#$%^&*?_-]+$/)


export const validatePwd = (form,validStatus,formName,rule, value, callback) => {
  if(value===''){
    validStatus.default_val=null;
    validStatus.setLevel=null;
    callback(new Error('请输入密码'))
  }else{
    if(value.length>=8 && value.length<=30){
         validStatus.default_val=true;
    }else{
         validStatus.default_val=false
         callback(new Error('密码不符合要求'))
    }
    if(form['checkPass']!== '') {
      console.log('zzzzzzz')
      formName.validateField('checkPass');
    }
    if(lowerReg.test(value) || caseReg.test(value) || upcaseReg.test(value) || upLowerReg.test(value) || numReg.test(value)){
          console.log(222222)
          validStatus.setLevel='low'
          callback()
    }else if(intermediateReg.test(value)||upcaseNumReg.test(value)||lowerNumReg.test(value) || mindle.test(value)){
          validStatus.setLevel='middle'
          callback()
    }else if(seniorReg.test(value)){
          validStatus.setLevel='high'
          callback()
    }else{
          validStatus.setLevel='error'
          callback(new Error('密码不符合要求'))
    }
  }
}

export const validateConfirm = (form,rule,value,callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}



