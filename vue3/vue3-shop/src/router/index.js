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
import CategoryList from "~/pages/category/list.vue";
import UserList from "~/pages/user/list.vue";
import OrderList from "~/pages/order/list.vue";
import CommentList from "~/pages/comment/list.vue";
import ImageList from "~/pages/image/list.vue";
import NoticeList from "~/pages/notice/list.vue";
import SettingBase from "~/pages/setting/base.vue";
import CouponList from "~/pages/coupon/list.vue";
import ManagerList from "~/pages/manager/list.vue";
import AccessList from "~/pages/access/list.vue";
import RoleList from "~/pages/role/list.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// const routes = [
//   {
//     path: "/",
//     name: "layout",
//     component: MainLayout,
//     //子路由
//     children: [
//       {
//         path: "/",
//         component: Index,
//         meta: {
//           title: "后台首页",
//         },
//       },
//       {
//         path: "/goods/list",
//         component: GoodList,
//         meta: {
//           title: "商品管理",
//         },
//       },
//       {
//         path: "/category/list",
//         component: CategoryList,
//         meta: {
//           title: "分类管理",
//         },
//       },
//     ],
//   },
//   {
//     path: "/about",
//     component: About,
//     meta: {
//       title: "项目详情页面",
//     },
//   },
//   {
//     path: "/login",
//     component: Login,
//     meta: {
//       title: "登录页",
//     },
//   },
//   {
//     path: "/test",
//     component: Test,
//     meta: {
//       title: "测试页",
//     },
//   },
//   {
//     path: "/cookie",
//     component: Cookie,
//     meta: {
//       title: "cookie测试页",
//     },
//   },
//   {
//     // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
//     path: "/:pathMatch(.*)*",
//     component: NotFound,
//   },
// ];

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
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

//动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: "/",
    name: "/",
    component: Index,
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: GoodList,
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: CategoryList,
    meta: {
      title: "分类列表",
    },
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: UserList,
    meta: {
      title: "用户列表",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: OrderList,
    meta: {
      title: "订单列表",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: CommentList,
    meta: {
      title: "评价列表",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: ImageList,
    meta: {
      title: "图库列表",
    },
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: NoticeList,
    meta: {
      title: "公告列表",
    },
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: SettingBase,
    meta: {
      title: "配置",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: CouponList,
    meta: {
      title: "优惠券列表",
    },
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: ManagerList,
    meta: {
      title: "管理员管理",
    },
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: AccessList,
    meta: {
      title: "菜单权限管理",
    },
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: RoleList,
    meta: {
      title: "角色管理",
    },
  },
];

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
  const findAndAddRoutesByMenus = (array) => {
    array.forEach((element) => {
      let item = asyncRoutes.find((o) => o.path == element.frontpath);
      if (item && !router.hasRoute(item.path)) {
        //嵌套子路由，将路由嵌套在name为layout的child下面
        item.meta.icon = element.icon;
        router.addRoute("layout", item);
        hasNewRoutes = true;
      }
      //挂载路由的child
      if (element.child && element.child.length > 0) {
        //递归
        findAndAddRoutesByMenus(element.child);
      }
    });
  };
  findAndAddRoutesByMenus(menus);
  console.log(router.getRoutes());
  return hasNewRoutes;
}
