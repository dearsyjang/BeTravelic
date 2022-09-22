import React from "react";
import SurveyPhotos from "../components/Survey/SurveyPhotos";
import "./css/Survey.css";
import logo from "../assets/image/logo(black).png";

const Survey = () => {
  return (
    <div className="surveyBody">
      <div className="wrapper">
        <div className="surveyDiv">
          <img src={logo} className="surveyLogo" />
          <div className="surveyTitle">
            <h1>더 끌리는 사진을 선택해주세요. </h1>
          </div>
          <div className="photosContainer">
            <SurveyPhotos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
