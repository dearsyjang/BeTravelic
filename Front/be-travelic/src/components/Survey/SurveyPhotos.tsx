import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import "../css/SurveyPhotos.css";
import { dummyPhotos } from "./SurveyData";

interface Photo {
  id: number;
  src: any;
  keyword_name: string[];
  category_id?: number;
  selected_category?: number[];
}

// 1. display에 포토 저장함
// 2. winners에 keyword 저장, selected_category저장

const SurveyPhotos: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>();
  const [displays, setDisplays] = useState<Photo[]>();
  const [winners, setWinners] = useState<Photo[]>([]);
  useEffect(() => {
    dummyPhotos.sort(() => Math.random() - 0.5);
    setPhotos(dummyPhotos);
    setDisplays([dummyPhotos[index], dummyPhotos[index + 1]]);
    setIndex(index + 2);
  }, []);

  const clickHandler = (photo: Photo) => {
    if (index < dummyPhotos.length) {
      setDisplays([dummyPhotos[index], dummyPhotos[index + 1]]);
      setIndex(index + 2);
    } else {
      // axios 요청 + loading spinner + 다른 곳으로 route
      console.log(winners, "winners");

      // spinner

      // routes
      dispatch(authActions.authenticate);
      navigate("/mypage");
    }

    // setWinners에 category id랑 keyword name만 저장
    // const newPhoto = {
    //   keyword_name: [...photo.keyword_name],
    //   category_id: photo.category_id,
    // };

    setWinners((prev) => [...prev, photo]);
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
