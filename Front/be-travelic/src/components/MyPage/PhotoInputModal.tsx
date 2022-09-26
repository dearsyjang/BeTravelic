import React, { SetStateAction, useState } from "react";
import { useRef } from "react";
import CloseButton from "./CloseButton";
import "../css/PhotoInputModal.css";
import ArticleModal from "../common/ArticleModal";

// 허용가능한 확장자 목록!
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

const PhotoInputModal: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setShowArticleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>();

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };


  // image에 
  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
    if (event.target.files![0]) {
      setFile(event.target.files![0]);
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files![0]);
  };

  const modalCloseHandler = () => {
    props.setShowModal(false);
  };



  // const showArticleModalHandler = () => {
  //   props.setShowArticleModal(true);
  //   props.setShowModal(false);
  // };

  return (
    <div className="backdrop">
      <input
        id="upload-image"
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={changePhotoHandler}
        ref={imageInput}
      />
      <div className="modalContainer">
        <div className="titleContainer">
          <h2 className="title">추억을 기록하세요</h2>
          <div className="closeBtnContainer" onClick={modalCloseHandler}>
            <CloseButton />
          </div>
        </div>
        <div className="btnContainer">
          <button
            className="bg-blue-400 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={uploadImageHandler}
          >
            사진 등록
          </button>
          <button className="bg-red-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            사진 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoInputModal;
