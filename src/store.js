import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {   //要设置的全局访问的state对象
  userInfo: {},//用户信息
  token: null,//用户的token
  // user: {
  //   lockPassword: window.localStorage.getItem('lockPassword') || '',//锁屏密码
  //   isLock: window.localStorage.getItem('isLock') || false,//是否锁屏
  // }
};

const mutations = {   //实时监听state值的变化(最新状态)
  getUserInfo (state) {  //方法名随意,主要是来承载变化的userInfo的值
    return state.userInfo
  },
};
const store = new Vuex.Store({
  state,
  mutations
});
export default store;