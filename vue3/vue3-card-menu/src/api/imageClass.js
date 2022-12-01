import axios from "@/axios"

export function getImageClassList({currentPage=1,limit=10}){
    return axios.get(`/admin/image_class/${currentPage}?limit=${limit}`)
}