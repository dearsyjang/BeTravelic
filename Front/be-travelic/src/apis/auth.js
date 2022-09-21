import { BASE_URL } from "./index";
import axios from "axios";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "http://localhost:3000/kakao";

export const login = async () => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  try {
    const res = await axios({
      method: "get",
      url: url,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
