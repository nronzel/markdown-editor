import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="flex-center">
      <Header />
      <div className="hero-container">
        <p className="hero-text">
          Edit and Save Markdown Documents Right in Your Browser!
        </p>
        <Hero />
        <p className="supporting-text">
          Join now to get access to exclusive features!
        </p>
      </div>
    </div>
  );
};

export default Home;
