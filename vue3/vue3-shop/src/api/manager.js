import axios from "~/axios";

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

//管理员列表
export function getManagerList(currentPage = 1, query = {}) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  // limit=10&keyword=abc
  let r = q.join("&");
  r = r ? "?" + r : "";
  return axios.get(`/admin/manager/${currentPage}${r}`);
}

//修改管理员状态
export function updateManagerStatus(id, status) {
  return axios.post(`/admin/manager/${id}/update_status`, { status });
}

//新增管理员
export function createManager(data) {
  return axios.post(`/admin/manager`, data);
}

//修改管理员
export function updateManager(id, data) {
  return axios.post(`/admin/manager/${id}`, data);
}

//删除管理员
export function deleteManager(id) {
  return axios.post(`/admin/manager/${id}/delete`);
}
