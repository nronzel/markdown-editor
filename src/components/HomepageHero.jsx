import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMotionValue, useTransform, motion } from "framer-motion";
import LoginSection from "./LoginSection";

const HomepageHero = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isHovered, setIsHovered] = useState(false);

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
        gap={5}
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          lineHeight="shorter"
          textAlign="center"
        >
          Edit and save Markdown files right in your browser!
        </Text>
        <Box
          boxShadow="0 0 19px rgba(56,178,172,.4)"
          borderRadius="xl"
          overflow="hidden"
          _hover={{
            boxShadow: "0 0 25px rgba(56, 178, 172, .7)",
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            position="relative"
            overflow="hidden"
            _hover={{
              boxShadow: "0 0 25px rgba(56, 178, 172, .7) translateZ(0)",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "xl",
                border: `2px solid ${useColorModeValue(
                  "purple.500",
                  "purple.200"
                )}`,
                rotateZ: useTransform(
                  useMotionValue(0),
                  [0, 1],
                  ["0deg", "360deg"]
                ),
              }}
              animate={{ rotateZ: isHovered ? 1 : 0 }}
            />
            Try it!
          </Button>
        </Box>
      </Flex>
     <LoginSection />
    </Flex>
  );
};

export default HomepageHero;
