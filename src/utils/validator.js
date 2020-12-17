
/**
 * check***  表示不是必填项
 * validate*** 表示必填项
 */

/**
 * checkAge  年龄
 * checkEmail 邮箱
 * checkPhone 手机号
 */

/**
 * validateAge  年龄，必填项
 * validateEmail  邮箱格式，必填项
 * validateContact 联系方式格式，必填项
 * validateConfirmPassword 密码校验，必填项
 * validateCPU CPU 必填项  值必须在0～255之间
//  * validateDisk 磁盘 必填项  值必须大于等于0
 * validateRam  内存 必填项  值必须在0～53249之间  单位为MB
 * validateNum  CPU,磁盘，内存，必填项，值必须大于等于0
 */

import i18n from '../i18n/i18n';
import {
    regExpConfig
} from './regular.config'


import {humanLimitSize} from '../utils/filters'
const limit=(value)=>{
    return regExpConfig.bReg.test(value) ? [0,'B']:
     regExpConfig.kbReg.test(value) ? [1,'KB']:
     regExpConfig.mbReg.test(value)? [2,'MB']:
     regExpConfig.gbReg.test(value)? [3,'GB']:
     regExpConfig.tbReg.test(value)? [4,'TB']:
     regExpConfig.pbReg.test(value)? [5,'PB']:
     regExpConfig.ebReg.test(value)? [6,'EB']:
     regExpConfig.zbReg.test(value)? [7,'ZB']:
     regExpConfig.ybReg.test(value) ? [8,'YB']:''
}

const dislodgeLetter=(str)=> {
      let result;
      //[a-zA-Z]表示匹配字bai母，g表示全局匹配
      let reg= /[a-zA-Z]+/
      while (result = str.match(reg)) { 
        str = str.replace(result[0], '');
      }
      return Math.ceil(str*100)/100;
}

export const checkAge = (rule, value, callback) => {
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error(i18n.t('errorMsg.pleaseEnterAge')));
        } else {
            if (!(0 < parseInt(value) < 100)) {
                callback(new Error(i18n.t('errorMsg.ageMustBeBetween1And99')));
            } else {
                callback();
            }
        }
    }, 1000);
};
export const checkEmail = (rule, value, callback) => {
    if (!regExpConfig.emailRegex.test(value)) {
        callback(new Error(i18n.t('errorMsg.incorrectEmailFormat')))
    } else {
        callback();
    }
}

export const checkPhone = (rule, value, callback) => {
    if (!regExpConfig.phoneRegex.test(value)) {
        callback(new Error(i18n.t('errorMsg.mobilePhoneFormatIsIncorrect')))
    } else {
        callback();
    }
};

export const validateAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error(i18n.t('errorMsg.pleaseEnterAge')));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error(i18n.t('errorMsg.pleaseEnterANumericValue')));
        } else {
            if (!(0 < parseInt(value) && parseInt(value) < 100)) {
                callback(new Error(i18n.t('errorMsg.ageMustBeBetween1And99')));
            } else {
                callback();
            }
        }
    }, 1000);
};
export const validateEmail = (rule, value, callback) => {
    if (value == '') {
        callback(new Error(i18n.t('errorMsg.pleaseEnterEmail')));
        return;
    }
    if (!regExpConfig.emailRegex.test(value)) {
        callback(new Error(i18n.t('errorMsg.incorrectEmailFormat')))
    } else {
        callback();
    }
}

export const validateContact = (rule, value, callback) => {
    if (value == '') {
        callback(new Error(i18n.t('errorMsg.pleaseEnterContact')));
    } else {
        if (!regExpConfig.phoneRegex.test(value)) {
            callback(new Error(i18n.t('errorMsg.mobilePhoneFormatIsIncorrect')))
        } else {
            callback();
        }
    }
};

export const validateNum = (rule, value, callback) => {
    if (value == undefined) {
        callback(new Error(i18n.t('errorMsg.pleaseEnterANumericValue')))
    }
};

export const validUnits=(formName,key,rule,value,callback)=>{
    // console.log(formName,key,rule,value,callback)
    if(value===''){
        return callback(new Error('单位不能为空'))
    }else if(regExpConfig.unitsReg.test(value)){
        //去掉单位
        let val=limit(value);  //拿到的数据就是类似于[0,'B']
        let handleUnit={
            [val[1]]:()=>{
                let num=dislodgeLetter(value)
                let result=humanLimitSize(num*Math.pow(1024, val[0]))
                formName[key]=num<1024 ? `${num}${val[1]}`:result
                return callback()
            }
        }
        handleUnit[val[1]]()
        
    }else if(regExpConfig.numReg.test(value)){
        formName[key]=humanLimitSize(value);
        return callback()
    }else{
        return callback(new Error('请输入有效单位'))
    }
}
