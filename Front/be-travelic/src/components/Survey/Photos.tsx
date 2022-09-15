import React, { useEffect, useState } from "react";
import "../css/Photos.css";

const dummyPhotos: { id: number; src: string }[] = [
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



const Photos: React.FC = () => {


  const [photos, setPhotos] = useState<{}[]>();
  const [displays, setDisplays] = useState<{ id: number; src: string }[]>();
  const [winners, setWinners] = useState<[]>();
  useEffect(() => {
    dummyPhotos.sort(() => Math.random() - 0.5);
    setPhotos(dummyPhotos);
    setDisplays([dummyPhotos[0], dummyPhotos[1]]);
  }, []);

  const clickHandler = (photo: {}) => {
    console.log(photo);
    console.log("aaa");
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

export default Photos;
