import axios from "@/axios";

// 用户相关接口

// 通过export对外暴露一个方法
export function login({ username, password }) {
  //axios的请求返回一个Promise，可以直接返回Promise
  return axios.post("/admin/login", {
    username,
    password,
  });
}

// 登录之后根据token获取用户信息
export function getUserInfo() {
  return axios.post("/admin/getinfo");
}

// 退出登录
export function logout() {
  return axios.post("/admin/logout");
}

// 更改密码
export function updatePassword({ oldPassword, newPassword, checkNewPassword }) {
  return axios.post("/admin/updatepassword", {
    oldpassword: oldPassword,
    password: newPassword,
    repassword: checkNewPassword,
  });
}
