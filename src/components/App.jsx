import Home from "../pages/home.jsx";
import Signup from "../pages/signup.jsx";
import Signin from "../pages/signin.jsx";
import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../config/AuthProvider.jsx";
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute.jsx";
import Editor from "../pages/editor.jsx";
import VerifyEmail from "./VerifyEmail.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Flex direction="column">
      <BrowserRouter>
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <Routes>
            <Route exact path="/" index element={<Home />} />
            <Route
              path="/signup"
              element={
                !currentUser ? <Signup /> : <Navigate to="/editor" replace />
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

            <Route
              path="/editor"
              element={
                <PrivateRoute>
                  <Editor />
                </PrivateRoute>
              }
            />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Flex>
  );
}

export default App;
