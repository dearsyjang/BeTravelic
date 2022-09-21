import React, { useRef, useState } from "react";
import CloseButton from "../MyPage/CloseButton";
import UploadPhoto from "../MyPage/UploadPhoto";
import InputProfilePhoto from "../MyPage/UploadPhoto";
import DatePick from "./DatePick";
import InputPhoto from "./InputPhoto";
import PlaceSearchBar from "./PlaceSearchBar";
import StarRatings from "./StarRatings";

const ArticleModal: React.FC<{
  setShowArticleModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
  };
  const imageInput = useRef<HTMLInputElement>(null);
  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  const modalCloseHandler = () => {
    props.setShowArticleModal(false);
  };

  const [rates, setRates] = useState(0);

  return (
    <div className="backdrop">
      <div className="modalContainer justify-center">
        <div className="max-w-sm rounded shadow-lg m-5"></div>
        <form className="">
          <UploadPhoto type="place" />
          <PlaceSearchBar />
          <DatePick />
          <StarRatings rates={rates} setRates={setRates} />
          <label
            htmlFor="contents"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            게시글 내용
          </label>
          <textarea
            id="contents"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="게시글 내용..."
          ></textarea>
          <input
            type="file"
            style={{ display: "none" }}
            ref={imageInput}
            onChange={changePhotoHandler}
          />
          <div className="btnContainer">
            <button
              className="bg-blue-400 mx-4 my-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={uploadImageHandler}
            >
              등록
            </button>
            <button className="bg-red-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;
