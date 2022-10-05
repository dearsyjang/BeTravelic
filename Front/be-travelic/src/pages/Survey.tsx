import React, { useState } from "react";
import SurveyPhotos from "../components/Survey/SurveyPhotos";
import "./css/Survey.css";
import logo from "../assets/image/logo(black).png";
import ProgressBar from "../components/Survey/ProgressBar";

const Survey: React.FC<{}> = () => {
  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="surveyBody">
      <div className="wrapper">
        <div className="surveyDiv">
          <ProgressBar progress={progress} />
          <div className="surveyTitle">
            <h1>더 끌리는 사진을 선택해주세요. </h1>
          </div>
          <div className="photosContainer">
            <SurveyPhotos setProgress={setProgress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
