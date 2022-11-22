import axios from "~/axios";

export function getRoleList({ currentPage = 1, limit = 10 }) {
  return axios.get(`/admin/role/${currentPage}?limit=${limit}`);
}

export function createRole(data) {
  return axios.post(`/admin/role`, data);
}

export function updateRole(id, data) {
  return axios.post(`/admin/role/${id}`, data);
}

export function deleteRole(id) {
  return axios.post(`/admin/role/${id}/delete`);
}

//修改角色状态
export function updateRoleStatus(id, status) {
  return axios.post(`/admin/role/${id}/update_status`, { status });
}

export function setRoleRules(id, rule_ids) {
  return axios.post(`/admin/role/set_rules`, { id, rule_ids });
}
