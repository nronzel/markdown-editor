import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./config/AuthProvider";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Editor from "./pages/editor";
import VerifyEmail from "./components/VerifyEmail";
import PrivateRoute from "./components/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { Navigate } from "react-router-dom";
import { EncryptionPasswordProvider } from "./config/EncryptionWrapper";
import Profile from "./pages/profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <EncryptionPasswordProvider>
            <Routes>
              <Route exact path="/" index element={<Home />} />
              <Route
                path="/signup"
                element={
                  !currentUser ? (
                    <Signup />
                  ) : (
                    <Navigate to="/verify-email" replace />
                  )
                }
              />
              <Route
                path="/signin"
                element={
                  !currentUser?.emailVerified ? (
                    <Signin />
                  ) : (
                    <Navigate to="/editor" replace />
                  )
                }
              />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/editor"
                element={
                  <PrivateRoute>
                    <Editor />
                  </PrivateRoute>
                }
              />
            </Routes>
          </EncryptionPasswordProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
