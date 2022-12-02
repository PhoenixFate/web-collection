// import { fileURLToPath, URL } from "node:url"; //这个需要node16+
// node.js内置模块path
import path from "path"; //这个不需要node16+

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 集成windicss
import WindiCSS from "vite-plugin-windicss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    port: 5100, //指定端口号
    host: '0.0.0.0', //不加只能用本机ip访问Network: use --host to expose
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  //配置sass
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/global.scss";',
      },
    },
  },
});
