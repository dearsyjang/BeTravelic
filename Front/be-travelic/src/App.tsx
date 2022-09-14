import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecommendPlaceMain } from "./pages/index";
import Navbar from "../src/components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/recommendMain"
          element={
            <RecommendPlaceMain
              latitude={36.68489220533342}
              longitude={127.46794555678892}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
