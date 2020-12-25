

/*
 * @Author: sitao
 * @Date: 2020-12-25 12:28:36
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-25 14:45:25
 * 
 *  @getUserToken 获取用户token
 *  @setUserToken 设置用户token
 *  @removeUserToken 删除用户token
 */

let sessionStorage = window.sessionStorage;

let getUserToken = key => {
  return sessionStorage.getItem(key)
}

let setUserToken = (key, value) => {
  return sessionStorage.setItem(key, value);
};
let removeUserToken = key => {
  return sessionStorage.removeItem(key);
};

module.exports = {
  getUserToken,
  setUserToken,
  removeUserToken
};