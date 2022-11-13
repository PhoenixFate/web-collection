// 1.Vuex是专门为Vue设计的状态管理库，集中管理所有组件的状态。并与相应的规则保证状态以一种可预测的方式发生变化。
// 2.Vuex解决了多个组件共享状态时，传参方式繁琐，代码维护困难的问题。
// 1.Vuex的入口是store，store是Vuex核心概念，像一个容器仓库集中管理了所有组件的state。
import { createStore } from "vuex";
import { getUserInfo, login, logout } from "~/api/manager";
import { setToken, removeToken } from "~/composables/auth";
import { removeTabList, removeBigMenuIndex } from "~/composables/storage.js";

const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
      //是否折叠
      isCollapse: false,
      //侧边菜单宽度
      asideWidth: "400px",
      //所有菜单列表
      menus: [],
      //权限列表
      ruleNames: [],
      //菜单动画相关index，本来是不需要放在vuex中的，但切换路由重新加载动画，需要放在vuex中更新
      leftMenuAnimationFlag: false,
      //最左侧菜单当前选中的index
      bigMenuIndex: 0,
      //最左侧菜单上一次选中的index，用于切换动画
      bigMenuLastIndex: -1,
      //中间菜单的nextCard对应的index
      middleNextIndex: -1,
      //中间菜单的第三card对应的index
      middleThirdIndex: -1,
      //中间菜单的最后一个card对应的index，只有初始化的不加载动画用的，其他没用
      middleLastIndex: -1,
      //中间菜单滑出去的动画对应的card的index
      middleOutIndex: -1,
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
      state.asideWidth = state.asideWidth == "400px" ? "152px" : "400px";
    },
    COLLAPSE_MENU(state) {
      // if (state.isCollapse) {
      //   //展开的时候，card的middleOutIndex变为-1，否则会抖动一下，难受
      //   state.middleLastIndex = state.middleOutIndex;
      //   state.middleOutIndex = -1;
      // }
      state.isCollapse = !state.isCollapse;
    },
    SET_MENUS(state, menus) {
      state.menus = menus;
    },
    SET_RULENAMES(state, ruleNames) {
      state.ruleNames = ruleNames;
    },
    SET_LEFT_MENU_ANIMATION_FLAG(state, flag) {
      state.leftMenuAnimationFlag = flag;
    },
    SET_BIG_MENU_INDEX(state, index) {
      state.bigMenuIndex = index;
    },
    SET_BIG_MENU_LAST_INDEX(state, index) {
      state.bigMenuLastIndex = index;
    },
    SET_MIDDLE_NEXT_INDEX(state, index) {
      state.middleNextIndex = index;
    },
    SET_MIDDLE_THIRD_INDEX(state, index) {
      state.middleThirdIndex = index;
    },
    SET_MIDDLE_LAST_INDEX(state, index) {
      state.middleLastIndex = index;
    },
    SET_MIDDLE_OUT_INDEX(state, index) {
      state.middleOutIndex = index;
    },
    CLEAR_ALL(state) {
      state.user = {};
      state.isCollapse = false;
      state.asideWidth = "400px";
      state.menus = [];
      state.ruleNames = [];
      state.leftMenuAnimationFlag = false;
      state.bigMenuIndex = 0;
      state.bigMenuLastIndex = -1;
      state.middleNextIndex = -1;
      state.middleThirdIndex = -1;
      state.middleLastIndex = -1;
      state.middleOutIndex = -1;
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
            commit("SET_MENUS", response.menus);
            commit("SET_RULENAMES", response.ruleNames);
            console.log(response);
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
            //清除localStorage中的所有缓存数据
            removeTabList();
            removeBigMenuIndex();
            //清楚当前用户状: 清除vuex.state中的user
            //清除vuex中的所有内容
            commit("CLEAR_ALL");
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
