// 1.Vuex是专门为Vue设计的状态管理库，集中管理所有组件的状态。并与相应的规则保证状态以一种可预测的方式发生变化。
// 2.Vuex解决了多个组件共享状态时，传参方式繁琐，代码维护困难的问题。
// 1.Vuex的入口是store，store是Vuex核心概念，像一个容器仓库集中管理了所有组件的state。
import { createStore } from "vuex";
import { getUserInfo, login, logout } from "~/api/manager";
import { setToken, removeToken } from "~/composables/auth";

const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
      isCollapse: false,
      //侧边菜单宽度
      asideWidth: "250px",
    };
  },
  mutations: {
    //通过mutations改变state中的属性，然后需要通过commit('SET_USERINFO')来调用
    //记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    //展开或者缩起侧边菜单
    HANDLE_ASIDE_WIDTH(state) {
      state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px";
    },
    COLLAPSE_MENU(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
  actions: {
    //登录
    loginAction({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login({ username, password })
          .then((response) => {
            //登录成功，存储token
            setToken(response.token);

            //获取用户相关信息
            // getUserInfo().then(userInfo => {
            //   console.log(userInfo)
            //   //保存用户信息到vuex中
            //   store.commit("SET_USERINFO",userInfo)
            // })
            //获取用户信息放到store.actions中了 (因为会刷新页面，所以获取用户信息放在路由全局守卫中，如果有token，无用户，则获取用户)
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    //获取当前登录用户信息
    getUserInfoAction({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response) => {
            //保存用户信息到vuex中
            commit("SET_USERINFO", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    //退出登录
    logoutAction({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((response) => {
            //移除cookie中的token
            removeToken();
            //清楚当前用户状: 清除vuex.state中的user
            commit("SET_USERINFO", {});
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default store;
