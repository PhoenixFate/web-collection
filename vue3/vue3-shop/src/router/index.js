import { createRouter, createWebHashHistory } from "vue-router";

// 1. 从其他文件导入路由组件.
import Index from "~/pages/index.vue";
import About from "~/pages/about.vue";
import Login from "~/pages/login.vue";
import Cookie from "~/pages/cookie.vue";
import Test from "~/pages/test.vue";
import NotFound from "~/pages/404.vue";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/cookie",
    component: Cookie,
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
