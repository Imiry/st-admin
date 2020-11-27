// 常用的正则规则
export const regExpConfig = {
  singlePwdValidateLowerCase830: /^[a-z]{8,30}$/, // 匹配8~30个字符 小写字母
  singlePwdValidateUpperCase830: /^[A-Z]{8,30}$/, // 匹配8~30个字符 大写字母
  singlePwdValidateNum830: /^[0-9]{8,30}$/, // 匹配8~30个字符 数字
  singlePwdValidateSpecial830: /^[~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个 特殊字符

  doublePwdValidateLowerUpperCase830: /^(?![a-z]+$)[a-zA-Z]{8,30}$/, // 匹配8~30个字符 大小写字母
  doublePwdValidateUpperCaseNum830: /^(?![0-9]+$)[A-Z0-9]{8,30}$/, // 匹配8~30个字符 大写字母+数字
  doublePwdValidateLowerCaseNum830: /^(?![0-9]+$)[a-z0-9]{8,30}$/, // 匹配8~30个字符 小写字母+数字
  doublePwdValidateLowerCaseSpecial830: /^(?![a-z]+$)[a-z~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 小写字母+特殊符号
  doublePwdValidateUpperCaseSpecial830: /^(?![A-Z]+$)[A-Z~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 大写字母+特殊符号
  doublePwdValidateNumSpecial830: /^(?![0-9]+$)[0-9~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 数字+特殊符号

  threePwdValidateLowerUpperCaseNum830: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,30}$/, // 匹配8~30个字符 大小写字母+数字
  threePwdValidateLowerUpperCaseSpecial830: /^(?![a-zA-Z]+$)[a-zA-Z~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 大小字母+特殊符号
  threePwdValidateUpperCaseNumSpecial830: /^(?![0-9A-Z]+$)[A-Z0-9~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 大写字母+特殊符号+数字
  threePwdValidateLowerCaseNumSpecial830: /^(?![0-9a-z]+$)[a-z0-9~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 小写字母+特殊符号+数字

  fullPwdValidateLowerUpperCaseNumSpecial830: /^(?![0-9a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*?_-]{8,30}$/, // 匹配8~30个字符 大小字母+特殊符号+数字

  singlePwdValidateLowerCase610: /^[a-z]{6,10}$/, // 匹配6~10个字符 小写字母
  singlePwdValidateUpperCase610: /^[A-Z]{6,10}$/, // 匹配6~10个字符 大写字母
  singlePwdValidateNum610: /^[0-9]{6,10}$/, // 匹配6~10个字符 数字
  singlePwdValidateSpecial610: /^[~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个 特殊字符

  doublePwdValidateLowerUpperCase610: /^(?![a-z]+$)[a-zA-Z]{6,10}$/, // 匹配6~10个字符 大小写字母
  doublePwdValidateUpperCaseNum610: /^(?![0-9]+$)[A-Z0-9]{6,10}$/, // 匹配6~10个字符 大写字母+数字
  doublePwdValidateLowerCaseNum610: /^(?![0-9]+$)[a-z0-9]{6,10}$/, // 匹配6~10个字符 小写字母+数字
  doublePwdValidateLowerCaseSpecial610: /^(?![a-z]+$)[a-z~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 小写字母+特殊符号
  doublePwdValidateUpperCaseSpecial610: /^(?![A-Z]+$)[A-Z~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 大写字母+特殊符号
  doublePwdValidateNumSpecial610: /^(?![0-9]+$)[0-9~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 数字+特殊符号

  threePwdValidateLowerUpperCaseNum610: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,10}$/, // 匹配6~10个字符 大小写字母+数字
  threePwdValidateLowerUpperCaseSpecial610: /^(?![a-zA-Z]+$)[a-zA-Z~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 大小字母+特殊符号
  threePwdValidateUpperCaseNumSpecial610: /^(?![0-9A-Z]+$)[A-Z0-9~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 大写字母+特殊符号+数字
  threePwdValidateLowerCaseNumSpecial610: /^(?![0-9a-z]+$)[a-z0-9~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 小写字母+特殊符号+数字

  fullPwdValidateLowerUpperCaseNumSpecial610: /^(?![0-9a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*?_-]{6,10}$/, // 匹配6~10个字符 大小字母+特殊符号+数字

  emailRegex: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, // 邮箱
  phoneRegex: /^1[34578]\d{9}$/, // 联系方式
  rangeRegex: new RegExp(/^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([0-9]|[1-2]\d|3[0-2])$/), //1~255/0~32
  networkRegex: new RegExp(/^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([0-9]|[1-2]\d|3[0-2])$/), // network网段验证
  netmaskRegex: RegExp(/^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/), // netmask 1-255
  ipAddressRegex: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/, //  0.0.0.0~255.255.255.255
  dhcpRegex: /^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\,)(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/, // 192.168.2.10,192.168.2.20(0-255)
  portRegex: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/, // port端口号
  targetRegex: /^((iqn)(\.)(\d{4}-((0[1-9])|(1(0|1|2))))(\.)(.*?))$/, // target验证
}