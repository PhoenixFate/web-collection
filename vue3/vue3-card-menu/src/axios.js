import axios from "axios";
import { getToken, removeToken } from "@/composables/auth";
import { showMessage } from "@/composables/utils";
import store from "./store";
const service = axios.create({
  baseURL: "/api",
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么

    // 在header头自动添加token
    const token = getToken();

    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error(error)
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    if(!response.data){
      showMessage("后台服务异常，可能正在重启，如果等待1-2分钟依然异常，请联系管理员", "error");
      return;
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
  },
  (error) => {
    console.error(error)
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const message = error.response.data.msg;
    if (message === "非法token，请先登录！") {
      console.log("非法token，请先登录！");
      //正常应该用返回到http状态码401，然后重新登录
      //移除cookie中的token
      removeToken();
      //清楚当前用户状: 清除vuex.state中的user
      store.commit("SET_USERINFO", {});
      //刷新页面，这时候已经没有token了，刷新页面的时候，会调用路由全局前置守卫，没有token又会跳转到登录页面
      setTimeout(()=>{
        location.reload();
      },1000)
    }

    showMessage(error.response.data.msg || "请求失败", "error");
    return Promise.reject(error);
  }
);

export default service;
