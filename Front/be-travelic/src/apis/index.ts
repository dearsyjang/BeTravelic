// 임시 base url
import axios, { AxiosInstance } from "axios";

const AUTH_TOKEN = ''

// export const instance: AxiosInstance = axios.create({
//   // base url 설정
//   baseURL: "http://j7d205.p.ssafy.io:8080",
//   // cors
//   withCredentials: true,
// });

// AUTH_TOKEN 설정

axios.defaults.baseURL = 'http://j7d205.p.ssafy.io:8080'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export default axios;