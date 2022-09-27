import React from "react";
import logo from "../../assets/image/logo(black).png";

const OnBoardMain: React.FC<{
  setInProp: (prev: boolean) => void;
  changeStatusHandler: (identifier: string) => void;
}> = ({ setInProp, changeStatusHandler }) => {
  return (
    <div className="flex flex-col items-center transition-transform ease-in-out delay-150">
      <img src={logo} />
      <button
        onClick={changeStatusHandler.bind(this, "login")}
        className="w-64 my-5 text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        로그인
        {/* <img src={kakao} className="kakao" /> */}
      </button>
      <button
        onClick={changeStatusHandler.bind(this, "signup")}
        className="w-64 my-5 text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        회원가입
        {/* <img src={kakao} className="kakao" /> */}
      </button>
    </div>
  );
};

export default OnBoardMain;
