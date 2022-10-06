import axios, { AxiosError } from "axios";
import { getMemberId } from "./auth";
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

export const fetchFollowList = async (followType: string, user_id: number) => {
  const url = `/follow/${followType}`;

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });

    console.log(res, "팔로우리스트", followType);

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

export const fetchAllVisitedPlaces = async (user_id: number) => {
  const url = `/mypage/travel-history/user`;

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const fetchRegionalVisitedPlaces = async (
  regionId: string,
  user_id: number
) => {
  const url = `/mypage/travel-history/region/${regionId}/user`;

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });
    console.log(res.data);

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const fetchAllBookMarks = async (user_id: number) => {
  const url = `/bookmark/user`;

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });
    console.log(res, "리저널북마크");

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const fetchRegionalBookMarks = async (
  regionId: string,
  user_id: number
) => {
  const url = `/bookmark/region/${regionId}/user`;

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const fetchUserInfo = async (user_id: number) => {
  const url = "users";

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });
    console.log("유저인포", res.data.data);

    return res.data.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const fetchMapPhoto = async (data: File, region_id: string) => {
  const url = "/mypage/uploadMyPicture";
  const formData = new FormData();
  formData.append("file", data);

  try {
    const res = await springAxios({
      method: "post",
      url,
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
      params: {
        region_id,
      },
    });

    console.log(res);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const deleteMapPhoto = async (region_id: string) => {
  const url = "/mypage/deleteMyPicture";

  try {
    const res = await springAxios({
      method: "delete",
      url,
      params: { region_id },
    });
    console.log(res);

    return res;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const getMapPothos = async (user_id: number) => {
  const url = "/mypage/downloadMyPicture";

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });
    console.log(res.data, "getmap");

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const fetchProfilePhoto = async (data: File, method: string) => {
  const path = method === "post" ? "upload" : "update";
  const url = "users/profile/";
  const formData = new FormData();
  formData.append("file", data);
  console.log(formData);

  try {
    const res = await springAxios({
      method,
      url: url + path,
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    });

    console.log(res);
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const downloadProfilePhoto = async (user_id: number) => {
  const url = "users/profile/download";

  try {
    const res = await springAxios({
      method: "get",
      url,
      params: { user_id },
    });
    console.log(res);

    return res;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const fetchFollow = async (follower_id: number, isFollow: boolean) => {
  const url = "follow";
  const method = isFollow ? "delete" : "post";

  try {
    const res = await springAxios({
      method,
      url,
      params: {
        follower_id,
      },
    });
    return res;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
    console.log(err);
  }
};

export const fetchIsFollowed = async (user_id: number) => {
  const url = `/follow/${user_id}`;

  try {
    const res = await springAxios({
      method: "get",
      url,
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};
