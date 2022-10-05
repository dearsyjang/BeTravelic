import React from "react";
import { useState, useRef } from "react";

import UploadPhoto from "./FeedPhoto";
import DatePick from "./FeedDate"
import StarRatings from "./FeedRating";

// 날짜
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale"

import "../css/FeedCreate.css"
import axios from "axios";

function FeedCreate() {
  const [rates, setRates] = useState(0);
  const [visitedDate, setDate] = useState(new Date())
  const [ contents, setContents ] = useState()
  const [ imagefile ] = useState()

  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
  };

  const imageInput = useRef<HTMLInputElement>(null);

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  // 지역
  const [ selectRegion, setSelectRegion ] = useState<String>()
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectRegion(value)
  }
  
  // 여행지
  const [ selectPlace, setSelectPlace ] = useState<String>()
  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectPlace(value)
  }

  // 날짜
  const selectDateHandler = (date: any) => {
    setDate(date)
    // console.log(visitedDate)
  }

  const handleContentChange = (event: any) => {
    setContents(event.target.value)
  }

  const postReview = async() => {
    console.log('지역', selectRegion)
    console.log('여행지', selectPlace)
    console.log('별점', rates)
    console.log('날짜', visitedDate)
    console.log('내용', contents)
    const response = await axios.post(`http://j7d205.p.ssafy.io:8443/feed/travel-review`,
    {},
    // {
    //   headers:
    // }
    )
  }

  return (
    <div id="FeedCreateCard" className="justify-content-center items-center">
      <div id="FeedPlace">
        <select onChange={handleRegionChange}>
          <option selected disabled>
            지역
          </option>
          <option value="1">서울특별시</option>
          <option value="2">부산광역시</option>
          <option value="3">대구광역시</option>
          <option value="4">인천광역시</option>
          <option value="5">광주광역시</option>
          <option value="6">대전광역시</option>
          <option value="7">울산광역시</option>
          <option value="8">세종특별자치시</option>
          <option value="9">경기도</option>
          <option value="10">강원도</option>
          <option value="11">충청북도</option>
          <option value="12">충청남도</option>
          <option value="13">전라북도</option>
          <option value="14">전라남도</option>
          <option value="15">경상북도</option>
          <option value="16">경상남도</option>
          <option value="17">제주특별자치도</option>
        </select>
        <select onChange={handlePlaceChange}>
          <option selected disabled>
            여행지
          </option>
          <option value="1">2022 금천하모니축제</option>
          <option value="2">부산광역시</option>
          <option value="3">대구광역시</option>
          <option value="4">인천광역시</option>
          <option value="5">광주광역시</option>
          <option value="6">대전광역시</option>
          <option value="7">울산광역시</option>
          <option value="8">세종특별자치시</option>
          <option value="9">경기도</option>
          <option value="10">강원도</option>
          <option value="11">충청북도</option>
          <option value="12">충청남도</option>
          <option value="13">전라북도</option>
          <option value="14">전라남도</option>
          <option value="15">경상북도</option>
          <option value="16">경상남도</option>
          <option value="17">제주특별자치도</option>
        </select>
      </div>

      <div
        id="FeedCreateCardHeader"
        className="flex items-center justify-center bg-gray-200 m-5 mt-0"
      >
      
      <StarRatings rates={rates} setRates={setRates}/>
        
        <DatePicker
          dateFormat="yyyy-MM-dd"
          locale={ko}
          selected={visitedDate}
          onChange={selectDateHandler} 
          todayButton={"Today"}
        />
      </div>

      <div id="FeedCreatePhoto">
        <UploadPhoto 
          type="place"
          />
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
          value={contents}
          onChange={(event) => {handleContentChange(event)}}
        ></textarea>
        {/* <input
          type="file"
          style={{ display: "none" }}
          ref={imageInput}
          onChange={changePhotoHandler}
        /> */}
        <div className="btnContainer">
          <button
            className="bg-blue-400 mx-4 my-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={postReview}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedCreate;