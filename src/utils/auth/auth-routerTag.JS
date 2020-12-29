/*
 * @Author: sitao
 * @Date: 2020-12-28 18:01:26
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-29 15:32:44
 */

let sessionStorage = window.sessionStorage;

let getRouterTag = key => {
  return sessionStorage.getItem(key)
}

let setRouterTag = (key, value) => {
  return sessionStorage.setItem(key, value);
};
let removeRouterTag = key => {
  return sessionStorage.removeItem(key);
};

module.exports = {
  getRouterTag,
  setRouterTag,
  removeRouterTag
};