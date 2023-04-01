import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../config/AuthProvider";

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

  const createAccount = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      // create new user w/ email and pw
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => setError(err.message));
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Flex direction="column" alignItems="center">
      <Header />
      <Flex direction="column" mt={10}>
          <Heading textAlign="center" mb={4} >Sign Up</Heading>
          {error && <Box className="auth_error">{error}</Box>}
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            mb={5}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            mb={3}
          />
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button h="50px" mt={5} onClick={createAccount}>Sign Up</Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
