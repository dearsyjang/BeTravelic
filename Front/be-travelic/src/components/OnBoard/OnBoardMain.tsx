import React from "react";
import logohomeblack from "../../assets/image/logohomeblack.png";
import '../../pages/css/OnBoard.css'

const OnBoardMain: React.FC<{
  setInProp: (prev: boolean) => void;
  changeStatusHandler: (identifier: string) => void;
}> = ({ setInProp, changeStatusHandler }) => {
  return (
    <div className="flex flex-col items-center fadeIn">
      <img src={logohomeblack} />
      <button
        id=""
        onClick={changeStatusHandler.bind(this, "login")}
        className="w-80 mb-3 text-white bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        로그인
        {/* <img src={kakao} className="kakao" /> */}
      </button>
      <button
        onClick={changeStatusHandler.bind(this, "signup")}
        className="w-80 my-5 text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        회원가입
        {/* <img src={kakao} className="kakao" /> */}
      </button>
    </div>
  );
};

export default OnBoardMain;
