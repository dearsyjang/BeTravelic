import axios, { AxiosError } from "axios";
import { djangoAxios, springAxios } from "./index";

export interface Follow {
  follower_id?: string;
  following_id?: string;
  nickname: string;
}

export interface Region {
  userId?: string;
  regionId?: string;
}

export interface userInfoType {
  followerCnt?: number;
  followingCnt?: number;
  travelRecords?: number;
  reviewCnt?: number;
  surveyKeyword?: string[];
  user_id: number;
}

export const fetchFollowList = async (followType: string) => {
  const url = `/follow/${followType}`;

  try {
    const res = await springAxios({
      method: "get",
      url,
    });

    console.log(res, "팔로우리스트");

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const fetchAllVisitedPlaces = async (userId: string) => {
  const url = `/mypage/travel-history/user/${userId}`;

  try {
    const res = await springAxios({
      method: "get",
      url,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const fetchRegionalVisitedPlaces = async (
  regionId: string,
  userId: string
) => {
  const url = `/mypage/travel-history/region/${regionId}/user/${userId}`;

  try {
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const fetchAllBookMarks = async (userId: string) => {
  const url = `/bookmark/user/${userId}`;
  try {
    const res = await springAxios({
      method: "get",
      url,
    });

    return res.data;
  } catch (error) {}
};

export const fetchRegionalBookMarks = async ({ regionId, userId }: Region) => {
  const url = `/bookmark/region/${regionId}/user/${userId}`;

  try {
    const res = await springAxios({
      method: "get",
      url,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const fetchUserInfo = async () => {
  const url = "users";
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  try {
    const res = await springAxios({
      method: "get",
      url,
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    });
    console.log(res.data.data, "fetch userinfo");
    return res.data.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const fetchPorfilePhoto = async (data: File) => {
  // const url = "http://j7d205.p.ssafy.io:8443/users/profile/upload";
  const url = "users/profile/upload";
  const formData = new FormData();
  formData.append("File", data);
  console.log(data, "data");

  console.log(formData);

  const token = localStorage.getItem("accessToken")!;
  try {
    const res = await springAxios({
      method: "post",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const downloadProfilePhoto = async () => {
  const url = "users/profile/download";

  try {
    const res = await springAxios({
      method: "get",
      url,
    });

    return res

  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const fetchFollow = async (follower_id: string) => {
  const url = "follow";

  try {
    const res = await springAxios({
      method: "post",
      url,
      params: {
        follower_id,
      },
    });

    console.log(res);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};
