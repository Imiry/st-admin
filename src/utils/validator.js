
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
}
