import React from "react";
import "../styles/signin.css";
import { NavLink } from "react-router-dom";

const SignInForm = ({
  error,
  setEmail,
  setPassword,
  signInWithGoogle,
  login,
}) => {
  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2 className="signin-heading">Sign In</h2>
        {error && <div className="auth_error">{error}</div>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-box">
          <button className="signin-button" onClick={login}>
           <span className="button-text">Log In</span>
          </button>
          <button className="google-signin-button" onClick={signInWithGoogle}>
            Sign In With Google
          </button>
        </div>
        <p className="signin-text">
          Need an account?
          <NavLink to="/signup"> Sign Up!</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
