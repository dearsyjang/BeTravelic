import React, { useEffect, useState } from "react";

interface FeedPlace {
  place_id: number
  placeName: string
}


function FeedPlace() {

  return (
    <div>
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
    </div>
  );
}

export default FeedPlace;



// import React from 'react';

// import { FaMapMarkerAlt } from 'react-icons/fa'
// import "../css/FeedPlace.css";

// // 검색
// const handleChange = (event: any) => {
//   console.log(event.target.value)
// }

// const FeedPlace = () => {
//   return (
//     <form id="FeedPlace">
//       <div id="FeedPlaceBar">
//         {/* <label
//           htmlFor="simple-search"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
//         ></label> */}
//         <div id="FeedPlaceBarBody" className="flex">
//           <div className="flex absolute items-center p-3 pointer-events-none">
//             <FaMapMarkerAlt id="MarkIcon" />
//           </div>

//           <input
//             type="text"
//             id="PlaceSearch"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="여행지 검색"
//             required
//             onChange={handleChange}
//           />

//           <button
//             type="submit"
//             className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default FeedPlace;