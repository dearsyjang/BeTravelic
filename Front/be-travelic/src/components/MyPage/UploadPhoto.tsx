import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../css/UploadPhoto.css";
import logo from "../../assets/image/logo.png";
import {
  downloadProfilePhoto,
  fetchFollow,
  fetchPorfilePhoto,
} from "../../apis/mypage";
import { useParams } from "react-router-dom";

const AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const UploadPhoto: React.FC<{ type: string; userId: number }> = ({
  type,
  userId,
}) => {
  const [image, setImage] = useState<string>(() => {
    if (type === "place") {
      return logo;
    }
    return AVATAR;
  });

  const { id } = useParams();
  const numberId = Number(id);

  const [file, setFile] = useState<File>();

  const imageInput = useRef<HTMLInputElement>(null);

  const fetchFollowHandler = async () => {
    await fetchFollow(id!);
  };

  const changePhotoHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.files![0]);
    if (event.target.files![0]) {
      setFile(event.target.files![0]);
      const res = await fetchPorfilePhoto(event.target.files![0]);
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
        console.log(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files![0]);
  };

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  useLayoutEffect(() => {
    const initialData = async () => {
      const res = await downloadProfilePhoto();
      setImage(res?.data)
    };
    initialData();
  }, []);

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
      <div className="flex relative justify-center pt-5">
        {/* jwt !== 해당 페이지 유저 */}
        {userId !== numberId && (
          <button
            id="FollowButton"
            className="flex absolute right-3 ml-auto bg-indigo-500 border-0 py-1 px-2 focus:outline-none rounded"
            onClick={fetchFollowHandler}
          >
            팔로우
          </button>
        )}
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
