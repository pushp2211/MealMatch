import HomeNav from "./Navbar";
import FirstPage from "./FirstPage";
import Footer from "./Footer";
import Working from "./Working";
import Stats from "./Stats";
import Testimonials from "./Testimonials";

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
