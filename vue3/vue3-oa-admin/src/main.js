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

app.mount("#app");
