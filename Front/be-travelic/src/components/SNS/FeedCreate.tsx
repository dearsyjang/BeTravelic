import React, { useEffect } from "react";
import axios from "axios";
import { useState, useRef } from "react";

// 사진
import UploadPhoto from "./FeedPhoto";

// 별점
import StarRatings from "./FeedRating";

// 날짜
import DatePicker from "react-datepicker"
import { ko } from "date-fns/esm/locale"
import 'react-datepicker/dist/react-datepicker.css';

import "../css/FeedCreate.css"
import { GrMap } from "react-icons/gr"
import { AiOutlineCalendar } from "react-icons/ai"


function FeedCreate() {
  const [ rates, setRates ] = useState(0);
  const [ visitedDate, setDate ] = useState(new Date())
  const [ contents, setContents ] = useState()
  const [ imagefile, setImageFile] = useState<File>();
  const [ selectRegion, setSelectRegion ] = useState<String>()
  const [ placeLists, setPlaceLists ] = useState([])
  const [ selectPlace, setSelectPlace ] = useState<String>()
  
  const accessToken = localStorage.getItem("accessToken");

  const changePhotoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files![0]);
  };

  const imageInput = useRef<HTMLInputElement>(null);

  const uploadImageHandler = () => {
    imageInput.current?.click();
  };

  // 지역
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectRegion(value)
    getPlaceList(value)
  }
  
  // 여행지
  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectPlace(value)
  }
  // 지역별 여행지 GET(spring)
  const getPlaceList = async(value: any) => {
    console.log(selectRegion)
    const response = await axios.get(`http://j7d205.p.ssafy.io:8443/feed/travel-review`,
    {
      params: {
        regionId: value
      }
    },
    )
    console.log('장소', response.data)
    setPlaceLists(response.data)
  }

  // 날짜
  const selectDateHandler = (date: any) => {
    setDate(date)
    // console.log(visitedDate)
  }

  // 내용
  const handleContentChange = (event: any) => {
    setContents(event.target.value)
  }

  // 사진
  const feedImage = (file: File) => {
    setImageFile(file)
  }

  // 리뷰 등록
  const postReview = async() => {
    const formData:any = new FormData();
    console.log(imagefile)
    formData.append('file', imagefile)

    console.log('사진', formData)
    console.log('지역', selectRegion)
    console.log('여행지', selectPlace)
    console.log('별점', rates)
    console.log('날짜', visitedDate)
    console.log('내용', contents)
    console.log(accessToken)

    const response = await axios({
      method: "post",
      url: `http://j7d205.p.ssafy.io:8443/feed/travel-review`,
      data: formData,
      headers: {
        Authorization: `${accessToken}`
      },
      params: {
            place_id: selectPlace,
            regionId: selectRegion,
            contents: contents,
            score: rates,
            visited_at: visitedDate
      }
    })
    console.log(response.status)
      window.location.reload()
  }

  return (
    <div id="FeedCreateCard" className="justify-content-center items-center">
      <div id="FeedCreatePlace" className="flex items-center justify-center bg-gray-200 m-5 mb-0">
        <GrMap id="placeIcon" size={25} className="mr-3"/>
        {/* 지역 */}
        <select id="RegionPicker" onChange={handleRegionChange}>
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

        {/* 지역별 여행지 */}
        <select id="PlacePicker" onChange={handlePlaceChange}>
        <option selected disabled>
            여행지
        </option>
        {placeLists.map((place : any, index) => (
        <option value={place.placeId}>{place.placeName}</option>
        ))
        }
        </select>
      </div>

      <div
        id="FeedCreateCardHeader"
        className="flex items-center justify-center bg-gray-200 m-5 mt-0"
      >
        <AiOutlineCalendar id="calendaricon" className="mr-2"/>
        <label
          htmlFor="rates"
          className="block mt-3 mb-3 text-ml font-medium text-gray-900 dark:text-gray-400"
        >방문 날짜</label>
      <div id="DatePicker">
        
        <DatePicker
          fixedHeight
          dateFormat="yyyy-MM-dd"
          locale={ko}
          selected={visitedDate}
          onChange={selectDateHandler}
          todayButton={"Today"}
        />
      </div>
      <StarRatings rates={rates} setRates={setRates}/>
        

      </div>

      <div id="FeedCreatePhoto">
        <UploadPhoto 
          type="place"
          feedImage={feedImage}
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
          rows={5}
          className="block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="  내용을 입력해주세요 :)"
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