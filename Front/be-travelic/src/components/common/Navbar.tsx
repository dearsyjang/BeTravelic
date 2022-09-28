import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { authActions } from "../../store/auth";

const Navbar: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <header className="text-primary body-font bg-blue-300">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <NavLink to="">
          <div className="flex title-font font-medium items-center text-gray-900 md:mb-0">
            <img src={logo} className="h-16" />
            {/* <span className="ml-3 text-xl text-white">여행이 체질</span> */}
          </div>
        </NavLink>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            style={({ isActive }) => (isActive ? { color: "#FFD24C" } : {})}
            to="/mypage"
          >
            <div className="mr-5 hover:text-gray-900">MyPage</div>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "#FFD24C" } : {})}
            to="/recommendMain"
          >
            <div className="mr-5 hover:text-gray-900">Discover</div>
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "#FFD24C" } : {})}
            to="/sns"
          >
            <div className="mr-5 hover:text-gray-900">Feed</div>
          </NavLink>
        </nav>
        {isAuthenticated && (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={logoutHandler}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
