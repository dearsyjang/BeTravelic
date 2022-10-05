import React, {
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberId, login, register } from "../../apis/auth";
import { authActions } from "../../store/auth";
import "../../pages/css/OnBoard.css";
import { fetchUserInfo } from "../../apis/mypage";

interface error {
  email: boolean;
  pw: boolean;
  confirmedpw?: boolean;
}

const SignUpForm: React.FC<{
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}> = ({ status, setStatus }) => {
  const [inputValues, setInputValues] = useState({
    nickname: "",
    email: "",
    pw: "",
    confirmedpw: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAlert, setIsAlert] = useState(false);

  const [errors, setErrors] = useState<error>({
    email: true,
    pw: true,
    confirmedpw: true,
  });

  // email 유효성 검사
  const emailRegex =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const pwRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const emailIsValid = emailRegex.test(inputValues.email);

  const confirmpwIsValid =
    inputValues.pw === inputValues.confirmedpw ? true : false;
  const pwIsValid = pwRegex.test(inputValues.pw);

  // blur 시 error 확인
  const onBlurHandler = (inputIdentifier: string) => {
    setErrors((curValue: error): error => {
      switch (inputIdentifier) {
        case "email":
          return {
            ...curValue,
            [inputIdentifier]: emailIsValid,
          };
        case "pw":
          return {
            ...curValue,
            [inputIdentifier]: pwIsValid,
          };
        case "confirmedpw":
          return {
            ...curValue,
            [inputIdentifier]: confirmpwIsValid,
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
    const { nickname, email, pw } = inputValues;

    if (identifier === "onboard") {
      setStatus(identifier);
    }

    // if (!errors.email || !errors.pw) {
    //   console.log(errors.email, errors.pw);
      
    //   setIsAlert(true);
    //   return;
    // } else {
      const id = email;

      let res;
      if (identifier === "login") {
        res = await login({ email, pw });
        console.log(res, "res");
      } else if (identifier === "signup") {
        res = await register({ nickname, email, pw, id });
      }

      const { accessToken, refreshToken } = res;

      // const {userId} = await fetchUserInfo()

      // token 저장
      dispatch(
        authActions.authenticate({
          accessToken,
          refreshToken,
        })
      );
      const { user_id } = await fetchUserInfo();
      // const userId = await getMemberId();
      dispatch(authActions.saveUserId(user_id));
      console.log("dispatch완", user_id);

      const url = identifier === "signup" ? "/survey" : `/mypage/${user_id}`;
      navigate(url, { replace: true });
    // }
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
              htmlFor="pw"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="pw"
              id="pw"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              // ref={pwRef}
              onChange={inputChangeHandler.bind(this, "pw")}
              onBlur={onBlurHandler.bind(this, "pw")}
            />
          </div>
          {!errors.pw && !pwIsValid ? (
            <div className="text-red-100">
              비밀번호는 대,소문자 및 특수문자를 포함한 8자리 이상 설정해주세요.
            </div>
          ) : null}

          {status === "signup" && (
            <div>
              <label
                htmlFor="confirm-pw"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                name="confirm-pw"
                id="confirm-pw"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
                // ref={confirmedpwRef}
                onChange={inputChangeHandler.bind(this, "confirmedpw")}
                onBlur={onBlurHandler.bind(this, "confirmedpw")}
              />
            </div>
          )}
          {!errors.confirmedpw && !confirmpwIsValid ? (
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
        {isAlert && (
          <div
            className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 justify-center"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              입력한 내용을 다시 확인해주세요 :)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
