import { createRouter, createWebHashHistory } from "vue-router";

// 1. 从其他文件导入路由组件.
import MainLayout from "~/layouts/MainLayout.vue";
import Login from "~/pages/login.vue";
import NotFound from "~/pages/404.vue";
import Loading from "~/pages/loading.vue";
const modules = import.meta.glob("~/pages/**/*.vue");

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 默认路由，所有用户共享
const routes = [
  {
    path: "/",
    name: "layout",
    component: MainLayout,
    //子路由
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/loading",
    component: Loading,
    meta: {
      title: "系统初始化",
    },
  },
  {
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

//动态路由，用于匹配菜单动态添加路由

// 3. 创建路由实例并传递 `routes` 配置
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

// 动态添加路由的方法
export function addRoutes(menus) {
  //是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (array, parentMenuIndex = -1) => {
    array.forEach((element, index) => {
      let item;
      if (element.frontpath) {
        let componentName = element.frontpath;
        if (componentName.endsWith("/")) {
          componentName += "index";
        }
        item = {
          path: element.frontpath,
          name: element.frontpath,
          component: modules[`/src/pages${componentName}.vue`],
          meta: {
            title: element.name,
            icon: element.icon,
            bigMenuIndex: [],
          },
        };
      }

      if (item && !router.hasRoute(item.path)) {
        //嵌套子路由，将路由嵌套在name为layout的child下面
        if (!item.meta.bigMenuIndex) {
          item.meta.bigMenuIndex = [];
        }
        item.meta.bigMenuIndex.push(parentMenuIndex);
        router.addRoute("layout", item);
        hasNewRoutes = true;
      }
      //挂载路由的child
      if (element.child && element.child.length > 0) {
        //递归
        findAndAddRoutesByMenus(element.child, index);
      }
    });
  };
  findAndAddRoutesByMenus(menus);
  console.log(router.getRoutes());
  return hasNewRoutes;
}
