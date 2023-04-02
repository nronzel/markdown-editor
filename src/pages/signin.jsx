import React, { useState } from "react";
import {
  Heading,
  Flex,
  Input,
  Button,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuthValue } from "../config/AuthProvider";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();
  const toast = useToast();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        setTimeActive(true);
        toast({
          title: "Sign In Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/verify-email");
      } else {
        navigate("/editor");
      }
    } catch (err) {
      setError(err.message);
      toast({
        title: `Error - ${error}`,
        status: "error",
        duraction: 3000,
        isClosable: true,
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Sign In Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: `Error - ${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" alignItems="center">
      <Header />
      <Flex direction="column" gap={5}>
        <Heading mt={9} textAlign="center">
          Sign In
        </Heading>
        {error && <Box className="auth_error">{error}</Box>}
        <label>Email</label>
        <Input
          type="email"
          errorBorderColor="red.300"
          placeholder="example@example.com"
          mt={-3}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label mt={5}>Password</label>
        <Input
          type="password"
          mt={-3}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button h="50px" onClick={login}>Log In</Button>
        <Button h="50px" onClick={signInWithGoogle} colorScheme="blue">
          Sign In With Google
        </Button>
        <Text fontSize="xs" color="gray.400" mt={-3}>
          <NavLink to="/signup">Need an account? Sign Up!</NavLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Signin;
