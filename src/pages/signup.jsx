import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../config/AuthProvider.jsx";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import SignUpForm from "../components/SignUpForm.jsx";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Paswords do not match");
      }
    }
    return isValid;
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successful Sign In");
    } catch (err) {
      setError(err.message);
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created");
        await sendEmailVerification(auth.currentUser);
        setTimeActive(true);
        navigate("/verify-email");
      } catch (err) {
        setError(err.message);
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <SignUpForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
      signInWithGoogle={signInWithGoogle}
      createAccount={createAccount}
    />
  );
};

export default Signup;
