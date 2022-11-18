import axios from "~/axios";

export function getImageList({ id, currentPage = 1, limit = 10 }) {
  return axios.get(`/admin/image_class/${id}/image/${currentPage}?limit=${limit}`);
}

