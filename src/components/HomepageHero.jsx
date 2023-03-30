import { Box, Button, Divider, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../config/AuthProvider";
import { useNavigate } from "react-router-dom";

const HomepageHero = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AuthContext);

  const signIn = async () => {
    try {
      if (currentUser) {
        logOut();
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // useNavigate("/mainapp")
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
        // useNavigate("/")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex justifyContent="center" gap={7} h="450px">
      {currentUser && <Text>Signed in as {email}</Text>}
      <Flex alignItems="center">
        <Text>Edit and save Markdown files right in your browser!</Text>
      </Flex>
      <Divider orientation="vertical" />
      <Flex direction="column" gap={5}>
        <Text textAlign="center">Sign In</Text>
        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signIn}>
            {currentUser ? "Log Out" : "Sign In"}
        </Button>
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      </Flex>
    </Flex>
  );
};

export default HomepageHero;
