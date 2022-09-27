import axios from "./index";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "http://localhost:3000/kakao";

export const login = async () => {
  try {
    const res = await axios({
      method: "get",
      // url:,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
