import { AxiosError } from "axios";
import axios from "./index";

export interface Follow {
  image: string;
  userId: number;
  name: string;
}

export const fetchFollows = async (userId: string, followType: string) => {
  const url = `/follow/${followType}/${userId}`;

  try {
    const res = await axios({
      method: "get",
      url,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};
