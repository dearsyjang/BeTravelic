import React from "react";
import "./css/OnBoard.css";
import logo from "../assets/image/logo.png";
import kakao from "../assets/image/kakao-button.png";

const OnBoard = () => {
  return (
    <div className='onBoardBody'>
      <div className='wrapper'>
        <div className='mainDiv'>
          <img src={logo} />
          <button>
            <img src={kakao} className='kakao' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
