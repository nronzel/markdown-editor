import Header from "../components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useAuthValue } from "../config/AuthProvider";
import SignInForm from "../components/SignInForm";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        setTimeActive(true);
        navigate("/verify-email");
      } else {
        alert("Sign in successful.");
        navigate("/editor");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google sign in successful.");
      navigate("/editor");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <SignInForm
        login={login}
        signInWithGoogle={signInWithGoogle}
        error={error}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Signin;
