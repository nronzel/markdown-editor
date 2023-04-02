import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { auth } from "../config/firebase";
import { signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginSection from "./LoginSection";

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
        <Box
          boxShadow="0 0 19px rgba(56,178,172,.4)"
          borderRadius="xl"
          overflow="hidden"
          transition="all 0.3s ease"
          _hover={{
            boxShadow: "0 0 25px rgba(56, 178, 172, .7)",
            transform: "scale(1.1)",
          }}
        >
          <Button
            size="lg"
            py={5}
            px={10}
            fontSize="xl"
            fontWeight="bold"
            colorScheme="teal"
            onClick={anonSignIn}
            _hover={{
              boxShadow: "0 0 25px rgba(56, 178, 172, .7)",
            }}
          >
            Try it!
          </Button>
        </Box>
      </Flex>
      <LoginSection />
    </Flex>
  );
};

export default HomepageHero;
