import React, { SetStateAction, useState } from "react";
import { useRef } from "react";
import CloseButton from "./CloseButton";
import "../css/PhotoInputModal.css";
import ArticleModal from "../common/ArticleModal";
import { Display } from "../../pages/MyPage";
import { fetchMapPhoto } from "../../apis/mypage";

// 허용가능한 확장자 목록!
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

const PhotoInputModal: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  changeDisplayHandler: (id: number, image: string) => Promise<Display[]>;
  regionId: number;
  // setShowArticleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal, changeDisplayHandler, regionId }) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  // image에
  const changePhotoHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files![0]) {
      const stringId = String(regionId);
      await fetchMapPhoto(event.target.files![0], stringId);
      console.log("여기");

      // 여기는 file을 보내는 것
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        // setImage(reader.result);
        // 여기서 image보냄.
        console.log("changeHandler이전");

        changeDisplayHandler(regionId, reader.result);
      }
    };

    reader.readAsDataURL(event.target.files![0]);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
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
