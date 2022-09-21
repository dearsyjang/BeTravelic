import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecommendPlaceMain, PlaceDetailMain } from "./pages/index";
import Navbar from "../src/components/common/Navbar";
import Footer from "./components/common/Footer";
// import OnBoard from "./pages/OnBoard";
import MyPage from "./pages/MyPage";
import Survey from "./pages/Survey";
import SNS from "./pages/SNS"
import OnBoard from "./pages/OnBoard";

function App() {
  return (
    <>
      {/* <OnBoard /> */}
      {/* <Survey /> */}
      <Navbar />
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path='/recommendMain'
          element={
            <RecommendPlaceMain
              latitude={36.271610662143146}
              longitude={129.29439396586432}
            />
          }
        />
        <Route
          path='/place/:id'
          element={
            <PlaceDetailMain />
          }
        />
        <Route
          path='/feed'
          element={
            <SNS />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
