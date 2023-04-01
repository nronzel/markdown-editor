import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
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
    <>
      <Header />
      <Flex direction="column" alignItems="center" mt={10}>
        <Flex direction="column" gap={5}>
          <FormControl>
            <Text textAlign="center">Sign Up</Text>
            {error && <Box className="auth_error">{error}</Box>}
            <FormLabel>Email</FormLabel>
            <Input
              mt={-3}
              type="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel>Password</FormLabel>
            <Input
              mt={-3}
              type="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel>Confirm Password</FormLabel>
            <Input
              mt={-3}
              type="password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={createAccount}>Sign Up</Button>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};

export default Signup;
