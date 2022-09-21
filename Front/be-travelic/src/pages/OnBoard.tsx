import React from "react";
import "./css/OnBoard.css";
import logo from "../assets/image/logo(black).png";
import kakao from "../assets/image/kakao-button.png";
import { login } from "../apis/auth";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "http://localhost:3000/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const OnBoard = () => {
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="onBoardBody">
      <div className="wrapper">
        <div className="mainDiv">
          <img src={logo} />
          <button onClick={loginHandler}>
            <img src={kakao} className="kakao" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
