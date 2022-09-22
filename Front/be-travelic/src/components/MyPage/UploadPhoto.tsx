import React, { useRef, useState } from "react";
import "../css/UploadPhoto.css";
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
      setFile(event.target.files![0]);
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
  };

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  return (
    <>
      {type === "place" && image === logo && (
        <label htmlFor="upload-image">사진 업로드</label>
      )}
      <input
        id="upload-image"
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={changePhotoHandler}
        ref={imageInput}
      />
      <div className="flex justify-center pt-5">
        <img
          src={image}
          alt="avatar"
          className={`${type === "avatar" ? "avatar" : "place"}`}
          onClick={uploadImageHandler}
        />
      </div>
    </>
  );
};

export default UploadPhoto;
