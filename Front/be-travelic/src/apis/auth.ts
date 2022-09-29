// import axios from "axios";
import jwt_decode from "jwt-decode";
import { AxiosError } from "axios";
import { djangoAxios, springAxios } from ".";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "http://localhost:3000/kakao";

interface Register {
  nickname?: string;
  image?: string;
  email: string;
  password: string;
}

const baseUrl = "http://j7d205.p.ssafy.io:8443";

export interface Winners {
  keyword_name: string[];
  category_ids: number[];
}

export const login = async (data: Register) => {
  const url = "/users/login";

  try {
    const res = await springAxios({
      method: "post",
      url,
      data,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data: Register) => {
  console.log("회원가입요청");

  const url = "/users";

  try {
    const res = await springAxios({
      method: "post",
      url,
      data,
    });

    console.log(res.data);

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
    console.log("에러?");
  }
};

export const getMemberId = async () => {
  const jwt = localStorage.getItem("token")!;
  const decodedJwt: any = jwt_decode(jwt);
  const memberId = decodedJwt?.memberId;
  return memberId;
};

export const fetchSurvey = async (data: Winners, userId: any) => {
  try {
    const res = await springAxios({
      method: "post",
      url: `/survey/${userId}`,
      data,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const refresh = async (refreshToken:string) => {
  // 추후 작성
}