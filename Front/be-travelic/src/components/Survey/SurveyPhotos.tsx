import React, { useEffect, useState } from "react";
import "../css/Photos.css";

interface Photo {
  id: number;
  src: string;
}

const dummyPhotos: Photo[] = [
  {
    id: 1,
    src: require("../../assets/image/survey/dummy1.jpg"),
  },
  {
    id: 2,
    src: require("../../assets/image/survey/dummy2.jpg"),
  },
  {
    id: 3,
    src: require("../../assets/image/survey/dummy3.jpg"),
  },
  {
    id: 4,
    src: require("../../assets/image/survey/dummy4.jpg"),
  },
];

const SurveyPhotos: React.FC = () => {
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
    setDisplays([dummyPhotos[index], dummyPhotos[index + 1]]);
    setIndex(index + 2);
    // 클릭 된 것 저장
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
