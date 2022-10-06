import React, { useLayoutEffect, useState } from "react";
import "../css/MyPageCard.css";
import FrequentPlace from "./FrequentPlace";
import UploadPhoto from "./UploadPhoto";
import TripStyle from "./TripStyle";
import UserInfo from "./UserInfo";
import { fetchUserInfo, userInfoType } from "../../apis/mypage";
import { userInfo } from "os";
import KakaoShare from "../common/KakaoShare";
import { useParams } from "react-router-dom";
import myhome from "../../assets/image/myhome.png";

const MyPageCard = () => {
  const { id } = useParams();

  const [userInfos, setUserInfo] = useState<userInfoType>({
    followerCnt: 0,
    followingCnt: 0,
    surveyKeyword: [],
    reviewCnt: 0,
    user_id: Number(id),
    nickname: "",
  });

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await fetchUserInfo(userInfos.user_id);
      const {
        followerCnt,
        followingCnt,
        reviewCnt,
        surveyKeyword,
        user_id,
        nickname,
      } = res;
      console.log(res, "여기는 마이페이지 카드");

      setUserInfo({
        followerCnt,
        followingCnt,
        reviewCnt,
        surveyKeyword,
        user_id,
        nickname,
      });
    };
    initialData();
  }, []);

  return (
    <div className="cardContainer">
      <div className="flex justify-center font-bold text-xl m-10 text-blue-400">
        <img src={myhome} className='w-7 mr-2' />
        {userInfos.nickname}
        <p className="font-light text-sm text-dark-gray m-1">님의 마이페이지</p>
      </div>
      <div>
        <UploadPhoto
          userId={userInfos.user_id}
          setUserInfo={setUserInfo}
          followerCnt={userInfos.followerCnt!}
          type="avatar"
        />
      </div>
      <div className="mt-10">
        <UserInfo userInfos={userInfos} />
      </div>
      <div className="mt-5">
        <TripStyle tripStyles={userInfos.surveyKeyword} />
      </div>
    </div>
  );
};

export default MyPageCard;
