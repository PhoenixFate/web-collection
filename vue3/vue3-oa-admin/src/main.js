import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
const app = createApp(App);

//集成vue-router
import { router } from "./router";
app.use(router);

// 集成vuex  --start
// npm install vuex@next --save
import store from "./store";
app.use(store);
// 集成vuex  --start

// 集成element-plus  --start
// npm install element-plus --save
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);
// 集成element-plus  --end

// 集成element-plus-icon  --start
// npm install @element-plus/icons-vue
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 集成element-plus-icon  --end

// 集成第三方顶部进度条
import "nprogress/nprogress.css";

//集成windicss  --start
import "virtual:windi.css";
//集成windicss  -end

import "./permission";

//animate.css
import animated from 'animate.css'
app.use(animated)

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
app.mount("#app");
