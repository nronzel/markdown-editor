import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../config/AuthProvider";
import {
  faArrowRightFromBracket,
  faDownLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();

  const logOut = async () => {
    try {
      await signOut(auth);
      alert("Sign Out Successful!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="header-main-container">
      <div className="header-inner-container">
        <h2 className="logo-text">
          <NavLink to="/" className="logo-text">
            Markd
            <FontAwesomeIcon style={{ paddingLeft: "5px" }} icon={faDownLong} />
          </NavLink>
        </h2>
        <div className="hstack">
          {currentUser?.isAnonymous ? (
            <p>Anonymous</p>
          ) : currentUser?.email ? (
            <NavLink to="/profile">
              <p className="current-user">{currentUser.email}</p>
            </NavLink>
          ) : null}
          <div className="flex">
            {currentUser ? (
              <button className="logout-btn" onClick={logOut}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
              </button>
            ) : (
              <NavLink to="/signin">
                <p className="sign-in-text">Sign In</p>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
