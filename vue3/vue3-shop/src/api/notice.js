import axios from "~/axios";

export function getNoticeList({ currentPage = 1, limit = 10 }) {
  return axios.get(`/admin/notice/${currentPage}?limit=${limit}`);
}

export function createNotice({ title, content }) {
  return axios.post(`/admin/notice`, { title, content });
}

export function updateNotice(id, { title, content }) {
  return axios.post(`/admin/notice/${id}`, { title, content });
}

export function deleteNotice(id) {
  return axios.post(`/admin/notice/${id}/delete`);
}
