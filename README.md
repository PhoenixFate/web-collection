# 前端技术合集

- vue2
- vue3
- vite

## npm

- 查看当前镜像

npm config get registry

- 切换国内镜像

npm config set registry=https://registry.npmmirror.com

## vite创建工程

快速创建

- npm create vite@latest

通过附加的命令行选项直接指定项目名称和你想要使用的模板

```
# npm 6.x
npm create vite@latest my-vue-app --template vue
# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue
```

## vue3创建工程（node.js>=16）

- npm init vue@latest

## vue3第三方组件
element-plus (element-plus.gitee.io)  
npm install element-plus --save

windicss  (www.windicss.org/cn.windicss.org)  
npm i -D vite-plugin-windicss windicss

vue-router (vue3需要vue-router4以上)  
npm install vue-router@4 --save 

axios
npm install axios --save

vueUse
npm i @vueuse/core --save
npm i @vueuse/integrations --save  
npm i universal-cookie --save  

vuex (vue3需要vuex4以上)
npm install vuex@next --save 

nprogress (顶部进度条)
npm install --save nprogress

## Visual Studio Code常用插件
- Vue Language Features (Volar)
- vue3-snippets
- WindiCSS IntelliSense
