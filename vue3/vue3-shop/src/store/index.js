// 1.Vuex是专门为Vue设计的状态管理库，集中管理所有组件的状态。并与相应的规则保证状态以一种可预测的方式发生变化。
// 2.Vuex解决了多个组件共享状态时，传参方式繁琐，代码维护困难的问题。
// 1.Vuex的入口是store，store是Vuex核心概念，像一个容器仓库集中管理了所有组件的state。
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
    };
  },
  mutations: {
    //通过mutations改变state中的属性，然后需要通过commit('SET_USERINFO')来调用
    //记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
  },
});

export default store;
