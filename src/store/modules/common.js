/**
 * home.js
 * 用于home模块的状态管理
 */
/* eslint-disable */
import * as types from '../mutation-type'  // 引入定义的方法
const common = {
  state: {
    province:'',
  },
  mutations: {
    [types.SET_PROVINCE](state, province) {   // 修改state 可通过mapMutations调用
      state.province = province
    }
  },
  actions: {},
  getters: {           
   
  }
}
export default common   
