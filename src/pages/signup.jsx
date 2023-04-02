import {
  Text,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../config/AuthProvider";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();
  const toast = useToast();

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

  const createAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Account Created - Please Verify Your Email",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
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
    <Flex direction="column" alignItems="center">
      <Header />
      <Flex direction="column" mt={10}>
        <Heading textAlign="center" mb={4}>
          Sign Up
        </Heading>
        {error && (
          <Box
            textAlign="center"
            className="auth_error"
            border="1px solid"
            borderColor="red.500"
            p={2}
            mb={4}
            rounded="lg"
            bgColor="red.100"
            color="red.500"
          >
            {error}
          </Box>
        )}
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          mb={3}
          placeholder="example@example.com"
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
        <Button
          h="50px"
          mt={5}
          onClick={createAccount}
          bgGradient="linear(to-r, teal.500, purple.500)"
          _hover={{
            bgGradient: "linear(to-r, purple.400, teal.400)",
          }}
          _active={{
            bgGradient: "linear(to-r, teal.600, purple.600)",
          }}
          color="white"
        >
          Sign Up
        </Button>
        <Button mt={2} h="50px" onClick={signInWithGoogle} colorScheme="blue">
          Sign In With Google
        </Button>
        <Text fontSize="xs" mt={2} color="gray.400">
          <NavLink to="/signin">Already have an account? Sign In!</NavLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Signup;
