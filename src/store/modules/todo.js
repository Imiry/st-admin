/*
 * @Author: sitao
 * @Date: 2020-12-23 14:00:05
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-23 15:58:24
 */
const todo = {
  state:{
    todoData:[
      {  name:'admin',dec:'this is admin',complateStatus:true },
      {  name:'home',dec:'this is home' ,complateStatus:true},
      {  name:'much',dec:'this is much' ,complateStatus:false},
      {  name:'many',dec:'this is many' ,complateStatus:true},
    ]
  },
  mutations:{
    ADD_TODO(state,data){
      state.todoData.push(data)
    },
    DELETE_TODO(state,id){
      state.todoData.splice(id,1)
      // console.log(id)
    }
  },
  actions:{
    addtodoAction({ commit }, data){
      // console.log(data)
      commit('ADD_TODO',data)
    },
    deleteAction({commit},id){
      commit('DELETE_TODO',id)
    }
  }
}
export default todo