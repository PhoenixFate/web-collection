import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 集成windicss
import WindiCSS from "vite-plugin-windicss";
// node.js内置模块path
import path from "path";
// vite配置 vue3中怎么使用svg图标
// npm i vite-plugin-svg-icons -D
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 为文件系统路径取别名
    alias: {
      // __dirname当前文件所在的目录的绝对路径，
      // 把当前工程的绝对路径/src 指定为别名@
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    port: 5000, //指定端口号
    host: '0.0.0.0', //不加只能用本机ip访问Network: use --host to expose
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

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

  //配置sass
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/global.scss";',
      },
    },
  },
});
