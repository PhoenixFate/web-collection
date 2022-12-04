import { fileURLToPath, URL } from "node:url"; //这个需要node16+
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 集成windicss
import WindiCSS from "vite-plugin-windicss";
// vite配置 vue3中怎么使用svg图标
// npm i vite-plugin-svg-icons -D
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// node.js内置模块path
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    port: 5100, //指定端口号
    host: "0.0.0.0", //不加只能用本机ip访问Network: use --host to expose
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
