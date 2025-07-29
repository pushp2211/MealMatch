import React from "react";
import HomeNav from "../components/HomeComponents/Navbar";
import FirstPage from "../components/HomeComponents/FirstPage";
import Footer from "../components/HomeComponents/Footer";
import Working from "../components/HomeComponents/Working";
import Stats from "../components/HomeComponents/Stats";
import Testimonials from "../components/HomeComponents/Testimonials";

const HomePage = () => {
  return (
    <>
      <HomeNav/>
      <FirstPage/>
      <Working/>
      <Testimonials/>
      <Stats/>
      <Footer/>
    </>
  )
};

export default HomePage;
