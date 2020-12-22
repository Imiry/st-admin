/*
 * @Author: sitao
 * @Date: 2020-12-22 14:13:13
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-22 14:57:01
 */
const admin = {
  state:{
    adminInfo:[]
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
export default admin