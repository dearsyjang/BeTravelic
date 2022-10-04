import React, { useLayoutEffect, useState } from "react";
import "../css/MyPageCard.css";
import FrequentPlace from "./FrequentPlace";
import UploadPhoto from "./UploadPhoto";
import TripStyle from "./TripStyle";
import UserInfo from "./UserInfo";
import { fetchUserInfo, userInfoType } from "../../apis/mypage";
import { userInfo } from "os";
import KakaoShare from "../common/KakaoShare";

const MyPageCard = () => {
  const [userInfos, setUserInfo] = useState<userInfoType>({
    followerCnt: 0,
    followingCnt: 0,
    surveyKeyword: [],
    reviewCnt: 0,
    user_id: 0,
  });

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await fetchUserInfo();
      const { followerCnt, followingCnt, reviewCnt, surveyKeyword, user_id } =
        res;
      setUserInfo({
        followerCnt,
        followingCnt,
        reviewCnt,
        surveyKeyword,
        user_id,
      });
    };
    initialData();
  }, []);

  return (
    <div className="cardContainer" id="">
      <div>
        <UploadPhoto userId={userInfos.user_id} type="avatar" />
      </div>
      <div className="mt-10">
        <UserInfo userInfos={userInfos} />
      </div>
      <div className="mt-5">
        <TripStyle tripStyles={userInfos.surveyKeyword} />
      </div>
      <div className="mt-5">
        <FrequentPlace />
      </div>
    </div>
  );
};

export default MyPageCard;
