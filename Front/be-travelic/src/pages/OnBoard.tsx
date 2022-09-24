import React, { useState } from "react";
import "./css/OnBoard.css";
import logo from "../assets/image/logo(black).png";
import kakao from "../assets/image/kakao-button.png";
import { login } from "../apis/auth";
import SignUpForm from "../components/OnBoard/SignUpForm";

const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
const REDIRECT_URI = "http://localhost:3000/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const OnBoard = () => {
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const showSignUpModalHandler = () => {
    setShowSignUpModal(true);
  };

  return (
    <div className='onBoardBody'>
      <div className='wrapper'>
        <div className='mainDiv'>
          {showSignUpModal ? (
            <SignUpForm />
          ) : (
            <div className='flex flex-col items-center'>
              <img src={logo} />
              <button
                onClick={loginHandler}
                className='w-64 my-5 text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                로그인
                {/* <img src={kakao} className="kakao" /> */}
              </button>
              <button
                onClick={showSignUpModalHandler}
                className='w-64 my-5 text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                회원가입
                {/* <img src={kakao} className="kakao" /> */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
