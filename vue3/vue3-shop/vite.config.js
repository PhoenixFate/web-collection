import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 集成windicss
import WindiCSS from "vite-plugin-windicss";
// node.js内置模块path
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    // 为文件系统路径取别名
    alias:{
      // __dirname当前文件所在的目录的绝对路径，
      // 把当前工程的绝对路径/src 指定为别名～
      "~":path.resolve(__dirname,"src")
    }
  },
  plugins: [vue(), WindiCSS()],
});
