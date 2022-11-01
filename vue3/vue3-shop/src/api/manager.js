import axios from "~/axios";

// 通过export对外暴露一个方法
export function login({ username, password }) {
  //axios的请求返回一个Promise，可以直接返回Promise
  return axios.post("/admin/login", {
    username,
    password,
  });
}

export function getUserInfo() {
  return axios.post("/admin/getinfo");
}

export function logout() {
  return axios.post("/admin/logout");
}

export function updatePassword({ oldPassword, newPassword, checkNewPassword }) {
  return axios.post("/admin/updatepassword", {
    oldpassword: oldPassword,
    password: newPassword,
    repassword: checkNewPassword,
  });
}
