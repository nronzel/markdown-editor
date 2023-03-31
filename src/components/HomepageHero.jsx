import {
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../config/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";

const HomepageHero = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      if (currentUser) {
        logOut();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // navigate("/mainapp")
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      alert(err.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      alert("Logged Out Successfully");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Flex
      justifyContent="center"
      gap={7}
      h="450px"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Flex alignItems="center">
        <Text>Edit and save Markdown files right in your browser!</Text>
      </Flex>
      <Divider orientation="vertical" />
      <Flex direction="column" gap={5}>
        {currentUser ? (
          <Text>Welcome!</Text>
        ) : (
          <>
            <Text mt={9} textAlign="center">
              Sign In
            </Text>
            <label>Email</label>
            <Input
              type="email"
              errorBorderColor="red.300"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
              mt={-3}
              required
            />
            <label mt={5}>Password</label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              mt={-3}
              required
            />

            <Button onClick={signIn}>
              {currentUser ? "Log Out" : "Sign In"}
            </Button>
            <Button colorScheme="blue" onClick={signInWithGoogle}>
              Sign In With Google
            </Button>
            <Text fontSize="xs" color="gray.400">
              <NavLink to="/signup">Need an account? Sign Up!</NavLink>
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default HomepageHero;
