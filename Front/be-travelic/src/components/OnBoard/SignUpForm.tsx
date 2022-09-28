import React, { FormEvent, SetStateAction, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberId, login, register } from "../../apis/auth";
import { authActions } from "../../store/auth";
import '../../pages/css/OnBoard.css'

interface error {
  email: boolean;
  password: boolean;
  confirmedPassword?: boolean;
}

const SignUpForm: React.FC<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}> = ({ status, setStatus }) => {
  const [inputValues, setInputValues] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<error>({
    email: true,
    password: true,
    confirmedPassword: true,
  });

  // email 유효성 검사
  const emailRegex =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const emailIsValid = emailRegex.test(inputValues.email);

  const confirmPasswordIsValid =
    inputValues.password === inputValues.confirmedPassword ? true : false;
  const passwordIsValid = passwordRegex.test(inputValues.password);

  // blur 시 error 확인
  const onBlurHandler = (inputIdentifier: string) => {
    setErrors((curValue: error): error => {
      switch (inputIdentifier) {
        case "email":
          return {
            ...curValue,
            [inputIdentifier]: emailIsValid,
          };
        case "password":
          return {
            ...curValue,
            [inputIdentifier]: passwordIsValid,
          };
        case "confirmedPassword":
          return {
            ...curValue,
            [inputIdentifier]: confirmPasswordIsValid,
          };
        default:
          return {
            ...curValue,
          };
      }
    });
  };

  // 회원가입 input 받는 것
  const inputChangeHandler = (
    inputIdentifier: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValues((curValue) => {
      return {
        ...curValue,
        [inputIdentifier]: event.target.value,
      };
    });
  };

  const signUpHandler = async (
    identifier: string,
    e: FormEvent<HTMLElement>
  ) => {
    // axios
    // 설문조사로
    e.preventDefault();
    const { nickname, email, password } = inputValues;

    let res;
    if (identifier === "login") {
      res = await login({ email, password });
    } else if (identifier === "signup") {
      res = await register({ nickname, email, password });
    } else {
      setStatus(identifier)
    }

    const { accessToken, refreshToken } = res.data;

    // token 저장
    dispatch(
      authActions.authenticate({
        accessToken,
        refreshToken,
      })
    );
    let userId: string | null = null;
    if (identifier === "login") {
      userId = await getMemberId();
    }

    const url = userId === null ? "/survey" : `/mypage/${userId}`;
    navigate(url, { replace: true });
  };

  return (
    <div className="w-full  md:mt-0 sm:max-w-md xl:p-0 fadeIn">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
          회원 정보 입력
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          {status === "signup" && (
            <div>
              <label
                htmlFor="nickname"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="닉네임을 입력해주세요."
                required
                onChange={inputChangeHandler.bind(this, "nickname")}
                onBlur={onBlurHandler.bind(this, "nickname")}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
              onChange={inputChangeHandler.bind(this, "email")}
              onBlur={onBlurHandler.bind(this, "email")}
              // ref={emailRef}
            />
          </div>
          {!errors.email && !emailIsValid ? (
            <div className="text-red-100">이메일을 확인해주세요.</div>
          ) : null}

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              // ref={passwordRef}
              onChange={inputChangeHandler.bind(this, "password")}
              onBlur={onBlurHandler.bind(this, "password")}
            />
          </div>
          {!errors.password && !passwordIsValid ? (
            <div className="text-red-100">
              비밀번호는 대,소문자 및 특수문자를 포함한 8자리 이상 설정해주세요.
            </div>
          ) : null}

          {status === "signup" && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                // ref={confirmedPasswordRef}
                onChange={inputChangeHandler.bind(this, "confirmedPassword")}
                onBlur={onBlurHandler.bind(this, "confirmedPassword")}
              />
            </div>
          )}
          {!errors.confirmedPassword && !confirmPasswordIsValid ? (
            <div className="text-red-100">비밀번호가 일치하지 않습니다.</div>
          ) : null}
          <div className="flex items-start justify-around">
            <button
              onClick={signUpHandler.bind(this, status)}
              type="submit"
              className="text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {status === "signup" ? "회원가입 하기" : "로그인 하기"}
            </button>
            <button
              onClick={signUpHandler.bind(this, "onboard")}
              type="submit"
              className="text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              뒤로 가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
