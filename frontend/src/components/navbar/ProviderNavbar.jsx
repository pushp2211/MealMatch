import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProviderNavbar = ({ isMobile, isOpen, setIsOpen, setSlideIn }) => {
  const announcementCount = 1;
  const [isImage, setIsImage] = useState(false);
  const imgPath = "";

  return (
    <nav className="sticky w-full h-[60px] box-border py-4 px-4 sm:px-8 flex items-center justify-between shadow-[0_3px_3px_-1px_rgba(0,0,0,0.2)] top-0 z-50 bg-dashbg1">

      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Hamburger for mobile */}
        {isMobile && (
          <button
            className="md:hidden p-2 rounded-md bg-darkpink2/80 backdrop-blur-sm shadow-lg cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
              setSlideIn(!isOpen);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}

        {/* Logo (only for desktop) */}
        <div className="hidden md:flex md:items-center">
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-darkpink2 size-5 sm:size-6">
              <path
                d="M480-520q-68-62-111-104.5T302-698q-24-31-33-54.5t-9-47.5q0-50 35-85t86-35q28 0 54 12.5t45 33.5q19-21 45-33.5t54-12.5q51 0 86 35t35 85q0 24-9 47.5T658-698q-24 31-67 73.5T480-520Zm0-108q72-66 106-107.5t34-64.5q0-17-12-28.5T579-840q-12 0-23.5 7T532-812l-51 59-51-57q-14-16-25.5-23t-23.5-7q-17 0-29 11.5T340-800q0 23 34 64.5T480-628ZM120-80v-122q-18-5-30-19t-14-34L40-640h25q23 0 40.5 16t19.5 39l24 265h171q33 0 56.5 23.5T400-240v40h-40v120h-60v-120H180v120h-60Zm320 0v-320H200q0-33 23.5-56.5T280-480h400q33 0 56.5 23.5T760-400H520v320h-80Zm160 0v-120h-40v-40q0-33 23.5-56.5T640-320h172l24-265q2-23 19-39t40-16h25l-35 385q-2 20-14.5 34T840-202v122h-60v-120H660v120h-60ZM480-628Z"
                stroke="#FFFFFF"
                strokeWidth="20"
              />
            </svg>
          </div>
          <div className="font-sans text-3xl font-bold text-darkpink2 px-2 cursor-pointer">MealMatch</div>
        </div>
      </div>

      {/* Right section: profile avatar */}
      <div className="flex items-center space-x-6">
        {isImage ? (
          <Link to="profile">
            <div>{/* Render your image here */}</div>
          </Link>
        ) : (
          <Link to="/studentDashboard/profile">
            <div className="cursor-pointer relative w-10 h-10 p-1 ring-2 ring-gray-400 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default ProviderNavbar;
