import React, { useRef, useState } from "react";
import logo from "../../assets/image/logo.png";

const InputPhoto = () => {
  const [avatar, setAvatar] = useState<string>(logo);

  const [file, setFile] = useState<File>();

  const imageInput = useRef<HTMLInputElement>(null);
  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
    if (event.target.files![0]) {
      setFile(event.target.files![0]);
    } else {
      //업로드 취소할 시
      setAvatar(logo);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files![0]);
  };

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={changePhotoHandler}
        ref={imageInput}
      />
      <div className="flex justify-center pt-5">
        <img
          src={avatar}
          alt="avatar"
          className="avatar"
          onClick={uploadImageHandler}
        />
      </div>
    </>
  );
};

export default InputPhoto;
