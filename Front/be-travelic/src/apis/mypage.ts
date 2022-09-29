import { AxiosError } from "axios";
import { djangoAxios, springAxios } from "./index";

export interface Follow {
  image: string;
  userId: string;
  name: string;
}

export interface Region {
  userId?: string;
  regionId?: string;
}

export const fetchFollows = async (userId: string, followType: string) => {
  const url = `/follow/${followType}/${userId}`;

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
