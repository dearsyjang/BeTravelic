import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthState } from "../src/store/auth";
function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const location = useLocation();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isSurveyed = window.location.href.includes("survey");
  console.log(isSurveyed);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // survey 시 navbar 제거 위함

  // useEffect(() => {}, [isAuthenticated]);

  // const isSurveyed = useSelector((state: RootState) => state.auth.isSurveyed);

  return (
    <>
      {isAuthenticated && !isSurveyed && (
        <Navbar isAuthenticated={isAuthenticated} userId={userId} />
      )}
      {/* 로그인 기능 구현 될 경우 Navbar 수정 */}
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}
      <TransitionGroup className='transition-group'>
        <CSSTransition
          key={location.pathname}
          classNames='pageSlider'
          timeout={500}
        >
          <Routes location={location}>
            <Route path='/' element={<OnBoard />} />
            <Route
              path='/survey'
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Survey />
                </ProtectedRoute>
              }
            />
            <Route
              path='/mypage/:id'
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/recommendMain'
              element={
                <RecommendPlaceMain
                  latitude={36.271610662143146}
                  longitude={129.29439396586432}
                />
              }
            />
            {/* <Route path="/kakao" element={<Redirect />} /> */}
            <Route path='/place/:place_id' element={<PlaceDetailMain />} />
            <Route path='/sns' element={<SNS />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      {/* <Footer /> */}
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
