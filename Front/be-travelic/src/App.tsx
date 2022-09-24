import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecommendPlaceMain, PlaceDetailMain } from "./pages/index";
import Navbar from "../src/components/common/Navbar";
import Footer from "./components/common/Footer";
import OnBoard from "./pages/OnBoard";
import MyPage from "./pages/MyPage";
import Survey from "./pages/Survey";
import Redirect from "./components/oauth/Redirect";
import SNS from "./pages/SNS";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // const isSurveyed = useSelector((state: RootState) => state.auth.isSurveyed);

  return (
    <>
      {/* {isAuthenticated && <Navbar />} */}
      {/* 로그인 기능 구현 될 경우 Navbar 수정 */}
      <Navbar />
      <Routes>
        <Route path="/" element={<OnBoard />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/recommendMain"
          element={
            <RecommendPlaceMain
              latitude={36.271610662143146}
              longitude={129.29439396586432}
            />
          }
        />
        <Route path="/kakao" element={<Redirect />} />
        <Route path="/place/:id" element={<PlaceDetailMain />} />
        <Route path="/sns" element={<SNS />} />
      </Routes>
      <Footer />
      {/* {isAuthenticated && <Footer />} */}
    </>
  );
}

export default App;
