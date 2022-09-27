import React, { useRef, useState } from "react";
import "./css/OnBoard.css";
import logo from "../assets/image/logo(black).png";
import kakao from "../assets/image/kakao-button.png";
import { login } from "../apis/auth";
import SignUpForm from "../components/OnBoard/SignUpForm";
import OnBoardMain from "../components/OnBoard/OnBoardMain";
// import { CSSTransition, SwitchTransition } from "react-transition-group";

// 카카오 로그인 시 필요
// const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
// const REDIRECT_URI = "http://localhost:3000/kakao";
// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const OnBoard = () => {
  const [status, setStatus] = useState<string>("onboard");

  const onboard = useRef(null);
  const login = useRef(null);
  const signup = useRef(null);

  const nodeRef = status === "onboard" ? onboard : login;
  const [inProp, setInProp] = useState(false);
  // 카카오 로그인
  // const loginHandler = () => {
  //   window.location.href = KAKAO_AUTH_URL;
  // };

  // const showModalHandler = (inputIdentifier: string) => {
  //   setShowModal((curValue: Modal): Modal => {
  //     switch (inputIdentifier) {
  //       case "login":
  //         return {
  //           ...curValue,
  //           [inputIdentifier]: true,
  //         };
  //       default:
  //         return {
  //           ...curValue,
  //           [inputIdentifier]: true,
  //         };
  //     }
  //   });
  // };

  const changeStatusHandler = (identifier: string) => {
    setStatus(identifier);
    setInProp(true);
  };

  return (
    <div className="onBoardBody">
      <div className="wrapper">
        <div className="mainDiv transition-all">
          {/* <CSSTransition
            nodeRef={onboard}
            in={inProp}
            timeout={200}
            classNames="my-node"
          > */}
          {status === "onboard" ? (
            <OnBoardMain
              changeStatusHandler={changeStatusHandler}
              setInProp={setInProp}
            />
          ) : (
            <SignUpForm status={status} setStatus={setStatus} />
          )}
          {/* </CSSTransition> */}

          {/* <SwitchTransition mode="in-out">
            <CSSTransition
              key={status}
              nodeRef={nodeRef}
              in={inProp}
              timeout={1000}
              classNames="my-node"
            >
              {status === "onboard" ? (
                <OnBoardMain
                  changeStatusHandler={changeStatusHandler}
                  setInProp={setInProp}
                />
              ) : (
                <SignUpForm status={status} setStatus={setStatus} />
              )}
            </CSSTransition>
          </SwitchTransition> */}
        </div>
      </div>
    </div>
  );
};

export default OnBoard;
