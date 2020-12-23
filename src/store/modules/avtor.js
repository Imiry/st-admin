/*
 * @Author: sitao
 * @Date: 2020-12-23 17:58:54
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-23 18:00:48
 */
const avtor = {
  state:{
    url:''
  },
  mutations:{
    ADD_ADMIN(state,data){
      state.adminInfo.push(data)
    }
  },
  actions:{
    addadminAction({ commit }, data){
      console.log(data)
      commit('ADD_ADMIN',data)
    }
  }
}
export default avtor
