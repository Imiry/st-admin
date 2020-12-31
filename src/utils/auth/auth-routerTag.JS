/*
 * @Author: sitao
 * @Date: 2020-12-28 18:01:26
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-30 13:32:54
 */

let sessionStorage = window.sessionStorage;

let getRouterTag = key => {
  return JSON.parse(sessionStorage.getItem(key))
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