/*
 * @Author: sitao
 * @Date: 2020-11-30 14:23:10
 * @LastEditors: sitao
 * @LastEditTime: 2020-11-30 17:17:43
 */
const i18n = {
  state: {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || true,
    language: sessionStorage.getItem('language') || 'zh',
  },
  mutations: {
    CHANGE_COLLAPSE(state,isCollapse){
      state.isCollapse = isCollapse;
    },
    CHANGE_LANGUAGE(state, language) {
      state.language = language;
    },
  },
  actions: {
    changeCollapse({ commit }, isCollapse){
      commit('CHANGE_COLLAPSE',isCollapse)
      sessionStorage.setItem('isCollapse', isCollapse)
    },
    changeLanguage({ commit }, language) {
      commit('CHANGE_LANGUAGE', language)
      sessionStorage.setItem('language', language);
    },
  }
}


export default i18n;