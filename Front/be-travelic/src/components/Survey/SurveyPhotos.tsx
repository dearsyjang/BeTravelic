import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { set } from "date-fns";
import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSurvey, getMemberId } from "../../apis/auth";
import { authActions } from "../../store/auth";
import "../css/SurveyPhotos.css";
import { dummyPhotos } from "./SurveyData";
import { Winners } from "../../apis/auth";

interface Photo {
  id: number;
  src: any;
  keyword_name: string[];
  category_id: number;
}

// 1. display에 포토 저장함
// 2. winners에 keyword 저장, selected_category저장

const SurveyPhotos: React.FC<{
  setProgress: React.Dispatch<SetStateAction<number>>;
}> = ({ setProgress }) => {
  const [index, setIndex] = useState<number>(0);
  const [photos, setPhotos] = useState<Photo[]>();
  const [displays, setDisplays] = useState<Photo[]>();
  const [winners, setWinners] = useState<Winners>({
    keyword_name: [],
    category_ids: [],
  });
  useEffect(() => {
    dummyPhotos.sort(() => Math.random() - 0.5);
    setPhotos(dummyPhotos);
    setDisplays([dummyPhotos[index], dummyPhotos[index + 1]]);
    setIndex(index + 2);
  }, []);

  const clickHandler = async (photo: Photo) => {
    if (index < dummyPhotos.length) {
      setDisplays([dummyPhotos[index], dummyPhotos[index + 1]]);
      setProgress((prev) => prev + 14);
      setIndex(index + 2);
    } else {
      // 중복 제거
      const finals: Winners = {
        keyword_name: [...new Set(winners.keyword_name)],
        category_ids: [...new Set(winners.category_ids)],
      };

      // axios 요청 + 다른 곳으로 route
      console.log(finals, "winners");
      // const userId = await getMemberId();
      // const res = await fetchSurvey(finals, userId);

      // if (res.status === 200) {
      //   navigate(`/mypage/${userId}`);
      // }
    }

    if (winners.keyword_name) {
      const newPhoto: Winners = {
        keyword_name: [...winners.keyword_name, ...photo.keyword_name],
        category_ids: [...winners.category_ids, photo.category_id],
      };
      setWinners(newPhoto);
    } else {
      setWinners({
        keyword_name: [...photo.keyword_name],
        category_ids: [photo.category_id],
      });
    }
  };

  return (
    <>
      {displays &&
        displays.map((photo) => {
          return (
            <div
              className="imageContainer"
              key={photo.id}
              onClick={clickHandler.bind(this, photo)}
            >
              <img className="photo" src={photo.src} />
            </div>
          );
        })}
    </>
  );
};

export default SurveyPhotos;
