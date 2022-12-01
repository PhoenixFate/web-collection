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
import { router } from "./router";
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

// 自定义权限标识
import permission from "@/directives/permission.js";
app.use(permission);

// pc 自适应
import "./util/rem.js";

// vite项目使用全局svg
import "virtual:svg-icons-register";
import svgIcon from "@/components/svgIcon/index.vue";
app.component("svg-icon", svgIcon);

//全局过滤器
//vue3配置全局过滤器
app.config.globalProperties.$filters = {
  //字符串不足两位，在前面添加0
  padTwoZero(time) {
    time = time + ""; //转成字符串
    return ("00" + time).slice(time.length);
  },
};

//animate.css
import animated from 'animate.css'
app.use(animated)

app.mount("#app");
