import Home from "../pages/home.jsx";
import Signup from "../pages/signup.jsx";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { AuthProvider } from "../config/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Flex direction="column">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Flex>
    </AuthProvider>
  );
}

export default App;
