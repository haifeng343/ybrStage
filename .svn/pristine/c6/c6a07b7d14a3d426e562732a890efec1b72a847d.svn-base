import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {   //要设置的全局访问的state对象
  userInfo: {},//用户信息
  token: null,//用户的token
  permission: [],//用户按钮权限管理
  // user: {
  //   lockPassword: localStorage.getItem('lockPassword') || '',//锁屏密码
  //   isLock: localStorage.getItem('isLock') || false,//是否锁屏
  // }
};

// 异步
const actions = {
  setName (context, str) {
    context.commit("name", str);
  },
  SET_PERMISSION (context, permission) {
    // 提交到 mutation 中的 SET_PERMISSION 函数
    context.commit("SET_PERMISSION", permission);
  }
}

const mutations = {   //实时监听state值的变化(最新状态)
  setUserInfo (state, userInfo) {  //方法名随意,主要是来承载变化的userInfo的值
    localStorage.setItem("userInfo", userInfo);
    state.userInfo = userInfo
  },
  SET_PERMISSION (state, permission) {//permission 为传入的权限标识集合
    // 传入的权限集合 赋值给状态中的 permission
    state.permission = permission;
  },

};
const store = new Vuex.Store({
  state,
  mutations,
  actions
});
export default store;