import axios from "./index";
import jwt_decode from "jwt-decode";
import { AxiosError } from "axios";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "http://localhost:3000/kakao";

interface Register {
  nickname?: string;
  email: string;
  password: string;
}

export interface Winners {
  keyword_name: string[];
  category_ids: number[];
}

export const login = async (data: Register) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/login",
      data,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data: Register) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users",
      data,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
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
    const res = await axios({
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
