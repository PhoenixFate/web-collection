import { createRouter, createWebHashHistory } from "vue-router";

// 1. 从其他文件导入路由组件.
import MainLayout from "~/layouts/MainLayout.vue";
import Index from "~/pages/index.vue";
import About from "~/pages/about.vue";
import Login from "~/pages/login.vue";
import Cookie from "~/pages/cookie.vue";
import Test from "~/pages/test.vue";
import NotFound from "~/pages/404.vue";
import GoodList from "~/pages/goods/list.vue";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  {
    path: "/",
    component: MainLayout,
    //子路由
    children: [
      {
        path: "/",
        component: Index,
        meta: {
          title: "后台首页",
        },
      },
      {
        path: "/goods/list",
        component: GoodList,
        meta: {
          title: "商品管理",
        },
      },
    ],
  },
  {
    path: "/about",
    component: About,
    meta: {
      title: "项目详情页面",
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/test",
    component: Test,
    meta: {
      title: "测试页",
    },
  },
  {
    path: "/cookie",
    component: Cookie,
    meta: {
      title: "cookie测试页",
    },
  },
  {
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
