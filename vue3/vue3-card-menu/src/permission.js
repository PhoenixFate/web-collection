import { router, addRoutes } from "~/router";
import { getToken } from "~/composables/auth";
import {
  showMessage,
  showFullScreenLoading,
  hideFullScreenLoading,
} from "~/composables/util";
import store from "./store";

// 你可以使用 router.beforeEach 注册一个全局前置守卫：
router.beforeEach(async (to, from, next) => {
  // to: 即将要进入的目标 用一种标准化的方式
  // from: 当前导航正要离开的路由 用一种标准化的方式
  // 如果传了next参数，则一定要调用next(),并确保next()只被调用一次
  // 当需要从‘from’跳转至‘to’时，路由守卫会监控到这一举动，若不执行next()，则相当于没有放行，会依然留在from对应的路由。只有当执行了next()之后，才会进行跳转。
  console.log("全局前置守卫");
  console.log(to);
  console.log(from);

  //显示全屏加载的loading
  showFullScreenLoading();

  const token = getToken();
  //没有登录，强制跳转回登录页
  if (!token && to.path != "/login") {
    if (from.path && from.path != "/") {
      showMessage("请先登录", "error");
    }
    return next({ path: "/login" });
  }
  //防止重复登录
  if (token && to.path == "/login") {
    showMessage("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }

  //如果用户登录了，就自动获取用户信息，并存储在vuex中
  let hasNewRoutes = false;
  if (token && JSON.stringify(store.state.user) == "{}") {
    console.log("该user对象为空");
    //通过store.dispatch调用store中的actions里面的方法
    //store中定义的getUserInfoAction是一个promise，是一个异步操作，需要await同步等待一下
    let { menus } = await store.dispatch("getUserInfoAction");
    console.log(menus);
    //动态添加路由
    hasNewRoutes = addRoutes(menus);
  }

  //设置页面的标题（title）
  let title = (to.meta.title ? to.meta.title : "") + "  OA办公";
  document.title = title;
  hasNewRoutes ? next(to.fullPath) : next();
});

//全局后置守卫
router.afterEach((to, from) => {
  //隐藏顶部全屏加载的loading
  hideFullScreenLoading();
});
