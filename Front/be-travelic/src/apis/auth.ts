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
  pw: string;
  id?: string;
}

export interface Winners {
  keyword_name: string[];
  category_ids: number[];
}

export const login = async (data: Register) => {
  const url = "/users/login";

  const { email, pw } = data;
  const id = email;

  try {
    const res = await springAxios({
      method: "post",
      url,
      data: {
        id,
        pw,
      },
    });

    djangoAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.accessToken}`;
    springAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.accessToken}`;

    console.log(res, "response");
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data: Register) => {
  console.log("회원가입요청");
  console.log(data);

  const url = `/users`;

  try {
    const res = await springAxios({
      method: "post",
      url,
      data,
    });

    console.log(res.data.data);

    djangoAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.accessToken}`;
    springAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.accessToken}`;

    return res.data.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
    console.log(err);

    console.log("에러?");
  }
};

export const getMemberId = async (token: string) => {
  console.log(token);

  const decodedJwt: any = jwt_decode(token);
  console.log(decodedJwt);

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

export const refresh = async (refreshToken: string) => {
  // 추후 작성
};
