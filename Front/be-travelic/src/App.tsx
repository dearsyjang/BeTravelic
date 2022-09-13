import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecommendPlaceMain } from "./pages/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/recommendMain'
            element={
              <RecommendPlaceMain
                latitude={36.68489220533342}
                longitude={127.46794555678892}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
