import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'
import "../css/FeedPlace.css";

const FeedPlace = () => {
  return (
    <form id="FeedPlace">
      <div id="FeedPlaceBar">
        {/* <label
          htmlFor="simple-search"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        ></label> */}
        <div id="FeedPlaceBarBody" className="flex">
          <div className="flex absolute items-center p-3 pointer-events-none">
            <FaMapMarkerAlt id="MarkIcon" />
          </div>

          <input
            type="text"
            id="PlaceSearch"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="여행지 검색"
            required
          />

          <button
            type="submit"
            className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

export default FeedPlace;