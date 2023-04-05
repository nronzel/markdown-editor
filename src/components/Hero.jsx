import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/hero.css"

const Hero = () => {
  const navigate = useNavigate();

  const anonSignIn = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/editor");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="hero-button-box">
      <button className="hero-button" onClick={anonSignIn}>Try It!</button>
      <NavLink to="/signup">
      <button className="hero-button-outline">Sign Up</button>
      </NavLink>
    </div>
  );
};

export default Hero;
