// 임시 base url
import axios, { AxiosInstance } from "axios";
import { refresh } from "./auth";

const AUTH_TOKEN = "";

export const springAxios: AxiosInstance = axios.create({
  // base url 설정
  baseURL: "http://j7d205.p.ssafy.io:8443",
  // cors
  // withCredentials: true,
});

export const djangoAxios: AxiosInstance = axios.create({
  baseURL: "http://j7d205.pssafy.io:8081",
  // withCredentials: true,
});


// AUTH_TOKEN 설정

// refresh

// let isTokenRefreshing = false;
// let refreshSubscribers = <any>[];

// const onTokenRefreshed = (accessToken: string) => {
//   refreshSubscribers.map((callback: any) => callback(accessToken));
//   refreshSubscribers = [];
// };

// const addRefreshSubscriber = (callback: any) => {
//   refreshSubscribers.push(callback);
// };

// springAxios.interceptors.response.use(
//   (response) => {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     try {
//       const originalRequest = config;
//       console.log(config);
//       console.log(status);

//       if (status === 0) {
//         return error.response;
//       }

//       // Prevent infinite loops
//       if (
//         error.response.status === 401 &&
//         originalRequest.url ===
//           "http://i7d203.p.ssafy.io:8080" + "/api/auth/issue"
//       ) {
//         return Promise.reject(error);
//       }

//       if (status === 500) {
//         return error.response;
//       }

//       if (status === 401) {
//         if (!isTokenRefreshing) {
//           console.log(status);
//           isTokenRefreshing = true;
//           const refreshToken = await localStorage.getItem("refresh");
//           const res = await refresh(refreshToken);
//           const newAccessToken = res.accessToken;
//           await localStorage.setItem("token", newAccessToken);

//           isTokenRefreshing = false;
//           axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//           onTokenRefreshed(newAccessToken);
//           // }
//           const retryOriginalRequest = new Promise((resolve) => {
//             addRefreshSubscriber((accessToken:any) => {
//               originalRequest.headers.Authorization = "Bearer " + accessToken;
//               resolve(axios(originalRequest));
//             });
//           });
//           console.log(retryOriginalRequest, "retry");
//           return retryOriginalRequest;
//         }
//       }
//     } catch (error) {
//       // console.log(error.response);
//     }
//     return Promise.reject(error);
//   }
// );
