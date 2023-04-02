import { Box, Flex, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import React from "react";
import { auth } from "../config/firebase";
import { signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginSection from "./LoginSection";
import AnimatedButton from "./AnimatedButton";

const HomepageHero = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const anonSignIn = async () => {
    try {
      await signInAnonymously(auth);
      toast({
        title: "Anonymous Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/editor");
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
    <Flex
      justifyContent="space-evenly"
      alignItems="center"
      gap={7}
      h="450px"
      wrap="wrap"
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.900", "white")}
      px={10}
      py={20}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
        gap={7}
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          lineHeight="shorter"
          textAlign="center"
          background="linear-gradient(to right, teal, magenta)"
          backgroundClip="text"
          color="transparent"
          cursor="default"
          userSelect="none"
        >
          Edit and Save Markdown Files Right in Your Browser!
        </Text>
        <AnimatedButton anonSignIn={anonSignIn} />
      </Flex>
      <LoginSection />
    </Flex>
  );
};

export default HomepageHero;
