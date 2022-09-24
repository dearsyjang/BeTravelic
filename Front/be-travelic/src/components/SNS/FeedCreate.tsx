import React from "react";
import { useState, useRef } from "react";
import UploadPhoto from "./FeedPhoto";
import FeedPlace from "./FeedPlace";
import DatePick from "./FeedDate"
import StarRatings from "./FeedRating";
import "../css/FeedCreate.css"

function FeedCreate() {
  const [rates, setRates] = useState(0);

  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
  };

  const imageInput = useRef<HTMLInputElement>(null);

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  return (
    <div id="FeedCreateCard" className="justify-content-center items-center">
      <div id="FeedPlace">
        <FeedPlace />
      </div>

      <div
        id="FeedCreateCardHeader"
        className="flex items-center justify-center bg-gray-200 m-5 mt-0"
      >
        <StarRatings rates={rates} setRates={setRates} />
        <DatePick />
      </div>

      <div id="FeedCreatePhoto">
        <UploadPhoto type="place" />
      </div>

      <div id="FeedCreateContent" className="justify-content-center items-center">
        <label
          id="FeedContentLabel"
          htmlFor="contents"
          className="block m-5 text-sm font-medium text-gray-900 dark:text-gray-400"
        >여행기록 남기기</label>

        <textarea
          id="contents"
          rows={4}
          className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="내용을 입력해주세요!"
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
        </div>
      </div>
    </div>
  );
}

export default FeedCreate;