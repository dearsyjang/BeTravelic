import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecommendPlaceMain, PlaceDetailMain } from "./pages/index";
import Navbar from "../src/components/common/Navbar";
import Footer from "./components/common/Footer";
import OnBoard from "./pages/OnBoard";
import Survey from "./pages/Survey";

function App() {
  return (
    <>
      {/* <OnBoard /> */}
      {/* <Survey /> */}
      <Navbar />
      <Routes>
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
          path='/place/1'
          element={
            <PlaceDetailMain/>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
