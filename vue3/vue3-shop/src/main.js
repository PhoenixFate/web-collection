import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
const app = createApp(App);

// 集成element-plus  --start
// npm install element-plus --save
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);
// 集成element-plus  --end

//集成windicss  --start
import "virtual:windi.css";
//集成windicss  -end

//集成vue-router  --start
import {router} from "./router";
app.use(router);
//通过调用 app.use(router)，我们可以在任意组件中以 this.$router 的形式访问它，并且以 this.$route 的形式访问当前路由
// this.$route.params.username
// this.$router.push('/login')
// 要在 setup 函数中访问路由，请调用 useRouter 或 useRoute 函数
//集成vue-router  --end

// 集成element-plus-icon  --start
// npm install @element-plus/icons-vue
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 集成element-plus-icon  --end

// 集成vuex  --start
// npm install vuex@next --save
import store from "./store";
app.use(store);
// 集成vuex  --start

import "./permission";

// 集成第三方顶部进度条
import "nprogress/nprogress.css";

// 滑动验证码

import permission from "~/directives/permission.js"
app.use(permission)


app.mount("#app");
