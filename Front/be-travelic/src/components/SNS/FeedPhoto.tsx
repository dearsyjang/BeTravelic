import React, { useRef, useState } from "react";
import "../css/FeedPhoto.css";
import logo from "../../assets/image/logo.png";

type DefaultImage = {
  type: string;
};

const AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const UploadPhoto = ({ type }: DefaultImage) => {
  const [image, setImage] = useState<string>(() => {
    if (type === "place") {
      return logo;
    }
    return AVATAR;
  });

  const [file, setFile] = useState<File>();

  const imageInput = useRef<HTMLInputElement>(null);

  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
    if (event.target.files![0]) {
      setFile(event.target.files![0]); // 요거 보내면 됨!
    } else {
      //업로드 취소할 시
      if (type === "place") {
        setImage(logo);
        return;
      } else if (type === "avatar") {
        setImage(AVATAR);
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files![0]);
    console.log(file)
  };

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  return (
    <>
      <div id="FeedPhoto">
        <div className="flex flex-row">
          {type === "place" && image === logo && (
            <label
              htmlFor="upload-image"
              className="block mr-3 ml-10 mt-1.5 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              사진 업로드
            </label>
          )}
          {type === "place" && image === logo && (
            <button
              id="ImageButton"
              onClick={uploadImageHandler}
              className="flex bg-indigo-500 border-0 py-1 px-2 focus:outline-none rounded"
            >
              첨부파일
            </button>
          )}
        </div>

        <input
          id="upload-image"
          type="file"
          style={{ display: "none" }}
          accept="image/jpg,impge/png,image/jpeg"
          name="profile_img"
          onChange={changePhotoHandler}
          ref={imageInput}
        />

        <div className="flex relative justify-center pt-5">
          {/* jwt !== 해당 페이지 유저 */}
          <img
            src={image}
            alt="avatar"
            className={`${type === "avatar" ? "avatar" : "place"}`}
          />
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
