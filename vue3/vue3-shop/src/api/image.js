import axios from "~/axios";

export function getImageList({ id, currentPage = 1, limit = 10 }) {
  return axios.get(
    `/admin/image_class/${id}/image/${currentPage}?limit=${limit}`
  );
}

export function updateImage(id, name) {
  return axios.post(`/admin/image/${id}`, { name });
}

export function deleteImage(ids) {
  return axios.post(`/admin/image/delete_all`, { ids });
}

export const uploadImageAction = "/api/admin/image/upload";
