import axios from "axios";

const baseURL = "http://localhost:8088"

// 获取文章列表
export function getBlogList(currentPage) {
    return axios.get(`${baseURL}/blogs?currentPage=${currentPage}`)
}

// 获取文章信息
export function BlogDetail(blogId) {
    return axios.get(`${baseURL}/blog/${blogId}`)
}

// 获取作者信息
export function getAuthorInfo(userId) {
    return axios.post(`${baseURL}/user/userId/${userId}`)
}



