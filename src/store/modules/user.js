/*
 * @Author: sitao
 * @Date: 2020-12-23 17:58:54
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-24 16:04:07
 */
const user = {
  state:{
    avtorPath:'',
    userInfo:{
      name:'st',
      sex:'男',
      password:'123456.',
      email:'123456@163.com',
      chat:'st123456',
      synopsis:'hello my boy!'
    }
  },
  mutations:{
    CHANGE_PATH(state,data){
      state.avtorPath = data
    },
    CHANGE_USERINFO(state,data){
      state.userInfo = data
    }
  },
  actions:{
    usersettingAction({ commit }, data){
      commit('CHANGE_PATH',data)
    },
    userinfoAction({ commit }, data){
      commit('CHANGE_USERINFO',data)
    }
  }
}
export default user
