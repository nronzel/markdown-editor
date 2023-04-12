import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import "../styles/signup.css";

const SignUpForm = ({
  error,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  signInWithGoogle,
  createAccount,
}) => {
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <>
      <Header />
      <div className="signup-form">
        <div className="signup-container">
          <h2 className="signup-heading">Sign Up</h2>
          {error && <div className="auth_error">{error}</div>}
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            className="signup-input"
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            className="signup-input"
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="field-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="signup-input"
            type="password"
            id="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="button-box">
            <button className="signup-button" onClick={createAccount}>
              <span className="button-text">Sign Up</span>
            </button>
            <button
              className="google-signin-button"
              onClick={handleGoogleSignIn}
            >
              Sign In With Google
            </button>
          </div>
          <p className="signup-text">
            Already have an account?
            <NavLink to="/signin"> Sign In!</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
