import React from "react";

import Navbar from "../navbar/Navbar";
import StartPage from "../startPage/StartPage";
import footerLogo from "../../assets/footer-logo.png";
import Footer from "../reusable/Footer/Footer";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="nav">
        <Navbar />
      </div>

      <div className="home-content">
        <StartPage />
      </div>
      <div className="nav">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
