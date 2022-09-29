// 임시 base url
import axios, { AxiosInstance } from "axios";

const AUTH_TOKEN = "";

export const springAxios: AxiosInstance = axios.create({
  // base url 설정
  baseURL: "http://j7d205.p.ssafy.io:8443",
  // cors
  withCredentials: true,
});

export const djangoAxios: AxiosInstance = axios.create({
  baseURL: "http://j7d205.pssafy.io:8081",
  withCredentials: true,
});

// AUTH_TOKEN 설정

djangoAxios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
springAxios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
